"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("") // 👈 Nuevo estado para capturar errores del backend
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("") // Limpiamos errores previos

    // Extraemos los datos del formulario gracias a los atributos 'name' de los inputs
    const formData = new FormData(event.currentTarget)
    const gamertag = formData.get("gamertag")
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      // 🚀 ¡Disparamos la petición a tu nuevo backend en Node.js!
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, gamertag, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Si el servidor responde con error (ej: email repetido)
        throw new Error(data.message || "Ocurrió un error al registrarse")
      }

      // ¡Éxito! Redirigimos al usuario a la pantalla de login
      router.push("/login")
      
    } catch (err: any) {
      // Mostramos el error en pantalla
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      
      {/* 🚨 Alerta visual de Error (Aparece solo si el correo/gamertag ya existe) */}
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm font-semibold p-3 rounded-md border border-destructive/20 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nombre</Label>
          <Input name="nombre" placeholder="Sebastian" disabled={isLoading} className="bg-secondary/50 border-none" />
        </div>
        <div className="grid gap-2">
          <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nickname</Label>
          {/* 👇 Agregamos name="gamertag" y required */}
          <Input name="gamertag" required placeholder="SrDeLorean" disabled={isLoading} className="bg-secondary/50 border-none" />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Email</Label>
        {/* 👇 Agregamos name="email" y required */}
        <Input name="email" required id="email" placeholder="name@example.com" type="email" disabled={isLoading} className="bg-secondary/50 border-none" />
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Contraseña</Label>
        {/* 👇 Agregamos name="password" y required */}
        <Input name="password" required id="password" type="password" placeholder="••••••••" disabled={isLoading} className="bg-secondary/50 border-none" />
      </div>

      <Button disabled={isLoading} className="h-12 mt-2 text-lg font-black italic uppercase shadow-lg shadow-primary/20">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
        CREAR CUENTA
      </Button>
    </form>
  )
}