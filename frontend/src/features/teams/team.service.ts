import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const teamService = {
  // LISTAR (GET) - Usando /team en singular para ser igual a /user
  getTeams: async (showInactive: boolean = false) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await axios.get(`${API_URL}/team?includeInactive=${showInactive}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // CREAR (POST)
  createTeam: async (teamData: any) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await axios.post(`${API_URL}/team`, teamData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // ACTUALIZAR (PUT)
  updateTeam: async (teamId: string, teamData: any) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await axios.put(`${API_URL}/team/${teamId}`, teamData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // DESACTIVAR (DELETE) - Soft Delete
  deleteTeam: async (teamId: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      console.error("[TourneyOS] No hay token de sesión para equipos");
      return;
    }

    return await axios.delete(`${API_URL}/team/${teamId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // RESTAURAR (PATCH)
  restoreTeam: async (id: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await axios.patch(`${API_URL}/team/${id}/restore`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};