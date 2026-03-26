import React from "react"
import { ShieldAlert, Globe, MessageSquare, Activity, User, Target, Share2, Printer, MoreVertical, PlusCircle, Trash2, Edit2, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ActionPanel() {
  const actions = [
    { label: "Quarantine Campaign", icon: ShieldAlert, color: "destructive", desc: "Isolate all related assets" },
    { label: "Block Domains", icon: Globe, color: "destructive", desc: "Update network sinkholes" },
    { label: "Notify Impacted", icon: MessageSquare, color: "accent", desc: "Send security alerts" },
    { label: "Escalate L3", icon: Activity, color: "accent", desc: "Alert global response" },
  ]
  
  return (
    <Card className="card-cyber border-t-4 border-t-accent overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-20 transition-opacity group-hover:opacity-40">
         <Zap className="h-20 w-24 text-accent" />
      </div>
      <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
         <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">Response Operations</h2>
            <p className="text-sm text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
               Deploy automated remediation for #CAMP-2402
            </p>
         </div>
         
         <div className="flex flex-wrap items-center justify-center gap-4">
            {actions.map((btn, i) => (
              <Button 
                 key={i} 
                 variant="outline" 
                 className={cn(
                   "flex-col h-24 w-44 rounded-2xl border-2 font-black uppercase tracking-[0.1em] text-xs transition-all hover:scale-105 active:scale-95 shadow-xl p-4",
                   btn.color === "destructive" 
                    ? "border-destructive/20 hover:border-destructive/50 text-destructive hover:bg-destructive/10" 
                    : "border-accent/20 hover:border-accent/50 text-accent hover:bg-accent/10 accent-glow shadow-xl shadow-accent/5"
                 )}
              >
                 <btn.icon className="h-6 w-6 mb-2" />
                 <span className="text-[10px] uppercase font-black tracking-widest leading-none mb-1">{btn.label}</span>
                 <span className="text-[8px] text-muted-foreground lowercase italic font-normal">{btn.desc}</span>
              </Button>
            ))}
         </div>
      </CardContent>
    </Card>
  )
}
