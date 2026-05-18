import { Router } from 'express';
import { statsController } from '../controllers/stats.controller';

const router = Router();

// Endpoint público para ver la tabla
router.get('/leaderboard/:seasonId', statsController.getLeaderboard);

export default router;