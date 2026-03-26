"use client"

import React from "react"
import { ShieldCheck, User, Zap, Sparkles, MessageSquare, ArrowRightCircle, Target, ShieldAlert, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MessageProps {
  role: "user" | "ai"
  content: string
  sources?: string[]
  suggestions?: string[]
}

export function ChatMessage({ role, content, sources, suggestions }: MessageProps) {
  const isAi = role === "ai"
  
  return (
    <div className={cn(
      "flex w-full space-x-4 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
      !isAi && "justify-end"
    )}>
      {isAi && (
        <div className="h-10 w-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 shadow-xl shadow-accent/10">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] flex flex-col space-y-4",
        !isAi && "items-end"
      )}>
        <CardBody isAi={isAi}>
           <p className="text-sm md:text-base text-foreground leading-[1.8] font-medium tracking-tight opacity-90 whitespace-pre-wrap">
              {content}
           </p>
           
           {isAi && sources && sources.length > 0 && (
             <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2 self-center">Evidence Sources:</span>
                {sources.map((source, i) => (
                  <Badge key={i} className="bg-accent/10 text-accent border-accent/20 text-[8px] h-5 rounded-lg px-2 uppercase font-black tracking-widest cursor-pointer hover:bg-accent/20 transition-colors">
                     {source}
                  </Badge>
                ))}
             </div>
           )}
        </CardBody>

        {isAi && suggestions && suggestions.length > 0 && (
           <div className="flex flex-wrap gap-3 mt-2 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
              {suggestions.map((suggestion, i) => (
                <Button key={i} variant="outline" size="sm" className="rounded-xl border-accent/20 hover:border-accent/50 text-accent bg-accent/5 font-black text-[10px] uppercase tracking-widest h-8 px-4 transition-all hover:scale-105 active:scale-95 group">
                   <Target className="h-3.5 w-3.5 mr-2 group-hover:scale-110 transition-transform" />
                   {suggestion}
                </Button>
              ))}
           </div>
        )}
      </div>

      {!isAi && (
        <div className="h-10 w-10 rounded-xl bg-[#1B263B] border border-white/5 flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden shadow-black/20 order-2">
          <div className="h-full w-full bg-accent/20 flex items-center justify-center text-accent">
            <User className="h-5 w-5" />
          </div>
        </div>
      )}
    </div>
  )
}

function CardBody({ children, isAi }: { children: React.ReactNode, isAi: boolean }) {
  return (
    <div className={cn(
      "rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300",
      isAi 
       ? "card-cyber" 
       : "bg-accent text-accent-foreground border border-accent/20 glow-soft"
    )}>
       {isAi && (
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <ShieldCheck className="h-16 w-16" />
          </div>
       )}
       <div className={cn(
         "relative z-10",
         !isAi && "text-accent-foreground"
       )}>
          {children}
       </div>
    </div>
  )
}
