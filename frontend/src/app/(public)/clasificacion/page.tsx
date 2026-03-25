"use client"

import { Trophy, Minus, ChevronUp, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const ACTIVE_TOURNAMENTS = [
  { id: "espacio-gamer", name: "Espacio Gamer", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", divisions: [{ id: "pro", name: "Liga Pro" }, { id: "elite", name: "Liga Elite" }] },
  { id: "amc", name: "AMC Series", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", divisions: [{ id: "diamond", name: "Diamond" }] },
]

const STANDINGS = [
  { tournamentId: "espacio-gamer", divisionId: "pro", rank: 1, team: "Successors", pts: 24, pj: 8, form: ['W','W','W','W','W'], trend: "up" },
  { tournamentId: "espacio-gamer", divisionId: "pro", rank: 2, team: "Elite FC", pts: 19, pj: 8, form: ['W','D','W','W','L'], trend: "same" },
  { tournamentId: "espacio-gamer", divisionId: "elite", rank: 1, team: "Reapers", pts: 15, pj: 5, form: ['W','W','W','W','W'], trend: "up" },
  { tournamentId: "amc", divisionId: "diamond", rank: 1, team: "Venom Squad", pts: 12, pj: 5, form: ['W','W','L','W','W'], trend: "same" },
]

export default function ClasificacionPublicPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      <div className="text-center space-y-4 mb-16">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1">
          Ranking Oficial
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Tablas de <span className="text-primary">Posiciones</span>
        </h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        {ACTIVE_TOURNAMENTS.map((tournament) => {
          
          return (
            <div key={tournament.id} className="space-y-8">
              
              {/* Encabezado del Torneo */}
              <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                <div className={cn("p-3 rounded-xl border shadow-sm shrink-0", tournament.bg, tournament.border)}>
                  <Trophy className={cn("h-6 w-6", tournament.color)} />
                </div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">{tournament.name}</h2>
              </div>

              {/* Mapeo de Tablas por División */}
              <div className="grid grid-cols-1 gap-10">
                {tournament.divisions.map((division) => {
                  
                  const divisionStandings = STANDINGS.filter(row => 
                    row.tournamentId === tournament.id && row.divisionId === division.id
                  ).sort((a, b) => a.rank - b.rank);

                  if (divisionStandings.length === 0) return null;

                  return (
                    <div key={division.id} className="space-y-4">
                      <div className="flex items-center gap-2 ml-2">
                         <div className={cn("w-2 h-5 rounded-full", tournament.bg.replace('/10', ''))} />
                         <h3 className="text-lg font-black uppercase tracking-tight text-foreground">{division.name}</h3>
                      </div>

                      <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <Table className="w-full">
                            <TableHeader className="bg-secondary/50 border-b border-border">
                              <TableRow className="hover:bg-transparent">
                                <TableHead className="w-16 text-center text-[10px] font-black uppercase tracking-widest">Pos</TableHead>
                                <TableHead className="w-[300px] text-[10px] font-black uppercase tracking-widest">Club</TableHead>
                                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-foreground">PTS</TableHead>
                                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest hidden sm:table-cell">PJ</TableHead>
                                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest w-32">Forma</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {divisionStandings.map((row) => (
                                <TableRow key={row.rank} className="border-b border-border hover:bg-secondary/30 transition-colors h-14">
                                  <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                      <span className={cn("font-black text-base italic", row.rank === 1 ? "text-yellow-500" : "text-muted-foreground")}>{row.rank}</span>
                                      {row.trend === "up" && <ChevronUp className="h-3 w-3 text-green-500" />}
                                      {row.trend === "down" && <ChevronDown className="h-3 w-3 text-red-500" />}
                                      {row.trend === "same" && <Minus className="h-3 w-3 text-muted-foreground/50" />}
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-black uppercase tracking-tight text-sm text-foreground">{row.team}</TableCell>
                                  <TableCell className="text-center text-lg font-black italic text-foreground">{row.pts}</TableCell>
                                  <TableCell className="text-center font-bold text-muted-foreground text-xs hidden sm:table-cell">{row.pj}</TableCell>
                                  <TableCell className="text-center">
                                    <div className="flex items-center justify-center gap-0.5">
                                      {row.form.map((result, i) => (
                                        <span key={i} className={cn("w-4 h-4 rounded-sm flex items-center justify-center text-[8px] font-black uppercase", result === 'W' ? "bg-green-500/20 text-green-500" : result === 'L' ? "bg-red-500/20 text-red-500" : "bg-secondary text-muted-foreground")}>{result}</span>
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