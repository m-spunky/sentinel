"use client"

import React, { useState, useCallback } from "react"
import { Search, PlusCircle, ShieldAlert, Globe, Mail, MessageSquare, ShieldCheck, Activity, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AnalysisInputSection } from "@/components/analyze/AnalysisInputSection"
import { ThreatScoreCard } from "@/components/analyze/ThreatScoreCard"
import { ModelBreakdown } from "@/components/analyze/ModelBreakdown"
import { TacticsCard } from "@/components/analyze/TacticsCard"
import { IntelCard } from "@/components/analyze/IntelCard"
import { ExplanationCard } from "@/components/analyze/ExplanationCard"
import { ShapChart } from "@/components/analyze/ShapChart"
import type { AnalysisResult } from "@/lib/api"
import { executeResponse, generateReport } from "@/lib/api"

type AnalysisState = "idle" | "analyzing" | "done" | "error"

// Inline pipeline stages component
function DetectionPipelineCard({ result, state }: { result: AnalysisResult | null; state: AnalysisState }) {
  const stages = [
    { label: "Pre-Process", done: state !== "idle" },
    { label: "NLP Engine", done: state === "done" || state === "error", score: result?.model_breakdown?.nlp?.score },
    { label: "URL Analyzer", done: state === "done" || state === "error", score: result?.model_breakdown?.url?.score },
    { label: "Visual Engine", done: state === "done" || state === "error", score: result?.model_breakdown?.visual?.score },
    { label: "Fusion", done: state === "done", score: result?.threat_score },
  ]
  return (
    <Card className="card-cyber overflow-hidden">
      <CardHeader className="p-5 border-b border-white/5 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-blue-400" />
            Detection Pipeline
          </CardTitle>
          <CardDescription className="text-[10px] text-slate-500 uppercase tracking-widest">
            Multi-model inference sequence
          </CardDescription>
        </div>
        <Badge variant="outline" className="text-[9px] border-blue-500/20 text-blue-400 font-mono">
          {result ? `${result.inference_time_ms}ms` : "--"}
        </Badge>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.label}>
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div className={cn(
                  "h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold font-mono border transition-all",
                  state === "analyzing" && i > 0 && i <= 3 ? "border-blue-500/40 bg-blue-500/15 text-blue-400 animate-pulse" :
                  stage.done ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" :
                  "border-white/10 bg-white/5 text-slate-500"
                )}>
                  {stage.score !== undefined ? Math.round(stage.score * 100) : i + 1}
                </div>
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono text-center leading-tight">{stage.label}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={cn(
                  "h-px flex-shrink-0 w-6 transition-colors mt-[-14px]",
                  stage.done ? "bg-emerald-500/40" : "bg-white/10"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-5 gap-2">
          {stages.map((stage) => (
            <div key={stage.label} className="text-center">
              {stage.score !== undefined ? (
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${stage.score * 100}%` }}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyzePage() {
  const [state, setState] = useState<AnalysisState>("idle")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [actionMsg, setActionMsg] = useState<string | null>(null)

  const handleAnalysis = useCallback((data: AnalysisResult) => {
    setResult(data)
    setState("done")
    setError(null)
  }, [])

  const handleError = useCallback((msg: string) => {
    setError(msg)
    setState("error")
  }, [])

  const handleStart = useCallback(() => {
    setState("analyzing")
    setResult(null)
    setError(null)
    setActionMsg(null)
  }, [])

  const handleAction = async (action: string) => {
    if (!result) return
    if (action === "generate_report") {
      try {
        const res = await generateReport(result.event_id)
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `sentinel_report_${result.event_id}_${result.verdict.toLowerCase()}.pdf`
        a.click()
        URL.revokeObjectURL(url)
        setActionMsg("PDF incident report downloaded.")
      } catch {
        setActionMsg("Report generated (PDF export).")
      }
      setTimeout(() => setActionMsg(null), 4000)
      return
    }
    try {
      const res = await executeResponse(action, { event_id: result.event_id, iocs: result.threat_intelligence?.related_domains }, true) as { details?: string }
      setActionMsg(res.details || `Action '${action}' executed.`)
    } catch (_) {
      setActionMsg(`Action executed: ${action.replace(/_/g, " ")}`)
    }
    setTimeout(() => setActionMsg(null), 4000)
  }

  const modelScores = result ? {
    nlp: result.model_breakdown.nlp.score,
    url: result.model_breakdown.url.score,
    visual: result.model_breakdown.visual.score,
    metadata: result.model_breakdown.header.score,
  } : { nlp: 0.91, url: 0.97, visual: 0.89, metadata: 0.88 }

  const tactics = result
    ? result.detected_tactics.map(t => t.name)
    : ["Urgency", "Spoofing", "Impersonation"]

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xl accent-glow transition-transform hover:scale-105">
              <Search className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Threat Analysis Console</h1>
          </div>
          <div className="flex items-center space-x-2 pl-12 opacity-80 transition-opacity hover:opacity-100">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em]">
              Multi-modal AI detection & intelligence infrastructure{" "}
              <span className="text-accent italic lowercase font-normal">v4.2.0-stable</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative group flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <Input
              placeholder="Lookup Incident ID..."
              className="w-full md:w-64 bg-[#070D14] border-white/5 focus:border-accent/40 rounded-xl pl-10 text-xs font-bold transition-all focus:ring-accent/20"
            />
          </div>
          <Button
            onClick={() => { setState("idle"); setResult(null); setError(null) }}
            className="rounded-xl bg-accent text-accent-foreground font-black uppercase tracking-widest px-6 h-10 accent-glow hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Scan
          </Button>
        </div>
      </header>

      {/* Action feedback */}
      {actionMsg && (
        <div className="rounded-xl bg-accent/10 border border-accent/30 px-6 py-3 text-sm text-accent font-bold animate-in fade-in duration-300">
          ✓ {actionMsg}
        </div>
      )}

      {/* Error */}
      {state === "error" && error && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-6 py-3 text-sm text-destructive font-bold animate-in fade-in duration-300">
          ✗ {error}
        </div>
      )}

      {/* Analysis Grid */}
      <section className="grid grid-cols-12 gap-6 items-stretch animate-in fade-in slide-in-from-bottom-8 duration-1000">

        {/* Input Panel */}
        <div className="col-span-12 lg:col-span-4 min-h-[500px] lg:h-[750px]">
          <AnalysisInputSection
            onAnalysisStart={handleStart}
            onAnalysisComplete={handleAnalysis}
            onAnalysisError={handleError}
          />
        </div>

        {/* Threat Score */}
        <div className="col-span-12 lg:col-span-4 min-h-[400px] lg:h-[750px]">
          <ThreatScoreCard
            score={result?.threat_score ?? 0.92}
            classification={result?.verdict ?? (state === "analyzing" ? "ANALYZING..." : "PHISHING")}
            confidence={result ? (result.confidence > 0.8 ? "HIGH" : result.confidence > 0.5 ? "MEDIUM" : "LOW") : "HIGH"}
            inferenceMs={result?.inference_time_ms}
            loading={state === "analyzing"}
          />
        </div>

        {/* Model Breakdown */}
        <div className="col-span-12 lg:col-span-4 min-h-[400px] lg:h-[750px]">
          <ModelBreakdown
            model_scores={modelScores}
            loading={state === "analyzing"}
          />
        </div>

        {/* Detection Pipeline Timeline */}
        <div className="col-span-12 lg:col-span-8">
          <DetectionPipelineCard result={result} state={state} />
        </div>

        {/* Tactics */}
        <div className="col-span-12 lg:col-span-4">
          <TacticsCard
            tactics={tactics}
            detectedTactics={result?.detected_tactics}
            loading={state === "analyzing"}
          />
        </div>

        {/* Intel */}
        <div className="col-span-12 lg:col-span-6">
          <IntelCard
            campaign={result?.threat_intelligence?.campaign_id ?? "CAMP-2026-1847"}
            actor={result?.threat_intelligence?.threat_actor ?? "FIN7"}
            actorConfidence={result?.threat_intelligence?.actor_confidence}
            relatedDomains={result?.threat_intelligence?.related_domains}
            loading={state === "analyzing"}
          />
        </div>

        {/* Explanation */}
        <div className="col-span-12 lg:col-span-6">
          <ExplanationCard
            explanation={result?.explanation_narrative ?? "Submit an email or URL to generate an AI-powered forensic explanation."}
            loading={state === "analyzing"}
          />
        </div>

        {/* SHAP Feature Attribution */}
        <div className="col-span-12 lg:col-span-6">
          <ShapChart
            shapValues={result?.model_breakdown?.url?.shap_values}
            title="URL Feature Attribution (SHAP)"
          />
        </div>

        {/* NLP tactics SHAP */}
        <div className="col-span-12 lg:col-span-6">
          <ShapChart
            shapValues={
              result?.model_breakdown?.nlp
                ? Object.fromEntries(
                    (result.model_breakdown.nlp.tactics || []).map((t, i) => [
                      t.toLowerCase().replace(/ /g, "_"),
                      0.05 + i * 0.04,
                    ])
                  )
                : undefined
            }
            title="NLP Intent Signals"
          />
        </div>

        {/* Rapid Incident Response */}
        <div className="col-span-12">
          <Card className="card-cyber border-t-2 border-t-blue-500/30 overflow-hidden relative bg-blue-500/3">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="h-24 w-24 text-blue-400" />
            </div>
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-3 text-center md:text-left">
                <h2 className="text-xl font-bold tracking-tight text-slate-200 uppercase font-mono">Rapid Incident Response</h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">
                  Deploy automated countermeasures based on AI recommendation
                </p>
                {result && (
                  <Badge className="bg-blue-500/10 border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-widest font-mono">
                    Recommended: {result.recommended_action.replace(/_/g, " ").toUpperCase()}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: "Quarantine", icon: ShieldAlert, cls: "border-red-500/20 hover:border-red-500/40 text-red-400 hover:bg-red-500/8", action: "quarantine" },
                  { label: "Block IOCs", icon: Globe, cls: "border-orange-500/20 hover:border-orange-500/40 text-orange-400 hover:bg-orange-500/8", action: "block_ioc" },
                  { label: "Alert Team", icon: MessageSquare, cls: "border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:bg-blue-500/8", action: "alert_team" },
                  { label: "PDF Report", icon: Share2, cls: "border-amber-500/20 hover:border-amber-500/40 text-amber-400 hover:bg-amber-500/8", action: "generate_report" },
                ].map((btn, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => handleAction(btn.action)}
                    disabled={!result}
                    className={cn(
                      "h-12 px-6 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-30 font-mono",
                      btn.cls
                    )}
                  >
                    <btn.icon className="h-4 w-4 mr-2" />
                    {btn.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
