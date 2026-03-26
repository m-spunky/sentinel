import React from "react"
import { ShieldAlert, Globe, Activity, Zap, ShieldCheck, Target, Share2, MoreVertical, Link2, ExternalLink, ActivityIcon, PlusCircle, User, Flag, Search, Download, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
      {/* Entity Summary Header */}
      <Card className="bg-[#1B263B] border-[#00C9A7]/10 rounded-2xl shadow-xl shadow-black/20 overflow-hidden group">
        <CardHeader className="p-6 border-b border-white/5 space-y-3 bg-destructive/5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <Badge className="bg-destructive/10 text-destructive border border-destructive/20 text-[8px] h-5 rounded-full px-3 uppercase font-black tracking-widest bg-destructive/5 animate-pulse">Advanced Persistent Threat</Badge>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </div>
          <div className="space-y-1">
             <CardTitle className="text-2xl font-black tracking-tighter text-foreground uppercase group-hover:text-destructive transition-colors underline decoration-destructive/10 underline-offset-4 decoration-2">
                {currentEntity.name}
             </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-8">
           <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group/stat">
                <span className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-1 block">Risk Probability</span>
                <span className="text-lg font-black text-destructive tracking-tighter group-hover/stat:scale-110 transition-transform block">Critical</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group/stat">
                <span className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em] mb-1 block">Entity Type</span>
                <span className="text-lg font-black text-foreground tracking-tighter group-hover/stat:scale-110 transition-transform block">Actor</span>
              </div>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-baseline justify-between mb-2">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center">
                    <Flag className="h-3 w-3 mr-2 text-destructive" />
                    MITRE ATT&CK Targets
                 </h4>
                 <div className="h-px bg-white/5 flex-1 mx-4" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                 {currentEntity.mitre.map((tag, i) => (
                   <Badge key={i} className="bg-destructive/10 text-destructive border border-destructive/20 text-[8px] h-5 rounded-lg px-2 uppercase font-black tracking-widest cursor-pointer hover:bg-destructive shadow-lg transition-all hover:scale-105 active:scale-95 group/tag">
                      {tag}
                   </Badge>
                 ))}
              </div>
           </div>
           
           <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Actor Profile Forensic Summary</h4>
              <p className="text-[10px] text-muted-foreground leading-[1.8] font-medium tracking-tight opacity-90 italic">
                {currentEntity.description}
              </p>
           </div>
        </CardContent>
      </Card>

      {/* Relationships */}
      <Card className="bg-[#1B263B] border-[#00C9A7]/10 rounded-2xl shadow-xl shadow-black/20 overflow-hidden p-6 group">
         <RelationshipList items={relationships} />
      </Card>
      
      {/* Mini Activity Frequency Graph */}
      <Card className="bg-[#1B263B] border-[#00C9A7]/10 rounded-2xl shadow-xl shadow-black/20 p-6 flex-1 flex flex-col justify-between group">
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Observed Activity Frequency</h4>
            
            <div className="h-24 w-full flex items-end justify-between space-x-1 pt-6">
               {[40, 70, 45, 90, 65, 30, 85, 40, 55, 75, 95, 60, 40, 70, 45, 90, 65, 30, 85, 40, 55, 75, 95, 60].map((h, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex-1 rounded-t-sm transition-all duration-700 hover:bg-destructive hover:scale-y-110",
                      i > 15 && i < 20 ? "bg-destructive/40" : "bg-white/5"
                    )}
                    style={{ height: `${h}%` }}
                  />
               ))}
            </div>
            <div className="flex justify-between text-[7px] text-muted-foreground/40 uppercase font-black tracking-[0.3em]">
               <span>T-24h</span>
               <span>T-12h</span>
               <span>Now</span>
            </div>
         </div>
         
         <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-3">
            {[
              { label: "Investigate", icon: Search, color: "accent" },
              { label: "Block IOC", icon: Trash2, color: "destructive" },
              { label: "Add Watch", icon: Eye, color: "accent" },
            ].map((btn, i) => (
              <Button 
                 key={i} 
                 variant="ghost" 
                 className={cn(
                   "flex-col h-14 rounded-xl border border-white/5 transition-all duration-300 hover:scale-105 active:scale-95",
                   btn.color === "destructive" ? "bg-destructive/10 text-destructive hover:border-destructive/30 hover:bg-destructive/20" : "bg-accent/10 text-accent hover:border-accent/30 hover:bg-accent/20 accent-glow shadow-xl shadow-accent/5"
                 )}
              >
                 <btn.icon className="h-3.5 w-3.5 mb-1" />
                 <span className="text-[7px] font-black uppercase tracking-widest leading-none">{btn.label}</span>
              </Button>
            ))}
         </div>
      </Card>
    </div>
  )
}
