import axios from 'axios';

// Creamos una instancia base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // La URL de tu backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// 🛡️ INTERCEPTOR: Se ejecuta antes de cada petición
api.interceptors.request.use((config) => {
  // Buscamos el token en el almacenamiento local del navegador
  const token = localStorage.getItem('successors_token');
  
  if (token && config.headers) {
    // Si hay token, se lo pegamos al header de Autorización
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;