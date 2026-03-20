// src/lib/axios.ts
import axios from 'axios';
import { APP_CONFIG } from './constants';

const api = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para CADA petición que sale
api.interceptors.request.use(
  (config) => {
    // Buscamos el token en el almacenamiento local (localStorage)
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (token && config.headers) {
      // Inyectamos el Bearer Token automáticamente
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para las RESPUESTAS (Manejo de errores globales)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token expiró o es inválido, mandamos al usuario al login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;