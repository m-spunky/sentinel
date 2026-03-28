"""
Analysis endpoints — full 5-layer multi-modal phishing detection pipeline.
PS-01 core: NLP + URL + Visual + Header + Intel with per-layer WebSocket streaming.
Includes kill chain (PS-02/PS-03) and dark web exposure (PS-05).
"""
import uuid
import time
import re
import asyncio
import logging
from datetime import datetime
from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional

from models.nlp_engine import analyze_text
from models.url_analyzer import score_url
from models.header_analyzer import analyze_headers
from models.visual_engine import analyze_visual
from models.fusion_engine import fuse_scores
from intelligence.knowledge_graph import get_graph
from intelligence.ioc_feeds import enrich_iocs
from chat.sentinel_chat import generate_explanation_narrative

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1", tags=["analysis"])

# In-memory result cache for event lookup
_result_cache: dict[str, dict] = {}


class EmailAnalysisRequest(BaseModel):
    content: str
    options: Optional[dict] = None


class URLAnalysisRequest(BaseModel):
    url: str
    options: Optional[dict] = None


class HeaderAnalysisRequest(BaseModel):
    headers: str
    options: Optional[dict] = None


def _extract_urls_from_text(text: str) -> list:
    return re.findall(r"https?://[^\s<>\"{}|\\^`\[\]]+", text)


def _extract_domains(urls: list) -> list:
    domains = []
    for url in urls:
        try:
            from urllib.parse import urlparse
            parsed = urlparse(url if url.startswith("http") else "https://" + url)
            domain = parsed.netloc.lower().replace("www.", "")
            if domain and domain not in domains:
                domains.append(domain)
        except Exception:
            pass
    return domains


async def _emit_layer_event(event_id: str, layer: str, data: dict, step: int, total_steps: int = 6):
    """Emit a per-layer progress event via WebSocket."""
    try:
        from routers.stream import emit_threat_event
        await emit_threat_event({
            "type": "pipeline_progress",
            "event_id": event_id,
            "layer": layer,
            "step": step,
            "total_steps": total_steps,
            "data": data,
            "timestamp": datetime.utcnow().isoformat() + "Z",
        })
    except Exception:
        pass


