"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock de Jugadores 
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

  const getPosCategory = (pos: string) => {
    if (["DC", "EI", "ED", "SD"].includes(pos)) return "DEL"
    if (["MCO", "MC", "MCD", "MI", "MD"].includes(pos)) return "MED"
    if (["DFC", "LI", "LD", "CAD", "CAI"].includes(pos)) return "DEF"
    if (pos === "POR") return "POR"
    return "ALL"
  }

  const filteredPlayers = PUBLIC_PLAYERS.filter(player => {
    const matchesSearch = 
      player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPos = posFilter === "ALL" || getPosCategory(player.pos) === posFilter
    return matchesSearch && matchesPos
  }).sort((a, b) => b.ovr - a.ovr)

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />

      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-6 mb-12 relative z-10">
        <Badge variant="technical">Base de Datos</Badge>
        <h1 className="text-amc-title text-6xl md:text-8xl">
          Directorio de <span className="text-glow-primary">Talentos</span>
        </h1>
        <p className="text-description max-w-2xl mx-auto">
          Encuentra a las estrellas de la liga, analiza sus estadísticas de temporada y descubre quiénes dominan el meta actual.
        </p>
      </div>

      {/* BARRA DE HERRAMIENTAS */}
      <div className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-4 surface-panel p-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="BUSCAR OPERADOR O ESCUADRA..." 
            className="pl-12 h-12 bg-background/50 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar pl-2 pr-2 border-l border-border/50">
          <Filter className="h-4 w-4 text-muted-foreground mr-1 shrink-0" />
          {["ALL", "DEL", "MED", "DEF", "POR"].map((pos) => (
            <Button
              key={pos}
              variant={posFilter === pos ? "default" : "ghost"}
              onClick={() => setPosFilter(pos as any)}
              className={cn(
                "h-10 text-technical transition-all",
                posFilter === pos 
                  ? "btn-action-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {pos === "ALL" ? "TODOS" : pos}
            </Button>
          ))}
        </div>
      </div>

      {/* GRID DE CARTAS DE JUGADOR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
        {filteredPlayers.length === 0 ? (
          <div className="col-span-full text-center py-20 text-description italic">
            No se encontraron perfiles con los parámetros actuales.
          </div>
        ) : (
          filteredPlayers.map((player) => (
            <Card 
              key={player.id} 
              className="group glass-card hover:neon-glow transition-all duration-300 overflow-hidden"
            >
              {/* Brillo de fondo dinámico */}
              <div className={cn(
                "absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors",
                player.ovr >= 90 ? "bg-yellow-500" : player.ovr >= 85 ? "bg-primary" : "bg-zinc-500"
              )} />

              <CardContent className="p-6 relative z-10 flex flex-col h-full">
                
                {/* CABECERA DE LA CARTA */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col items-center justify-center">
                    <span className={cn(
                      "font-display text-5xl leading-none",
                      player.ovr >= 90 ? "text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" : player.ovr >= 85 ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {player.ovr}
                    </span>
                    <span className="text-technical text-muted-foreground mt-1">
                      {player.pos}
                    </span>
                  </div>
                  
                  <div className="text-2xl drop-shadow-sm" title="Estado de Forma">
                    {player.form}
                  </div>
                </div>

                {/* AVATAR Y NOMBRE */}
                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
                  <Avatar className="h-24 w-24 rounded-sm border-2 border-border/50 group-hover:border-primary/50 shadow-xl transition-all duration-300">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.username}&backgroundColor=transparent`} />
                    <AvatarFallback className="font-display text-4xl bg-secondary">{player.username.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h2 className="font-condensed text-2xl tracking-wide text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {player.username}
                    </h2>
                    <p className="text-technical text-muted-foreground mt-1 line-clamp-1">
                      {player.team}
                    </p>
                  </div>
                </div>

                {/* ESTADÍSTICAS (Semánticas) */}
                <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-border/30">
                  <div className="flex flex-col items-center justify-center surface-panel-solid rounded-sm py-2">
                    <span className="text-technical text-muted-foreground mb-1">Goles</span>
                    <span className="font-condensed text-xl text-foreground">{player.goals}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center surface-panel-solid rounded-sm py-2">
                    <span className="text-technical text-muted-foreground mb-1">Asist.</span>
                    <span className="font-condensed text-xl text-foreground">{player.assists}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center surface-panel-solid rounded-sm py-2 border border-yellow-500/20">
                    <span className="text-technical text-yellow-500 mb-1">MVP</span>
                    <span className="font-condensed text-xl text-foreground">{player.mvp}</span>
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