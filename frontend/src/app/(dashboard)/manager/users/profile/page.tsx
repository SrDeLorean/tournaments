"use client"
import { UserProfile } from "@/features/users/components/UserProfile"
// Asumiendo que tienes un hook o store para saber quién es el usuario logueado
import { useAuth } from "@/features/auth/hooks/useAuth" 

export default function MyProfilePage() {
  const { user } = useAuth() // Sacamos el ID del usuario activo

  if (!user) return null

  return (
    <div className="max-w-7xl mx-auto pb-12 pt-6 px-4">
      {/* Aquí puedes agregar un botón extra de "Editar mi perfil" que el manager no vería */}
      <div className="flex justify-between items-center mb-6 border-b border-border/40 pb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">PERFIL PERSONAL</h2>
      </div>

      <UserProfile userId={user.id} />
    </div>
  )
}