import React from "react"
import { ShieldCheck, Target, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ThreatChart() {
  const categories = [
    { name: "Phishing", value: 65, color: "bg-destructive" },
    { name: "Malware", value: 42, color: "bg-yellow-500" },
    { name: "Suspicious", value: 28, color: "bg-accent" },
  ]
  
  return (
    <Card className="card-cyber overflow-hidden group h-full">
      <CardHeader className="p-6 border-b border-white/5 bg-accent/5">
        <div className="space-y-1">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-accent" />
            Threat Risk Index
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
             AI System Risk Level Assessment
          </CardDescription>
        </div>
        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
      </CardHeader>
      
      <CardContent className="p-8 flex flex-col items-center justify-center space-y-10">
        {/* Risk Index Visual */}
        <div className="relative h-56 w-56 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
           {/* Outer Ring */}
           <div className="absolute inset-0 rounded-full border-8 border-accent/10 border-t-accent animate-[spin_10s_linear_infinite] shadow-[0_0_30px_rgba(0,201,167,0.15)]" />
           {/* Inner Ring */}
           <div className="absolute inset-4 rounded-full border-4 border-destructive/20 border-b-destructive animate-[spin_6s_linear_infinite_reverse]" />
           {/* Center Content */}
           <div className="flex flex-col items-center justify-center z-10 transition-all">
             <div className="flex items-baseline space-x-1">
               <span className="text-6xl font-black tracking-tighter text-foreground group-hover:text-accent transition-colors">78</span>
               <span className="text-2xl font-black text-accent">%</span>
             </div>
             <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[8px] h-4 rounded-full px-3 uppercase font-black tracking-widest mt-1">
                Elevated Risk
             </Badge>
           </div>
        </div>

        {/* Dashboard Stat Bars */}
        <div className="w-full space-y-5">
           <div className="flex items-center justify-between mb-2">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Category Distribution</h4>
             <div className="h-1 w-12 bg-accent/20 rounded-full" />
           </div>
           
           {categories.map((cat) => (
             <div key={cat.name} className="space-y-1.5 group/bar px-2 py-1 rounded-lg transition-colors hover:bg-white/5 cursor-pointer">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center text-foreground group-hover/bar:text-accent transition-colors">
                    {cat.name === "Phishing" ? <AlertTriangle className="h-3 w-3 mr-2 text-destructive" /> : cat.name === "Malware" ? <Target className="h-3 w-3 mr-2 text-yellow-500" /> : <ShieldCheck className="h-3 w-3 mr-2 text-accent" />}
                    {cat.name}
                  </div>
                  <span className="text-muted-foreground">{cat.value}%</span>
               </div>
               <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={cn("h-full transition-all duration-1000", cat.color)} 
                    style={{ width: `${cat.value}%` }} 
                  />
               </div>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  )
}
