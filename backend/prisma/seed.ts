import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("⏳ Iniciando protocolo de inyección de datos (Seed)...");

  // 1. Limpiamos la zona de combate (borramos datos anteriores si los hay)
  await prisma.match.deleteMany();
  await prisma.team.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.user.deleteMany();

  // 2. Creamos al Administrador Supremo y a los Capitanes
  const defaultPassword = await bcrypt.hash("tourney2026", 10);

  const admin = await prisma.user.create({
    data: { email: "admin@tourneyos.com", gamertag: "RootAdmin", passwordHash: defaultPassword, role: "admin" }
  });

  const cap1 = await prisma.user.create({
    data: { email: "srdelorean@successors.com", gamertag: "SrDeLorean", passwordHash: defaultPassword, role: "player" }
  });

  const cap2 = await prisma.user.create({
    data: { email: "rival@test.com", gamertag: "FifaKing99", passwordHash: defaultPassword, role: "player" }
  });

  const cap3 = await prisma.user.create({
    data: { email: "stgo@test.com", gamertag: "SantiagoSniper", passwordHash: defaultPassword, role: "player" }
  });

  const cap4 = await prisma.user.create({
    data: { email: "pro@test.com", gamertag: "ElPro", passwordHash: defaultPassword, role: "player" }
  });

  // 3. Creamos el Torneo Oficial
  const tournament = await prisma.tournament.create({
    data: { 
      name: "Copa Latam - EA Sports FC 26", 
      game: "EA Sports FC 26", 
      maxTeams: 8, 
      creatorId: admin.id, 
      status: "IN_PROGRESS" 
    }
  });

  // 4. Inscribimos a los Batallones (Equipos)
  const team1 = await prisma.team.create({ data: { name: "Successors eSports", captainId: cap1.id, tournamentId: tournament.id } });
  const team2 = await prisma.team.create({ data: { name: "Neon Strikers", captainId: cap2.id, tournamentId: tournament.id } });
  const team3 = await prisma.team.create({ data: { name: "Santiago Elite", captainId: cap3.id, tournamentId: tournament.id } });
  const team4 = await prisma.team.create({ data: { name: "Pixel Titans", captainId: cap4.id, tournamentId: tournament.id } });

  // 5. Generamos Cruces de Prueba (Matches)
  // Partido 1: Terminado (Ganó Successors)
  await prisma.match.create({
    data: { 
      tournamentId: tournament.id, round: "Semifinal 1", status: "COMPLETED",
      homeTeamId: team1.id, awayTeamId: team2.id,
      homeScore: 3, awayScore: 1, winnerId: team1.id
    }
  });

  // Partido 2: Pendiente (Por jugarse)
  await prisma.match.create({
    data: { 
      tournamentId: tournament.id, round: "Semifinal 2", status: "PENDING",
      homeTeamId: team3.id, awayTeamId: team4.id,
      homeScore: 0, awayScore: 0
    }
  });

  console.log("✅ ¡Despliegue de datos completado! El entorno táctico está listo.");
  console.log("🔐 Credenciales de prueba generadas:");
  console.log("   Admin: admin@tourneyos.com | pass: tourney2026");
}

main()
  .catch((e) => {
    console.error("❌ Error en el Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });