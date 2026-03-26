import Link from "next/link"
import { ChevronLeft, CalendarDays, Shield, Users, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mocks
const ENROLLED_TEAMS = [
  { name: "Successors", tag: "SUC", verified: true },
  { name: "Elite FC", tag: "EFC", verified: true },
  { name: "Reapers Esports", tag: "RPS", verified: true },
  { name: "Titans Gaming", tag: "TTN", verified: false },
  { name: "Venom Squad", tag: "VNM", verified: true },
  { name: "Apex Club", tag: "APX", verified: false },
]

const SCHEDULE = [
  { phase: "Cierre de Inscripciones", date: "10 de Abril, 2026", status: "upcoming" },
  { phase: "Sorteo de Grupos", date: "12 de Abril, 2026", status: "upcoming" },
  { phase: "Jornada 1 (Inauguración)", date: "15 de Abril, 2026", status: "upcoming" },
  { phase: "Jornada 2 a 5", date: "Abril - Mayo 2026", status: "upcoming" },
  { phase: "Playoffs y Gran Final", date: "20 de Mayo, 2026", status: "upcoming" },
]

export default async function DivisionLobbyPage({ params }: { params: Promise<{ id: string, divisionId: string }> }) {
  const { id: torneoId, divisionId } = await params

  const torneoName = torneoId.replace("-", " ").toUpperCase()
  const divisionName = divisionId.toUpperCase()

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 right-1/4 w-96 h-96" />
      
      <Link href={`/torneos/${torneoId}`} className="inline-flex items-center text-technical text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-2" /> Volver al Selector de Divisiones
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border/30 pb-12">
        <div className="space-y-6">
          <Badge variant="technical">{torneoName}</Badge>
          <h1 className="text-title-pro text-6xl md:text-8xl">
            Liga <span className="text-glow-primary">{divisionName}</span>
          </h1>
          <p className="text-description max-w-xl">
            Lobby oficial de la competición. Revisa los clubes clasificados y el cronograma oficial.
          </p>
        </div>
        
        <div className="shrink-0 w-full md:w-auto">
          <Button className="w-full md:w-auto" variant="default">
            <Shield className="mr-2 h-5 w-5" /> Inscribir a mi Equipo
          </Button>
          <p className="text-technical text-center mt-4">
            Quedan <span className="text-primary">10 cupos</span> disponibles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA PRINCIPAL */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-8 border-b border-border/30 pb-4">
            <h2 className="text-amc-title text-3xl flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" /> Roster de la Liga
            </h2>
            <Badge variant="outline">6 / 16 Equipos</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENROLLED_TEAMS.map((team, idx) => (
              <Card key={idx} className="group hover:neon-glow transition-all duration-300">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-background/50 border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Shield className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-condensed text-lg tracking-wide text-foreground truncate">{team.name}</h3>
                    <p className="text-technical text-muted-foreground mt-1">TAG // {team.tag}</p>
                  </div>
                  <Badge variant={team.verified ? "technical" : "outline"} className="shrink-0">
                    {team.verified ? "Confirmado" : "Pendiente"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
            
            {/* Cupos vacíos usando la nueva utilidad semántica */}
            {Array.from({ length: 4 }).map((_, idx) => (
              <Card key={`empty-${idx}`} className="slot-empty min-h-[80px]">
                <CardContent className="p-4 flex items-center justify-center h-full">
                  <p className="text-technical text-muted-foreground">Cupo Disponible</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* COLUMNA LATERAL */}
        <div className="space-y-8">
          <Card>
            <CardHeader className="bg-background/20 border-b border-border/30">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-primary" /> Cronograma
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
                {SCHEDULE.map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-6 group">
                    <div className="w-6 h-6 rounded-sm bg-background border-2 border-border group-hover:border-primary group-hover:shadow-[0_0_10px_hsla(var(--primary),0.5)] transition-all shrink-0 z-10" />
                    <div className="flex-1 -mt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-3 w-3 text-primary" />
                        <span className="text-technical text-muted-foreground">{item.date}</span>
                      </div>
                      <h4 className="font-condensed text-foreground tracking-wide uppercase">{item.phase}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerta usando surface-panel */}
          <div className="surface-panel-solid bg-primary/10 border-primary/30 p-6 flex gap-4 animate-pulse">
            <AlertCircle className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h4 className="text-technical text-primary mb-2">Requisito Obligatorio</h4>
              <p className="text-description text-muted-foreground">
                Mínimo 8 jugadores registrados antes del sorteo para no perder el cupo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [
    { id: 'espacio-gamer', divisionId: 'pro' }, { id: 'espacio-gamer', divisionId: 'elite' }, { id: 'espacio-gamer', divisionId: 'ascenso' }, { id: 'espacio-gamer', divisionId: 'anfa' },
    { id: 'amc', divisionId: 'diamond' }, { id: 'amc', divisionId: 'platinum' }, { id: 'amc', divisionId: 'gold' }, { id: 'amc', divisionId: 'silver' },
    { id: 'epro', divisionId: 'masters' }, { id: 'epro', divisionId: 'contenders' }, { id: 'epro', divisionId: 'futures' }, { id: 'epro', divisionId: 'open' },
    { id: 'lvp', divisionId: 'superliga' }, { id: 'lvp', divisionId: 'promesas' }, { id: 'lvp', divisionId: 'tormenta' }, { id: 'lvp', divisionId: 'clasificatorio' }
  ]
}