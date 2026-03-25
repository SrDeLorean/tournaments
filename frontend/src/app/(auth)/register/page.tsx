import Link from "next/link"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Nueva Cuenta</h1>
        <p className="text-sm text-muted-foreground font-medium">
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
  )
}