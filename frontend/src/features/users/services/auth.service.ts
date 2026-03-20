// src/features/users/services/auth.service.ts
import api from '@/lib/axios';
import { UserRole } from '@/types/roles';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: UserRole;
  };
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      username,
      password,
    });
    
    // Guardamos el token para que el interceptor lo use después
    localStorage.setItem('auth_token', data.token);
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
  }
};