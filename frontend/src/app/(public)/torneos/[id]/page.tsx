"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Trophy, Swords, Medal, Target, Users, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Base de datos de Divisiones por Torneo
const TOURNAMENT_DETAILS = {
  "espacio-gamer": {
    name: "Espacio Gamer",
    theme: "text-purple-500",
    bgGlow: "bg-purple-500/10",
    divisions: [
      { id: "pro", name: "Liga Pro", level: "Primera División", prize: "$500 USD", spots: "2/16", desc: "La máxima categoría. Solo para equipos de élite con experiencia comprobada.", icon: Trophy, color: "text-yellow-500" },
      { id: "elite", name: "Liga Elite", level: "Segunda División", prize: "$300 USD", spots: "8/16", desc: "El paso previo a la gloria. Competencia feroz por el ascenso directo.", icon: Medal, color: "text-zinc-300" },
      { id: "ascenso", name: "Liga Ascenso", level: "Tercera División", prize: "$150 USD", spots: "12/20", desc: "Equipos en formación buscando demostrar su valor táctico.", icon: Swords, color: "text-orange-700" },
      { id: "anfa", name: "Liga ANFA", level: "División Amateur", prize: "Inscripción Gratis", spots: "Abierto", desc: "Torneo relámpago para equipos nuevos. El semillero de talentos.", icon: Target, color: "text-green-500" }
    ]
  },
  "amc": {
    name: "AMC Series",
    theme: "text-blue-500",
    bgGlow: "bg-blue-500/10",
    divisions: [
      { id: "diamond", name: "AMC Diamond", level: "Tier 1", prize: "$400 USD", spots: "Cerrado", desc: "Los mejores 10 clubes de la región sur peleando por el anillo.", icon: Trophy, color: "text-cyan-400" },
      { id: "platinum", name: "AMC Platinum", level: "Tier 2", prize: "$200 USD", spots: "1/10", desc: "División altamente estratégica. El campeón asciende directo a Diamond.", icon: Medal, color: "text-slate-300" },
      { id: "gold", name: "AMC Gold", level: "Tier 3", prize: "$50 USD", spots: "5/16", desc: "Nivel intermedio para clubes buscando consolidar su roster.", icon: Swords, color: "text-yellow-600" },
      { id: "silver", name: "AMC Silver", level: "Rookies", prize: "Puntos de Circuito", spots: "Abierto", desc: "Liga de entrada sin costo para foguear nuevos talentos.", icon: Target, color: "text-zinc-400" }
    ]
  },
  "epro": {
    name: "Epro Championship",
    theme: "text-orange-500",
    bgGlow: "bg-orange-500/10",
    divisions: [
      { id: "masters", name: "Epro Masters", level: "Profesional", prize: "$1,500 USD", spots: "0/12", desc: "Circuito cerrado. Solo por invitación directa de la organización.", icon: Trophy, color: "text-orange-500" },
      { id: "contenders", name: "Epro Contenders", level: "Semi-Pro", prize: "$700 USD", spots: "4/16", desc: "Los aspirantes. El Top 2 juega promoción contra los últimos de Masters.", icon: Medal, color: "text-orange-400" },
      { id: "futures", name: "Epro Futures", level: "Formativo", prize: "$300 USD", spots: "10/24", desc: "Liga exclusiva para academias y equipos filiales B.", icon: Swords, color: "text-orange-300" },
      { id: "open", name: "Epro Open", level: "Comunidad", prize: "Cupo a Futures", spots: "Abierto", desc: "Torneo abierto de fin de semana para clasificar a la liga formativa.", icon: Target, color: "text-orange-200" }
    ]
  },
  "lvp": {
    name: "LVP Masters",
    theme: "text-zinc-500",
    bgGlow: "bg-zinc-500/10",
    divisions: [
      { id: "superliga", name: "Superliga", level: "División de Honor", prize: "$3,000 USD", spots: "Cerrado", desc: "El torneo más prestigioso. Transmisión oficial en Twitch con Casters.", icon: Trophy, color: "text-yellow-500" },
      { id: "promesas", name: "Liga Promesas", level: "Segunda División", prize: "$1,000 USD", spots: "Cerrado", desc: "El infierno del ascenso. Partidos de alta tensión cada semana.", icon: Medal, color: "text-zinc-300" },
      { id: "tormenta", name: "Circuito Tormenta", level: "Tercera División", prize: "$500 USD", spots: "Cerrado", desc: "Circuito amateur oficial apoyado por los desarrolladores del juego.", icon: Swords, color: "text-blue-500" },
      { id: "clasificatorio", name: "Clasificatorio Abierto", level: "Fase Previa", prize: "Cupo a Tormenta", spots: "Finalizado", desc: "Clasificatorios masivos de eliminación directa a Bo1.", icon: Target, color: "text-red-500" }
    ]
  }
}

