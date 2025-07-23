import mongoose from 'mongoose';

const transparenceSchema = new mongoose.Schema({
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
    enum: ['budget', 'projets', 'décisions', 'rapports', 'marchés publics', 'autre'],
    required: true,
  },
  annee: {
    type: Number,
    required: true,
  },
  document_url: {
    type: String,
    required: true,
  },
  type_document: {
    type: String,
    enum: ['pdf', 'doc', 'xls', 'autre'],
    required: true,
  },
  taille_document: {
    type: String, // MODIFIÉ: en bytes devient une description, le type est String
    required: true,
  },
  date_publication: {
    type: Date,
    default: Date.now,
  },
  publie_par: {
    type: String,
    required: true,
  },
  tags: [{
    type: String
  }],
  est_public: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Transparence', transparenceSchema); 