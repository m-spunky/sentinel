"use client"

import React from "react"
import { MessageSquare, Sparkles, MoreHorizontal, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatHeader() {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6 border-b border-white/5 bg-[#0D1B2A]/40 backdrop-blur-md rounded-t-3xl">
      <div className="flex items-center space-x-4">
        <div className="h-9 w-9 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30 accent-glow shadow-xl shadow-accent/10">
          <MessageSquare className="h-4 w-4 text-accent" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-black tracking-tight text-foreground uppercase leading-none">SentinelChat</h1>
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          </div>
          <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.1em] opacity-80 leading-none">
            AI Cybersecurity Operations Assistant <span className="mx-2 text-white/5">|</span> <span className="text-accent underline decoration-accent/20 underline-offset-4 font-normal lowercase italic italic">v2.4-LLM-Inference</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
         <div className="hidden lg:flex flex-col items-end mr-4">
            <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em] leading-none mb-1">Inference Status</p>
            <div className="flex items-center space-x-1.5">
               <span className="text-[8px] font-bold text-accent italic lowercase leading-none">Healthy & Optimized</span>
               <div className="h-1 w-1 rounded-full bg-accent" />
            </div>
         </div>
         <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
            <ShieldCheck className="h-4 w-4" />
         </Button>
         <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
            <MoreHorizontal className="h-4 w-4" />
         </Button>
      </div>
    </header>
  )
}
