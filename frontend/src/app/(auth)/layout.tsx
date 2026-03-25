import Link from "next/link"
import { ChevronRight, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* 1. BOTÓN VOLVER (A la DERECHA) */}
      <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2 font-bold text-muted-foreground hover:text-primary uppercase tracking-widest text-xs">
            Volver al inicio
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* 2. LADO IZQUIERDO: PANEL VISUAL (Compartido) */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
        
        {/* LOGO CON EFECTO GLOW */}
        <div className="relative z-20 flex items-center text-2xl font-black italic uppercase tracking-tighter">
          {/* Este div invisible es el que crea la "sombra" difuminada de color primario */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-12 bg-primary/50 blur-2xl rounded-full pointer-events-none" />
          
          <Trophy className="mr-2 h-8 w-8 text-primary relative z-10" />
          <span className="relative z-10">
            Tourney<span className="text-primary">OS</span>
          </span>
        </div>
        
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-4xl font-black italic uppercase leading-tight drop-shadow-lg">
              "El éxito no es un accidente, <br /> es el resultado de la gestión."
            </p>
            <footer className="text-sm font-bold text-primary">TourneyOS - Plataforma Competitiva</footer>
          </blockquote>
        </div>
      </div>

      {/* 3. LADO DERECHO: FORMULARIOS */}
      <div className="flex items-center justify-center h-full p-8">
        {children}
      </div>
      
    </div>
  )
}