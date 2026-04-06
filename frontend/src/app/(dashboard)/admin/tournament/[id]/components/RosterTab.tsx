import { Shield, Users, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  teams: any[]
  maxTeams: number
  newTeamName: string
  setNewTeamName: (val: string) => void
  onRegister: (e: React.FormEvent) => void
  onRemove: (id: string) => void
  isProcessing: boolean
  status: string
}

export const RosterTab = ({ teams, maxTeams, newTeamName, setNewTeamName, onRegister, onRemove, isProcessing, status }: Props) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-300">
    <div className="lg:col-span-1 space-y-6">
      <div className="p-6 rounded-[var(--radius)] border border-primary/30 bg-card/40 glass-card neon-glow">
        <h2 className="text-[12px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4" /> Registrar Batallón
        </h2>
        <form onSubmit={onRegister} className="space-y-4">
          <Input 
            placeholder="Nombre del equipo" 
            value={newTeamName} 
            onChange={(e) => setNewTeamName(e.target.value)} 
            className="bg-background h-12" 
            disabled={teams.length >= maxTeams} 
          />
          <Button type="submit" disabled={isProcessing || !newTeamName.trim() || teams.length >= maxTeams} className="btn-action-primary h-12 w-full">
            {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "INSCRIBIR EQUIPO"}
          </Button>
        </form>
      </div>
    </div>

    <div className="lg:col-span-2">
      <h2 className="text-lg font-black uppercase italic mb-4 flex items-center gap-2 text-foreground">
        <Users className="h-5 w-5 text-primary" /> Roster Oficial
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team, idx) => (
          <div key={team.id} className="p-4 rounded-[var(--radius)] border border-border bg-secondary/20 flex items-center justify-between group hover:border-primary/40">
            <div className="flex items-center gap-3">
              <div className="font-black text-xl text-primary/30 w-6">#{idx + 1}</div>
              <div>
                <h3 className="font-bold text-base uppercase text-foreground">{team.name}</h3>
                <p className="text-[10px] text-muted-foreground font-bold">CAP: {team.captain?.gamertag}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(team.id)} className="opacity-0 group-hover:opacity-100 text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
)