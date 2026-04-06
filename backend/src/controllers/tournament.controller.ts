import { Request, Response } from 'express';
import prisma from '../config/db';

export const createTournament = async (req: any, res: Response): Promise<any> => {
  try {
    const { name, game, maxTeams } = req.body;
    const newTournament = await prisma.tournament.create({
      data: { 
        name, 
        game: game || "EA Sports FC 26", 
        maxTeams: parseInt(maxTeams) || 16,
        creatorId: req.user.id 
      }
    });
    return res.status(201).json({ message: "Torneo creado", tournament: newTournament });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear" });
  }
};

export const getAllTournaments = async (req: Request, res: Response): Promise<any> => {
  try {
    const tournaments = await prisma.tournament.findMany({
      where: { deletedAt: null },
      include: { creator: { select: { gamertag: true } } }
    });
    return res.json(tournaments);
  } catch (error) {
    return res.status(500).json({ message: "Error al listar" });
  }
};

export const getTournamentById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const tournament = await prisma.tournament.findUnique({
      where: { id, deletedAt: null },
      include: { creator: { select: { gamertag: true } } }
    });

    if (!tournament) return res.status(404).json({ message: "Torneo no encontrado" });
    return res.json(tournament);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el torneo" });
  }
};

export const deleteTournament = async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const tournament = await prisma.tournament.findUnique({ where: { id } });
    
    if (!tournament || tournament.deletedAt) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }
    if (tournament.creatorId !== req.user.id) {
      return res.status(403).json({ message: "No tienes permisos" });
    }

    await prisma.tournament.update({ where: { id }, data: { deletedAt: new Date() } });
    return res.json({ message: "Torneo eliminado correctamente (Soft Delete)" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar" });
  }
};

// Actualizar (Update) Torneo
export const updateTournament = async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, maxTeams, status } = req.body;
    
    // Verificamos que exista y que el usuario sea el dueño
    const tournament = await prisma.tournament.findUnique({ where: { id } });
    if (!tournament || tournament.deletedAt) {
      return res.status(404).json({ message: "Operación no encontrada" });
    }
    if (tournament.creatorId !== req.user.id) {
      return res.status(403).json({ message: "Permiso denegado" });
    }

    const updatedTournament = await prisma.tournament.update({
      where: { id },
      data: { 
        name, 
        maxTeams: maxTeams ? parseInt(maxTeams) : undefined,
        status 
      }
    });

    return res.json({ message: "Operación actualizada", tournament: updatedTournament });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar" });
  }
};