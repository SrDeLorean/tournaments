"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Loader2, Save, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface CoreFormProps {
  item?: any;         // Datos para editar (si existen)
  onSuccess: () => void;
  service: {
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
  };
  defaultValues: any;
  children: (register: any, setValue: any, errors: any) => React.ReactNode;
}

export function CoreForm({ item, onSuccess, service, defaultValues, children }: CoreFormProps) {
  const [loading, setLoading] = useState(false)
  const isEdit = !!item

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues
  })

  // Sincronizar datos al editar
  useEffect(() => {
    if (item) {
      reset(item)
    } else {
      reset(defaultValues)
    }
  }, [item, reset, defaultValues])

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      if (isEdit) {
        await service.update(item.id, data)
        toast.success("REGISTRO ACTUALIZADO EN EL NÚCLEO")
      } else {
        await service.create(data)
        toast.success("NUEVO REGISTRO SINCRONIZADO")
      }
      onSuccess() // Cierra el modal y refresca la tabla
    } catch (error: any) {
      const msg = error.response?.data?.message?.toUpperCase() || "FALLO CRÍTICO EN LA OPERACIÓN"
      toast.error(msg, { icon: <AlertTriangle className="h-4 w-4" /> })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6">
      {/* RENDERIZADO DE CAMPOS DINÁMICOS */}
      <div className="space-y-4">
        {children(register, setValue, errors)}
      </div>

      {/* BOTÓN DE ACCIÓN TOURNEYOS STYLE */}
      <Button 
        disabled={loading} 
        type="submit"
        className="w-full h-12 font-black italic uppercase tracking-[0.2em] shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none border-b-4 border-black/20 active:translate-y-1 transition-all"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-5 w-5" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        {isEdit ? "GUARDAR CAMBIOS" : "CONFIRMAR REGISTRO"}
      </Button>
      
      <p className="text-[9px] text-center font-bold uppercase tracking-widest text-muted-foreground/50 italic">
        TOURNEYOS CORE // PROTOCOLO DE ESCRITURA SEGURO
      </p>
    </form>
  )
}