"""
NLP Intent Engine — Analyzes email/message text for phishing intent.
Uses OpenRouter GPT-4o-mini for semantic understanding of manipulation tactics.
Falls back to enhanced heuristic analysis if API unavailable.
"""
import re
import json
import asyncio
import logging
from typing import Optional

import httpx

from config import OPENROUTER_API_KEY, OPENROUTER_FAST_MODEL

logger = logging.getLogger(__name__)

# ─── MITRE ATT&CK tactic registry ────────────────────────────────────────────
TACTIC_MITRE_MAP = {
    "urgency":                  {"mitre_id": "T1566.001", "weight": 0.18},
    "authority_impersonation":  {"mitre_id": "T1656",     "weight": 0.15},
    "financial_lure":           {"mitre_id": "T1078",     "weight": 0.14},
    "credential_harvesting":    {"mitre_id": "T1056.003", "weight": 0.20},
    "suspicious_link":          {"mitre_id": "T1204.001", "weight": 0.12},
    "fear_threat":              {"mitre_id": "T1585",     "weight": 0.13},
    "spoofing":                 {"mitre_id": "T1566.002", "weight": 0.08},
    "reward_framing":           {"mitre_id": "T1585.002", "weight": 0.10},
    "bec_pattern":              {"mitre_id": "T1534",     "weight": 0.16},
    "executive_impersonation":  {"mitre_id": "T1656",     "weight": 0.17},
}

# ─── Heuristic fallback patterns ─────────────────────────────────────────────
TACTIC_PATTERNS = {
    "urgency": [
        r"\b(urgent|immediately|right away|asap|within \d+ hour|today only|expires|deadline|limited time|act now|don.t delay|critical action|time.sensitive)\b",
        r"\b(your account (will be|has been) (suspended|locked|disabled|terminated))\b",
        r"\b(verify (now|immediately|today)|confirm (now|immediately|your account))\b",
    ],
    "authority_impersonation": [
        r"\b(ceo|cfo|cto|president|director|manager|hr|payroll|it (department|team|helpdesk)|security (team|department))\b",
        r"\b(microsoft|google|apple|amazon|paypal|bank|irs|fbi|government|official)\b",
    ],
    "financial_lure": [
        r"\b(wire transfer|payment|invoice|refund|compensation|\$[\d,]+|funds|billing|overdue|amount.due)\b",
        r"\b(wire \$|transfer \$|send \$|pay \$)\b",
    ],
    "credential_harvesting": [
        r"\b(click (here|this link|below) to (verify|confirm|update|login|sign in|reset))\b",
        r"\b(update your (password|credentials|information|account))\b",
        r"\b(verify your (identity|account|email))\b",
        r"\b(login|sign.?in|password reset|re.?enter|re.?verify)\b",
    ],
    "suspicious_link": [
        r"https?://\S+",
        r"\b(click (here|below|this link))\b",
    ],
    "fear_threat": [
        r"\b(your account (will be|has been) (closed|deleted|suspended|flagged))\b",
        r"\b(failure to (comply|respond|verify) (will|may) result)\b",
        r"\b(legal (action|proceedings)|law enforcement)\b",
    ],
    "bec_pattern": [
        r"\b(wire transfer|wire \$|send funds|initiate payment|urgent payment|new banking details|change.*account.*number)\b",
        r"\b(confidential|do not discuss|don.t mention to anyone)\b",
    ],
    "executive_impersonation": [
        r"\b(from:.*ceo|from:.*cfo|from:.*president|from:.*director)\b",
        r"\b(this is (your|our) (ceo|cfo|president|boss)|i am the (ceo|cfo|president))\b",
    ],
}

BENIGN_SIGNALS = [
    r"\b(unsubscribe|privacy policy|terms of service|©|copyright)\b",
    r"\b(best regards|sincerely|thank you for your (business|order))\b",
    r"\b(invoice #[\w-]+|order #[\w-]+|ticket #[\w-]+)\b",
    r"\b(scheduled meeting|calendar invite|join us for)\b",
]

