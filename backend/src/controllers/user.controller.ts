import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const userController = {
  // --- LISTAR ROSTER POR EQUIPO ---
  // GET /api/user/team/:teamName
  getUsersByTeam: async (req: Request, res: Response) => {
    try {
      const { teamName } = req.params;
      
      const users = await prisma.user.findMany({
        where: {
          active: true,
          // Buscamos usuarios que pertenezcan a este equipo
          // Según tu esquema, un User tiene ownedTeams (como dueño) 
          // o registros en Roster (como jugador)
          registrations: {
            some: {
              seasonTeam: {
                team: { name: teamName }
              }
            }
          }
        },
        orderBy: { gamertag: 'asc' }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ status: "ERROR", message: "FALLO AL RECUPERAR ROSTER" });
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          // Traemos sus estadísticas sumadas de todos los partidos
          playerStats: true, 
          // Traemos su equipo actual (si tiene un contrato ACTIVO)
          registrations: {
            where: { status: 'ACTIVE' },
            include: {
              seasonTeam: {
                include: { team: true }
              }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ status: "ERROR", message: "AGENTE NO ENCONTRADO EN EL NÚCLEO" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "ERROR", message: "FALLO AL RECUPERAR EL PERFIL" });
    }
  },

  // --- BUSCAR AGENTES LIBRES PARA RECLUTAR ---
  // GET /api/user/search/available?q=...
  searchAvailablePlayers: async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      
      const players = await prisma.user.findMany({
        where: {
          active: true,
          gamertag: { contains: String(q) },
          // Filtramos: No deben tener una relación activa en Roster 
          // o simplemente que no tengan equipo asignado (depende de tu regla de negocio)
          registrations: { none: {} } 
        },
        take: 10, // Limitamos para performance
        select: { id: true, gamertag: true, email: true, gamertagEa: true }
      });
      res.json(players);
    } catch (error) {
      res.status(500).json({ status: "ERROR", message: "ERROR EN LA BÚSQUEDA GLOBAL" });
    }
  },

  // LISTAR TODOS
  getUsers: async (req: Request, res: Response) => {
    try {
      const { includeInactive } = req.query;
      const users = await prisma.user.findMany({
        where: { active: includeInactive === 'true' ? false : true },
        orderBy: { gamertag: 'asc' }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ status: "ERROR", message: "FALLO AL RECUPERAR REGISTROS" });
    }
  },

  // ACTUALIZAR (Incluye vinculación a equipo si se envía teamId/ownerId)
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { gamertag, email, role, gamertagEa, passwordHash, ownerId } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          gamertag,
          email,
          role,
          gamertagEa,
          passwordHash, // Recuerda hashear si viene del body
          // Si tu esquema usa ownerId directo en User para equipos:
          // ownerId: ownerId === null ? null : ownerId 
        },
      });
      res.json({ status: "ÉXITO", data: updatedUser });
    } catch (error) {
      res.status(404).json({ status: "ERROR", message: "USUARIO NO ENCONTRADO" });
    }
  },
  // CREAR USUARIO (Registro Manual por Admin/Manager)
  createUser: async (req: any, res: Response) => {
    const { gamertag, email, password, role } = req.body;
    const requesterRole = req.user.role;

    try {
      // Regla de Oro: Manager no crea Admins
      if (requesterRole === 'manager' && role === 'admin') {
        return res.status(403).json({ message: "No puedes crear un rango superior al tuyo" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { gamertag, email, passwordHash, role: role || 'player' }
      });

      res.status(201).json({ message: "Usuario creado", id: user.id });
    } catch (error) {
      res.status(400).json({ message: "El email o gamertag ya están en uso" });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params; // 👈 Debe coincidir con el nombre en la ruta (:id)
    const userData = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          gamertag: userData.gamertag,
          email: userData.email,
          role: userData.role,
          gamertagEa: userData.gamertagEa,
          // No actualices el password aquí a menos que venga en el body
        },
      });

      res.json({ status: "ÉXITO", message: "USUARIO ACTUALIZADO", data: updatedUser });
    } catch (error) {
      // Si Prisma no encuentra el ID, lanzará un error que debes capturar
      res.status(404).json({ status: "ERROR", message: "USUARIO NO ENCONTRADO EN LA BASE DE DATOS" });
    }
  },

  // ELIMINAR USUARIO (SOFT DELETE)
  deleteUser: async (req: any, res: Response) => {
    const { id } = req.params;
    const { role: requesterRole } = req.user;

    try {
      const targetUser = await prisma.user.findUnique({ where: { id } });
      if (!targetUser) return res.status(404).json({ message: "Usuario inexistente" });

      // Protección de jerarquía
      if (requesterRole === 'manager' && targetUser.role === 'admin') {
        return res.status(403).json({ message: "Prohibido desactivar a un Administrador Global" });
      }

      // SOFT DELETE: Cambiamos el estado a false
      await prisma.user.update({
        where: { id },
        data: { active: false }
      });

      res.json({ message: "Usuario desactivado correctamente en TourneyOS" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno al procesar el borrado lógico" });
    }
  },
  restoreUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Verificamos si el usuario existe
      const userExists = await prisma.user.findUnique({
        where: { id: String(id) },
      });

      if (!userExists) {
        return res.status(404).json({ 
          status: "ERROR", 
          message: "USUARIO NO ENCONTRADO EN EL NÚCLEO" 
        });
      }

      // 2. Ejecutamos la restauración (Soft Restore)
      const restoredUser = await prisma.user.update({
        where: { id: String(id) },
        data: { active: true }, // Volvemos a activar la cuenta
      });

      res.json({ 
        status: "ÉXITO", 
        message: "PROTOCOLO DE RESTAURACIÓN COMPLETADO", 
        data: restoredUser 
      });

    } catch (error) {
      console.error("[BACKEND ERROR]:", error);
      res.status(500).json({ 
        status: "ERROR", 
        message: "FALLO CRÍTICO EN EL SERVIDOR AL RESTAURAR" 
      });
    }
  },
};