import Link from "next/link"
import { ShieldCheck, Users, Trophy, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">
            Panel <span className="text-primary">Root</span>
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Resumen global de la plataforma TourneyOS.
          </p>
        </div>
      </div>

      {/* MÉTRICAS (Kpis) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Equipos Registrados - Usamos var(--radius) */}
        <div className="p-6 rounded-[var(--radius)] border border-border bg-card/50 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <Users className="h-32 w-32" />
          </div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Equipos Registrados</p>
          <p className="text-4xl font-black text-foreground mt-2">12</p>
        </div>
        
        {/* Jugadores Activos */}
        <div className="p-6 rounded-[var(--radius)] border border-border bg-card/50 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <Target className="h-32 w-32" />
          </div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Jugadores Activos</p>
          <p className="text-4xl font-black text-primary mt-2">48</p>
        </div>

        {/* Torneos en Curso - Ya estaba casi listo, lo pulimos */}
        <div className="p-6 rounded-[var(--radius)] border border-primary/20 bg-primary/5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Trophy className="h-32 w-32 text-primary" />
          </div>
          <p className="text-[10px] font-black text-primary uppercase tracking-widest">
            Torneos en Curso
          </p>
          <p className="text-4xl font-black text-foreground mt-2">3</p>
        </div>
      </div>

      {/* ACCESOS DIRECTOS */}
      <div className="mt-8">
        <h2 className="text-lg font-black uppercase italic mb-4 text-foreground">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <Link href="/admin/teams">
            <div className="p-5 rounded-[var(--radius)] border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-[calc(var(--radius)-4px)] group-hover:bg-primary/20 transition-colors">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-black text-[11px] uppercase tracking-wider text-foreground">Gestionar Equipos</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase italic">Ver lista de organizaciones y sus rosters.</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}