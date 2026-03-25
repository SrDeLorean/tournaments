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
  MapPin, CalendarDays, Target, TrendingUp, KeyRound, Activity 
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfileView() {
  const { username, role } = useUserStore()
  
  // Obtenemos datos simulados (usamos Sebastian como fallback si no hay login)
  const user = MOCK_USERS.find(u => u.username === username) || MOCK_USERS[0]

  // Configuración visual según el Rol
  const roleConfig = {
    admin: { color: "orange", icon: ShieldCheck, label: "Root" },
    manager: { color: "blue", icon: Users, label: "Manager" },
    player: { color: "primary", icon: Gamepad2, label: "Player" },
  }
  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.player;

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12">
      
      {/* ========================================================== */}
      {/* 1. HEADER & COVER AREA - Estilo Profesional */}
      {/* ========================================================== */}
      <div className="relative rounded-3xl border border-border bg-card/50 overflow-hidden shadow-2xl shadow-background/20">
        
        {/* Banner/Cover sutil con gradiente */}
        <div className={cn(
          "h-48 w-full opacity-40 blur-3xl absolute top-0 left-0",
          role === 'admin' ? "bg-orange-600" : role === 'manager' ? "bg-blue-600" : "bg-primary"
        )} />
        <div className="absolute inset-0 bg-grid-white/[0.02]" /> {/* Patrón sutil de fondo */}

        <div className="relative p-8 pt-20 flex flex-col md:flex-row items-center gap-8 z-10">
          {/* Avatar Grande e Imponente con overlap */}
          <div className="relative -mt-24 md:-mt-0">
            <Avatar className={cn(
              "h-36 w-36 border-[6px] rounded-3xl bg-card shadow-2xl",
              `border-${config.color}-500/20`
            )}>
              <AvatarImage src={user.avatar} alt={user.username} className="object-cover" />
              <AvatarFallback className="font-black text-6xl text-muted-foreground/30 bg-secondary">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -bottom-2 -right-2 p-3 rounded-xl border-4 border-card",
              `bg-${config.color}-500`
            )}>
              <config.icon className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Info Principal */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-2">
              <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
                {user.username}
              </h1>
              <Badge variant="outline" className={cn(
                "uppercase font-black text-xs px-3 py-1 border-2 w-fit mx-auto md:mx-0",
                `text-${config.color}-500 border-${config.color}-500/30 bg-${config.color}-500/10`
              )}>
                Acceso {config.label}
              </Badge>
            </div>
            
            <p className="text-xl font-bold text-muted-foreground/80 uppercase tracking-tight">
              {user.name} 
              {user.team && <span className="text-primary font-black italic"> // @{user.team}</span>}
            </p>

            {/* Micro-datos rápidos */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                {user.email}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Miembro desde: Ene 2024
              </div>
            </div>
          </div>

          {/* Acciones principales */}
          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto mt-6 md:mt-0">
            <Button className="font-black italic uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Edit3 className="mr-2 h-4 w-4" />
              Editar Cuenta
            </Button>
            <Button variant="outline" className="font-black italic uppercase tracking-widest text-xs h-10 border-border/50 hover:bg-secondary">
              <KeyRound className="mr-2 h-4 w-4" />
              Seguridad
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 2. GRID DE CONTENIDO DINÁMICO POR ROL */}
      {/* ========================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA (Principal) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* A. SECCIÓN ESPECÍFICA POR ROL */}

          {/* >> VISTA ADMIN << */}
          {role === 'admin' && (
            <Card className="rounded-2xl border-orange-500/20 bg-card/30 backdrop-blur-sm shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-5 mb-5">
                <div>
                  <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-orange-500">
                    <Activity className="h-4 w-4" /> Centro de Mando Global
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground font-medium mt-1">
                    Resumen rápido de integridad del sistema TourneyOS.
                  </CardDescription>
                </div>
                <Badge className="bg-green-500 font-bold text-white uppercase text-[10px]">Sistema Online</Badge>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-background">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Equipos Totales</p>
                  <p className="text-3xl font-black text-foreground mt-1">12</p>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Jugadores Activos</p>
                  <p className="text-3xl font-black text-primary mt-1">48</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* >> VISTA MANAGER << */}
          {role === 'manager' && (
            <Card className="rounded-2xl border-blue-500/20 bg-card/30 backdrop-blur-sm shadow-xl">
              <CardHeader className="border-b border-border/50 pb-5 mb-5">
                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-blue-500">
                  <Users className="h-4 w-4" /> Estado de la Organización: {user.team}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                  Gestionando <span className="font-black text-foreground">1 Plantilla Activa</span> en <span className="font-black text-foreground">2 Competencias</span>.
                </p>
                <Button size="sm" variant="secondary" className="font-black italic uppercase tracking-widest text-xs">
                  Ir al Panel de Roster
                </Button>
              </CardContent>
            </Card>
          )}

          {/* >> VISTA PLAYER << */}
          {role === 'player' && (
            <Card className="rounded-2xl border-primary/20 bg-card/30 backdrop-blur-sm shadow-xl">
              <CardHeader className="border-b border-border/50 pb-5 mb-5">
                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                  <Target className="h-4 w-4" /> Rendimiento Competitivo (Temporada Actual)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Partidos", value: "34", icon: Gamepad2 },
                  { label: "Win Rate", value: "68%", icon: TrendingUp },
                  { label: "K/D Ratio", value: "1.45", icon: Target },
                  { label: "MVP's", value: "5", icon: Activity },
                ].map(stat => (
                  <div key={stat.label} className="p-4 rounded-xl border border-border bg-background group hover:border-primary/30 transition-colors">
                    <stat.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary mx-auto mb-2" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase group-hover:text-foreground">{stat.label}</p>
                    <p className="text-3xl font-black text-foreground mt-1">{stat.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* --- COLUMNA DERECHA (Sidebar del Perfil) --- */}
        <div className="space-y-8">
          <Card className="rounded-2xl border border-border bg-card/30 overflow-hidden shadow-xl">
            <CardHeader className="bg-secondary/30 border-b border-border/50 p-5">
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> Ubicación y Servidor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/ar.png" alt="Argentina" className="h-5 rounded" />
                <div>
                  <p className="text-sm font-black uppercase italic">Argentina</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Región: LATAM Sur</p>
                </div>
              </div>
              <Separator className="border-border/50" />
              <div className="flex items-center gap-3 text-muted-foreground">
                <Activity className="h-5 w-5" />
                <p className="text-xs font-bold uppercase">Ping Promedio: <span className="text-green-500 font-black">35ms</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}