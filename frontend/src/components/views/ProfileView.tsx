"use client"

import { useUserStore } from "@/store/useUserStore"
import { MOCK_USERS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Mail, ShieldCheck, Edit3, Gamepad2, Users, 
  MapPin, CalendarDays, Target, TrendingUp, KeyRound, Activity,
  Trophy
} from "lucide-react"

export function ProfileView() {
  const { username, role } = useUserStore()
  const user = MOCK_USERS.find(u => u.username === username) || MOCK_USERS[0]

  const roleIcons = {
    admin: ShieldCheck,
    manager: Users,
    player: Gamepad2,
  }
  const Icon = roleIcons[role as keyof typeof roleIcons] || Gamepad2;

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12 text-foreground relative">
      
      {/* Brillo Ambiental Semántico */}
      <div className="ambient-glow-primary top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64" />

      {/* 1. DOSSIER PRINCIPAL */}
      <div className="glass-card rounded-[var(--radius)] overflow-hidden">
        {/* Banner */}
        <div className="h-40 w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="relative p-8 pt-0 flex flex-col md:flex-row items-start md:items-end gap-8 z-10 -mt-20">
          
          <div className="relative shrink-0">
            {/* Avatar Táctico (Cuadrado con borde grueso) */}
            <Avatar className="h-32 w-32 border-4 border-background bg-card shadow-xl rounded-md">
              <AvatarImage src={user.avatar} alt={user.username} className="object-cover" />
              <AvatarFallback className="text-amc-title text-5xl bg-secondary/50 text-muted-foreground">
                {user.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-3 -right-3 p-2 rounded-sm border-2 border-background bg-primary shadow-[0_0_15px_hsla(var(--primary),0.5)]">
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-2 mb-2">
            <div className="flex items-center gap-4">
              <h1 className="text-amc-title text-5xl md:text-6xl text-glow-primary">
                {user.username}
              </h1>
              <Badge variant="technical">CLASE: {role}</Badge>
            </div>
            
            <p className="text-technical text-foreground opacity-80">
              {user.name} 
              {user.team && <span className="text-primary ml-2">// @{user.team}</span>}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-description text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> {user.email}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> Miembro desde Ene 2024
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto mb-2">
            <Button variant="default" className="w-full">
              <Edit3 className="mr-2 h-4 w-4" /> Modificar Dossier
            </Button>
            <Button variant="outline" className="w-full">
              <KeyRound className="mr-2 h-4 w-4 text-primary" /> Credenciales
            </Button>
          </div>
        </div>
      </div>

      {/* 2. GRID DE DATOS TÉCNICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <Card className="hover:neon-glow transition-all duration-300">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="text-technical flex items-center gap-2 text-primary">
                <Activity className="h-5 w-5" /> 
                {role === 'admin' ? 'Telemetría del Sistema' : 'Rendimiento en Temporada'}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-center">
              {[
                { label: role === 'admin' ? "Equipos" : "Partidos", value: role === 'admin' ? "12" : "34", icon: role === 'admin' ? Users : Gamepad2 },
                { label: role === 'admin' ? "Jugadores" : "Win Rate", value: role === 'admin' ? "48" : "68%", icon: role === 'admin' ? Target : TrendingUp },
                { label: "Actividad", value: "98%", icon: Activity },
                { label: "Logros", value: "12", icon: Trophy },
              ].map(stat => (
                <div key={stat.label} className="surface-panel p-4 flex flex-col items-center justify-center hover:border-primary/50 transition-colors group">
                  <stat.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                  <p className="font-condensed text-3xl text-foreground mb-1">{stat.value}</p>
                  <p className="text-technical text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="hover:neon-glow transition-all duration-300">
            <CardHeader className="bg-background/20 border-b border-border/30 pb-4">
              <CardTitle className="text-technical flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" /> Región de Operaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <img src="https://flagcdn.com/w40/ar.png" alt="Region" className="h-6 rounded-sm opacity-80 border border-border" />
                <div>
                  <p className="text-amc-title text-2xl tracking-wide">Argentina</p>
                  <p className="text-technical text-muted-foreground">Sector LATAM SUR</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between surface-panel-solid p-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-technical text-muted-foreground">Latencia Promedio</span>
                </div>
                <span className="font-condensed text-primary text-xl">35ms</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}