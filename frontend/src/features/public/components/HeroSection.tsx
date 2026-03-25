// src/features/public/components/HeroSection.tsx
import { Button } from "@/components/ui/button"
import { Trophy, ArrowRight, PlayCircle } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* EFECTO DE FONDO: Grilla de E-Sports */}
      <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* BADGE SUPERIOR */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Temporada 2026 Abierta
          </span>
        </div>

        {/* TITULAR PRINCIPAL */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
          Lleva a <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">Tu equipo</span> <br />
          al siguiente nivel
        </h1>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          La plataforma definitiva para gestionar torneos, trackear estadísticas 
          y profesionalizar tu equipo de E-Sports. Diseñada por y para competidores.
        </p>

        {/* ACCIONES */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-16 px-10 text-xl font-black italic uppercase group shadow-[0_0_20px_rgba(var(--primary),0.4)]">
            CREAR EQUIPO
            <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-black italic uppercase border-2">
            <PlayCircle className="mr-2 h-6 w-6 text-primary" />
            VER TOURNEYS
          </Button>
        </div>

        {/* STATS RÁPIDOS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border/50 py-10">
          <div>
            <p className="text-4xl font-black italic text-foreground">120+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Torneos</p>
          </div>
          <div>
            <p className="text-4xl font-black italic text-foreground">1.5k</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Jugadores</p>
          </div>
          <div>
            <p className="text-4xl font-black italic text-foreground">$5k</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">En Premios</p>
          </div>
          <div>
            <p className="text-4xl font-black italic text-foreground">99%</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Fair Play</p>
          </div>
        </div>
      </div>
    </div>
  )
}