"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Shield, Users, Trophy, ExternalLink, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock de Equipos
const PUBLIC_TEAMS = [
  { id: "successors", name: "Successors", tag: "SUC", players: 11, trophies: 3, region: "LATAM Sur", status: "Pro" },
  { id: "elite-fc", name: "Elite FC", tag: "EFC", players: 10, trophies: 1, region: "LATAM Norte", status: "Challenger" },
  { id: "reapers", name: "Reapers Esports", tag: "RPS", players: 11, trophies: 0, region: "LATAM Sur", status: "Challenger" },
  { id: "titans", name: "Titans Gaming", tag: "TTN", players: 9, trophies: 2, region: "Brasil", status: "Pro" },
  { id: "venom", name: "Venom Squad", tag: "VNM", players: 11, trophies: 0, region: "Europa", status: "Amateur" },
  { id: "apex", name: "Apex Club", tag: "APX", players: 11, trophies: 1, region: "LATAM Sur", status: "Challenger" },
  { id: "nova", name: "Nova Esports", tag: "NVA", players: 11, trophies: 0, region: "LATAM Norte", status: "Amateur" },
  { id: "phoenix", name: "Phoenix FC", tag: "PHX", players: 8, trophies: 0, region: "LATAM Sur", status: "Amateur" },
]

export default function EquiposPublicPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeams = PUBLIC_TEAMS.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.tag.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />

      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-6 mb-12 relative z-10">
        <Badge variant="technical">Directorio Oficial</Badge>
        <h1 className="text-amc-title text-6xl md:text-8xl">
          Escuadras <span className="text-glow-primary">Registradas</span>
        </h1>
        <p className="text-description max-w-2xl mx-auto">
          Explora los clubes que conforman nuestra liga, revisa sus plantillas y descubre a las futuras leyendas del competitivo.
        </p>
      </div>

      {/* BARRA DE BÚSQUEDA TÁCTICA */}
      <div className="max-w-xl mx-auto mb-16 relative group z-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input 
          placeholder="BUSCAR ESCUADRA O TAG (Ej: SUC)..." 
          className="pl-12 h-14 surface-panel border-none shadow-xl text-foreground text-center"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* GRID DE TARJETAS DE EQUIPOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
        {filteredTeams.length === 0 ? (
          <div className="col-span-full text-center py-20 text-description italic">
            No hay registros en la base de datos para esta búsqueda.
          </div>
        ) : (
          filteredTeams.map((team) => (
            <Card 
              key={team.id} 
              className="group glass-card hover:neon-glow transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Banner del equipo (Con efecto Scanline) */}
                <div className="h-24 w-full bg-secondary/50 relative overflow-hidden animate-scanline border-b border-border/30">
                  <div className={cn(
                    "absolute bottom-0 w-full h-full bg-gradient-to-t to-transparent opacity-80",
                    team.status === "Pro" ? "from-yellow-500/20" : "from-primary/20"
                  )} />
                </div>

                <div className="px-6 pb-6 relative">
                  {/* Avatar flotante Táctico (Cuadrado) */}
                  <div className="absolute -top-10 left-6 w-20 h-20 rounded-sm bg-background/80 backdrop-blur-md border border-border shadow-xl flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                    <Shield className={cn(
                      "h-10 w-10", 
                      team.id === "successors" ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"
                    )} />
                  </div>

                  {/* Badge de Categoría */}
                  <div className="flex justify-end pt-4">
                    <Badge variant={team.status === "Pro" ? "default" : "outline"} className={cn(
                      team.status === "Pro" && "bg-yellow-500 hover:bg-yellow-600 text-yellow-950 shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                    )}>
                      {team.status}
                    </Badge>
                  </div>

                  {/* Info principal */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-condensed text-2xl tracking-wide text-foreground leading-none group-hover:text-primary transition-colors truncate">
                        {team.name}
                      </h2>
                      <span className="text-technical text-muted-foreground mt-1">[{team.tag}]</span>
                    </div>
                    <div className="flex items-center gap-2 text-technical text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {team.region}
                    </div>
                  </div>

                  {/* Estadísticas rápidas (Superficies semánticas) */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="surface-panel-solid rounded-sm p-3 flex flex-col items-center justify-center gap-1 group-hover:border-primary/30 transition-colors">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-technical text-muted-foreground">Roster</span>
                      <span className="font-condensed text-xl text-foreground">{team.players}/11</span>
                    </div>
                    <div className="surface-panel-solid rounded-sm p-3 flex flex-col items-center justify-center gap-1 group-hover:border-yellow-500/30 transition-colors">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-technical text-muted-foreground">Títulos</span>
                      <span className="font-condensed text-xl text-foreground">{team.trophies}</span>
                    </div>
                  </div>

                  {/* Botón de Acción */}
                  <Link href={`/equipos/${team.id}`} className="block mt-6">
                    <Button variant="outline" className="w-full text-technical h-12 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
                      Abrir Dossier <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  )
}