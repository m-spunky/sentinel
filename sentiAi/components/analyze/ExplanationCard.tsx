import React from "react"
import { Monitor, MessageSquare, ShieldCheck, Printer, Share2, MoreVertical, Search, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ExplanationCardProps {
  explanation: string
}

export function ExplanationCard({ explanation }: ExplanationCardProps) {
  return (
    <Card className="card-cyber h-full flex flex-col p-8 bg-cyber-gradient relative overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
         <MessageSquare className="h-24 w-24" />
      </div>
      
      <CardHeader className="p-0 border-b border-white/5 space-y-2 flex flex-row items-center justify-between mb-8">
        <div className="space-y-1">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center group-hover:text-accent transition-colors">
            <Zap className="h-4 w-4 mr-2" />
            AI Logic Explanation
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
             LLM-powered reasoning and forensic summary
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2 translate-y-[-10px]">
           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
              <Printer className="h-4 w-4" />
           </Button>
           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
              <MoreVertical className="h-4 w-4" />
           </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 space-y-8 flex-1 flex flex-col justify-center">
         <div className="bg-[#0D1B2A]/60 border border-white/10 p-6 rounded-2xl relative group/content">
            <div className="absolute -top-3 left-6">
               <Badge className="bg-accent text-accent-foreground text-[8px] h-5 rounded-lg px-3 font-black uppercase tracking-widest border-2 border-[#1B263B] shadow-lg">Analyst Insight</Badge>
            </div>
            
            <p className="text-sm md:text-base text-foreground leading-[1.8] font-medium tracking-tight opacity-90 first-letter:text-3xl first-letter:font-black first-letter:text-accent first-letter:mr-2 first-letter:float-left">
               {explanation}
            </p>
         </div>
         
         <div className="pt-8 border-t border-white/5">
            <div className="bg-accent/5 p-4 rounded-xl border border-accent/10 flex items-center justify-between group/action cursor-pointer hover:bg-accent/10 transition-colors">
               <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xl accent-glow border-2 border-[#1B263B]">
                     <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Confidence Certified</h4>
                    <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-0.5 italic lowercase">98.9% Signature Match</p>
                  </div>
               </div>
               <Button size="sm" className="rounded-xl bg-accent text-accent-foreground font-black text-[10px] uppercase tracking-widest hover:bg-accent/90 transition-all opacity-0 group-hover/action:opacity-100 translate-x-4 group-hover/action:translate-x-0">Generate Full Report</Button>
            </div>
         </div>
      </CardContent>
    </Card>
  )
}
