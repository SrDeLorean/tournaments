"use client"

import { useState } from "react"
import { Trophy, Calendar, Clock, MonitorPlay, ChevronRight, PlayCircle, BarChart3, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// 1. Base de datos de Torneos
const ACTIVE_TOURNAMENTS = [
  { id: "espacio-gamer", name: "Espacio Gamer", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", divisions: [{ id: "pro", name: "Liga Pro" }, { id: "elite", name: "Liga Elite" }] },
  { id: "amc", name: "AMC Series", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", divisions: [{ id: "diamond", name: "Diamond" }] },
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
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-10">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 uppercase tracking-widest font-black text-[10px] px-3 py-1">
          Temporada Regular
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter drop-shadow-lg text-foreground">
          Match<span className="text-primary">Center</span>
        </h1>
      </div>

      {/* FILTROS GLOBALES RAPIDOS */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {[
          { id: "all", label: "Todos los Partidos" },
          { id: "live", label: "En Vivo", icon: <Radio className="w-3 h-3 mr-1 text-red-500 animate-pulse" /> },
          { id: "pending", label: "Próximos" },
          { id: "finished", label: "Resultados" }
        ].map((filter) => (
          <Button
            key={filter.id}
            variant={statusFilter === filter.id ? "default" : "outline"}
            onClick={() => setStatusFilter(filter.id as any)}
            className={cn("h-9 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all border-border", statusFilter === filter.id ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary")}
          >
            {filter.icon} {filter.label}
          </Button>
        ))}
      </div>

      {/* RENDERIZADO POR BLOQUES (Torneo -> División) */}
      <div className="max-w-5xl mx-auto space-y-16">
        {ACTIVE_TOURNAMENTS.map((tournament) => {
          
          return (
            <div key={tournament.id} className="space-y-8 relative">
              
              {/* Encabezado del Torneo */}
              <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                <div className={cn("p-3 rounded-xl border shadow-sm shrink-0", tournament.bg, tournament.border)}>
                  <Trophy className={cn("h-6 w-6", tournament.color)} />
                </div>
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">{tournament.name}</h2>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Partidos Oficiales</p>
                </div>
              </div>

              {/* Mapeo de Divisiones dentro del Torneo */}
              <div className="space-y-10">
                {tournament.divisions.map((division) => {
                  
                  // Filtramos los partidos que corresponden a este torneo, esta división y cumplen el filtro de estado
                  const divisionMatches = MOCK_FIXTURES.filter(m => 
                    m.tournamentId === tournament.id && 
                    m.divisionId === division.id &&
                    (statusFilter === "all" || m.status === statusFilter)
                  );

                  // Si no hay partidos en esta división con el filtro actual, no la mostramos para no hacer bulto
                  if (divisionMatches.length === 0) return null;

                  return (
                    <div key={division.id} className="bg-card/30 p-4 md:p-6 rounded-3xl border border-border/50">
                      
                      {/* Título de la División */}
                      <div className="flex items-center gap-2 mb-6 ml-2">
                        <div className={cn("w-2 h-6 rounded-full", tournament.bg.replace('/10', ''))} />
                        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">{division.name}</h3>
                      </div>

                      {/* Grid de Partidos */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {divisionMatches.map((match) => (
                          <Card key={match.id} className="group overflow-hidden bg-background border-border shadow-sm hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                             <CardContent className="p-0 flex flex-col h-full relative z-10">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/20">
                                  <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                    <span className="text-foreground">{match.stage}</span>
                                    <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {match.date}</span>
                                  </div>
                                  {match.status === "live" && <Badge className="bg-red-500/10 text-red-500 border-red-500/30 font-black uppercase text-[9px] animate-pulse">En Vivo</Badge>}
                                  {match.status === "finished" && <Badge variant="outline" className="text-muted-foreground border-border font-bold uppercase text-[9px]">Finalizado</Badge>}
                                  {match.status === "pending" && <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 font-bold uppercase text-[9px]"><Clock className="h-3 w-3 mr-1" /> {match.time}</Badge>}
                                </div>
                
                                <div className="flex items-center justify-between px-4 py-6">
                                  <div className="flex flex-col items-center gap-2 w-[35%] text-center">
                                    <span className="font-black italic uppercase text-sm md:text-base leading-tight">{match.home}</span>
                                  </div>
                                  <div className="flex flex-col items-center justify-center w-[30%]">
                                    {match.status === "finished" ? (
                                      <div className="flex items-center gap-3 bg-secondary/50 px-3 py-1.5 rounded-xl border border-border">
                                        <span className={cn("text-2xl font-black italic", match.homeScore! > match.awayScore! ? "text-foreground" : "text-muted-foreground")}>{match.homeScore}</span>
                                        <span className="text-muted-foreground font-black">-</span>
                                        <span className={cn("text-2xl font-black italic", match.awayScore! > match.homeScore! ? "text-foreground" : "text-muted-foreground")}>{match.awayScore}</span>
                                      </div>
                                    ) : match.status === "live" ? (
                                        <div className="text-2xl font-black italic text-red-500 animate-pulse">0 - 0</div>
                                    ) : (
                                      <div className="text-sm font-black italic text-muted-foreground bg-secondary px-3 py-1 rounded-lg">VS</div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-center gap-2 w-[35%] text-center">
                                    <span className="font-black italic uppercase text-sm md:text-base leading-tight">{match.away}</span>
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