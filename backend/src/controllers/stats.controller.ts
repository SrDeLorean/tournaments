import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const statsController = {
  // --- GENERAR TABLA DE POSICIONES ---
  getLeaderboard: async (req: Request, res: Response) => {
    const { seasonId } = req.params;

    try {
      // 1. Obtener todos los partidos finalizados de la temporada
      const matches = await prisma.match.findMany({
        where: { seasonId, status: 'finished' },
        include: { homeTeam: { include: { team: true } }, awayTeam: { include: { team: true } } }
      });

      // 2. Obtener todos los equipos inscritos
      const seasonTeams = await prisma.seasonTeam.findMany({
        where: { seasonId },
        include: { team: true }
      });

      // 3. Inicializar el mapa de estadísticas
      const leaderboard = seasonTeams.map(st => ({
        teamId: st.team.id,
        name: st.team.name,
        pj: 0, // Partidos Jugados
        pg: 0, // Partidos Ganados
        pe: 0, // Partidos Empatados
        pp: 0, // Partidos Perdidos
        gf: 0, // Goles a Favor
        gc: 0, // Goles en Contra
        dg: 0, // Diferencia de Goles
        pts: 0 // Puntos Totales
      }));

      // 4. Procesar cada partido
      matches.forEach(match => {
        const home = leaderboard.find(t => t.teamId === match.homeTeam?.teamId);
        const away = leaderboard.find(t => t.teamId === match.awayTeam?.teamId);

        if (home && away) {
          home.pj++;
          away.pj++;
          home.gf += match.homeScore || 0;
          home.gc += match.awayScore || 0;
          away.gf += match.awayScore || 0;
          away.gc += match.homeScore || 0;

          if (match.homeScore! > match.awayScore!) {
            home.pg++; home.pts += 3;
            away.pp++;
          } else if (match.awayScore! > match.homeScore!) {
            away.pg++; away.pts += 3;
            home.pp++;
          } else {
            home.pe++; home.pts += 1;
            away.pe++; away.pts += 1;
          }
        }
      });

      // 5. Calcular diferencia de goles y ordenar
      const sortedLeaderboard = leaderboard.map(t => ({
        ...t,
        dg: t.gf - t.gc
      })).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);

      res.json(sortedLeaderboard);
    } catch (error) {
      res.status(500).json({ error: "Error al calcular la tabla de posiciones." });
    }
  }
};