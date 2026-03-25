"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Shield, Users, Trophy, ExternalLink, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock de Equipos para la vista pública
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

  // Filtrado de equipos por nombre o etiqueta (Tag)
  const filteredTeams = PUBLIC_TEAMS.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.tag.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-10">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1 text-primary border-primary/30 bg-primary/10">
          Directorio Oficial
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Equipos <span className="text-primary">Registrados</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          Explora los clubes que conforman nuestra liga, revisa sus plantillas y descubre a las futuras leyendas del competitivo.
        </p>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="max-w-md mx-auto mb-12 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Buscar equipo por nombre o tag (Ej: SUC)..." 
          className="pl-12 h-14 rounded-2xl bg-card border-border shadow-sm text-base italic placeholder:not-italic font-medium focus-visible:ring-primary/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* GRID DE TARJETAS DE EQUIPOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredTeams.length === 0 ? (
          <div className="col-span-full text-center py-20 text-muted-foreground italic font-medium">
            No se encontraron equipos con ese nombre.
          </div>
        ) : (
          filteredTeams.map((team) => (
            <Card 
              key={team.id} 
              className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-primary/10"
            >
              <CardContent className="p-0">
                {/* Banner del equipo */}
                <div className="h-20 w-full bg-secondary relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  <div className={cn(
                    "absolute bottom-0 w-full h-1/2 bg-gradient-to-t to-transparent",
                    team.status === "Pro" ? "from-yellow-500/20" : "from-primary/20"
                  )} />
                </div>

                {/* Info principal y Logo */}
                <div className="px-6 pb-6 relative">
                  {/* Avatar flotante */}
                  <div className="absolute -top-10 left-6 w-20 h-20 rounded-2xl bg-background border-2 border-border shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Shield className={cn(
                      "h-10 w-10", 
                      team.id === "successors" ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>

                  {/* Badge de Categoría */}
                  <div className="flex justify-end pt-3">
                    <Badge variant="outline" className={cn(
                      "text-[9px] uppercase font-black tracking-widest",
                      team.status === "Pro" ? "text-yellow-500 border-yellow-500/30 bg-yellow-500/10" :
                      team.status === "Challenger" ? "text-primary border-primary/30 bg-primary/10" :
                      "text-muted-foreground border-border"
                    )}>
                      {team.status}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground leading-none">
                        {team.name}
                      </h2>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">[{team.tag}]</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <MapPin className="h-3.5 w-3.5" /> {team.region}
                    </div>
                  </div>

                  {/* Estadísticas rápidas */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-secondary/50 rounded-xl p-3 border border-border flex flex-col items-center justify-center gap-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Roster</span>
                      <span className="font-black text-foreground">{team.players}/11</span>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3 border border-border flex flex-col items-center justify-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Títulos</span>
                      <span className="font-black text-foreground">{team.trophies}</span>
                    </div>
                  </div>

                  {/* Botón de Acción */}
                  <Link href={`/equipos/${team.id}`} className="block mt-6">
                    <Button variant="outline" className="w-full font-bold uppercase tracking-widest text-xs h-10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      Ver Perfil <ExternalLink className="ml-2 h-4 w-4" />
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