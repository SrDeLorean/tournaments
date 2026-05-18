"use client"

import { useState } from "react"
import { userService } from "@/features/users/user.service"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, UserPlus, Loader2, CheckCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

export function PlayerSelector({ teamId, onSuccess }: { teamId: string, onSuccess: () => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    if (query.length < 3) return toast.error("DIGITA AL MENOS 3 CARACTERES")
    
    setSearching(true)
    try {
      // Endpoint que busca usuarios disponibles en el Núcleo
      const data = await userService.searchAvailablePlayers(query)
      setResults(data)
    } catch (error) {
      toast.error("ERROR EN LA BÚSQUEDA")
    } finally {
      setSearching(false)
    }
  }

  const handleAssign = async (userId: string) => {
    try {
      await userService.updateUser(userId, { ownerId: teamId }) // Vinculamos al Team
      toast.success("OPERADOR ASIGNADO AL ROSTER")
      onSuccess()
    } catch (error) {
      toast.error("FALLO AL VINCULAR JUGADOR")
    }
  }

  return (
    <div className="space-y-6 pt-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="BUSCAR POR GAMERTAG O EMAIL..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-none border-2 border-primary/20 bg-background font-bold uppercase italic focus-visible:ring-primary"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} disabled={searching} className="rounded-none font-black italic uppercase">
          {searching ? <Loader2 className="animate-spin" /> : "ESCANEAR"}
        </Button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
        {results.map((user) => (
          <div 
            key={user.id} 
            className="flex items-center justify-between p-3 border-2 border-border/40 bg-secondary/5 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 rounded-none border border-primary/20 transform -skew-x-6">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="font-black italic bg-background text-[10px]">{user.gamertag[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase italic leading-none">{user.gamertag}</span>
                <span className="text-[9px] font-bold opacity-50 uppercase tracking-tighter">{user.email}</span>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => handleAssign(user.id)}
              className="rounded-none hover:bg-primary hover:text-white font-black italic text-[10px] uppercase gap-2"
            >
              <UserPlus className="h-3 w-3" /> Fichar
            </Button>
          </div>
        ))}
        
        {results.length === 0 && !searching && query && (
          <p className="text-center py-10 text-[10px] font-black uppercase opacity-30 italic">
            SIN COINCIDENCIAS EN EL NÚCLEO GLOBAL.
          </p>
        )}
      </div>
    </div>
  )
}