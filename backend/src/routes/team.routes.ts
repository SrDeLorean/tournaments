import { Router } from 'express';
import { createTeam, getTeamsByTournament, deleteTeam } from '../controllers/team.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Listar equipos de un torneo específico (Público)
router.get('/tournament/:tournamentId', getTeamsByTournament);

// Inscribir un equipo (Protegido por JWT)
router.post('/', verifyToken, createTeam);

// Retirar un equipo (Protegido por JWT)
router.delete('/:id', verifyToken, deleteTeam);

export default router;