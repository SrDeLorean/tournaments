import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper para obtener el token de forma segura en entornos Next.js (CSR)
const getAuthHeader = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const userService = {
  // --- LECTURA Y FILTRADO ---
  getUsers: async (showInactive: boolean = false) => {
    const response = await axios.get(`${API_URL}/user?includeInactive=${showInactive}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // 🔍 BUSCAR AGENTES LIBRES (Para Reclutamiento)
  // Este método busca usuarios que NO tengan equipo o coincidan con el gamertag
  searchAvailablePlayers: async (query: string) => {
    const response = await axios.get(`${API_URL}/user/search/available?q=${query}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // 📋 OBTENER ROSTER POR EQUIPO
  getUsersByTeam: async (teamName: string) => {
    // El backend debe filtrar usuarios donde user.ownedTeams incluya este equipo
    const response = await axios.get(`${API_URL}/user/team/${teamName}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // --- ESCRITURA (CRUD) ---
  
  createUser: async (userData: any) => {
    const response = await axios.post(`${API_URL}/user`, userData, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Actualizado para que el userId y la data sean los parámetros principales
  updateUser: async (userId: string, userData: any) => {
    const response = await axios.put(`${API_URL}/user/${userId}`, userData, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // --- ESTADO Y RECUPERACIÓN ---

  deleteUser: async (userId: string) => {
    return await axios.delete(`${API_URL}/user/${userId}`, {
      headers: getAuthHeader()
    });
  },

  restoreUser: async (id: string) => {
    const response = await axios.patch(`${API_URL}/user/${id}/restore`, {}, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  // 🔍 OBTENER PERFIL DE USUARIO POR ID
  getUserById: async (userId: string) => {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },
};