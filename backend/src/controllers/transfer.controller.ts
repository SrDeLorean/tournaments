import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transferController = {
  // --- ENVIAR SOLICITUD (Player) ---
  requestJoin: async (req: any, res: Response) => {
    const { teamId, seasonId, initialMessage } = req.body;
    const playerId = req.user.id;

    try {
      // 1. Crear la solicitud de traspaso
      const transfer = await prisma.transferRequest.create({
        data: {
          playerId,
          teamId,
          seasonId,
          status: 'pending',
          messages: {
            create: {
              authorId: playerId,
              content: initialMessage || "Hola, me gustaría unirme a su equipo para esta temporada."
            }
          }
        }
      });
      res.status(201).json(transfer);
    } catch (error) {
      res.status(500).json({ error: "Error al enviar la solicitud." });
    }
  },

  // --- ENVIAR MENSAJE (Chat de Negociación) ---
  sendMessage: async (req: any, res: Response) => {
    const { requestId, content } = req.body;
    const authorId = req.user.id;

    try {
      const message = await prisma.transferMessage.create({
        data: { requestId, authorId, content }
      });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Error al enviar el mensaje." });
    }
  },

  // --- ACEPTAR SOLICITUD (Dueño del Equipo) ---
  acceptByTeam: async (req: any, res: Response) => {
    const { requestId } = req.params;
    const ownerId = req.user.id;

    try {
      const request = await prisma.transferRequest.findUnique({
        where: { id: requestId },
        include: { team: true }
      });

      if (request?.team.ownerId !== ownerId) {
        return res.status(403).json({ message: "Solo el dueño del equipo puede aceptar jugadores." });
      }

      const updated = await prisma.transferRequest.update({
        where: { id: requestId },
        data: { status: 'accepted' } // Pasa a estado de espera de pago/validación manager
      });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Error al aceptar la solicitud." });
    }
  },

  // --- VALIDAR Y FINALIZAR (Manager de Comunidad) ---
  finalizeTransfer: async (req: any, res: Response) => {
    const { requestId } = req.params;
    const managerId = req.user.id;

    try {
      const request = await prisma.transferRequest.findUnique({
        where: { id: requestId },
        include: { season: { include: { tournament: { include: { community: true } } } } }
      });

      if (request?.season.tournament.community.managerId !== managerId) {
        return res.status(403).json({ message: "No tienes permisos de manager en esta comunidad." });
      }

      // Transacción: Cambia estado y agrega al Roster automáticamente
      const result = await prisma.$transaction(async (tx) => {
        await tx.transferRequest.update({
          where: { id: requestId },
          data: { status: 'paid' }
        });

        // Buscar el SeasonTeamId para el Roster
        const seasonTeam = await tx.seasonTeam.findFirst({
          where: { teamId: request.teamId, seasonId: request.seasonId }
        });

        return await tx.roster.create({
          data: {
            userId: request.playerId,
            seasonTeamId: seasonTeam!.id,
            communityId: request.season.tournament.communityId
          }
        });
      });

      res.json({ message: "Fichaje completado. Jugador añadido al roster.", result });
    } catch (error) {
      res.status(500).json({ error: "Error al finalizar el fichaje." });
    }
  }
};