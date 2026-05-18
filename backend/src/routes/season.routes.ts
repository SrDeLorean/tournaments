import { Router } from 'express';
import { seasonController } from '../controllers/season.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Ruta crítica: Cerrar Temporada (Solo Manager/Admin)
router.patch('/:seasonId/close', verifyToken, checkRole(['admin', 'manager']), seasonController.closeSeason);

export default router;