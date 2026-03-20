"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulamos la creación de cuenta en tu backend
    setTimeout(() => {
      setIsLoading(false)
      // Después de registrarse, lo mandamos al login para que entre formalmente
      router.push("/login")
    }, 2000)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nombre</Label>
          <Input placeholder="Sebastian" disabled={isLoading} className="bg-secondary/50 border-none" />
        </div>
        <div className="grid gap-2">
          <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Nickname</Label>
          <Input placeholder="SrDeLorean" disabled={isLoading} className="bg-secondary/50 border-none" />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Email</Label>
        <Input id="email" placeholder="name@example.com" type="email" disabled={isLoading} className="bg-secondary/50 border-none" />
      </div>

      <div className="grid gap-2">
        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Contraseña</Label>
        <Input id="password" type="password" placeholder="••••••••" disabled={isLoading} className="bg-secondary/50 border-none" />
      </div>

      <Button disabled={isLoading} className="h-12 mt-2 text-lg font-black italic uppercase shadow-lg shadow-primary/20">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
        CREAR CUENTA
      </Button>
    </form>
  )
}