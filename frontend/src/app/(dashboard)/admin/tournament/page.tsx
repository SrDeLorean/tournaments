"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // 👈 Importamos el enrutador
import { Loader2, Plus, Trophy, Gamepad2, Users, Crosshair } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/api"

interface Tournament {
  id: string
  name: string
  game: string
  status: string
  maxTeams: number
  creator: { gamertag: string }
}

export default function TournamentPage() {
  const router = useRouter() // 👈 Inicializamos el enrutador
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newTournamentName, setNewTournamentName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      const response = await api.get('/tournament')
      setTournaments(response.data)
    } catch (error) {
      console.error("Error al cargar torneos", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTournamentName.trim()) return

    setIsCreating(true)
    try {
      await api.post('/tournament', {
        name: newTournamentName,
        game: "EA Sports FC 26",
        maxTeams: 16
      })
      
      setNewTournamentName("")
      fetchTournaments()
    } catch (error) {
      console.error("Error al crear el torneo", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. CABECERA (Estilo AdminDashboard) */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">
            Gestión de <span className="text-primary">Torneos</span>
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Administra, despliega y monitorea las competiciones oficiales de TourneyOS.
          </p>
        </div>
      </div>

      {/* 2. PANEL DE CREACIÓN (Armadura Táctica) */}
      <div className="p-6 rounded-[var(--radius)] border border-border bg-card/50 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <h2 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
          <Crosshair className="h-3 w-3" /> Desplegar Nueva Competición
        </h2>

        <form onSubmit={handleCreateTournament} className="flex flex-col md:flex-row gap-4 items-end relative z-10">
          <div className="flex-1 w-full grid gap-2">
            <Label htmlFor="tournamentName" className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Nombre de la Operación (Torneo)
            </Label>
            <Input 
              id="tournamentName"
              placeholder="Ej: Masters de Invierno 2026" 
              value={newTournamentName}
              onChange={(e) => setNewTournamentName(e.target.value)}
              className="bg-secondary/50 border-none h-12 focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isCreating || !newTournamentName.trim()} 
            className="btn-action-primary h-12 w-full md:w-auto px-8"
          >
            {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            INICIAR TORNEO
          </Button>
        </form>
      </div>

      {/* 3. LISTADO DE TORNEOS */}
      <div>
        <h2 className="text-lg font-black uppercase italic mb-4 text-foreground">Ligas Activas</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tournaments.length === 0 ? (
          <div className="p-12 rounded-[var(--radius)] border border-dashed border-border bg-card/20 text-center relative overflow-hidden">
            <div className="ambient-glow-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Trophy className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-technical text-muted-foreground text-lg">SIN OPERACIONES ACTIVAS</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div 
                key={tournament.id} 
                className="p-5 rounded-[var(--radius)] border border-border bg-card/80 hover:border-primary/50 transition-all group flex flex-col relative overflow-hidden glass-card"
              >
                {/* Fondo Decorativo */}
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Trophy className="h-32 w-32 text-primary" />
                </div>

                {/* Badge de Estado (Tech style) */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 px-2 py-1 bg-primary/10 border border-primary/20 rounded-[var(--radius-sm)]">
                    <span className="status-led-online" />
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                      {tournament.status}
                    </span>
                  </div>
                </div>

                {/* Cabecera de la Tarjeta */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-[calc(var(--radius)-4px)] group-hover:bg-primary/20 transition-colors">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div className="pr-12"> {/* Padding right para que no pise el badge */}
                    <h3 className="font-black text-lg uppercase tracking-tight text-foreground line-clamp-1">
                      {tournament.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase italic flex items-center gap-1 mt-1">
                      <Gamepad2 className="h-3 w-3" /> {tournament.game}
                    </p>
                  </div>
                </div>

                {/* Métricas del Torneo */}
                <div className="grid grid-cols-2 gap-4 mb-6 relative z-10 p-3 surface-panel-solid">
                  <div>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                      Equipos / Cupos
                    </p>
                    <p className="text-xl font-black text-foreground flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" /> 
                      - <span className="text-muted-foreground text-sm">/ {tournament.maxTeams}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                      Operador (Root)
                    </p>
                    <p className="text-base font-black text-foreground line-clamp-1 mt-1">
                      {tournament.creator?.gamertag || 'ADMIN'}
                    </p>
                  </div>
                </div>

                {/* 🚀 BOTÓN DE ACCIÓN TÁCTICO REDIRIGIDO */}
                <Button 
                  onClick={() => router.push(`/admin/tournament/${tournament.id}`)}
                  className="btn-tactical w-full mt-auto relative z-10"
                >
                  Panel de Control
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}