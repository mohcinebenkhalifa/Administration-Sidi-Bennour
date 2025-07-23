import mongoose from 'mongoose';

const participationSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['suggestion', 'réclamation', 'projet', 'autre'],
    required: true,
  },
  auteur: {
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
    }
  },
  localisation: {
    type: String,
    required: false,
  },
  pieces_jointes: [{
    nom: String,
    url: String
  }],
  statut: {
    type: String,
    enum: ['soumis', 'en cours d\'examen', 'accepté', 'refusé'],
    default: 'soumis'
  },
  commentaires: [{
    texte: String,
    date: {
      type: Date,
      default: Date.now
    },
    auteur: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('Participation', participationSchema); 