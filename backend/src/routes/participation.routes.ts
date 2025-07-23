import express from 'express';
import {
  getAllParticipations,
  getParticipationById,
  createParticipation,
  updateParticipation,
  deleteParticipation,
  addComment,
  getParticipationsByType,
  getParticipationsByStatus
} from '../controllers/participation.controller';

const router = express.Router();

// GET /api/participation
router.get('/', getAllParticipations);

// GET /api/participation/type/:type
router.get('/type/:type', getParticipationsByType);

// GET /api/participation/status/:statut
router.get('/status/:statut', getParticipationsByStatus);

// GET /api/participation/:id
router.get('/:id', getParticipationById);

// POST /api/participation
router.post('/', createParticipation);

// PUT /api/participation/:id
router.put('/:id', updateParticipation);

// POST /api/participation/:id/comment
router.post('/:id/comment', addComment);

// DELETE /api/participation/:id
router.delete('/:id', deleteParticipation);

export default router; 