"use client"

import Link from "next/link"
import { Trophy, CalendarDays, Users, Swords, ArrowRight, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock de los Torneos Disponibles
const TOURNAMENTS = [
  { 
    id: "espacio-gamer", 
    name: "Espacio Gamer", 
    type: "Liga Regular",
    status: "Inscripciones Abiertas", 
    statusColor: "text-green-500 bg-green-500/10 border-green-500/30",
    theme: "from-purple-600/20 to-transparent hover:border-purple-500/50",
    icon: <Swords className="h-10 w-10 text-purple-500" />,
    spots: "12 / 16",
    prize: "$1,000 USD"
  },
  { 
    id: "amc", 
    name: "AMC Series", 
    type: "Copa Eliminatoria",
    status: "Próximamente", 
    statusColor: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    theme: "from-blue-600/20 to-transparent hover:border-blue-500/50",
    icon: <ShieldCheck className="h-10 w-10 text-blue-500" />,
    spots: "0 / 32",
    prize: "$500 USD"
  },
  { 
    id: "epro", 
    name: "Epro Championship", 
    type: "Liga de Élite",
    status: "Últimos Cupos", 
    statusColor: "text-orange-500 bg-orange-500/10 border-orange-500/30",
    theme: "from-orange-600/20 to-transparent hover:border-orange-500/50",
    icon: <Trophy className="h-10 w-10 text-orange-500" />,
    spots: "18 / 20",
    prize: "$2,500 USD"
  },
  { 
    id: "lvp", 
    name: "LVP Masters", 
    type: "Circuito Oficial",
    status: "En Curso", 
    statusColor: "text-zinc-500 bg-zinc-500/10 border-zinc-500/30",
    theme: "from-zinc-600/20 to-transparent hover:border-zinc-500/50",
    icon: <Trophy className="h-10 w-10 text-zinc-500" />,
    spots: "Cerrado",
    prize: "$5,000 USD"
  },
]

export default function TorneosPublicPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-16">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1 text-primary border-primary/30 bg-primary/10">
          Competiciones
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Explora los <span className="text-primary">Torneos</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          Descubre las ligas y copas activas en el ecosistema. Revisa los formatos, premios y asegura el cupo de tu equipo antes de que se agoten.
        </p>
      </div>

      {/* GRID DE TORNEOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {TOURNAMENTS.map((tournament) => (
          <Card 
            key={tournament.id} 
            className={cn(
              "group overflow-hidden bg-card border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative",
              tournament.theme
            )}
          >
            {/* Gradiente de fondo dinámico */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none",
              tournament.theme.split(" ")[0] // Toma el color del 'from-'
            )} />

            <CardContent className="p-8 relative z-10 flex flex-col h-full">
              
              {/* Info Superior: Estado y Tipo */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-background border border-border shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {tournament.icon}
                </div>
                <Badge variant="outline" className={cn("uppercase font-black text-[9px] tracking-widest px-3 py-1", tournament.statusColor)}>
                  {tournament.status}
                </Badge>
              </div>

              {/* Título del Torneo */}
              <div className="mb-6">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-foreground leading-none mb-1">
                  {tournament.name}
                </h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {tournament.type}
                </p>
              </div>

              {/* Estadísticas (Prize & Cupos) */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Prize Pool</p>
                    <p className="font-black text-foreground text-sm">{tournament.prize}</p>
                  </div>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-3 border border-border flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Cupos</p>
                    <p className="font-black text-foreground text-sm">{tournament.spots}</p>
                  </div>
                </div>
              </div>

              {/* Botón de Acción */}
              <div className="mt-auto pt-4 border-t border-border/50">
                <Link href={`/torneos/${tournament.id}`} className="w-full block">
                    <Button 
                    className="w-full h-12 font-black uppercase tracking-widest text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    variant={tournament.status === "En Curso" ? "outline" : "default"}
                    disabled={tournament.status === "En Curso"}
                    >
                    {tournament.status === "En Curso" ? "Inscripciones Cerradas" : "Ver Divisiones e Inscribirse"}
                    {tournament.status !== "En Curso" && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </Link>
              </div>
              
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}