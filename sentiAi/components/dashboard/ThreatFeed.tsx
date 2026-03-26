import React from "react"
import { ShieldAlert, Fingerprint, Activity, Clock, MoreHorizontal, ArrowRightCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const threatFeed = [
  { 
    id: 1, 
    type: "Phishing Attempt", 
    desc: "Suspicious login attempt from 192.168.1.45 (Kyiv, UA)", 
    time: "2m ago", 
    severity: "Critical",
    color: "destructive"
  },
  { 
    id: 2, 
    type: "Malware Detected", 
    desc: "Encrypted payload identified in server node #08", 
    time: "15m ago", 
    severity: "High",
    color: "destructive"
  },
  { 
    id: 3, 
    type: "Behavioral Change", 
    desc: "Traffic spike detected in marketing database unit", 
    time: "32m ago", 
    severity: "Medium",
    color: "accent"
  },
  { 
    id: 4, 
    type: "Unusual Port Activity", 
    desc: "Port 443 scanning detected from external source", 
    time: "1h ago", 
    severity: "Low",
    color: "accent"
  },
  { 
    id: 5, 
    type: "Policy Violation", 
    desc: "User 'admin_dev' moved classified dataset to cloud", 
    time: "2h ago", 
    severity: "High",
    color: "destructive"
  },
]

export function ThreatFeed() {
  return (
    <Card className="card-cyber overflow-hidden group flex flex-col h-full">
      <CardHeader className="p-6 border-b border-white/5 bg-accent/5">
        <div className="space-y-1">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-accent flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Live Threat Feed
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
             Real-time monitoring streams <span className="animate-pulse text-accent">●</span>
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
           <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
        <div className="divide-y divide-white/5">
          {threatFeed.map((threat) => (
            <div key={threat.id} className="p-4 hover:bg-white/5 transition-all duration-300 group/item cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className={cn(
                  "mt-1 h-6 w-6 rounded flex items-center justify-center transition-all group-hover/item:scale-110",
                  threat.color === "destructive" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
                )}>
                  {threat.severity === "Critical" ? <ShieldAlert className="h-3 w-3" /> : <Fingerprint className="h-3 w-3" />}
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xs font-bold text-foreground truncate uppercase tracking-tighter group-hover/item:text-accent transition-colors">
                        {threat.type}
                     </h4>
                     <div className="flex items-center text-[8px] font-black tracking-widest text-muted-foreground uppercase">
                        <Clock className="h-2.5 w-2.5 mr-1" />
                        {threat.time}
                     </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-1 italic">
                     {threat.desc}
                  </p>
                  
                  <div className="pt-2 flex items-center justify-between">
                     <Badge className={cn(
                       "text-[8px] h-4 rounded-full px-2 py-0 border font-black uppercase tracking-widest",
                       threat.color === "destructive" 
                        ? "bg-destructive/5 text-destructive border-destructive/20" 
                        : "bg-accent/5 text-accent border-accent/20"
                     )}>
                        {threat.severity}
                     </Badge>
                     <ArrowRightCircle className="h-3 w-3 text-muted-foreground opacity-0 group-hover/item:opacity-60 group-hover/item:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <div className="p-4 border-t border-white/5 bg-accent/5 group-hover:bg-accent/10 transition-colors">
         <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-[0.3em] text-accent h-8 rounded-xl hover:bg-accent/10">
            View All Incident Logs
         </Button>
      </div>
    </Card>
  )
}
