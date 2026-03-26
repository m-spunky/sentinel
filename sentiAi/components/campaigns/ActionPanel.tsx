import React from "react"
import { ShieldAlert, Globe, MessageSquare, Activity, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ActionPanel() {
  const actions = [
    { label: "Quarantine", icon: ShieldAlert, cls: "border-red-500/20 hover:border-red-500/40 text-red-400 hover:bg-red-500/8", desc: "Isolate related assets" },
    { label: "Block Domains", icon: Globe, cls: "border-orange-500/20 hover:border-orange-500/40 text-orange-400 hover:bg-orange-500/8", desc: "Update sinkholes" },
    { label: "Notify Team", icon: MessageSquare, cls: "border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:bg-blue-500/8", desc: "Send security alerts" },
    { label: "Escalate L3", icon: Activity, cls: "border-amber-500/20 hover:border-amber-500/40 text-amber-400 hover:bg-amber-500/8", desc: "Alert global response" },
  ]

  return (
    <Card className="card-cyber border-t-2 border-t-blue-500/30 overflow-hidden relative bg-blue-500/3">
      <div className="absolute top-0 right-0 p-8 opacity-10">
         <ShieldCheck className="h-24 w-24 text-blue-400" />
      </div>
      <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
         <div className="space-y-3 text-center md:text-left">
            <h2 className="text-xl font-bold tracking-tight text-slate-200 uppercase font-mono">Response Operations</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">
               Deploy automated remediation for active campaign
            </p>
         </div>

         <div className="flex flex-wrap items-center justify-center gap-3">
            {actions.map((btn, i) => (
              <button
                key={i}
                className={cn(
                  "flex flex-col items-center justify-center h-20 w-36 rounded-xl border font-bold uppercase tracking-wider text-[9px] transition-all hover:scale-105 active:scale-95 font-mono gap-1.5 p-3",
                  btn.cls
                )}
              >
                 <btn.icon className="h-5 w-5" />
                 <span className="leading-tight text-center">{btn.label}</span>
                 <span className="text-[7px] font-normal lowercase italic opacity-60">{btn.desc}</span>
              </button>
            ))}
         </div>
      </CardContent>
    </Card>
  )
}
