import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  /* BASE: Solo la estructura flex y focus. El CSS Global dictará la tipografía y colores. */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* MAPEO DIRECTO AL GLOBALS.CSS */
        default: "btn-action-primary", // El rojo vibrante con neón (para UNIRSE, LOGIN, etc.)
        tactical: "btn-tactical",      // El rojo estándar táctico (para acciones secundarias)
        outline: "glass-card border-border hover:border-primary/50 text-foreground font-condensed tracking-widest text-xs",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-black uppercase italic text-xs tracking-wider",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-condensed tracking-widest text-xs",
        ghost: "hover:bg-primary/10 hover:text-primary text-technical",
        link: "text-primary underline-offset-4 hover:underline font-black uppercase italic text-xs",
      },
      size: {
        /* ALTURAS TÁCTICAS */
        default: "h-14 px-8 py-2", // Altura estándar AMC
        sm: "h-10 px-4 text-[10px]",
        lg: "h-16 px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }