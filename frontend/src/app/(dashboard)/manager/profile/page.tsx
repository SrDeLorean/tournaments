import { UserProfile } from "@/features/users/components/UserProfile"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ManagerUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="max-w-7xl mx-auto pb-12 pt-6 px-4">
      {/* Botón para volver a la tabla de Roster */}
      <Link href="/manager/users">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary font-black text-[10px] uppercase px-0 mb-6 transition-all hover:-translate-x-1">
          <ChevronLeft className="h-4 w-4" />
          Volver a Gestión de Roster
        </Button>
      </Link>

      {/* El componente maestro hace todo el trabajo */}
      <UserProfile userId={id} />
    </div>
  )
}