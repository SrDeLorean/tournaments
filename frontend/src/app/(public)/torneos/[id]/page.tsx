import Link from "next/link"
import { ChevronLeft, Trophy, Swords, Medal, Target, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock Limpio
const TOURNAMENT_DETAILS = {
  "espacio-gamer": {
    name: "Espacio Gamer",
    divisions: [
      { id: "pro", name: "Liga Pro", level: "Primera División", prize: "$500 USD", spots: "2/16", desc: "La máxima categoría. Solo para equipos de élite con experiencia comprobada.", icon: Trophy, color: "text-primary" },
      { id: "elite", name: "Liga Elite", level: "Segunda División", prize: "$300 USD", spots: "8/16", desc: "El paso previo a la gloria. Competencia feroz por el ascenso directo.", icon: Medal, color: "text-foreground" },
      { id: "ascenso", name: "Liga Ascenso", level: "Tercera División", prize: "$150 USD", spots: "12/20", desc: "Equipos en formación buscando demostrar su valor táctico.", icon: Swords, color: "text-muted-foreground" },
      { id: "anfa", name: "Liga ANFA", level: "División Amateur", prize: "Gratis", spots: "Abierto", desc: "Torneo relámpago para equipos nuevos. El semillero de talentos.", icon: Target, color: "text-muted-foreground/50" }
    ]
  },
  "amc": {
    name: "AMC Series",
    divisions: [
      { id: "diamond", name: "AMC Diamond", level: "Tier 1", prize: "$400 USD", spots: "Cerrado", desc: "Los mejores 10 clubes de la región sur peleando por el anillo.", icon: Trophy, color: "text-primary" },
      { id: "platinum", name: "AMC Platinum", level: "Tier 2", prize: "$200 USD", spots: "1/10", desc: "División altamente estratégica. El campeón asciende directo a Diamond.", icon: Medal, color: "text-foreground" },
      { id: "gold", name: "AMC Gold", level: "Tier 3", prize: "$50 USD", spots: "5/16", desc: "Nivel intermedio para clubes buscando consolidar su roster.", icon: Swords, color: "text-muted-foreground" },
      { id: "silver", name: "AMC Silver", level: "Rookies", prize: "Puntos", spots: "Abierto", desc: "Liga de entrada sin costo para foguear nuevos talentos.", icon: Target, color: "text-muted-foreground/50" }
    ]
  },
  "epro": {
    name: "Epro Championship",
    divisions: [
      { id: "masters", name: "Epro Masters", level: "Profesional", prize: "$1,500 USD", spots: "0/12", desc: "Circuito cerrado. Solo por invitación directa de la organización.", icon: Trophy, color: "text-primary" },
      { id: "contenders", name: "Epro Contenders", level: "Semi-Pro", prize: "$700 USD", spots: "4/16", desc: "Los aspirantes. El Top 2 juega promoción.", icon: Medal, color: "text-foreground" },
      { id: "futures", name: "Epro Futures", level: "Formativo", prize: "$300 USD", spots: "10/24", desc: "Liga exclusiva para academias y equipos filiales B.", icon: Swords, color: "text-muted-foreground" },
      { id: "open", name: "Epro Open", level: "Comunidad", prize: "Cupo", spots: "Abierto", desc: "Torneo abierto de fin de semana para clasificar.", icon: Target, color: "text-muted-foreground/50" }
    ]
  },
  "lvp": {
    name: "LVP Masters",
    divisions: [
      { id: "superliga", name: "Superliga", level: "Honor", prize: "$3,000 USD", spots: "Cerrado", desc: "El torneo más prestigioso. Transmisión oficial en Twitch.", icon: Trophy, color: "text-primary" },
      { id: "promesas", name: "Liga Promesas", level: "Segunda", prize: "$1,000 USD", spots: "Cerrado", desc: "El infierno del ascenso. Partidos de alta tensión.", icon: Medal, color: "text-foreground" },
      { id: "tormenta", name: "Circuito Tormenta", level: "Tercera", prize: "$500 USD", spots: "Cerrado", desc: "Circuito amateur oficial apoyado por desarrolladores.", icon: Swords, color: "text-muted-foreground" },
      { id: "clasificatorio", name: "Clasificatorio", level: "Previa", prize: "Cupo", spots: "Finalizado", desc: "Clasificatorios masivos de eliminación directa.", icon: Target, color: "text-destructive" }
    ]
  }
}

export default async function TorneoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: torneoId } = await params
  const torneo = TOURNAMENT_DETAILS[torneoId as keyof typeof TOURNAMENT_DETAILS]

  if (!torneo) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-title-pro text-6xl mb-6">Torneo no encontrado</h1>
        <Link href="/torneos">
          <Button variant="outline">Volver a Competiciones</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-7xl relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64" />
      
      <Link href="/torneos" className="inline-flex items-center text-technical text-muted-foreground hover:text-primary mb-12 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-2" /> Directorio de Operaciones
      </Link>

      <div className="space-y-6 mb-16 border-b border-border/30 pb-12">
        <Badge variant="technical">Sistema de Ligas Oficial</Badge>
        <h1 className="text-title-pro text-6xl md:text-8xl">
          {torneo.name.split(" ")[0]} <span className="text-glow-primary">{torneo.name.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="text-description max-w-2xl">
          Selecciona la división que mejor se adapte al nivel táctico de tu plantilla. <br />
          Las inscripciones están sujetas a revisión de la administración.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {torneo.divisions.map((div) => {
          const isClosed = div.spots === "Cerrado" || div.spots === "Finalizado"

          return (
            <Card key={div.id} className={cn(
              "group relative overflow-hidden transition-all duration-300",
              isClosed ? "opacity-60 grayscale-[40%]" : "hover:neon-glow hover:-translate-y-1"
            )}>
              <div className="p-6 border-b border-border/30 bg-background/20 flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-sm bg-background/50 border border-border/50 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                    <div className={div.color}><div.icon className="h-7 w-7" /></div>
                  </div>
                  <div>
                    <CardTitle className="text-3xl group-hover:text-glow-primary transition-colors">{div.name}</CardTitle>
                    <p className="text-technical text-muted-foreground mt-1 opacity-70">{div.level}</p>
                  </div>
                </div>
                <Badge variant={isClosed ? "outline" : "default"}>
                  {isClosed ? div.spots : "Disponible"}
                </Badge>
              </div>

              <CardContent className="p-8">
                <p className="text-description mb-8 min-h-[48px]">{div.desc}</p>
                
                {/* Stats usando surface-panel */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="surface-panel p-4 text-center">
                    <p className="text-technical mb-2">Prize Pool</p>
                    <p className="font-condensed text-2xl text-foreground">{div.prize}</p>
                  </div>
                  <div className="surface-panel p-4 text-center">
                    <p className="text-technical mb-2">Cupos</p>
                    <p className={cn("font-condensed text-2xl", isClosed ? "text-destructive" : "text-primary")}>
                      {div.spots}
                    </p>
                  </div>
                </div>

                <Link href={`/torneos/${torneoId}/${div.id}`} className="block w-full">
                  <Button className="w-full" variant={isClosed ? "outline" : "tactical"} disabled={isClosed}>
                    {isClosed ? "Inscripción Cerrada" : `Ingresar al Lobby ${div.name}`}
                    {!isClosed && <ArrowRight className="ml-2 h-5 w-5" />}
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

export function generateStaticParams() {
  return [{ id: 'espacio-gamer' }, { id: 'amc' }, { id: 'epro' }, { id: 'lvp' }]
}