export default function TorneoDetallePage() {
  const params = useParams()
  const torneoId = params.id as string
  
  // Obtenemos los datos del torneo desde nuestro objeto usando el ID de la URL
  const torneo = TOURNAMENT_DETAILS[torneoId as keyof typeof TOURNAMENT_DETAILS]

  if (!torneo) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black italic uppercase text-foreground">Torneo no encontrado</h1>
        <Link href="/torneos" className="mt-8 inline-block">
          <Button>Volver a Competiciones</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700 max-w-7xl relative">
      
      {/* Glow de fondo dinámico basado en la liga */}
      <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 blur-[120px] pointer-events-none -z-10", torneo.bgGlow)} />

      {/* BOTÓN VOLVER */}
      <Link href="/torneos" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Volver a Directorio
      </Link>

      {/* HEADER DEL TORNEO */}
      <div className="space-y-4 mb-16 border-b border-border/50 pb-12">
        <Badge variant="outline" className={cn("uppercase tracking-widest font-black text-[10px] px-3 py-1 border-current", torneo.theme)}>
          Sistema de Ligas Oficial
        </Badge>
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-foreground leading-none">
          {torneo.name}
        </h1>
        <p className="text-muted-foreground font-medium max-w-2xl text-lg">
          Selecciona la división que mejor se adapte al nivel de tu plantilla. Iniciar desde abajo construye carácter; dominar en la cima construye leyendas.
        </p>
      </div>

      {/* GRID DE DIVISIONES (4 Categorías) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {torneo.divisions.map((div) => {
          const isClosed = div.spots === "Cerrado" || div.spots === "Finalizado"

          return (
            <Card 
              key={div.id} 
              className={cn(
                "group relative overflow-hidden bg-card border-border transition-all duration-300",
                isClosed ? "opacity-75 grayscale-[30%]" : "hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1"
              )}
            >
              <CardHeader className="border-b border-border/50 bg-secondary/30 p-6 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <div className={div.color}><div.icon className="h-7 w-7" /></div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-foreground leading-none">
                      {div.name}
                    </CardTitle>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                      {div.level}
                    </p>
                  </div>
                </div>
                
                {/* Badge de Estado del Cupo */}
                <Badge variant={isClosed ? "outline" : "default"} className={cn(
                  "uppercase font-black text-[9px] tracking-widest",
                  !isClosed && "bg-primary text-primary-foreground"
                )}>
                  {isClosed ? div.spots : "Inscripciones Abiertas"}
                </Badge>
              </CardHeader>
              
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground font-medium mb-6 min-h-[40px]">
                  {div.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-secondary/50 rounded-xl p-3 border border-border text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Prize Pool</p>
                    <p className="font-black text-foreground">{div.prize}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3 border border-border text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cupos Restantes</p>
                    <p className={cn("font-black", isClosed ? "text-red-500" : "text-foreground")}>
                      {div.spots}
                    </p>
                  </div>
                </div>

                <Link href={`/torneos/${torneoId}/${div.id}`} className="block w-full">
                    <Button 
                        className="w-full h-12 font-black uppercase tracking-widest text-xs"
                        variant={isClosed ? "secondary" : "default"}
                        disabled={isClosed}
                    >
                        {isClosed ? "Inscripción Cerrada" : `Ingresar al Lobby de ${div.name}`}
                        {!isClosed && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

    </div>
  )
}