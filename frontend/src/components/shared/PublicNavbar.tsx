"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Menu, Shield, LogIn, Sun, Moon, Star, LayoutGrid, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle 
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// 1. LISTA COMPLETA DE RUTAS (Recuperadas)
const publicLinks = [
  { name: "Torneos", href: "/torneos" },
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
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  // Función para alternar el tema
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Componente del Botón de Sol/Luna
  const ThemeSwitcher = () => (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="relative h-9 w-9 text-muted-foreground hover:text-primary transition-colors"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )

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

        {/* ENLACES DE NAVEGACIÓN (Desktop - LG) */}
        {/* He usado 'xl' para que quepan todos los enlaces cómodamente en desktop */}
        <div className="hidden xl:flex items-center gap-1">
          {publicLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link key={link.name} href={link.href}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-all h-9 px-3 rounded-full",
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

        {/* BOTONES DE ACCIÓN (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeSwitcher />
          <div className="h-4 w-[1px] bg-border mx-2" />
          <Link href="/login">
            <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
              Ingresar
            </Button>
          </Link>
          <Link href="/register">
            <Button className="text-[10px] font-black italic uppercase tracking-widest px-6 h-9">
              Unirse
            </Button>
          </Link>
        </div>

        {/* MENÚ MÓVIL (Hamburguesa) */}
        <div className="lg:hidden flex items-center gap-1">
          <ThemeSwitcher />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border bg-background p-0">
              <div className="flex flex-col h-full">
                
                <div className="p-6 border-b border-border bg-secondary/20">
                  <SheetTitle className="text-left flex items-center gap-2 font-black italic uppercase tracking-tighter text-xl text-foreground">
                    <Shield className="h-5 w-5 text-primary" />
                    Tourney<span className="text-primary">OS</span>
                  </SheetTitle>
                </div>

                <nav className="flex flex-col p-4 overflow-y-auto">
                  {publicLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href)
                    return (
                      <Link 
                        key={link.name} 
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center h-11 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors mb-1",
                          isActive 
                            ? "bg-primary/10 text-primary" 
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-auto p-4 space-y-2 bg-secondary/10 border-t border-border">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full">
                    <Button variant="outline" className="w-full font-black uppercase tracking-widest text-[10px] h-11">
                      <LogIn className="mr-2 h-4 w-4" /> Ingresar
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="block w-full">
                    <Button className="w-full font-black italic uppercase tracking-widest text-[10px] h-11">
                      Unirse a la Liga
                    </Button>
                  </Link>
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  )
}