"use client"

import { useUserStore } from "@/store/useUserStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Terminal, BookOpen, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export function InformationView() {
  const { role } = useUserStore()

  const title = role === "admin" ? "Información Global" : "Centro de Ayuda"

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 text-foreground">
      
      {/* TÍTULO PRINCIPAL - Centralizado */}
      <h1 className="text-3xl font-black uppercase italic tracking-tighter border-b border-border/50 pb-6">
        {title.split(" ")[0]} <span className="text-primary">{title.split(" ")[1]}</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* DOCUMENTACIÓN / AYUDA */}
        <Card className="rounded-[var(--radius)] border-border bg-card/40 backdrop-blur-sm shadow-xl transition-all hover:border-primary/20">
          <CardHeader>
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
              {role === 'admin' ? <HelpCircle className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />} 
              {role === 'admin' ? "Documentación Root" : "Guías de Usuario"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
              {role === 'admin' 
                ? "Consulta guías rápidas sobre cómo gestionar Temporadas Competitivas, auditar equipos y resolver incidencias de cuentas." 
                : "Aprende a registrar a tu equipo en torneos, enviar resultados de partidos y gestionar tu roster."}
            </p>
          </CardContent>
        </Card>
        
        {/* ESPECIFICACIONES (ADMIN) O SOPORTE (MANAGER/PLAYER) */}
        {role === "admin" ? (
          <Card className="rounded-[var(--radius)] border-primary/20 bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                <Terminal className="h-4 w-4" /> Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground font-medium leading-loose">
                <p>Entorno: <span className="font-mono text-[10px] bg-secondary text-foreground px-2 py-0.5 rounded-[calc(var(--radius)-4px)] border border-border">XAMPP / LOCAL</span></p>
                <p>Versión Core: <span className="font-black text-primary italic uppercase">0.1.0-alpha.tactical</span></p>
                <p>Último Backup: <span className="font-mono text-[10px] opacity-70">Hoy, 03:00 AM</span></p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-[var(--radius)] border-border bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                <MessageSquare className="h-4 w-4" /> Soporte Directo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed italic">
                ¿Tienes problemas con un partido o necesitas reportar a un jugador? Contacta a la administración abriendo un ticket.
              </p>
              <Button className="mt-4 font-black italic uppercase tracking-widest text-[10px] w-full rounded-[calc(var(--radius)-2px)] shadow-lg shadow-primary/20">
                Abrir Ticket de Soporte
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}