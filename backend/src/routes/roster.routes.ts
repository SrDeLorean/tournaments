import { Router } from 'express';
import { rosterController } from '../controllers/roster.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Fichar a un jugador
router.post('/enroll', verifyToken, checkRole(['admin', 'manager']), rosterController.enrollPlayer);

// Dar de baja a un jugador (Se requiere el ID del Roster, no del User)
router.patch('/:rosterId/release', verifyToken, checkRole(['admin', 'manager']), rosterController.releasePlayer);

// Ver el historial de un jugador (Para el perfil del jugador)
router.get('/history/:userId', verifyToken, rosterController.getPlayerHistory);

// Ruta para obtener el roster específico de una temporada
router.get('/team/:teamId/season/:seasonId', verifyToken, rosterController.getRosterBySeason);

export default router;