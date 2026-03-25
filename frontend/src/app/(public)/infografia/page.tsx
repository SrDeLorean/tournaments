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
        
        {/* COLUMNA 1 y 2: FORMATO DEL TORNEO */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card border-border shadow-lg overflow-hidden relative rounded-[var(--radius)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
                <Map className="h-6 w-6 text-primary" /> Ruta hacia la Gloria
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                
                <div className="hidden sm:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border/50 z-0" />

                {/* FASE 1 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-[calc(var(--radius)-4px)] bg-secondary border border-border flex items-center justify-center shadow-md">
                    <Swords className="h-8 w-8 text-foreground" />
                  </div>
                  <Badge variant="outline" className="bg-background border-border text-[10px] font-black uppercase">Fase 1</Badge>
                  <h3 className="font-black uppercase tracking-tight text-foreground text-sm">Temporada Regular</h3>
                  <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">Liga de ida y vuelta. Todos contra todos. Los mejores 8 clasifican.</p>
                </div>

                {/* FASE 2 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-[calc(var(--radius)-4px)] bg-primary/10 border border-primary/20 flex items-center justify-center shadow-md">
                    <MonitorPlay className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-[10px] font-black uppercase">Fase 2</Badge>
                  <h3 className="font-black uppercase tracking-tight text-foreground text-sm">Playoffs</h3>
                  <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">Cuartos y Semifinales a partido doble con gol de oro en caso de empate.</p>
                </div>

                {/* FASE 3 */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-[calc(var(--radius)-4px)] bg-primary/20 border border-primary/40 flex items-center justify-center shadow-md shadow-primary/10">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-[10px] font-black uppercase font-bold">Fase 3</Badge>
                  <h3 className="font-black uppercase tracking-tight text-foreground text-sm">Gran Final</h3>
                  <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">Partido único casteado en vivo. El ganador se lleva la gloria y el premio mayor.</p>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* REGLAS DE PARTIDO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-card border-border shadow-md rounded-[var(--radius)]">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-[calc(var(--radius)-4px)] bg-secondary border border-border shrink-0">
                  <Gamepad2 className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-sm text-foreground">Configuración Base</h4>
                  <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground font-medium">
                    <li>• Duración: <span className="text-foreground font-black uppercase">6 Minutos / Mitad</span></li>
                    <li>• Dificultad: <span className="text-foreground font-black uppercase">Clase Mundial</span></li>
                    <li>• Clima: <span className="text-foreground font-black uppercase">Despejado</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-md rounded-[var(--radius)]">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-[calc(var(--radius)-4px)] bg-destructive/10 border border-destructive/20 shrink-0">
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-sm text-foreground">Sanciones</h4>
                  <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground font-medium">
                    <li>• Desconexión: <span className="text-destructive font-black uppercase">Derrota 0-3</span></li>
                    <li>• Toxicidad: <span className="text-foreground font-black uppercase italic">Baneo Temporada</span></li>
                    <li>• Plantilla: <span className="text-foreground font-black uppercase">Expulsión</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* COLUMNA 3: PRIZE POOL */}
        <div className="space-y-6">
          <Card className="bg-card border-border shadow-xl h-full flex flex-col relative overflow-hidden rounded-[var(--radius)]">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            
            <CardHeader className="text-center pb-2 relative z-10">
              <Badge className="mx-auto bg-primary/10 text-primary hover:bg-primary/20 border-primary/30 font-black uppercase text-[9px] tracking-widest">
                Prize Pool Oficial
              </Badge>
              <CardTitle className="text-4xl font-black italic uppercase tracking-tighter mt-4 text-foreground">
                $5,000 <span className="text-xs text-muted-foreground not-italic font-bold">USD</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 flex-1 flex flex-col justify-center gap-3 relative z-10">
              
              {/* 1er Lugar - Usamos Primary para destacar al campeón en lugar de amarillo fijo */}
              <div className="bg-secondary/30 border border-primary/30 rounded-[calc(var(--radius)-2px)] p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black italic text-primary">1°</span>
                  <div>
                    <p className="font-black uppercase text-[11px] text-foreground">Campeón</p>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mt-1">Trofeo + Cash</p>
                  </div>
                </div>
                <span className="text-xl font-black text-foreground">$3,000</span>
              </div>

              {/* 2do Lugar - Usamos Foreground suavizado para plata */}
              <div className="bg-secondary/30 border border-border rounded-[calc(var(--radius)-2px)] p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground/40" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black italic text-foreground/40">2°</span>
                  <div>
                    <p className="font-black uppercase text-[11px] text-foreground">Subcampeón</p>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mt-1">Premio Plata</p>
                  </div>
                </div>
                <span className="text-xl font-black text-foreground">$1,500</span>
              </div>

              {/* 3er Lugar - Usamos Accent o Muted para bronce */}
              <div className="bg-secondary/30 border border-border rounded-[calc(var(--radius)-2px)] p-4 flex items-center justify-between relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/40" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black italic text-muted-foreground/40">3°</span>
                  <div>
                    <p className="font-black uppercase text-[11px] text-foreground">Finalista</p>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none mt-1">Inscripción</p>
                  </div>
                </div>
                <span className="text-xl font-black text-foreground">$500</span>
              </div>

              <div className="mt-4 p-4 rounded-[calc(var(--radius)-4px)] bg-primary/5 border border-primary/20 text-center">
                <Trophy className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-[10px] font-black text-foreground uppercase tracking-tight">Bonus: MVP de la temporada</p>
                <p className="text-[9px] text-muted-foreground font-medium mt-1 uppercase">Silla Gamer + $100</p>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}