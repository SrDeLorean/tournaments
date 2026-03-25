"use client"

import { useState } from "react"
import { Mail, MessageSquare, Send, MapPin, Globe, Twitter, Instagram } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ContactoPublicPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simulador de envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-700 max-w-6xl">
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-4 mb-16">
        <Badge variant="outline" className="uppercase tracking-widest font-black text-[10px] px-3 py-1 text-primary border-primary/30 bg-primary/10">
          Soporte y Negocios
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
          Ponte en <span className="text-primary">Contacto</span>
        </h1>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          ¿Tienes dudas sobre el reglamento, quieres inscribir a tu club o buscas patrocinar la liga? Escríbenos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* COLUMNA IZQUIERDA: Info y Redes */}
        <div className="space-y-8">
          
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground mb-6">
              Nuestras Redes y Sede
            </h2>
            <div className="grid gap-6">
              
              {/* Email */}
              <Card className="bg-card border-border hover:border-primary/50 transition-colors shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Correo Oficial</p>
                    <p className="font-black text-foreground">admin@tourneyos.com</p>
                  </div>
                </CardContent>
              </Card>

              {/* Discord (Simulado con MessageSquare) */}
              <Card className="bg-[#5865F2]/5 border-[#5865F2]/20 hover:border-[#5865F2]/50 transition-colors shadow-sm cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6 text-[#5865F2]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-[#5865F2]/80 uppercase tracking-widest">Comunidad</p>
                    <p className="font-black text-foreground">Servidor de Discord</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-[#5865F2] hover:bg-[#5865F2]/10 uppercase">
                    Unirse
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>

          <div className="pt-6 border-t border-border/50">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">
              Síguenos en Redes Sociales
            </h3>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:bg-secondary hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:bg-secondary hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12 hover:bg-secondary hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </Button>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: Formulario */}
        <Card className="bg-card border-border shadow-xl relative overflow-hidden">
          {/* Brillo sutil de fondo */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          
          <CardContent className="p-8 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tu Nombre / Gamertag</label>
                  <Input required placeholder="Ej: SrDeLorean" className="bg-background border-border focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Correo Electrónico</label>
                  <Input required type="email" placeholder="correo@ejemplo.com" className="bg-background border-border focus-visible:ring-primary/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Asunto</label>
                <Input required placeholder="Ej: Solicitud de inscripción para mi club" className="bg-background border-border focus-visible:ring-primary/50" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mensaje</label>
                <Textarea 
                  required 
                  placeholder="Escribe los detalles de tu consulta aquí..." 
                  className="bg-background border-border focus-visible:ring-primary/50 min-h-[150px] resize-none" 
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 text-sm font-black italic uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all"
              >
                {isSubmitting ? (
                  "Enviando Mensaje..."
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Enviar Mensaje
                  </>
                )}
              </Button>
              
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}