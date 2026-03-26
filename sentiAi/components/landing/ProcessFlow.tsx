"use client"

import React from "react"
import { ShieldCheck, Zap, Globe, Activity, Mail, Search, MessageSquare, Target, Lock, Share2, MoreHorizontal, MousePointer2, Cpu, BrainCircuit, Network, LayoutDashboard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ProcessFlow() {
  const steps = [
    { title: "Input Analysis", desc: "Paste raw email headers or scan a suspicious URL.", icon: MousePointer2, badge: "Phase 1" },
    { title: "Neural Logic", desc: "AI models deconstruct visuals and text in parallel.", icon: Cpu, badge: "Phase 2" },
    { title: "Fusion Engine", desc: "Multiple signals converge into a singular threat score.", icon: Zap, badge: "Phase 3" },
    { title: "Intel Mapping", desc: "Intelligence layers correlate data with known actors.", icon: Network, badge: "Phase 4" },
    { title: "Response Node", desc: "Explainable insights and actions are generated.", icon: ShieldCheck, badge: "Phase 5" },
  ]

  return (
    <section id="process" className="relative py-16 md:py-20 lg:py-24 px-6 bg-[#070D14] overflow-hidden border-y border-white/5">
      {/* 🔮 Background Flow Elements */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-0.5 w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto space-y-20 flex flex-col items-center">
        <div className="text-center max-w-4xl space-y-10 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="flex items-center justify-center space-x-3 text-accent group opacity-60 hover:opacity-100 transition-opacity uppercase font-black tracking-[0.4em] text-[10px]">
              <Activity className="h-4 w-4" />
              <span>THE FUSION PIPELINE</span>
           </div>
           
           <h2 className="text-4xl md:text-[5rem] font-black tracking-tighter text-foreground uppercase leading-[0.95]">
             From Detection <br />
             <span className="text-accent italic font-light decoration-4 underline decoration-accent/10">To Inference.</span>
           </h2>
        </div>

        {/* 🎬 Process Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
           {steps.map((step, i) => (
             <div key={i} className="group relative flex flex-col items-center text-center space-y-8">
                {/* 🎇 Connection Node */}
                <div className="relative flex items-center justify-center">
                   <div className="h-20 w-20 rounded-[2rem] bg-black/40 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-accent/40 shadow-2xl relative z-20 group-hover:bg-accent/10">
                      <step.icon className="h-8 w-8 text-accent transition-all group-hover:fill-accent/10 group-hover:scale-125" />
                   </div>
                   
                   {/* 🎇 Orbital Ring */}
                   <div className="absolute inset-0 rounded-full border-2 border-accent/10 animate-[spin_10s_linear_infinite] group-hover:border-accent/30 opacity-40" />
                   
                   {/* 🎇 Line Connector (Right) */}
                   {i < steps.length - 1 && (
                      <div className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2 h-px w-[calc(100%+24px)] bg-gradient-to-r from-accent/40 via-accent/10 to-transparent -z-10" />
                   )}
                </div>

                <div className="space-y-4 px-2">
                   <Badge variant="outline" className="text-[8px] h-5 rounded-full px-3 py-0 border-white/10 uppercase font-black tracking-widest text-muted-foreground transition-all group-hover:text-accent group-hover:scale-110">{step.badge}</Badge>
                   <h4 className="text-lg font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-accent">{step.title}</h4>
                   <p className="text-[11px] md:text-[12px] text-muted-foreground/60 leading-relaxed font-black uppercase tracking-widest hover:text-muted-foreground transition-colors">
                      {step.desc}
                   </p>
                </div>
                
                {/* 🎇 Step Index Accent */}
                <div className="text-4xl font-black text-white/5 absolute -top-8 left-1/2 -translate-x-1/2 -z-20 group-hover:text-white/10 transition-all uppercase tracking-tighter">0{i+1}</div>
             </div>
           ))}
        </div>
        
        {/* 🎬 CTA Preview Summary */}
        <div className="pt-24 opacity-60 hover:opacity-100 transition-opacity">
           <Badge className="bg-accent/5 border-dashed border-accent/30 text-accent font-black tracking-widest px-6 py-2 text-[10px] uppercase">
              End-to-end Inference cycle: {"<"} 1.2s
           </Badge>
        </div>
      </div>
    </section>
  )
}
