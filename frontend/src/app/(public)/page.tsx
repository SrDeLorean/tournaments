// src/app/(public)/page.tsx
import { HeroSection } from "@/features/public/components/HeroSection"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"

export default function GuestHomePage() {
  return (
    <div className="min-h-screen animate-in fade-in duration-1000">
      
      {/* El Hero que diseñamos */}
      <HeroSection />
      
      {/* Sección Torneos Táctica */}
      <section className="container mx-auto px-4 py-32">
        <div className="text-center space-y-6 mb-20">
          <Badge variant="technical" className="px-4 py-1.5">Circuito Competitivo</Badge>
          
          <h2 className="text-title-pro text-5xl md:text-7xl">
            Torneos <span className="text-glow-primary">Destacados</span>
          </h2>
          
          <p className="text-description max-w-2xl mx-auto">
            Las competiciones de más alto nivel en el ecosistema. Revisa los formatos <br/>
            y asegura el cupo de tu escuadra antes del cierre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            /* La Card ya inyecta el glass-card y el redondeo correcto gracias a tu UI */
            <Card key={i} className="group relative hover:neon-glow transition-all duration-500">
              
              {/* Icono de fondo decorativo */}
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                <Target className="w-16 h-16 text-primary" />
              </div>
              
              <CardHeader className="pb-4 border-b border-border/30 relative z-10">
                <Badge variant="outline" className="w-fit mb-6">Próximamente</Badge>
                <CardTitle className="text-4xl group-hover:text-glow-primary transition-colors">
                  Liga Élite #{i}
                </CardTitle>
                <CardDescription>Clasificatoria Regional Oficial</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-8 flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/40 p-4 border border-border/50">
                    <span className="text-technical block mb-2">Cupos</span>
                    <span className="font-condensed text-2xl font-bold">0 / 16</span>
                  </div>
                  <div className="bg-background/40 p-4 border border-border/50">
                    <span className="text-technical block mb-2">Prize Pool</span>
                    <span className="font-condensed text-2xl font-bold">$1000</span>
                  </div>
                </div>

                {/* El botón llama a tu variante tactical */}
                <Button variant="tactical" className="w-full mt-4">
                  Ver Divisiones
                </Button>
              </CardContent>

            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}