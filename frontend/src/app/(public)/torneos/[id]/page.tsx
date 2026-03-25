import Link from "next/link"
import { ChevronLeft, Trophy, Swords, Medal, Target, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TOURNAMENT_DETAILS = {
  "espacio-gamer": {
    name: "Espacio Gamer",
    divisions: [
      { id: "pro", name: "Liga Pro", level: "Primera División", prize: "$500 USD", spots: "2/16", desc: "La máxima categoría. Solo para equipos de élite con experiencia comprobada.", icon: Trophy, color: "text-yellow-500" },
      { id: "elite", name: "Liga Elite", level: "Segunda División", prize: "$300 USD", spots: "8/16", desc: "El paso previo a la gloria. Competencia feroz por el ascenso directo.", icon: Medal, color: "text-slate-300" },
      { id: "ascenso", name: "Liga Ascenso", level: "Tercera División", prize: "$150 USD", spots: "12/20", desc: "Equipos en formación buscando demostrar su valor táctico.", icon: Swords, color: "text-orange-700" },
      { id: "anfa", name: "Liga ANFA", level: "División Amateur", prize: "Gratis", spots: "Abierto", desc: "Torneo relámpago para equipos nuevos. El semillero de talentos.", icon: Target, color: "text-primary" }
    ]
  },
  "amc": {
    name: "AMC Series",
    divisions: [
      { id: "diamond", name: "AMC Diamond", level: "Tier 1", prize: "$400 USD", spots: "Cerrado", desc: "Los mejores 10 clubes de la región sur peleando por el anillo.", icon: Trophy, color: "text-primary" },
      { id: "platinum", name: "AMC Platinum", level: "Tier 2", prize: "$200 USD", spots: "1/10", desc: "División altamente estratégica. El campeón asciende directo a Diamond.", icon: Medal, color: "text-slate-300" },
      { id: "gold", name: "AMC Gold", level: "Tier 3", prize: "$50 USD", spots: "5/16", desc: "Nivel intermedio para clubes buscando consolidar su roster.", icon: Swords, color: "text-primary/60" },
      { id: "silver", name: "AMC Silver", level: "Rookies", prize: "Puntos", spots: "Abierto", desc: "Liga de entrada sin costo para foguear nuevos talentos.", icon: Target, color: "text-muted-foreground" }
    ]
  },
  "epro": {
    name: "Epro Championship",
    divisions: [
      { id: "masters", name: "Epro Masters", level: "Profesional", prize: "$1,500 USD", spots: "0/12", desc: "Circuito cerrado. Solo por invitación directa de la organización.", icon: Trophy, color: "text-primary" },
      { id: "contenders", name: "Epro Contenders", level: "Semi-Pro", prize: "$700 USD", spots: "4/16", desc: "Los aspirantes. El Top 2 juega promoción.", icon: Medal, color: "text-primary/80" },
      { id: "futures", name: "Epro Futures", level: "Formativo", prize: "$300 USD", spots: "10/24", desc: "Liga exclusiva para academias y equipos filiales B.", icon: Swords, color: "text-primary/60" },
      { id: "open", name: "Epro Open", level: "Comunidad", prize: "Cupo", spots: "Abierto", desc: "Torneo abierto de fin de semana para clasificar.", icon: Target, color: "text-primary/40" }
    ]
  },
  "lvp": {
    name: "LVP Masters",
    divisions: [
      { id: "superliga", name: "Superliga", level: "Honor", prize: "$3,000 USD", spots: "Cerrado", desc: "El torneo más prestigioso. Transmisión oficial en Twitch.", icon: Trophy, color: "text-yellow-500" },
      { id: "promesas", name: "Liga Promesas", level: "Segunda", prize: "$1,000 USD", spots: "Cerrado", desc: "El infierno del ascenso. Partidos de alta tensión.", icon: Medal, color: "text-slate-300" },
      { id: "tormenta", name: "Circuito Tormenta", level: "Tercera", prize: "$500 USD", spots: "Cerrado", desc: "Circuito amateur oficial apoyado por desarrolladores.", icon: Swords, color: "text-primary" },
      { id: "clasificatorio", name: "Clasificatorio", level: "Previa", prize: "Cupo", spots: "Finalizado", desc: "Clasificatorios masivos de eliminación directa.", icon: Target, color: "text-destructive" }
    ]
  }
}

export default async function TorneoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: torneoId } = await params
  const torneo = TOURNAMENT_DETAILS[torneoId as keyof typeof TOURNAMENT_DETAILS]

  if (!torneo) {
    return (
      <div className="container mx-auto px-4 py-32 text-center text-foreground">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Torneo no encontrado</h1>
        <Link href="/torneos" className="mt-8 inline-block">
          <Button variant="outline" className="font-black uppercase tracking-widest text-xs">Volver a Competiciones</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700 max-w-7xl relative text-foreground">
      {/* Brillo de fondo centralizado con el color de la marca */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
      
      <Link href="/torneos" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ChevronLeft className="h-4 w-4 mr-1" /> Volver al Directorio
      </Link>

      <div className="space-y-4 mb-16 border-b border-border/50 pb-12">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1 border-primary/30 text-primary bg-primary/5 rounded-full">
          Sistema de Ligas Oficial
        </Badge>
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
          {torneo.name.split(" ")[0]} <span className="text-primary">{torneo.name.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-2xl text-sm md:text-base italic">
          Selecciona la división que mejor se adapte al nivel táctico de tu plantilla.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {torneo.divisions.map((div) => {
          const isClosed = div.spots === "Cerrado" || div.spots === "Finalizado"

          return (
            <Card key={div.id} className={cn(
              "group relative overflow-hidden bg-card border-border transition-all duration-300 rounded-[var(--radius)]",
              isClosed ? "opacity-60 grayscale-[40%]" : "hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1"
            )}>
              <CardHeader className="border-b border-border/50 bg-secondary/20 p-6 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[calc(var(--radius)-4px)] bg-background border border-border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <div className={div.color}><div.icon className="h-7 w-7" /></div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black italic uppercase tracking-tighter text-foreground leading-none">{div.name}</CardTitle>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 opacity-70">{div.level}</p>
                  </div>
                </div>
                <Badge variant={isClosed ? "outline" : "default"} className={cn(
                  "uppercase font-black text-[9px] tracking-widest px-2 py-0.5 rounded-full",
                  !isClosed ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-border text-muted-foreground"
                )}>
                  {isClosed ? div.spots : "Disponible"}
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground font-medium mb-6 min-h-[40px] leading-relaxed uppercase italic">
                  {div.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-secondary/30 rounded-[calc(var(--radius)-4px)] p-3 border border-border/50 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Prize Pool</p>
                    <p className="font-black text-foreground text-sm tracking-tight">{div.prize}</p>
                  </div>
                  <div className="bg-secondary/30 rounded-[calc(var(--radius)-4px)] p-3 border border-border/50 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Cupos</p>
                    <p className={cn(
                      "font-black text-sm tracking-tight",
                      isClosed ? "text-destructive" : "text-primary italic"
                    )}>{div.spots}</p>
                  </div>
                </div>

                <Link href={`/torneos/${torneoId}/${div.id}`} className="block w-full">
                  <Button 
                    className="w-full h-12 font-black uppercase tracking-widest text-[10px] rounded-[calc(var(--radius)-2px)]" 
                    variant={isClosed ? "secondary" : "default"} 
                    disabled={isClosed}
                  >
                    {isClosed ? "Inscripción Cerrada" : `Ingresar al Lobby ${div.name}`}
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

export function generateStaticParams() {
  return [
    { id: 'espacio-gamer' },
    { id: 'amc' },
    { id: 'epro' },
    { id: 'lvp' }
  ]
}