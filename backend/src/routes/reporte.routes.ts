import { Router } from 'express';
import { reporteController } from '../controllers/reporte.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware'; // Asumiendo que tienes estos middlewares

const router = Router();

/**
 * @route   POST /api/v1/reportes/procesar-ea
 * @desc    Obtiene datos de EA, mapea estadísticas y finaliza el partido en la DB
 * @access  Privado (Manager o Admin)
 */
router.post(
    '/procesar-ea', 
    verifyToken, 
    checkRole(['manager', 'admin']), 
    reporteController.store
);

export default router;