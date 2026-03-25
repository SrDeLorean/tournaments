import Link from "next/link"
import { LoginForm } from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Bienvenido de nuevo</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Ingresa tus credenciales para acceder a tu panel.
        </p>
      </div>
      
      <LoginForm />

      <p className="px-8 text-center text-sm text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline underline-offset-4">
          Regístrate aquí
        </Link>
      </p>
    </div>
  )
}