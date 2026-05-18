"use client"

import { useState, useEffect } from "react"
import { userService } from "@/features/users/user.service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Trophy, Activity, History, Shield, 
  Gamepad2, Loader2, DatabaseZap, Zap 
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        // 1. Llamamos a la API real
        const rawData = await userService.getUserById(userId)
        
        // 2. Procesamos las métricas
        // Sumamos los goles de todo su historial de PlayerStats
        const totalGoals = rawData.playerStats?.reduce((acc: number, stat: any) => acc + stat.goals, 0) || 0;
        const totalMatches = rawData.playerStats?.length || 0;
        
        // Calculamos Win Rate (Requeriría lógica adicional si la victoria está en el Match, 
        // por ahora dejamos un cálculo de ejemplo o 0)
        const avgWinRate = totalMatches > 0 ? 50 : 0; // Ajusta esto según tu lógica de victorias

        // Extraemos su equipo actual del primer Roster activo que tenga
        const currentTeamName = rawData.registrations?.[0]?.seasonTeam?.team?.name || null;

        // 3. Formateamos la data para la UI
        const formattedUser = {
          id: rawData.id,
          gamertag: rawData.gamertag,
          email: rawData.email,
          role: rawData.role,
          active: rawData.active,
          gamertagEa: rawData.gamertagEa,
          avatarUrl: rawData.avatarUrl, // Si tienes este campo en DB
          joinedAt: rawData.createdAt,
          stats: { matches: totalMatches, goals: totalGoals, winRate: avgWinRate },
          currentTeam: currentTeamName
        }

        setUser(formattedUser)
      } catch (error) {
        console.error("Error al cargar perfil", error)
        setUser(null) // Para que dispare la pantalla de "OPERADOR NO ENCONTRADO"
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-30 italic">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Descargando datos del agente...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-destructive bg-destructive/5 space-y-4">
        <DatabaseZap className="h-10 w-10 text-destructive animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-destructive">OPERADOR NO ENCONTRADO EN EL NÚCLEO</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- CABECERA DE PERFIL --- */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-end border-b-4 border-primary pb-8">
        <div className="p-2 bg-primary/20 transform -skew-x-12 shrink-0 border-2 border-primary/30">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 rounded-none border-4 border-background transform skew-x-12 overflow-hidden bg-secondary">
            <AvatarImage src={user.avatarUrl} className="object-cover" />
            <AvatarFallback className="text-6xl font-black italic uppercase">
              {user.gamertag.substring(0,2)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className={cn(
              "rounded-none font-black italic px-3 uppercase text-[10px] tracking-widest border-2",
              user.active ? "text-primary border-primary bg-primary/5" : "text-destructive border-destructive bg-destructive/5"
            )}>
              {user.active ? "AGENTE ACTIVO" : "AGENTE INACTIVO"}
            </Badge>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              ROLE: {user.role}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            {user.gamertag}
          </h1>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 border border-border/50">
              <Gamepad2 className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-widest text-primary italic">
                EA ID: {user.gamertagEa || "NO REGISTRADO"}
              </span>
            </div>
            {user.currentTeam && (
              <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 border border-secondary/20">
                <Shield className="h-4 w-4 text-secondary" />
                <span className="text-[11px] font-black uppercase tracking-widest italic">
                  ROSTER: {user.currentTeam}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MÉTRICAS Y ESTADÍSTICAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-none border-2 border-border/40 bg-card/20 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <Activity className="h-8 w-8 text-primary opacity-50 mb-2" />
            <span className="text-4xl font-black italic leading-none">{user.stats?.matches || 0}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Partidos Oficiales</span>
          </CardContent>
        </Card>
        
        <Card className="rounded-none border-2 border-border/40 bg-card/20 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <Trophy className="h-8 w-8 text-primary opacity-50 mb-2" />
            <span className="text-4xl font-black italic leading-none text-primary">{user.stats?.winRate || 0}%</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Win Rate Global</span>
          </CardContent>
        </Card>

        <Card className="rounded-none border-2 border-border/40 bg-card/20 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
            <Zap className="h-8 w-8 text-secondary opacity-50 mb-2" />
            <span className="text-4xl font-black italic leading-none">{user.stats?.goals || 0}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Goles Anotados</span>
          </CardContent>
        </Card>
      </div>

      {/* --- HISTORIAL DE CONTRATOS (LEDGER) --- */}
      <div className="pt-6">
        <h3 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-2 mb-6">
          <History className="h-5 w-5 text-primary" />
          Historial de Operaciones (Ledger)
        </h3>
        <div className="border border-border/40 p-8 text-center bg-black/20">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic">
            MÓDULO DE HISTORIAL EN DESARROLLO...
          </p>
        </div>
      </div>

    </div>
  )
}