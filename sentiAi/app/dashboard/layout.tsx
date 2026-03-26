"use client"

import React, { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen w-screen bg-black text-[#E0E1DD] overflow-hidden">
      {/* 🖥️ Desktop Sidebar (Collapsible) */}
      <div 
        className={cn(
          "hidden lg:block h-full transition-all duration-500 ease-in-out border-r border-[#00C9A7]/10 bg-[#070D14] relative z-50",
          collapsed ? "w-20" : "w-72"
        )}
      >
        <Sidebar collapsed={collapsed} />
      </div>
      
      {/* Platform Content Stack */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-black relative">
        {/* Ambient Page Glows */}
        <div className="absolute top-0 right-0 h-[40vh] w-[40vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none opacity-50 transition-opacity" />
        <div className="absolute bottom-0 left-0 h-[30vh] w-[30vw] bg-accent/3 rounded-full blur-[100px] pointer-events-none opacity-40 transition-opacity" />
        
        {/* Global Toolbar */}
        <Header 
          sidebarCollapsed={collapsed} 
          setSidebarCollapsed={setCollapsed} 
        />
        
        {/* Viewport for specific page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
           <div className="p-4 md:p-6 lg:p-8 pb-12 w-full max-w-[1920px] mx-auto">
             {children}
           </div>
        </main>
      </div>
    </div>
  )
}
