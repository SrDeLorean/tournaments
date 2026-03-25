"use client"

import { 
  Trophy, Swords, Map, Coins, 
  Gamepad2, Clock, ShieldAlert, MonitorPlay 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function InfografiaPublicPage() {
  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-16">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1 text-primary border-primary/30 bg-primary/10">
          Manual de la Liga
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Info<span className="text-primary">grafía</span> Oficial
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          Todo lo que necesitas saber sobre el formato competitivo, distribución de premios y reglamentación oficial de TourneyOS.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* =========================================
            COLUMNA 1 y 2: FORMATO DEL TORNEO (Ancho)
            ========================================= */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card border-border shadow-lg overflow-hidden relative">
            {/* Brillo de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
                <Map className="h-6 w-6 text-primary" /> Ruta hacia la Gloria
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                
                {/* Línea conectora (Desktop) */}
                <div className="hidden sm:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border/50 z-0" />

                {/* FASE 1 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center shadow-md">
                    <Swords className="h-8 w-8 text-foreground" />
                  </div>
                  <Badge variant="outline" className="bg-background">Fase 1</Badge>
                  <h3 className="font-black uppercase tracking-tight text-foreground">Temporada Regular</h3>
                  <p className="text-xs text-muted-foreground font-medium">Liga de ida y vuelta. Todos contra todos. Los mejores 8 clasifican.</p>
                </div>

                {/* FASE 2 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-md">
                    <MonitorPlay className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30">Fase 2</Badge>
                  <h3 className="font-black uppercase tracking-tight text-foreground">Playoffs (Eliminatorias)</h3>
                  <p className="text-xs text-muted-foreground font-medium">Cuartos y Semifinales a partido doble con gol de oro en caso de empate.</p>
                </div>

                {/* FASE 3 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center shadow-md shadow-yellow-500/10">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-500/30 dark:text-yellow-500">Fase 3</Badge>
                  <h3 className="font-black uppercase tracking-tight text-foreground">Gran Final</h3>
                  <p className="text-xs text-muted-foreground font-medium">Partido único casteado en vivo. El ganador se lleva la gloria y el premio mayor.</p>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* REGLAS DE PARTIDO (Bento Pequeño) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-card border-border shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary border border-border shrink-0">
                  <Gamepad2 className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-sm">Configuración Base</h4>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground font-medium">
                    <li>• Duración: <span className="text-foreground font-bold">6 Minutos / Mitad</span></li>
                    <li>• Dificultad: <span className="text-foreground font-bold">Clase Mundial</span></li>
                    <li>• Clima: <span className="text-foreground font-bold">Despejado</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary border border-border shrink-0">
                  <ShieldAlert className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-sm">Sanciones</h4>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground font-medium">
                    <li>• Desconexión: <span className="text-foreground font-bold">Derrota 0-3</span></li>
                    <li>• Toxicidad: <span className="text-foreground font-bold">Baneo de 1 Jornada</span></li>
                    <li>• Plantilla Ilegal: <span className="text-foreground font-bold">Expulsión</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* =========================================
            COLUMNA 3: PRIZE POOL (Vertical)
            ========================================= */}
        <div className="space-y-6">
          <Card className="bg-card border-border shadow-xl h-full flex flex-col relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none" />
            
            <CardHeader className="text-center pb-2 relative z-10">
              <Badge className="mx-auto bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/30">
                Prize Pool Oficial
              </Badge>
              <CardTitle className="text-3xl font-black italic uppercase tracking-tighter mt-4">
                $5,000 <span className="text-sm text-muted-foreground">USD</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 flex-1 flex flex-col justify-center gap-4 relative z-10">
              
              {/* 1er Lugar */}
              <div className="bg-background border border-yellow-500/30 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_15px_rgba(234,179,8,0.1)] relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black italic text-yellow-500">1°</span>
                  <div>
                    <p className="font-black uppercase text-sm">Campeón</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Premio Mayor + Trofeo</p>
                  </div>
                </div>
                <span className="text-xl font-black text-foreground">$3,000</span>
              </div>

              {/* 2do Lugar */}
              <div className="bg-background border border-border rounded-2xl p-4 flex items-center justify-between">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-400" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black italic text-zinc-400">2°</span>
                  <div>
                    <p className="font-black uppercase text-sm">Subcampeón</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Premio en Metálico</p>
                  </div>
                </div>
                <span className="text-xl font-black text-foreground">$1,500</span>
              </div>

              {/* 3er Lugar */}
              <div className="bg-background border border-border rounded-2xl p-4 flex items-center justify-between">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-700 dark:bg-orange-800" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black italic text-orange-700 dark:text-orange-600">3°</span>
                  <div>
                    <p className="font-black uppercase text-sm">Tercer Lugar</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Reembolso Inscripción</p>
                  </div>
                </div>
                <span className="text-xl font-black text-foreground">$500</span>
              </div>

              {/* MVP de la temporada */}
              <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border text-center">
                <Trophy className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs font-bold text-foreground uppercase tracking-tight">Bonus: MVP del Torneo</p>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">Silla Gamer Patrocinada + $100</p>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}