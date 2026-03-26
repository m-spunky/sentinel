"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Search, 
  ShieldCheck, 
  Target, 
  MessageSquare, 
  Settings, 
  User,
  LogOut,
  ChevronRight,
  TrendingUp,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Analyze", icon: Search, href: "/dashboard/analyze" },
  { name: "Intelligence", icon: ShieldCheck, href: "/dashboard/intelligence" },
  { name: "Campaigns", icon: Target, href: "/dashboard/campaigns" },
  { name: "Chat", icon: MessageSquare, href: "/dashboard/chat", badge: "2" },
]

interface SidebarProps {
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "h-full flex flex-col bg-[#070D14] transition-all duration-500",
      collapsed ? "p-3 px-2" : "p-4"
    )}>
      {/* Brand Identity / Logo */}
      <div className={cn(
        "flex items-center gap-4 px-2 py-8 transition-all duration-500",
        collapsed ? "justify-center" : "px-3"
      )}>
        <div className="h-10 w-10 shrink-0 bg-accent/20 rounded-xl flex items-center justify-center border border-accent/30 shadow-[0_0_15px_rgba(0,201,167,0.2)]">
          <ShieldCheck className="h-6 w-6 text-accent" />
        </div>
        {!collapsed && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-700">
            <h1 className="text-xl font-black tracking-tighter text-foreground uppercase">SentinelAI</h1>
            <p className="text-[10px] text-accent font-black tracking-[0.2em] -mt-1 uppercase opacity-80">Fusion v2.0</p>
          </div>
        )}
      </div>

      {/* Navigation Layer */}
      <nav className="flex-1 mt-6 space-y-2">
        {!collapsed && (
          <p className="text-[9px] font-black tracking-[0.4em] uppercase text-muted-foreground/50 px-3 mb-6 animate-in fade-in duration-1000">Core Network</p>
        )}
        
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 group cursor-pointer relative",
                  isActive 
                    ? "bg-accent/10 border border-accent/20 text-accent" 
                    : "hover:bg-white/5 border border-transparent text-muted-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                <div className={cn("flex items-center", collapsed ? "justify-center" : "space-x-4")}>
                  <div className={cn(
                    "p-2 rounded-lg transition-all",
                    isActive ? "text-accent bg-accent/10 shadow-[0_0_15px_rgba(0,201,167,0.2)]" : "group-hover:text-foreground"
                  )}>
                    <item.icon className={cn("transition-transform duration-300", !isActive && "group-hover:scale-110", collapsed ? "h-6 w-6" : "h-5 w-5")} />
                  </div>
                  
                  {!collapsed && (
                    <span className={cn(
                      "font-bold text-sm tracking-tight transition-colors animate-in fade-in slide-in-from-left-2 duration-500",
                      isActive ? "text-foreground" : "group-hover:text-foreground"
                    )}>
                      {item.name}
                    </span>
                  )}
                </div>
                
                {/* Badge Overlay */}
                {item.badge && (
                  collapsed ? (
                    <div className="absolute top-1 right-1 h-3 w-3 bg-destructive rounded-full border-2 border-[#070D14]" />
                  ) : (
                    <Badge className="bg-accent text-accent-foreground text-[10px] h-5 min-w-5 flex items-center justify-center rounded-full p-0 shadow-lg shadow-accent/20 animate-in zoom-in duration-700">
                      {item.badge}
                    </Badge>
                  )
                )}
                
                {/* Selection Indicator Bar */}
                {isActive && !collapsed && (
                   <div className="h-5 w-1 bg-accent rounded-full absolute -left-1 shadow-[0_0_10px_#00C9A7]" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Session Interface */}
      <div className="mt-auto space-y-6">
        <div className="h-px bg-white/5 w-full mx-auto" />
        
        {/* User Persona */}
        <div className={cn(
          "bg-[#0D1B2A]/40 rounded-2xl border border-white/5 group transition-all duration-300 hover:bg-[#0D1B2A]/70 relative overflow-hidden",
          collapsed ? "p-2" : "p-3"
        )}>
          <div className="flex items-center justify-between h-full">
            <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "space-x-3")}>
               <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-accent to-secondary flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-105 transition-transform">
                 <span className="text-accent-foreground font-black text-xs">VA</span>
               </div>
               
               {!collapsed && (
                 <div className="flex-1 min-w-0 animate-in fade-in duration-700">
                   <h4 className="text-sm font-black text-foreground truncate tracking-tight">Analyst 042</h4>
                   <p className="text-[10px] text-accent/70 uppercase font-black tracking-[0.2em] leading-none mt-1">L3 Forensic</p>
                 </div>
               )}
            </div>
            
            {!collapsed && (
               <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg shrink-0 transition-colors">
                 <LogOut className="h-4 w-4" />
               </Button>
            )}
          </div>
        </div>
        
        {collapsed && (
           <Button variant="ghost" size="icon" className="h-10 w-10 mx-auto w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all">
             <LogOut className="h-5 w-5" />
           </Button>
        )}
      </div>
    </div>
  )
}
