// src/app/(public)/page.tsx
import { HeroSection } from "@/features/public/components/HeroSection"

export default function GuestHomePage() {
  return (
    <div className="min-h-screen">
      {/* El Hero que diseñamos */}
      <HeroSection />
      
      {/* Sección simple de Torneos para rellenar */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-black uppercase italic mb-10">
          Torneos <span className="text-primary">Destacados</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl border bg-card/50 flex flex-col items-center justify-center p-6 border-dashed border-muted-foreground/30">
              <p className="text-muted-foreground italic">Próximamente: Torneo #{i}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}