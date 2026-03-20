"use client"

import Link from "next/link"
import { Trophy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:rotate-12">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">
            Tourney<span className="text-primary">OS</span>
          </span>
        </Link>

        {/* LINKS DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
          <Link href="/tournaments" className="text-muted-foreground hover:text-primary transition-colors">Torneos</Link>
          <Link href="/rankings" className="text-muted-foreground hover:text-primary transition-colors">Rankings</Link>
          <Link href="/teams" className="text-muted-foreground hover:text-primary transition-colors">Equipos</Link>
        </nav>

        {/* ACCIONES */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="font-bold">INGRESAR</Button>
            </Link>
            <Link href="/register">
              <Button className="font-black italic shadow-lg shadow-primary/20">UNIRSE</Button>
            </Link>
          </div>

          {/* MENU MÓVIL (Solo icono) */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild><Link href="/tournaments">Torneos</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/rankings">Rankings</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login">Iniciar Sesión</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}