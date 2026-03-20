// src/app/(auth)/layout.tsx
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* BOTÓN VOLVER (Flotante arriba a la izquierda) */}
      <div className="absolute left-4 top-4 z-50 md:left-8 md:top-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2 font-bold text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4" />
            VOLVER AL INICIO
          </Button>
        </Link>
      </div>

      {/* Aquí se renderiza el Login o el Register */}
      {children}
    </div>
  )
}