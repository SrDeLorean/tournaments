"use client"

import { useState } from "react"
import Link from "next/link"
import { MOCK_TEAMS } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  ShieldCheck, MoreHorizontal, Plus, Search, 
  Eye, Edit, Trash2, Users, ChevronLeft, ChevronRight 
} from "lucide-react"

export default function AdminTeamsList() {
  // 1. Estados para el buscador y la paginación
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 // <--- Aquí defines el máximo por página

  // 2. Extraemos los equipos y aplicamos el filtro de búsqueda
  const teams = Object.values(MOCK_TEAMS)
  const filteredTeams = teams.filter((team) => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 3. LÓGICA DE PAGINACIÓN MATEMÁTICA
  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage)
  
  // Cortamos el array para mostrar solo los 10 de la página actual
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  // Función para manejar la búsqueda (resetea a la página 1 al escribir)
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      
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
            <ShieldCheck className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Directorio de <span className="text-orange-500">Clubes</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Gestiona las organizaciones y accede a sus plantillas.
            </p>
          </div>
        </div>
        
        <Button className="font-black italic uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Club
        </Button>
      </div>

      {/* --- BARRA DE BÚSQUEDA --- */}
      <div className="bg-card/30 p-4 rounded-2xl border border-border shadow-sm flex items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar club por nombre..." 
            className="pl-9 bg-background border-border/50 italic placeholder:not-italic font-medium"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* --- TABLA DE EQUIPOS --- */}
      <div className="rounded-2xl border border-border bg-card/30 overflow-hidden shadow-xl flex flex-col">
        <Table>
          <TableHeader className="bg-secondary/30">
            <TableRow>
              <TableHead className="w-[350px] font-black uppercase text-[10px] tracking-widest">Organización</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">Plantilla</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">Estado</TableHead>
              <TableHead className="w-[80px] text-right font-black uppercase text-[10px] tracking-widest">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground font-medium italic">
                  No se encontraron clubes registrados.
                </TableCell>
              </TableRow>
            ) : (
              // Fíjate que ahora mapeamos "paginatedTeams", no "filteredTeams"
              paginatedTeams.map((team) => (
                <TableRow key={team.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
                        <img 
                          src={team.logo} alt={team.name} 
                          className="w-12 h-12 rounded-xl bg-background border border-border/50 relative z-10 p-1 object-contain" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black italic uppercase text-base tracking-tight">{team.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">ID: {team.id}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-black text-xs px-3 py-1 bg-secondary/80">
                      <Users className="mr-2 h-3.5 w-3.5 text-primary" />
                      {team.players.length} / 11
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-[9px] uppercase font-bold text-green-500 border-green-500/20 bg-green-500/10">
                      Verificado
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-secondary/80 hover:text-orange-500 transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer font-medium text-xs">
                          <Link href={`/admin/teams/${team.name}`} className="w-full flex items-center">
                            <Eye className="mr-2 h-4 w-4 text-orange-500" /> Ver Roster
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer font-medium text-xs">
                          <Edit className="mr-2 h-4 w-4 text-blue-500" /> Editar Perfil
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer font-bold text-xs text-red-500 focus:text-red-500 focus:bg-red-500/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar Club
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
              Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredTeams.length)} de {filteredTeams.length} clubes
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

    </div>
  )
}