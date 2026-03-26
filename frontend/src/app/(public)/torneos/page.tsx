"use client"

import Link from "next/link"
import { Trophy, Users, Swords, ArrowRight, ShieldCheck, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock Limpio: Usamos las variantes de nuestro sistema, no colores quemados.
const TOURNAMENTS = [
  { 
    id: "espacio-gamer", 
    name: "Espacio Gamer", 
    type: "Liga Regular",
    status: "Inscripciones Abiertas", 
    badgeVariant: "default", // Rojo AMC neón
    icon: <Swords className="h-8 w-8 text-primary" />,
    spots: "12 / 16",
    prize: "$1,000 USD"
  },
  { 
    id: "amc", 
    name: "AMC Series", 
    type: "Copa Eliminatoria",
    status: "Próximamente", 
    badgeVariant: "technical", // Gris técnico
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    spots: "0 / 32",
    prize: "$500 USD"
  },
  { 
    id: "epro", 
    name: "Epro Championship", 
    type: "Liga de Élite",
    status: "Últimos Cupos", 
    badgeVariant: "default", 
    icon: <Trophy className="h-8 w-8 text-primary" />,
    spots: "18 / 20",
    prize: "$2,500 USD"
  },
  { 
    id: "lvp", 
    name: "LVP Masters", 
    type: "Circuito Oficial",
    status: "En Curso", 
    badgeVariant: "outline", // Borde sutil, indicando que está cerrado
    icon: <Target className="h-8 w-8 text-muted-foreground" />,
    spots: "Cerrado",
    prize: "$5,000 USD"
  },
]

export default function TorneosPublicPage() {
  return (
    <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* HEADER: Limpio y enlazado al Global CSS */}
      <div className="text-center space-y-6 mb-20">
        <Badge variant="technical" className="mx-auto">
          Competiciones
        </Badge>
        
        <h1 className="text-title-pro text-5xl md:text-7xl">
          Explora los <span className="text-glow-primary">Torneos</span>
        </h1>
        
        <p className="text-description max-w-2xl mx-auto">
          Descubre las ligas y copas activas en el ecosistema. Revisa los formatos, 
          premios y asegura el cupo de tu equipo antes de que se agoten.
        </p>
      </div>

      {/* GRID DE TORNEOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {TOURNAMENTS.map((tournament) => (
          <Card 
            key={tournament.id} 
            /* El componente Card ya trae 'glass-card'. Solo añadimos el hover neón. */
            className="group relative hover:neon-glow transition-all duration-500 overflow-hidden"
          >
            {/* Overlay sutil para dar profundidad en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <CardContent className="p-8 relative z-10 flex flex-col h-full">
              
              {/* Info Superior: Icono y Estado */}
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-md bg-background/50 border border-border/50 shadow-inner flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                  {tournament.icon}
                </div>
                <Badge variant={tournament.badgeVariant as any}>
                  {tournament.status}
                </Badge>
              </div>

              {/* Título del Torneo */}
              <div className="mb-8">
                <h2 className="text-amc-title text-4xl mb-2 group-hover:text-glow-primary transition-colors">
                  {tournament.name}
                </h2>
                <p className="text-technical text-muted-foreground">
                  Tipo // <span className="text-foreground">{tournament.type}</span>
                </p>
              </div>

              {/* Estadísticas Tácticas */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-background/30 p-4 border border-border/50 flex flex-col gap-1 rounded-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="text-technical">Prize Pool</span>
                  </div>
                  <span className="font-condensed text-2xl font-bold">{tournament.prize}</span>
                </div>
                
                <div className="bg-background/30 p-4 border border-border/50 flex flex-col gap-1 rounded-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-technical">Cupos</span>
                  </div>
                  <span className="font-condensed text-2xl font-bold">{tournament.spots}</span>
                </div>
              </div>

              {/* Botón de Acción (Usa tu botón blindado) */}
              <div className="mt-auto pt-6 border-t border-border/30">
                <Link href={`/torneos/${tournament.id}`} className="w-full block">
                  <Button 
                    className="w-full"
                    variant={tournament.status === "En Curso" ? "outline" : "tactical"}
                    disabled={tournament.status === "En Curso"}
                  >
                    {tournament.status === "En Curso" ? "Inscripciones Cerradas" : "Ver Divisiones"}
                    {tournament.status !== "En Curso" && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </Link>
              </div>
              
              {/* Decoración HUD de esquina */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-50 transition-opacity">
                <div className="w-8 h-8 border-t-2 border-r-2 border-primary" />
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}