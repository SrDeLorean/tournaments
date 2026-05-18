"use client"

import { CoreTable } from "@/components/shared/CoreTable"
import { CoreStatusBadge } from "@/components/shared/CoreTable/CoreStatusBadge"
import { userService } from "@/features/users/user.service"
import { UserForm } from "@/features/users/components/UserForm"
import { Users, ChevronLeft, ShieldCheck, Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ManagerUsersPage() {
  const router = useRouter()

  // --- CONFIGURACIÓN DE COLUMNAS PARA EL ROSTER ---
  const columns = [
    { 
      header: "IDENTIDAD / ROSTER", 
      key: "gamertag", 
      render: (user: any) => (
        <div className="flex items-center gap-4 group">
          <Avatar className="h-10 w-10 border-2 border-primary/20 rounded-none transform -skew-x-12 overflow-hidden bg-background">
            <AvatarFallback className="font-black text-primary uppercase skew-x-12">
              {user.gamertag[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="font-black italic uppercase text-sm leading-none mb-1 group-hover:text-primary transition-colors">
              {user.gamertag}
            </span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
              {user.role} // {user.email}
            </span>
          </div>
        </div>
      )
    },
    { 
      header: "ESTADO", 
      key: "active", 
      render: (user: any) => <CoreStatusBadge active={user.active} /> 
    },
    { 
      header: "EA SPORTS ID", 
      key: "gamertagEa",
      render: (user: any) => (
        <span className="text-[11px] font-black text-primary uppercase italic tracking-widest bg-primary/5 px-3 py-1 border border-primary/10">
          {user.gamertagEa || "SIN VINCULAR"}
        </span>
      )
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 pt-6 px-4">
      
      {/* --- NAVEGACIÓN --- */}
      <Link href="/manager">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary font-black text-[10px] uppercase px-0 mb-2 transition-all hover:translate-x-1">
          <ChevronLeft className="h-4 w-4" />
          volver al panel de gestión
        </Button>
      </Link>

      {/* --- CABECERA DE IMPACTO --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-primary pb-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-primary/10 border-2 border-primary/20 transform -skew-x-12">
            <Users className="h-10 w-10 text-primary skew-x-12" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              CONTROL DE PERSONAL Y ROSTER
            </span>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mt-1">
              GESTIÓN DE <span className="text-primary">INTEGRANTES</span>
            </h1>
            <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-2 opacity-70 italic">
              MONITOREO DE ACTIVIDAD, CUENTAS EA Y DISPONIBILIDAD DE JUGADORES
            </p>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="bg-primary/5 p-3 border-l-2 border-primary italic">
             <p className="text-[9px] font-black uppercase tracking-widest text-primary">
               ESTADO DEL ROSTER: <span className="text-foreground">ACTUALIZADO</span>
             </p>
          </div>
        </div>
      </div>

      {/* --- EL NÚCLEO (CORE TABLE INTEGRADO) --- */}
      <div className="relative">
        <CoreTable
          title="Gestión de Roster"
          entityName="Integrante"
          service={userService}
          columns={columns}
          formComponent={UserForm}
          primaryActionLabel="AÑADIR JUGADOR"
          onViewDetails={(user) => router.push(`/manager/users/${user.id}`)}
        />
      </div>

      {/* --- BLOQUES DE INFORMACIÓN --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-primary/5 border-l-4 border-primary flex items-center gap-4 shadow-sm">
          <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
          <div>
            <p className="text-[10px] text-primary font-black uppercase italic leading-tight tracking-widest">
              CONTROL DE INTEGRIDAD
            </p>
            <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1 leading-tight">
              COMO MANAGER, ERES RESPONSABLE DE MANTENER LAS CUENTAS EA ACTUALIZADAS PARA LOS TORNEOS ACTIVOS.
            </p>
          </div>
        </div>

        <div className="p-4 bg-secondary/10 border-l-4 border-secondary flex items-center gap-4">
          <Zap className="h-6 w-6 text-secondary shrink-0" />
          <div className="text-[10px] font-black uppercase italic tracking-widest leading-tight">
            ESTADO DE SINCRONIZACIÓN: <span className="text-primary underline underline-offset-4 font-black">EN LÍNEA</span>
            <p className="text-[9px] font-bold mt-2 uppercase opacity-60">
              CONEXIÓN DIRECTA CON EL NÚCLEO TOURNEYOS // SEBASTIAN ACCESS
            </p>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="pt-8 border-t border-border/40 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-muted-foreground/30 italic">
          TOURNEYOS MANAGER INTERFACE // CORE ENGINE v2
        </p>
      </footer>
    </div>
  )
}