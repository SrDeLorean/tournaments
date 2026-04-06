"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import api from "@/lib/api"

// Importación de tus sub-componentes (Asegúrate de crearlos en la carpeta /components)
import { TournamentHeader } from "./components/TournamentHeader"
import { RosterTab } from "./components/RosterTab"
import { FixtureTab } from "./components/FixtureTab"
import { SettingsTab } from "./components/SettingsTab" // Opcional si lo separaste
import { ScoreModal } from "./components/ScoreModal"

// --- INTERFACES ---
interface Tournament { 
  id: string; name: string; game: string; status: string; maxTeams: number; 
  creator: { gamertag: string } 
}
interface Team { id: string; name: string; captain: { gamertag: string } }
interface Match { 
  id: string; round: string; homeScore: number; awayScore: number; status: string; 
  homeTeam?: { id: string, name: string }; awayTeam?: { id: string, name: string } 
}

export default function TournamentControlPanel() {
  const params = useParams()
  const tournamentId = params?.id as string

  // --- ESTADOS DE DATOS ---
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"ROSTER" | "FIXTURE" | "SETTINGS">("ROSTER")
  const [isProcessing, setIsProcessing] = useState(false)

  // --- ESTADOS DE FORMULARIOS ---
  const [newTeamName, setNewTeamName] = useState("")
  const [editName, setEditName] = useState("")
  const [editStatus, setEditStatus] = useState("")
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [homeScoreInput, setHomeScoreInput] = useState<number>(0)
  const [awayScoreInput, setAwayScoreInput] = useState<number>(0)

  useEffect(() => {
    if (tournamentId) fetchData()
  }, [tournamentId])

  const fetchData = async () => {
    try {
      const [tourneyRes, teamsRes, matchesRes] = await Promise.all([
        api.get(`/tournament/${tournamentId}`),
        api.get(`/team/tournament/${tournamentId}`),
        api.get(`/match/tournament/${tournamentId}`)
      ])
      setTournament(tourneyRes.data)
      setTeams(teamsRes.data)
      setMatches(matchesRes.data)
      setEditName(tourneyRes.data.name)
      setEditStatus(tourneyRes.data.status)
    } catch (error) {
      console.error("Error al cargar datos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateTournament = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
        await api.put(`/tournament/${tournamentId}`, { name: editName, status: editStatus })
        fetchData()
        alert("Configuración actualizada")
    } catch (error) {
        console.error("Error al actualizar", error)
    } finally {
        setIsProcessing(false)
    }
    }
    const handleDeleteTournament = async () => {
        if (!confirm("⚠️ ADVERTENCIA: ¿Estás seguro de eliminar esta Operación? Esta acción es irreversible.")) return;
        
        setIsProcessing(true)
        try {
        await api.delete(`/tournament/${tournamentId}`)
        // Importante: Redirigir al listado general después de borrar
        router.push('/admin/tournament') 
        } catch (error) {
        console.error("Error al eliminar", error)
        alert("No se pudo eliminar el torneo")
        } finally {
        setIsProcessing(false)
        }
    }

  const handleRegisterTeam = async (e: React.FormEvent) => {
    e.preventDefault(); if (!newTeamName.trim()) return;
    setIsProcessing(true);
    try { 
      await api.post('/team', { name: newTeamName, tournamentId }); 
      setNewTeamName(""); fetchData(); 
    } finally { setIsProcessing(false) }
  }

  const handleRemoveTeam = async (teamId: string) => {
    if (!confirm("¿Retirar equipo?")) return;
    try { await api.delete(`/team/${teamId}`); fetchData(); } catch (e) { console.error(e) }
  }

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault(); if (!selectedMatch) return;
    setIsProcessing(true);
    let winnerId = homeScoreInput > awayScoreInput ? selectedMatch.homeTeam?.id : 
                   awayScoreInput > homeScoreInput ? selectedMatch.awayTeam?.id : null;
    try {
      await api.put(`/match/${selectedMatch.id}/score`, {
        homeScore: homeScoreInput, awayScore: awayScoreInput, status: "COMPLETED", winnerId
      });
      setSelectedMatch(null); fetchData();
    } finally { setIsProcessing(false) }
  }

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
  if (!tournament) return <div className="p-20 text-center text-destructive font-black uppercase italic">Operación No Encontrada</div>

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <TournamentHeader 
        name={tournament.name} 
        status={tournament.status} 
        creatorTag={tournament.creator?.gamertag} 
      />

      <div className="flex gap-4 border-b border-border">
        {["ROSTER", "FIXTURE", "SETTINGS"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 px-2 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "ROSTER" && (
        <RosterTab 
          teams={teams} 
          maxTeams={tournament.maxTeams} 
          newTeamName={newTeamName}
          setNewTeamName={setNewTeamName}
          onRegister={handleRegisterTeam}
          onRemove={handleRemoveTeam}
          isProcessing={isProcessing}
          status={tournament.status}
        />
      )}

      {activeTab === "FIXTURE" && (
        <FixtureTab 
          matches={matches} 
          onReportClick={(m) => {
            setSelectedMatch(m);
            setHomeScoreInput(m.homeScore);
            setAwayScoreInput(m.awayScore);
          }} 
        />
      )}

      {activeTab === "SETTINGS" && (
        <SettingsTab 
        editName={editName}
        setEditName={setEditName}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        onUpdate={handleUpdateTournament}
        onDelete={handleDeleteTournament}
        isProcessing={isProcessing}
        />
    )}

      {selectedMatch && (
        <ScoreModal 
          match={selectedMatch}
          homeScore={homeScoreInput}
          awayScore={awayScoreInput}
          setHomeScore={setHomeScoreInput}
          setAwayScore={setAwayScoreInput}
          onClose={() => setSelectedMatch(null)}
          onSubmit={handleSubmitScore}
          isProcessing={isProcessing}
        />
      )}
    </div>
  )
}