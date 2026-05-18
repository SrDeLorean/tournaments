import { Router } from 'express';
import { competitionController } from '../controllers/competition.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Lectura pública/jugador
router.get('/community/:slug', competitionController.getCommunityCompetitions);

// Gestión protegida
router.use(verifyToken);
router.use(checkRole(['admin', 'manager']));

router.post('/tournament', competitionController.createTournament);
router.post('/season', competitionController.createSeason);

export default router;