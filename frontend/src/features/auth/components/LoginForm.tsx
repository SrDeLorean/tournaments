"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/store/useUserStore"
import { UserRole } from "@/types/roles"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  
  const router = useRouter()
  const setAuth = useUserStore((state) => state.setAuth)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      // 1. Petición real al backend modular de Successors
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      // 2. Si el backend rechaza las credenciales
      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión")
      }

      // 3. Guardar el Token en localStorage para futuras peticiones (crear torneos, etc)
      localStorage.setItem("successors_token", data.token)

      // 4. Guardar en el Store global
      // Ajusta esto según lo que requiera tu Zustand store
      const userRole = data.user.role as UserRole 
      setAuth(data.user.gamertag, userRole)
      
      // 5. Redirección dinámica
      router.push(`/${userRole}`)

    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          
          {/* Campo de Email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              placeholder="operador@successors.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-secondary/50 border-none h-12 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Contraseña
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-secondary/50 border-none h-12 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Mensaje de Error */}
          {errorMessage && (
            <p className="text-sm text-red-500 font-semibold">{errorMessage}</p>
          )}

          {/* Botón de Ingreso */}
          <Button disabled={isLoading} className="h-12 text-lg font-black italic uppercase shadow-lg shadow-primary/20">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "CONECTANDO..." : "INGRESAR AL SISTEMA"}
          </Button>
          
        </div>
      </form>
    </div>
  )
}