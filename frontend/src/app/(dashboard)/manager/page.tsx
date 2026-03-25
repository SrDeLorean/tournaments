import { TeamManagement } from "@/features/teams/components/TeamManagement"

export default function ManagerPage() {
  // Aquí luego haremos el fetch a PHP: SELECT * FROM players WHERE team_id = 'my_team'
  const myPlayers = [] 

  return (
    <div className="max-w-6xl mx-auto">
      <TeamManagement 
        teamName="Successors" 
        players={myPlayers} 
        isGlobalAdmin={false} 
      />
    </div>
  )
}