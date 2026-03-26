"use client"

import React from "react"
import { Search, PlusCircle, ShieldAlert, Monitor, Globe, Mail, MessageSquare, ShieldCheck, Activity, Share2, MoreHorizontal, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { AnalysisInputSection } from "@/components/analyze/AnalysisInputSection"
import { ThreatScoreCard } from "@/components/analyze/ThreatScoreCard"
import { ModelBreakdown } from "@/components/analyze/ModelBreakdown"
import { TacticsCard } from "@/components/analyze/TacticsCard"
import { IntelCard } from "@/components/analyze/IntelCard"
import { ExplanationCard } from "@/components/analyze/ExplanationCard"

const mockData = {
  threat_score: 0.92,
  classification: "PHISHING",
  confidence: "HIGH",
  model_scores: {
    nlp: 0.91,
    url: 0.97,
    visual: 0.89,
    metadata: 0.88
  },
  tactics: ["Urgency", "Spoofing", "Impersonation"],
  campaign: "CAMP-2026-1847",
  actor: "FIN7",
  explanation: "This email exhibits strong phishing indicators, including domain spoofing and urgency manipulation. The visual layout matches known brand impersonation patterns for several financial institutions. Metadata signatures reveal a high correlation with the FIN7/GIBON infrastructure, specifically targeting high-value corporate accounts through social engineering tactics. Confidence in this classification is heightened by the presence of obfuscated JavaScript payloads embedded in the attached PDF invoice."
}

export default function AnalyzePage() {
  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-2">
           <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xl accent-glow transition-transform hover:scale-105">
                 <Search className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Threat Analysis Console</h1>
           </div>
           <div className="flex items-center space-x-2 pl-12 opacity-80 transition-opacity hover:opacity-100">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em]">Multi-modal AI detection & intelligence infrastructure <span className="text-accent italic lowercase font-normal">v4.2.0-stable</span></p>
           </div>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
           <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
              <Input 
                placeholder="Lookup Incident ID..." 
                className="w-full md:w-64 bg-[#070D14] border-white/5 focus:border-accent/40 rounded-xl pl-10 text-xs font-bold transition-all focus:ring-accent/20"
              />
           </div>
           <Button className="rounded-xl bg-accent text-accent-foreground font-black uppercase tracking-widest px-6 h-10 accent-glow hover:bg-accent/90 transition-all hover:scale-105 active:scale-95">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Scan
           </Button>
        </div>
      </header>

      {/* Analysis Grid */}
      <section className="grid grid-cols-12 gap-6 items-stretch animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Top Row: Input & Summary */}
        <div className="col-span-12 lg:col-span-4 min-h-[500px] lg:h-[750px]">
           <AnalysisInputSection />
        </div>
        
        <div className="col-span-12 lg:col-span-4 min-h-[400px] lg:h-[750px]">
           <ThreatScoreCard 
              score={mockData.threat_score} 
              classification={mockData.classification} 
              confidence={mockData.confidence} 
           />
        </div>
        
        <div className="col-span-12 lg:col-span-4 min-h-[400px] lg:h-[750px]">
           <ModelBreakdown model_scores={mockData.model_scores} />
        </div>

        {/* Middle Row: Timeline & Tactics */}
        <div className="col-span-12 lg:col-span-8">
           <Card className="card-cyber overflow-hidden group">
              <CardHeader className="p-6 border-b border-white/5 space-y-2 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-accent" />
                    Detection Timeline
                  </CardTitle>
                  <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
                     Model inference sequence and telemetry spikes
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                   <Badge variant="outline" className="text-[8px] h-5 px-3 py-0 border-white/10 uppercase font-black tracking-widest">Inference: 0.9s</Badge>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
                      <Share2 className="h-4 w-4" />
                   </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {/* Visualizing inference timeline mockup */}
                <div className="h-[250px] w-full flex items-end justify-between space-x-1 pt-10">
                   {Array.from({ length: 48 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex-1 bg-accent/20 rounded-t shadow-inner transition-all duration-700 hover:bg-accent hover:h-[120%] group/bar relative",
                          i > 30 && i < 38 ? "bg-destructive/40" : "bg-accent/20"
                        )}
                        style={{ height: `${10 + Math.random() * 90}%` }}
                      >
                         <div className="absolute inset-0 bg-accent/20 blur opacity-0 group-hover/bar:opacity-40" />
                         {i === 34 && (
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                               <Badge className="bg-destructive text-white text-[8px] animate-bounce px-2 border-2 border-card shadow-xl">Anomaly Detected</Badge>
                               <div className="h-4 w-[2px] bg-destructive mt-1" />
                            </div>
                         )}
                      </div>
                   ))}
                </div>
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground mt-8 pt-6 border-t border-white/5 opacity-40">
                   <span>Pre-Process</span>
                   <span>NLP Extraction</span>
                   <span>URL Expansion</span>
                   <span>Image Recognition</span>
                   <span>Inference Complete</span>
                </div>
              </CardContent>
           </Card>
        </div>
        
        <div className="col-span-12 lg:col-span-4">
           <TacticsCard tactics={mockData.tactics} />
        </div>

        {/* Bottom Row: Intel & Explanation */}
        <div className="col-span-12 lg:col-span-6 min-h-[400px] lg:h-[500px]">
           <IntelCard campaign={mockData.campaign} actor={mockData.actor} />
        </div>
        
        <div className="col-span-12 lg:col-span-6 min-h-[400px] lg:h-[500px]">
           <ExplanationCard explanation={mockData.explanation} />
        </div>

        {/* Action Panel Footer */}
        <div className="col-span-12 pt-10">
           <Card className="card-cyber border-t-4 border-t-accent overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-20 transition-opacity group-hover:opacity-40">
                 <ShieldCheck className="h-20 w-24 text-accent" />
              </div>
              <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                 <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">Rapid Incident Response</h2>
                    <p className="text-sm text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
                       Deploy automated countermeasures based on AI recommendation
                    </p>
                 </div>
                 
                 <div className="flex flex-wrap items-center justify-center gap-4">
                    {[
                      { label: "Quarantine Entity", icon: ShieldAlert, color: "destructive" },
                      { label: "Block IOCs", icon: Globe, color: "destructive" },
                      { label: "Alert Team", icon: MessageSquare, color: "accent" },
                      { label: "Generate Report", icon: Share2, color: "accent" },
                    ].map((btn, i) => (
                      <Button 
                         key={i} 
                         variant="outline" 
                         className={cn(
                           "h-16 px-8 rounded-2xl border-2 font-black uppercase tracking-[0.1em] text-xs transition-all hover:scale-105 active:scale-95 shadow-xl",
                           btn.color === "destructive" 
                            ? "border-destructive/20 hover:border-destructive/50 text-destructive hover:bg-destructive/10" 
                            : "border-accent/20 hover:border-accent/50 text-accent hover:bg-accent/10"
                         )}
                      >
                         <btn.icon className="h-5 w-5 mr-3" />
                         {btn.label}
                      </Button>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>
      </section>
    </div>
  )
}
