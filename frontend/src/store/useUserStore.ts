import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1. El contrato perfecto: Le decimos a TypeScript exactamente qué esperar
export interface UserState {
  username: string | null;
  role: string | null;
  team: string | null;
  avatar: string | null;
  setUserData: (data: Partial<UserState>) => void;
  setAuth: (username: string, role: string) => void; // <--- Ahora acepta 2 argumentos
  logout: () => void;
}

// 2. La implementación
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      role: null,
      team: null,
      avatar: null,

      setUserData: (data) => set((state) => ({ ...state, ...data })),
      
      // <--- Toma los 2 argumentos del Login y los guarda en el estado global
      setAuth: (username, role) => set({ username, role }), 
      
      logout: () => set({ username: null, role: null, team: null, avatar: null }),
    }),
    {
      name: 'tourneyos-user-session',
    }
  )
)