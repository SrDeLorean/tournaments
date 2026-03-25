"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, CalendarDays, Shield, Trophy, Users, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock de Equipos inscritos
const ENROLLED_TEAMS = [
  { name: "Successors", tag: "SUC", verified: true },
  { name: "Elite FC", tag: "EFC", verified: true },
  { name: "Reapers Esports", tag: "RPS", verified: true },
  { name: "Titans Gaming", tag: "TTN", verified: false },
  { name: "Venom Squad", tag: "VNM", verified: true },
  { name: "Apex Club", tag: "APX", verified: false },
]

// Mock del Calendario (Cronograma)
const SCHEDULE = [
  { phase: "Cierre de Inscripciones", date: "10 de Abril, 2026", status: "upcoming" },
  { phase: "Sorteo de Grupos", date: "12 de Abril, 2026", status: "upcoming" },
  { phase: "Jornada 1 (Inauguración)", date: "15 de Abril, 2026", status: "upcoming" },
  { phase: "Jornada 2 a 5", date: "Abril - Mayo 2026", status: "upcoming" },
  { phase: "Playoffs y Gran Final", date: "20 de Mayo, 2026", status: "upcoming" },
]

export default function DivisionLobbyPage() {
  const params = useParams()
  // Capturamos ambos parámetros de la URL
  const torneoId = params.id as string
  const divisionId = params.divisionId as string

  // Formateamos los IDs para el título (en producción esto vendría de tu base de datos)
  const torneoName = torneoId.replace("-", " ").toUpperCase()
  const divisionName = divisionId.toUpperCase()

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700 max-w-7xl relative">
      
      {/* Glow de fondo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* BOTÓN VOLVER */}
      <Link href={`/torneos/${torneoId}`} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Volver a las Divisiones
      </Link>

      {/* HEADER DE LA LIGA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border/50 pb-8">
        <div className="space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/30 uppercase font-black text-[10px] tracking-widest">
            {torneoName}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-foreground leading-none">
            Liga <span className="text-primary">{divisionName}</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl">
            Lobby oficial de la competición. Revisa los clubes clasificados, el cronograma oficial y asegura el lugar de tu equipo.
          </p>
        </div>
        
        {/* Call to action principal */}
        <div className="shrink-0 w-full md:w-auto">
          <Button className="w-full md:w-auto h-14 px-8 font-black uppercase tracking-widest text-sm shadow-lg shadow-primary/20">
            <Shield className="mr-2 h-5 w-5" /> Inscribir a mi Equipo
          </Button>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center mt-3">
            Quedan <span className="text-primary">10 cupos</span> disponibles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* =========================================
            COLUMNA IZQUIERDA: EQUIPOS INSCRITOS (Span 2)
            ========================================= */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Roster de la Liga
            </h2>
            <Badge variant="secondary" className="font-black">6 / 16 Equipos</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENROLLED_TEAMS.map((team, idx) => (
              <Card key={idx} className="bg-card/50 border-border hover:border-primary/30 transition-colors group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Shield className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black uppercase italic tracking-tight text-foreground truncate">
                      {team.name}
                    </h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                      TAG: [{team.tag}]
                    </p>
                  </div>
                  {/* Indicador de pago/verificación */}
                  {team.verified ? (
                    <Badge variant="outline" className="text-[9px] text-green-500 border-green-500/30 bg-green-500/10 uppercase font-black shrink-0">
                      Confirmado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[9px] text-orange-500 border-orange-500/30 bg-orange-500/10 uppercase font-black shrink-0">
                      Pendiente
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {/* Tarjetas vacías para rellenar los cupos (Mock visual) */}
            {Array.from({ length: 4 }).map((_, idx) => (
              <Card key={`empty-${idx}`} className="bg-transparent border border-dashed border-border/50 opacity-50">
                <CardContent className="p-4 flex items-center justify-center h-full min-h-[80px]">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground italic">
                    Cupo Disponible
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* =========================================
            COLUMNA DERECHA: CRONOGRAMA Y REGLAS
            ========================================= */}
        <div className="space-y-8">
          
          {/* CRONOGRAMA */}
          <Card className="bg-card border-border shadow-xl">
            <CardHeader className="bg-secondary/30 border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" /> Cronograma Oficial
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                
                {SCHEDULE.map((item, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* El punto de la línea de tiempo */}
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-background bg-muted-foreground text-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -translate-x-1/2">
                    </div>
                    
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-border bg-background shadow-sm ml-8 md:ml-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-3 w-3 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-tight text-foreground">
                        {item.phase}
                      </h4>
                    </div>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>

          {/* CAJA DE ADVERTENCIA / INFO */}
          <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 flex gap-4">
            <AlertCircle className="h-6 w-6 text-orange-500 shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-1">Requisito Obligatorio</h4>
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                Todos los equipos deben contar con un mínimo de 8 jugadores registrados en la plataforma antes del sorteo de grupos. De lo contrario, perderán su cupo.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}