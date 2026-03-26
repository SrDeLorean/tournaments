"use client"

import { Trophy, Minus, ChevronUp, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const ACTIVE_TOURNAMENTS = [
  { id: "espacio-gamer", name: "Espacio Gamer", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", divisions: [{ id: "pro", name: "Liga Pro" }, { id: "elite", name: "Liga Elite" }] },
  { id: "amc", name: "AMC Series", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", divisions: [{ id: "diamond", name: "Diamond" }] },
]

const STANDINGS = [
  { tournamentId: "espacio-gamer", divisionId: "pro", rank: 1, team: "Successors", pts: 24, pj: 8, form: ['W','W','W','W','W'], trend: "up" },
  { tournamentId: "espacio-gamer", divisionId: "pro", rank: 2, team: "Elite FC", pts: 19, pj: 8, form: ['W','D','W','W','L'], trend: "same" },
  { tournamentId: "espacio-gamer", divisionId: "elite", rank: 1, team: "Reapers", pts: 15, pj: 5, form: ['W','W','W','W','W'], trend: "up" },
  { tournamentId: "amc", divisionId: "diamond", rank: 1, team: "Venom Squad", pts: 12, pj: 5, form: ['W','W','L','W','W'], trend: "same" },
]

export default function ClasificacionPublicPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />

      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-6 mb-16 relative z-10">
        <Badge variant="technical">Ranking Oficial</Badge>
        <h1 className="text-amc-title text-6xl md:text-8xl">
          Leader<span className="text-glow-primary">board</span>
        </h1>
        <p className="text-description max-w-2xl mx-auto">
          La tabla de clasificación global. Revisa el rendimiento táctico y la racha de las escuadras activas.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {ACTIVE_TOURNAMENTS.map((tournament) => {
          
          return (
            <div key={tournament.id} className="space-y-8">
              
              {/* Encabezado del Torneo */}
              <div className="flex items-center gap-4 border-b border-border/30 pb-4">
                <div className={cn("p-3 rounded-md border shadow-sm shrink-0 bg-background/50", tournament.border)}>
                  <Trophy className={cn("h-8 w-8", tournament.color)} />
                </div>
                <div>
                  <h2 className="text-amc-title text-4xl">{tournament.name}</h2>
                </div>
              </div>

              {/* Mapeo de Tablas por División */}
              <div className="grid grid-cols-1 gap-12">
                {tournament.divisions.map((division) => {
                  
                  const divisionStandings = STANDINGS.filter(row => 
                    row.tournamentId === tournament.id && row.divisionId === division.id
                  ).sort((a, b) => a.rank - b.rank);

                  if (divisionStandings.length === 0) return null;

                  return (
                    <div key={division.id} className="space-y-4">
                      
                      <div className="flex items-center gap-3 ml-2">
                         <div className={cn("w-1.5 h-6 rounded-full", tournament.bg.replace('/10', ''))} />
                         <h3 className="font-condensed text-2xl tracking-wide text-foreground">{division.name}</h3>
                      </div>

                      <div className="glass-card rounded-md overflow-hidden">
                        <div className="overflow-x-auto">
                          <Table className="w-full">
                            <TableHeader className="bg-secondary/30 border-b border-border/50">
                              <TableRow className="hover:bg-transparent">
                                <TableHead className="w-20 text-center text-technical">POS</TableHead>
                                <TableHead className="w-[300px] text-technical">ESCUADRA</TableHead>
                                <TableHead className="text-center text-technical text-primary">PTS</TableHead>
                                <TableHead className="text-center text-technical hidden sm:table-cell">PJ</TableHead>
                                <TableHead className="text-center text-technical w-40">FORMA</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {divisionStandings.map((row) => (
                                <TableRow 
                                  key={row.rank} 
                                  className={cn(
                                    "border-b border-border/30 transition-colors h-16",
                                    row.rank === 1 ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-secondary/30"
                                  )}
                                >
                                  {/* POSICIÓN */}
                                  <TableCell className="text-center relative">
                                    {/* Barra indicadora para el primer lugar */}
                                    {row.rank === 1 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                                    
                                    <div className="flex items-center justify-center gap-2">
                                      <span className={cn(
                                        "font-display text-4xl leading-none", 
                                        row.rank === 1 ? "text-primary drop-shadow-[0_0_8px_rgba(232,0,29,0.5)]" : "text-muted-foreground"
                                      )}>
                                        {row.rank}
                                      </span>
                                      <div className="flex flex-col">
                                        {row.trend === "up" && <ChevronUp className="h-4 w-4 text-green-500" />}
                                        {row.trend === "down" && <ChevronDown className="h-4 w-4 text-red-500" />}
                                        {row.trend === "same" && <Minus className="h-4 w-4 text-muted-foreground/50" />}
                                      </div>
                                    </div>
                                  </TableCell>
                                  
                                  {/* ESCUADRA */}
                                  <TableCell className="font-condensed text-xl tracking-wide text-foreground uppercase">
                                    {row.team}
                                  </TableCell>
                                  
                                  {/* PUNTOS */}
                                  <TableCell className="text-center font-display text-4xl text-foreground">
                                    {row.pts}
                                  </TableCell>
                                  
                                  {/* PARTIDOS JUGADOS */}
                                  <TableCell className="text-center font-condensed text-xl text-muted-foreground hidden sm:table-cell">
                                    {row.pj}
                                  </TableCell>
                                  
                                  {/* RACHA/FORMA */}
                                  <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      {row.form.map((result, i) => (
                                        <span 
                                          key={i} 
                                          className={cn(
                                            "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-black uppercase", 
                                            result === 'W' ? "bg-green-500/20 text-green-500 border border-green-500/30" : 
                                            result === 'L' ? "bg-red-500/20 text-red-500 border border-red-500/30" : 
                                            "bg-secondary text-muted-foreground border border-border"
                                          )}
                                        >
                                          {result}
                                        </span>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
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