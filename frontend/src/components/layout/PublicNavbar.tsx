"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Menu, Shield, LogIn, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const ThemeSwitcher = () => (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="relative hover:bg-primary/10 hover:text-primary transition-colors"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )

  return (
    /* INYECCIÓN TÁCTICA: glass-card sutil para el Navbar principal */
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <Trophy className="h-8 w-8 text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(232,0,29,0.8)] transition-all" />
          <span className="text-amc-title text-3xl">
            Tourney<span className="text-primary">OS</span>
          </span>
        </Link>

        {/* --- ENLACES (Desktop - XL) --- */}
        <div className="hidden xl:flex items-center gap-2">
          {publicLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link key={link.name} href={link.href}>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "text-technical h-10 px-4 rounded-sm transition-all",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_hsla(var(--primary),0.1)]" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  {link.name}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* --- BOTONES DE ACCIÓN (Desktop) --- */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeSwitcher />
          
          <Separator orientation="vertical" className="h-8 opacity-50" />
          
          <Link href="/login">
            <Button variant="ghost" className="text-technical text-muted-foreground hover:text-primary">
              INGRESAR
            </Button>
          </Link>
          
          <Link href="/register">
            <Button variant="default">
              UNIRSE A LA LIGA
            </Button>
          </Link>
        </div>

        {/* --- MENÚ MÓVIL (Hamburguesa) --- */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeSwitcher />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            
            {/* El Sheet ya inyecta el glass-card desde nuestro ui/sheet.tsx */}
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                
                <SheetHeader className="pb-6 border-b border-border/30 mb-6">
                  <SheetTitle className="text-left flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="text-amc-title text-2xl">Tourney<span className="text-primary">OS</span></span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-2 overflow-y-auto">
                  {publicLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href)
                    return (
                      <Link 
                        key={link.name} 
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center h-12 px-4 rounded-sm text-technical transition-colors border border-transparent",
                          isActive 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border/50"
                        )}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-auto pt-6 border-t border-border/30 space-y-4">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full">
                    <Button variant="outline" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" /> INGRESAR
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="block w-full">
                    <Button variant="default" className="w-full">
                      UNIRSE A LA LIGA
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