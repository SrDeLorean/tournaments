import { UserProfile } from "@/features/users/components/UserProfile"
import { ChevronLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="max-w-7xl mx-auto pb-12 pt-6 px-4 animate-in fade-in duration-500">
      
      {/* --- NAVEGACIÓN Y AVISO DE PRIVILEGIOS --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border/40 pb-4">
        <Link href="/admin/users">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary font-black text-[10px] uppercase px-0 transition-all hover:-translate-x-1">
            <ChevronLeft className="h-4 w-4" />
            Volver al Directorio Global
          </Button>
        </Link>

        <div className="flex items-center gap-2 bg-primary/10 border-l-2 border-primary px-3 py-1.5">
          <ShieldAlert className="h-3 w-3 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-widest text-primary italic">
            MODO SUPERADMINISTRADOR: INSPECCIÓN DE NÚCLEO
          </span>
        </div>
      </div>

      {/* --- EL COMPONENTE MAESTRO HACE EL RESTO --- */}
      <UserProfile userId={id} />

    </div>
  )
}