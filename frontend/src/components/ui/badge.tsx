import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  /* INYECCIÓN TÁCTICA: Letra muy pequeña, negra, mayúscula, itálica y muy espaciada.
     Bordes cortados (rounded-sm) en lugar de pastillas (rounded-full).
  */
  "inline-flex items-center rounded-sm border px-3 py-1 text-[9px] font-black uppercase italic tracking-[0.15em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        /* Mapeo de colores AMC con efectos de brillo sutiles */
        default:
          "border-transparent bg-primary text-white shadow-[0_0_10px_hsla(var(--primary),0.3)] hover:brightness-110",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-white shadow-[0_0_10px_hsla(var(--destructive),0.3)] hover:brightness-110",
        /* El outline ahora parece un marco de cristal holográfico */
        outline: "text-foreground border-border/50 bg-background/20 backdrop-blur-sm",
        /* Nueva variante técnica exclusiva para datos duros (Ej: "v1.2.0" o "ONLINE") */
        technical: "text-technical border-primary/30 bg-primary/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }