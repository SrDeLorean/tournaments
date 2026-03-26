import Link from "next/link"
import { ChevronLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* 1. BOTÓN VOLVER (Táctico) */}
      <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2 text-technical text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
      </div>

      {/* 2. LADO IZQUIERDO: PANEL VISUAL TÁCTICO */}
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex border-r border-border/50 overflow-hidden bg-background">
        {/* Fondo de carbono y viñeta */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-background/50 to-background" />
        
        {/* Brillo Ambiental Central */}
        <div className="ambient-glow-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30" />
        
        {/* LOGO */}
        <div className="relative z-20 flex items-center gap-3 group">
          <Shield className="h-8 w-8 text-primary group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(232,0,29,0.8)]" />
          <span className="text-amc-title text-3xl">
            Tourney<span className="text-primary">OS</span>
          </span>
        </div>
        
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-4">
            <p className="font-display text-6xl uppercase leading-[0.9] drop-shadow-lg">
              El éxito no es un accidente <br /> <span className="text-primary">es el resultado del esfuerzo</span>
            </p>
            <footer className="text-technical text-primary/80 tracking-widest border-l-2 border-primary pl-3">
              TourneyOS - Plataforma Competitiva
            </footer>
          </blockquote>
        </div>
      </div>

      {/* 3. LADO DERECHO: FORMULARIOS */}
      <div className="flex items-center justify-center h-full p-8 bg-background relative">
        <div className="relative z-10 w-full max-w-sm">
          {children}
        </div>
      </div>
      
    </div>
  )
}