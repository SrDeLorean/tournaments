import { PrismaClient, Role, SeasonStatus, TransferStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  console.log('--- LIMPIANDO BASE DE DATOS ---');
  // El orden es importante para evitar errores de llaves foráneas
  await prisma.playerLog.deleteMany();
  await prisma.playerStats.deleteMany();
  await prisma.teamStats.deleteMany();
  await prisma.transferMessage.deleteMany();
  await prisma.transferRequest.deleteMany();
  await prisma.match.deleteMany();
  await prisma.roster.deleteMany();
  await prisma.seasonTeam.deleteMany();
  await prisma.season.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.communityMember.deleteMany();
  await prisma.community.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  console.log('--- CREANDO USUARIOS (ROLES EN MINÚSCULA) ---');
  
  const admin = await prisma.user.create({
    data: {
      gamertag: 'ADMIN_ROOT',
      email: 'admin@tourneyos.com',
      passwordHash,
      role: 'admin', // MINÚSCULA
      active: true,
    },
  });

  const manager = await prisma.user.create({
    data: {
      gamertag: 'MANAGER_ESPACIO',
      email: 'manager@espaciogamer.cl',
      passwordHash,
      role: 'manager', // MINÚSCULA
      active: true,
    },
  });

  const player = await prisma.user.create({
    data: {
      gamertag: 'SrDeLorean',
      email: 'sebastian@mail.com',
      passwordHash,
      role: 'player', // MINÚSCULA
      gamertagEa: 'SrDeLorean_EA',
      active: true,
    },
  });

  console.log('--- CREANDO COMUNIDAD Y TORNEO ---');
  
  const community = await prisma.community.create({
    data: {
      name: 'ESPACIO GAMER',
      slug: 'espacio-gamer',
      managerId: manager.id,
    },
  });

  const tournament = await prisma.tournament.create({
    data: {
      name: 'LIGA DE HONOR 2026',
      communityId: community.id,
    },
  });

  console.log('--- CREANDO TEMPORADA (STATUS EN MAYÚSCULA) ---');
  
  const season = await prisma.season.create({
    data: {
      name: 'TEMPORADA DE APERTURA',
      tournamentId: tournament.id,
      status: 'REGISTRATION', // MAYÚSCULA SEGÚN ENUM
    },
  });

  console.log('--- CREANDO EQUIPO Y SOLICITUD DE FICHAJE ---');
  
  const team = await prisma.team.create({
    data: {
      name: 'SUCCESSORS FC',
      clubIdEa: '7263',
      ownerId: player.id,
    },
  });

  await prisma.transferRequest.create({
    data: {
      playerId: player.id,
      teamId: team.id,
      seasonId: season.id,
      status: 'PENDING', // MAYÚSCULA SEGÚN ENUM
    },
  });

  console.log('--- SEEDER COMPLETADO EXITOSAMENTE ---');
  console.log('ESTADO FINAL: BASE DE DATOS LISTA PARA TOURNEYOS');
}

main()
  .catch((e) => {
    console.error('ERROR EN EL SEEDER:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });