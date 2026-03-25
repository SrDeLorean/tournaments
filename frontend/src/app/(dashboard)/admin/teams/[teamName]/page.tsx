// src/app/(dashboard)/admin/teams/[teamName]/page.tsx
import { TeamManagement } from "@/features/teams/components/TeamManagement"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminTeamDetailPage({ params }: { params: Promise<{ teamName: string }> }) {
  const resolvedParams = await params;
  const teamName = decodeURIComponent(resolvedParams.teamName);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* EL BOTÓN AHORA VUELVE A LA LISTA DE EQUIPOS */}
      <Link href="/admin/teams">
        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-orange-500 font-bold text-xs uppercase tracking-widest px-0 mb-4">
          <ChevronLeft className="h-4 w-4" />
          Volver a Equipos
        </Button>
      </Link>

      <TeamManagement teamName={teamName} isGlobalAdmin={true} />
    </div>
  )
}