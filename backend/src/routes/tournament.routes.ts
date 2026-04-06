import { Router } from 'express';
import { 
  createTournament, 
  getAllTournaments, 
  getTournamentById, 
  updateTournament,
  deleteTournament
} from '../controllers/tournament.controller';
import { verifyToken } from '../middlewares/auth.middleware'; // 👈 Aquí está la importación clave

const router = Router();

// 🔓 Rutas de Lectura (Públicas o para todos los usuarios logueados)
router.get('/', getAllTournaments);
router.get('/:id', getTournamentById);

// 🔐 Rutas de Escritura (Protegidas por el Token del Administrador/Operador)
router.post('/', verifyToken, createTournament);
router.put('/:id', verifyToken, updateTournament);
router.delete('/:id', verifyToken, deleteTournament);

export default router;