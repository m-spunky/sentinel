"use client"

import React, { useState } from "react"
import { Share2, Zap, LayoutDashboard, Target, Globe, User, Activity, MoreHorizontal, Maximize2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Node, NodeType } from "./Node"
import { cn } from "@/lib/utils"

const nodes = [
  { id: "1", label: "FIN7", type: "actor" as const, x: 50, y: 50 },
  { id: "2", label: "CAMP-2026-1847", type: "campaign" as const, x: 30, y: 35 },
  { id: "3", label: "auth-login.net", type: "domain" as const, x: 70, y: 25 },
  { id: "4", label: "192.168.45.21", type: "ip" as const, x: 80, y: 55 },
  { id: "5", label: "CAMP-2026-0912", type: "campaign" as const, x: 25, y: 70 },
  { id: "6", label: "secure-pay.ua", type: "domain" as const, x: 45, y: 80 },
  { id: "7", label: "cloud-verify.io", type: "domain" as const, x: 15, y: 45 },
]

const edges = [
  { fromId: "1", toId: "2" },
  { fromId: "1", toId: "5" },
  { fromId: "1", toId: "3" },
  { fromId: "2", toId: "3" },
  { fromId: "3", toId: "4" },
  { fromId: "5", toId: "6" },
  { fromId: "2", toId: "7" },
]

export function GraphView() {
  const [activeNodeId, setActiveNodeId] = useState("1")
  
  return (
    <Card className="card-cyber overflow-hidden h-full flex flex-col group relative">
      <CardHeader className="p-6 border-b border-white/5 space-y-2 flex flex-row items-center justify-between z-10 bg-accent/5 backdrop-blur-sm">
        <div className="space-y-1">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-accent flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Infrastructure Relationship Graph
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
             AI-Synthesized entity mapping for investigation #8472
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
           <Badge variant="outline" className="text-[8px] h-5 rounded-full px-3 py-0 border-white/10 uppercase font-black tracking-widest bg-white/5">Auto-Refreshed</Badge>
           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
              <MoreHorizontal className="h-4 w-4" />
           </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 relative overflow-hidden flex items-center justify-center cursor-move select-none">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,201,167,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,201,167,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,201,167,0.05)_0%,transparent_70%)]" />
         
         {/* UI Controls Footer */}
         <div className="absolute bottom-6 left-6 p-2 rounded-2xl bg-[#0D1B2A]/80 border border-white/5 backdrop-blur-md flex items-center space-x-2 z-30 transition-all hover:border-accent/30 shadow-2xl">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl"><ZoomIn className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl"><ZoomOut className="h-5 w-5" /></Button>
            <div className="h-6 w-px bg-white/5 mx-2" />
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl"><RotateCcw className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-xl"><Maximize2 className="h-5 w-5" /></Button>
         </div>

         {/* Graph Legend Panel */}
         <div className="absolute right-6 top-24 p-4 rounded-2xl bg-[#0D1B2A]/60 border border-white/5 backdrop-blur-sm z-30 space-y-3 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-700">
            {[
              { label: "Threat Actor", type: "actor" as const, color: "bg-destructive shadow-[0_0_8px_rgba(255,77,109,0.3)]" },
              { label: "Campaign", type: "campaign" as const, color: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]" },
              { label: "Domain IOC", type: "domain" as const, color: "bg-accent shadow-[0_0_8px_rgba(0,201,167,0.3)]" },
              { label: "IP Origin", type: "ip" as const, color: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]" },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 group/legend cursor-pointer">
                 <div className={cn("h-2.5 w-2.5 rounded-full transition-transform group-hover/legend:scale-125 duration-300", item.color)} />
                 <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover/legend:text-foreground transition-colors">{item.label}</span>
              </div>
            ))}
         </div>

         {/* Edges Layer (CSS Lines) */}
         <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-20">
            {edges.map((edge, i) => {
              const fromNode = nodes.find(n => n.id === edge.fromId)!
              const toNode = nodes.find(n => n.id === edge.toId)!
              
              const x1 = `${fromNode.x}%`
              const y1 = `${fromNode.y}%`
              const x2 = `${toNode.x}%`
              const y2 = `${toNode.y}%`
              
              return (
                <line 
                  key={i} 
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  className={cn(
                    "stroke-accent/40 stroke-1 transition-all duration-700",
                    (edge.fromId === activeNodeId || edge.toId === activeNodeId) ? "stroke-accent stroke-2 animate-pulse opacity-100" : ""
                  )} 
                />
              )
            })}
         </svg>

         {/* Nodes Layer */}
         <div className="absolute inset-0 h-full w-full">
            {nodes.map(node => (
              <Node 
                key={node.id} 
                {...node} 
                active={activeNodeId === node.id} 
                onClick={() => setActiveNodeId(node.id)} 
              />
            ))}
         </div>

         {/* Subtle scan effect across graph */}
         <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-scan z-10 pointer-events-none" />
      </CardContent>
    </Card>
  )
}
