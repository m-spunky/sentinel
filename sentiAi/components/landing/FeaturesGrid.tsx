"use client"

import React from "react"
import { Eye, Network, BrainCircuit, MessageSquare, Cpu } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FeaturesGrid() {
  const features = [
    {
      title: "Multi-Modal Detection",
      desc: "Simultaneously analyze full email headers, body content, URL forensics, and visual identity signatures using unified deep learning models.",
      icon: Eye,
      gradient: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
      borderHover: "hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]",
      badge: "L-4 Visual Scan",
      badgeColor: "text-blue-400",
    },
    {
      title: "Threat Intel Graph",
      desc: "Reveal hidden relationships between evolving campaigns, known actors, and infrastructure nodes with interactive graph-based visualizations.",
      icon: Network,
      gradient: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-400",
      borderHover: "hover:border-purple-500/40 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]",
      badge: "Global Topology",
      badgeColor: "text-purple-400",
    },
    {
      title: "AI-Powered Explanations",
      desc: "Bridge the trust gap with human-readable, actionable insights behind every detection, powered by purpose-built security reasoning models.",
      icon: BrainCircuit,
      gradient: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400",
      borderHover: "hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]",
      badge: "Explainable Core",
      badgeColor: "text-emerald-400",
    },
    {
      title: "SentinelChat",
      desc: "Query your entire platform, explore threat campaigns, and trigger incident response actions using advanced natural language commands.",
      icon: MessageSquare,
      gradient: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
      borderHover: "hover:border-amber-500/40 hover:shadow-[0_0_50px_rgba(245,158,11,0.1)]",
      badge: "SOC-v2 AI",
      badgeColor: "text-amber-400",
    }
  ]

  return (
    <section id="features" className="relative py-16 md:py-20 lg:py-24 px-6 bg-[#0a0e1a] overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] bg-blue-500/5 rounded-full blur-[200px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-24">
        <div className="max-w-3xl space-y-6">
           <div className="flex items-center space-x-3 text-blue-400/60 uppercase font-black tracking-[0.4em] text-[10px]">
              <Cpu className="h-4 w-4" />
              <span>THE CORE CAPABILITIES</span>
           </div>

           <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[1.1]">
             Power Without <br />
             <span className="text-muted-foreground opacity-40 italic font-light decoration-4">Overwhelming.</span>
           </h2>

           <p className="max-w-2xl text-lg text-muted-foreground/80 font-medium leading-relaxed">
             Enterprise-grade intelligence condensed into a streamlined, high-density interface built for elite SOC operations.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
           {features.map((feature, i) => (
             <Card
               key={i}
               className={cn(
                 "group card-cyber overflow-hidden border-white/10 p-0 transform transition-all duration-700 hover:-translate-y-3 relative",
                 feature.borderHover
               )}
             >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000",
                  feature.gradient
                )} />

                <CardContent className="p-10 relative z-10 space-y-10">
                   <div className="flex items-start justify-between">
                      <div className={cn(
                        "h-16 w-16 rounded-2xl bg-[#070D14] flex items-center justify-center border border-white/10 transition-all group-hover:scale-110 shadow-2xl",
                        feature.iconColor
                      )}>
                        <feature.icon className="h-8 w-8" />
                      </div>
                      <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                         <span className={cn("text-[9px] font-black uppercase tracking-[0.3em]", feature.badgeColor)}>{feature.badge}</span>
                         <span className="text-[7px] text-muted-foreground font-medium uppercase tracking-widest mt-1 italic">Verified 2026.4</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-2xl font-black uppercase tracking-tight text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground/80 leading-relaxed font-medium text-lg max-w-sm group-hover:text-muted-foreground transition-all">
                         {feature.desc}
                      </p>
                   </div>

                   <div className="flex items-center space-x-2 pt-10">
                      <div className={cn("h-px flex-1 bg-white/5 transition-all", `group-hover:${feature.badgeColor.replace("text-", "bg-")}/20`)} />
                      <div className={cn("h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-ping", feature.iconColor.replace("text-", "bg-"))} />
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>
      </div>
    </section>
  )
}
