import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, UserX, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function CoreTableHeader({ 
  searchTerm, setSearchTerm, showInactive, setShowInactive, 
  onPrimaryAction, primaryActionLabel, hasInactiveFilter, dbError 
}: any) {
  return (
    <div className="w-full flex flex-col gap-3 bg-card/40 p-3 sm:p-4 border border-border/50 backdrop-blur-sm relative overflow-hidden">
      
      {/* LÍNEA LED DE ESTADO */}
      <div className={cn(
        "absolute top-0 left-0 h-[2px] transition-all duration-700",
        dbError ? "bg-destructive w-full animate-pulse" : "bg-primary w-full opacity-30"
      )} />

      {/* BLOQUE 1: BUSCADOR (Siempre arriba y ancho completo) */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="BUSCAR..." 
          className="pl-9 bg-background/50 border-border/40 font-black uppercase text-[10px] tracking-[0.2em] rounded-none h-11 w-full italic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* BLOQUE 2: ACCIONES (Lado a lado en móvil, ajustado) */}
      <div className="flex items-center gap-2 w-full">
        
        {/* BOTÓN: ELIMINADOS (Ocupa espacio flexible) */}
        {hasInactiveFilter && (
          <Button
            variant={showInactive ? "destructive" : "outline"}
            size="sm"
            onClick={() => setShowInactive(!showInactive)}
            className="flex-1 h-10 px-2 sm:px-4 rounded-none border-2 font-black text-[9px] uppercase italic tracking-widest transition-all overflow-hidden"
          >
            {showInactive ? <UserCheck className="h-4 w-4 shrink-0 sm:mr-2" /> : <UserX className="h-4 w-4 shrink-0 sm:mr-2" />}
            {/* Texto dinámico: Se acorta en móviles extremos */}
            <span className="truncate">
              {showInactive ? "ACTIVOS" : "ELIMINADOS"}
            </span>
          </Button>
        )}

        {/* BOTÓN: NUEVO (Ocupa espacio flexible) */}
        {onPrimaryAction && (
          <Button 
            onClick={onPrimaryAction} 
            className="flex-1 h-10 bg-primary text-primary-foreground font-black italic uppercase tracking-widest px-2 sm:px-6 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 transition-all overflow-hidden"
          >
            <Plus className="h-4 w-4 shrink-0 sm:mr-2" />
            <span className="truncate">
              {primaryActionLabel || "NUEVO"}
            </span>
          </Button>
        )}
      </div>
    </div>
  )
}