OBFUSCATION_PATTERNS = [
    r"[а-яёА-ЯЁ]",
    r"&#\d+;",
    r"%[0-9a-fA-F]{2}",
]

# ─── LLM prompt ───────────────────────────────────────────────────────────────
PHISHING_ANALYSIS_PROMPT = """You are an expert cybersecurity analyst specialized in phishing and social engineering detection.

Analyze the following email/text content for phishing indicators. Return ONLY a valid JSON object with these exact fields:
{
  "intent_score": <float 0.0-1.0, where 0.0=definitely legitimate, 1.0=definitely phishing>,
  "detected_tactics": <list of strings, ONLY from: ["urgency","authority_impersonation","financial_lure","credential_harvesting","suspicious_link","fear_threat","spoofing","reward_framing","bec_pattern","executive_impersonation"]>,
  "confidence": <float 0.0-1.0, your confidence in this classification>,
  "explanation": "<2-3 sentences explaining the specific phishing indicators found, or why it appears legitimate>"
}

Key guidance:
- Urgency: time pressure, account suspension threats, "act now" language
- Authority impersonation: pretending to be CFO/CEO/IT/government/bank
- BEC pattern: Business Email Compromise - wire transfer requests, payment urgency
- Executive impersonation: specifically impersonating named executives
- If content looks legitimate (meeting invite, real business communication), score 0.05-0.15
- If content has 1-2 mild signals, score 0.3-0.5
- If content has strong multiple converging signals, score 0.7-0.95
- Reserve 0.95+ for clear, unambiguous phishing with multiple high-confidence tactics

Content to analyze:
---
{content}
---

Return ONLY the JSON object, no other text."""


async def analyze_text_llm(text: str) -> dict:
    """Use OpenRouter GPT-4o-mini for semantic phishing intent analysis."""
    if not OPENROUTER_API_KEY:
        raise ValueError("OPENROUTER_API_KEY not configured")

    # Truncate to 2000 chars for speed/cost
    content_preview = text[:2000] if len(text) > 2000 else text

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sentinelai.fusion",
        "X-Title": "SentinelAI Fusion",
    }

    payload = {
        "model": OPENROUTER_FAST_MODEL,
        "messages": [
            {
                "role": "user",
                "content": PHISHING_ANALYSIS_PROMPT.format(content=content_preview),
            }
        ],
        "temperature": 0.1,
        "max_tokens": 500,
        "response_format": {"type": "json_object"},
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
        )
        response.raise_for_status()
        data = response.json()

    raw_content = data["choices"][0]["message"]["content"]
    result = json.loads(raw_content)

    # Validate and clamp
    intent_score = float(result.get("intent_score", 0.1))
    intent_score = max(0.02, min(0.98, intent_score))

    confidence = float(result.get("confidence", 0.7))
    confidence = max(0.3, min(0.99, confidence))

    tactics_raw = result.get("detected_tactics", [])
    detected_tactics = []
    for t in tactics_raw:
        if t in TACTIC_MITRE_MAP:
            detected_tactics.append({
                "name": t.replace("_", " ").title(),
                "mitre_id": TACTIC_MITRE_MAP[t]["mitre_id"],
                "confidence": min(confidence + 0.05, 0.99),
            })

    return {
        "score": round(intent_score, 4),
        "confidence": round(confidence, 4),
        "detected_tactics": detected_tactics,
        "explanation": result.get("explanation", ""),
        "feature_contributions": {t: TACTIC_MITRE_MAP[t]["weight"] for t in tactics_raw if t in TACTIC_MITRE_MAP},
        "source": "openrouter_gpt4o_mini",
    }


def analyze_text_heuristic(text: str) -> dict:
    """Enhanced heuristic fallback — used when OpenRouter is unavailable."""
    if not text or len(text.strip()) < 10:
        return {
            "score": 0.05, "confidence": 0.3, "detected_tactics": [],
            "explanation": "Insufficient content for analysis.",
            "feature_contributions": {}, "source": "heuristic_fallback",
        }

    text_lower = text.lower()
    detected = []
    total_weight = 0.0
    feature_contributions = {}

    for tactic_name, patterns in TACTIC_PATTERNS.items():
        match_count = sum(
            len(re.findall(p, text_lower, re.IGNORECASE)) for p in patterns
        )
        if match_count > 0:
            info = TACTIC_MITRE_MAP[tactic_name]
            contribution = min(info["weight"] * (1 + 0.1 * (match_count - 1)), info["weight"] * 1.5)
            total_weight += contribution
            feature_contributions[tactic_name] = round(contribution, 4)
            detected.append({
                "name": tactic_name.replace("_", " ").title(),
                "mitre_id": info["mitre_id"],
                "confidence": min(0.5 + 0.1 * match_count, 0.97),
            })

    # Obfuscation bonus
    for pat in OBFUSCATION_PATTERNS:
        if re.search(pat, text):
            total_weight += 0.06

    total_weight = min(total_weight, 0.97)

    # Benign reduction
    benign_hits = sum(1 for p in BENIGN_SIGNALS if re.search(p, text_lower, re.IGNORECASE))
    if benign_hits > 0:
        total_weight = max(total_weight - benign_hits * 0.04, 0.02)

    url_count = len(re.findall(r"https?://\S+", text))
    if url_count > 2:
        total_weight = min(total_weight + 0.05, 0.97)

    score = round(max(0.04, min(total_weight, 0.97)), 4)
    confidence = round(min(0.55 + score * 0.4, 0.97), 4)

    tactic_names = [t["name"] for t in detected]
    explanation = _build_heuristic_explanation(score, tactic_names, url_count)

    return {
        "score": score,
        "confidence": confidence,
        "detected_tactics": detected,
        "explanation": explanation,
        "feature_contributions": feature_contributions,
        "url_count": url_count,
        "source": "heuristic_fallback",
    }


def _build_heuristic_explanation(score: float, tactic_names: list, url_count: int) -> str:
    if score < 0.2:
        return "Email content appears legitimate. No significant phishing indicators detected."
    parts = []
    if "Urgency" in tactic_names:
        parts.append("uses urgency manipulation tactics")
    if "Authority Impersonation" in tactic_names:
        parts.append("impersonates an authority figure or trusted organization")
    if "Bec Pattern" in tactic_names:
        parts.append("matches Business Email Compromise (BEC) wire transfer patterns")
    if "Executive Impersonation" in tactic_names:
        parts.append("impersonates a named executive")
    if "Credential Harvesting" in tactic_names:
        parts.append("attempts credential harvesting via deceptive link")
    if "Financial Lure" in tactic_names:
        parts.append("contains financial manipulation language")
    if "Fear Threat" in tactic_names:
        parts.append("uses fear and threat tactics")
    if url_count > 0:
        parts.append(f"contains {url_count} embedded URL(s)")
    if not parts:
        parts.append("exhibits patterns consistent with social engineering")
    base = "Heuristic analysis flags this content: " + ", ".join(parts) + "."
    if score > 0.8:
        base += f" Confidence: HIGH ({round(score * 100, 1)}%)."
    elif score > 0.5:
        base += f" Confidence: MEDIUM ({round(score * 100, 1)}%). Manual review recommended."
    return base


async def analyze_text(text: str, input_type: str = "email") -> dict:
    """
    Main entry point. Tries OpenRouter LLM first, falls back to heuristics.
    """
    if not text or len(text.strip()) < 5:
        return {
            "score": 0.05, "confidence": 0.3, "detected_tactics": [],
            "explanation": "No content provided.", "feature_contributions": {},
        }

    try:
        result = await analyze_text_llm(text)
        logger.info(f"[NLP] OpenRouter GPT-4o-mini: score={result['score']}, tactics={[t['name'] for t in result['detected_tactics']]}")
        return result
    except Exception as e:
        logger.warning(f"[NLP] OpenRouter unavailable ({e}), using heuristic fallback")
        return analyze_text_heuristic(text)
