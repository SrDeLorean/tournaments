"use client"

import { useState, useEffect, useCallback } from "react"
import { userService } from "@/features/users/user.service"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { 
  MoreHorizontal, ShieldAlert, UserPlus, Search, 
  Loader2, DatabaseZap, LayoutGrid, Trash2, 
  UserCog, RefreshCcw, CheckCircle2 
} from "lucide-react"
import { toast } from "sonner"

// Componentes internos
import { UserForm } from "@/features/users/components/UserForm"

interface TeamManagementProps {
  teamName: string;
  teamId: string;
  isGlobalAdmin: boolean;
}

export function TeamManagement({ teamName, teamId, isGlobalAdmin }: TeamManagementProps) {
  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState(false)
  
  // Estados de UI
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  
  // Estados de Búsqueda para Reclutamiento
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // --- 1. OBTENER ROSTER ACTUAL ---
  const fetchRoster = useCallback(async () => {
    try {
      setLoading(true)
      const data = await userService.getUsersByTeam(teamName) 
      setPlayers(data)
      setDbError(false)
    } catch (error) {
      setDbError(true)
      toast.error("ERROR DE SINCRONIZACIÓN")
    } finally {
      setLoading(false)
    }
  }, [teamName])

  useEffect(() => { fetchRoster() }, [fetchRoster])

  // --- 2. BUSCAR AGENTES LIBRES EN EL NÚCLEO ---
  const handleSearchPlayers = async () => {
    if (searchQuery.length < 3) return toast.error("MINIMO 3 CARACTERES")
    setIsSearching(true)
    try {
      const data = await userService.searchAvailablePlayers(searchQuery)
      setSearchResults(data)
    } catch (error) {
      toast.error("FALLO EN EL ESCANEO GLOBAL")
    } finally {
      setIsSearching(false)
    }
  }

  // --- 3. VINCULAR JUGADOR (FICHAR) ---
  const handleAssignPlayer = async (userId: string) => {
    try {
      // Enviamos el teamId para conectar en Prisma
      await userService.updateUser(userId, { ownerId: teamId })
      toast.success("VINCULACIÓN EXITOSA", {
        description: "El operador ha sido integrado al núcleo del equipo.",
        icon: <CheckCircle2 className="h-4 w-4 text-primary" />
      })
      setIsSheetOpen(false)
      fetchRoster()
    } catch (error) {
      toast.error("ERROR EN EL PROTOCOLO DE FICHAJE")
    }
  }

  // --- 4. DESVINCULAR (BAJA LÓGICA) ---
  const handleRemovePlayer = async (player: any) => {
    if (!confirm(`¿CONFIRMAR BAJA DE ${player.gamertag.toUpperCase()}?`)) return
    try {
      await userService.updateUser(player.id, { ownerId: null })
      toast.success("BAJA PROCESADA CORRECTAMENTE")
      fetchRoster()
    } catch (error) {
      toast.error("ERROR AL PROCESAR BAJA")
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700 text-foreground p-1">
      
      {/* HEADER: CONTROL DE ROSTER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <LayoutGrid className="h-6 w-6 text-primary" />
            OPERATIVO: <span className="text-primary">{teamName}</span>
          </h2>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-black italic mt-1">
            GESTIÓN DE INTEGRANTES // ACCESO DE ADMINISTRACIÓN
          </p>
        </div>

        <div className="flex gap-2">
           <Button variant="outline" size="icon" onClick={fetchRoster} className="rounded-none border-2 border-border/60 h-10 w-10">
             <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
           </Button>
           <Button 
             className="font-black italic uppercase tracking-widest text-[10px] bg-primary rounded-none border-b-4 border-black/20 h-10 px-6 active:translate-y-1 transition-all"
             onClick={() => { setSelectedPlayer(null); setSearchResults([]); setIsSheetOpen(true); }}
           >
             <UserPlus className="mr-2 h-4 w-4" /> RECLUTAR OPERADOR
           </Button>
        </div>
      </div>

      {/* TABLA PRINCIPAL */}
      {dbError ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-destructive bg-destructive/5 space-y-4">
          <DatabaseZap className="h-10 w-10 text-destructive animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-destructive">FALLO CRÍTICO DE SINCRONIZACIÓN</p>
        </div>
      ) : (
        <div className="border border-border/60 bg-card/20 shadow-2xl overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/40 font-black uppercase italic text-[10px]">
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="py-4 text-primary tracking-widest">IDENTIDAD_AGENTE</TableHead>
                <TableHead className="text-center tracking-widest">STATUS</TableHead>
                <TableHead className="text-center tracking-widest">EA_SYNC</TableHead>
                <TableHead className="text-right px-6 tracking-widest">ACCIONES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.length > 0 ? (
                players.map((p) => (
                  <TableRow key={p.id} className="hover:bg-primary/5 border-border/40 group transition-all">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="p-0.5 bg-primary/20 transform -skew-x-12">
                          <Avatar className="h-11 w-11 rounded-none transform skew-x-12 overflow-hidden border-2 border-background">
                            <AvatarImage src={p.avatarUrl} className="object-cover" />
                            <AvatarFallback className="font-black italic text-xs uppercase bg-secondary">
                              {p.gamertag.substring(0,2)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black italic uppercase text-sm tracking-tight group-hover:text-primary transition-colors">{p.gamertag}</span>
                          <span className="text-[9px] text-muted-foreground font-bold uppercase italic opacity-60">{p.role} // {p.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={cn("text-[9px] font-black rounded-none -skew-x-12 border-2", p.active ? "text-primary border-primary bg-primary/5" : "text-destructive border-destructive bg-destructive/5")}>
                        <span className="skew-x-12 block">{p.active ? "CONECTADO" : "OFFLINE"}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono text-[11px] font-black text-primary bg-black/5 px-3 py-1 border border-border/50 uppercase italic">
                        {p.gamertagEa || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-none" 
                          onClick={() => { setSelectedPlayer(p); setIsSheetOpen(true); }}
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-none" 
                          onClick={() => handleRemovePlayer(p)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center italic font-black uppercase text-[10px] tracking-widest opacity-20">
                    {loading ? "SINCRONIZANDO..." : "NO SE DETECTAN OPERADORES"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* FOOTER DE PRIVILEGIOS */}
      {isGlobalAdmin && (
        <div className="p-5 border-2 border-primary/30 bg-primary/5 flex items-start gap-4 hover:border-primary transition-colors">
          <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
          <div className="space-y-1">
            <p className="text-[10px] font-black text-primary uppercase italic tracking-[0.3em]">MODO SUPERADMINISTRADOR</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase italic leading-relaxed">
              AUTORIZACIÓN TOTAL SOBRE EL ROSTER DE <span className="text-foreground underline decoration-primary/50">{teamName}</span>.
            </p>
          </div>
        </div>
      )}

      {/* --- MODAL (SHEET) --- */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="border-l-4 border-primary bg-card/95 backdrop-blur-md sm:max-w-md">
          <SheetHeader className="border-b border-border/50 pb-6 text-left">
            <SheetTitle className="text-3xl font-black uppercase italic tracking-tighter">
              {selectedPlayer ? "MODIFICAR" : "RECLUTAR"} <span className="text-primary">OPERADOR</span>
            </SheetTitle>
            
            {/* ✅ CORRECCIÓN ARIA: DESCRIPCIÓN DEL DIALOGO */}
            <SheetDescription className="text-[10px] font-bold uppercase italic opacity-60">
              {selectedPlayer 
                ? `Editando perfil maestro de ${selectedPlayer.gamertag.toUpperCase()}.` 
                : "Búsqueda y vinculación de agentes libres desde el núcleo global."}
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-6">
            {selectedPlayer ? (
              /* MODO EDICIÓN */
              <UserForm 
                item={selectedPlayer} 
                onSuccess={() => { setIsSheetOpen(false); fetchRoster(); }} 
              />
            ) : (
              /* MODO RECLUTAMIENTO: BUSCADOR */
              <div className="space-y-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground opacity-50" />
                    <Input 
                      placeholder="GAMERTAG DEL AGENTE..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchPlayers()}
                      className="pl-10 rounded-none border-2 border-primary/20 bg-background font-bold uppercase italic h-10"
                    />
                  </div>
                  <Button onClick={handleSearchPlayers} disabled={isSearching} className="rounded-none font-black italic uppercase h-10">
                    {isSearching ? <Loader2 className="animate-spin" /> : "ESCANEAR"}
                  </Button>
                </div>

                <div className="space-y-2 max-h-[450px] overflow-y-auto no-scrollbar pr-1">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border-2 border-border/40 bg-secondary/10 group hover:border-primary transition-all">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-none border border-primary/20 transform -skew-x-6 overflow-hidden">
                          <AvatarImage src={user.avatarUrl} className="object-cover" />
                          <AvatarFallback className="font-black italic bg-background text-[10px]">{user.gamertag[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-black uppercase italic leading-none">{user.gamertag}</span>
                          <span className="text-[9px] font-bold opacity-40 uppercase tracking-tighter mt-1">{user.email}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleAssignPlayer(user.id)}
                        className="rounded-none hover:bg-primary hover:text-white font-black italic text-[10px] uppercase gap-2 border border-transparent hover:border-primary"
                      >
                        <UserPlus className="h-3 w-3" /> FICHAR
                      </Button>
                    </div>
                  ))}
                  {searchResults.length === 0 && !isSearching && searchQuery && (
                    <div className="text-center py-12 border-2 border-dashed border-border/40">
                      <p className="text-[10px] font-black uppercase opacity-30 italic">AGENTE NO ENCONTRADO EN EL NÚCLEO</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}