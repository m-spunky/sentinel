"use client"

import React, { useState } from "react"
import { Mail, Globe, Zap, History, CornerDownRight, Upload, Sparkles, Filter, Database, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { InputTypeCard } from "./InputTypeCard"

export function AnalysisInputSection() {
  const [selected, setSelected] = useState<"email" | "url">("email")
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState("")
  
  const handleAnalyze = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const recentScans = [
    { type: "Email", target: "invoice_942.eml", result: "Phishing", time: "2m ago" },
    { type: "URL", target: "secure-auth.net/pay", result: "Malicious", time: "15m ago" },
    { type: "Email", target: "hr_manual_v2.eml", result: "Safe", time: "2h ago" },
  ]

  return (
    <Card className="card-cyber h-full flex flex-col group relative overflow-hidden bg-cyber-gradient">
      {/* 🔮 Background Inference Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,201,167,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,201,167,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      
      {/* 🚀 Left Accent Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-40 shadow-[0_0_15px_#00C9A7]" />
      
      <CardHeader className="p-8 border-b border-white/5 bg-accent/3 relative z-10 backdrop-blur-sm">
        <div className="flex items-center justify-between">
           <div className="space-y-1">
             <CardTitle className="text-xl font-black uppercase tracking-tighter text-foreground flex items-center group-hover:text-accent transition-colors">
               <Zap className="h-5 w-5 mr-3 text-accent fill-accent/20" />
               Analysis Input
             </CardTitle>
             <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] leading-none mt-1 opacity-70">
                SentinelAI Inference Core v2.4
             </CardDescription>
           </div>
           <Badge className="bg-accent/10 border-accent/30 text-accent font-black tracking-widest text-[8px] h-6 px-3 uppercase animate-pulse">
              Live Engine
           </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8 flex-1 flex flex-col relative z-10">
        {/* 🔲 Card Selection Grid */}
        <div className="grid grid-cols-2 gap-4">
          <InputTypeCard 
             title="Email Analysis"
             description="Analyze headers, body, and forensic metadata."
             icon={Mail}
             active={selected === "email"}
             onClick={() => setSelected("email")}
          />
          <InputTypeCard 
             title="URL Scan"
             description="Deconstruct domains for phishing and reputation."
             icon={Globe}
             active={selected === "url"}
             onClick={() => setSelected("url")}
          />
        </div>
        
        {/* 🧾 Dynamic Input Zone */}
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
           {selected === "email" ? (
             <div className="relative group/input">
                <Textarea 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Paste raw email headers or body content for deep inspection..." 
                  className="h-64 bg-[#070D14] border-white/5 focus:border-accent/40 rounded-2xl text-xs font-bold leading-relaxed placeholder:text-muted-foreground/30 p-6 resize-none shadow-inner tracking-tight"
                />
                <div className="absolute bottom-4 right-6 flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 pointer-events-none group-focus-within/input:text-accent transition-colors">
                   <div className="h-1 w-1 rounded-full bg-accent opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
                   AI-Ready Stream
                </div>
             </div>
           ) : (
             <div className="space-y-4">
                <div className="relative group/input">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within/input:text-accent transition-colors duration-500" />
                    <Input 
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter target URL (e.g., https://secure-login.pay/auth)" 
                      className="bg-[#070D14] border-white/5 focus:border-accent/40 rounded-2xl pl-16 h-16 text-sm font-black tracking-tight placeholder:text-muted-foreground/30 shadow-inner focus:ring-accent/10 focus:ring-4"
                    />
                </div>
                
                <div className="p-5 rounded-2xl border border-dashed border-white/10 bg-[#070D14]/50 flex items-center justify-between group/upload cursor-pointer hover:bg-white/5 hover:border-accent/20 transition-all duration-500">
                   <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/upload:border-accent/30 group-hover/upload:text-accent transition-all">
                         <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground group-hover/upload:text-accent transition-colors">Bulk Domain Upload</h4>
                         <p className="text-[8px] text-muted-foreground mt-0.5 italic leading-none opacity-60 lowercase">.CSV or .TXT list support</p>
                      </div>
                   </div>
                   <CornerDownRight className="h-4 w-4 text-muted-foreground opacity-30 group-hover/upload:opacity-100 transition-all group-hover/upload:translate-x-1" />
                </div>
             </div>
           )}
        </div>
        
        {/* 🚀 Operation Execution */}
        <div className="mt-auto space-y-6 pt-6 border-t border-white/5">
           <Button 
              onClick={handleAnalyze}
              disabled={loading}
              className={cn(
                "w-full h-16 rounded-2xl text-lg font-black uppercase tracking-[0.3em] transition-all transform hover:scale-[1.01] active:scale-95 shadow-2xl relative overflow-hidden group/btn",
                loading ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" : "bg-accent text-accent-foreground hover:bg-accent/90 accent-glow shadow-accent/20"
              )}
           >
              {loading ? (
                <div className="flex items-center space-x-3">
                   <div className="h-5 w-5 border-2 border-accent-foreground/20 border-t-accent-foreground rounded-full animate-spin" />
                   <span className="opacity-80">Syncing Inference...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                   <Zap className="h-5 w-5 fill-accent-foreground" />
                   <span>Execute Full Analysis</span>
                </div>
              )}
              
              {!loading && (
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              )}
           </Button>

           {/* 🗒️ History Bar (Standard Minimal Design) */}
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center">
                    <History className="h-3 w-3 mr-2 text-accent" />
                    Scan Telemetry
                 </h4>
                 <div className="h-px flex-1 bg-white/5 mx-4" />
                 <Button variant="ghost" className="h-6 px-3 text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent/10 rounded-full">Explore Logic</Button>
              </div>
              
              <div className="space-y-2">
                 {recentScans.map((scan, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#070D14]/40 border border-white/5 hover:border-accent/20 hover:bg-[#070D14]/60 transition-all duration-300 cursor-pointer group/item">
                       <div className="flex items-center space-x-4">
                          <div className={cn(
                             "h-2 w-2 rounded-full relative",
                             scan.result === "Phishing" || scan.result === "Malicious" ? "bg-destructive shadow-[0_0_8px_#FF4D6D]" : "bg-accent shadow-[0_0_8px_#00C9A7]"
                          )}>
                             <div className="absolute inset-0 rounded-full bg-inherit animate-ping opacity-20" />
                          </div>
                          <span className="text-[10px] font-bold text-foreground group-hover/item:text-accent transition-colors truncate w-40">{scan.target}</span>
                       </div>
                       <span className="text-[8px] font-black text-muted-foreground uppercase opacity-40 tracking-widest">{scan.time}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </CardContent>
    </Card>
  )
}
