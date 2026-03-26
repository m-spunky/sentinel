import React from "react"
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string
  trend: string
  trendType: "up" | "down" | "neutral"
  icon: LucideIcon
  color?: string
}

export function KpiCard({ title, value, trend, trendType, icon: Icon, color = "accent" }: KpiCardProps) {
  const TrendIcon = trendType === "up" ? ArrowUpRight : trendType === "down" ? ArrowDownRight : Minus
  
  return (
    <Card className="card-cyber hover:border-[#00C9A7]/30 transition-all duration-300 shadow-xl shadow-black/20 group group-hover:bg-[#1B263B]/80 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="h-12 w-12" />
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 group-hover:rotate-3",
            color === "accent" ? "bg-accent/10 border border-accent/20 text-accent accent-glow" : "bg-destructive/10 border border-destructive/20 text-destructive"
          )}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">{title}</span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">{value}</h2>
            <div className={cn(
              "flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider w-fit",
              trendType === "up" ? "bg-accent/10 text-accent" : trendType === "down" ? "bg-destructive/10 text-destructive" : "bg-white/5 text-muted-foreground"
            )}>
              <TrendIcon className="h-3 w-3 stroke-[3]" />
              <span>{trend} vs last month</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-accent/40 to-transparent rounded-full mb-1" />
            <span className="text-[8px] uppercase tracking-widest font-black leading-none italic">Updated 3s ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
