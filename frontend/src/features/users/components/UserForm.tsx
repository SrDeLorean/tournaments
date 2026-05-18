"use client"

import { CoreForm } from "@/components/shared/CoreTable/CoreForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { userService } from "@/features/users/user.service"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { KeyRound, ShieldCheck, Mail, User as UserIcon, Gamepad2 } from "lucide-react"

interface UserFormProps {
  item?: any;
  onSuccess: () => void;
}

export function UserForm({ item, onSuccess }: UserFormProps) {
  
  /**
   * INTERCEPTOR DE SERVICIO
   * Si el campo passwordHash está vacío en edición, lo eliminamos del payload
   * para que el backend mantenga la contraseña original del usuario.
   */
  const handleServiceWrapper = {
    create: (data: any) => userService.createUser(data),
    update: (id: string, data: any) => {
      const payload = { ...data };
      
      // Verificación estricta: si no hay texto nuevo, no se envía la propiedad
      if (!payload.passwordHash || payload.passwordHash.trim() === "") {
        delete payload.passwordHash;
      }
      
      return userService.updateUser(id, payload);
    }
  }

  // Valores iniciales basados en el modelo User de Prisma
  const defaultValues = {
    gamertag: item?.gamertag || "",
    email: item?.email || "",
    passwordHash: "", // Siempre inicia vacío para evitar fugas de hashes o autocompletado
    role: item?.role || "player",
    gamertagEa: item?.gamertagEa || ""
  }

  return (
    <CoreForm
      item={item}
      onSuccess={onSuccess}
      service={handleServiceWrapper}
      defaultValues={defaultValues}
    >
      {(register, setValue) => (
        <div className="space-y-5">
          
          {/* SECCIÓN: IDENTIDAD PRINCIPAL */}
          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest text-primary flex items-center gap-2">
              <UserIcon className="h-3.5 w-3.5" /> Gamertag del Integrante
            </Label>
            <Input 
              {...register("gamertag")} 
              placeholder="EJ: SRDELOREAN"
              className="uppercase font-bold italic h-11 rounded-none border-2 border-border/60 focus-visible:ring-primary transition-all" 
              required 
            />
          </div>

          {/* SECCIÓN: CONTACTO */}
          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" /> Correo Electrónico
            </Label>
            <Input 
              {...register("email")} 
              type="email" 
              placeholder="CORREO@EJEMPLO.COM"
              className="font-bold h-11 rounded-none border-2 border-border/60 focus-visible:ring-primary transition-all" 
              required 
            />
          </div>

          {/* SECCIÓN: SEGURIDAD (PASSWORD) */}
          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest text-destructive flex items-center gap-2">
              <KeyRound className="h-3.5 w-3.5" /> {item ? "Resetear Contraseña" : "Password Inicial"}
            </Label>
            <Input 
              {...register("passwordHash")} 
              type="password"
              /* Evita que el navegador sugiera la contraseña actual del Admin */
              autoComplete="new-password" 
              placeholder={item ? "DEJAR VACÍO PARA MANTENER LA ACTUAL" : "MÍNIMO 8 CARACTERES"}
              className="font-bold h-11 rounded-none border-2 border-destructive/20 focus-visible:ring-destructive transition-all" 
              required={!item} 
            />
            {item && (
              <p className="text-[8px] font-black uppercase italic text-muted-foreground/60 leading-tight">
                Nota: La contraseña anterior no se muestra por seguridad. Solo escribe si deseas modificarla.
              </p>
            )}
          </div>

          {/* SECCIÓN: DATOS EA SPORTS */}
          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2">
              <Gamepad2 className="h-3.5 w-3.5 text-primary" /> EA Sports ID (Origin/PSN/Xbox)
            </Label>
            <Input 
              {...register("gamertagEa")} 
              placeholder="EJ: SRDELOREAN_EA"
              className="uppercase font-bold h-11 rounded-none border-2 border-border/60 focus-visible:ring-primary transition-all" 
            />
          </div>

          {/* SECCIÓN: GOBERNANZA (ROLES) */}
          <div className="grid gap-2">
            <Label className="text-[10px] font-black uppercase italic tracking-widest flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Permisos del Sistema
            </Label>
            <Select 
              onValueChange={(value) => setValue("role", value)} 
              defaultValue={item?.role || "player"}
            >
              <SelectTrigger className="h-11 rounded-none border-2 border-border/60 font-black uppercase italic text-[10px] tracking-widest">
                <SelectValue placeholder="SELECCIONAR ROL" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-primary bg-card/95 backdrop-blur-xl">
                <SelectItem value="player" className="font-black uppercase italic text-[10px] focus:bg-primary focus:text-primary-foreground">PLAYER</SelectItem>
                <SelectItem value="manager" className="font-black uppercase italic text-[10px] focus:bg-primary focus:text-primary-foreground">MANAGER</SelectItem>
                <SelectItem value="admin" className="font-black uppercase italic text-[10px] focus:bg-primary focus:text-primary-foreground">ADMINISTRADOR</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
      )}
    </CoreForm>
  )
}