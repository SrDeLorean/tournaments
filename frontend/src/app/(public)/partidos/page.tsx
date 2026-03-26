"use client"

import { useState } from "react"
import { Trophy, Calendar, Clock, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// 1. Base de datos de Torneos
const ACTIVE_TOURNAMENTS = [
  { id: "espacio-gamer", name: "Espacio Gamer", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", divisions: [{ id: "pro", name: "Liga Pro" }, { id: "elite", name: "Liga Elite" }] },
  { id: "amc", name: "AMC Series", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", divisions: [{ id: "diamond", name: "Diamond" }] },
]

// 2. Partidos
const MOCK_FIXTURES = [
  { id: 1, tournamentId: "espacio-gamer", divisionId: "pro", home: "Successors", homeTag: "SUC", homeScore: 3, away: "Elite FC", awayTag: "EFC", awayScore: 1, status: "finished", date: "12 Oct", time: "20:00", stage: "Jornada 5" },
  { id: 2, tournamentId: "espacio-gamer", divisionId: "pro", home: "Reapers", homeTag: "RPS", homeScore: null, away: "Titans", awayTag: "TTN", awayScore: null, status: "live", date: "Hoy", time: "22:30", stream: true, stage: "Jornada 5" },
  { id: 3, tournamentId: "espacio-gamer", divisionId: "elite", home: "Nova FC", homeTag: "NVA", homeScore: null, away: "Phoenix", awayTag: "PHX", awayScore: null, status: "pending", date: "Mañana", time: "21:00", stage: "Jornada 5" },
  { id: 4, tournamentId: "amc", divisionId: "diamond", home: "Venom Squad", homeTag: "VNM", homeScore: null, away: "Apex Club", awayTag: "APX", awayScore: null, status: "pending", date: "Mañana", time: "21:00", stage: "Jornada 1" },
]

export default function PartidosPublicPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "pending" | "finished">("all")

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />

      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-6 mb-12 relative z-10">
        <Badge variant="technical">Temporada Regular</Badge>
        <h1 className="text-amc-title text-6xl md:text-8xl">
          Match<span className="text-glow-primary">Center</span>
        </h1>
        <p className="text-description max-w-2xl mx-auto">
          Resultados en vivo, próximos encuentros y el historial completo de la temporada competitiva.
        </p>
      </div>

      {/* FILTROS GLOBALES RAPIDOS */}
      <div className="flex flex-wrap justify-center gap-2 mb-16 relative z-10">
        {[
          { id: "all", label: "Todos" },
          { id: "live", label: "En Vivo", icon: <Radio className="w-4 h-4 mr-2 text-red-500 animate-pulse" /> },
          { id: "pending", label: "Próximos" },
          { id: "finished", label: "Finalizados" }
        ].map((filter) => (
          <Button
            key={filter.id}
            variant={statusFilter === filter.id ? "default" : "outline"}
            onClick={() => setStatusFilter(filter.id as any)}
            className={cn(
              "h-10 text-technical transition-all px-6", 
              statusFilter === filter.id ? "btn-action-primary" : "surface-panel text-muted-foreground hover:text-foreground hover:border-primary/50"
            )}
          >
            {filter.icon} {filter.label}
          </Button>
        ))}
      </div>

      {/* RENDERIZADO POR BLOQUES */}
      <div className="max-w-5xl mx-auto space-y-16">
        {ACTIVE_TOURNAMENTS.map((tournament) => {
          return (
            <div key={tournament.id} className="space-y-8 relative">
              
              {/* Encabezado del Torneo */}
              <div className="flex items-center gap-4 border-b border-border/30 pb-4">
                <div className={cn("p-3 rounded-md border shadow-sm shrink-0 bg-background/50", tournament.border)}>
                  <Trophy className={cn("h-8 w-8", tournament.color)} />
                </div>
                <div>
                  <h2 className="text-amc-title text-4xl">{tournament.name}</h2>
                  <p className="text-technical text-muted-foreground">Partidos Oficiales</p>
                </div>
              </div>

              {/* Mapeo de Divisiones */}
              <div className="space-y-10">
                {tournament.divisions.map((division) => {
                  const divisionMatches = MOCK_FIXTURES.filter(m => 
                    m.tournamentId === tournament.id && 
                    m.divisionId === division.id &&
                    (statusFilter === "all" || m.status === statusFilter)
                  );

                  if (divisionMatches.length === 0) return null;

                  return (
                    <div key={division.id} className="surface-panel p-6 rounded-lg">
                      
                      {/* Título de la División */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className={cn("w-1.5 h-6 rounded-full", tournament.bg.replace('/10', ''))} />
                        <h3 className="font-condensed text-2xl tracking-wide text-foreground">{division.name}</h3>
                      </div>

                      {/* Grid de Partidos */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {divisionMatches.map((match) => (
                          <Card key={match.id} className="group overflow-hidden bg-background/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-300">
                             <CardContent className="p-0 flex flex-col h-full relative z-10">
                                
                                {/* Header del Partido */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/20">
                                  <div className="flex items-center gap-3 text-technical text-muted-foreground">
                                    <span className="text-foreground">{match.stage}</span>
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {match.date}</span>
                                  </div>
                                  {match.status === "live" && <Badge variant="destructive" className="animate-pulse">EN VIVO</Badge>}
                                  {match.status === "finished" && <Badge variant="outline">FINALIZADO</Badge>}
                                  {match.status === "pending" && <Badge variant="technical"><Clock className="h-3 w-3 mr-1" /> {match.time}</Badge>}
                                </div>
                
                                {/* Cuerpo del Partido */}
                                <div className="flex items-center justify-between px-4 py-6">
                                  <div className="flex flex-col items-center justify-center w-[35%] text-center">
                                    <span className="font-condensed text-xl md:text-2xl leading-tight truncate w-full">{match.home}</span>
                                  </div>
                                  
                                  <div className="flex flex-col items-center justify-center w-[30%]">
                                    {match.status === "finished" ? (
                                      <div className="flex items-center gap-3 surface-panel-solid px-4 py-1.5">
                                        <span className={cn("font-display text-4xl leading-none", match.homeScore! > match.awayScore! ? "text-primary drop-shadow-[0_0_8px_rgba(232,0,29,0.5)]" : "text-foreground")}>{match.homeScore}</span>
                                        <span className="text-muted-foreground font-black">-</span>
                                        <span className={cn("font-display text-4xl leading-none", match.awayScore! > match.homeScore! ? "text-primary drop-shadow-[0_0_8px_rgba(232,0,29,0.5)]" : "text-foreground")}>{match.awayScore}</span>
                                      </div>
                                    ) : match.status === "live" ? (
                                        <div className="font-display text-4xl text-primary animate-pulse leading-none drop-shadow-[0_0_8px_rgba(232,0,29,0.5)]">0 - 0</div>
                                    ) : (
                                      <div className="text-technical text-muted-foreground surface-panel-solid px-3 py-1">VS</div>
                                    )}
                                  </div>

                                  <div className="flex flex-col items-center justify-center w-[35%] text-center">
                                    <span className="font-condensed text-xl md:text-2xl leading-tight truncate w-full">{match.away}</span>
                                  </div>
                                </div>
                             </CardContent>
                          </Card>
                        ))}
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}