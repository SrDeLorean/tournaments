import { Router } from 'express';
import { transferController } from '../controllers/transfer.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

router.use(verifyToken);

// Acciones de Jugadores/Dueños
router.post('/request', transferController.requestJoin);
router.post('/message', transferController.sendMessage);
router.put('/:requestId/accept', transferController.acceptByTeam);

// Acción exclusiva del Manager (Validación de pago/inscripción)
router.put('/:requestId/finalize', checkRole(['manager', 'admin']), transferController.finalizeTransfer);

export default router;