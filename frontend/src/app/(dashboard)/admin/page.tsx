// src/app/(dashboard)/admin/page.tsx
import Link from "next/link"
import { ShieldCheck, Users, Trophy, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-orange-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Panel <span className="text-orange-500">Root</span>
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Resumen global de la plataforma TourneyOS.
          </p>
        </div>
      </div>

      {/* MÉTRICAS (Kpis) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card/50 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <Users className="h-32 w-32" />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Equipos Registrados</p>
          <p className="text-4xl font-black text-foreground mt-2">12</p>
        </div>
        
        <div className="p-6 rounded-2xl border border-border bg-card/50 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5">
            <Target className="h-32 w-32" />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Jugadores Activos</p>
          <p className="text-4xl font-black text-primary mt-2">48</p>
        </div>

        <div className="p-6 rounded-2xl border border-orange-500/30 bg-orange-500/5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Trophy className="h-32 w-32 text-orange-500" />
          </div>
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Torneos en Curso</p>
          <p className="text-4xl font-black text-orange-500 mt-2">3</p>
        </div>
      </div>

      {/* ACCESOS DIRECTOS */}
      <div className="mt-8">
        <h2 className="text-lg font-black uppercase italic mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/teams">
            <div className="p-5 rounded-xl border border-border bg-card hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                  <ShieldCheck className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase">Gestionar Equipos</p>
                  <p className="text-xs text-muted-foreground">Ver lista de organizaciones y sus rosters.</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-orange-500 transition-colors" />
            </div>
          </Link>
          {/* Aquí podrías poner otro acceso a Torneos en el futuro */}
        </div>
      </div>
    </div>
  )
}