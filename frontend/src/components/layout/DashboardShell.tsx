"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useUserStore } from "@/store/useUserStore"
import { TeamSwitcher } from "@/components/shared/TeamSwitcher"
import { DashboardNavbar } from "@/components/layout/DashboardNavbar"
import { cn } from "@/lib/utils"
import { Shield } from "lucide-react"

export type MenuSection = {
  title: string;
  items: { name: string; href: string; icon: any; exact?: boolean }[];
};

export function DashboardShell({ children, menuSections }: { children: React.ReactNode; menuSections: MenuSection[]; }) {
  const pathname = usePathname()
  const { role, username } = useUserStore()

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground animate-in fade-in duration-500">
      
      {/* SIDEBAR TÁCTICO */}
      <aside className="hidden w-64 flex-col glass-sidebar md:flex shrink-0 z-20">
        
        <div className="p-6 shrink-0 border-b border-border/50 bg-background/20">
          <Link href="/" className="flex items-center gap-3 mb-8 group transition-all">
            <Shield className="h-7 w-7 text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(232,0,29,0.8)] transition-all" />
            <h2 className="text-amc-title text-2xl group-hover:text-glow-primary transition-colors">
              Tourney<span className="text-primary">OS</span>
            </h2>
          </Link>
          <TeamSwitcher />
        </div>
        
        <nav className="flex-1 overflow-y-auto space-y-8 px-4 py-8">
          {menuSections.map((section, index) => (
            <div key={index}>
              <p className="px-4 text-technical text-muted-foreground opacity-60 mb-3">
                {section.title}
              </p>
              
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name} 
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-md transition-all font-condensed tracking-wide text-sm",
                        isActive 
                          ? "bg-primary text-white shadow-[0_4px_15px_-5px_hsla(var(--primary),0.5)] border border-primary/50" 
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                      )} /> 
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER: Conexión Semántica */}
        <div className="p-6 border-t border-border/50 bg-background/20 shrink-0">
          <div className="flex flex-col gap-1 p-3 surface-panel-solid">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="status-led-online" />
              Conexión Estable
            </p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-technical text-foreground truncate max-w-[120px]">
                {username || "OPERADOR"}
              </p>
              <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">
                {role || "GUEST"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
    </div>
  )
}