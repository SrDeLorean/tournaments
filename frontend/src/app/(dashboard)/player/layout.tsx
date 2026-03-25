"use client"

import { DashboardShell, MenuSection } from "@/components/shared/DashboardShell"
import { 
  LayoutDashboard, 
  CalendarDays, 
  TrendingUp, 
  ShieldCheck,
  Gamepad2
} from "lucide-react"

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  
  // Definimos EXACTAMENTE lo que ve el Jugador
  const playerMenus: MenuSection[] = [
    {
      title: "Mi Perfil Competitivo",
      items: [
        { name: "Inicio", href: "/player", icon: LayoutDashboard, exact: true },
        { name: "Mis Estadísticas", href: "/player/stats", icon: TrendingUp },
        { name: "Próximos Partidos", href: "/player/calendar", icon: CalendarDays },
      ]
    },
    {
      title: "Mi Organización",
      items: [
        { name: "Club y Roster", href: "/player/team", icon: ShieldCheck },
        { name: "Torneos Activos", href: "/player/tournaments", icon: Gamepad2 },
      ]
    }
  ]

  return (
    <DashboardShell menuSections={playerMenus}>
      {children}
    </DashboardShell>
  )
}