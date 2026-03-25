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

  const title = role === "admin" ? "Ajustes Root" : role === "manager" ? "Ajustes de Organización" : "Ajustes de Cuenta"

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 text-foreground">
      <h1 className="text-3xl font-black uppercase italic tracking-tighter">
        {title.split(" ")[0]} <span className="text-primary">{title.split(" ").slice(1).join(" ")}</span>
      </h1>
      
      <Tabs defaultValue="preferencias" className="w-full">
        <TabsList className="grid grid-cols-2 bg-secondary/50 rounded-[var(--radius)] w-[300px] border border-border/50">
          <TabsTrigger value="seguridad" className="font-black text-[10px] uppercase italic tracking-widest">Seguridad</TabsTrigger>
          <TabsTrigger value="preferencias" className="font-black text-[10px] uppercase italic tracking-widest">Preferencias</TabsTrigger>
        </TabsList>
        
        {/* PESTAÑA DE SEGURIDAD */}
        <TabsContent value="seguridad" className="mt-6 space-y-4">
          <Card className="rounded-[var(--radius)] border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                {role === "admin" ? <ShieldAlert className="h-4 w-4" /> : <Key className="h-4 w-4" />}
                Protección de Acceso
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground font-medium mt-1 uppercase italic">
                {role === "admin" 
                  ? "Configuración de seguridad global de la infraestructura." 
                  : "Gestiona tu contraseña y métodos de autenticación."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="font-black italic uppercase tracking-widest text-[10px] bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all rounded-[calc(var(--radius)-4px)]">
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PESTAÑA DE PREFERENCIAS */}
        <TabsContent value="preferencias" className="mt-6 space-y-6">
          
          {/* SECCIÓN DE APARIENCIA (TEMA) */}
          <Card className="rounded-[var(--radius)] border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                <Sun className="h-4 w-4" /> Apariencia del Sistema
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground font-medium mt-1 uppercase italic">
                Personaliza la interfaz visual de TourneyOS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
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
                      "h-24 flex flex-col gap-2 transition-all rounded-[calc(var(--radius)-2px)] border-2 uppercase",
                      theme === mode.id 
                        ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/10" 
                        : "border-border hover:border-primary/50 text-muted-foreground"
                    )}
                  >
                    <mode.icon className="h-6 w-6" />
                    <span className="font-black text-[10px] tracking-widest">{mode.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SECCIÓN DE NOTIFICACIONES */}
          <Card className="rounded-[var(--radius)] border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                <BellRing className="h-4 w-4" /> Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 flex flex-col items-start">
              <Button variant="outline" className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-12 rounded-[calc(var(--radius)-4px)] border-border/50 hover:border-primary/30 group transition-all">
                <MonitorSmartphone className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary" /> 
                Alertas de Partidos y Torneos
              </Button>
              {role === "admin" && (
                <Button variant="outline" className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-12 rounded-[calc(var(--radius)-4px)] border-primary/20 hover:bg-primary/5 group transition-all">
                  <ShieldAlert className="mr-3 h-4 w-4 text-primary" /> 
                  Alertas de Seguridad Global
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}