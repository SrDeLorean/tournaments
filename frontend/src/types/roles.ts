// src/types/roles.ts

export type UserRole = 'guest' | 'player' | 'manager' | 'admin' | 'superadmin';

export interface Team {
  id: string;
  name: string; // ej: Successors
  logoUrl?: string;
}

export interface UserContext {
  id: string;
  username: string; // ej: SrDeLorean
  role: UserRole;
  teams: Team[]; // Equipos a los que pertenece
}