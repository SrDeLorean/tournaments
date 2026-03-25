"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const publicLinks = [
  { name: "Torneos", href: "/torneos" }, // <--- ¡Nuevo enlace añadido aquí!
  { name: "Partidos", href: "/partidos" },
  { name: "Clasificación", href: "/clasificacion" },
  { name: "Equipos", href: "/equipos" },
  { name: "Jugadores", href: "/jugadores" },
  { name: "TOTW / TOTS", href: "/totw" },
  { name: "Infografía", href: "/infografia" },
  { name: "Contacto", href: "/contacto" },
]
export function PublicNavbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <Trophy className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-xl font-black italic uppercase tracking-tighter text-foreground">
            Tourney<span className="text-primary">OS</span>
          </span>
        </Link>

        {/* ENLACES DE NAVEGACIÓN (Desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {publicLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link key={link.name} href={link.href}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-widest transition-all h-9 px-4 rounded-full",
                    isActive 
                      ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {link.name}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* BOTONES DE ACCIÓN (Login / Registro) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
              Ingresar
            </Button>
          </Link>
          <Link href="/register">
            <Button className="text-xs font-black italic uppercase tracking-widest">
              Unirse a la Liga
            </Button>
          </Link>
        </div>

        {/* MENÚ MÓVIL */}
        <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  )
}