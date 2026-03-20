"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/store/useUserStore"
import { UserRole } from "@/types/roles" // Asegúrate de tener este tipo definido

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [usernameInput, setUsernameInput] = useState("") // Estado para capturar el texto
  const router = useRouter()
  const setAuth = useUserStore((state) => state.setAuth)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // LÓGICA DE PRUEBA PARA SEBASTIAN
    setTimeout(() => {
      let role: UserRole = "player" // Rol por defecto
      const input = usernameInput.toLowerCase()

      if (input === "admin") role = "admin"
      else if (input === "manager") role = "manager"
      else if (input === "player") role = "player"

      // Guardamos en el Store global
      setAuth(input, role)
      
      setIsLoading(false)

      // Redirección dinámica según el rol elegido
      router.push(`/${role}`)
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username" className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Usuario de Prueba (admin, manager, player)
            </Label>
            <Input
              id="username"
              placeholder="Escribe admin, manager o player"
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)} // Capturamos el cambio
              disabled={isLoading}
              className="bg-secondary/50 border-none h-12 focus:ring-2 focus:ring-primary"
            />
          </div>
          {/* ... resto del formulario (password, etc) ... */}
          <Button disabled={isLoading} className="h-12 text-lg font-black italic uppercase shadow-lg shadow-primary/20">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            INGRESAR COMO {usernameInput.toUpperCase() || "..."}
          </Button>
        </div>
      </form>
    </div>
  )
}