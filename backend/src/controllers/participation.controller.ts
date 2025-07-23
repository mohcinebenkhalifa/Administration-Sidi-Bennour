import { Request, Response } from 'express';
import Participation from '../models/Participation';

// Get all participations
export const getAllParticipations = async (req: Request, res: Response) => {
  try {
    const participations = await Participation.find().sort({ createdAt: -1 });
    res.json(participations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des participations', error });
  }
};

// Get participation by ID
export const getParticipationById = async (req: Request, res: Response) => {
  try {
    const participation = await Participation.findById(req.params.id);
    if (!participation) {
      return res.status(404).json({ message: 'Participation non trouvée' });
    }
    res.json(participation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la participation', error });
  }
};

// Create participation
export const createParticipation = async (req: Request, res: Response) => {
  try {
    const newParticipation = new Participation(req.body);
    const savedParticipation = await newParticipation.save();
    res.status(201).json(savedParticipation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création de la participation', error });
  }
};

// Update participation
export const updateParticipation = async (req: Request, res: Response) => {
  try {
    const updatedParticipation = await Participation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedParticipation) {
      return res.status(404).json({ message: 'Participation non trouvée' });
    }
    res.json(updatedParticipation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la participation', error });
  }
};

// Delete participation
export const deleteParticipation = async (req: Request, res: Response) => {
  try {
    const deletedParticipation = await Participation.findByIdAndDelete(req.params.id);
    if (!deletedParticipation) {
      return res.status(404).json({ message: 'Participation non trouvée' });
    }
    res.json({ message: 'Participation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la participation', error });
  }
};

// Add comment to participation
export const addComment = async (req: Request, res: Response) => {
  try {
    const participation = await Participation.findById(req.params.id);
    if (!participation) {
      return res.status(404).json({ message: 'Participation non trouvée' });
    }

    participation.commentaires.push(req.body);
    const updatedParticipation = await participation.save();
    res.json(updatedParticipation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du commentaire', error });
  }
};

// Get participations by type
export const getParticipationsByType = async (req: Request, res: Response) => {
  try {
    const participations = await Participation.find({ type: req.params.type }).sort({ createdAt: -1 });
    res.json(participations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des participations par type', error });
  }
};

// Get participations by status
export const getParticipationsByStatus = async (req: Request, res: Response) => {
  try {
    const participations = await Participation.find({ statut: req.params.statut }).sort({ createdAt: -1 });
    res.json(participations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des participations par statut', error });
  }
}; 