// src/features/public/components/HeroSection.tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, ArrowRight, PlayCircle } from "lucide-react"

export function HeroSection() {
  return (
    /* Quitamos el fondo forzado porque globals.css ya aplica la viñeta y el radar */
    <div className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        
        {/* BADGE SUPERIOR: Usamos la variante técnica que creamos */}
        <Badge variant="technical" className="mb-8 px-4 py-2 flex items-center gap-2 w-fit mx-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Temporada 2026 Abierta
        </Badge>

        {/* TITULAR PRINCIPAL: Usamos text-title-pro y text-glow-primary */}
        <h1 className="text-title-pro text-6xl md:text-8xl lg:text-[10rem] mb-6">
          Lleva a <span className="text-primary text-glow-primary">Tu equipo</span> <br />
          al siguiente nivel
        </h1>

        {/* DESCRIPCIÓN: Usamos text-description */}
        <p className="text-description max-w-2xl mx-auto mb-12 text-lg">
          La plataforma definitiva para gestionar torneos, trackear estadísticas 
          y profesionalizar tu equipo de E-Sports. Diseñada por y para competidores.
        </p>

        {/* ACCIONES: Los botones ya heredan btn-action-primary y la glass-card automáticamente */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button size="lg" className="w-full sm:w-auto group">
            CREAR EQUIPO
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button size="lg" variant="outline" className="w-full sm:w-auto group">
            <PlayCircle className="mr-2 h-5 w-5 text-primary transition-transform group-hover:scale-110" />
            VER TOURNEYS
          </Button>
        </div>

        {/* STATS RÁPIDOS: Los envolvemos en una glass-card para que parezca un panel HUD */}
        <div className="mt-24 max-w-5xl mx-auto glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 animate-scanline">
          <div className="flex flex-col items-center justify-center">
            <p className="text-5xl font-display italic text-foreground mb-2">120+</p>
            <p className="text-technical">Torneos</p>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-border/30">
            <p className="text-5xl font-display italic text-foreground mb-2">1.5k</p>
            <p className="text-technical">Jugadores</p>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-border/30 hidden md:flex">
            <p className="text-5xl font-display italic text-foreground mb-2">$5k</p>
            <p className="text-technical">En Premios</p>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-border/30 hidden md:flex">
            <p className="text-5xl font-display italic text-foreground mb-2">99%</p>
            <p className="text-technical">Fair Play</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}