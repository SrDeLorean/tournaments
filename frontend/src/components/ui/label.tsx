"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  /* INYECCIÓN TÁCTICA: 
     1. text-[10px] y tracking-[0.2em] para look técnico.
     2. peer-focus-visible:text-primary hace que el label se vuelva ROJO cuando seleccionas el input.
  */
  "text-[10px] font-black uppercase italic tracking-[0.2em] text-muted-foreground/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-40 transition-colors peer-focus-visible:text-primary select-none"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    /* Añadimos un pequeño margen inferior (mb-2) por defecto y bloque */
    className={cn(labelVariants(), "mb-2 block pl-0.5", className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }