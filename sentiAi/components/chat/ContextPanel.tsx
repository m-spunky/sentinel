import React from "react"
import { ShieldAlert, Globe, Activity, Zap, Target, Share2, Link2, ExternalLink, ActivityIcon, PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ContextPanel() {
  const relatedEntities = [
    { name: "auth-login.net", type: "Domain", status: "Malicious" },
    { name: "192.168.45.21", type: "IP", status: "Suspicious" },
    { name: "CAMP-2026-1847", type: "Campaign", status: "Active" },
    { name: "fin7-payload-exe", type: "File", status: "Infected" },
  ]

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">

      {/* Threat Info */}
      <Card className="card-cyber group relative overflow-hidden">
        <CardHeader className="p-5 border-b border-white/5 bg-blue-500/3">
          <div className="flex items-center justify-between">
            <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 text-[8px] h-5 rounded-full px-3 uppercase font-bold tracking-widest animate-pulse">High Risk Identified</Badge>
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="space-y-1 mt-3">
             <CardTitle className="text-lg font-black tracking-tighter text-foreground">
                THREAT ID: <span className="text-blue-400">#8472-X</span>
             </CardTitle>
             <CardDescription className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                Classification: Phishing / Actor: FIN7
             </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
           <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest mb-1 block">Confidence</span>
                <span className="text-lg font-black text-blue-400 tracking-tighter font-mono">98.9%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest mb-1 block">Detection Time</span>
                <span className="text-lg font-black text-slate-200 tracking-tighter font-mono">0.4s</span>
              </div>
           </div>

           <div className="space-y-2">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">Entity Relationships</h4>

              {relatedEntities.map((entity, i) => (
                <div key={i} className="flex items-center justify-between p-2 px-3 rounded-lg bg-[#0D1B2A]/40 border border-white/5 hover:border-blue-500/20 transition-all cursor-pointer group/item">
                   <div className="flex items-center gap-2.5">
                      <div className={cn(
                        "p-1.5 rounded-md",
                        entity.status === "Malicious" || entity.status === "Infected"
                          ? "bg-red-500/10 text-red-400"
                          : entity.status === "Active"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-amber-500/10 text-amber-400"
                      )}>
                         {entity.type === "Domain" ? <Globe className="h-3 w-3" />
                           : entity.type === "IP" ? <ActivityIcon className="h-3 w-3" />
                           : entity.type === "Campaign" ? <Target className="h-3 w-3" />
                           : <Link2 className="h-3 w-3" />}
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-slate-300 group-hover/item:text-blue-300 transition-colors truncate w-32 font-mono">{entity.name}</span>
                         <span className="text-[7px] text-slate-600 uppercase font-bold tracking-widest mt-0.5">{entity.type}</span>
                      </div>
                   </div>
                   <ExternalLink className="h-3 w-3 text-slate-600 opacity-0 group-hover/item:opacity-60 transition-all group-hover/item:translate-x-0.5" />
                </div>
              ))}
           </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="card-cyber p-5">
         <div className="flex flex-col space-y-4">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
               <Zap className="h-3.5 w-3.5" />
               Operations Center
            </h4>

            <div className="grid grid-cols-2 gap-2">
               {[
                 { label: "Quarantine", icon: ShieldAlert, cls: "bg-red-500/10 text-red-400 hover:border-red-500/30 hover:bg-red-500/15" },
                 { label: "Block Domain", icon: Globe, cls: "bg-red-500/10 text-red-400 hover:border-red-500/30 hover:bg-red-500/15" },
                 { label: "Escalate L3", icon: Activity, cls: "bg-blue-500/10 text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/15" },
                 { label: "Export PDF", icon: Share2, cls: "bg-amber-500/10 text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/15" },
               ].map((btn, i) => (
                 <button
                    key={i}
                    className={cn(
                      "flex flex-col items-center justify-center h-16 rounded-xl border border-white/5 p-3 transition-all hover:scale-105 active:scale-95 gap-1.5",
                      btn.cls
                    )}
                 >
                    <btn.icon className="h-4 w-4" />
                    <span className="text-[8px] font-bold uppercase tracking-widest leading-none">{btn.label}</span>
                 </button>
               ))}
            </div>

            <button className="w-full bg-white/3 border border-blue-500/10 text-blue-400 font-bold uppercase tracking-widest text-[9px] h-9 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/20 transition-all flex items-center justify-center gap-1.5">
               <PlusCircle className="h-3 w-3" />
               Audit Node Activity
            </button>
         </div>
      </Card>

      {/* Knowledge Graph loader */}
      <Card className="card-cyber bg-blue-500/3 flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 group">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
         <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full border-4 border-blue-500/40 border-t-blue-400 animate-spin flex items-center justify-center">
               <div className="h-8 w-8 rounded-full bg-blue-500/20 animate-pulse" />
            </div>
            <div className="space-y-1">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Generating Knowledge Graph</h4>
               <p className="text-[8px] text-slate-600 uppercase font-bold tracking-widest italic">Analyzing 4,821 entity nodes...</p>
            </div>
         </div>
      </Card>
    </div>
  )
}
