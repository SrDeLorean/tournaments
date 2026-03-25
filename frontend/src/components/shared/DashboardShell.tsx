"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useUserStore } from "@/store/useUserStore"
import { TeamSwitcher } from "@/components/shared/TeamSwitcher"
import { DashboardNavbar } from "@/components/shared/DashboardNavbar"
import { cn } from "@/lib/utils"
import { Trophy } from "lucide-react"

export type MenuSection = {
  title: string;
  items: { name: string; href: string; icon: any; exact?: boolean }[];
};

export function DashboardShell({ children, menuSections }: { children: React.ReactNode; menuSections: MenuSection[]; }) {
  const pathname = usePathname()
  const { role, username } = useUserStore()

  return (
    <div className="flex min-h-screen bg-background text-foreground animate-in fade-in duration-300">
      
      {/* SIDEBAR */}
      <aside className="hidden w-64 flex-col border-r border-border/50 bg-card/50 backdrop-blur-md md:flex overflow-y-auto">
        <div className="p-6 shrink-0 border-b border-border/50">
          <div className="flex items-center gap-2 px-2 mb-6">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-black tracking-tighter uppercase italic text-foreground">
              Tourney<span className="text-primary">OS</span>
            </h2>
          </div>
          <TeamSwitcher />
        </div>
        
        <nav className="flex-1 space-y-6 px-4 py-8">
          {menuSections.map((section, index) => (
            <div key={index}>
              <p className="px-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3 opacity-60">
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
                        "flex items-center gap-3 px-3 py-2 text-[11px] font-black transition-all italic uppercase tracking-wider group rounded-[var(--radius)]",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                      )} /> 
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER DEL SIDEBAR */}
        <div className="p-4 border-t border-border/50 bg-secondary/5 shrink-0">
          <div className="mb-1 px-3 py-2.5 rounded-[var(--radius)] bg-background/50 border border-border/50 shadow-sm">
            <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Sesión Activa</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs font-black truncate text-primary uppercase italic">
                {username || "Usuario"}
              </p>
              <span className="text-[8px] bg-secondary text-foreground px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter border border-border">
                {role || "Rol"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardNavbar />
        {/* Eliminamos el bg-slate-50 fijo para que el fondo sea siempre el de globals.css */}
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}