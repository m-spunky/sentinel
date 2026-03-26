"use client"

import React from "react"
import { Monitor, Mail, ShieldCheck, Clock, PlusCircle, Search, MessageSquare, Target, Activity, Share2, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { ThreatFeed } from "@/components/dashboard/ThreatFeed"
import { ThreatChart } from "@/components/dashboard/ThreatChart"

const kpiData = [
  { title: "Threats Detected", value: "1,284", trend: "+12.5%", trendType: "up", icon: Monitor, color: "destructive" },
  { title: "Emails Analyzed", value: "48,902", trend: "+8.2%", trendType: "up", icon: Mail, color: "accent" },
  { title: "Active Campaigns", value: "14", trend: "-5.0%", trendType: "down", icon: Target, color: "accent" },
  { title: "Avg Response Time", value: "1.2s", trend: "Stable", trendType: "neutral", icon: Clock, color: "accent" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {kpiData.map((kpi, i) => (
          <KpiCard key={i} {...kpi as any} />
        ))}
      </section>

      {/* Main Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Main Stats) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Activity Graph Big Card */}
          <Card className="card-cyber overflow-hidden group">
            <CardHeader className="p-6 border-b border-white/5 space-y-2 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-accent" />
                  Threat Activity Timeline
                </CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1 italic">
                  Real-time threat detection telemetry analysis
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                 <Badge variant="outline" className="text-[8px] h-5 rounded-full px-3 py-0 border-white/10 uppercase font-black tracking-widest">
                    Last 24h
                 </Badge>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
                    <Share2 className="h-4 w-4" />
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] w-full flex flex-col justify-between items-stretch">
                <div className="flex-1 flex items-end space-x-1 mb-8">
                   {/* Mock Line Graph */}
                   {Array.from({ length: 48 }).map((_, i) => (
                     <div 
                        key={i} 
                        className="flex-1 bg-accent/20 rounded-t-sm transition-all duration-300 hover:bg-accent hover:h-[110%] group/bar relative"
                        style={{ height: `${20 + Math.random() * 80}%` }}
                     >
                        <div className="absolute inset-0 bg-accent/20 blur opacity-0 group-hover/bar:opacity-40" />
                     </div>
                   ))}
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground pt-4 border-t border-white/5 opacity-40">
                   <span>00:00</span>
                   <span>06:00</span>
                   <span>12:00</span>
                   <span>18:00</span>
                   <span>24:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Double Column Sub-stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ThreatFeed />
            <ThreatChart />
          </div>
        </div>

        {/* Right Column (Actions & Highlights) */}
        <div className="lg:col-span-4 space-y-6">
           {/* Quick Actions Panel */}
           <Card className="card-cyber overflow-hidden group">
              <CardHeader className="p-6 border-b border-white/5">
                 <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center group-hover:text-accent transition-colors">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Quick Scan Actions
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex flex-col space-y-3">
                 {[
                   { name: "Analyze Email", icon: Mail, color: "accent", desc: "Scan for phishing signatures" },
                   { name: "Threat Hunting", icon: Search, color: "accent", desc: "Live database intelligence" },
                   { name: "Open Fusion Chat", icon: MessageSquare, color: "accent", desc: "Consult SentinelAI LLM" },
                   { name: "Policy Audit", icon: ShieldCheck, color: "destructive", desc: "Review security protocols" },
                 ].map((action, i) => (
                   <Button 
                      key={i} 
                      variant="ghost" 
                      className="h-20 w-full justify-start items-center space-x-4 bg-white/5 border border-white/5 hover:border-accent/40 hover:bg-accent/10 rounded-2xl p-4 transition-all duration-300"
                   >
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                        action.color === "accent" ? "bg-accent/10 border border-accent/20 text-accent accent-glow" : "bg-destructive/10 border border-destructive/20 text-destructive"
                      )}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start min-w-0">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">{action.name}</span>
                         <span className="text-[9px] text-muted-foreground uppercase tracking-widest leading-tight mt-1 truncate">{action.desc}</span>
                      </div>
                   </Button>
                 ))}
              </CardContent>
           </Card>

           {/* Performance Highlights */}
           <Card className="bg-accent/10 border-[#00C9A7]/20 rounded-2xl shadow-xl shadow-black/20 overflow-hidden p-6 relative group">
              <div className="absolute top-0 right-0 p-4">
                 <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center border border-white/20 shadow-xl scale-[0.8]">
                    <Activity className="h-4 w-4" />
                 </div>
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">SOC Efficiency</h4>
              <div className="space-y-6">
                 <div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground">False Positive Rate</span>
                      <span className="text-[10px] font-black text-accent">2.4%</span>
                   </div>
                   <div className="h-1.5 w-full bg-black/40 rounded-full border border-white/5 overflow-hidden">
                      <div className="h-full w-[20%] bg-accent transition-all duration-1000" />
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground">AI Accuracy Index</span>
                      <span className="text-[10px] font-black text-accent">98.9%</span>
                   </div>
                   <div className="h-1.5 w-full bg-black/40 rounded-full border border-white/5 overflow-hidden">
                      <div className="h-full w-[95%] bg-accent transition-all duration-1000" />
                   </div>
                 </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center opacity-60">
                 <span className="text-[8px] font-black uppercase tracking-widest">Global Status:</span>
                 <Badge className="bg-green-500/20 text-green-500 border-green-500/20 text-[6px] h-4 rounded-full px-2 uppercase font-black uppercase tracking-widest">Operational</Badge>
              </div>
           </Card>
        </div>
      </section>
    </div>
  )
}
