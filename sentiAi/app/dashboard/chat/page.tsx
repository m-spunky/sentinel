"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatMessage } from "@/components/chat/ChatMessage"
import { ChatInput } from "@/components/chat/ChatInput"
import { ContextPanel } from "@/components/chat/ContextPanel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { sendChatMessage } from "@/lib/api"

interface Message {
  role: "ai" | "user"
  content: string
  sources?: string[]
  suggestions?: string[]
  loading?: boolean
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "ai",
    content: "Good evening, Analyst. I'm SentinelChat — your AI cybersecurity operations assistant. I have full access to the SentinelAI Fusion platform data including active campaigns, threat intelligence, and detection history.\n\nHow can I assist you today?",
    suggestions: [
      "Show phishing attacks targeting finance",
      "Analyze recent URL scans",
      "Check campaign CAMP-2026-1847",
      "What threat actor is behind the wire fraud campaign?",
    ],
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [conversationId, setConversationId] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: text }])
    setIsLoading(true)

    // Add loading placeholder
    setMessages(prev => [...prev, { role: "ai", content: "", loading: true }])

    try {
      const result = await sendChatMessage(text, conversationId)
      setConversationId(result.conversation_id)

      // Replace loading placeholder with real response
      setMessages(prev => {
        const updated = [...prev]
        const lastIdx = updated.length - 1
        updated[lastIdx] = {
          role: "ai",
          content: result.response,
          sources: result.sources,
          suggestions: result.suggested_followups,
          loading: false,
        }
        return updated
      })
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Connection error. Is the backend running on port 8001?"
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "ai",
          content: `⚠ SentinelChat inference error: ${errMsg}`,
          loading: false,
        }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, conversationId])

  const handleSuggestion = useCallback((suggestion: string) => {
    handleSend(suggestion)
  }, [handleSend])

  return (
    <div className="flex h-[calc(100vh-80px)] w-full gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Chat Area */}
      <div className="flex-1 lg:flex-[8_8_0%] flex flex-col card-cyber overflow-hidden relative">
        <ChatHeader />

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              role={msg.role}
              content={msg.content}
              sources={msg.sources}
              suggestions={msg.suggestions}
              loading={msg.loading}
              onSuggestionClick={handleSuggestion}
            />
          ))}
        </div>

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>

      {/* Context Panel */}
      <div className="hidden lg:flex lg:flex-[4_4_0%] flex-col h-full bg-transparent overflow-hidden">
        <ScrollArea className="flex-1 pr-2">
          <ContextPanel />
        </ScrollArea>
      </div>
    </div>
  )
}
