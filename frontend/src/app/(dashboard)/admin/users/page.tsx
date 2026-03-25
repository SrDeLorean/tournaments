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
  // 1. Estados para búsqueda, filtro de rol y paginación
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "manager" | "player">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // Máximo de usuarios por página

  // 2. Aplicamos filtros de Búsqueda y Rol
  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  // 3. Lógica de Paginación Matemática
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  // 4. Funciones manejadoras (resetean a la página 1 para evitar errores)
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleRoleChange = (role: "all" | "admin" | "manager" | "player") => {
    setRoleFilter(role)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* --- BOTÓN VOLVER --- */}
      <Link href="/admin">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-orange-500 font-bold text-xs uppercase tracking-widest px-0 mb-2">
          <ChevronLeft className="h-4 w-4" />
          Volver al Dashboard Root
        </Button>
      </Link>

      {/* --- CABECERA --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl">
            <UserCog className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Cuentas del <span className="text-orange-500">Sistema</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Gestiona accesos, roles y permisos de todos los usuarios.
            </p>
          </div>
        </div>
        
        <Button className="font-black italic uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
          <UserPlus className="mr-2 h-4 w-4" />
          Crear Usuario
        </Button>
      </div>

      {/* --- BARRA DE HERRAMIENTAS (Buscador y Filtros) --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/30 p-4 rounded-2xl border border-border shadow-sm">
        
        {/* Buscador */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por usuario o email..." 
            className="pl-9 bg-background border-border/50 italic placeholder:not-italic font-medium"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filtros de Rol */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Filter className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          {["all", "admin", "manager", "player"].map((role) => (
            <Button
              key={role}
              variant={roleFilter === role ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleChange(role as any)}
              className={cn(
                "h-8 text-xs font-bold uppercase tracking-widest transition-all",
                roleFilter === role 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {role === "all" ? "Todos" : role}
            </Button>
          ))}
        </div>
      </div>

      {/* --- TABLA DE USUARIOS --- */}
      <div className="rounded-2xl border border-border bg-card/30 overflow-hidden shadow-xl flex flex-col">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="w-[300px] font-black uppercase text-[10px] tracking-widest">Usuario</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest">Nivel de Acceso</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest">Organización</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest">Estado</TableHead>
              <TableHead className="w-[80px] text-right font-black uppercase text-[10px] tracking-widest">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-medium italic">
                  No se encontraron usuarios que coincidan con la búsqueda.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                  
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-black italic uppercase text-sm">{user.username}</span>
                        <span className="text-[10px] text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[10px] uppercase font-black px-2 py-0.5 border-2",
                      user.role === "admin" && "border-orange-500/50 text-orange-500 bg-orange-500/10",
                      user.role === "manager" && "border-blue-500/50 text-blue-500 bg-blue-500/10",
                      user.role === "player" && "border-primary/50 text-primary bg-primary/10"
                    )}>
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      {user.team || "— N/A —"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[9px] uppercase font-bold",
                      user.status === "Active" ? "text-green-500 border-green-500/20" : "text-red-500 border-red-500/20"
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
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer font-medium text-xs">
                          <Eye className="mr-2 h-4 w-4 text-primary" /> Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer font-medium text-xs">
                          <Edit className="mr-2 h-4 w-4 text-blue-500" /> Editar Rol / Equipo
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer font-bold text-xs text-red-500 focus:text-red-500 focus:bg-red-500/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar Cuenta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* --- CONTROLES DE PAGINACIÓN --- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-secondary/10">
            <div className="hidden sm:block text-xs text-muted-foreground font-medium uppercase tracking-widest">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                className="font-bold text-xs uppercase tracking-widest"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
              </Button>
              
              <div className="text-xs font-black text-foreground uppercase tracking-widest">
                Pág. {currentPage} / {totalPages}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="font-bold text-xs uppercase tracking-widest"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20 flex items-center gap-3">
        <ShieldAlert className="h-5 w-5 text-orange-500 shrink-0" />
        <p className="text-xs text-orange-500/80 font-medium italic">
          Cuidado: Modificar el rol o eliminar a un usuario afectará inmediatamente sus permisos y registros en la plataforma.
        </p>
      </div>
    </div>
  )
}