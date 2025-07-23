import { Request, Response } from 'express';
import Evenement from '../models/Evenement';

// Get all evenements
export const getAllEvenements = async (req: Request, res: Response) => {
  try {
    const evenements = await Evenement.find().sort({ date: -1 });
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des événements', error });
  }
};

// Get single evenement
export const getEvenementById = async (req: Request, res: Response) => {
  try {
    const evenement = await Evenement.findById(req.params.id);
    if (!evenement) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement', error });
  }
};

// Create evenement
export const createEvenement = async (req: Request, res: Response) => {
  try {
    const newEvenement = new Evenement(req.body);
    const savedEvenement = await newEvenement.save();
    res.status(201).json(savedEvenement);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'événement', error });
  }
};

// Update evenement
export const updateEvenement = async (req: Request, res: Response) => {
  try {
    const updatedEvenement = await Evenement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvenement) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json(updatedEvenement);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'événement', error });
  }
};

// Delete evenement
export const deleteEvenement = async (req: Request, res: Response) => {
  try {
    const deletedEvenement = await Evenement.findByIdAndDelete(req.params.id);
    if (!deletedEvenement) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement', error });
  }
};

// Get upcoming events
export const getUpcomingEvenements = async (req: Request, res: Response) => {
  try {
    const upcomingEvenements = await Evenement.find({
      date: { $gte: new Date() }
    }).sort({ date: 1 });
    res.json(upcomingEvenements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des événements à venir', error });
  }
}; 