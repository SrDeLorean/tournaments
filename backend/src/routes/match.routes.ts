import { Router } from 'express';
import { matchController } from '../controllers/match.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Endpoint para que los jugadores vean los partidos
router.get('/season/:seasonId', async (req, res) => {
    // Lógica simple de búsqueda de partidos por temporada
});

// Solo Managers y Admins pueden gestionar fixture y resultados
router.use(verifyToken);
router.use(checkRole(['admin', 'manager']));

router.post('/generate/:seasonId', matchController.generateFixture);
router.put('/result/:matchId', matchController.updateResult);

export default router;