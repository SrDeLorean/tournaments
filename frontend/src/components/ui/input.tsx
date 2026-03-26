import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        /* INYECCIÓN TÁCTICA:
           1. h-12 para emparejar con los botones grandes.
           2. bg-background/50 para que el fondo se trasluzca levemente.
           3. Focus con borde primary y sombra neón para feedback visual.
           4. Placeholders en mayúsculas y espaciados.
        */
        className={cn(
          "flex h-12 w-full rounded-sm border border-border/50 bg-background/50 px-4 py-2 text-sm italic transition-all duration-300",
          "file:border-0 file:bg-transparent file:text-sm file:font-black file:uppercase file:italic",
          "placeholder:text-muted-foreground placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest placeholder:italic",
          "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:shadow-[0_0_15px_hsla(var(--primary),0.1)]",
          "disabled:cursor-not-allowed disabled:opacity-30 disabled:grayscale",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }