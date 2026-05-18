import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog"

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export function CoreDeleteDialog({ isOpen, onClose, onConfirm, itemName }: DeleteProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-none border-2 border-primary bg-card/95 backdrop-blur-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-black italic uppercase tracking-tighter text-primary">
            ¿CONFIRMAR DESACTIVACIÓN?
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed italic">
            ESTÁS A PUNTO DE DAR DE BAJA A <span className="text-foreground underline font-black">{itemName?.toUpperCase()}</span>.
            <br /><br />
            EL STATUS CAMBIARÁ A <span className="text-destructive font-black underline">INACTIVO</span>. 
            ESTA ACCIÓN REVOCARÁ EL ACCESO PERO MANTENDRÁ LA INTEGRIDAD DE LOS DATOS HISTÓRICOS Y ESTADÍSTICAS.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-2">
          <AlertDialogCancel 
            onClick={onClose}
            className="rounded-none border-2 border-border font-black uppercase italic text-[10px] tracking-widest hover:bg-secondary transition-all"
          >
            ABORTAR
          </AlertDialogCancel>
          
          <AlertDialogAction 
            onClick={onConfirm}
            className="rounded-none bg-destructive text-white font-black uppercase italic text-[10px] tracking-widest hover:bg-destructive/90 transition-all shadow-lg shadow-destructive/20"
          >
            SÍ, CONFIRMAR BAJA
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}