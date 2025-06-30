import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './src/config/database.js';
import { Character } from './src/models/character.models.js';

dotenv.config();

const app = express();
const PORT = process.env.PUERTO || 4000;

app.use(express.json());

export const startServer =async() => {
  await startDB();
  await Character.sync();
  console.log('Base de datos sincronizada');    
  console.log ('tabla de personajes creada');
}

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en: http://localhost:${PORT}`);
});