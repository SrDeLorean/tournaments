import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- 🪄 MOTOR DE CARGA AUTOMÁTICA ---
const routesPath = path.join(__dirname, 'routes');
const activeModules: any[] = [];

// Leemos todos los archivos de la carpeta /routes
fs.readdirSync(routesPath).forEach((file) => {
    // Solo cargamos archivos que terminen en .routes.ts o .routes.js
    if (file.endsWith('.routes.ts') || file.endsWith('.routes.js')) {
        const routeModule = require(path.join(routesPath, file));
        
        // El nombre del archivo define la ruta (ej: auth.routes.ts -> /api/auth)
        const routeName = file.split('.')[0]; 
        const apiPath = `/api/${routeName}`;

        // Registramos la ruta en Express
        app.use(apiPath, routeModule.default || routeModule);
        
        activeModules.push({ Modulo: routeName.toUpperCase(), Ruta: apiPath });
    }
});

// --- 🏠 RUTA RAÍZ ---
app.get('/', (req, res) => {
    res.json({
        project: "Successors Tournament API",
        status: "Online",
        modules: activeModules
    });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor Successors (Autoload) en http://localhost:${PORT}`);
    console.log("\n--- MÓDULOS DETECTADOS AUTOMÁTICAMENTE ---");
    console.table(activeModules);
});