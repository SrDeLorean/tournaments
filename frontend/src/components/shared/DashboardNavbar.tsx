"use client"

import Link from "next/link"
import { useUserStore } from "@/store/useUserStore"
import { 
  Bell, 
  Search, 
  LogOut, 
  User, 
  Settings, 
  ChevronDown,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardNavbar() {
  const { username, role, logout } = useUserStore()

  // 🧠 MAGIA AQUÍ: Creamos la ruta base dinámicamente según el rol
  // Si role es "admin", basePath será "/admin". 
  const basePath = role ? `/${role}` : "/login"

  return (
    <header className="h-16 border-b bg-card/40 backdrop-blur-md flex items-center px-8 justify-between sticky top-0 z-30 shrink-0">
      
      {/* --- BUSCADOR --- */}
      <div className="relative w-full max-w-sm hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Buscar en TourneyOS..." 
          className="w-full bg-secondary/50 border-none rounded-lg py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary/50 transition-all placeholder:italic"
        />
      </div>

      {/* --- ACCIONES DERECHA --- */}
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-full animate-pulse"></span>
        </Button>

        <Separator orientation="vertical" className="h-8 mx-2 opacity-50" />

        {/* --- DROPDOWN DE PERFIL --- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-1 pr-2 h-10 gap-2 hover:bg-secondary/80 rounded-full transition-all">
              <Avatar className="h-8 w-8 border border-primary/20 bg-card">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
                <AvatarFallback className="font-bold text-primary">
                  {username?.slice(0, 2).toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start hidden sm:flex">
                <span className="text-xs font-black uppercase italic leading-none">{username || "Usuario"}</span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
            <DropdownMenuLabel>
              <p className="text-sm font-bold uppercase italic">{username || "Usuario"}</p>
              <p className="text-xs text-muted-foreground capitalize">{role || "Invitado"}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Links Dinámicos usando asChild para que funcione con Next/Link */}
            <DropdownMenuItem asChild className="cursor-pointer group">
              <Link href={`${basePath}/profile`} className="flex w-full items-center">
                <User className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                Mi Perfil
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="cursor-pointer group">
              <Link href={`${basePath}/settings`} className="flex w-full items-center">
                <Settings className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                Ajustes
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer group">
              <Link href={`${basePath}/information`} className="flex w-full items-center">
                <Info className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                Información / Soporte
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => {
                if(window.confirm("¿Seguro que deseas salir?")) logout();
              }} 
              className="text-red-500 font-bold cursor-pointer focus:bg-red-500/10 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}