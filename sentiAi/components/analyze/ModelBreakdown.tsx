import React from "react"
import { AlignLeft, Globe, Image as ImageIcon, Code, MoreVertical, Search, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ModelBreakdownProps {
  model_scores: {
    nlp: number
    url: number
    visual: number
    metadata: number
  }
}

export function ModelBreakdown({ model_scores }: ModelBreakdownProps) {
  const models = [
    { label: "NLP Intent Engine", icon: AlignLeft, value: model_scores.nlp, color: "bg-accent/40" },
    { label: "URL Risk Heuristics", icon: Globe, value: model_scores.url, color: "bg-destructive/40" },
    { label: "Visual Similarity", icon: ImageIcon, value: model_scores.visual, color: "bg-yellow-500/40" },
    { label: "Metadata Signatures", icon: Code, value: model_scores.metadata, color: "bg-accent/40" },
  ]
  
  return (
    <Card className="card-cyber h-full flex flex-col group p-8">
      <CardHeader className="p-0 border-b border-white/5 space-y-2 flex flex-row items-center justify-between mb-8">
        <div className="space-y-1">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center group-hover:text-accent transition-colors">
            <Zap className="h-4 w-4 mr-2" />
            Model Reasoning Breakdown
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
             Multi-modal inference telemetry signals
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg translate-y-[-10px]">
           <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0 space-y-8 flex-1 flex flex-col justify-center">
         {models.map((model, i) => (
           <div key={i} className="space-y-3 group/bar px-4 py-2 rounded-xl transition-colors hover:bg-white/5 cursor-pointer">
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3 text-foreground group-hover/bar:text-accent transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover/bar:border-accent/20 group-hover/bar:bg-accent/10">
                       <model.icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{model.label}</span>
                 </div>
                 <Badge variant="ghost" className="text-[10px] font-bold text-accent transition-all group-hover/bar:scale-105">{Math.round(model.value * 100)}%</Badge>
              </div>
              <div className="relative h-2.5 w-full bg-black/40 rounded-full border border-white/5 shadow-inner overflow-hidden">
                <div 
                   className={cn("h-full transition-all duration-1000 group-hover:scale-y-110", model.color, model.value >= 0.9 ? "bg-destructive shadow-[0_0_10px_rgba(255,109,109,0.5)]" : "bg-accent shadow-[0_0_10px_rgba(0,201,167,0.3)]")} 
                   style={{ width: `${model.value * 100}%` }} 
                />
              </div>
           </div>
         ))}
         
         <div className="pt-8 mt-auto border-t border-white/5">
            <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 flex items-center justify-between group/audit cursor-pointer hover:bg-accent/10 transition-colors">
               <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full border border-accent/30 flex items-center justify-center bg-accent/20">
                     <Search className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Audit Raw Telemetry Logs</span>
               </div>
               <div className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            </div>
         </div>
      </CardContent>
    </Card>
  )
}

function Badge({ children, className, variant = "ghost" }: { children: React.ReactNode, className?: string, variant?: "ghost" | "outline" }) {
  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] font-bold tracking-tighter",
      variant === "outline" ? "border border-accent/20 text-accent" : "text-accent",
      className
    )}>
      {children}
    </span>
  )
}
