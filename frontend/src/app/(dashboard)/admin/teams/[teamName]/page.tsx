// src/app/(dashboard)/admin/teams/[teamName]/page.tsx
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TeamManagement } from "@/features/teams/components/TeamManagement"

export default async function AdminTeamDetailPage({ params }: { params: Promise<{ teamName: string }> }) {
  const { teamName } = await params
  const decodedTeamName = decodeURIComponent(teamName)

  return (
    <div className="space-y-6">
      <Link href="/admin/teams">
        <Button variant="ghost" size="sm" className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Volver a Equipos
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          Gestionar: <span className="text-primary">{decodedTeamName}</span>
        </h1>
      </div>

      <TeamManagement 
        teamName={decodedTeamName} 
        isGlobalAdmin={true} 
      />
    </div>
  )
}

// Esto le dice a Next.js qué carpetas crear en el build
export function generateStaticParams() {
  return [
    { teamName: 'Successors' },
    { teamName: 'Elite-FC' },
    { teamName: 'Reapers-Esports' }
  ]
}