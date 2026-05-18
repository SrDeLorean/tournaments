import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// --- RUTAS DE RECLUTAMIENTO Y ROSTER ---
router.get('/search/available', verifyToken, checkRole(['admin', 'manager']), userController.searchAvailablePlayers);
router.get('/team/:teamName', verifyToken, checkRole(['admin', 'manager']), userController.getUsersByTeam);
router.get('/:id', verifyToken, userController.getUserById);
// --- CRUD BÁSICO ---
router.get('/', verifyToken, checkRole(['admin', 'manager']), userController.getUsers);
router.post('/', verifyToken, checkRole(['admin', 'manager']), userController.createUser);
router.put('/:id', verifyToken, checkRole(['admin', 'manager']), userController.updateUser);
router.delete('/:id', verifyToken, checkRole(['admin', 'manager']), userController.deleteUser);
router.patch('/:id/restore', verifyToken, checkRole(['admin', 'manager']), userController.restoreUser);

export default router;