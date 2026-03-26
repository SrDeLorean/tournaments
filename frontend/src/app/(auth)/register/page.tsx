import Link from "next/link"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="flex w-full flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-amc-title text-5xl">
          Nueva <span className="text-primary">Cuenta</span>
        </h1>
        <p className="text-description">
          Completa tus datos para empezar tu carrera.
        </p>
      </div>
      
      <RegisterForm />

      <p className="text-center md:text-left text-description text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-technical text-primary hover:text-glow-primary transition-colors ml-1">
          INICIAR CONEXIÓN
        </Link>
      </p>

    </div>
  )
}