// src/lib/constants.ts

export const APP_CONFIG = {
  NAME: 'E-Sports Manager',
  // Si no encuentra la variable de entorno, usa localhost por defecto
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1', 
};

export const ROLES = {
  GUEST: 'guest',
  PLAYER: 'player',
  MANAGER: 'manager',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
} as const;