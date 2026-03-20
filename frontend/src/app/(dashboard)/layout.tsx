"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useUserStore } from "@/store/useUserStore"
import { TeamSwitcher } from "@/components/shared/TeamSwitcher"
import { DashboardNavbar } from "@/components/shared/DashboardNavbar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { 
  Trophy, 
  Users, 
  LayoutDashboard, 
  ShieldCheck, 
  UserCircle, 
  Settings,
  CalendarDays,
  History,
  LogOut
} from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { role, username, logout } = useUserStore()

  // Definición de navegación base (Para todos)
  const mainNav = [
    { name: "Inicio", href: "/player", icon: LayoutDashboard },
    { name: "Calendario", href: "#", icon: CalendarDays },
  ]

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* --- SIDEBAR IZQUIERDO --- */}
      <aside className="hidden w-64 flex-col border-r bg-card/50 backdrop-blur-md md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 px-2 mb-6">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-black tracking-tighter uppercase italic">
              Tourney<span className="text-primary">OS</span>
            </h2>
          </div>
          <TeamSwitcher />
        </div>
        
        <Separator className="mx-6 w-auto mb-4 opacity-50" />
        
        <nav className="flex-1 space-y-1 px-4">
          <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
            Menú Principal
          </p>
          
          {/* Renderizado de links base */}
          {mainNav.map((item) => (
            <NavLink key={item.name} item={item} active={pathname === item.href} />
          ))}

          {/* SECCIÓN MANAGER: Solo visible para Manager y Admin */}
          {(role === "manager" || role === "admin") && (
            <div className="pt-4">
              <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Gestión E-Sports
              </p>
              <NavLink 
                item={{ name: "Mi Roster", href: "/manager", icon: Users }} 
                active={pathname === "/manager"} 
              />
              <NavLink 
                item={{ name: "Historial", href: "#", icon: History }} 
                active={pathname === "/history"} 
              />
            </div>
          )}

          {/* SECCIÓN ADMIN: Solo para el Admin */}
          {role === "admin" && (
            <div className="pt-4">
              <p className="px-3 text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">
                Sistema
              </p>
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-all italic uppercase",
                  pathname === "/admin" 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                    : "text-orange-500/70 hover:bg-orange-500/10 hover:text-orange-500"
                )}
              >
                <ShieldCheck className="h-4 w-4" />
                Panel Root
              </Link>
            </div>
          )}
        </nav>

        {/* FOOTER DEL SIDEBAR */}
        <div className="p-4 mt-auto border-t bg-secondary/20">
          <div className="mb-4 px-3 py-2 rounded-lg bg-background/50 border border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Sesión</p>
            <p className="text-xs font-black truncate text-primary uppercase italic">{username || "Invitado"}</p>
            <p className="text-[9px] text-muted-foreground capitalize">Rol: {role}</p>
          </div>
          <button 
            onClick={() => {
              // Añadimos una pequeña confirmación para evitar cierres accidentales
              if(confirm("¿Estás seguro de que quieres salir?")) {
                logout();
              }
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all uppercase italic"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* --- ÁREA DE CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/30 dark:bg-transparent">
          {children}
        </main>
      </div>
    </div>
  )
}

// Sub-componente para los links (para no repetir código)
function NavLink({ item, active }: { item: any, active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
        active 
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      <item.icon className={cn(
        "h-4 w-4 transition-colors",
        active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
      )} />
      {item.name}
    </Link>
  )
}