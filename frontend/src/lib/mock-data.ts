// src/lib/mock-data.ts

export type Player = {
  id: string;
  name: string;
  nickname: string;
  role: "IGL" | "Entry Fragger" | "Sniper" | "Support" | "Lurker";
  status: "Active" | "Benched" | "Trial";
  country: string;
  avatar: string;
  kda: string;
};

export type Team = {
  id: string;
  name: string;
  logo: string;
  players: Player[];
};

export const MOCK_TEAMS: Record<string, Team> = {
  Successors: {
    id: "team-1",
    name: "Successors",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=successors",
    players: [
      { id: "p1", name: "Sebastian", nickname: "SrDeLorean", role: "IGL", status: "Active", country: "CL", kda: "1.45", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian" },
      { id: "p2", name: "Lucas Ferreira", nickname: "Luke", role: "Sniper", status: "Active", country: "BR", kda: "1.82", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas" },
      { id: "p3", name: "Mateo Ruiz", nickname: "Teo", role: "Entry Fragger", status: "Active", country: "AR", kda: "1.20", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mateo" },
      { id: "p4", name: "Javier Soto", nickname: "Javi", role: "Support", status: "Trial", country: "CL", kda: "0.95", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Javier" },
    ],
  },
  AlphaKings: {
    id: "team-2",
    name: "AlphaKings",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=alpha",
    players: [
      { id: "p5", name: "John Doe", nickname: "AlphaOne", role: "IGL", status: "Active", country: "US", kda: "1.10", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
      { id: "p6", name: "Ivan Petro", nickname: "Vanya", role: "Sniper", status: "Active", country: "RU", kda: "2.10", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan" },
    ],
  },
};

export type SystemUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "admin" | "manager" | "player";
  team?: string;
  status: "Active" | "Suspended";
  avatar: string;
};

export const MOCK_USERS: SystemUser[] = [
  { id: "u1", name: "Sebastian", username: "SrDeLorean", email: "admin@tourneyos.com", role: "admin", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian" },
  { id: "u2", name: "Carlos Manager", username: "AlphaBoss", email: "manager@alphakings.gg", role: "manager", team: "AlphaKings", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" },
  { id: "u3", name: "Lucas Ferreira", username: "Luke", email: "luke@successors.gg", role: "player", team: "Successors", status: "Active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas" },
  { id: "u4", name: "Invitado XYZ", username: "TrollGamer", email: "baneado@test.com", role: "player", status: "Suspended", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Troll" },
];