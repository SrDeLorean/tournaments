import Link from "next/link"
import { LoginForm } from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col space-y-2 text-center md:text-left">
        <h1 className="text-amc-title text-5xl">
          Bienvenido  <span className="text-primary">de nuevo</span>
        </h1>
        <p className="text-description">
          Ingresa tus credenciales de operador para acceder al panel táctico.
        </p>
      </div>
      
      <LoginForm />

      <p className="text-center md:text-left text-description text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="text-technical text-primary hover:text-glow-primary transition-colors ml-1">
          Regístrate aquí
        </Link>
      </p>
      
    </div>
  )
}