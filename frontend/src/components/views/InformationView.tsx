"use client"

import { useUserStore } from "@/store/useUserStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Terminal, BookOpen, MessageSquare } from "lucide-react"

export function InformationView() {
  const { role } = useUserStore()

  const title = role === "admin" ? "Información Global" : "Centro de Ayuda"
  const titleParts = title.split(" ")

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48" />

      {/* TÍTULO PRINCIPAL (Blindado con Teko) */}
      <div className="border-b border-border/30 pb-6 mb-8">
        <h1 className="text-amc-title text-5xl md:text-6xl">
          {titleParts[0]} <span className="text-glow-primary">{titleParts.slice(1).join(" ")}</span>
        </h1>
        <p className="text-description mt-2">
          {role === "admin" ? "Panel de diagnóstico y recursos del sistema." : "Asistencia táctica y recursos para operadores."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* DOCUMENTACIÓN / AYUDA */}
        {/* El Card ya hereda glass-card de la UI, solo añadimos la interacción */}
        <Card className="group hover:neon-glow transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-technical flex items-center gap-3 text-primary group-hover:text-glow-primary transition-colors">
              {role === 'admin' ? <HelpCircle className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />} 
              {role === 'admin' ? "Documentación Root" : "Guías de Usuario"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-description min-h-[60px]">
              {role === 'admin' 
                ? "Consulta guías rápidas sobre cómo gestionar Temporadas Competitivas, auditar equipos y resolver incidencias de cuentas." 
                : "Aprende a registrar a tu equipo en torneos, enviar resultados de partidos y gestionar tu roster."}
            </p>
            {/* Agregamos un botón secundario fantasma para invitar a la acción */}
            <Button variant="ghost" className="w-full mt-6 text-technical text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/30">
              Abrir Documentación
            </Button>
          </CardContent>
        </Card>
        
        {/* ESPECIFICACIONES (ADMIN) O SOPORTE (MANAGER/PLAYER) */}
        {role === "admin" ? (
          <Card className="group hover:neon-glow transition-all duration-300 border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-technical flex items-center gap-3 text-primary group-hover:text-glow-primary transition-colors">
                <Terminal className="h-5 w-5" /> Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Usamos las superficies semánticas para los datos técnicos */}
              <div className="space-y-3">
                <div className="surface-panel-solid p-3 flex justify-between items-center group-hover:border-primary/30 transition-colors">
                  <span className="text-description text-xs uppercase tracking-widest">Entorno</span>
                  <span className="text-technical text-foreground">XAMPP / LOCAL</span>
                </div>
                <div className="surface-panel-solid p-3 flex justify-between items-center group-hover:border-primary/30 transition-colors">
                  <span className="text-description text-xs uppercase tracking-widest">Versión Core</span>
                  <span className="text-technical text-primary">0.1.0-alpha.tactical</span>
                </div>
                <div className="surface-panel-solid p-3 flex justify-between items-center group-hover:border-primary/30 transition-colors">
                  <span className="text-description text-xs uppercase tracking-widest">Último Backup</span>
                  <span className="text-technical text-muted-foreground">Hoy, 03:00 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="group hover:neon-glow transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-technical flex items-center gap-3 text-primary group-hover:text-glow-primary transition-colors">
                <MessageSquare className="h-5 w-5" /> Soporte Directo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-description min-h-[60px]">
                ¿Tienes problemas con un partido o necesitas reportar a un jugador? Contacta a la administración abriendo un ticket.
              </p>
              {/* Usamos el botón primario blindado del sistema */}
              <Button variant="default" className="w-full mt-6">
                Abrir Ticket de Soporte
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}