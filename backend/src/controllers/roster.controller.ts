import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const rosterController = {
  
  // 🟢 FICHAR OPERADOR (Crear registro con fecha de inicio)
  enrollPlayer: async (req: Request, res: Response) => {
    try {
      const { userId, seasonTeamId, communityId } = req.body;

      // 1. Verificamos la regla anti-mercenarios (Roster Lock)
      // Buscamos si el jugador ya está ACTIVO en otro equipo de esta misma comunidad
      const existingActiveRoster = await prisma.roster.findFirst({
        where: {
          userId: userId,
          communityId: communityId,
          status: 'ACTIVE' // Solo nos importan sus contratos vigentes
        },
        include: { seasonTeam: true }
      });

      // Si tiene un contrato activo y NO es para el mismo equipo exacto, bloqueamos.
      if (existingActiveRoster && existingActiveRoster.seasonTeam.teamId !== req.body.teamId) {
        return res.status(403).json({ 
          status: "ERROR", 
          message: "ROSTER_LOCK: El operador ya tiene un contrato activo con otra franquicia en esta comunidad." 
        });
      }

      // 2. Ejecutamos el fichaje (Se crea con joinedAt: now() por defecto)
      const newContract = await prisma.roster.create({
        data: {
          userId,
          seasonTeamId,
          communityId,
          status: 'ACTIVE'
        }
      });

      res.status(201).json({ status: "ÉXITO", message: "OPERADOR FICHADO CORRECTAMENTE", data: newContract });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "ERROR", message: "FALLO AL REGISTRAR EL FICHAJE" });
    }
  },

  // 🔴 DAR DE BAJA (Cerrar el contrato con fecha de término)
  releasePlayer: async (req: Request, res: Response) => {
    try {
      // Necesitamos el ID del registro de Roster específico a cerrar
      const { rosterId } = req.params;

      const contract = await prisma.roster.findUnique({ where: { id: rosterId } });
      if (!contract) return res.status(404).json({ message: "CONTRATO NO ENCONTRADO" });

      if (contract.status === 'INACTIVE') {
        return res.status(400).json({ message: "EL OPERADOR YA FUE DADO DE BAJA PREVIAMENTE" });
      }

      // NO BORRAMOS EL REGISTRO. Solo lo marcamos como INACTIVO y le ponemos fecha de salida.
      const closedContract = await prisma.roster.update({
        where: { id: rosterId },
        data: {
          status: 'INACTIVE',
          leftAt: new Date() // Sella la fecha y hora exacta de la baja
        }
      });

      res.json({ 
        status: "ÉXITO", 
        message: "CONTRATO FINALIZADO", 
        data: closedContract 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "ERROR", message: "ERROR AL PROCESAR LA BAJA" });
    }
  },

  // 📜 VER HISTORIAL DEL JUGADOR
  getPlayerHistory: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const history = await prisma.roster.findMany({
        where: { userId },
        include: {
          seasonTeam: { include: { team: true, season: true } }
        },
        orderBy: { joinedAt: 'desc' } // Del más reciente al más antiguo
      });

      res.json(history);
    } catch (error) {
      res.status(500).json({ status: "ERROR", message: "FALLO AL RECUPERAR EL HISTORIAL" });
    }
  },

  getRosterBySeason: async (req: Request, res: Response) => {
    try {
      const { teamId, seasonId } = req.params;
      
      const rosterRecords = await prisma.roster.findMany({
        where: {
          seasonTeam: {
            teamId: teamId,
            seasonId: seasonId
          }
          // Traemos todos (ACTIVE e INACTIVE) porque el manager necesita ver
          // el historial completo de quiénes jugaron en esa temporada.
        },
        include: {
          user: {
            select: { id: true, gamertag: true, gamertagEa: true, avatarUrl: true, email: true }
          }
        },
        orderBy: { joinedAt: 'asc' } // Orden cronológico de llegada
      });

      // Formateamos la respuesta para que el Frontend la consuma fácil
      const formattedRoster = rosterRecords.map(record => ({
        rosterId: record.id,
        status: record.status, 
        joinedAt: record.joinedAt,
        leftAt: record.leftAt,
        ...record.user // Esparcimos los datos del usuario (gamertag, ea_id, etc)
      }));

      res.json(formattedRoster);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "ERROR", message: "Fallo al recuperar el roster de la temporada." });
    }
  }
};