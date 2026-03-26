import React from "react"
import { ShieldAlert, Globe, Activity, Zap, ShieldCheck, Target, Share2, MoreVertical, Link2, ExternalLink, ActivityIcon, PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
      
      {/* 📌 Selected Threat Info */}
      <Card className="card-cyber group relative overflow-hidden">
        <CardHeader className="p-6 border-b border-white/5 bg-accent/5">
          <div className="flex items-center justify-between">
            <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-[8px] h-5 rounded-full px-3 uppercase font-black tracking-widest bg-destructive/5 animate-pulse">High Risk Identified</Badge>
            <div className="h-2 w-2 rounded-full bg-accent" />
          </div>
          <div className="space-y-1 mt-4">
             <CardTitle className="text-xl font-black tracking-tighter text-foreground flex items-center group-hover:text-accent transition-colors underline decoration-accent/10 underline-offset-4 decoration-2">
                THREAT ID: <span className="text-accent ml-2">#8472-X</span>
             </CardTitle>
             <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
                Classification: Phishing / Actor: FIN7
             </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <span className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-1 block">Inference Confidence</span>
                <span className="text-lg font-black text-accent tracking-tighter">98.9%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <span className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-1 block">Detection Time</span>
                <span className="text-lg font-black text-foreground tracking-tighter">0.4s</span>
              </div>
           </div>
           
           <div className="space-y-3 pb-2">
              <div className="flex items-baseline justify-between mb-2">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Entity Relationships</h4>
                 <div className="h-px bg-white/5 flex-1 mx-4" />
              </div>
              
              <div className="space-y-2">
                 {relatedEntities.map((entity, i) => (
                   <div key={i} className="flex items-center justify-between p-2 px-3 rounded-lg bg-[#0D1B2A]/40 border border-white/5 hover:border-accent/30 transition-all cursor-pointer group/item">
                      <div className="flex items-center space-x-3">
                         <div className={cn(
                           "p-1.5 rounded-md",
                           entity.status === "Malicious" || entity.status === "Infected" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
                         )}>
                            {entity.type === "Domain" ? <Globe className="h-3 w-3" /> : entity.type === "IP" ? <ActivityIcon className="h-3 w-3" /> : entity.type === "Campaign" ? <Target className="h-3 w-3" /> : <Link2 className="h-3 w-3" />}
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-foreground group-hover/item:text-accent transition-colors truncate w-32">{entity.name}</span>
                            <span className="text-[7px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-0.5">{entity.type}</span>
                         </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover/item:opacity-60 transition-all group-hover/item:translate-x-1" />
                   </div>
                 ))}
              </div>
           </div>
        </CardContent>
      </Card>

      {/* ⚡ QUICK ACTIONS */}
      <Card className="card-cyber p-6 group">
         <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center mb-2">
               <Zap className="h-4 w-4 mr-2" />
               Operations Center
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
               {[
                 { label: "Quarantine", icon: ShieldAlert, color: "destructive" },
                 { label: "Block Domain", icon: Globe, color: "destructive" },
                 { label: "Escalate L3", icon: Activity, color: "accent" },
                 { label: "Export PDF", icon: Share2, color: "accent" },
               ].map((btn, i) => (
                 <Button 
                    key={i} 
                    variant="ghost" 
                    className={cn(
                      "flex-col h-20 rounded-xl border border-white/5 p-4 transition-all duration-300 hover:scale-105 active:scale-95",
                      btn.color === "destructive" ? "bg-destructive/10 text-destructive hover:border-destructive/30 hover:bg-destructive/20" : "bg-accent/10 text-accent hover:border-accent/30 hover:bg-accent/20 accent-glow shadow-xl shadow-accent/5"
                    )}
                 >
                    <btn.icon className="h-4 w-4 mb-2" />
                    <span className="text-[8px] font-black uppercase tracking-widest leading-none">{btn.label}</span>
                 </Button>
               ))}
            </div>
            
            <Button className="w-full bg-[#0D1B2A] border border-accent/20 text-accent font-black uppercase tracking-tighter text-[10px] h-10 rounded-xl hover:bg-accent/10 transition-all hover:scale-105">
               <PlusCircle className="h-3 w-3 mr-2" />
               Audit Node Activity
            </Button>
         </div>
      </Card>
      
      {/* 📊 MINI GRAPH PLACEHOLDER */}
      <Card className="card-cyber bg-accent/5 flex-1 relative overflow-hidden flex flex-col items-center justify-center p-8 group">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,201,167,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,201,167,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
         <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 rounded-full border-4 border-[#00C9A7] border-t-transparent animate-spin flex items-center justify-center shadow-xl shadow-accent/20">
               <div className="h-8 w-8 rounded-full bg-accent/20 animate-pulse" />
            </div>
            <div className="space-y-1">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Generating Knowledge Graph</h4>
               <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest leading-none italic">Analyzing 4,821 Entity nodes...</p>
            </div>
         </div>
      </Card>
    </div>
  )
}
