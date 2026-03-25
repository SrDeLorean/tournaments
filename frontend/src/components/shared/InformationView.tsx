"use client"

import { useUserStore } from "@/store/useUserStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // <--- ¡AGREGA ESTA LÍNEA!
import { HelpCircle, Terminal, BookOpen, MessageSquare } from "lucide-react"

export function InformationView() {
  const { role } = useUserStore()

  const title = role === "admin" ? "Información Global" : "Centro de Ayuda"

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black uppercase italic tracking-tighter border-b border-border/50 pb-6">
        {title}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* DOCUMENTACIÓN / AYUDA */}
        <Card className={`rounded-2xl border-border bg-card/40 backdrop-blur-sm shadow-xl`}>
          <CardHeader>
            <CardTitle className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${role === 'admin' ? 'text-orange-500' : 'text-primary'}`}>
              {role === 'admin' ? <HelpCircle className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />} 
              {role === 'admin' ? "Documentación Root" : "Guías de Usuario"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {role === 'admin' 
                ? "Consulta guías rápidas sobre cómo gestionar Temporadas Competitivas, auditar equipos y resolver incidencias de cuentas." 
                : "Aprende a registrar a tu equipo en torneos, enviar resultados de partidos y gestionar tu roster."}
            </p>
          </CardContent>
        </Card>
        
        {/* ESPECIFICACIONES (SOLO ADMIN) O SOPORTE (MANAGER/PLAYER) */}
        {role === "admin" ? (
          <Card className="rounded-2xl border-primary/20 bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                <Terminal className="h-4 w-4" /> Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Entorno: <span className="font-mono text-xs bg-secondary px-1 rounded">Desarrollo Local (XAMPP)</span> <br />
                Versión Core: <span className="font-bold text-primary">0.1.0-alpha.tactical</span><br />
                Último Backup: <span className="font-mono text-xs">Hoy, 03:00 AM</span>
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-2xl border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" /> Soporte Directo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ¿Tienes problemas con un partido o necesitas reportar a un jugador? Contacta a la administración abriendo un ticket.
              </p>
              <Button className="mt-4 font-black italic uppercase tracking-widest text-xs w-full">
                Abrir Ticket
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}