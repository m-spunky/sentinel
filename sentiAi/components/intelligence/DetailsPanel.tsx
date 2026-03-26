import React from "react"
import { ShieldAlert, Globe, Activity, ShieldCheck, Target, Flag, Search, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RelationshipList } from "./RelationshipList"
import { cn } from "@/lib/utils"

export function DetailsPanel() {
  const currentEntity = {
    name: "FIN7 / GIBON",
    type: "actor" as const,
    risk: "Critical",
    threat_actor: "FIN7",
    campaign: "CAMP-2026-1847",
    mitre: ["T1566", "T1078", "T1059", "T1547"],
    description: "FIN7 is a financially motivated threat actor that has primarily targeted the retail, food service, and hospitality sectors since mid-2015. The group is sophisticated and has utilized various tools including GIBON loader and GRIFFON backdoors."
  }

  const relationships = [
    { name: "CAMP-2026-1847", type: "campaign" as const, relation: "Executing Infrastructure" },
    { name: "auth-login.net", type: "domain" as const, relation: "Command & Control Node" },
    { name: "192.168.45.21", type: "ip" as const, relation: "Infiltration Source" },
    { name: "CAMP-2026-0912", type: "campaign" as const, relation: "Historical Link" },
  ]

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
      {/* Entity Summary */}
      <Card className="card-cyber overflow-hidden group">
        <CardHeader className="p-6 border-b border-white/5 space-y-3 bg-red-500/3">
          <div className="flex items-center justify-between">
            <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 text-[8px] h-5 rounded-full px-3 uppercase font-bold tracking-widest animate-pulse">Advanced Persistent Threat</Badge>
            <ShieldAlert className="h-4 w-4 text-red-400" />
          </div>
          <div className="space-y-1">
             <CardTitle className="text-2xl font-black tracking-tighter text-foreground uppercase group-hover:text-red-400 transition-colors">
                {currentEntity.name}
             </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
           <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest mb-1 block">Risk Level</span>
                <span className="text-lg font-black text-red-400 tracking-tighter font-mono">Critical</span>
              </div>
              <div className="p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest mb-1 block">Entity Type</span>
                <span className="text-lg font-black text-slate-200 tracking-tighter font-mono">Actor</span>
              </div>
           </div>

           <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <Flag className="h-3 w-3 text-red-400" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">MITRE ATT&CK Techniques</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                 {currentEntity.mitre.map((tag, i) => (
                   <Badge key={i} variant="outline" className="border-red-500/20 text-red-400 text-[8px] h-5 rounded-lg px-2 uppercase font-bold tracking-widest cursor-pointer hover:bg-red-500/10 transition-all">
                      {tag}
                   </Badge>
                 ))}
              </div>
           </div>

           <div className="space-y-2">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Actor Profile</h4>
              <p className="text-[10px] text-slate-400 leading-[1.8] font-medium tracking-tight italic">
                {currentEntity.description}
              </p>
           </div>
        </CardContent>
      </Card>

      {/* Relationships */}
      <Card className="card-cyber overflow-hidden p-6">
         <RelationshipList items={relationships} />
      </Card>

      {/* Activity Frequency */}
      <Card className="card-cyber p-6 flex-1 flex flex-col justify-between">
         <div className="space-y-4">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Observed Activity Frequency</h4>

            <div className="h-24 w-full flex items-end justify-between gap-0.5 pt-4">
               {[40, 70, 45, 90, 65, 30, 85, 40, 55, 75, 95, 60, 40, 70, 45, 90, 65, 30, 85, 40, 55, 75, 95, 60].map((h, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-t-sm transition-all duration-500 hover:scale-y-110",
                      i > 15 && i < 20 ? "bg-red-500/40 hover:bg-red-500/60" : "bg-white/5 hover:bg-blue-500/20"
                    )}
                    style={{ height: `${h}%` }}
                  />
               ))}
            </div>
            <div className="flex justify-between text-[7px] text-slate-600 uppercase font-bold tracking-widest">
               <span>T-24h</span>
               <span>T-12h</span>
               <span>Now</span>
            </div>
         </div>

         <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-2">
            {[
              { label: "Investigate", icon: Search, cls: "bg-blue-500/10 text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/15" },
              { label: "Block IOC", icon: Trash2, cls: "bg-red-500/10 text-red-400 hover:border-red-500/30 hover:bg-red-500/15" },
              { label: "Add Watch", icon: Eye, cls: "bg-blue-500/10 text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/15" },
            ].map((btn, i) => (
              <button
                 key={i}
                 className={cn(
                   "flex flex-col items-center justify-center h-14 rounded-xl border border-white/5 transition-all hover:scale-105 active:scale-95 gap-1.5",
                   btn.cls
                 )}
              >
                 <btn.icon className="h-3.5 w-3.5" />
                 <span className="text-[7px] font-bold uppercase tracking-widest">{btn.label}</span>
              </button>
            ))}
         </div>
      </Card>
    </div>
  )
}