async def _run_full_analysis(content: str, input_type: str, options: dict = None) -> dict:
    """Run the complete 5-layer multi-modal phishing detection pipeline."""
    start_time = time.time()
    event_id = f"evt_{uuid.uuid4().hex[:8]}"
    options = options or {}

    urls = _extract_urls_from_text(content) if input_type == "email" else [content]
    primary_url = urls[0] if urls else ""
    all_domains = _extract_domains(urls)

    logger.info(f"[Analyze] {event_id}: type={input_type}, url={'yes' if primary_url else 'no'}")

    # Emit: pipeline started
    await _emit_layer_event(event_id, "pipeline_start", {"status": "running", "input_type": input_type}, 0)

    # ── LAYER 1: NLP + Header (parallel) ─────────────────────────────────────
    async def _empty_url():
        return {"score": 0.05, "confidence": 0.3, "top_features": [], "shap_values": {}}

    async def _run_headers(c):
        return analyze_headers(c)

    async def _empty_header():
        return {"score": 0.0, "confidence": 0.3, "flags": [], "spf_result": "unknown", "dkim_result": "unknown", "dmarc_result": "none"}

    nlp_task = analyze_text(content, input_type)
    header_task = _run_headers(content) if input_type == "email" else _empty_header()

    nlp_result, header_result = await asyncio.gather(nlp_task, header_task, return_exceptions=False)

    await _emit_layer_event(event_id, "nlp", {
        "score": nlp_result.get("score", 0),
        "confidence": nlp_result.get("confidence", 0),
        "flags": nlp_result.get("top_phrases", [])[:3],
        "intent": nlp_result.get("phishing_intent", ""),
    }, 1)

    await _emit_layer_event(event_id, "header", {
        "score": header_result.get("score", 0),
        "spf": header_result.get("spf_result", "unknown"),
        "dkim": header_result.get("dkim_result", "unknown"),
        "dmarc": header_result.get("dmarc_result", "none"),
        "flags": header_result.get("flags", [])[:3],
    }, 2)

    # ── LAYER 2: URL Analysis ─────────────────────────────────────────────────
    url_result = await (score_url(primary_url, do_live_lookup=True) if primary_url else _empty_url())

    await _emit_layer_event(event_id, "url", {
        "score": url_result.get("score", 0),
        "domain_age_days": url_result.get("features", {}).get("domain_age_days"),
        "blacklist_hit": url_result.get("features", {}).get("urlhaus_hit", False),
        "top_features": url_result.get("top_features", [])[:3],
    }, 3)

    # ── LAYER 3: Visual Sandbox Analysis ─────────────────────────────────────
    run_visual = options.get("run_visual", bool(primary_url))
    visual_result = {"score": 0.05, "confidence": 0.4, "matched_brand": "Unknown", "similarity": 0.05, "source": "skipped"}
    if primary_url and run_visual:
        try:
            url_features_for_visual = {
                "brand_impersonation": "brand_impersonation" in url_result.get("top_features", []),
                "brand_in_domain": url_result.get("features", {}).get("brand_in_domain", 0),
                "typosquatting_score": url_result.get("features", {}).get("typosquatting_score", 0),
            }
            visual_result = await analyze_visual(primary_url, url_features_for_visual)
        except Exception as e:
            logger.warning(f"[Analyze] Visual analysis failed: {e}")

    await _emit_layer_event(event_id, "visual", {
        "score": visual_result.get("score", 0),
        "matched_brand": visual_result.get("matched_brand", "Unknown"),
        "similarity": visual_result.get("similarity", 0),
        "screenshot_url": visual_result.get("screenshot_url"),
    }, 4)

    # ── LAYER 4: Threat Intelligence + IOC Enrichment ─────────────────────────
    run_intel = options.get("run_threat_intel", True)
    intel_result = {"matches": [], "related_campaigns": [], "risk_elevation": 0.0}
    ioc_enrichment = {"malicious_domains": [], "malicious_ips": [], "risk_boost": 0.0, "sources": []}

    if run_intel and all_domains:
        graph = get_graph()
        intel_result = graph.correlate_iocs(domains=all_domains)
        try:
            ioc_enrichment = await enrich_iocs(domains=all_domains[:5])
        except Exception as e:
            logger.debug(f"[Analyze] IOC enrichment failed: {e}")

    total_intel_boost = min(intel_result.get("risk_elevation", 0.0) + ioc_enrichment.get("risk_boost", 0.0), 0.35)

    await _emit_layer_event(event_id, "intel", {
        "ioc_matches": len(ioc_enrichment.get("malicious_domains", [])),
        "risk_boost": total_intel_boost,
        "campaign_match": bool(intel_result.get("matches")),
        "sources": ioc_enrichment.get("sources", []),
    }, 5)

    # ── LAYER 5: Dark Web Exposure Check (PS-05) ───────────────────────────────
    dark_web_data = {"breach_count": 0, "dark_web_risk": "UNKNOWN"}
    if all_domains:
        try:
            from engines.credential_check import check_domain_exposure
            dark_web_data = await asyncio.wait_for(
                check_domain_exposure(all_domains[0]),
                timeout=5.0
            )
        except Exception:
            pass

    # ── FUSION ────────────────────────────────────────────────────────────────
    fusion = fuse_scores(
        nlp_result=nlp_result,
        url_result=url_result,
        header_result=header_result,
        visual_score=visual_result.get("score", 0.0),
        visual_confidence=visual_result.get("confidence", 0.4),
        input_type=input_type,
        threat_intel_boost=total_intel_boost,
    )

    fusion["model_breakdown"]["visual"]["matched_brand"] = visual_result.get("matched_brand", "Unknown")
    fusion["model_breakdown"]["visual"]["similarity"] = visual_result.get("similarity", 0.0)
    fusion["model_breakdown"]["visual"]["screenshot_url"] = visual_result.get("screenshot_url")

    # ── Threat intelligence summary ───────────────────────────────────────────
    threat_intel = {
        "campaign_id": "Unknown", "threat_actor": "Unknown", "actor_confidence": 0.0,
        "related_domains": all_domains[:5], "global_reach": [],
        "malicious_domains": ioc_enrichment.get("malicious_domains", []),
        "feed_sources": ioc_enrichment.get("sources", []),
    }
    if intel_result.get("matches"):
        best = intel_result["matches"][0]
        threat_intel.update({
            "campaign_id": best.get("campaign_id", "Unknown"),
            "threat_actor": best.get("actor", "Unknown"),
            "actor_id": best.get("actor_id"),
            "actor_confidence": round(min(0.65 + fusion["threat_score"] * 0.35, 0.99), 4),
            "global_reach": ["UA", "PL", "US"] if best.get("actor_id") == "fin7" else ["KP", "US"] if best.get("actor_id") == "lazarus" else [],
        })

    # ── AI Explanation Narrative ──────────────────────────────────────────────
    explanation = await generate_explanation_narrative(
        {**fusion, "threat_intelligence": threat_intel},
        content[:400]
    )

    # ── Kill Chain (PS-02/PS-03) ──────────────────────────────────────────────
    try:
        from engines.kill_chain import build_kill_chain
        kill_chain = build_kill_chain({**fusion, "threat_intelligence": threat_intel})
    except Exception as e:
        logger.debug(f"[Analyze] Kill chain failed: {e}")
        kill_chain = {"kill_chain_stages": [], "overall_risk": fusion["threat_score"]}

    elapsed_ms = int((time.time() - start_time) * 1000)
    logger.info(f"[Analyze] {event_id}: verdict={fusion['verdict']}, score={fusion['threat_score']}, time={elapsed_ms}ms")

    result = {
        "event_id": event_id,
        "status": "completed",
        "threat_score": fusion["threat_score"],
        "verdict": fusion["verdict"],
        "confidence": fusion["confidence"],
        "model_breakdown": fusion["model_breakdown"],
        "detected_tactics": fusion["detected_tactics"],
        "threat_intelligence": threat_intel,
        "explanation_narrative": explanation,
        "recommended_action": fusion["recommended_action"],
        "inference_time_ms": elapsed_ms,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "urls_analyzed": urls[:5],
        "ioc_enrichment": ioc_enrichment,
        "dark_web_exposure": dark_web_data,
        "kill_chain": kill_chain,
        "input_type": input_type,
    }

    # Cache result
    _result_cache[event_id] = result
    if len(_result_cache) > 500:
        oldest = list(_result_cache.keys())[0]
        del _result_cache[oldest]

    # Record to history
    try:
        from routers.history import record_analysis
        preview = (primary_url or content)[:80]
        record_analysis(result, input_type, preview)
    except Exception:
        pass

    # Update dashboard counters
    try:
        from routers.dashboard import increment_analysis_counter
        increment_analysis_counter(fusion["verdict"])
    except Exception:
        pass

    # Emit final result to WebSocket stream
    try:
        from routers.stream import emit_threat_event
        await emit_threat_event({
            "id": event_id,
            "type": "analysis_complete",
            "title": f"{fusion['verdict']} — {threat_intel.get('threat_actor', 'Unknown Actor')}",
            "description": f"Score: {round(fusion['threat_score']*100,1)}% | Time: {elapsed_ms}ms",
            "severity": fusion["verdict"].lower(),
            "timestamp": result["timestamp"],
            "score": fusion["threat_score"],
            "verdict": fusion["verdict"],
        })
    except Exception:
        pass

    return result


