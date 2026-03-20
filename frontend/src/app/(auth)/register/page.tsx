import Link from "next/link"
import { Trophy } from "lucide-react"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      {/* LADO IZQUIERDO: VISUAL */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        <div className="relative z-20 flex items-center text-2xl font-black italic uppercase tracking-tighter">
          <Trophy className="mr-2 h-8 w-8 text-primary" />
          TourneyOS
        </div>
        <div className="relative z-20 mt-auto">
          <p className="text-5xl font-black italic uppercase leading-none mb-4">
            Únete a la <br /><span className="text-primary">Élite</span> de Successors
          </p>
          <p className="text-muted-foreground font-medium max-w-md">
            Crea tu perfil profesional, gestiona tus estadísticas y compite en los torneos más grandes de la región.
          </p>
        </div>
      </div>

      {/* LADO DERECHO: FORMULARIO */}
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">Nueva Cuenta</h1>
            <p className="text-sm text-muted-foreground">
              Completa tus datos para empezar tu carrera.
            </p>
          </div>
          
          <RegisterForm />

          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline underline-offset-4">
              Inicia Sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}