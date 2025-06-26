import Character from '../models/character.model.js';

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los personajes' });
  }
};
