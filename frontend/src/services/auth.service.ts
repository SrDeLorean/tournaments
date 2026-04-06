import api from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  
  // Si el login es exitoso, guardamos el token y el usuario
  if (response.data.token) {
    localStorage.setItem('successors_token', response.data.token);
    localStorage.setItem('successors_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('successors_token');
  localStorage.removeItem('successors_user');
};