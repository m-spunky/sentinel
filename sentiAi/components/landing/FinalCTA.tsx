"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, Globe, Activity, Mail, Search, MessageSquare, Target, Lock, Share2, MoreHorizontal, Maximize2, ZoomIn, ZoomOut, RotateCcw, Filter, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function FinalCTA() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 px-6 bg-black overflow-hidden border-t border-white/5">
      {/* 🔮 Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] bg-accent/5 rounded-full blur-[200px] -z-10 animate-pulse" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-4xl space-y-10 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="flex items-center justify-center space-x-3 text-accent group opacity-60 hover:opacity-100 transition-opacity uppercase font-black tracking-[0.4em] text-[10px]">
              <Lock className="h-4 w-4" />
              <span>THE FUTURE IS FUSION</span>
           </div>
           
           <h2 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-foreground uppercase leading-[0.85]">
             Start Seeing Threats <br />
             The Way <span className="text-accent underline decoration-accent/10 underline-offset-8 italic font-light decoration-4 transition-all hover:decoration-accent/40">Attackers</span> Do.
           </h2>
           
           <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed font-light">
             Stop responding to disconnected alerts. Start understanding the full narrative of your workspace security with SentinelAI.
           </p>

           <div className="flex flex-wrap items-center justify-center gap-6 pt-10">
              <Link href="/dashboard/analyze">
                <Button size="lg" className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 accent-glow px-12 py-8 text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl">
                   Launch Console
                   <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="rounded-2xl border-white/10 cyber-border hover:bg-white/5 px-12 py-8 text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95">
                   Explore Platform
                </Button>
              </Link>
           </div>
        </div>
        
        {/* 🎬 Center UI Preview Block (Mini) */}
        <div className="mt-16 w-full max-w-5xl rounded-[3rem] border border-white/5 bg-[#070D14]/80 flex flex-col items-center justify-center p-20 overflow-hidden shadow-2xl relative group cursor-none">
           <div className="absolute inset-0 bg-[#0D1B2A]/50 backdrop-blur-3xl animate-pulse duration-[5000ms] -z-10" />
           <div className="flex flex-col items-center text-center space-y-10 relative z-10">
              <div className="h-24 w-24 rounded-[2rem] bg-accent/20 border border-accent/40 flex items-center justify-center shadow-[0_0_40px_rgba(0,201,167,0.3)] animate-bounce group-hover:scale-110 transition-transform">
                 <ShieldCheck className="h-12 w-12 text-accent" />
              </div>
              <p className="text-[12px] font-black uppercase tracking-[0.8em] text-accent opacity-40">Operational Status: Peak</p>
           </div>
           
           {/* Static Data Lines */}
           <div className="absolute bottom-[-100px] left-[-150px] h-[500px] w-full bg-[linear-gradient(rgba(0,201,167,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,201,167,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-1 group-hover:bg-[size:80px_80px] transition-all duration-[2000ms]" />
        </div>
      </div>
    </section>
  )
}
