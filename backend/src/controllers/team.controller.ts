import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const teamController = {
  // 1. LISTAR EQUIPOS (Con filtro de activos/inactivos)
  getTeams: async (req: Request, res: Response) => {
    try {
      const { includeInactive } = req.query;
      
      // Si includeInactive es 'true', traemos todo. Si no, solo active: true
      const whereCondition = includeInactive === 'true' ? {} : { active: true };

      const teams = await prisma.team.findMany({
        where: whereCondition,
        include: {
          owner: {
            select: { gamertag: true, email: true } // Traemos datos del dueño
          },
          _count: {
            select: { seasonTeams: true } // Conteo de participaciones en temporadas
          }
        },
        orderBy: { name: 'asc' }
      });

      res.json(teams);
    } catch (error) {
      console.error("[TEAMS_GET] Error:", error);
      res.status(500).json({ status: "ERROR", message: "FALLO AL RECUPERAR REGISTROS" });
    }
  },

  // CREAR O ACTUALIZAR (UPSERT)
  saveTeam: async (teamData: any) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    // Si teamData tiene ID, es una actualización, si no, es creación
    const response = await axios.post(`${API_URL}/team`, teamData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // 2. CREAR / ACTUALIZAR (UPSERT)
  // Nota: req debe ser 'any' si usas custom property 'user' del authMiddleware
  upsertTeam: async (req: any, res: Response) => {
    const { id, name, logoUrl, clubIdEa, ownerId } = req.body;
    const { role: requesterRole, id: requesterId } = req.user;

    try {
      // SEGURIDAD: Un Manager solo puede crear equipos donde ÉL es el dueño
      if (requesterRole === 'manager' && ownerId !== requesterId) {
        return res.status(403).json({ 
          message: "SOLO PUEDES REGISTRAR EQUIPOS BAJO TU PROPIA AUTORÍA" 
        });
      }

      const team = await prisma.team.upsert({
        where: { id: id || 'new-uuid-placeholder' },
        update: { name, logoUrl, clubIdEa, ownerId },
        create: { 
          name, 
          logoUrl, 
          clubIdEa, 
          ownerId: ownerId || requesterId, // Por defecto el creador es el dueño
          active: true 
        }
      });

      res.status(id ? 200 : 201).json({ 
        status: "ÉXITO", 
        message: id ? "EQUIPO ACTUALIZADO" : "EQUIPO REGISTRADO EN EL NÚCLEO", 
        data: team 
      });
    } catch (error) {
      res.status(400).json({ message: "EL NOMBRE O ID EA YA ESTÁ REGISTRADO EN OTRA FRANQUICIA" });
    }
  },

  // 3. DESACTIVAR (SOFT DELETE)
  deleteTeam: async (req: any, res: Response) => {
    const { id } = req.params;
    const { role: requesterRole, id: requesterId } = req.user;

    try {
      const team = await prisma.team.findUnique({ where: { id } });
      if (!team) return res.status(404).json({ message: "EQUIPO NO ENCONTRADO" });

      // SEGURIDAD: Un Manager solo puede borrar SU equipo
      if (requesterRole === 'manager' && team.ownerId !== requesterId) {
        return res.status(403).json({ message: "NO TIENES PERMISOS SOBRE ESTA FRANQUICIA" });
      }

      await prisma.team.update({
        where: { id },
        data: { active: false }
      });

      res.json({ message: "EQUIPO DESACTIVADO CORRECTAMENTE" });
    } catch (error) {
      res.status(500).json({ error: "ERROR AL PROCESAR BAJA LÓGICA" });
    }
  },

  // RESTAURAR EQUIPO (SOFT RESTORE)
  restoreTeam: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      // 1. Verificamos si el equipo existe en el registro (aunque esté inactivo)
      const teamExists = await prisma.team.findUnique({
        where: { id: String(id) }
      });

      if (!teamExists) {
        return res.status(404).json({ 
          status: "ERROR", 
          message: "LA FRANQUICIA NO EXISTE EN EL ARCHIVO HISTÓRICO" 
        });
      }

      // 2. Cambiamos el estado a activo
      const restoredTeam = await prisma.team.update({
        where: { id: String(id) },
        data: { active: true }
      });

      res.json({ 
        status: "ÉXITO", 
        message: "FRANQUICIA REINSTALADA CORRECTAMENTE", 
        data: restoredTeam 
      });

    } catch (error) {
      console.error("[BACKEND ERROR - RESTORE TEAM]:", error);
      res.status(500).json({ 
        status: "ERROR", 
        message: "FALLO CRÍTICO AL RECONECTAR EL EQUIPO" 
      });
    }
  }
};