import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServicesByCategory
} from '../controllers/services.controller';

const router = express.Router();

// GET /api/services
router.get('/', getAllServices);

// GET /api/services/category/:categorie
router.get('/category/:categorie', getServicesByCategory);

// GET /api/services/:id
router.get('/:id', getServiceById);

// POST /api/services
router.post('/', createService);

// PUT /api/services/:id
router.put('/:id', updateService);

// DELETE /api/services/:id
router.delete('/:id', deleteService);

export default router; 