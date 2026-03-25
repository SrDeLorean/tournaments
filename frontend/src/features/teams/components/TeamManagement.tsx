"use client"

import { MOCK_TEAMS, Player } from "@/lib/mock-data"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  MoreHorizontal, 
  ShieldAlert, 
  UserPlus, 
  TrendingUp
} from "lucide-react"

interface TeamManagementProps {
  teamName: string;
  isGlobalAdmin: boolean;
  players?: any[];
}

export function TeamManagement({ teamName, isGlobalAdmin }: TeamManagementProps) {
  const teamData = MOCK_TEAMS[teamName] || { players: [] };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 text-foreground">
      
      {/* CABECERA - Usando Tokens Dinámicos */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">
            Roster: <span className="text-primary">{teamName}</span>
          </h2>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-black mt-1">
            Temporada 2026 • División Pro
          </p>
        </div>

        <Button className="font-black italic uppercase tracking-widest text-xs bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-[var(--radius)]">
          <UserPlus className="mr-2 h-4 w-4" />
          Reclutar Jugador
        </Button>
      </div>

      {/* TABLA - Centralizando Bordes y Fondos */}
      <div className="rounded-[var(--radius)] border border-border bg-card/30 backdrop-blur-sm overflow-hidden shadow-xl">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[300px] font-black uppercase text-[10px] tracking-widest py-4 text-muted-foreground">Operador / Jugador</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Especialidad</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Disponibilidad</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-right text-muted-foreground">Performance (KDA)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamData.players.length > 0 ? (
              teamData.players.map((player: Player) => (
                <TableRow key={player.id} className="hover:bg-primary/5 transition-all border-border/50 group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/10 group-hover:border-primary/40 transition-colors rounded-[calc(var(--radius)-4px)]">
                        <AvatarImage src={player.avatar} alt={player.nickname} className="object-cover" />
                        <AvatarFallback className="font-black bg-secondary text-muted-foreground">
                          {player.nickname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-black italic uppercase text-base leading-none tracking-tight">
                            {player.nickname}
                          </span>
                          <span className="text-[9px] bg-secondary px-1.5 py-0.5 rounded font-black border border-border uppercase">
                            {player.country}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest opacity-70">
                          {player.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        {player.role}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {/* Badges Semánticos: Usamos primary, secondary y destructive */}
                    <Badge variant="outline" className={cn(
                      "text-[9px] uppercase font-black px-2.5 py-0.5 tracking-tighter border-2 rounded-full",
                      player.status === "Active" && "text-primary border-primary/20 bg-primary/5",
                      player.status === "Trial" && "text-foreground/60 border-border bg-secondary/50",
                      player.status === "Benched" && "text-destructive border-destructive/20 bg-destructive/5"
                    )}>
                      {player.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TrendingUp className="h-3 w-3 text-primary opacity-50" />
                      <span className="font-mono text-lg font-black text-primary italic">
                        {player.kda}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors rounded-full">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-black uppercase text-[10px] tracking-[0.3em] italic opacity-40">
                  No se han detectado operadores en este sector.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* AVISO DE ADMINISTRACIÓN - Migrado a Tokens Primary */}
      {isGlobalAdmin && (
        <div className="flex items-start gap-4 p-5 rounded-[var(--radius)] border-2 border-dashed border-primary/30 bg-primary/5 animate-in slide-in-from-bottom-2 duration-500">
          <div className="p-2 rounded-[calc(var(--radius)-4px)] bg-primary/10">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-primary uppercase italic tracking-widest">
              Privilegios de Nivel: Administrador Global
            </p>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-bold uppercase italic opacity-80">
              Visualizando Roster de <span className="text-foreground underline decoration-primary/50">{teamName}</span>. 
              Autorización total para gestión de contratos y estadísticas.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}