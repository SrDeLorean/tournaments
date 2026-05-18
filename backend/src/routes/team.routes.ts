import { Router } from 'express';
import { teamController } from '../controllers/team.controller';
// IMPORTANTE: Usamos los nombres que SI funcionan en tu sistema
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// LISTAR EQUIPOS (Admin y Manager)
router.get(
  '/', 
  verifyToken, 
  checkRole(['admin', 'manager']), 
  teamController.getTeams
);

// CREAR / ACTUALIZAR EQUIPO
router.post(
  '/', 
  verifyToken, 
  checkRole(['admin', 'manager']), 
  teamController.upsertTeam
);

// RESTAURAR EQUIPO (Solo Admin y Manager según tu lógica de User)
router.patch(
  '/:id/restore', 
  verifyToken, 
  checkRole(['admin', 'manager']), 
  teamController.restoreTeam
);

// ELIMINAR EQUIPO (Soft Delete)
router.delete(
  '/:id', 
  verifyToken, 
  checkRole(['admin', 'manager']), 
  teamController.deleteTeam
);

router.patch('/:id/restore', verifyToken, checkRole(['admin', 'manager']), teamController.restoreTeam);

export default router;