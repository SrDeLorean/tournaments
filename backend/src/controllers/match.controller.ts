import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const matchController = {
  // --- GENERAR FIXTURE AUTOMÁTICO (ROUND ROBIN) ---
  generateFixture: async (req: any, res: Response) => {
    const { seasonId } = req.params;
    const { id: requesterId, role } = req.user;

    try {
      // 1. Validar que el manager sea dueño de la comunidad de esta season
      const season = await prisma.season.findUnique({
        where: { id: seasonId },
        include: { tournament: { include: { community: true } } }
      });

      if (role === 'manager' && season?.tournament.community.managerId !== requesterId) {
        return res.status(403).json({ message: "No tienes permisos sobre esta temporada." });
      }

      // 2. Obtener equipos inscritos
      const teams = await prisma.seasonTeam.findMany({
        where: { seasonId }
      });

      if (teams.length < 2) {
        return res.status(400).json({ message: "Se necesitan al menos 2 equipos para generar un fixture." });
      }

      // 3. Algoritmo simple de emparejamiento (Todos contra todos ida)
      const matchesToCreate = [];
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          matchesToCreate.push({
            seasonId,
            homeTeamId: teams[i].id,
            awayTeamId: teams[j].id,
            round: "Jornada Regular",
            status: "pending"
          });
        }
      }

      // 4. Guardar en lote (Batch create)
      const createdMatches = await prisma.match.createMany({
        data: matchesToCreate
      });

      // 5. Cambiar estado de la temporada a 'in_progress'
      await prisma.season.update({
        where: { id: seasonId },
        data: { status: 'in_progress' }
      });

      res.status(201).json({ message: `Fixture generado: ${matchesToCreate.length} partidos creados.`, count: createdMatches.count });
    } catch (error) {
      res.status(500).json({ error: "Error al generar el fixture." });
    }
  },

  // --- REPORTAR RESULTADO ---
  updateResult: async (req: any, res: Response) => {
    const { matchId } = req.params;
    const { homeScore, awayScore } = req.body;

    try {
      // Determinamos el ganador
      let winnerId = null;
      if (homeScore > awayScore) {
        const match = await prisma.match.findUnique({ where: { id: matchId } });
        winnerId = match?.homeTeamId;
      } else if (awayScore > homeScore) {
        const match = await prisma.match.findUnique({ where: { id: matchId } });
        winnerId = match?.awayTeamId;
      }

      const updatedMatch = await prisma.match.update({
        where: { id: matchId },
        data: {
          homeScore,
          awayScore,
          winnerId,
          status: "finished"
        }
      });

      res.json(updatedMatch);
    } catch (error) {
      res.status(500).json({ error: "Error al reportar el resultado." });
    }
  }
};