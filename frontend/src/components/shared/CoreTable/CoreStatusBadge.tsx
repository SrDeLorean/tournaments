import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  active: boolean;
  labels?: [string, string]; // [TrueLabel, FalseLabel]
}

export function CoreStatusBadge({ active, labels = ["ACTIVO", "INACTIVO"] }: StatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-[9px] font-black px-3 py-1 border-2 rounded-none -skew-x-12 transition-all",
        active ? "border-primary text-primary bg-primary/5" : "border-destructive text-destructive bg-destructive/5"
      )}
    >
      <span className="skew-x-12 block uppercase italic tracking-tighter">
        {active ? labels[0] : labels[1]}
      </span>
    </Badge>
  )
}