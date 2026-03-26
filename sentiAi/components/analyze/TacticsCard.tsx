import React from "react"
import { ShieldCheck, Flag, MousePointer, UserX, AlertTriangle, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TacticsCardProps {
  tactics: string[]
}

export function TacticsCard({ tactics }: TacticsCardProps) {
  const getIcon = (tactic: string) => {
    switch(tactic.toLowerCase()) {
      case "urgency": return <ShieldAlert className="h-4 w-4 mr-2 text-destructive" />
      case "spoofing": return <UserX className="h-4 w-4 mr-2 text-destructive" />
      case "impersonation": return <Flag className="h-4 w-4 mr-2 text-destructive" />
      default: return <ShieldCheck className="h-4 w-4 mr-2 text-accent" />
    }
  }
  
  return (
    <Card className="card-cyber h-full flex flex-col p-8">
      <CardHeader className="p-0 border-b border-white/5 space-y-2 mb-8 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center group-hover:text-accent transition-colors">
            <Flag className="h-4 w-4 mr-2" />
            Detected Threat Tactics
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
             MITRE ATT&CK Mapping & Heuristics
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 space-y-6 flex-1 flex flex-col justify-center">
         <div className="flex flex-wrap gap-4">
            {tactics.map((tactic, i) => (
              <div key={i} className="flex items-center bg-destructive/10 border border-destructive/20 px-6 py-4 rounded-2xl hover:bg-destructive/15 transition-all duration-300 cursor-pointer group/tactic shadow-2xl relative overflow-hidden flex-1 min-w-[140px]">
                 {getIcon(tactic)}
                 <span className="text-xl font-black uppercase tracking-tighter text-destructive group-hover/tactic:scale-105 transition-transform">{tactic}</span>
                 {/* Subtle scanning highlight */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent h-1 opacity-0 group-hover/tactic:opacity-100 animate-scan" />
              </div>
            ))}
         </div>
         
         <div className="pt-8 mt-auto border-t border-white/5">
            <div className="flex items-baseline justify-between mb-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Confidence Delta</h4>
               <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[8px] h-4 rounded-full px-2 uppercase font-black tracking-widest">+12.4% Probability</Badge>
            </div>
            
            <p className="text-[10px] text-muted-foreground leading-relaxed italic opacity-80">
               Detection patterns match signatures associated with <span className="text-destructive font-black uppercase tracking-tighter italic">FIN7 / GIBON</span> active campaigns.
            </p>
         </div>
      </CardContent>
    </Card>
  )
}
