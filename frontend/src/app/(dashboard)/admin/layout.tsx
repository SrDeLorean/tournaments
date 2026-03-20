import { TeamSwitcher } from "@/components/shared/TeamSwitcher"
import { Separator } from "@/components/ui/separator"
import { Trophy, Users, Calendar, Settings, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-col border-r bg-card/50 md:flex">
        <div className="p-4">
          <h2 className="text-xl font-black tracking-tight mb-6 text-primary px-2">
            E-Sports App
          </h2>
          <TeamSwitcher />
        </div>
        
        <Separator className="mb-4" />
        
        {/* Navegación */}
        <nav className="flex-1 space-y-1 p-3">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary font-medium transition-all">
            <LayoutDashboard className="h-4 w-4" />
            Resumen
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground font-medium hover:bg-secondary hover:text-foreground transition-all">
            <Calendar className="h-4 w-4" />
            Partidos
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground font-medium hover:bg-secondary hover:text-foreground transition-all">
            <Trophy className="h-4 w-4" />
            Torneos
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground font-medium hover:bg-secondary hover:text-foreground transition-all">
            <Users className="h-4 w-4" />
            Roster
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground font-medium hover:bg-secondary hover:text-foreground transition-all">
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
        </div>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}