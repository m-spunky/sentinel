import React from "react"
import { ShieldCheck, Target, User, Globe, Share2, MoreVertical, Link2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface IntelCardProps {
  campaign: string
  actor: string
}

export function IntelCard({ campaign, actor }: IntelCardProps) {
  const intelItems = [
    { label: "Campaign ID", value: campaign, icon: Target, color: "accent" },
    { label: "Threat Actor", value: actor, icon: User, color: "destructive" },
    { label: "Confidence", value: "94.2%", icon: ShieldCheck, color: "accent" },
    { label: "Global Reach", value: "UA, PL, US", icon: Globe, color: "accent" },
  ]
  
  return (
    <Card className="card-cyber h-full flex flex-col p-8">
      <CardHeader className="p-0 border-b border-white/5 space-y-2 flex flex-row items-center justify-between mb-8">
        <div className="space-y-1">
          <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-foreground flex items-center group-hover:text-accent transition-colors">
            <Share2 className="h-4 w-4 mr-2" />
            Threat Intelligence Mapping
          </CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-1">
             OSINT & Historical Data Correlation
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg">
           <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0 space-y-8 flex-1 flex flex-col justify-center">
         <div className="grid grid-cols-2 gap-8">
            {intelItems.map((item, i) => (
              <div key={i} className="space-y-2 group/item px-4 py-3 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300 hover:bg-accent/5 cursor-pointer">
                 <div className="flex items-center text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover/item:text-accent transition-colors">
                    <item.icon className="h-3 w-3 mr-2" />
                    {item.label}
                 </div>
                 <h3 className={cn(
                   "text-2xl font-black tracking-tighter",
                   item.color === "destructive" ? "text-destructive" : "text-foreground group-hover/item:text-accent transition-colors"
                 )}>{item.value}</h3>
              </div>
            ))}
         </div>
         
         <div className="pt-8 border-t border-white/5 space-y-6">
            <div className="flex items-center justify-between">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Related Domains</h4>
               <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[8px] h-4 rounded-full px-2 uppercase font-black tracking-widest">Active Sinkholes</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
               {["auth-login.net", "secure-pay.ua", "cloud-verify.io", "v-log.ru"].map((domain, i) => (
                 <div key={i} className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg hover:border-destructive/30 transition-all cursor-pointer group/domain">
                    <Link2 className="h-3 w-3 text-muted-foreground group-hover/domain:text-destructive transition-colors rotate-45" />
                    <span className="text-[10px] font-bold text-foreground group-hover/domain:text-destructive transition-colors">{domain}</span>
                 </div>
               ))}
            </div>
         </div>
      </CardContent>
    </Card>
  )
}
