import { TableRow, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, RotateCcw, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export function CoreTableRow({ item, columns, onViewDetails, onEdit, onDelete, onRestore }: any) {
  return (
    <TableRow className={cn("hover:bg-primary/5 border-border/30 transition-colors", !item.active && "opacity-60 bg-destructive/5")}>
      {columns.map((col: any, i: number) => (
        <TableCell key={i} className={cn(i !== 0 && "text-center")}>
          {col.render ? col.render(item) : item[col.key]}
        </TableCell>
      ))}

      <TableCell className="text-right px-6">
        <div className="flex justify-end gap-2">
          {onViewDetails && (
            <Button variant="ghost" size="icon" onClick={() => onViewDetails(item)} className="hover:text-primary h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-none border-2 border-primary bg-card/95 backdrop-blur-xl font-black uppercase text-[10px]">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(item)} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" /> Editar Perfil
                </DropdownMenuItem>
              )}
              {item.active === false && onRestore ? (
                <DropdownMenuItem onClick={onRestore} className="cursor-pointer text-primary">
                  <RotateCcw className="mr-2 h-4 w-4" /> Recuperar Registro
                </DropdownMenuItem>
              ) : onDelete ? (
                <DropdownMenuItem onClick={() => onDelete(item)} className="cursor-pointer text-destructive focus:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  )
}