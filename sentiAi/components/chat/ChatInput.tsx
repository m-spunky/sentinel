"use client"

import React, { useState } from "react"
import { Send, Search, Zap, Command, LucideMousePointer2, Sparkles, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChatInput() {
  const [value, setValue] = useState("")
  
  return (
    <div className="p-4 pt-0 mt-auto bg-gradient-to-t from-[#0D1B2A] to-transparent">
      <div className="relative group w-full">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-accent/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="relative flex items-center bg-[#0D1B2A]/80 backdrop-blur-xl border border-[#00C9A7]/20 group-focus-within:border-accent/40 rounded-3xl p-2 pl-6 shadow-2xl transition-all duration-300">
           <div className="flex items-center text-muted-foreground mr-4 group-focus-within:text-accent transition-colors">
              <Sparkles className="h-5 w-5" />
           </div>
           
           <Input 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about threats, campaigns, or security insights..." 
              className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm font-bold placeholder:text-muted-foreground/30 h-10 px-0"
           />
           
           <div className="flex items-center space-x-2 mr-2">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-2xl transition-colors">
                 <Filter className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-white/5 mx-1" />
              <Button 
                size="icon" 
                className="h-10 w-10 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 accent-glow transition-all hover:scale-110 active:scale-90"
              >
                 <Send className="h-4 w-4" />
              </Button>
           </div>
        </div>
        
        {/* Shortcut Legend */}
        <div className="flex items-center justify-between mt-2 px-4 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
           <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                 <kbd className="text-[8px] bg-accent/20 text-accent font-black px-1.5 py-0.5 rounded border border-accent/20 uppercase tracking-tighter shadow-lg">Enter</kbd>
                 <span className="text-[8px] text-muted-foreground font-black uppercase tracking-widest leading-none">Send</span>
              </div>
              <div className="flex items-center space-x-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                 <kbd className="text-[8px] bg-accent/20 text-accent font-black px-1.5 py-0.5 rounded border border-accent/20 uppercase tracking-tighter shadow-lg">Shift + Enter</kbd>
                 <span className="text-[8px] text-muted-foreground font-black uppercase tracking-widest leading-none">New Line</span>
              </div>
           </div>
           
           <div className="flex items-center space-x-2 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[8px] text-accent uppercase font-black tracking-widest leading-none">AI Response Model: Grok-SOC-v2</span>
           </div>
        </div>
      </div>
    </div>
  )
}
