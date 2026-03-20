import Link from "next/link"
import { Trophy } from "lucide-react"
import { LoginForm } from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* LADO IZQUIERDO: VISUAL (Solo Desktop) */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
        <div className="relative z-20 flex items-center text-2xl font-black italic uppercase tracking-tighter">
          <Trophy className="mr-2 h-8 w-8 text-primary" />
          TourneyOS
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-4xl font-black italic uppercase leading-tight">
              "El éxito no es un accidente, <br /> es el resultado de la gestión."
            </p>
            <footer className="text-sm font-bold text-primary">Semanas de entrenamiento - Successors Team</footer>
          </blockquote>
        </div>
      </div>

      {/* LADO DERECHO: FORMULARIO */}
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Bienvenido de nuevo</h1>
            <p className="text-sm text-muted-foreground font-medium">
              Ingresa tus credenciales para acceder a tu panel.
            </p>
          </div>
          
          <LoginForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Términos de Servicio
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}