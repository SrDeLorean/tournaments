"use client"

import { useState } from "react"
import { Trophy, CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock de los 11 elegidos (Formación 4-3-3)
const TEAM_OF_THE_WEEK = {
  attackers: [
    { id: "a1", name: "Flash99", pos: "EI", ovr: 88, team: "Titans Gaming", isStar: false },
    { id: "a2", name: "ToxicSniper", pos: "DC", ovr: 91, team: "Elite FC", isStar: true }, // Jugador Estrella
    { id: "a3", name: "Ninja", pos: "ED", ovr: 86, team: "Successors", isStar: false },
  ],
  midfielders: [
    { id: "m1", name: "ElMago", pos: "MC", ovr: 90, team: "Successors", isStar: false },
    { id: "m2", name: "Sebastian", pos: "MCO", ovr: 94, team: "Successors", isStar: true }, // Tú como MVP
    { id: "m3", name: "Shadow", pos: "MCD", ovr: 85, team: "Venom Squad", isStar: false },
  ],
  defenders: [
    { id: "d1", name: "Rayo", pos: "LI", ovr: 84, team: "Apex Club", isStar: false },
    { id: "d2", name: "IronWall", pos: "DFC", ovr: 89, team: "Reapers Esports", isStar: false },
    { id: "d3", name: "CapiTano", pos: "DFC", ovr: 85, team: "Nova Esports", isStar: false },
    { id: "d4", name: "Tractor", pos: "LD", ovr: 83, team: "Elite FC", isStar: false },
  ],
  goalkeeper: [
    { id: "g1", name: "Pantera", pos: "POR", ovr: 87, team: "Apex Club", isStar: false },
  ]
}

// Mini-Carta Holográfica
const PlayerMiniCard = ({ player }: { player: any }) => (
  <div className="relative flex flex-col items-center justify-center w-24 sm:w-28 md:w-32 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group">
    
    {/* Resplandor trasero para el MVP */}
    {player.isStar && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-500/20 blur-2xl rounded-full pointer-events-none animate-pulse" />
    )}

    {/* Fondo de la Carta (Cristal Táctico) */}
    <div className={cn(
      "relative w-full aspect-[2.5/3.5] rounded-t-sm rounded-b-xl border backdrop-blur-md shadow-xl overflow-hidden flex flex-col items-center pt-2 md:pt-4 transition-colors",
      player.isStar 
        ? "bg-yellow-950/40 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]" 
        : "bg-card/40 border-border/50 hover:border-primary/50"
    )}>
      
      {/* OVR y Posición */}
      <div className="absolute top-2 left-2 flex flex-col items-center">
        <span className={cn(
          "font-display text-2xl md:text-3xl leading-none",
          player.isStar ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "text-foreground"
        )}>
          {player.ovr}
        </span>
        <span className={cn(
          "text-technical text-[8px] md:text-[10px] mt-0.5",
          player.isStar ? "text-yellow-500" : "text-primary"
        )}>
          {player.pos}
        </span>
      </div>

      {/* Avatar Táctico */}
      <Avatar className="h-12 w-12 md:h-16 md:w-16 rounded-sm border border-border/50 group-hover:border-primary/50 transition-colors z-10 mt-1 md:mt-2 bg-background/50">
        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}&backgroundColor=transparent`} />
        <AvatarFallback className="font-display text-xl text-muted-foreground">{player.name.slice(0,2)}</AvatarFallback>
      </Avatar>

      {/* Footer (Nombre y Equipo) */}
      <div className="w-full mt-auto surface-panel-solid border-x-0 border-b-0 p-2 flex flex-col items-center justify-center">
        <span className={cn(
          "font-condensed text-xs md:text-sm tracking-wide truncate w-full text-center",
          player.isStar ? "text-yellow-400" : "text-foreground"
        )}>
          {player.name}
        </span>
        <span className="text-[7px] md:text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate w-full text-center mt-0.5">
          {player.team}
        </span>
      </div>
    </div>
  </div>
)

export default function TOTWPublicPage() {
  const [activeTab, setActiveTab] = useState<"TOTW" | "TOTS">("TOTW")

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* Brillo Ambiental */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-6 mb-12 relative z-10">
        <Badge variant="technical">Galardones Oficiales</Badge>
        <h1 className="text-amc-title text-6xl md:text-8xl">
          Team of the <span className={cn(
            "transition-colors duration-500", 
            activeTab === "TOTW" ? "text-glow-primary" : "text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
          )}>
            {activeTab === "TOTW" ? "Week" : "Season"}
          </span>
        </h1>
        <p className="text-description max-w-2xl mx-auto">
          {activeTab === "TOTW" 
            ? "El XI ideal de la última jornada. Los operadores que marcaron la diferencia táctica." 
            : "Los absolutos mejores de la temporada. Leyendas consagradas que dominaron la liga."}
        </p>
      </div>

      {/* SELECTOR TOTW / TOTS */}
      <div className="flex justify-center mb-16 relative z-10">
        <div className="flex surface-panel p-1.5 rounded-sm">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("TOTW")}
            className={cn(
              "w-32 rounded-sm text-technical transition-all h-10",
              activeTab === "TOTW" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarDays className="w-4 h-4 mr-2" /> TOTW
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("TOTS")}
            className={cn(
              "w-32 rounded-sm text-technical transition-all h-10",
              activeTab === "TOTS" ? "bg-yellow-500 text-yellow-950 shadow-md" : "text-muted-foreground hover:text-foreground hover:text-yellow-500"
            )}
          >
            <Trophy className="w-4 h-4 mr-2" /> TOTS
          </Button>
        </div>
      </div>

      {/* EL CAMPO DE FÚTBOL (HUD TÁCTICO) */}
      <div className="max-w-5xl mx-auto relative rounded-md border border-border/50 bg-background/40 backdrop-blur-sm p-4 md:p-12 overflow-hidden shadow-2xl">
        
        {/* Líneas del campo tipo radar */}
        <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20 flex flex-col justify-between">
          <div className="w-1/2 h-32 border-b border-r border-l border-foreground mx-auto rounded-b-sm" /> 
          <div className="w-full h-0 border-t border-foreground relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-foreground" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground" />
          </div>
          <div className="w-1/2 h-32 border-t border-r border-l border-foreground mx-auto rounded-t-sm" /> 
        </div>

        {/* CONTENEDOR DE JUGADORES */}
        <div className="relative z-10 flex flex-col gap-10 md:gap-16 pt-8">
          
          <div className="flex justify-center gap-4 md:gap-16">
            {TEAM_OF_THE_WEEK.attackers.map(player => (
              <PlayerMiniCard key={player.id} player={player} />
            ))}
          </div>

          <div className="flex justify-center gap-4 md:gap-20">
            {TEAM_OF_THE_WEEK.midfielders.map(player => (
              <PlayerMiniCard key={player.id} player={player} />
            ))}
          </div>

          <div className="flex justify-center gap-2 md:gap-8">
            {TEAM_OF_THE_WEEK.defenders.map(player => (
              <PlayerMiniCard key={player.id} player={player} />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {TEAM_OF_THE_WEEK.goalkeeper.map(player => (
              <PlayerMiniCard key={player.id} player={player} />
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}