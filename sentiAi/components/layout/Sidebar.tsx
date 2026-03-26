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
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Analyze", icon: Search, href: "/dashboard/analyze" },
  { name: "Intelligence", icon: ShieldCheck, href: "/dashboard/intelligence" },
  { name: "Campaigns", icon: Target, href: "/dashboard/campaigns" },
  { name: "Chat", icon: MessageSquare, href: "/dashboard/chat", badge: "AI" },
]

interface SidebarProps {
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "h-full flex flex-col bg-[#0d1117] border-r border-blue-500/10 transition-all duration-300",
      collapsed ? "px-2 py-4" : "px-3 py-4"
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 mb-8 px-2",
        collapsed && "justify-center"
      )}>
        <div className="h-9 w-9 shrink-0 bg-blue-500/15 rounded-xl flex items-center justify-center border border-blue-500/25 shadow-lg shadow-blue-500/10">
          <ShieldCheck className="h-5 w-5 text-blue-400" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-200 uppercase font-mono">SentinelAI</h1>
            <p className="text-[9px] text-blue-400 font-mono uppercase tracking-widest leading-none mt-0.5">Fusion v2.0</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {!collapsed && (
          <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-slate-600 px-2 mb-4">Navigation</p>
        )}

        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent",
                collapsed && "justify-center"
              )}>
                {/* Active indicator */}
                {isActive && !collapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]" />
                )}

                <item.icon className={cn(
                  "shrink-0 transition-all duration-200",
                  collapsed ? "h-5 w-5" : "h-4 w-4",
                  isActive ? "text-blue-400" : "group-hover:text-slate-300"
                )} />

                {!collapsed && (
                  <span className={cn(
                    "text-[11px] font-bold uppercase tracking-wide flex-1",
                    isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                  )}>
                    {item.name}
                  </span>
                )}

                {item.badge && !collapsed && (
                  <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/20 text-[8px] h-4 px-1.5 uppercase font-mono">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="mt-auto space-y-3">
        <div className="h-px bg-white/5" />
        <div className={cn(
          "flex items-center gap-2.5 px-2 py-2 rounded-lg bg-white/3 border border-white/5 group transition-all hover:bg-white/5",
          collapsed && "justify-center"
        )}>
          <div className="h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-[9px]">VA</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Analyst 042</div>
              <div className="text-[9px] text-slate-500 uppercase font-mono">L3 Forensic</div>
            </div>
          )}
          {!collapsed && (
            <LogOut className="h-3.5 w-3.5 text-slate-600 hover:text-red-400 transition-colors cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  )
}
