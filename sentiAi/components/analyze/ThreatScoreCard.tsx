import React from "react"
import { ShieldAlert, ShieldCheck, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ThreatScoreCardProps {
  score: number
  classification: string
  confidence: string
}

export function ThreatScoreCard({ score, classification, confidence }: ThreatScoreCardProps) {
  const percentage = Math.round(score * 100)
  const isHighRisk = percentage >= 75
  const isMediumRisk = percentage >= 40 && percentage < 75
  
  return (
    <Card className="card-cyber group h-full flex flex-col items-center justify-center p-8 relative">
       {/* Background Accent */}
       <div className={cn(
         "absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity blur-3xl rounded-full",
         isHighRisk ? "bg-destructive" : isMediumRisk ? "bg-yellow-500" : "bg-accent"
       )} />
       
       <div className="relative z-10 w-full flex flex-col items-center text-center space-y-8">
          <div className="space-y-1">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground group-hover:text-foreground transition-colors">Risk Probability Index</h4>
             <div className="flex items-center justify-center space-x-2">
                <div className={cn("h-2 w-2 rounded-full animate-pulse", isHighRisk ? "bg-destructive" : "bg-accent")} />
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest italic">{classification === "PHISHING" ? "Phishing Detection Confidence: " : "Classification: "}<span className="text-accent">{confidence}</span></p>
             </div>
          </div>

          <div className="relative h-64 w-64 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
             {/* Progress Ring Visualization (CSS-based) */}
             <svg className="absolute inset-0 h-full w-full -rotate-90 transform-gpu overflow-visible">
                <circle
                  cx="50%"
                  cy="50%"
                  r="120"
                  className="fill-none stroke-white/5 opacity-10"
                  strokeWidth="20"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="120"
                  fill="none"
                  className={cn(
                    "transition-all duration-1000 ease-in-out",
                    isHighRisk ? "stroke-destructive shadow-[0_0_20px_rgba(255,77,109,0.3)]" : isMediumRisk ? "stroke-yellow-500" : "stroke-accent accent-glow"
                  )}
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - score)}`}
                  strokeLinecap="round"
                />
             </svg>
             
             <div className="flex flex-col items-center justify-center space-y-2 translate-y-2">
                <span className={cn(
                  "text-8xl font-black tracking-tighter leading-none",
                  isHighRisk ? "text-destructive shadow-destructive/20" : isMediumRisk ? "text-yellow-500" : "text-accent transition-colors"
                )}>{percentage}</span>
                <span className="text-2xl font-black text-foreground/40 mt-1 uppercase tracking-tighter">%</span>
             </div>
          </div>

          <div className="space-y-4 w-full">
             <div className={cn(
               "py-4 px-10 rounded-2xl border flex items-center justify-center space-x-4 transition-all duration-300 shadow-2xl overflow-hidden relative",
               isHighRisk 
                ? "bg-destructive/10 border-destructive/20 text-destructive" 
                : isMediumRisk 
                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-500" 
                  : "bg-accent/10 border-accent/20 text-accent"
             )}>
                {isHighRisk ? <ShieldAlert className="h-6 w-6" /> : isMediumRisk ? <AlertTriangle className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                <span className="text-2xl font-black uppercase tracking-[0.2em]">{classification} LEVEL</span>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-scan" />
             </div>
             
             <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground pt-4 border-t border-white/5 opacity-60">
                <div className="flex items-center">
                   <TrendingUp className="h-3 w-3 mr-1" />
                   Trend: Deteriorating
                </div>
                <span>Analysis Delta: 0.2s</span>
             </div>
          </div>
       </div>
    </Card>
  )
}
