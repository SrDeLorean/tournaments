import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Cargamos el .env explícitamente para que la terminal lo vea
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});