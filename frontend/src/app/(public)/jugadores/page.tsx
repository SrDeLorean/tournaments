"use client"

import { useState } from "react"
import { Search, Filter, Target, Activity, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock de Jugadores para la vista pública (Estilo FUT)
const PUBLIC_PLAYERS = [
  { id: "p1", username: "Sebastian", team: "Successors", pos: "MCO", ovr: 92, goals: 12, assists: 15, mvp: 8, form: "🔥" },
  { id: "p2", username: "ToxicSniper", team: "Elite FC", pos: "DC", ovr: 89, goals: 18, assists: 2, mvp: 5, form: "✨" },
  { id: "p3", username: "IronWall", team: "Reapers Esports", pos: "DFC", ovr: 88, goals: 2, assists: 1, mvp: 4, form: "🛡️" },
  { id: "p4", username: "Flash99", team: "Titans Gaming", pos: "EI", ovr: 86, goals: 7, assists: 11, mvp: 3, form: "⚡" },
  { id: "p5", username: "ElMago", team: "Successors", pos: "MC", ovr: 90, goals: 5, assists: 18, mvp: 6, form: "🧠" },
  { id: "p6", username: "Shadow", team: "Venom Squad", pos: "MCD", ovr: 84, goals: 1, assists: 4, mvp: 1, form: "💪" },
  { id: "p7", username: "Pantera", team: "Apex Club", pos: "POR", ovr: 87, goals: 0, assists: 0, mvp: 7, form: "🧤" },
  { id: "p8", username: "CapiTano", team: "Nova Esports", pos: "DFC", ovr: 83, goals: 4, assists: 0, mvp: 2, form: "🛡️" },
]

export default function JugadoresPublicPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [posFilter, setPosFilter] = useState<"ALL" | "DEL" | "MED" | "DEF" | "POR">("ALL")

  // Agrupación simple de posiciones para el filtro
  const getPosCategory = (pos: string) => {
    if (["DC", "EI", "ED", "SD"].includes(pos)) return "DEL"
    if (["MCO", "MC", "MCD", "MI", "MD"].includes(pos)) return "MED"
    if (["DFC", "LI", "LD", "CAD", "CAI"].includes(pos)) return "DEF"
    if (pos === "POR") return "POR"
    return "ALL"
  }

  // Filtrado combinado (Búsqueda + Posición)
  const filteredPlayers = PUBLIC_PLAYERS.filter(player => {
    const matchesSearch = 
      player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPos = posFilter === "ALL" || getPosCategory(player.pos) === posFilter

    return matchesSearch && matchesPos
  }).sort((a, b) => b.ovr - a.ovr) // Ordenamos por valoración general de mayor a menor

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-10">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1 text-primary border-primary/30 bg-primary/10">
          Base de Datos
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Directorio de <span className="text-primary">Talentos</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          Encuentra a las estrellas de la liga, analiza sus estadísticas de temporada y descubre quiénes dominan el meta actual.
        </p>
      </div>

      {/* BARRA DE HERRAMIENTAS (Buscador y Filtros) */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 bg-card/50 p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar por jugador o equipo..." 
            className="pl-12 h-12 rounded-xl bg-background border-border/50 italic placeholder:not-italic font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          {["ALL", "DEL", "MED", "DEF", "POR"].map((pos) => (
            <Button
              key={pos}
              variant={posFilter === pos ? "default" : "outline"}
              onClick={() => setPosFilter(pos as any)}
              className={cn(
                "h-12 rounded-xl font-black uppercase tracking-widest text-xs transition-all",
                posFilter === pos 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "bg-background text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {pos === "ALL" ? "TODOS" : pos}
            </Button>
          ))}
        </div>
      </div>

      {/* GRID DE CARTAS DE JUGADOR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredPlayers.length === 0 ? (
          <div className="col-span-full text-center py-20 text-muted-foreground italic font-medium">
            No se encontraron jugadores con esos criterios.
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <Card 
              key={player.id} 
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Brillo de fondo dinámico según la valoración (Oro, Plata, Bronce) */}
              <div className={cn(
                "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors",
                player.ovr >= 90 ? "bg-yellow-500" : player.ovr >= 85 ? "bg-primary" : "bg-zinc-500"
              )} />

              <CardContent className="p-6 relative z-10 flex flex-col h-full">
                
                {/* CABECERA DE LA CARTA: OVR y Posición */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className={cn(
                      "text-3xl font-black italic leading-none drop-shadow-md",
                      player.ovr >= 90 ? "text-yellow-500" : player.ovr >= 85 ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {player.ovr}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">
                      {player.pos}
                    </span>
                  </div>
                  
                  {/* Etiqueta de Forma/Estilo */}
                  <div className="text-2xl drop-shadow-sm" title="Estado de Forma">
                    {player.form}
                  </div>
                </div>

                {/* AVATAR Y NOMBRE */}
                <div className="flex flex-col items-center justify-center text-center space-y-3 mb-6">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.username}&backgroundColor=transparent`} />
                    <AvatarFallback className="text-2xl font-black bg-secondary">{player.username.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h2 className="text-xl font-black italic uppercase tracking-tighter text-foreground line-clamp-1">
                      {player.username}
                    </h2>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1 line-clamp-1">
                      {player.team}
                    </p>
                  </div>
                </div>

                {/* ESTADÍSTICAS */}
                <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-border/50">
                  <div className="flex flex-col items-center justify-center bg-secondary/30 rounded-lg py-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Goles</span>
                    <span className="text-lg font-black italic text-foreground">{player.goals}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-secondary/30 rounded-lg py-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Asist.</span>
                    <span className="text-lg font-black italic text-foreground">{player.assists}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-secondary/30 rounded-lg py-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500 mb-1">MVP</span>
                    <span className="text-lg font-black italic text-foreground">{player.mvp}</span>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  )
}