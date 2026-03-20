// src/components/shared/TeamSwitcher.tsx
"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
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

// Datos de prueba temporales simulando lo que vendría de tu API REST
const myTeams: Team[] = [
  { id: "1", name: "Successors" },
  { id: "2", name: "Los Galácticos" },
]

export function TeamSwitcher() {
  const { activeTeam, setActiveTeam } = useTeamStore()

  // Si no hay equipo activo, seleccionamos el primero por defecto al montar el componente
  React.useEffect(() => {
    if (!activeTeam && myTeams.length > 0) {
      setActiveTeam(myTeams[0])
    }
  }, [activeTeam, setActiveTeam])

  if (!activeTeam) return null // Evita parpadeos mientras carga

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between px-2 py-6 hover:bg-secondary">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={`https://avatar.vercel.sh/${activeTeam.name}.png`} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {activeTeam.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-bold text-foreground">{activeTeam.name}</span>
              <span className="text-xs text-muted-foreground">Manager</span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
          Mis Equipos
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {myTeams.map((team) => (
          <DropdownMenuItem 
            key={team.id} 
            onClick={() => setActiveTeam(team)}
            className={`cursor-pointer py-2 ${activeTeam.id === team.id ? 'bg-secondary' : ''}`}
          >
            <Avatar className="mr-3 h-6 w-6">
              <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                {team.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{team.name}</span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2 text-primary">
          <Plus className="mr-2 h-4 w-4" />
          <span className="font-medium">Crear / Unirse a equipo</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}