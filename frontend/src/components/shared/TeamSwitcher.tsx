"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, ShieldAlert } from "lucide-react"
import { useTeamStore } from "@/store/useTeamStore"
import { Team } from "@/types/roles"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock
const myTeams: Team[] = [
  { id: "1", name: "Successors" },
  { id: "2", name: "Los Galácticos" },
]

export function TeamSwitcher() {
  const { activeTeam, setActiveTeam } = useTeamStore()

  React.useEffect(() => {
    if (!activeTeam && myTeams.length > 0) {
      setActiveTeam(myTeams[0])
    }
  }, [activeTeam, setActiveTeam])

  if (!activeTeam) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* El botón ahora es un panel de superficie que reacciona en hover */}
        <Button 
          variant="ghost" 
          className="w-full justify-between h-16 px-3 surface-panel hover:border-primary/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            {/* Avatar Táctico (Cuadrado con borde que se ilumina en rojo al pasar el mouse) */}
            <Avatar className="h-10 w-10 border border-border group-hover:border-primary/50 transition-colors rounded-sm">
              <AvatarImage src={`https://avatar.vercel.sh/${activeTeam.name}.png`} />
              <AvatarFallback className="bg-primary/10 text-primary font-display text-2xl">
                {activeTeam.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              {/* Fuente condensada para el nombre, se vuelve rojo al hover */}
              <span className="font-condensed text-base text-foreground tracking-wide group-hover:text-primary transition-colors uppercase truncate max-w-[120px]">
                {activeTeam.name}
              </span>
              {/* Fuente técnica para el Rol */}
              <span className="text-technical text-muted-foreground mt-0.5">
                ROL // MANAGER
              </span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel className="text-technical text-muted-foreground opacity-70">
          Escuadras Activas
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {myTeams.map((team) => (
          <DropdownMenuItem 
            key={team.id} 
            onClick={() => setActiveTeam(team)}
            /* El equipo activo tiene un borde láser rojo a la izquierda y fondo iluminado */
            className={`cursor-pointer py-3 ${
              activeTeam.id === team.id 
                ? 'bg-primary/10 border-l-2 border-primary text-foreground' 
                : 'border-l-2 border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Avatar className="mr-3 h-7 w-7 rounded-sm">
              <AvatarFallback className="font-display text-lg bg-secondary/50 text-foreground">
                {team.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-condensed tracking-wide uppercase text-sm">{team.name}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        {/* Acción de Registrar Equipo con estética de comando */}
        <DropdownMenuItem className="cursor-pointer py-3 text-primary focus:bg-primary/10 focus:text-primary group">
          <Plus className="mr-3 h-4 w-4 group-hover:scale-125 transition-transform" />
          <span className="font-condensed tracking-wide uppercase text-sm">Registrar Escuadra</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}