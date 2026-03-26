"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Search, ShieldCheck, Zap, Activity, Globe, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function LandingHero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-black">
      {/* 🔮 Background Spotlight Effect */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] bg-accent/10 rounded-full blur-[180px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] bg-accent/5 rounded-full blur-[140px] -z-10" />
      
      {/* 🚀 Main Copy Layer */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10">
        <div className="space-y-6 flex flex-col items-center max-w-4xl mx-auto">
           <Badge variant="outline" className="cyber-border text-accent px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase bg-accent/5 animate-in fade-in slide-in-from-top-4 duration-1000">
              Nexus-4 Hybrid Intelligence
           </Badge>
           
           <h1 className="text-5xl md:text-8xl font-[900] tracking-tighter text-foreground leading-[0.88] uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
             Cyber Threats Don’t Work in Silos. <br />
             <span className="text-accent relative inline-block">
               Neither Should
               <span className="absolute -bottom-2 left-0 w-full h-2 bg-accent/10 rounded-full blur-sm" />
             </span> Your Defense.
           </h1>
           
           <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl leading-relaxed font-medium transition-all hover:text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              SentinelAI Fusion unifies phishing detection, real-time intelligence, and multi-modal AI response into a single, high-fidelity enterprise workspace.
           </p>
        </div>

        {/* 🎬 Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-in fade-in zoom-in-95 duration-1000 delay-500">
           <Link href="/dashboard/analyze">
              <Button size="lg" className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 accent-glow px-12 py-8 text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-90 shadow-2xl shadow-accent/20">
                 Analyze a Threat
                 <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
           </Link>
           <Link href="/dashboard">
              <Button size="lg" variant="outline" className="rounded-2xl border-white/10 cyber-border hover:bg-white/5 px-12 py-8 text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-90 shadow-xl shadow-black/80">
                 View Dashboard
              </Button>
           </Link>
        </div>
        
        {/* 📟 Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 max-w-5xl mx-auto border-t border-white/5 opacity-60 hover:opacity-100 transition-opacity animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700">
           {[
             { label: "Active Inference Nodes", value: "24,812+", icon: Globe, color: "accent" },
             { label: "False Positive Reduction", value: "98.4%", icon: ShieldCheck, color: "accent" },
             { label: "Global Threat Correlation", value: "Real-time", icon: Activity, color: "accent" },
             { label: "AI Decision Integrity", value: "Verified", icon: Lock, color: "accent" },
           ].map((stat, i) => (
             <div key={i} className="space-y-2 flex flex-col items-center group">
               <div className="flex items-center text-accent group-hover:scale-110 transition-transform">
                 <stat.icon className="h-4 w-4 mr-2" />
                 <span className="text-2xl font-black tracking-tighter text-foreground">{stat.value}</span>
               </div>
               <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black leading-none text-center group-hover:text-accent transition-colors">{stat.label}</p>
             </div>
           ))}
        </div>
      </div>

    </section>
  )
}

function MockupCard() {
   // Legacy component kept if needed
   return null;
}
