import { Character } from "../models/character.models.js";

const isValidInteger = (value) => {
  return Number.isInteger(Number(value));
};

const isValidGender = (value) => {
  return value === "Male" || value === "Female";
};

// Obtener todos los personajes
export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener personajes", error });
  }
};

// Obtener un personaje por ID
export const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id);

    if (!character) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }

    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el personaje", error });
  }
};

// Crear un nuevo personaje
export const createCharacter = async (req, res) => {
  try {
    const { name, ki, race, gender, description } = req.body;

    // Validaciones
    if (!name || !ki || !race || !gender) {
      return res.status(400).json({ message: "Faltan campos obligatorios (name, ki, race o gender)" });
    }

    if (!isValidInteger(ki)) {
      return res.status(400).json({ message: "El campo ki debe ser un número entero válido" });
    }

    if (!isValidGender(gender)) {
      return res.status(400).json({ message: "El campo gender debe ser 'Male' o 'Female'" });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({ message: "El campo description debe ser una cadena de texto" });
    }

    const existingCharacter = await Character.findOne({ where: { name } });
    if (existingCharacter) {
      return res.status(400).json({ message: `Ya existe un personaje con el nombre "${name}"` });
    }

    const newCharacter = await Character.create({ name, ki, race, gender, description });
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el personaje", error });
  }
};

// Actualizar un personaje
export const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id);

    if (!character) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }

    const { name, ki, race, gender, description } = req.body;

    if (!name || !ki || !race || !gender) {
      return res.status(400).json({ message: "Faltan campos obligatorios (name, ki, race o gender)" });
    }

    if (!isValidInteger(ki)) {
      return res.status(400).json({ message: "El campo ki debe ser un número entero válido" });
    }

    if (!isValidGender(gender)) {
      return res.status(400).json({ message: "El campo gender debe ser 'Male' o 'Female'" });
    }

    if (description !== undefined && typeof description !== "string") {
      return res.status(400).json({ message: "El campo description debe ser una cadena de texto" });
    }

    // Para verificar si name ya existe en otro personaje
    const existingCharacter = await Character.findOne({ where: { name } });
    if (existingCharacter && existingCharacter.id !== parseInt(id)) {
      return res.status(400).json({ message: `Ya existe un personaje con el nombre "${name}"` });
    }

    await character.update({ name, ki, race, gender, description });
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el personaje", error });
  }
};

// Eliminar un personaje
export const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id);

    if (!character) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }

    await character.destroy();
    res.json({ message: "Personaje eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el personaje", error });
  }
};
