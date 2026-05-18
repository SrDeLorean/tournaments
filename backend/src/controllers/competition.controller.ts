import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const competitionController = {
  // --- TORNEOS ---
  createTournament: async (req: any, res: Response) => {
    const { name, game, communityId } = req.body;
    const { role, id: requesterId } = req.user;

    try {
      let targetCommunityId = communityId;

      // Si es manager, forzamos que el torneo sea en SU comunidad
      if (role === 'manager') {
        const community = await prisma.community.findUnique({ where: { managerId: requesterId } });
        if (!community) return res.status(404).json({ message: "No gestionas ninguna comunidad." });
        targetCommunityId = community.id;
      }

      const tournament = await prisma.tournament.create({
        data: {
          name,
          game: game || "EA Sports FC 26",
          communityId: targetCommunityId
        }
      });
      res.status(201).json(tournament);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el torneo." });
    }
  },

  // --- TEMPORADAS (DENTRO DE UN TORNEO) ---
  createSeason: async (req: any, res: Response) => {
    const { name, tournamentId } = req.body;
    const { role, id: requesterId } = req.user;

    try {
      // Validación de propiedad: ¿El torneo pertenece a la comunidad del manager?
      const tournament = await prisma.tournament.findUnique({ 
        where: { id: tournamentId },
        include: { community: true }
      });

      if (role === 'manager' && tournament?.community.managerId !== requesterId) {
        return res.status(403).json({ message: "No tienes permiso sobre este torneo." });
      }

      const season = await prisma.season.create({
        data: {
          name,
          tournamentId,
          status: 'registration' // Siempre inicia en registro (minúsculas)
        }
      });
      res.status(201).json(season);
    } catch (error) {
      res.status(500).json({ error: "Error al abrir la temporada." });
    }
  },

  // --- OBTENER ESTRUCTURA COMPLETA ---
  getCommunityCompetitions: async (req: any, res: Response) => {
    const { slug } = req.params; // Ej: /amc
    
    try {
      const competitions = await prisma.tournament.findMany({
        where: { community: { slug } },
        include: { 
          seasons: {
            orderBy: { createdAt: 'desc' }
          }
        }
      });
      res.json(competitions);
    } catch (error) {
      res.status(500).json({ error: "Error al cargar competiciones." });
    }
  }
};