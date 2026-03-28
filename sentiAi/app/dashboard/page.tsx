"use client"

import React, { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  ShieldAlert, ShieldCheck, Zap, Clock, Search,
  TrendingUp, Mail, Globe, ArrowRight, CheckCircle,
  AlertTriangle, Inbox, Eye, Upload, BarChart2
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ThreatFeed } from "@/components/dashboard/ThreatFeed"
import { ThreatTimeline } from "@/components/dashboard/ThreatTimeline"
import { RiskDonut } from "@/components/dashboard/RiskDonut"
import { motion } from "framer-motion"

interface Stats {
  total_analyses: number
  accuracy_percent: number | null
  avg_inference_ms: number
  verdict_breakdown: Record<string, number>
  top_impersonated_brands: [string, number][]
}

interface Metrics {
  threats_detected: number
  emails_analyzed: number
  avg_response_time_ms: number
  ai_accuracy: number
  false_positive_rate: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [historyStats, setHistoryStats] = useState<Stats | null>(null)
  const [quickInput, setQuickInput] = useState("")
  const [quickLoading, setQuickLoading] = useState(false)
  const [quickResult, setQuickResult] = useState<{ verdict: string; score: number } | null>(null)
  const router = useRef<ReturnType<typeof require> | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mResp, sResp] = await Promise.all([
          fetch("/api/v1/dashboard/metrics"),
          fetch("/api/v1/history/stats"),
        ])
        if (mResp.ok) setMetrics(await mResp.json())
        if (sResp.ok) setHistoryStats(await sResp.json())
      } catch { }
    }
    loadData()
    const iv = setInterval(loadData, 30000)
    return () => clearInterval(iv)
  }, [])

  const handleQuickScan = async () => {
    if (!quickInput.trim()) return
    setQuickLoading(true); setQuickResult(null)
    try {
      const isUrl = quickInput.includes("http") || quickInput.includes("www.")
      const endpoint = isUrl ? "/api/v1/analyze/url" : "/api/v1/analyze/email"
      const body = isUrl ? { url: quickInput } : { content: quickInput }
      const resp = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (resp.ok) {
        const data = await resp.json()
        setQuickResult({ verdict: data.verdict, score: data.threat_score })
      }
    } catch { }
    setQuickLoading(false)
  }

  const phishingCount = historyStats?.verdict_breakdown?.PHISHING ?? 0
  const suspiciousCount = historyStats?.verdict_breakdown?.SUSPICIOUS ?? 0
  const confirmedCount = historyStats?.verdict_breakdown?.CONFIRMED_THREAT ?? 0
  const cleanCount = historyStats?.verdict_breakdown?.CLEAN ?? 0
  const totalAnalyzed = historyStats?.total_analyses ?? metrics?.emails_analyzed ?? 0
  const accuracy = historyStats?.accuracy_percent ?? metrics?.ai_accuracy
  const avgMs = historyStats?.avg_inference_ms ?? metrics?.avg_response_time_ms ?? 0

  const kpis = [
    { label: "Threats Detected", value: String(phishingCount + confirmedCount), icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", trend: "+14 today" },
    { label: "Total Analyzed", value: String(totalAnalyzed), icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", trend: "all time" },
    { label: "Detection Speed", value: avgMs > 0 ? `${avgMs}ms` : "<1.5s", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", trend: "avg inference" },
    { label: "AI Accuracy", value: accuracy != null ? `${accuracy}%` : "Pending", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", trend: "from feedback" },
  ]

  const quickActions = [
    { label: "Analyze Email", href: "/dashboard/analyze", icon: Search, desc: "Paste email or URL", color: "blue" },
    { label: "Check Inbox", href: "/dashboard/inbox", icon: Inbox, desc: "Gmail integration", color: "emerald" },
    { label: "URL Sandbox", href: "/dashboard/sandbox", icon: Eye, desc: "Deep isolation scan", color: "purple" },
    { label: "Bulk Scan", href: "/dashboard/bulk", icon: Upload, desc: "CSV batch analysis", color: "amber" },
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <header className="border-b border-white/5 pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shadow-xl">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-foreground uppercase">PhishGuard Dashboard</h1>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] pl-14">
              PS-01 · Real-time phishing detection · 5-layer AI fusion
            </p>
          </div>
          <Link href="/dashboard/analyze">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 h-10 font-black uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-105 transition-all">
              <Zap className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </Link>
        </div>
      </header>

      {/* KPI Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className={cn("card-cyber p-5 space-y-4 group hover:scale-[1.02] transition-all cursor-default border", kpi.bg)}>
              <div className="flex items-center justify-between">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center border", kpi.bg)}>
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
                <span className={cn("text-[8px] font-black uppercase tracking-widest opacity-60", kpi.color)}>{kpi.trend}</span>
              </div>
              <div>
                <p className="text-3xl font-black tracking-tighter text-foreground">{kpi.value}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-1">{kpi.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Scan Widget */}
      <Card className="card-cyber p-6 border-t-2 border-t-blue-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><Zap className="h-24 w-24 text-blue-400" /></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 space-y-1">
            <h3 className="text-sm font-black uppercase tracking-tight text-foreground">Quick Phishing Check</h3>
            <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest">Paste any URL or email snippet for instant AI analysis</p>
          </div>
          <div className="flex-1 w-full flex gap-3">
            <input
              value={quickInput}
              onChange={e => setQuickInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleQuickScan()}
              placeholder="https://suspicious-site.xyz or paste email text..."
              className="flex-1 bg-[#0D1B2A] border border-white/10 focus:border-blue-500/40 rounded-xl px-4 h-10 text-xs font-mono text-slate-300 outline-none transition-colors placeholder:text-slate-700"
            />
            <Button onClick={handleQuickScan} disabled={quickLoading || !quickInput.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white h-10 px-5 rounded-xl font-black uppercase tracking-widest text-[9px] disabled:opacity-40">
              {quickLoading ? <div className="h-3.5 w-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
          {quickResult && (
            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap",
              quickResult.verdict === "PHISHING" || quickResult.verdict === "CONFIRMED_THREAT" ? "bg-red-500/10 border-red-500/20"
              : quickResult.verdict === "SUSPICIOUS" ? "bg-amber-500/10 border-amber-500/20"
              : "bg-emerald-500/10 border-emerald-500/20"
            )}>
              {quickResult.verdict !== "CLEAN" ? <ShieldAlert className="h-4 w-4 text-red-400" /> : <ShieldCheck className="h-4 w-4 text-emerald-400" />}
              <span className={cn("text-[10px] font-black uppercase", quickResult.verdict !== "CLEAN" ? "text-red-400" : "text-emerald-400")}>
                {Math.round(quickResult.score * 100)}% — {quickResult.verdict.replace("_", " ")}
              </span>
              <Link href="/dashboard/analyze">
                <ArrowRight className="h-3.5 w-3.5 text-blue-400 hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Link key={i} href={action.href}>
            <Card className={cn("card-cyber p-5 h-full cursor-pointer transition-all hover:scale-[1.03] group",
              action.color === "blue" ? "hover:border-blue-500/30 hover:bg-blue-500/5"
              : action.color === "emerald" ? "hover:border-emerald-500/30 hover:bg-emerald-500/5"
              : action.color === "purple" ? "hover:border-purple-500/30 hover:bg-purple-500/5"
              : "hover:border-amber-500/30 hover:bg-amber-500/5"
            )}>
              <div className="flex items-center justify-between mb-4">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center border transition-colors",
                  action.color === "blue" ? "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:border-blue-500/40"
                  : action.color === "emerald" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : action.color === "purple" ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                )}>
                  <action.icon className="h-4 w-4" />
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-700 group-hover:text-slate-400 transition-all group-hover:translate-x-0.5" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-tight text-slate-300 group-hover:text-foreground transition-colors">{action.label}</h4>
              <p className="text-[9px] text-slate-600 uppercase font-bold tracking-widest mt-1">{action.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts + Feed Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <ThreatTimeline />
          {/* Brand Impersonation */}
          {historyStats && historyStats.top_impersonated_brands.length > 0 && (
            <Card className="card-cyber p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <BarChart2 className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">Top Impersonated Brands</span>
              </div>
              <div className="space-y-3">
                {historyStats.top_impersonated_brands.map(([brand, count], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 w-24 truncate">{brand}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500/60 rounded-full" style={{ width: `${(count / historyStats.top_impersonated_brands[0][1]) * 100}%` }} />
                    </div>
                    <span className="text-[9px] font-mono text-red-400">{count}x</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <RiskDonut />
          <ThreatFeed compact />
        </div>
      </div>
    </div>
  )
}
