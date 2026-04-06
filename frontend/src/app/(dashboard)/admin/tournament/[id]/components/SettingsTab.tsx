import { Settings, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
  editName: string
  setEditName: (val: string) => void
  editStatus: string
  setEditStatus: (val: string) => void
  onUpdate: (e: React.FormEvent) => void
  onDelete: () => void
  isProcessing: boolean
}

export const SettingsTab = ({ 
  editName, setEditName, editStatus, setEditStatus, onUpdate, onDelete, isProcessing 
}: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-300">
    
    {/* Formulario de Parámetros */}
    <div className="p-6 rounded-[var(--radius)] border border-border bg-card/50">
      <h2 className="text-lg font-black uppercase italic mb-6 text-foreground flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" /> Parámetros de Operación
      </h2>
      <form onSubmit={onUpdate} className="space-y-6">
        <div className="grid gap-2">
          <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nombre</Label>
          <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-background h-12" />
        </div>
        <div className="grid gap-2">
          <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Estado</Label>
          <select 
            value={editStatus} 
            onChange={(e) => setEditStatus(e.target.value)} 
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="OPEN">ABIERTAS (OPEN)</option>
            <option value="IN_PROGRESS">EN CURSO (IN PROGRESS)</option>
            <option value="COMPLETED">FINALIZADO (COMPLETED)</option>
          </select>
        </div>
        <Button type="submit" disabled={isProcessing} className="btn-tactical w-full h-12">
          GUARDAR CAMBIOS
        </Button>
      </form>
    </div>

    {/* Zona Roja (Delete) */}
    <div className="p-6 rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-32 h-32 bg-destructive/10 rounded-full blur-3xl" />
      <h2 className="text-lg font-black uppercase italic mb-2 text-destructive flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" /> Zona Roja
      </h2>
      <p className="text-sm text-muted-foreground mb-6 font-medium">
        Eliminar esta operación es una acción irreversible. Se aplicará un Soft Delete en el sistema.
      </p>
      <Button 
        type="button" 
        onClick={onDelete} 
        disabled={isProcessing}
        className="bg-destructive hover:bg-destructive/90 text-white font-black uppercase tracking-widest h-12 w-full shadow-[0_0_15px_rgba(255,0,0,0.2)]"
      >
        DESTRUIR OPERACIÓN
      </Button>
    </div>

  </div>
)