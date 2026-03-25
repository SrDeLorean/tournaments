"use client"

import { useState } from "react"
import { Trophy, Star, CalendarDays, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock de los 11 elegidos separados por líneas (Formación 4-3-3)
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

// Componente reutilizable para la Mini-Carta de Jugador "In Form"
const PlayerMiniCard = ({ player }: { player: any }) => (
  <div className={cn(
    "relative flex flex-col items-center justify-center w-24 sm:w-28 md:w-32 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group",
  )}>
    {/* Efecto de brillo si es el Jugador Estrella (MVP) */}
    {player.isStar && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-500/30 blur-xl rounded-full pointer-events-none animate-pulse" />
    )}

    {/* Fondo de la Carta (Escudo invertido estilo FUT) */}
    <div className={cn(
      "relative w-full aspect-[2.5/3.5] rounded-t-xl rounded-b-[2rem] border-2 shadow-xl overflow-hidden flex flex-col items-center pt-2 md:pt-4",
      player.isStar ? "bg-gradient-to-b from-yellow-600 to-yellow-950 border-yellow-400" : "bg-gradient-to-b from-zinc-800 to-zinc-950 border-zinc-700 dark:border-white/10 dark:from-zinc-800 dark:to-black"
    )}>
      {/* OVR y Posición (Arriba a la izquierda) */}
      <div className="absolute top-2 left-2 flex flex-col items-center">
        <span className={cn(
          "font-black italic leading-none text-sm md:text-lg",
          player.isStar ? "text-yellow-100" : "text-white"
        )}>{player.ovr}</span>
        <span className={cn(
          "text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-0.5",
          player.isStar ? "text-yellow-400" : "text-primary"
        )}>{player.pos}</span>
      </div>

      {/* Avatar */}
      <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 border-transparent group-hover:border-white/50 transition-colors z-10 mt-1 md:mt-2">
        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}&backgroundColor=transparent`} />
        <AvatarFallback>{player.name.slice(0,2)}</AvatarFallback>
      </Avatar>

      {/* Nombre y Equipo */}
      <div className="w-full mt-auto bg-black/60 backdrop-blur-sm p-2 flex flex-col items-center justify-center">
        <span className={cn(
          "font-black uppercase italic text-[9px] md:text-xs tracking-tighter truncate w-full text-center",
          player.isStar ? "text-yellow-400" : "text-white"
        )}>
          {player.name}
        </span>
        <span className="text-[7px] md:text-[9px] font-bold text-zinc-400 uppercase tracking-widest truncate w-full text-center mt-0.5">
          {player.team}
        </span>
      </div>
    </div>
  </div>
)

export default function TOTWPublicPage() {
  const [activeTab, setActiveTab] = useState<"TOTW" | "TOTS">("TOTW")

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-10">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1 text-primary border-primary/30 bg-primary/10">
          Galardones Oficiales
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Team of the <span className={cn("transition-colors duration-500", activeTab === "TOTW" ? "text-primary" : "text-yellow-500")}>
            {activeTab === "TOTW" ? "Week" : "Season"}
          </span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          {activeTab === "TOTW" 
            ? "El XI ideal de la última jornada. Los jugadores que marcaron la diferencia en el campo de juego." 
            : "Los absolutos mejores de la temporada. Leyendas consagradas que dominaron la liga."}
        </p>
      </div>

      {/* SELECTOR TOTW / TOTS */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-card border border-border rounded-2xl p-1.5 shadow-sm">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("TOTW")}
            className={cn(
              "w-32 rounded-xl font-black uppercase tracking-widest text-xs transition-all h-10",
              activeTab === "TOTW" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarDays className="w-4 h-4 mr-2" /> TOTW
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("TOTS")}
            className={cn(
              "w-32 rounded-xl font-black uppercase tracking-widest text-xs transition-all h-10",
              activeTab === "TOTS" ? "bg-yellow-500 text-yellow-950 shadow-md" : "text-muted-foreground hover:text-foreground hover:text-yellow-500"
            )}
          >
            <Trophy className="w-4 h-4 mr-2" /> TOTS
          </Button>
        </div>
      </div>

      {/* EL CAMPO DE FÚTBOL (ALINEACIÓN) */}
      <div className="max-w-4xl mx-auto relative rounded-[3rem] border-4 border-border/50 bg-secondary/30 p-4 md:p-12 overflow-hidden shadow-2xl">
        
        {/* Líneas del campo dibujadas con CSS */}
        <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20 flex flex-col justify-between">
          <div className="w-1/2 h-32 border-b-2 border-r-2 border-l-2 border-foreground mx-auto rounded-b-xl" /> {/* Área Local */}
          <div className="w-full h-0 border-t-2 border-foreground relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-foreground" /> {/* Círculo Central */}
          </div>
          <div className="w-1/2 h-32 border-t-2 border-r-2 border-l-2 border-foreground mx-auto rounded-t-xl" /> {/* Área Visitante */}
        </div>

        {/* CONTENEDOR DE JUGADORES (FORMACIÓN 4-3-3) */}
        <div className="relative z-10 flex flex-col gap-10 md:gap-16 pt-8">
          
          {/* DELANTEROS */}
          <div className="flex justify-center gap-4 md:gap-16">
            {TEAM_OF_THE_WEEK.attackers.map(player => (
              <PlayerMiniCard key={player.id} player={player} />
            ))}
          </div>

          {/* MEDIOCAMPISTAS */}
          <div className="flex justify-center gap-4 md:gap-20">
            {TEAM_OF_THE_WEEK.midfielders.map(player => (
              <PlayerMiniCard key={player.id} player={player} />
            ))}
          </div>

          {/* DEFENSAS */}
          <div className="flex justify-center gap-2 md:gap-8">
            {TEAM_OF_THE_WEEK.defenders.map(player => (
              <PlayerMiniCard key={player.id} player={player} />
            ))}
          </div>

          {/* PORTERO */}
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