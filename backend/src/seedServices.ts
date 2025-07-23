console.log('SCRIPT STARTING: backend/src/seedServices.ts'); // Forcing an initial log
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service'; // Corrected import for TypeScript

dotenv.config(); // Load environment variables from .env file (ensure .env is in backend/)

// Define an interface for the Service structure for type safety
interface IService {
  titre: string;
  description: string;
  categorie: string;
  icon?: string;
  disponible?: boolean;
  delai?: string;
  documents_requis?: string[];
  procedure: string;
}

const sampleServices: IService[] = [
  {
    titre: 'Demande de certificat de résidence',
    description: 'Obtenir un certificat prouvant votre lieu de résidence actuel.',
    categorie: 'État Civil',
    icon: 'home_work', // Example Material Icon name
    disponible: true,
    delai: '24-48 heures',
    documents_requis: ['Carte d\'identité nationale', 'Justificatif de domicile récent (facture d\'eau, électricité)'],
    procedure: '1. Se présenter au bureau d\'état civil. 2. Remplir le formulaire de demande. 3. Fournir les documents requis. 4. Payer les frais (si applicable). 5. Retirer le certificat après le délai indiqué.'
  },
  {
    titre: 'Légalisation de signature',
    description: 'Faire certifier l\'authenticité d\'une signature sur un document.',
    categorie: 'Services Administratifs',
    icon: 'fingerprint',
    disponible: true,
    delai: 'Immédiat',
    documents_requis: ['Document à légaliser', 'Carte d\'identité nationale du signataire'],
    procedure: '1. Se présenter au service concerné avec le document. 2. Le signataire appose sa signature devant l\'agent. 3. L\'agent certifie la signature.'
  },
  {
    titre: 'Demande de permis de construire',
    description: 'Obtenir l\'autorisation pour la construction d\'un nouveau bâtiment ou une modification majeure.',
    categorie: 'Urbanisme',
    icon: 'construction',
    disponible: true,
    delai: '30-60 jours',
    documents_requis: ['Plan de masse', 'Plan de situation', 'Titre de propriété', 'Devis descriptif et estimatif'],
    procedure: '1. Déposer le dossier complet au service de l\'urbanisme. 2. Le dossier est examiné par la commission technique. 3. Visite sur site si nécessaire. 4. Décision et délivrance du permis (ou refus motivé).'
  },
  {
    titre: 'Inscription à la bibliothèque municipale',
    description: 'Accéder aux services de prêt de livres et autres médias de la bibliothèque.',
    categorie: 'Culture et Loisirs',
    icon: 'local_library',
    disponible: true,
    delai: 'Immédiat',
    documents_requis: ['Carte d\'identité nationale', 'Justificatif de domicile', 'Photo d\'identité'],
    procedure: '1. Se présenter à l\'accueil de la bibliothèque. 2. Remplir le formulaire d\'inscription. 3. Fournir les documents et la photo. 4. Obtenir sa carte de lecteur.'
  }
];

const MONGODB_URI = process.env.MONGODB_URI;

async function seedDB() {
  if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined. Please create a .env file in the backend directory with your MongoDB connection string.');
    process.exit(1); // Exit if MongoDB URI is not found
  }

  // At this point, MONGODB_URI is guaranteed to be a string.
  try {
    await mongoose.connect(MONGODB_URI); // Now TypeScript should be happy
    console.log('Connected to MongoDB for seeding...');

    await Service.deleteMany({});
    console.log('Existing services cleared.');

    const insertedServices = await Service.insertMany(sampleServices);
    console.log(`${insertedServices.length} services have been successfully seeded!`);

  } catch (err) {
    console.error('Error seeding services:', err);
  } finally {
    if (mongoose.connection.readyState === 1) { // 1 means connected
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
  }
}

seedDB(); 