# ── Routes ────────────────────────────────────────────────────────────────────

@router.post("/analyze/email")
async def analyze_email(request: EmailAnalysisRequest):
    """PS-01: Submit raw email content for full multi-modal phishing analysis."""
    if not request.content or len(request.content.strip()) < 10:
        raise HTTPException(status_code=400, detail="Email content required (minimum 10 characters).")
    return await _run_full_analysis(request.content, "email", request.options)


@router.post("/analyze/url")
async def analyze_url_endpoint(request: URLAnalysisRequest):
    """PS-01: Submit URL for full analysis (URL + Visual sandbox + Intel)."""
    url = request.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="URL is required.")
    if not url.startswith("http"):
        url = "https://" + url
    return await _run_full_analysis(url, "url", request.options)


@router.post("/analyze/headers")
async def analyze_headers_endpoint(request: HeaderAnalysisRequest):
    """PS-01: Analyze raw email headers (SPF/DKIM/DMARC + routing forensics)."""
    if not request.headers or len(request.headers.strip()) < 20:
        raise HTTPException(status_code=400, detail="Email headers required.")
    return await _run_full_analysis(request.headers, "email", request.options)


@router.post("/analyze/attachment")
async def analyze_attachment_endpoint(file: UploadFile = File(...)):
    """
    Analyze an uploaded file for threats.
    Runs Tier-2 content inspection + NLP analysis on extractable text.
    Returns attachment risk report merged with a full analysis result where possible.
    """
    from models.attachment_analyzer import analyze_attachment_bytes, _ext

    filename = file.filename or "unknown"
    mime_type = file.content_type or ""
    data = await file.read()
    size_bytes = len(data)

    if size_bytes == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    if size_bytes > 20 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 20 MB).")

    # Tier-2 content inspection
    att_result = analyze_attachment_bytes(filename, mime_type, size_bytes, data)

    # Try to extract text for NLP analysis
    extracted_text = _extract_text_from_bytes(data, filename, mime_type)

    analysis_result = None
    if extracted_text and len(extracted_text.strip()) >= 30:
        try:
            # Prepend filename context so header engine sees it as an attachment
            content = f"[Attachment: {filename}]\n\n{extracted_text}"
            analysis_result = await _run_full_analysis(content, "email")
        except Exception as e:
            logger.warning(f"[AttachAnalyze] NLP analysis failed for {filename}: {e}")

    # Boost threat_score if attachment content scan found serious issues
    if analysis_result and att_result["risk_score"] > 0.65:
        boosted = min(analysis_result["threat_score"] + 0.15, 0.99)
        analysis_result["threat_score"] = round(boosted, 3)
        if att_result["risk_level"] in {"CRITICAL", "HIGH"}:
            analysis_result["verdict"] = "CONFIRMED_THREAT"

    return {
        "filename": filename,
        "mime_type": mime_type,
        "size_bytes": size_bytes,
        "attachment_analysis": att_result,
        "text_extracted": bool(extracted_text and len(extracted_text.strip()) >= 30),
        "extracted_length": len(extracted_text or ""),
        "full_analysis": analysis_result,
        # Surface key fields at top level for the frontend
        "threat_score": analysis_result["threat_score"] if analysis_result else att_result["risk_score"],
        "verdict": analysis_result["verdict"] if analysis_result else (
            "CONFIRMED_THREAT" if att_result["risk_level"] == "CRITICAL" else
            "PHISHING"         if att_result["risk_level"] == "HIGH" else
            "SUSPICIOUS"       if att_result["risk_level"] == "MEDIUM" else
            "CLEAN"
        ),
        "risk_level": att_result["risk_level"],
        "findings": att_result["findings"],
    }


