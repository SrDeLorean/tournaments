"use client"

import { useUserStore } from "@/store/useUserStore"
import { MOCK_USERS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Mail, ShieldCheck, Edit3, Gamepad2, Users, 
  MapPin, CalendarDays, Target, TrendingUp, KeyRound, Activity,
  Trophy
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfileView() {
  const { username, role } = useUserStore()
  
  const user = MOCK_USERS.find(u => u.username === username) || MOCK_USERS[0]

  // Centralizamos los iconos por rol, pero eliminamos los colores manuales de aquí
  const roleIcons = {
    admin: ShieldCheck,
    manager: Users,
    player: Gamepad2,
  }
  const Icon = roleIcons[role as keyof typeof roleIcons] || Gamepad2;

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12 text-foreground">
      
      {/* 1. HEADER & COVER AREA - Usando Tokens Globales */}
      <div className="relative rounded-[var(--radius)] border border-border bg-card/50 overflow-hidden shadow-2xl">
        
        {/* Banner con brillo dinámico basado en Primary */}
        <div className="h-48 w-full opacity-20 blur-3xl absolute top-0 left-0 bg-primary" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="relative p-8 pt-20 flex flex-col md:flex-row items-center gap-8 z-10">
          {/* Avatar con radio dinámico */}
          <div className="relative -mt-24 md:-mt-0">
            <Avatar className="h-36 w-36 border-[6px] rounded-[var(--radius)] bg-card border-primary/20 shadow-2xl">
              <AvatarImage src={user.avatar} alt={user.username} className="object-cover" />
              <AvatarFallback className="font-black text-6xl text-muted-foreground/30 bg-secondary">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Badge de Rol con color Primary dinámico */}
            <div className="absolute -bottom-2 -right-2 p-3 rounded-[calc(var(--radius)-4px)] border-4 border-card bg-primary shadow-lg">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>

          {/* Info Principal */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2">
              <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                {user.username}
              </h1>
              <Badge variant="outline" className="uppercase font-black text-[10px] px-3 py-1 border-2 border-primary/30 bg-primary/5 text-primary tracking-widest rounded-full">
                Acceso {role}
              </Badge>
            </div>
            
            <p className="text-xl font-bold text-muted-foreground uppercase tracking-tight">
              {user.name} 
              {user.team && <span className="text-primary font-black italic"> // @{user.team}</span>}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-2 text-[11px] text-muted-foreground font-black uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                {user.email}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Miembro: Ene 2024
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto mt-6 md:mt-0">
            <Button className="font-black italic uppercase tracking-widest text-[10px] bg-primary hover:bg-primary/90 rounded-[var(--radius)]">
              <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
            </Button>
            <Button variant="outline" className="font-black italic uppercase tracking-widest text-[10px] rounded-[var(--radius)] border-border hover:bg-secondary">
              <KeyRound className="mr-2 h-4 w-4" /> Seguridad
            </Button>
          </div>
        </div>
      </div>

      {/* 2. GRID DE CONTENIDO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          <Card className="rounded-[var(--radius)] border-primary/10 bg-card/30 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-border/50 pb-5 mb-5">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                <Activity className="h-4 w-4" /> 
                {role === 'admin' ? 'Estado del Sistema' : 'Rendimiento en Temporada'}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {/* Ejemplo de stats dinámicas que ahora usan el color primario al hover */}
              {[
                { label: role === 'admin' ? "Equipos" : "Partidos", value: role === 'admin' ? "12" : "34", icon: role === 'admin' ? Users : Gamepad2 },
                { label: role === 'admin' ? "Jugadores" : "Win Rate", value: role === 'admin' ? "48" : "68%", icon: role === 'admin' ? Target : TrendingUp },
                { label: "Actividad", value: "98%", icon: Activity },
                { label: "Logros", value: "12", icon: Trophy },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-[calc(var(--radius)-4px)] border border-border bg-background/50 group hover:border-primary/40 transition-all">
                  <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary mx-auto mb-2 transition-colors" />
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-foreground mt-1 tracking-tighter">{stat.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[var(--radius)] border-border bg-card/30 overflow-hidden shadow-xl">
            <CardHeader className="bg-secondary/30 border-b border-border/50 p-5">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> Localización
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/ar.png" alt="Region" className="h-4 rounded-sm grayscale opacity-70" />
                <div>
                  <p className="text-xs font-black uppercase italic tracking-tight">Argentina</p>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">LATAM SUR</p>
                </div>
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-primary" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Latencia: <span className="text-primary italic">35ms</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}