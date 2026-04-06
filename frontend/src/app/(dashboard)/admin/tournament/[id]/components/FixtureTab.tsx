import { Swords, Crosshair } from "lucide-react"
import { Button } from "@/components/ui/button"

export const FixtureTab = ({ matches, onReportClick }: { matches: any[], onReportClick: (m: any) => void }) => (
  <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-black uppercase italic flex items-center gap-2 text-foreground">
        <Swords className="h-5 w-5 text-primary" /> Operaciones de Combate
      </h2>
      <Button className="btn-tactical"><Crosshair className="h-4 w-4 mr-2" /> GENERAR CRUCES</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match) => (
        <div key={match.id} className="p-5 rounded-[var(--radius)] border border-border surface-panel relative group">
          <div className="absolute top-0 right-0 bg-primary/10 text-primary px-3 py-1 text-[10px] font-black uppercase">
            {match.round}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="flex-1 font-bold text-sm line-clamp-1">{match.homeTeam?.name || "TBD"}</p>
            <div className="flex items-center gap-2 bg-background border px-3 py-2 rounded-md font-black text-2xl font-display">
              <span className={match.homeScore > match.awayScore ? "text-primary" : ""}>{match.homeScore}</span>
              <span className="text-muted-foreground/30">-</span>
              <span className={match.awayScore > match.homeScore ? "text-primary" : ""}>{match.awayScore}</span>
            </div>
            <p className="flex-1 font-bold text-sm line-clamp-1">{match.awayTeam?.name || "TBD"}</p>
          </div>
          <Button variant="outline" onClick={() => onReportClick(match)} className="w-full mt-6 text-[10px] font-black tracking-widest border-primary/30">
            REPORTAR SCORE
          </Button>
        </div>
      ))}
    </div>
  </div>
)