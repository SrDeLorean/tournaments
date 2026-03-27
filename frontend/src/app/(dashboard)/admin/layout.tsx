"use client" // <--- ¡AÑADE ESTA LÍNEA AQUÍ!

import { DashboardShell, MenuSection } from "@/components/layout/DashboardShell"
import { 
  ShieldAlert, UserCog, ShieldCheck, ClipboardList, 
  CalendarRange, Trophy, Medal, CalendarDays, ArrowRightLeft 
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  
  const adminMenus: MenuSection[] = [
    {
      title: "Administración Global",
      items: [
        { name: "Panel Root", href: "/admin", icon: ShieldAlert, exact: true },
        { name: "Usuarios", href: "/admin/users", icon: UserCog },
        { name: "Equipos", href: "/admin/teams", icon: ShieldCheck },
        { name: "Plantillas", href: "/admin/rosters", icon: ClipboardList },
        { name: "Temporadas", href: "/admin/seasons", icon: CalendarRange },
        { name: "Competencias", href: "/admin/competitions", icon: Trophy },
        { name: "Temp. Competencias", href: "/admin/season-competitions", icon: Medal },
        { name: "Calendarios", href: "/admin/calendars", icon: CalendarDays },
        { name: "Traspasos", href: "/admin/transfers", icon: ArrowRightLeft },
      ]
    }
  ]

  return (
    <DashboardShell menuSections={adminMenus}>
      {children}
    </DashboardShell>
  )
}