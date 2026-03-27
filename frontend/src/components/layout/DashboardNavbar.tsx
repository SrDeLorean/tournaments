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
import { Input } from "@/components/ui/input" // Usamos nuestro input blindado
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
  const basePath = role ? `/${role}` : "/login"

  return (
    <header className="h-16 border-b border-border/50 bg-card/60 backdrop-blur-xl flex items-center px-8 justify-between sticky top-0 z-30 shrink-0 transition-all">
      
      {/* --- BUSCADOR TÁCTICO --- */}
      <div className="relative w-full max-w-sm hidden md:flex items-center group">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        {/* Cambiamos el input HTML por nuestro componente UI que ya tiene borde neón y estilo */}
        <Input 
          type="text" 
          placeholder="BUSCAR OPERACIONES..." 
          className="pl-10 h-10 w-full"
        />
      </div>

      {/* --- ACCIONES DERECHA --- */}
      <div className="flex items-center gap-4 ml-auto">
        
        {/* Notificaciones (Hereda estilo táctico de variant ghost) */}
        <Button variant="ghost" size="icon" className="relative group">
          <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-primary rounded-sm shadow-[0_0_10px_hsla(var(--primary),0.8)] animate-pulse"></span>
        </Button>

        <Separator orientation="vertical" className="h-8 opacity-50" />

        {/* --- DROPDOWN DE PERFIL (Hereda glass-card automáticamente) --- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-1 pr-2 h-10 gap-2 hover:bg-secondary/20 rounded-sm transition-all border border-transparent hover:border-border/50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
                <AvatarFallback>
                  {username?.slice(0, 2).toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start hidden sm:flex">
                <span className="text-xs font-condensed tracking-wider uppercase leading-none text-foreground">{username || "OPERADOR"}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
            
            <DropdownMenuLabel className="flex flex-col gap-1 p-3">
              <p className="text-sm font-black uppercase italic tracking-tighter text-foreground">{username || "OPERADOR DESCONOCIDO"}</p>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest">{role || "Invitado"}</p>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            {/* Links Dinámicos */}
            <DropdownMenuItem asChild>
              <Link href={`${basePath}/profile`} className="w-full">
                <User className="mr-2 h-4 w-4" />
                Dossier de Operador
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href={`${basePath}/settings`} className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configuración del Sistema
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`${basePath}/information`} className="w-full">
                <Info className="mr-2 h-4 w-4" />
                Centro de Inteligencia
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onClick={() => {
                if(window.confirm("¿Confirmar desconexión del sistema?")) logout();
              }} 
              /* Forzamos el texto rojo destructivo en el hover desde el componente padre */
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Desconectar Terminal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </header>
  )
}