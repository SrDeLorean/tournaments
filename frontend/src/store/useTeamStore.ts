// src/store/useTeamStore.ts
import { create } from 'zustand';
import { Team } from '@/types/roles';

interface TeamStore {
  activeTeam: Team | null;
  setActiveTeam: (team: Team) => void;
  clearActiveTeam: () => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  activeTeam: null, // Por defecto no hay equipo seleccionado hasta que cargue
  
  setActiveTeam: (team) => set({ activeTeam: team }),
  
  clearActiveTeam: () => set({ activeTeam: null }),
}));