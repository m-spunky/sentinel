"use client"

import React from "react"
import { ShieldAlert, ShieldCheck, Mail, Globe, Zap, Clock, ChevronRight, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type CampaignStatus = "Active" | "Mitigated" | "Investigating"
export type RiskLevel = "HIGH" | "MEDIUM" | "LOW"

interface CampaignItemProps {
  id: string
  type: string
  risk: RiskLevel
  status: CampaignStatus
  actor: string
  time: string
  active?: boolean
  onClick?: () => void
}

export function CampaignItem({ id, type, risk, status, actor, time, active, onClick }: CampaignItemProps) {
  return (
    <div 
      className={cn(
        "group relative p-4 rounded-xl border border-white/5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col space-y-3",
        active 
          ? "bg-accent/10 border-accent/30 shadow-[0_0_20px_rgba(0,201,167,0.15)] ring-1 ring-accent/20" 
          : "bg-[#0D1B2A]/40 hover:bg-white/5 hover:border-white/10"
      )}
      onClick={onClick}
    >
      {/* Glow highlight for active state */}
      {active && (
        <div className="absolute top-0 right-0 p-2 opacity-20">
           <Zap className="h-10 w-10 text-accent blur-sm" />
        </div>
      )}
      
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-2">
            <div className={cn(
               "h-1.5 w-1.5 rounded-full animate-pulse",
               risk === "HIGH" ? "bg-destructive" : risk === "MEDIUM" ? "bg-yellow-500" : "bg-accent"
            )} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground underline decoration-accent/10 underline-offset-4">{id}</span>
         </div>
         <Badge className={cn(
           "text-[8px] h-4 rounded-full px-2 uppercase font-black tracking-widest border-none",
           status === "Active" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
         )}>
           {status}
         </Badge>
      </div>

      <div className="flex items-center space-x-3">
         <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-accent/20 transition-colors">
            {type.toLowerCase().includes("email") || type.toLowerCase().includes("phish") ? <Mail className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" /> : <Globe className="h-5 w-5 text-muted-foreground" />}
         </div>
         <div className="flex-1 min-w-0">
            <h4 className="text-[11px] font-bold text-foreground truncate group-hover:text-accent transition-colors">{type}</h4>
            <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5 max-w-[150px] truncate italic">Actor: {actor}</p>
         </div>
         <ChevronRight className={cn(
           "h-4 w-4 text-muted-foreground transition-all",
           active ? "opacity-100 translate-x-0 text-accent" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
         )} />
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-white/5 opacity-60">
         <div className="flex items-center text-[7px] font-black uppercase tracking-widest text-muted-foreground">
            <Clock className="h-2.5 w-2.5 mr-1" />
            {time}
         </div>
         <span className={cn(
           "text-[7px] font-black uppercase tracking-widest",
           risk === "HIGH" ? "text-destructive" : risk === "MEDIUM" ? "text-yellow-500" : "text-accent"
         )}>{risk} RISK</span>
      </div>
    </div>
  )
}
