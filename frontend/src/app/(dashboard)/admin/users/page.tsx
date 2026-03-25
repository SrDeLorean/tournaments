"use client"

import { useState } from "react"
import Link from "next/link"
import { MOCK_USERS } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  UserCog, MoreHorizontal, ShieldAlert, UserPlus, 
  Search, Filter, Eye, Edit, Trash2, ChevronLeft, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "manager" | "player">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleRoleChange = (role: "all" | "admin" | "manager" | "player") => {
    setRoleFilter(role)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12 text-foreground">
      
      {/* --- BOTÓN VOLVER --- */}
      <Link href="/admin">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary font-black text-[10px] uppercase tracking-widest px-0 mb-2 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Volver al Dashboard Root
        </Button>
      </Link>

      {/* --- CABECERA --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-[var(--radius)]">
            <UserCog className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Cuentas del <span className="text-primary">Sistema</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Gestiona accesos, roles y permisos de todos los usuarios.
            </p>
          </div>
        </div>
        
        <Button className="font-black italic uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-[var(--radius)]">
          <UserPlus className="mr-2 h-4 w-4" />
          Crear Usuario
        </Button>
      </div>

      {/* --- BARRA DE HERRAMIENTAS --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/30 p-4 rounded-[var(--radius)] border border-border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por usuario o email..." 
            className="pl-9 bg-background border-border/50 italic placeholder:not-italic font-medium rounded-[var(--radius)]"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Filter className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          {["all", "admin", "manager", "player"].map((role) => (
            <Button
              key={role}
              variant={roleFilter === role ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleChange(role as any)}
              className={cn(
                "h-8 text-[10px] font-black uppercase tracking-widest transition-all rounded-[calc(var(--radius)-4px)]",
                roleFilter === role 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-transparent text-muted-foreground hover:text-foreground border-border"
              )}
            >
              {role === "all" ? "Todos" : role}
            </Button>
          ))}
        </div>
      </div>

      {/* --- TABLA DE USUARIOS --- */}
      <div className="rounded-[var(--radius)] border border-border bg-card/30 overflow-hidden shadow-xl flex flex-col">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow className="border-border/50">
              <TableHead className="w-[300px] font-black uppercase text-[10px] tracking-widest text-muted-foreground">Usuario</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Nivel de Acceso</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Organización</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Estado</TableHead>
              <TableHead className="w-[80px] text-right font-black uppercase text-[10px] tracking-widest text-muted-foreground">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-medium italic">
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50 transition-colors border-border/50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="font-black bg-secondary">{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-black italic uppercase text-sm tracking-tight">{user.username}</span>
                        <span className="text-[10px] text-muted-foreground font-bold">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="outline" className={cn(
                      "text-[9px] uppercase font-black px-2 py-0.5 border-2 rounded-full",
                      user.role === "admin" && "border-primary text-primary bg-primary/5",
                      user.role === "manager" && "border-foreground/20 text-foreground bg-foreground/5",
                      user.role === "player" && "border-muted-foreground/20 text-muted-foreground bg-muted-foreground/5"
                    )}>
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-[10px] font-black text-muted-foreground uppercase italic tracking-wider">
                      {user.team || "— N/A —"}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="outline" className={cn(
                      "text-[8px] uppercase font-black tracking-tighter px-2",
                      user.status === "Active" ? "text-primary border-primary/20" : "text-destructive border-destructive/20"
                    )}>
                      {user.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-secondary/80 hover:text-primary transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-[calc(var(--radius)-2px)]">
                        <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Cuentas</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer font-black text-[10px] uppercase tracking-wider">
                          <Eye className="mr-2 h-4 w-4 text-primary" /> Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer font-black text-[10px] uppercase tracking-wider">
                          <Edit className="mr-2 h-4 w-4 text-foreground/50" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer font-black text-[10px] uppercase tracking-wider text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* --- PAGINACIÓN --- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-secondary/10">
            <div className="hidden sm:block text-[10px] text-muted-foreground font-black uppercase tracking-widest">
              {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length}
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                className="font-black text-[10px] uppercase tracking-widest rounded-[calc(var(--radius)-4px)]"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-[10px] font-black text-foreground uppercase tracking-widest">
                {currentPage} / {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="font-black text-[10px] uppercase tracking-widest rounded-[calc(var(--radius)-4px)]"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* --- ALERTAS --- */}
      <div className="p-4 rounded-[var(--radius)] bg-primary/5 border border-primary/20 flex items-center gap-3">
        <ShieldAlert className="h-5 w-5 text-primary shrink-0" />
        <p className="text-[10px] text-primary/80 font-black uppercase italic leading-tight">
          Seguridad: Modificar roles o eliminar cuentas afectará inmediatamente los permisos de la plataforma.
        </p>
      </div>
    </div>
  )
}