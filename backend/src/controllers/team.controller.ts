import { Request, Response } from 'express';
import prisma from '../config/db';

export const createTeam = async (req: any, res: Response): Promise<any> => {
  try {
    const { name, tournamentId } = req.body;
    const captainId = req.user.id; // El token nos dice quién es el capitán

    // 1. Validar que el torneo exista y esté abierto
    const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament || tournament.deletedAt) {
      return res.status(404).json({ message: "El torneo no existe" });
    }
    if (tournament.status !== "OPEN") {
      return res.status(400).json({ message: "Las inscripciones para este torneo están cerradas" });
    }

    // 2. Crear el equipo
    const newTeam = await prisma.team.create({
      data: { name, tournamentId, captainId }
    });

    return res.status(201).json({ message: "Equipo inscrito con éxito", team: newTeam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al inscribir el equipo" });
  }
};

export const getTeamsByTournament = async (req: Request, res: Response): Promise<any> => {
  try {
    const { tournamentId } = req.params;

    const teams = await prisma.team.findMany({
      where: { tournamentId, deletedAt: null },
      include: {
        captain: { select: { gamertag: true } } // Traemos el gamertag del capitán
      }
    });

    return res.json(teams);
  } catch (error) {
    return res.status(500).json({ message: "Error al listar los equipos" });
  }
};

export const deleteTeam = async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    
    const team = await prisma.team.findUnique({ where: { id } });
    if (!team || team.deletedAt) return res.status(404).json({ message: "Equipo no encontrado" });
    
    // Solo el capitán puede borrar su inscripción
    if (team.captainId !== req.user.id) {
      return res.status(403).json({ message: "Solo el capitán puede retirar al equipo" });
    }

    await prisma.team.update({ where: { id }, data: { deletedAt: new Date() } });
    return res.json({ message: "Equipo retirado del torneo" });
  } catch (error) {
    return res.status(500).json({ message: "Error al retirar el equipo" });
  }
};