import express from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactStatus,
  deleteContact,
  getContactsByStatus
} from '../controllers/contact.controller';

const router = express.Router();

// GET /api/contact
router.get('/', getAllContacts);

// GET /api/contact/status/:statut
router.get('/status/:statut', getContactsByStatus);

// GET /api/contact/:id
router.get('/:id', getContactById);

// POST /api/contact
router.post('/', createContact);

// PATCH /api/contact/:id/status
router.patch('/:id/status', updateContactStatus);

// DELETE /api/contact/:id
router.delete('/:id', deleteContact);

export default router; 