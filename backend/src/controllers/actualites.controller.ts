import { Request, Response } from 'express';
import Actualite from '../models/Actualite';

// Get all actualites
export const getAllActualites = async (req: Request, res: Response) => {
  try {
    const actualites = await Actualite.find().sort({ date: -1 });
    res.json(actualites);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des actualités', error });
  }
};

// Get single actualite
export const getActualiteById = async (req: Request, res: Response) => {
  try {
    const actualite = await Actualite.findById(req.params.id);
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.json(actualite);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'actualité', error });
  }
};

// Create actualite
export const createActualite = async (req: Request, res: Response) => {
  try {
    const newActualite = new Actualite(req.body);
    const savedActualite = await newActualite.save();
    res.status(201).json(savedActualite);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'actualité', error });
  }
};

// Update actualite
export const updateActualite = async (req: Request, res: Response) => {
  try {
    const updatedActualite = await Actualite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedActualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.json(updatedActualite);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'actualité', error });
  }
};

// Delete actualite
export const deleteActualite = async (req: Request, res: Response) => {
  try {
    const deletedActualite = await Actualite.findByIdAndDelete(req.params.id);
    if (!deletedActualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.json({ message: 'Actualité supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'actualité', error });
  }
}; 