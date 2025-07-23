const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, 'db', 'events.json');

router.get('/events', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la lecture des événements.' });
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router; 