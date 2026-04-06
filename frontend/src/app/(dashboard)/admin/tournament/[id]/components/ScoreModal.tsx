import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const ScoreModal = ({ match, homeScore, awayScore, setHomeScore, setAwayScore, onClose, onSubmit, isProcessing }: any) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="w-full max-w-md p-6 rounded-[var(--radius)] border border-primary/50 bg-card shadow-2xl relative overflow-hidden neon-glow">
      <h3 className="text-xl font-black uppercase italic text-center mb-6">Confirmar Marcador</h3>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex items-center justify-between gap-4 text-center">
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase mb-2 line-clamp-1">{match.homeTeam?.name}</p>
            <Input type="number" value={homeScore} onChange={(e) => setHomeScore(parseInt(e.target.value))} className="text-center text-3xl font-display h-16 bg-secondary/50" />
          </div>
          <div className="text-2xl font-black text-muted-foreground/30">-</div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase mb-2 line-clamp-1">{match.awayTeam?.name}</p>
            <Input type="number" value={awayScore} onChange={(e) => setAwayScore(parseInt(e.target.value))} className="text-center text-3xl font-display h-16 bg-secondary/50" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">CANCELAR</Button>
          <Button type="submit" disabled={isProcessing} className="flex-1 btn-action-primary">CONFIRMAR</Button>
        </div>
      </form>
    </div>
  </div>
)