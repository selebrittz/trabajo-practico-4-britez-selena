import { Router } from "express";
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/character.controllersl.js";

const router = Router();

// Rutas correspondientes a los controladores de personajes
router.get("/", getAllCharacters);         
router.get("/:id", getCharacterById);        
router.post("/", createCharacter);            
router.put("/:id", updateCharacter);          
router.delete("/:id", deleteCharacter);       

export default router;
