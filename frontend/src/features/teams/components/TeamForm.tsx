"use client"

import { CoreForm } from "@/components/shared/CoreTable/CoreForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { teamService } from "@/features/teams/team.service"

export function TeamForm({ item, onSuccess }: { item?: any; onSuccess: () => void }) {
  const defaultValues = {
    name: "",
    logoUrl: "",
    clubIdEa: "",
    ownerId: ""
  }

  return (
    <CoreForm
      item={item}
      onSuccess={onSuccess}
      service={{
        create: (data) => teamService.createTeam(data),
        update: (id, data) => teamService.updateTeam(id, data),
      }}
      defaultValues={defaultValues}
    >
      {(register) => (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest text-primary">Nombre de Franquicia</Label>
            <Input {...register("name")} className="uppercase font-bold h-11 rounded-none border-2" required />
          </div>

          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest">Club ID EA Sports</Label>
            <Input {...register("clubIdEa")} className="font-bold h-11 rounded-none border-2" placeholder="ID ÚNICO EA" />
          </div>

          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest">URL del Escudo</Label>
            <Input {...register("logoUrl")} className="font-bold h-11 rounded-none border-2" placeholder="HTTPS://..." />
          </div>

          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest text-primary">ID del Dueño (Owner ID)</Label>
            <Input {...register("ownerId")} className="font-mono text-[11px] h-11 rounded-none border-2" placeholder="UUID DEL USUARIO" />
            <p className="text-[9px] font-bold uppercase italic opacity-50">VINCULA ESTE EQUIPO A UN USUARIO ESPECÍFICO.</p>
          </div>
        </div>
      )}
    </CoreForm>
  )
}