import express from 'express';
import {
  getAllActualites,
  getActualiteById,
  createActualite,
  updateActualite,
  deleteActualite
} from '../controllers/actualites.controller';

const router = express.Router();

// GET /api/actualites
router.get('/', getAllActualites);

// GET /api/actualites/:id
router.get('/:id', getActualiteById);

// POST /api/actualites
router.post('/', createActualite);

// PUT /api/actualites/:id
router.put('/:id', updateActualite);

// DELETE /api/actualites/:id
router.delete('/:id', deleteActualite);

export default router; 