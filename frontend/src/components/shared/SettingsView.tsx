"use client"

import { useEffect, useState } from "react"
import { useUserStore } from "@/store/useUserStore"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShieldAlert, BellRing, Key, MonitorSmartphone, Sun, Moon, Laptop } from "lucide-react"
import { cn } from "@/lib/utils"

export function SettingsView() {
  const { role } = useUserStore()
  
  // 1. Hooks para el cambio de tema
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitamos problemas de hidratación en Next.js esperando a que el cliente cargue
  useEffect(() => {
    setMounted(true)
  }, [])

  const title = role === "admin" ? "Ajustes Root" : role === "manager" ? "Ajustes de Organización" : "Ajustes de Cuenta"
  const securityColor = role === "admin" ? "text-orange-500" : "text-primary"

  // Si no ha montado, no renderizamos el selector para evitar parpadeos
  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black uppercase italic tracking-tighter">{title}</h1>
      
      <Tabs defaultValue="preferencias" className="w-full">
        <TabsList className="grid grid-cols-2 bg-secondary/50 rounded-xl w-[300px]">
          <TabsTrigger value="seguridad" className="font-bold text-xs uppercase italic">Seguridad</TabsTrigger>
          <TabsTrigger value="preferencias" className="font-bold text-xs uppercase italic">Preferencias</TabsTrigger>
        </TabsList>
        
        {/* PESTAÑA DE SEGURIDAD */}
        <TabsContent value="seguridad" className="mt-6 space-y-4">
          <Card className="rounded-2xl border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-xs font-black uppercase tracking-widest flex items-center gap-2", securityColor)}>
                {role === "admin" ? <ShieldAlert className="h-4 w-4" /> : <Key className="h-4 w-4" />}
                Protección de Acceso
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-medium mt-1">
                {role === "admin" 
                  ? "Configura la seguridad global de tu cuenta Root." 
                  : "Gestiona tu contraseña y métodos de autenticación."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="font-black italic uppercase tracking-widest bg-secondary text-foreground hover:bg-secondary/80">
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PESTAÑA DE PREFERENCIAS */}
        <TabsContent value="preferencias" className="mt-6 space-y-6">
          
          {/* NUEVO: SECCIÓN DE APARIENCIA (TEMA) */}
          <Card className="rounded-2xl border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                <Sun className="h-4 w-4" /> Apariencia del Sistema
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-medium mt-1">
                Personaliza la interfaz de TourneyOS para tu comodidad visual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className={cn(
                    "h-24 flex flex-col gap-2 rounded-xl transition-all",
                    theme === "light" ? "border-primary shadow-md shadow-primary/20" : "hover:border-primary/50"
                  )}
                >
                  <Sun className="h-6 w-6" />
                  <span className="font-bold text-xs uppercase tracking-widest">Claro</span>
                </Button>
                
                <Button 
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "h-24 flex flex-col gap-2 rounded-xl transition-all",
                    theme === "dark" ? "border-primary shadow-md shadow-primary/20" : "hover:border-primary/50"
                  )}
                >
                  <Moon className="h-6 w-6" />
                  <span className="font-bold text-xs uppercase tracking-widest">Oscuro</span>
                </Button>

                <Button 
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className={cn(
                    "h-24 flex flex-col gap-2 rounded-xl transition-all",
                    theme === "system" ? "border-primary shadow-md shadow-primary/20" : "hover:border-primary/50"
                  )}
                >
                  <Laptop className="h-6 w-6" />
                  <span className="font-bold text-xs uppercase tracking-widest">Sistema</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SECCIÓN DE NOTIFICACIONES */}
          <Card className="rounded-2xl border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                <BellRing className="h-4 w-4" /> Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col items-start">
              <Button variant="outline" className="w-full justify-start text-xs font-bold uppercase tracking-widest h-12">
                <MonitorSmartphone className="mr-3 h-4 w-4" /> Alertas de Partidos y Torneos
              </Button>
              {role === "admin" && (
                <Button variant="outline" className="w-full justify-start text-xs font-bold text-orange-500 uppercase tracking-widest h-12 border-orange-500/20">
                  <ShieldAlert className="mr-3 h-4 w-4" /> Alertas de Seguridad Global
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}