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
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-[#0a0e1a]">
      {/* Background Spotlight */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] bg-blue-500/8 rounded-full blur-[180px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] bg-amber-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute inset-0 bg-grid opacity-30 -z-10" />
      
      {/* 🚀 Main Copy Layer */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10">
        <div className="space-y-6 flex flex-col items-center max-w-4xl mx-auto">
           <Badge variant="outline" className="border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase bg-blue-500/8 font-mono animate-in fade-in slide-in-from-top-4 duration-700">
              Multi-Modal AI · Real APIs · Enterprise Grade
           </Badge>

           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 leading-[0.92] uppercase font-mono animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
             Cyber Threats Don&apos;t Work in Silos.<br />
             <span className="text-blue-400">Neither Should</span>{" "}
             <span className="text-amber-400">Your Defense.</span>
           </h1>
           
           <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl leading-relaxed font-medium transition-all hover:text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              SentinelAI Fusion unifies phishing detection, real-time intelligence, and multi-modal AI response into a single, high-fidelity enterprise workspace.
           </p>
        </div>

        {/* 🎬 Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-in fade-in zoom-in-95 duration-1000 delay-500">
           <Link href="/dashboard/analyze">
              <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-10 py-6 text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-blue-500/20 font-mono glow-primary">
                 Analyze a Threat
                 <ArrowRight className="ml-2.5 h-4 w-4" />
              </Button>
           </Link>
           <Link href="/dashboard">
              <Button size="lg" variant="outline" className="rounded-xl border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/5 text-slate-300 px-10 py-6 text-xs font-bold uppercase tracking-widest transition-all font-mono">
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
