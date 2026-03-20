// src/store/useUserStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ... interfaz UserState ...

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      role: null,
      isAuthenticated: false,

      setAuth: (username, role) => set({ 
        username, 
        role, 
        isAuthenticated: true 
      }),

      logout: () => {
        // 1. Limpiamos el estado de Zustand
        set({ username: null, role: null, isAuthenticated: false });
        
        // 2. Limpiamos el token de Axios/LocalStorage si existe
        localStorage.removeItem('auth_token');
        
        // 3. Opcional: Forzar redirección al login
        window.location.href = '/login';
      },
    }),
    {
      name: 'user-storage', // Nombre de la cookie/storage
      storage: createJSONStorage(() => localStorage),
    }
  )
)