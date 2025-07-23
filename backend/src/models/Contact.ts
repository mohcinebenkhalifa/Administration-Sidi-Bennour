import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: false,
  },
  sujet: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ['non lu', 'lu', 'en traitement', 'traité'],
    default: 'non lu'
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema); 