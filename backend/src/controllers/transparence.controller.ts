import { Request, Response } from 'express';
import Transparence from '../models/Transparence';

// Get all documents
export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Transparence.find({ est_public: true }).sort({ date_publication: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des documents', error });
  }
};

// Get document by ID
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const document = await Transparence.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du document', error });
  }
};

// Create document
export const createDocument = async (req: Request, res: Response) => {
  try {
    const newDocument = new Transparence(req.body);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du document', error });
  }
};

// Update document
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const updatedDocument = await Transparence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }
    res.json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du document', error });
  }
};

// Delete document
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const deletedDocument = await Transparence.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document non trouvé' });
    }
    res.json({ message: 'Document supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du document', error });
  }
};

// Get documents by category
export const getDocumentsByCategory = async (req: Request, res: Response) => {
  try {
    const documents = await Transparence.find({ 
      categorie: req.params.categorie,
      est_public: true 
    }).sort({ date_publication: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des documents par catégorie', error });
  }
};

// Get documents by year
export const getDocumentsByYear = async (req: Request, res: Response) => {
  try {
    const documents = await Transparence.find({ 
      annee: req.params.annee,
      est_public: true 
    }).sort({ date_publication: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des documents par année', error });
  }
};

// Search documents
export const searchDocuments = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q;
    const documents = await Transparence.find({
      est_public: true,
      $or: [
        { titre: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { tags: { $in: [new RegExp(String(searchTerm), 'i')] } }
      ]
    }).sort({ date_publication: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche des documents', error });
  }
}; 