import { ArrowLeft, Crosshair } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  name: string
  status: string
  creatorTag: string
}

export const TournamentHeader = ({ name, status, creatorTag }: Props) => {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between border-b border-border pb-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/tournament')} className="hover:bg-primary/10 hover:text-primary">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-foreground flex items-center gap-3">
            {name} 
            <span className={status === "OPEN" || status === "IN_PROGRESS" ? "status-led-online" : "h-2 w-2 rounded-full bg-muted-foreground"} />
          </h1>
          <p className="text-sm text-muted-foreground font-medium mt-1 flex items-center gap-2">
            <Crosshair className="h-4 w-4 text-primary" /> 
            Operador: <span className="text-foreground font-bold">{creatorTag}</span>
          </p>
        </div>
      </div>
    </div>
  )
}