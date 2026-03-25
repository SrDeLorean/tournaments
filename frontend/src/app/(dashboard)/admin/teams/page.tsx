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
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10 

  const teams = Object.values(MOCK_TEAMS)
  const filteredTeams = teams.filter((team) => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage)
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* 1. BOTÓN VOLVER - Sin texto pequeño hardcodeado */}
      <Link href="/admin">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary font-black uppercase tracking-widest px-0 mb-2">
          <ChevronLeft className="h-4 w-4" />
          Volver al Dashboard Root
        </Button>
      </Link>

      {/* 2. CABECERA - Eliminadas opacidades /50 o /20 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-[var(--radius)]">
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-black uppercase italic tracking-tighter">
              Directorio de <span className="text-primary">Clubes</span>
            </h1>
            <p className="text-muted-foreground font-medium mt-1 uppercase italic">
              Gestiona las organizaciones y accede a sus plantillas.
            </p>
          </div>
        </div>
        
        <Button className="font-black italic uppercase tracking-widest bg-primary text-primary-foreground shadow-lg rounded-[var(--radius)]">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Club
        </Button>
      </div>

      {/* 3. BARRA DE BÚSQUEDA - Radio dinámico y sin px fijos */}
      <div className="bg-card p-4 rounded-[var(--radius)] border border-border shadow-sm flex items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar club por nombre..." 
            className="pl-9 bg-background border-border italic placeholder:not-italic font-medium rounded-[var(--radius)]"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 4. TABLA - Limpieza total de modificadores manuales */}
      <div className="rounded-[var(--radius)] border border-border bg-card overflow-hidden shadow-xl flex flex-col">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow className="border-border">
              <TableHead className="w-[350px] font-black uppercase tracking-widest text-muted-foreground">Organización</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-center text-muted-foreground">Plantilla</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-center text-muted-foreground">Estado</TableHead>
              <TableHead className="w-[80px] text-right font-black uppercase tracking-widest text-muted-foreground">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground font-medium italic uppercase">
                  No se encontraron clubes registrados.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTeams.map((team) => (
                <TableRow key={team.id} className="hover:bg-secondary border-border transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={team.logo} alt={team.name} 
                          className="w-12 h-12 rounded-[calc(var(--radius)-4px)] bg-background border border-border relative z-10 p-1 object-contain" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black italic uppercase tracking-tight text-foreground">{team.name}</span>
                        <span className="text-muted-foreground uppercase font-black tracking-widest">ID: {team.id}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="secondary" className="font-black px-3 py-1 text-foreground border border-border">
                      <Users className="mr-2 h-3.5 w-3.5 text-primary" />
                      {team.players.length} / 11
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant="outline" className="uppercase font-black text-primary border-primary bg-primary/10">
                      Verificado
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-secondary hover:text-primary transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-[calc(var(--radius)-2px)]">
                        <DropdownMenuLabel className="font-black uppercase tracking-widest text-muted-foreground">Opciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer font-black uppercase tracking-wider">
                          <Link href={`/admin/teams/${team.name}`} className="w-full flex items-center">
                            <Eye className="mr-2 h-4 w-4 text-primary" /> Ver Roster
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer font-black uppercase tracking-wider">
                          <Edit className="mr-2 h-4 w-4 text-foreground" /> Editar Perfil
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer font-black uppercase tracking-wider text-destructive focus:bg-destructive focus:text-destructive-foreground">
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

        {/* 5. PAGINACIÓN - Controlada por variables globales */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary">
            <div className="hidden sm:block text-muted-foreground font-black uppercase tracking-widest">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredTeams.length)} de {filteredTeams.length}
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                className="font-black uppercase tracking-widest rounded-[calc(var(--radius)-4px)]"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="font-black text-foreground uppercase tracking-widest">
                {currentPage} / {totalPages}
              </div>
              
              <Button
                variant="outline"
                className="font-black uppercase tracking-widest rounded-[calc(var(--radius)-4px)]"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}