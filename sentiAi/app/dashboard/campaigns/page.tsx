"use client"

import React, { useState } from "react"
import { Search, PlusCircle, ShieldAlert, Globe, Activity, LayoutDashboard, Target, Share2, MoreHorizontal, Maximize2, ZoomIn, ZoomOut, RotateCcw, Filter, User, LayoutList, Mail, Zap, TrendingUp, History } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CampaignList } from "@/components/campaigns/CampaignList"
import { CampaignDetails } from "@/components/campaigns/CampaignDetails"
import { cn } from "@/lib/utils"

const mockCampaigns = [
  { id: "#CAMP-2402", type: "Targeted Phishing", risk: "HIGH" as const, status: "Active" as const, actor: "FIN7 / GIBON", time: "2m ago" },
  { id: "#CAMP-2401", type: "Retail Cred Shifting", risk: "MEDIUM" as const, status: "Investigating" as const, actor: "REvil Variant", time: "1h ago" },
  { id: "#CAMP-2398", type: "Executive Spear-Phish", risk: "HIGH" as const, status: "Active" as const, actor: "TA505 / CLOP", time: "4h ago" },
  { id: "#CAMP-2395", type: "OAuth Token Hijack", risk: "LOW" as const, status: "Mitigated" as const, actor: "APT29 Shadow", time: "1d ago" },
  { id: "#CAMP-2390", type: "Supply Chain Malform", risk: "HIGH" as const, status: "Active" as const, actor: "Lazarus Core", time: "2d ago" },
  { id: "#CAMP-2384", type: "HR Portal Spoof", risk: "MEDIUM" as const, status: "Mitigated" as const, actor: "Unknown Actor", time: "1w ago" },
]

export default function CampaignsPage() {
  const [activeId, setActiveId] = useState(mockCampaigns[0].id)
  
  const activeCampaign = mockCampaigns.find(c => c.id === activeId) || mockCampaigns[0]

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-2">
           <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xl shadow-accent/10 border border-accent/30 transition-transform hover:scale-105">
                 <Target className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Threat Campaigns</h1>
           </div>
           <div className="flex items-center space-x-2 pl-12 opacity-80 transition-opacity hover:opacity-100">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em]">Track and manage active attack campaigns across enterprise nodes <span className="text-accent italic lowercase font-normal italic">v2.4-stable</span></p>
           </div>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
           <div className="hidden lg:flex items-center space-x-6 mr-6 border-r border-white/10 pr-6 h-10">
              <div className="flex flex-col items-end">
                 <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Active Delta</span>
                 <span className="text-sm font-black text-destructive tracking-tighter leading-none">+14 Today</span>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Mitigation rate</span>
                 <span className="text-sm font-black text-accent tracking-tighter leading-none">94.8%</span>
              </div>
           </div>
           
           <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl">
              <Filter className="h-5 w-5" />
           </Button>
           <Button className="rounded-xl bg-accent text-accent-foreground font-black uppercase tracking-widest px-6 h-10 shadow-xl shadow-accent/10 hover:bg-accent/90 transition-all hover:scale-105 active:scale-95">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Campaign
           </Button>
        </div>
      </header>

      {/* Campaigns Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Campaign List (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 min-h-[500px] lg:h-[850px]">
           <CampaignList 
              items={mockCampaigns} 
              activeId={activeId} 
              onSelect={setActiveId} 
           />
        </div>
        
        {/* Campaign Details (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 min-h-[600px] lg:min-h-[850px]">
           <CampaignDetails {...activeCampaign} />
        </div>
      </section>

      {/* Global Campaign Activity Timeline (Optional Visual) */}
      <div className="col-span-12 pt-6">
         <Card className="card-cyber p-10 relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <History className="h-32 w-32 " />
            </div>
            <div className="space-y-8 relative z-10">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black tracking-tighter text-foreground uppercase">Historical Threat Landscape</h3>
                     <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
                        Analyzing attack frequency across global enterprise clusters
                     </p>
                  </div>
                  <Badge variant="outline" className="border-accent/30 text-accent text-[8px] h-5 px-3 uppercase font-black tracking-widest">Aggregate View</Badge>
               </div>
               
               <div className="h-48 w-full flex items-end justify-between space-x-1.5 pt-10">
                  {Array.from({ length: 72 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex-1 rounded-sm transition-all duration-700 hover:bg-accent hover:h-[120%] cursor-pointer group/bar relative",
                        i % 12 === 0 ? "bg-accent/40" : "bg-white/5"
                      )}
                      style={{ height: `${15 + Math.random() * 85}%` }}
                    >
                       <div className="absolute inset-0 bg-accent blur-xl opacity-0 group-hover/bar:opacity-30" />
                    </div>
                  ))}
               </div>
               
               <div className="flex justify-between text-[7px] text-muted-foreground/30 uppercase font-black tracking-[0.5em] pt-4 border-t border-white/5">
                  <span>JAN-2026</span>
                  <span>FEB-2026</span>
                  <span>MAR-2026</span>
                  <span>APR-2026</span>
                  <span>MAY-2026</span>
                  <span>CURRENT CYCLE</span>
               </div>
            </div>
         </Card>
      </div>
    </div>
  )
}
