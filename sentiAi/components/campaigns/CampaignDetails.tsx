"use client"

import React from "react"
import { ShieldAlert, ShieldCheck, Globe, MessageSquare, Activity, User, Target, Share2, Printer, MoreVertical, PlusCircle, Trash2, Edit2, Zap, LayoutDashboard, Globe2, Link2, Monitor, Users, AlertTriangle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ActionPanel } from "./ActionPanel"
import { cn } from "@/lib/utils"

interface CampaignDetailsProps {
  id: string
  type: string
  risk: string
  status: string
  actor: string
  time: string
}

export function CampaignDetails({ id, type, risk, status, actor, time }: CampaignDetailsProps) {
  const indicators = ["auth-login.net", "192.168.45.21", "secure-pay.ua", "cloud-verify.io", "v-log.ru"]
  
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-right-12 duration-1000">
       {/* 🧩 CAMPAIGN OVERVIEW */}
       <Card className="card-cyber overflow-hidden group">
          <CardHeader className="p-8 border-b border-white/5 bg-accent/5 backdrop-blur-md flex flex-row items-center justify-between">
             <div className="flex items-center space-x-6">
                <div className="h-16 w-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shadow-2xl accent-glow border-2 border-white/10 transition-transform group-hover:scale-105">
                   <Target className="h-10 w-10" />
                </div>
                <div className="space-y-1">
                   <div className="flex items-center space-x-3">
                      <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">{id} <span className="text-accent underline decoration-accent/10 underline-offset-8">DETAILS</span></h2>
                      <Badge className={cn(
                        "text-[10px] h-6 rounded-lg px-3 uppercase font-black tracking-widest",
                        status === "Active" ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-accent text-accent-foreground"
                      )}>{status}</Badge>
                   </div>
                   <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.4em]">Origin: {actor} <span className="mx-2 text-white/10">|</span> Detection Delta: 1.2s</p>
                </div>
             </div>
             <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl">
                   <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl">
                   <Printer className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl">
                   <Edit2 className="h-5 w-5" />
                </Button>
             </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-12">
             <div className="grid grid-cols-4 gap-6">
                {[
                  { label: "Target Depts", value: "8 Active", icon: Monitor, color: "text-foreground" },
                  { label: "Users Affected", value: "248 Nodes", icon: Users, color: "text-foreground" },
                  { label: "Detected Tactics", value: "14 Flags", icon: AlertTriangle, color: "text-destructive" },
                  { label: "Inference Conf.", value: "98.9%", icon: ShieldCheck, color: "text-accent" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#0D1B2A]/60 border border-white/5 hover:border-accent/30 transition-all cursor-pointer group/stat">
                     <div className="flex items-center text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-2 group-hover/stat:text-accent transition-colors">
                        <stat.icon className="h-3 w-3 mr-2" />
                        {stat.label}
                     </div>
                     <h3 className={cn("text-xl font-black tracking-tighter", stat.color)}>{stat.value}</h3>
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-2 gap-12 pt-4">
                <div className="space-y-6">
                   <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center">
                         <Globe2 className="h-4 w-4 mr-2" />
                         Related Indicators
                      </h4>
                      <Badge variant="ghost" className="text-[9px] font-bold text-muted-foreground">IOCs Found: 14</Badge>
                   </div>
                   <div className="flex flex-wrap gap-2">
                      {indicators.map((tag, i) => (
                        <div key={i} className="flex items-center px-4 py-2 bg-white/5 border border-white/5 rounded-xl hover:bg-destructive/10 hover:border-destructive/30 cursor-pointer transition-all group/tag">
                           <Link2 className="h-3.5 w-3.5 text-muted-foreground mr-3 group-hover/tag:text-destructive transition-colors rotate-45" />
                           <span className="text-[10px] font-bold text-foreground group-hover/tag:text-destructive transition-colors">{tag}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center">
                         <TrendingUp className="h-4 w-4 mr-2" />
                         Attack Velocity
                      </h4>
                      <Badge variant="ghost" className="text-[8px] font-black uppercase tracking-widest text-destructive animate-pulse">+128% Trend</Badge>
                   </div>
                   
                   <div className="h-32 w-full flex items-end justify-between space-x-1.5 pt-4">
                      {[42, 58, 23, 85, 91, 14, 66, 30, 77, 45, 12, 89, 54, 38, 71, 95, 23, 67, 41, 88, 55, 33, 76, 49, 10, 82, 36, 68, 92, 44, 18, 75, 59, 31, 87, 62, 28, 98, 51, 15, 74, 40, 60, 22, 90, 48, 35, 79].map((h, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "flex-1 rounded-sm transition-all duration-700 hover:scale-y-125 hover:bg-destructive",
                            i > 30 && i < 40 ? "bg-destructive/40" : "bg-white/5"
                          )}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                   </div>
                </div>
             </div>
          </CardContent>
       </Card>

       <ActionPanel />
    </div>
  )
}
