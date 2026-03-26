"use client"

import { useState } from "react"
import { Mail, MessageSquare, Send, Globe, Twitter, Instagram } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactoPublicPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-6xl relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />

      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center space-y-6 mb-16 relative z-10">
        <Badge variant="technical">Soporte y Negocios</Badge>
        <h1 className="text-amc-title text-6xl md:text-8xl">
          Terminal de <span className="text-glow-primary">Contacto</span>
        </h1>
        <p className="text-description max-w-2xl mx-auto">
          ¿Tienes dudas sobre el reglamento, quieres inscribir a tu escuadra o buscas patrocinar la liga? Transmite tu mensaje al cuartel general.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* COLUMNA IZQUIERDA: Info y Redes */}
        <div className="space-y-8">
          
          <div>
            <h2 className="text-amc-title text-4xl mb-6">
              Nuestras Redes y Sede
            </h2>
            <div className="grid gap-6">
              
              {/* Email */}
              <Card className="surface-panel hover:border-primary/50 transition-colors cursor-default">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-sm bg-primary/10 border border-primary/30 shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-technical text-muted-foreground">Correo Oficial</p>
                    <p className="font-condensed text-xl text-foreground tracking-wide">ADMIN@TOURNEYOS.COM</p>
                  </div>
                </CardContent>
              </Card>

              {/* Discord */}
              <Card className="surface-panel hover:border-[#5865F2]/50 transition-colors cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-sm bg-[#5865F2]/10 border border-[#5865F2]/30 shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-6 w-6 text-[#5865F2]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-technical text-[#5865F2]/80">Comunidad</p>
                    <p className="font-condensed text-xl text-foreground tracking-wide">SERVIDOR DE DISCORD</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-technical border-[#5865F2]/30 text-[#5865F2] hover:bg-[#5865F2]/10">
                    UNIRSE
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>

          <div className="pt-8 border-t border-border/30">
            <h3 className="text-technical text-muted-foreground mb-4">
              Canales de Transmisión
            </h3>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-sm h-12 w-12 surface-panel hover:border-primary/50 hover:text-primary transition-all">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-sm h-12 w-12 surface-panel hover:border-primary/50 hover:text-primary transition-all">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-sm h-12 w-12 surface-panel hover:border-primary/50 hover:text-primary transition-all">
                <Globe className="h-5 w-5" />
              </Button>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: Formulario */}
        <Card className="glass-card shadow-2xl relative overflow-hidden">
          <CardContent className="p-8 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-technical text-muted-foreground">Tu Nombre / Gamertag</label>
                  <Input required placeholder="EJ: SR. DELOREAN" className="bg-background/50 border-border/50 h-12 focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-technical text-muted-foreground">Correo Electrónico</label>
                  <Input required type="email" placeholder="CORREO@EJEMPLO.COM" className="bg-background/50 border-border/50 h-12 focus-visible:ring-primary/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-technical text-muted-foreground">Asunto</label>
                <Input required placeholder="EJ: SOLICITUD DE INSCRIPCIÓN" className="bg-background/50 border-border/50 h-12 focus-visible:ring-primary/50" />
              </div>

              <div className="space-y-2">
                <label className="text-technical text-muted-foreground">Mensaje</label>
                <Textarea 
                  required 
                  placeholder="Escribe los detalles de tu transmisión aquí..." 
                  className="bg-background/50 border-border/50 focus-visible:ring-primary/50 min-h-[150px] resize-none text-base" 
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 btn-action-primary mt-4"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">TRANSMITIENDO...</span>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> ENVIAR MENSAJE
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