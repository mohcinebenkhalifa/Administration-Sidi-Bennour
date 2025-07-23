import { Request, Response } from 'express';
import Contact from '../models/Contact';

// Get all contacts
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages', error });
  }
};

// Get contact by ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du message', error });
  }
};

// Create contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du message', error });
  }
};

// Update contact status
export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { statut } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du statut', error });
  }
};

// Delete contact
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du message', error });
  }
};

// Get contacts by status
export const getContactsByStatus = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({ statut: req.params.statut }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages par statut', error });
  }
}; 