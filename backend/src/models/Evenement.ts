import mongoose from 'mongoose';

const evenementSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  organisateur: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ['à venir', 'en cours', 'terminé'],
    default: 'à venir'
  }
}, {
  timestamps: true
});

export default mongoose.model('Evenement', evenementSchema); 