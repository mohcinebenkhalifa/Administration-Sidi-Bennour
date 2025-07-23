import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  delai: {
    type: String,
    required: false,
  },
  documents_requis: [{
    type: String
  }],
  procedure: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Service', serviceSchema); 