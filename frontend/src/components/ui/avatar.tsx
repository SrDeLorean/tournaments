"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    /* INYECCIÓN TÁCTICA:
       1. rounded-md en lugar de rounded-full para un look más agresivo (cuadrado técnico).
       2. Borde sutil y fondo translúcido (glass).
    */
    className={cn(
      "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border/50 bg-background/50 shadow-md transition-all hover:border-primary/50 hover:shadow-[0_0_15px_hsla(var(--primary),0.2)]",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    /* INYECCIÓN TÁCTICA: Tipografía AMC para las iniciales si no hay imagen */
    className={cn(
      "flex h-full w-full items-center justify-center rounded-md bg-primary/10 text-primary font-display italic text-xl tracking-wider",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }