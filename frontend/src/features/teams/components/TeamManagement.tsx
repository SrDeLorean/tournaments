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
import { cn } from "@/lib/utils" // Importación estándar de shadcn
import { 
  MoreHorizontal, 
  ShieldAlert, 
  UserPlus, 
  TrendingUp,
  MapPin
} from "lucide-react"

interface TeamManagementProps {
  teamName: string;
  isGlobalAdmin?: boolean;
}

export function TeamManagement({ teamName, isGlobalAdmin }: TeamManagementProps) {
  // Obtenemos los datos del equipo desde nuestro archivo de pruebas
  const teamData = MOCK_TEAMS[teamName] || { players: [] };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* CABECERA DE LA SECCIÓN */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">
            Roster: <span className="text-primary">{teamName}</span>
          </h2>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-bold mt-1">
            Temporada 2026 • División Pro
          </p>
        </div>

        <Button className="font-black italic uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
          <UserPlus className="mr-2 h-4 w-4" />
          Reclutar Jugador
        </Button>
      </div>

      {/* TABLA DE JUGADORES */}
      <div className="rounded-2xl border border-primary/10 bg-card/30 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow className="hover:bg-transparent border-primary/10">
              <TableHead className="w-[300px] font-black uppercase text-[10px] tracking-widest py-4">Operador / Jugador</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest">Especialidad</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest">Disponibilidad</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-right">Performance (KDA)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamData.players.length > 0 ? (
              teamData.players.map((player: Player) => (
                <TableRow key={player.id} className="hover:bg-primary/5 transition-all border-primary/5 group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/10 group-hover:border-primary/40 transition-colors">
                        <AvatarImage src={player.avatar} alt={player.nickname} />
                        <AvatarFallback className="font-black">{player.nickname[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-black italic uppercase text-base leading-none tracking-tight">
                            {player.nickname}
                          </span>
                          <span className="text-[10px] bg-secondary px-1 rounded font-bold">{player.country}</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground font-medium mt-1 uppercase tracking-wider">
                          {player.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {player.role}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[9px] uppercase font-black px-2.5 py-0.5 tracking-tighter border-2",
                      player.status === "Active" && "text-green-500 border-green-500/20 bg-green-500/5",
                      player.status === "Trial" && "text-yellow-500 border-yellow-500/20 bg-yellow-500/5",
                      player.status === "Benched" && "text-red-500 border-red-500/20 bg-red-500/5"
                    )}>
                      {player.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      <span className="font-mono text-lg font-black text-primary">
                        {player.kda}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic uppercase text-xs tracking-widest">
                  No se han detectado operadores en este sector.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* AVISO DE ADMINISTRACIÓN GLOBAL */}
      {isGlobalAdmin && (
        <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-dashed border-orange-500/30 bg-orange-500/5 animate-pulse">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <ShieldAlert className="h-6 w-6 text-orange-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-orange-500 uppercase italic">Privilegios de Nivel: Administrador Global</p>
            <p className="text-xs text-orange-500/70 leading-relaxed font-medium">
              Estás visualizando el roster de <span className="font-bold underline">{teamName}</span>. Tienes autorización total para reasignar roles, modificar estadísticas y gestionar contratos.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}