import { Request, Response } from 'express';
import { PrismaClient, SeasonStatus, TransferStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const seasonController = {
  
  // PATCH /api/season/:seasonId/close
  closeSeason: async (req: Request, res: Response) => {
    const { seasonId } = req.params;

    try {
      // Verificamos si la temporada existe y si ya está cerrada
      const season = await prisma.season.findUnique({ where: { id: seasonId } });
      if (!season) return res.status(404).json({ message: "Temporada no encontrada" });
      if (season.status === SeasonStatus.FINISHED) {
        return res.status(400).json({ message: "La temporada ya se encuentra finalizada" });
      }

      // 🛑 TRANSACCIÓN DE PRISMA: Todo o Nada
      await prisma.$transaction(async (tx) => {
        
        // 1. Cambiamos el estado de la temporada a FINISHED
        await tx.season.update({
          where: { id: seasonId },
          data: { status: SeasonStatus.FINISHED }
        });

        // 2. Cancelamos todas las transferencias PENDIENTES o ACEPTADAS en esta temporada
        await tx.transferRequest.updateMany({
          where: {
            seasonId: seasonId,
            status: { in: [TransferStatus.PENDING, TransferStatus.ACCEPTED] }
          },
          data: { status: TransferStatus.CANCELLED }
        });

        // 3. Sellamos los contratos (Roster).
        // Obtenemos los IDs de los equipos inscritos en esta temporada
        const seasonTeams = await tx.seasonTeam.findMany({
          where: { seasonId: seasonId },
          select: { id: true }
        });

        const seasonTeamIds = seasonTeams.map(st => st.id);

        // A todos los jugadores con estado ACTIVE en esta liga, los pasamos a INACTIVE y sellamos fecha
        if (seasonTeamIds.length > 0) {
          await tx.roster.updateMany({
            where: {
              seasonTeamId: { in: seasonTeamIds },
              status: 'ACTIVE'
            },
            data: {
              status: 'INACTIVE',
              leftAt: new Date() // Fecha y hora exacta del cierre
            }
          });
        }
      });

      res.json({ 
        status: "ÉXITO", 
        message: "TEMPORADA FINALIZADA. Transferencias canceladas y Roster histórico sellado." 
      });

    } catch (error) {
      console.error("[Cierre de Temporada Error]:", error);
      res.status(500).json({ status: "ERROR", message: "Fallo crítico en el servidor al cerrar la temporada." });
    }
  }
};