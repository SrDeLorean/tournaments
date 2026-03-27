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
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const title = role === "admin" ? "Configuración Root" : role === "manager" ? "Ajustes de Organización" : "Configuración de Terminal"

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 relative">
      
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48" />

      <h1 className="text-amc-title text-5xl md:text-6xl border-b border-border/30 pb-6">
        {title.split(" ")[0]} <span className="text-glow-primary">{title.split(" ").slice(1).join(" ")}</span>
      </h1>
      
      <Tabs defaultValue="preferencias" className="w-full">
        {/* Usamos el componente Tabs inyectado, que ya tiene glass-card */}
        <TabsList className="grid grid-cols-2 w-full max-w-sm mb-8">
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
        </TabsList>
        
        {/* PESTAÑA DE SEGURIDAD */}
        <TabsContent value="seguridad" className="space-y-6">
          <Card className="hover:neon-glow transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-technical flex items-center gap-3 text-primary">
                {role === "admin" ? <ShieldAlert className="h-5 w-5" /> : <Key className="h-5 w-5" />}
                Protección de Acceso
              </CardTitle>
              <CardDescription className="text-description pt-2">
                {role === "admin" 
                  ? "Configuración de seguridad global de la infraestructura." 
                  : "Gestiona tu contraseña y métodos de autenticación."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="tactical" className="w-full sm:w-auto">
                Actualizar Credenciales
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PESTAÑA DE PREFERENCIAS */}
        <TabsContent value="preferencias" className="space-y-8">
          
          {/* APARIENCIA */}
          <Card className="hover:neon-glow transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-technical flex items-center gap-3 text-primary">
                <Sun className="h-5 w-5" /> Interfaz Visual
              </CardTitle>
              <CardDescription className="text-description pt-2">
                Calibra la iluminación del HUD de TourneyOS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "light", icon: Sun, label: "Claro" },
                  { id: "dark", icon: Moon, label: "Oscuro" },
                  { id: "system", icon: Laptop, label: "Sistema" }
                ].map((mode) => (
                  <Button 
                    key={mode.id}
                    variant={theme === mode.id ? "default" : "outline"}
                    onClick={() => setTheme(mode.id)}
                    className={cn(
                      "h-24 flex flex-col gap-3 transition-all rounded-sm",
                      theme === mode.id 
                        ? "btn-action-primary" // Usamos el botón primario blindado
                        : "border-border/50 hover:border-primary/50 text-muted-foreground surface-panel"
                    )}
                  >
                    <mode.icon className="h-6 w-6" />
                    <span className="text-technical">{mode.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* NOTIFICACIONES */}
          <Card className="hover:neon-glow transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-technical flex items-center gap-3 text-primary">
                <BellRing className="h-5 w-5" /> Alertas del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start h-14 surface-panel hover:border-primary/50 group transition-all">
                <MonitorSmartphone className="mr-4 h-5 w-5 text-muted-foreground group-hover:text-primary" /> 
                <span className="text-technical text-foreground group-hover:text-primary transition-colors">Alertas de Partidos y Torneos</span>
              </Button>
              
              {role === "admin" && (
                <Button variant="outline" className="w-full justify-start h-14 bg-primary/5 border-primary/20 hover:bg-primary/10 group transition-all">
                  <ShieldAlert className="mr-4 h-5 w-5 text-primary" /> 
                  <span className="text-technical text-primary">Alertas de Seguridad Global</span>
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}