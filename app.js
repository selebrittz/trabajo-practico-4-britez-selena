import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './src/config/database.js';
import { Character } from './src/models/character.models.js';
import characterRoutes from './src/routes/character.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PUERTO || 4000;

app.use(express.json());
app.use('/characters', characterRoutes);

const startServer =async() => {
  await startDB();
  await Character.sync();
  console.log('Base de datos sincronizada');    
  console.log ('tabla de personajes creada');
}

startServer();

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en: http://localhost:${PORT}`);
});