import { Request, Response } from 'express';
import prisma from '../config/db';

// 1. Programar un nuevo partido
export const createMatch = async (req: any, res: Response): Promise<any> => {
  try {
    const { tournamentId, round, homeTeamId, awayTeamId } = req.body;

    const newMatch = await prisma.match.create({
      data: { tournamentId, round, homeTeamId, awayTeamId }
    });

    return res.status(201).json({ message: "Cruce programado con éxito", match: newMatch });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al programar el partido" });
  }
};

// 2. Obtener la llave/fixture de un torneo
export const getMatchesByTournament = async (req: Request, res: Response): Promise<any> => {
  try {
    const { tournamentId } = req.params;

    const matches = await prisma.match.findMany({
      where: { tournamentId },
      include: {
        homeTeam: { select: { name: true } },
        awayTeam: { select: { name: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    return res.json(matches);
  } catch (error) {
    return res.status(500).json({ message: "Error al cargar los partidos" });
  }
};

// 3. Reportar el resultado (Score) y definir Ganador
export const reportScore = async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { homeScore, awayScore, status, winnerId } = req.body;

    const updatedMatch = await prisma.match.update({
      where: { id },
      data: { 
        homeScore: parseInt(homeScore), 
        awayScore: parseInt(awayScore),
        status: status || "COMPLETED",
        winnerId: winnerId || null // 👈 Ahora guardamos formalmente al ganador
      }
    });

    return res.json({ message: "Resultado confirmado", match: updatedMatch });
  } catch (error) {
    return res.status(500).json({ message: "Error al reportar el resultado" });
  }
};