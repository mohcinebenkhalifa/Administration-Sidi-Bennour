import mongoose from 'mongoose';

const actualiteSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  categorie: {
    type: String,
    required: true,
  },
  auteur: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Actualite', actualiteSchema); 