"use client"

import { useState } from "react"
import { Trophy, Calendar, Clock, MonitorPlay, ChevronRight, PlayCircle, BarChart3, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock de Partidos Mejorado
const MOCK_FIXTURES = [
  { id: 1, home: "Successors", homeTag: "SUC", homeScore: 3, away: "Elite FC", awayTag: "EFC", awayScore: 1, status: "finished", date: "12 Oct", time: "20:00", stage: "Jornada 5" },
  { id: 2, home: "Reapers Esports", homeTag: "RPS", homeScore: null, away: "Titans Gaming", awayTag: "TTN", awayScore: null, status: "live", date: "Hoy", time: "22:30", stream: true, stage: "Jornada 5" },
  { id: 3, home: "Venom Squad", homeTag: "VNM", homeScore: null, away: "Apex Club", awayTag: "APX", awayScore: null, status: "pending", date: "Mañana", time: "21:00", stage: "Jornada 5" },
  { id: 4, home: "Nova Esports", homeTag: "NVA", homeScore: null, away: "Phoenix FC", awayTag: "PHX", awayScore: null, status: "pending", date: "Mañana", time: "23:00", stage: "Jornada 5" },
]

export default function PartidosPublicPage() {
  const [activeJornada, setActiveJornada] = useState(5)
  const [statusFilter, setStatusFilter] = useState<"all" | "live" | "pending" | "finished">("all")

  // Filtrado de partidos
  const filteredMatches = MOCK_FIXTURES.filter(match => {
    if (statusFilter === "all") return true;
    return match.status === statusFilter;
  });

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-12">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 uppercase tracking-widest font-black text-[10px] px-3 py-1">
          Temporada Regular
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter drop-shadow-lg text-foreground">
          Match<span className="text-primary">Center</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          Sigue el calendario oficial, los resultados en vivo y no te pierdas ningún enfrentamiento de la liga de élite.
        </p>
      </div>

      {/* BARRA DE HERRAMIENTAS (Filtros y Jornadas) */}
      <div className="max-w-5xl mx-auto mb-10 space-y-6">
        
        {/* Filtros de Estado */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "Todos" },
            { id: "live", label: "En Vivo", icon: <Radio className="w-3 h-3 mr-1 text-red-500 animate-pulse" /> },
            { id: "pending", label: "Próximos" },
            { id: "finished", label: "Resultados" }
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={statusFilter === filter.id ? "default" : "outline"}
              onClick={() => setStatusFilter(filter.id as any)}
              className={cn(
                "h-9 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all border-border",
                statusFilter === filter.id ? "bg-primary text-primary-foreground shadow-md" : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {filter.icon} {filter.label}
            </Button>
          ))}
        </div>

        {/* Selector de Jornadas */}
        <div className="flex justify-center overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-2 p-1.5 bg-secondary/50 backdrop-blur-md rounded-2xl border border-border">
            {[3, 4, 5, 6, 7].map((jornada) => (
              <Button
                key={jornada}
                onClick={() => setActiveJornada(jornada)}
                variant="ghost"
                className={cn(
                  "w-28 h-10 rounded-xl font-black uppercase tracking-widest text-xs transition-all",
                  activeJornada === jornada 
                    ? "bg-background text-foreground shadow-sm border border-border" 
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                Jornada {jornada}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID DE PARTIDOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {filteredMatches.length === 0 ? (
          <div className="col-span-full text-center py-20 text-muted-foreground italic font-medium">
            No hay partidos que coincidan con este filtro.
          </div>
        ) : (
          filteredMatches.map((match) => (
            <Card 
              key={match.id} 
              className={cn(
                "group relative overflow-hidden bg-card border-border transition-all duration-500",
                match.status === "live" ? "hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]" : "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              )}
            >
              {/* Resplandor sutil según estado */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
                match.status === "live" ? "bg-gradient-to-br from-red-500 to-transparent" : "bg-gradient-to-br from-primary to-transparent"
              )} />
              
              <CardContent className="p-0 flex flex-col h-full relative z-10">
                
                {/* Info Superior (Estado, Fecha y Etapa) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-secondary/30">
                  <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <span className="text-foreground">{match.stage}</span>
                    <span>•</span>
                    <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {match.date}</span>
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {match.time}</span>
                  </div>
                  
                  {match.status === "live" && (
                    <Badge className="bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/30 font-black uppercase text-[9px] animate-pulse flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> En Vivo
                    </Badge>
                  )}
                  {match.status === "finished" && (
                    <Badge variant="outline" className="text-muted-foreground border-border font-bold uppercase text-[9px]">
                      Finalizado
                    </Badge>
                  )}
                  {match.status === "pending" && match.stream && (
                    <Badge variant="outline" className="text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/10 font-bold uppercase text-[9px]">
                      <MonitorPlay className="h-3 w-3 mr-1" /> Oficial
                    </Badge>
                  )}
                </div>

                {/* Marcador Principal */}
                <div className="flex items-center justify-between px-6 py-8">
                  {/* Equipo Local */}
                  <div className="flex flex-col items-center gap-3 w-[35%]">
                    <div className="w-16 h-16 rounded-2xl bg-background border border-border shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Trophy className="h-8 w-8 text-muted-foreground" /> {/* Logo */}
                    </div>
                    <div className="text-center">
                      <span className="font-black italic uppercase text-sm md:text-base text-foreground leading-none block">{match.home}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">[{match.homeTag}]</span>
                    </div>
                  </div>

                  {/* Score / VS */}
                  <div className="flex flex-col items-center justify-center w-[30%]">
                    {match.status === "finished" ? (
                      <div className="flex items-center gap-4 bg-secondary/50 px-4 py-2 rounded-2xl border border-border">
                        <span className={cn("text-3xl md:text-4xl font-black italic", match.homeScore! > match.awayScore! ? "text-foreground" : "text-muted-foreground")}>{match.homeScore}</span>
                        <span className="text-muted-foreground font-black">-</span>
                        <span className={cn("text-3xl md:text-4xl font-black italic", match.awayScore! > match.homeScore! ? "text-foreground" : "text-muted-foreground")}>{match.awayScore}</span>
                      </div>
                    ) : match.status === "live" ? (
                      <div className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-black italic text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.4)] tracking-tighter">
                          0 - 0
                        </div>
                        <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 animate-pulse">Min 34'</span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                        <span className="text-sm font-black italic text-muted-foreground">VS</span>
                      </div>
                    )}
                  </div>

                  {/* Equipo Visitante */}
                  <div className="flex flex-col items-center gap-3 w-[35%]">
                    <div className="w-16 h-16 rounded-2xl bg-background border border-border shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Trophy className="h-8 w-8 text-muted-foreground" /> {/* Logo */}
                    </div>
                    <div className="text-center">
                      <span className="font-black italic uppercase text-sm md:text-base text-foreground leading-none block">{match.away}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">[{match.awayTag}]</span>
                    </div>
                  </div>
                </div>

                {/* Footer de la Tarjeta (Acciones) */}
                <div className="mt-auto p-4 border-t border-border/50 bg-secondary/10 flex justify-center">
                  {match.status === "live" && (
                    <Button className="w-full font-black uppercase tracking-widest text-xs bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20">
                      <PlayCircle className="mr-2 h-4 w-4" /> Ver Transmisión
                    </Button>
                  )}
                  {match.status === "pending" && (
                    <Button variant="outline" className="w-full font-bold uppercase tracking-widest text-xs border-border hover:bg-primary hover:text-primary-foreground transition-colors">
                      <ChevronRight className="mr-2 h-4 w-4" /> Detalles del Partido
                    </Button>
                  )}
                  {match.status === "finished" && (
                    <Button variant="secondary" className="w-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                      <BarChart3 className="mr-2 h-4 w-4" /> Ver Estadísticas
                    </Button>
                  )}
                </div>
                
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}