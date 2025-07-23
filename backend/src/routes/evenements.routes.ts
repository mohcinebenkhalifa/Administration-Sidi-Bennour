import express from 'express';
import fs from 'fs';
import path from 'path';
import {
  getAllEvenements,
  getEvenementById,
  createEvenement,
  updateEvenement,
  deleteEvenement,
  getUpcomingEvenements
} from '../controllers/evenements.controller';

const router = express.Router();
const dbPath = path.join(__dirname, '..', '..', 'db', 'events.json');

// GET /api/evenements/from-json
router.get('/from-json', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ message: 'Erreur lors de la lecture des événements depuis JSON.' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error("Error parsing JSON data:", parseErr);
      return res.status(500).json({ message: 'Erreur lors de l\'analyse des données JSON des événements.' });
    }
  });
});

// GET /api/evenements
router.get('/', getAllEvenements);

// GET /api/evenements/upcoming
router.get('/upcoming', getUpcomingEvenements);

// GET /api/evenements/:id
router.get('/:id', getEvenementById);

// POST /api/evenements
router.post('/', createEvenement);

// PUT /api/evenements/:id
router.put('/:id', updateEvenement);

// DELETE /api/evenements/:id
router.delete('/:id', deleteEvenement);

export default router; 