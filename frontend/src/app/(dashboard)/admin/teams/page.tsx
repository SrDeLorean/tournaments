"use client"

import { CoreTable } from "@/components/shared/CoreTable"
import { CoreStatusBadge } from "@/components/shared/CoreTable/CoreStatusBadge"
import { teamService } from "@/features/teams/team.service"
import { TeamForm } from "@/features/teams/components/TeamForm"
import { Trophy, ChevronLeft, ShieldAlert, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminTeamsPage() {
  const router = useRouter()

  // --- CONFIGURACIÓN DE COLUMNAS ---
  const columns = [
    { 
      header: "IDENTIDAD / FRANQUICIA", 
      key: "name", 
      render: (team: any) => (
        <div className="flex items-center gap-4 group">
          <Avatar className="h-10 w-10 border-2 border-primary/20 rounded-none transform -skew-x-12 overflow-hidden bg-background shadow-[4px_4px_0px_0px_rgba(var(--primary),0.1)]">
            <AvatarImage src={team.logoUrl} className="object-cover" />
            <AvatarFallback className="font-black text-primary uppercase skew-x-12">
              {team.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="font-black italic uppercase text-sm leading-none mb-1 group-hover:text-primary transition-colors tracking-tight">
              {team.name}
            </span>
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
              ID: {team.id.substring(0, 8)}...
            </span>
          </div>
        </div>
      )
    },
    { 
      header: "ESTADO", 
      key: "active", 
      render: (team: any) => <CoreStatusBadge active={team.active} /> 
    },
    { 
      header: "EA SPORTS ID", 
      key: "clubIdEa",
      render: (team: any) => (
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-black text-primary uppercase italic tracking-widest bg-primary/5 px-3 py-1 border border-primary/10">
            {team.clubIdEa || "SIN VINCULAR"}
          </span>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 pt-6 px-4">
      
      {/* --- NAVEGACIÓN --- */}
      <Link href="/admin">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary font-black text-[10px] uppercase px-0 mb-2 transition-all hover:translate-x-1">
          <ChevronLeft className="h-4 w-4" />
          volver al panel de control
        </Button>
      </Link>

      {/* --- CABECERA DE IMPACTO --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-primary pb-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-primary/10 border-2 border-primary/20 transform -skew-x-12 shrink-0">
            <Trophy className="h-10 w-10 text-primary skew-x-12" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              ADMINISTRACIÓN DE FRANQUICIAS
            </span>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mt-1">
              DIRECTORIO DE <span className="text-primary">CLUBES</span>
            </h1>
            <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-2 opacity-70">
              GESTIÓN DE IDENTIDAD COLECTIVA Y ESTADO DE COMPETICIÓN
            </p>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="bg-primary/5 p-3 border-l-2 border-primary italic">
             <p className="text-[9px] font-black uppercase tracking-widest text-primary">
               SERVIDOR: <span className="text-foreground">ONLINE</span>
             </p>
          </div>
        </div>
      </div>

      {/* --- EL NÚCLEO OPERATIVO --- */}
      <div className="relative">
        <CoreTable
          title="Gestión de Clubes"
          entityName="Franquicia"
          service={{
            get: (inactive) => teamService.getTeams(inactive),
            delete: (id) => teamService.deleteTeam(id),
            restore: (id) => teamService.restoreTeam(id)
          }}
          columns={columns}
          formComponent={TeamForm}
          primaryActionLabel="REGISTRAR CLUB"
          onViewDetails={(team) => {
            // IMPORTANTE: Enviamos el NAME para la URL, no el ID
            const teamSlug = encodeURIComponent(team.name);
            router.push(`/admin/teams/${teamSlug}`);
          }}
        />
      </div>

      {/* --- SEGURIDAD Y ALERTAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-primary/5 border-l-4 border-primary flex items-center gap-4">
          <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
          <div>
            <p className="text-[10px] text-primary font-black uppercase italic leading-tight tracking-widest">
              PROTOCOLOS DE CLUB ACTIVOS
            </p>
            <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1 leading-relaxed">
              CUALQUIER MODIFICACIÓN EN EL NOMBRE O TAG AFECTARÁ LA INTEGRIDAD DE LAS ESTADÍSTICAS HISTÓRICAS DEL NÚCLEO.
            </p>
          </div>
        </div>

        <div className="p-4 bg-secondary/10 border-l-4 border-secondary flex items-center gap-4 opacity-50">
          <Zap className="h-6 w-6 text-secondary shrink-0" />
          <div className="text-[10px] font-black uppercase italic tracking-widest leading-tight text-foreground">
            SISTEMA OPERATIVO: <span className="text-primary uppercase font-black">ACTIVE SYNC</span>
            <p className="text-[9px] font-bold mt-1 uppercase italic tracking-tighter">
              PRISMA CLIENT v6.19.3 // TOURNEYOS CORE
            </p>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="pt-8 border-t border-border/40 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-muted-foreground/40 italic">
          TOURNEYOS OPERATING SYSTEM // SEBASTIAN ACCESS
        </p>
      </footer>
    </div>
  )
}