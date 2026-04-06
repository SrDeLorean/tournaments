import { Router } from 'express';
import { createMatch, getMatchesByTournament, reportScore } from '../controllers/match.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Ver el fixture (Público)
router.get('/tournament/:tournamentId', getMatchesByTournament);

// Programar un cruce (Solo Admins/Operadores)
router.post('/', verifyToken, createMatch);

// Reportar resultado (Solo Admins/Operadores)
router.put('/:id/score', verifyToken, reportScore);

export default router;