"use client"

import { Bell, Search, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator" // <--- Importado correctamente
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserStore } from "@/store/useUserStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardNavbar() {
    const logout = useUserStore((state) => state.logout)

  return (
    <header className="h-16 border-b bg-card/40 flex items-center px-8 justify-between backdrop-blur-sm">
      <div className="relative w-full max-w-md hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Buscar torneos, jugadores..." 
          className="w-full bg-secondary/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
        </Button>

        <Separator orientation="vertical" className="h-6 mx-2" /> {/* Ya no dará error */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-border">
              <Avatar className="h-full w-full">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
                <DropdownMenuItem 
                onClick={() => logout()} 
                className="text-red-500 cursor-pointer font-bold"
                >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}