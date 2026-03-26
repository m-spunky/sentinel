"use client"

import React, { useEffect, useState } from "react"
import { Monitor, Mail, Target, Clock, PlusCircle, Search, MessageSquare, ShieldCheck, Activity, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ThreatFeed } from "@/components/dashboard/ThreatFeed"
import { ThreatTimeline } from "@/components/dashboard/ThreatTimeline"
import { RiskDonut } from "@/components/dashboard/RiskDonut"
import { getDashboardMetrics, getThreatTimeline, type DashboardMetrics } from "@/lib/api"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface TimelinePoint {
  time: string
  threat_count: number
  type_breakdown?: Record<string, number>
}

export default function DashboardPage() {
  const router = useRouter()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [timelineData, setTimelineData] = useState<TimelinePoint[]>([])
  const [totalThreats, setTotalThreats] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m, t] = await Promise.all([
          getDashboardMetrics(),
          getThreatTimeline(24),
        ])
        setMetrics(m)
        setTimelineData(t.data_points)
        setTotalThreats(t.total_threats || 0)
      } catch {
        // Fallback data
        const fallback = Array.from({ length: 25 }, (_, i) => ({
          time: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
          threat_count: Math.floor(5 + Math.sin(i * 0.5) * 8 + Math.random() * 6),
          type_breakdown: {
            phishing: Math.floor(Math.random() * 8),
            malware: Math.floor(Math.random() * 3),
            behavioral: Math.floor(Math.random() * 2),
            other: 0,
          },
        }))
        setTimelineData(fallback)
      }
    }
    loadData()
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const kpis = [
    {
      title: "Threats Detected",
      value: metrics ? metrics.threats_detected.toLocaleString() : "1,284",
      sub: "+12.5% vs last week",
      icon: Monitor,
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
    },
    {
      title: "Emails Analyzed",
      value: metrics ? metrics.emails_analyzed.toLocaleString() : "48,902",
      sub: "+8.2% vs last week",
      icon: Mail,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Active Campaigns",
      value: metrics ? String(metrics.active_campaigns) : "7",
      sub: "5 critical · 2 high",
      icon: Target,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Avg Response Time",
      value: metrics ? `${(metrics.avg_response_time_ms / 1000).toFixed(1)}s` : "1.2s",
      sub: "Multi-modal inference",
      icon: Clock,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ]

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  return (
    <div className="space-y-8 pb-10">
      {/* KPI Row */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className={cn("card-cyber border", kpi.bg)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", kpi.bg)}>
                    <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                  </div>
                  <Badge variant="outline" className="text-[9px] border-white/10 text-slate-500 uppercase font-mono">
                    Live
                  </Badge>
                </div>
                <div className={cn("text-3xl font-bold font-mono mb-1", kpi.color)}>
                  {kpi.value}
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{kpi.title}</div>
                <div className="text-[9px] text-slate-600 mt-1">{kpi.sub}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Main grid */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
      >
        {/* Left: Timeline + Feed */}
        <div className="xl:col-span-8 space-y-6">
          <ThreatTimeline data={timelineData} hours={24} totalThreats={totalThreats} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <ThreatFeed />
            </div>
            <div className="md:col-span-1">
              <RiskDonut
                totalScore={metrics ? Math.round(metrics.threats_detected / (metrics.emails_analyzed / 100)) : 78}
                riskLabel="Elevated"
              />
            </div>
          </div>
        </div>

        {/* Right: Actions + Stats */}
        <div className="xl:col-span-4 space-y-6">
          {/* Quick Actions */}
          <Card className="card-cyber">
            <CardHeader className="p-5 border-b border-white/5">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <PlusCircle className="h-3.5 w-3.5 text-blue-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {[
                { name: "Analyze Email / URL", icon: Mail, href: "/dashboard/analyze", color: "text-blue-400", bg: "bg-blue-500/10", desc: "Multi-modal detection" },
                { name: "Threat Hunting", icon: Search, href: "/dashboard/intelligence", color: "text-amber-400", bg: "bg-amber-500/10", desc: "Knowledge graph explorer" },
                { name: "SentinelChat", icon: MessageSquare, href: "/dashboard/chat", color: "text-emerald-400", bg: "bg-emerald-500/10", desc: "AI security assistant" },
                { name: "View Campaigns", icon: ShieldCheck, href: "/dashboard/campaigns", color: "text-purple-400", bg: "bg-purple-500/10", desc: "50 active campaigns" },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => router.push(action.href)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-white/3 border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all text-left group"
                >
                  <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", action.bg)}>
                    <action.icon className={cn("h-4 w-4", action.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-tight">{action.name}</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest">{action.desc}</div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* SOC Efficiency */}
          <Card className="card-cyber bg-blue-500/5 border-blue-500/15">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400">SOC Efficiency</h4>
                <Activity className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div className="space-y-4">
                {[
                  { label: "AI Accuracy", value: metrics ? metrics.ai_accuracy * 100 : 98.9, suffix: "%" },
                  { label: "False Positive Rate", value: metrics ? metrics.false_positive_rate * 100 : 2.4, suffix: "%", invert: true },
                  { label: "Coverage", value: 99.2, suffix: "%" },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">{stat.label}</span>
                      <span className="text-[10px] text-blue-400 font-bold font-mono">
                        {stat.value.toFixed(1)}{stat.suffix}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.invert ? 100 - stat.value : stat.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 uppercase font-mono">Global Status</span>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px] uppercase font-mono">
                  Operational
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  )
}
