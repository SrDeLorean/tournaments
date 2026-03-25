import Link from "next/link"
import { ChevronLeft, CalendarDays, Shield, Trophy, Users, Clock, AlertCircle } from "lucide-react"
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
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700 max-w-7xl relative">
      {/* Brillo dinámico con color primary */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
      
      <Link href={`/torneos/${torneoId}`} className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Volver a las Divisiones
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border/50 pb-8">
        <div className="space-y-4">
          <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 uppercase font-black text-[10px] tracking-widest px-3 py-1 rounded-full">
            {torneoName}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-foreground leading-none">
            Liga <span className="text-primary">{divisionName}</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl text-sm italic">
            Lobby oficial de la competición. Revisa los clubes clasificados y el cronograma oficial.
          </p>
        </div>
        
        <div className="shrink-0 w-full md:w-auto">
          <Button className="w-full md:w-auto h-14 px-8 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 rounded-[var(--radius)]">
            <Shield className="mr-2 h-5 w-5" /> Inscribir a mi Equipo
          </Button>
          <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em] text-center mt-3">
            Quedan <span className="text-primary italic">10 cupos</span> disponibles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMNA PRINCIPAL: ROSTER */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Roster de la Liga
            </h2>
            <Badge variant="secondary" className="font-black text-[10px] uppercase tracking-widest bg-secondary/80 border border-border">
              6 / 16 Equipos
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENROLLED_TEAMS.map((team, idx) => (
              <Card key={idx} className="bg-card/50 border-border hover:border-primary/30 transition-all group rounded-[var(--radius)]">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[calc(var(--radius)-4px)] bg-secondary border border-border flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Shield className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black uppercase italic tracking-tight text-foreground truncate text-sm">{team.name}</h3>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">TAG: [{team.tag}]</p>
                  </div>
                  
                  {/* Badge de Estado: Primary para verificado, Muted para pendiente */}
                  <Badge variant="outline" className={cn(
                    "text-[8px] uppercase font-black shrink-0 tracking-tighter px-2",
                    team.verified 
                      ? "text-primary border-primary/20 bg-primary/5" 
                      : "text-muted-foreground border-border bg-muted/5"
                  )}>
                    {team.verified ? "Confirmado" : "Pendiente"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
            
            {/* Cupos disponibles con estilo dashed dinámico */}
            {Array.from({ length: 4 }).map((_, idx) => (
              <Card key={`empty-${idx}`} className="bg-transparent border border-dashed border-border/50 opacity-40 rounded-[var(--radius)]">
                <CardContent className="p-4 flex items-center justify-center h-full min-h-[80px]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Cupo Disponible</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* COLUMNA LATERAL: CRONOGRAMA Y ALERTAS */}
        <div className="space-y-8">
          <Card className="bg-card border-border shadow-xl rounded-[var(--radius)] overflow-hidden">
            <CardHeader className="bg-secondary/30 border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2 text-foreground">
                <CalendarDays className="h-5 w-5 text-primary" /> Cronograma
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {SCHEDULE.map((item, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    {/* El punto de la línea de tiempo ahora usa color primario al hover */}
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-background bg-muted-foreground group-hover:bg-primary transition-colors text-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 -translate-x-1/2" />
                    
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-[calc(var(--radius)-2px)] border border-border bg-background/50 shadow-sm ml-8 md:ml-0 group-hover:border-primary/20 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-3 w-3 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{item.date}</span>
                      </div>
                      <h4 className="text-[11px] font-black uppercase tracking-tight text-foreground">{item.phase}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerta: Cambiamos orange-500 por Primary para alineación total al globals.css */}
          <div className="p-4 rounded-[var(--radius)] bg-primary/5 border border-primary/20 flex gap-4">
            <AlertCircle className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Requisito Obligatorio</h4>
              <p className="text-[9px] text-muted-foreground font-black uppercase italic leading-relaxed">
                Mínimo 8 jugadores registrados antes del sorteo.
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