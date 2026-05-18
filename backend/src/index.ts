import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Configuración de variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// --- 🛠️ MIDDLEWARES GLOBALES ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 🪄 MOTOR DE CARGA AUTOMÁTICA (AUTOLOAD) ---
const routesPath = path.join(__dirname, 'routes');
const activeModules: any[] = [];

// Verificar que la carpeta de rutas existe antes de leer
if (fs.existsSync(routesPath)) {
    fs.readdirSync(routesPath).forEach((file) => {
        // Solo cargamos archivos de rutas (evitamos sourcemaps o archivos de test)
        if (file.endsWith('.routes.ts') || file.endsWith('.routes.js')) {
            
            // Requerimos el módulo de forma dinámica
            const routeModule = require(path.join(routesPath, file));
            
            // El nombre del archivo define el endpoint (ej: auth.routes.ts -> auth)
            const routeName = file.split('.')[0]; 
            const apiPath = `/api/${routeName}`;

            // Registramos la ruta en Express
            // Nota: routeModule.default es para export default, routeModule es para module.exports
            app.use(apiPath, routeModule.default || routeModule);
            
            activeModules.push({ 
                Módulo: routeName.toUpperCase(), 
                Endpoint: apiPath,
                Archivo: file 
            });
        }
    });
} else {
    console.warn(`⚠️  Advertencia: La carpeta ${routesPath} no existe.`);
}

// --- 🏠 RUTA RAÍZ E INFORMACIÓN ---
app.get('/', (req: Request, res: Response) => {
    res.json({
        project: "TourneyOS - Successors Tournament API",
        version: "2.0.0",
        status: "Online",
        environment: process.env.NODE_ENV || 'development',
        active_modules: activeModules
    });
});

// --- 🚨 MANEJO DE ERRORES GLOBAL (404 & 500) ---
// Captura rutas no encontradas
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "La ruta solicitada no existe." });
});

// Captura errores internos del servidor
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ Error detectado:', err.stack);
    res.status(500).json({ 
        message: "Error interno del servidor",
        error: process.env.NODE_ENV === 'development' ? err.message : {} 
    });
});

// --- 🚀 ARRANQUE DEL SISTEMA ---
app.listen(PORT, () => {
    console.clear();
    console.log(`\n🚀 Servidor TourneyOS corriendo en: http://localhost:${PORT}`);
    console.log("---------------------------------------------------------");
    console.log("📡 MÓDULOS CARGADOS DINÁMICAMENTE:");
    
    if (activeModules.length > 0) {
        console.table(activeModules);
    } else {
        console.log("❌ No se detectaron módulos en la carpeta /routes");
    }
    console.log("---------------------------------------------------------\n");
});

export default app;