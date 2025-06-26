import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './src/config/database.js';

dotenv.config();

const app= express();
const PORT = process.env.PUERTO || 4000;

app.use (express.json());

startDB();

app.listen(PORT, () => {         
  console.log (' El servidor esta corriendo en el puerto')
   });

