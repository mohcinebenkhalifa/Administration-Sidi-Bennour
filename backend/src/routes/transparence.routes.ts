import express from 'express';
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByCategory,
  getDocumentsByYear,
  searchDocuments
} from '../controllers/transparence.controller';

const router = express.Router();

// GET /api/transparence
router.get('/', getAllDocuments);

// GET /api/transparence/search
router.get('/search', searchDocuments);

// GET /api/transparence/category/:categorie
router.get('/category/:categorie', getDocumentsByCategory);

// GET /api/transparence/year/:annee
router.get('/year/:annee', getDocumentsByYear);

// GET /api/transparence/:id
router.get('/:id', getDocumentById);

// POST /api/transparence
router.post('/', createDocument);

// PUT /api/transparence/:id
router.put('/:id', updateDocument);

// DELETE /api/transparence/:id
router.delete('/:id', deleteDocument);

export default router; 