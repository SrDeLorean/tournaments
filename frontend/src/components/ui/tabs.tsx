"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    /* INYECCIÓN TÁCTICA: glass-card sutil para el contenedor de las pestañas */
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-sm bg-background/40 border border-border/30 p-1 text-muted-foreground backdrop-blur-sm",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    /* INYECCIÓN TÁCTICA:
       1. Fuente técnica (text-technical) para inactivos.
       2. Cuando está ACTIVO: Fondo rojo, texto blanco blindado y resplandor neón.
    */
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-2 transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
      "text-technical opacity-70 hover:opacity-100",
      "data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:opacity-100 data-[state=active]:shadow-[0_0_15px_hsla(var(--primary),0.4)] data-[state=active]:text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    /* INYECCIÓN TÁCTICA: Animación de fundido hacia arriba al cambiar de pestaña */
    className={cn(
      "mt-6 ring-offset-background focus-visible:outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-500",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }