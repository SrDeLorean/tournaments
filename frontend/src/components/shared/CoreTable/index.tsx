"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, DatabaseZap } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CoreTableHeader } from "./CoreTableHeader"
import { CoreTableRow } from "./CoreTableRow"
import { CoreDeleteDialog } from "./CoreDeleteDialog"

interface CoreTableProps<T> {
  title: string;
  entityName: string;
  service: {
    get: (showInactive: boolean) => Promise<T[]>;
    delete?: (id: string) => Promise<any>;
    restore?: (id: string) => Promise<any>;
  };
  columns: { header: string; key: string; render?: (item: T) => React.ReactNode }[];
  formComponent?: React.ComponentType<{ item?: T | null; onSuccess: () => void }>;
  onViewDetails?: (item: T) => void;
  primaryActionLabel?: string;
}

export function CoreTable<T extends { id: string; active?: boolean }>({ 
  title, entityName, service, columns, formComponent: Form, onViewDetails, primaryActionLabel 
}: CoreTableProps<T>) {
  
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState(false)
  const [showInactive, setShowInactive] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await service.get(showInactive)
      setData(result)
      setDbError(false)
    } catch (error) {
      setDbError(true)
    } finally {
      setLoading(false)
    }
  }, [service, showInactive])

  useEffect(() => { fetchData() }, [fetchData])

  const filteredData = data.filter((item: any) => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-6 w-full overflow-hidden">
      <CoreTableHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        showInactive={showInactive} 
        setShowInactive={setShowInactive}
        onPrimaryAction={Form ? () => { setSelectedItem(null); setIsSheetOpen(true); } : undefined}
        primaryActionLabel={primaryActionLabel}
        dbError={dbError}
        hasInactiveFilter={!!service.restore}
      />

      <div className="border border-border/60 bg-card/20 overflow-x-auto no-scrollbar shadow-2xl">
        <Table className="min-w-[700px] sm:min-w-full">
          <TableHeader className="bg-secondary/40 font-black uppercase italic text-[10px]">
            <TableRow className="border-border/40 hover:bg-transparent">
              {columns.map((col, i) => (
                <TableHead key={i} className={cn("py-4 tracking-widest", i !== 0 && "text-center")}>
                  {col.header}
                </TableHead>
              ))}
              <TableHead className="text-right tracking-widest px-6">ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={columns.length + 1} className="h-40 text-center animate-pulse italic opacity-50">SINCRONIZANDO...</TableCell></TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow><TableCell colSpan={columns.length + 1} className="h-40 text-center italic opacity-30">SIN REGISTROS</TableCell></TableRow>
            ) : (
              filteredData.map((item) => (
                <CoreTableRow 
                  key={item.id} item={item} columns={columns} onViewDetails={onViewDetails}
                  onEdit={Form ? (i) => { setSelectedItem(i); setIsSheetOpen(true); } : undefined}
                  onDelete={service.delete ? (i) => { setSelectedItem(i); setIsDeleteDialogOpen(true); } : undefined}
                  onRestore={service.restore ? async () => { await service.restore!(item.id); fetchData(); } : undefined}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CoreDeleteDialog 
        isOpen={isDeleteDialogOpen} 
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={async () => { if(service.delete) await service.delete(selectedItem!.id); fetchData(); setIsDeleteDialogOpen(false); }} 
        itemName={(selectedItem as any)?.name || (selectedItem as any)?.gamertag}
      />

      {Form && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="border-l-4 border-primary bg-card/95 backdrop-blur-md">
            <SheetHeader className="border-b border-border/50 pb-6">
              <SheetTitle className="text-3xl font-black uppercase italic tracking-tighter">
                {selectedItem ? "MODIFICAR" : "REGISTRAR"} <span className="text-primary">{entityName}</span>
              </SheetTitle>
            </SheetHeader>
            {/* INYECCIÓN DEL FORMULARIO DINÁMICO */}
            <Form item={selectedItem} onSuccess={() => { setIsSheetOpen(false); fetchData(); }} />
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}