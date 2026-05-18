import { Prisma } from '@prisma/client';

export class EaStatsMapper {
  
  /**
   * Traduce la data de un jugador de EA a nuestro esquema de base de datos
   */
  static mapPlayer(
    userId: string, 
    playerEA: any, 
    teamId: string, 
    matchId: string, 
    seasonId: string
  ): Prisma.PlayerStatsCreateInput | any {
    
    const shots = Number(playerEA.shots || 0);
    const goals = Number(playerEA.goals || 0);
    const passAttempts = Number(playerEA.passattempts || 0);
    const passesMade = Number(playerEA.passesmade || 0);
    const tackleAttempts = Number(playerEA.tackleattempts || 0);
    const tacklesMade = Number(playerEA.tacklesmade || 0);

    return {
      player: { connect: { id: userId } },
      team: { connect: { id: teamId } },
      match: { connect: { id: matchId } },
      season: { connect: { id: seasonId } },
      
      position: playerEA.pos || 'unknown',
      archetypeId: Number(playerEA.archetypeid || 0),
      rating: new Prisma.Decimal(playerEA.rating || 0),
      userResult: String(playerEA.userResult || '0'),

      goals,
      assists: Number(playerEA.assists || 0),
      shots,
      shotPrecision: new Prisma.Decimal(shots > 0 ? ((goals / shots) * 100).toFixed(2) : 0),
      redCards: Number(playerEA.redcards || 0),
      isMom: playerEA.mom === "1" || playerEA.mom === 1,

      passAttempts,
      passesMade,
      passPrecision: new Prisma.Decimal(passAttempts > 0 ? ((passesMade / passAttempts) * 100).toFixed(2) : 0),
      
      tackleAttempts,
      tacklesMade,
      tackleSuccessRate: new Prisma.Decimal(tackleAttempts > 0 ? ((tacklesMade / tackleAttempts) * 100).toFixed(2) : 0),

      goalsConceded: Number(playerEA.goalsconceded || 0),
      saves: Number(playerEA.saves || 0),
      savesGoodPlacement: Number(playerEA.goodDirectionSaves || 0),
      savesDive: Number(playerEA.ballDiveSaves || 0),
      savesReflex: Number(playerEA.reflexSaves || 0),
      cutCrosses: Number(playerEA.crossSaves || 0),
      punchClears: Number(playerEA.punchSaves || 0),
      deflections: Number(playerEA.parrySaves || 0),

      secondsPlayed: Number(playerEA.secondsPlayed || 0),
      gameTimeMotor: Number(playerEA.gameTime || 0),
      idleTime: Number(playerEA.realtimeidle || 0),
      lagRealTime: Number(playerEA.realtimegame || 0),
    };
  }

  /**
   * Traduce la data agregada de un club de EA a nuestro esquema de equipo
   */
  static mapTeam(
    teamId: string, 
    aggregate: any, 
    clubData: any, 
    matchId: string, 
    seasonId: string
  ): Prisma.TeamStatsCreateInput | any {
    
    const pAttempts = Number(aggregate.passattempts || 0);
    const pMade = Number(aggregate.passesmade || 0);
    const tAttempts = Number(aggregate.tackleattempts || 0);
    const tMade = Number(aggregate.tacklesmade || 0);

    return {
      team: { connect: { id: teamId } },
      match: { connect: { id: matchId } },
      season: { connect: { id: seasonId } },

      goalsFor: Number(clubData.goals || 0),
      goalsAgainst: Number(clubData.goalsAgainst || 0),
      assists: Number(aggregate.assists || 0),
      shots: Number(aggregate.shots || 0),

      passAttempts: pAttempts,
      passesMade: pMade,
      passPrecision: new Prisma.Decimal(pAttempts > 0 ? ((pMade / pAttempts) * 100).toFixed(2) : 0),

      tackleAttempts: tAttempts,
      tacklesMade: tMade,
      tackleSuccessRate: new Prisma.Decimal(tAttempts > 0 ? ((tMade / tAttempts) * 100).toFixed(2) : 0),

      redCards: Number(aggregate.redcards || 0),
      goalsConcededAggregate: Number(aggregate.goalsconceded || 0),

      saves: Number(aggregate.saves || 0),
      savesGoodPlacement: Number(aggregate.goodDirectionSaves || 0),
      savesDive: Number(aggregate.ballDiveSaves || 0),
      savesReflex: Number(aggregate.reflexSaves || 0),
      cutCrosses: Number(aggregate.crossSaves || 0),
      punchClears: Number(aggregate.punchSaves || 0),
      deflections: Number(aggregate.parrySaves || 0),

      cleanSheetGlobal: aggregate.cleansheetsany === "1",
      cleanSheetDef: aggregate.cleansheetsdef === "1",
      cleanSheetGk: aggregate.cleansheetsgk === "1",

      aggregateRating: new Prisma.Decimal(aggregate.rating || 0),
      isMom: aggregate.mom === "1",
      
      secondsPlayed: BigInt(aggregate.secondsPlayed || 0),
      gameTimeMotor: BigInt(aggregate.gameTime || 0),
      idleTime: BigInt(aggregate.realtimeidle || 0),
      lagRealTime: BigInt(aggregate.realtimegame || 0),
      processed: true
    };
  }
}