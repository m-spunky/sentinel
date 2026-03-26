"use client"

import React from "react"
import { Search, PlusCircle, ShieldAlert, Globe, Activity, LayoutDashboard, Target, Share2, MoreHorizontal, Maximize2, ZoomIn, ZoomOut, RotateCcw, Filter, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GraphView } from "@/components/intelligence/GraphView"
import { DetailsPanel } from "@/components/intelligence/DetailsPanel"
import { cn } from "@/lib/utils"

export default function IntelligencePage() {
  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="space-y-2">
           <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow-xl shadow-purple-500/10 border border-purple-500/30 transition-transform hover:scale-105">
                 <Target className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">Threat Intelligence Explorer</h1>
           </div>
           <div className="flex items-center space-x-2 pl-12 opacity-80 transition-opacity hover:opacity-100">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em]">Explore campaigns, actors, and infrastructure relationships <span className="text-purple-400 italic lowercase font-normal">v2.4-graph-visualizer</span></p>
           </div>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
           <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-purple-400 transition-colors" />
              <Input 
                placeholder="Lookup Campaign ID, Actor, or IOC..." 
                className="w-full md:w-80 bg-[#1B263B]/50 border-white/5 focus:border-purple-500/40 rounded-xl pl-10 text-xs font-bold transition-all focus:ring-purple-500/20"
              />
           </div>
           <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-purple-400 hover:bg-purple-500/10 rounded-xl">
              <Filter className="h-5 w-5" />
           </Button>
           <Button className="rounded-xl bg-purple-500 text-white font-black uppercase tracking-widest px-6 h-10 shadow-xl shadow-purple-500/20 hover:bg-purple-600 transition-all hover:scale-105 active:scale-95">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Investigation
           </Button>
        </div>
      </header>

      {/* Intelligence Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Graph Area (col-span-8) */}
        <div className="col-span-12 lg:col-span-8 min-h-[500px] lg:h-[850px]">
           <GraphView />
        </div>
        
        {/* Details Panel (col-span-4) */}
        <div className="col-span-12 lg:col-span-4 min-h-[500px] lg:h-[850px]">
           <DetailsPanel />
        </div>

        {/* Action Panel Footer (Operational Intel) */}
        <div className="col-span-12 pt-6">
           <Card className="card-cyber border-t-4 border-t-purple-500 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-20 transition-opacity group-hover:opacity-40">
                 <Target className="h-20 w-24 text-purple-500" />
              </div>
              <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                 <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">Synchronized Campaign Intelligence</h2>
                    <p className="text-sm text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
                       Cross-referencing global telemetry with known actor signatures
                    </p>
                 </div>
                 
                 <div className="flex flex-wrap items-center justify-center gap-4">
                    {[
                      { label: "Sync OSINT", icon: Share2, color: "purple" },
                      { label: "Deep Forensic Scan", icon: Activity, color: "purple" },
                      { label: "Export Evidence", icon: Download, color: "purple" },
                    ].map((btn, i) => (
                      <Button 
                         key={i} 
                         variant="outline" 
                         className="h-16 px-8 rounded-2xl border-2 border-purple-500/20 hover:border-purple-500/50 text-purple-400 hover:bg-purple-500/10 font-black uppercase tracking-[0.1em] text-xs transition-all hover:scale-105 active:scale-95 shadow-xl"
                      >
                         <btn.icon className="h-5 w-5 mr-3" />
                         {btn.label}
                      </Button>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>
      </section>
    </div>
  )
}

function Download(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}