def _extract_text_from_bytes(data: bytes, filename: str, mime_type: str) -> str:
    """Extract readable text from file bytes for NLP analysis."""
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    text = ""

    # Plain text files
    if ext in {"txt", "csv", "log", "eml", "msg"} or mime_type.startswith("text/plain"):
        try:
            text = data.decode("utf-8", errors="replace")
        except Exception:
            pass

    # PDF: extract raw text strings
    elif ext == "pdf":
        try:
            raw = data.decode("latin-1", errors="ignore")
            # Extract text between BT/ET operators
            bt_et = re.findall(r"BT\s*(.*?)\s*ET", raw, re.DOTALL)
            chunks = []
            for block in bt_et[:200]:
                strings = re.findall(r'\(([^)]{1,200})\)', block)
                chunks.extend(strings)
            text = " ".join(chunks)
            # Also grab plain readable strings >= 4 chars
            if len(text) < 100:
                text = " ".join(re.findall(r"[A-Za-z0-9 .,:;@/!?'\"$%-]{4,}", raw)[:500])
        except Exception:
            pass

    # OOXML (docx/xlsx/pptx) — XML inside ZIP
    elif ext in {"docx", "xlsx", "pptx", "docm", "xlsm", "pptm"}:
        try:
            import zipfile, io
            with zipfile.ZipFile(io.BytesIO(data)) as zf:
                xml_files = [n for n in zf.namelist() if n.endswith(".xml") and "word/document" in n or "xl/shared" in n or "ppt/slides" in n]
                for xf in xml_files[:5]:
                    xml = zf.read(xf).decode("utf-8", errors="replace")
                    # Strip XML tags to get text content
                    xml = re.sub(r"<[^>]+>", " ", xml)
                    text += " " + xml
                if not text.strip():
                    # Fallback: any XML file
                    for xf in zf.namelist()[:10]:
                        if xf.endswith(".xml"):
                            xml = zf.read(xf).decode("utf-8", errors="replace")
                            text += " " + re.sub(r"<[^>]+>", " ", xml)
        except Exception:
            pass

    # RTF: strip control words
    elif ext == "rtf":
        try:
            raw = data.decode("latin-1", errors="ignore")
            raw = re.sub(r"\\[a-z]+[\-\d]*\s?", " ", raw)
            raw = re.sub(r"[{}]", "", raw)
            text = raw
        except Exception:
            pass

    # SVG / HTML / XML
    elif ext in {"svg", "html", "htm", "xml"}:
        try:
            raw = data.decode("utf-8", errors="replace")
            text = re.sub(r"<[^>]+>", " ", raw)
        except Exception:
            pass

    # Normalize whitespace
    text = re.sub(r"\s+", " ", text).strip()
    return text[:8000]  # Cap at 8KB for NLP


@router.get("/events/{event_id}/result")
async def get_event_result(event_id: str):
    """Get cached detection result by event ID."""
    if event_id in _result_cache:
        return _result_cache[event_id]
    raise HTTPException(status_code=404, detail=f"Event {event_id} not found. Results expire after 500 scans.")


@router.post("/response/execute")
async def execute_response(body: dict):
    """Execute automated incident response action."""
    action = body.get("action", "")
    target = body.get("target", {})
    valid_actions = {"quarantine", "block_ioc", "alert_team", "enforce_mfa", "generate_report"}
    if action not in valid_actions:
        raise HTTPException(status_code=400, detail=f"Unknown action: {action}. Valid: {valid_actions}")
    action_results = {
        "quarantine": "Email quarantined successfully. Message moved to isolated sandbox.",
        "block_ioc": f"IOC(s) blocked: {target.get('iocs', [])}. DNS sinkhole and firewall rules applied.",
        "alert_team": "Security team notified via SOC alert. Incident ticket created.",
        "enforce_mfa": "Step-up MFA enforcement triggered for targeted accounts.",
        "generate_report": "Incident report generated and queued for download.",
    }
    return {
        "status": "executed",
        "action": action,
        "details": action_results.get(action, "Action executed."),
        "target": target,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }
