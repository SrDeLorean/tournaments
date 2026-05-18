import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { EaProClubsService } from '../services/ea.service';
import { EaStatsMapper } from '../services/ea.mapper';

const prisma = new PrismaClient();
const eaService = new EaProClubsService();

export const reporteController = {
  /**
   * Procesa y guarda el reporte completo de un partido desde EA
   */
  store: async (req: Request, res: Response) => {
    const { eaMatchId, clubLocalEaId, clubVisitanteEaId, calendarId } = req.body;

    try {
      // 1. Obtener datos del Calendario (Match)
      const calendario = await prisma.match.findUnique({
        where: { id: calendarId },
        include: { 
          homeTeam: { include: { team: true } }, 
          awayTeam: { include: { team: true } } 
        }
      });

      if (!calendario) return res.status(404).json({ message: "Calendario no encontrado" });

      // 2. Consultar a la API de EA usando el Club ID del local
      const eaData = await eaService.obtenerPartidos(calendario.homeTeam?.team.clubIdEa!);
      const matchEA = eaData.matches.find((m: any) => m.matchId === eaMatchId);

      if (!matchEA) return res.status(404).json({ message: "Partido no encontrado en los servidores de EA" });

      // 3. Iniciar Transacción Atómica
      await prisma.$transaction(async (tx) => {
        const allEaPlayersNames: string[] = [];

        // --- PROCESAR JUGADORES POR EQUIPO ---
        for (const [eaClubId, playersList] of Object.entries(matchEA.players)) {
          const isLocal = eaClubId === clubLocalEaId;
          const equipoDbId = isLocal ? calendario.homeTeamId : calendario.awayTeamId;
          
          const currentPlayers = playersList as any[];
          const eaNames = currentPlayers.map(p => p.playername);
          allEaPlayersNames.push(...eaNames);

          // Buscar usuarios en nuestra DB que coincidan con los nombres de EA
          const usersInDb = await tx.user.findMany({
            where: { gamertagEa: { in: eaNames } }
          });

          for (const pEA of currentPlayers) {
            const user = usersInDb.find(u => u.gamertagEa === pEA.playername);

            // A. Guardar Log de Procesamiento (EstadisticaJugadorLog)
            await tx.playerLog.upsert({
              where: { 
                playerName_matchId: { playerName: pEA.playername, matchId: calendarId } 
              },
              update: { status: user ? 'ok' : 'error' },
              create: {
                playerName: pEA.playername,
                matchId: calendarId,
                userId: user?.id,
                teamId: equipoDbId!,
                status: user ? 'ok' : 'error',
                played: true
              }
            });

            // B. Si el usuario existe, guardar sus stats detallados
            if (user) {
              await tx.playerStats.create({
                data: EaStatsMapper.mapPlayer(
                  user.id, 
                  pEA, 
                  equipoDbId!, 
                  calendarId, 
                  calendario.seasonId
                )
              });
            }
          }
        }

        // --- PROCESAR JUGADORES QUE NO JUGARON ---
        const activeRoster = await tx.roster.findMany({
          where: { seasonTeamId: { in: [calendario.homeTeamId!, calendario.awayTeamId!] } },
          include: { user: true }
        });

        for (const member of activeRoster) {
          if (member.user.gamertagEa && !allEaPlayersNames.includes(member.user.gamertagEa)) {
            await tx.playerLog.create({
              data: {
                playerName: member.user.gamertagEa,
                matchId: calendarId,
                userId: member.userId,
                teamId: member.seasonTeamId,
                status: 'no_jugo',
                played: false
              }
            });
          }
        }

        // --- ESTADÍSTICAS DE EQUIPO (LOCAL Y VISITANTE) ---
        const localStats = matchEA.clubs[clubLocalEaId];
        const visitanteStats = matchEA.clubs[clubVisitanteEaId];

        await tx.teamStats.create({
          data: EaStatsMapper.mapTeam(calendario.homeTeamId!, matchEA.aggregate[clubLocalEaId], localStats, calendarId, calendario.seasonId)
        });

        await tx.teamStats.create({
          data: EaStatsMapper.mapTeam(calendario.awayTeamId!, matchEA.aggregate[clubVisitanteEaId], visitanteStats, calendarId, calendario.seasonId)
        });

        // --- FINALIZAR PARTIDO EN CALENDARIO ---
        await tx.match.update({
          where: { id: calendarId },
          data: {
            status: 'finished',
            homeScore: localStats.goals,
            awayScore: visitanteStats.goals,
            winnerId: localStats.goals > visitanteStats.goals ? calendario.homeTeamId : (visitanteStats.goals > localStats.goals ? calendario.awayTeamId : null)
          }
        });
      });

      res.json({ message: "Reporte procesado exitosamente. Estadísticas inyectadas." });

    } catch (error) {
      console.error("Error al procesar reporte:", error);
      res.status(500).json({ error: "Fallo en el procesamiento de datos de EA" });
    }
  }
};