"use client"

import { DashboardShell, MenuSection } from "@/components/layout/DashboardShell"
import { 
  LayoutDashboard, 
  Users, 
  History, 
  CalendarDays,
  Target
} from "lucide-react"

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  
  // Definimos EXACTAMENTE lo que ve el Manager
  const managerMenus: MenuSection[] = [
    {
      title: "Panel de Control",
      items: [
        { name: "Resumen", href: "/manager/dashboard", icon: LayoutDashboard },
        { name: "Mi Calendario", href: "/manager/calendar", icon: CalendarDays },
      ]
    },
    {
      title: "Gestión Deportiva",
      items: [
        { name: "Mi Roster", href: "/manager", icon: Users, exact: true },
        { name: "Estrategias", href: "/manager/tactics", icon: Target },
        { name: "Historial de Partidos", href: "/manager/history", icon: History },
      ]
    }
  ]

  return (
    <DashboardShell menuSections={managerMenus}>
      {children}
    </DashboardShell>
  )
}