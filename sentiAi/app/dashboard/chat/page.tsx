"use client"

import React, { useState, useEffect, useRef } from "react"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatMessage } from "@/components/chat/ChatMessage"
import { ChatInput } from "@/components/chat/ChatInput"
import { ContextPanel } from "@/components/chat/ContextPanel"
import { ScrollArea } from "@/components/ui/scroll-area"

const initialMessages = [
  {
    role: "ai" as const,
    content: "Good evening, Analyst. I've been monitoring the infrastructure for anomalous signatures. How can I assist you with threat intelligence or incident response today?",
    suggestions: ["Show phishing attacks targeting finance", "Analyze recent URL scans", "Check campaign CAMP-2026-1847"]
  },
  {
    role: "user" as const,
    content: "Show phishing attacks targeting finance team"
  },
  {
    role: "ai" as const,
    content: "Analysis complete. I have identified 14 phishing attempts targeting the finance department over the last 24 hours. \n\nKey Findings:\n- 12/14 attempts used domain spoofing (auth-login.net).\n- Payload: High correlation with FIN7/GIBON loader patterns.\n- Primary Target: Payroll & Accounts Receivable nodes.",
    sources: ["CAMP-2026-1847", "OSINT:FIN7", "Internal-Telemetry-v4"],
    suggestions: ["Show related campaigns", "Block malicious domain", "Escalate to Level 3"]
  }
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-[calc(100vh-80px)] w-full gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Chat Area (col-span-8) */}
      <div className="flex-1 lg:flex-[8_8_0%] flex flex-col card-cyber overflow-hidden relative">
        <ChatHeader />
        
        {/* Messages Scroll Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 scroll-smooth scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent"
        >
          {messages.map((msg, i) => (
            <ChatMessage key={i} {...msg} />
          ))}
          
          {/* Subtle background placeholder */}
          {messages.length === 0 && (
            <div className="h-full w-full flex flex-col items-center justify-center space-y-6 opacity-20">
               <div className="h-24 w-24 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
               <h4 className="text-sm font-black uppercase tracking-[0.4em] text-accent">Initializing SentinelCHAT...</h4>
            </div>
          )}
        </div>
        
        <ChatInput />
      </div>

      {/* Context Panel (col-span-4) */}
      <div className="hidden lg:flex lg:flex-[4_4_0%] flex-col h-full bg-transparent overflow-hidden">
        <ScrollArea className="flex-1 pr-2 scrollbar-thin">
           <ContextPanel />
        </ScrollArea>
      </div>
    </div>
  )
}
