"use client"

import { Trophy, Minus, ChevronUp, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

const STANDINGS = [
  { rank: 1, team: "Successors", pts: 24, pj: 8, pg: 8, pe: 0, pp: 0, gf: 21, gc: 4, trend: "up", form: ['W','W','W','W','W'] },
  { rank: 2, team: "Elite FC", pts: 19, pj: 8, pg: 6, pe: 1, pp: 1, gf: 15, gc: 6, trend: "same", form: ['W','D','W','W','L'] },
  { rank: 3, team: "Reapers Esports", pts: 18, pj: 8, pg: 6, pe: 0, pp: 2, gf: 18, gc: 10, trend: "up", form: ['W','W','L','W','W'] },
  { rank: 4, team: "Titans Gaming", pts: 15, pj: 8, pg: 5, pe: 0, pp: 3, gf: 12, gc: 9, trend: "down", form: ['L','L','W','W','W'] },
  { rank: 5, team: "Venom Squad", pts: 12, pj: 8, pg: 4, pe: 0, pp: 4, gf: 10, gc: 12, trend: "same", form: ['W','L','L','W','L'] },
  { rank: 6, team: "Apex Club", pts: 9, pj: 8, pg: 3, pe: 0, pp: 5, gf: 8, gc: 15, trend: "down", form: ['L','D','L','L','W'] },
  { rank: 7, team: "Nova Esports", pts: 4, pj: 8, pg: 1, pe: 1, pp: 6, gf: 5, gc: 18, trend: "same", form: ['L','L','D','L','L'] },
  { rank: 8, team: "Phoenix FC", pts: 1, pj: 8, pg: 0, pe: 1, pp: 7, gf: 3, gc: 28, trend: "down", form: ['L','L','L','D','L'] },
]

export default function ClasificacionPublicPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-12">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1">
          División de Honor
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Leader<span className="text-primary">board</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          La tabla absoluta de posiciones. Cada punto cuenta en el camino hacia el campeonato.
        </p>
      </div>

      {/* CONTENEDOR DE LA TABLA */}
      <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-card shadow-xl relative overflow-hidden">
        
        <div className="overflow-x-auto relative z-10">
          <Table className="w-full">
            <TableHeader className="bg-secondary/50 border-b border-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-16 text-center text-[10px] font-black uppercase tracking-widest">Pos</TableHead>
                <TableHead className="w-[300px] text-[10px] font-black uppercase tracking-widest">Club</TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-foreground">PTS</TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">PJ</TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest hidden sm:table-cell">G</TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest hidden sm:table-cell">E</TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest hidden sm:table-cell">P</TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest hidden md:table-cell">DG</TableHead>
                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest w-32">Forma</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {STANDINGS.map((row) => {
                const isChampion = row.rank === 1;
                const isTop3 = row.rank <= 3;
                const isRelegation = row.rank >= 7;

                return (
                  <TableRow 
                    key={row.rank} 
                    className={cn(
                      "border-b border-border hover:bg-secondary/30 transition-colors h-16",
                      isChampion ? "bg-yellow-500/5 border-l-4 border-l-yellow-500" : 
                      isTop3 ? "border-l-4 border-l-muted-foreground" : 
                      isRelegation ? "border-l-4 border-l-red-500 bg-red-500/5" : "border-l-4 border-l-transparent"
                    )}
                  >
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className={cn(
                          "font-black text-lg italic", 
                          isChampion ? "text-yellow-500" : isTop3 ? "text-muted-foreground" : "text-muted-foreground/60"
                        )}>
                          {row.rank}
                        </span>
                        {row.trend === "up" && <ChevronUp className="h-3 w-3 text-green-500" />}
                        {row.trend === "down" && <ChevronDown className="h-3 w-3 text-red-500" />}
                        {row.trend === "same" && <Minus className="h-3 w-3 text-muted-foreground" />}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0">
                          <Trophy className={cn("h-5 w-5", isChampion ? "text-yellow-500" : "text-muted-foreground")} />
                        </div>
                        <span className="font-black uppercase tracking-tight text-sm md:text-base text-foreground">
                          {row.team}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-xl font-black italic text-foreground">{row.pts}</span>
                    </TableCell>

                    <TableCell className="text-center font-bold text-muted-foreground">{row.pj}</TableCell>
                    <TableCell className="text-center font-bold text-muted-foreground hidden sm:table-cell">{row.pg}</TableCell>
                    <TableCell className="text-center font-bold text-muted-foreground hidden sm:table-cell">{row.pe}</TableCell>
                    <TableCell className="text-center font-bold text-muted-foreground hidden sm:table-cell">{row.pp}</TableCell>
                    <TableCell className="text-center font-bold text-muted-foreground hidden md:table-cell">
                      {row.gf - row.gc > 0 ? `+${row.gf - row.gc}` : row.gf - row.gc}
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {row.form.map((result, i) => (
                          <span 
                            key={i} 
                            className={cn(
                              "w-5 h-5 rounded flex items-center justify-center text-[9px] font-black uppercase",
                              result === 'W' ? "bg-green-500/20 text-green-600 dark:text-green-500 border border-green-500/20" :
                              result === 'L' ? "bg-red-500/20 text-red-600 dark:text-red-500 border border-red-500/20" :
                              "bg-secondary text-muted-foreground border border-border"
                            )}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}