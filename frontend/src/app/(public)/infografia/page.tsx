"use client"

import { 
  Trophy, Swords, Map, 
  Gamepad2, ShieldAlert, MonitorPlay 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InfografiaPublicPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />

      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-6 mb-16 relative z-10">
        <Badge variant="technical">Manual de Operaciones</Badge>
        <h1 className="text-amc-title text-6xl md:text-8xl">
          Info<span className="text-glow-primary">grafía</span> Oficial
        </h1>
        <p className="text-description max-w-2xl mx-auto">
          Todo lo que necesitas saber sobre el formato competitivo, distribución de recompensas y reglamentación oficial de TourneyOS.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* COLUMNA 1 y 2: FORMATO DEL TORNEO */}
        <div className="md:col-span-2 space-y-8">
          <Card className="glass-card hover:neon-glow transition-all duration-300">
            <CardHeader className="border-b border-border/30 pb-4 bg-background/20">
              <CardTitle className="text-technical flex items-center gap-3 text-primary">
                <Map className="h-5 w-5" /> Ruta hacia la Gloria
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
                
                {/* Línea de conexión láser */}
                <div className="hidden sm:block absolute top-10 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-0" />

                {/* FASE 1 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-sm surface-panel-solid border-border flex items-center justify-center shadow-lg group hover:border-primary/50 transition-colors">
                    <Swords className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <Badge variant="outline" className="text-technical border-border">Fase 1</Badge>
                  <h3 className="font-condensed text-xl tracking-wide text-foreground">Temporada Regular</h3>
                  <p className="text-description text-sm">Liga de ida y vuelta. Todos contra todos. Los mejores 8 clasifican a la siguiente ronda.</p>
                </div>

                {/* FASE 2 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_hsla(var(--primary),0.2)] group hover:bg-primary/20 transition-colors">
                    <MonitorPlay className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="technical">Fase 2</Badge>
                  <h3 className="font-condensed text-xl tracking-wide text-foreground">Playoffs</h3>
                  <p className="text-description text-sm">Cuartos y Semifinales a partido doble. Formato de muerte súbita con gol de oro en empate.</p>
                </div>

                {/* FASE 3 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-sm bg-yellow-500/10 border border-yellow-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)] group hover:bg-yellow-500/20 transition-colors">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                  <Badge variant="outline" className="text-technical border-yellow-500/50 text-yellow-500">Fase 3</Badge>
                  <h3 className="font-condensed text-xl tracking-wide text-yellow-500">Gran Final</h3>
                  <p className="text-description text-sm">Partido único casteado en vivo. El ganador se lleva la gloria eterna y el premio mayor.</p>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* REGLAS DE PARTIDO (Superficies semánticas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Card className="surface-panel border-transparent hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-sm surface-panel-solid border-border shrink-0">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-condensed text-lg tracking-wide text-foreground">Configuración Base</h4>
                  <ul className="mt-3 space-y-2 text-description">
                    <li className="flex items-center justify-between border-b border-border/30 pb-2">
                      <span>Duración:</span> <span className="font-condensed text-foreground">6 MINUTOS / MITAD</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-border/30 pb-2">
                      <span>Dificultad:</span> <span className="font-condensed text-foreground">CLASE MUNDIAL</span>
                    </li>
                    <li className="flex items-center justify-between pb-1">
                      <span>Clima:</span> <span className="font-condensed text-foreground">DESPEJADO</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="surface-panel border-transparent hover:border-destructive/30 transition-colors">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-sm bg-destructive/10 border border-destructive/20 shrink-0">
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                </div>
                <div className="w-full">
                  <h4 className="font-condensed text-lg tracking-wide text-foreground">Sanciones Activas</h4>
                  <ul className="mt-3 space-y-2 text-description">
                    <li className="flex items-center justify-between border-b border-border/30 pb-2">
                      <span>Desconexión:</span> <span className="text-technical text-destructive">DERROTA 0-3</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-border/30 pb-2">
                      <span>Toxicidad:</span> <span className="text-technical text-foreground">BANEO TEMPORADA</span>
                    </li>
                    <li className="flex items-center justify-between pb-1">
                      <span>Plantilla Ilegal:</span> <span className="text-technical text-destructive">EXPULSIÓN DIRECTA</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* COLUMNA 3: PRIZE POOL */}
        <div className="space-y-8">
          <Card className="glass-card hover:neon-glow transition-all duration-300 h-full flex flex-col">
            <CardHeader className="text-center pb-4 border-b border-border/30 bg-background/20">
              <Badge variant="technical" className="mx-auto">Prize Pool Oficial</Badge>
              <CardTitle className="text-amc-title text-5xl md:text-6xl mt-4">
                $5,000 <span className="text-xl text-muted-foreground">USD</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8 flex-1 flex flex-col gap-4 justify-center">
              
              {/* 1er Lugar */}
              <div className="surface-panel-solid border-primary/30 p-4 flex items-center justify-between shadow-[0_0_15px_hsla(var(--primary),0.1)] relative overflow-hidden group hover:border-primary/60 transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-2 transition-all" />
                <div className="flex items-center gap-4 pl-2">
                  <span className="font-display text-4xl text-primary">1°</span>
                  <div>
                    <p className="font-condensed text-lg text-foreground tracking-wide">CAMPEÓN</p>
                    <p className="text-technical text-muted-foreground mt-0.5">Trofeo + Cash</p>
                  </div>
                </div>
                <span className="font-display text-3xl text-foreground">$3,000</span>
              </div>

              {/* 2do Lugar */}
              <div className="surface-panel-solid p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground/40" />
                <div className="flex items-center gap-4 pl-2">
                  <span className="font-display text-4xl text-foreground/40">2°</span>
                  <div>
                    <p className="font-condensed text-lg text-foreground tracking-wide">SUBCAMPEÓN</p>
                    <p className="text-technical text-muted-foreground mt-0.5">Premio Plata</p>
                  </div>
                </div>
                <span className="font-display text-3xl text-foreground">$1,500</span>
              </div>

              {/* 3er Lugar */}
              <div className="surface-panel-solid p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/40" />
                <div className="flex items-center gap-4 pl-2">
                  <span className="font-display text-4xl text-muted-foreground/40">3°</span>
                  <div>
                    <p className="font-condensed text-lg text-foreground tracking-wide">FINALISTA</p>
                    <p className="text-technical text-muted-foreground mt-0.5">Inscripción</p>
                  </div>
                </div>
                <span className="font-display text-3xl text-foreground">$500</span>
              </div>

              <div className="mt-6 p-4 rounded-sm bg-primary/10 border border-primary/30 text-center animate-pulse">
                <Trophy className="h-6 w-6 text-primary mx-auto mb-3" />
                <p className="font-condensed tracking-wide text-foreground">BONUS: MVP DE LA TEMPORADA</p>
                <p className="text-technical text-primary mt-1">Silla Gamer + $100</p>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}