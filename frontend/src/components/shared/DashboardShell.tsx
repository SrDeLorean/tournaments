"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useUserStore } from "@/store/useUserStore"
import { TeamSwitcher } from "@/components/shared/TeamSwitcher"
import { DashboardNavbar } from "@/components/shared/DashboardNavbar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Trophy } from "lucide-react"

export type MenuSection = {
  title: string;
  items: { name: string; href: string; icon: any; exact?: boolean }[];
};

export function DashboardShell({ children, menuSections }: { children: React.ReactNode; menuSections: MenuSection[]; }) {
  const pathname = usePathname()
  const { role, username } = useUserStore() // Eliminamos logout de aquí

  return (
    <div className="flex min-h-screen bg-background text-foreground animate-in fade-in duration-300">
      
      {/* SIDEBAR */}
      <aside className="hidden w-64 flex-col border-r bg-card/50 backdrop-blur-md md:flex overflow-y-auto">
        <div className="p-6 shrink-0 border-b border-border/50">
          <div className="flex items-center gap-2 px-2 mb-6">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-black tracking-tighter uppercase italic">Tourney<span className="text-primary">OS</span></h2>
          </div>
          <TeamSwitcher />
        </div>
        
        <nav className="flex-1 space-y-6 px-4 py-8">
          {menuSections.map((section, index) => (
            <div key={index}>
              <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 opacity-70">{section.title}</p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                  const isOrange = pathname.startsWith("/admin"); 

                  return (
                    <Link
                      key={item.name} href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-all italic uppercase tracking-wider group",
                        isActive 
                          ? (isOrange ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-primary text-primary-foreground shadow-md shadow-primary/20")
                          : (isOrange ? "text-orange-500/70 hover:bg-orange-500/10 hover:text-orange-500" : "text-muted-foreground hover:bg-secondary hover:text-foreground")
                      )}
                    >
                      <item.icon className="h-4 w-4" /> {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER DEL SIDEBAR: SOLO INFO DE SESIÓN */}
        <div className="p-4 border-t bg-secondary/10 shrink-0">
          <div className="mb-1 px-3 py-2.5 rounded-xl bg-background border border-border/50 shadow-inner">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Sesión</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm font-black truncate text-primary uppercase italic">{username || "Usuario"}</p>
              <span className="text-[10px] bg-secondary/80 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter border border-border">{role || "Rol"}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/30 dark:bg-transparent">
          {children}
        </main>
      </div>
    </div>
  )
}