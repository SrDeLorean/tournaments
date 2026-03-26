"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      /* INYECCIÓN TÁCTICA: Degradado (gradient-to-r o gradient-to-b) simulando un escaneo */
      className={cn(
        "shrink-0",
        orientation === "horizontal"
          ? "h-[1px] w-full bg-gradient-to-r from-transparent via-border/70 to-transparent"
          : "h-full w-[1px] bg-gradient-to-b from-transparent via-border/70 to-transparent",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }