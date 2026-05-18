import { 
  ChevronLeft, ShieldCheck, Settings2, Trophy, 
  Fingerprint, Crown, Activity, Copy, Database, 
  Users, BarChart3, Calendar, Target, Zap, MessageSquare 
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TeamManagement } from "@/features/teams/components/TeamManagement"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default async function AdminTeamDetailPage({ params }: { params: Promise<{ teamName: string }> }) {
  const { teamName } = await params
  const decodedTeamName = decodeURIComponent(teamName)

  // Datos simulados extraídos del Modelo Prisma (Team + Includes)
  const teamData = {
    id: "8a701a12-96cc-4a3e-ac60-bb709e731881",
    name: decodedTeamName,
    active: true,
    clubIdEa: "2548963",
    owner: { gamertag: "SrDeLorean", email: "manager@tourneyos.cl" },
    // Métricas calculadas desde TeamStats y Match
    performance: { winRate: 72, goals: 124, matches: 45 },
    // Datos de SeasonTeam
    activeSeasons: [
      { name: "Copa Chile 2026", status: "IN_PROGRESS", players: 18 },
      { name: "Liga Pro Division A", status: "REGISTRATION", players: 22 }
    ],
    // Datos de TransferRequest
    marketStatus: { pending: 1, lastMovement: "2h ago" }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 pt-6 px-4">
      
      {/* --- NAVEGACIÓN Y ESTADO --- */}
      <div className="flex justify-between items-center">
        <Link href="/admin/teams">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary font-black text-[10px] uppercase px-0 transition-all hover:-translate-x-1">
            <ChevronLeft className="h-4 w-4" />
            Volver al Directorio
          </Button>
        </Link>
        <div className="flex gap-2">
           <Badge variant="outline" className="rounded-none border-primary/30 text-primary font-black italic text-[9px] px-3">
             PRISMA_DATABASE_SYNC
           </Badge>
           <Badge variant={teamData.active ? "default" : "destructive"} className="rounded-none font-black italic px-4 uppercase">
             {teamData.active ? "NÚCLEO OPERATIVO" : "NÚCLEO ARCHIVADO"}
           </Badge>
        </div>
      </div>

      {/* --- CABECERA DE IDENTIDAD (SIN UUID) --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-4 border-primary pb-8">
        <div className="flex items-center gap-6">
          <div className="p-1 bg-primary transform -skew-x-12 shrink-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 rounded-none border-4 border-background transform skew-x-12 overflow-hidden bg-secondary/50">
              <AvatarFallback className="text-5xl font-black italic uppercase">
                {teamData.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary flex items-center gap-2 mb-2">
              <Settings2 className="h-3 w-3" /> CONFIGURACIÓN DE FRANQUICIA
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mt-1">
              {teamData.name}
            </h1>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 border border-border/40">
                <Crown className="h-3 w-3 text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">DUEÑO: {teamData.owner.gamertag}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 border border-primary/20">
                <Trophy className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">EA_ID: {teamData.clubIdEa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* WIDGETS DE RENDIMIENTO RÁPIDO */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
           <div className="p-4 bg-black/5 border-2 border-primary/10 flex flex-col justify-center">
              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-2">Global Win Rate</span>
              <span className="text-3xl font-black italic text-primary leading-none">{teamData.performance.winRate}%</span>
           </div>
           <div className="p-4 bg-black/5 border-2 border-primary/10 flex flex-col justify-center">
              <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-2">Goles Históricos</span>
              <span className="text-3xl font-black italic leading-none">{teamData.performance.goals}</span>
           </div>
        </div>
      </div>

      {/* --- GRID DE INFORMACIÓN 360° --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* COLUMNA IZQUIERDA: COMPETENCIAS Y MERCADO */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border-2 border-border/40 p-5 relative group overflow-hidden">
             <Calendar className="absolute -right-4 -top-4 h-20 w-20 text-primary/5 group-hover:rotate-12 transition-transform" />
             <h3 className="text-[11px] font-black uppercase italic tracking-[0.2em] mb-4 flex items-center gap-2">
               <Zap className="h-4 w-4 text-primary" /> Ligas Activas
             </h3>
             <div className="space-y-4">
               {teamData.activeSeasons.map((s) => (
                 <div key={s.name} className="border-l-4 border-primary bg-primary/5 p-3">
                   <p className="text-[11px] font-black uppercase italic leading-none">{s.name}</p>
                   <div className="flex justify-between items-center mt-2">
                     <span className="text-[9px] font-bold opacity-50">{s.status}</span>
                     <span className="text-[9px] font-black text-primary">{s.players} JUG.</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-secondary/10 border-2 border-secondary/20 p-5">
             <h3 className="text-[11px] font-black uppercase italic tracking-[0.2em] mb-4 flex items-center gap-2">
               <MessageSquare className="h-4 w-4" /> Mercado (Transfers)
             </h3>
             <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-bold uppercase">Solicitudes Pendientes</span>
               <Badge className="bg-primary rounded-none">{teamData.marketStatus.pending}</Badge>
             </div>
             <Progress value={65} className="h-1 rounded-none bg-primary/20" />
             <p className="text-[8px] font-bold uppercase mt-3 opacity-40 italic">Último movimiento: {teamData.marketStatus.lastMovement}</p>
          </div>
        </div>

        {/* COLUMNA CENTRAL: GESTIÓN OPERATIVA */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card/40 border-2 border-border/20 backdrop-blur-sm">
            <TeamManagement 
              teamName={teamData.name} 
              isGlobalAdmin={true} 
            />
          </div>

          {/* INDICADORES TÉCNICOS ADICIONALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 border-2 border-border/40 flex items-center gap-4 bg-card group hover:border-primary transition-colors">
                <Target className="h-8 w-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div>
                   <p className="text-[10px] font-black uppercase italic tracking-widest text-primary leading-none">Eficiencia de Partidos</p>
                   <p className="text-[9px] font-bold text-muted-foreground uppercase leading-tight mt-2">
                     92% de los encuentros programados han sido procesados sin incidencias técnicas.
                   </p>
                </div>
             </div>
             <div className="p-4 border-2 border-border/40 flex items-center gap-4 bg-card group hover:border-primary transition-colors">
                <BarChart3 className="h-8 w-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div>
                   <p className="text-[10px] font-black uppercase italic tracking-widest text-primary leading-none">Rating del Plantel (Elo)</p>
                   <p className="text-[9px] font-bold text-muted-foreground uppercase leading-tight mt-2">
                     Basado en el promedio de PlayerStats de todos los integrantes inscritos en el roster.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- PANEL DE AUTORIZACIÓN (ID UUID) --- */}
      <div className="p-6 bg-primary/5 border-l-4 border-primary relative overflow-hidden group">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex gap-5 items-start">
               <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
               <div className="space-y-1">
                  <p className="text-[11px] text-primary font-black uppercase italic tracking-[0.3em]">
                    AUTORIZACIÓN DE ACCESO GLOBAL NIVEL 1
                  </p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase max-w-xl leading-relaxed">
                    Operando sobre la instancia maestra de <span className="text-foreground">{teamData.name}</span>. 
                    Cualquier modificación en el ID o relaciones de propietario afectará la integridad histórica.
                  </p>
               </div>
            </div>

            <div className="bg-black/10 p-4 border border-primary/20 flex flex-col gap-2 min-w-[300px]">
               <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest flex items-center gap-2">
                 <Database className="h-2 w-2" /> CORE_DATABASE_ID (UUID)
               </span>
               <div className="flex items-center justify-between gap-4">
                  <code className="text-[11px] font-mono font-black text-primary tracking-tighter">
                    {teamData.id}
                  </code>
                  <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary hover:text-white transition-colors">
                    <Copy className="h-3 w-3" />
                  </Button>
               </div>
            </div>
         </div>
         <Fingerprint className="absolute -right-6 -bottom-6 h-32 w-32 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity" />
      </div>

      <footer className="text-center pt-8 border-t border-border/40 opacity-30 italic">
        <p className="text-[10px] font-black uppercase tracking-[1em]">
          TOURNEYOS // SEBASTIAN ACCESS // 2026
        </p>
      </footer>
    </div>
  )
}