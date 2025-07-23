import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Interface pour les données d'événement venant de l'API
interface EvenementFromAPI {
  _id: string;
  titre: string;
  description: string;
  date: string; // ISO string
  lieu: string;
  image?: string;
  organisateur: string;
  statut: string;
  // createdAt?: string; // Optionnel, si vous voulez l'afficher
  // updatedAt?: string; // Optionnel
}

const EvenementsPage = () => {
  const [evenements, setEvenements] = useState<EvenementFromAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvenements = async () => {
      try {
        setLoading(true);
        // Utiliser l'endpoint /api/evenements/upcoming pour avoir les événements futurs et triés
        // ou /api/evenements pour tous les événements
        const response = await fetch('http://localhost:5000/api/evenements/upcoming');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: EvenementFromAPI[] = await response.json();
        setEvenements(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors de la récupération des événements.");
        setEvenements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvenements();
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Événements</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les événements à venir dans la commune de Sidi Bennour et participez à la vie locale.
          </p>
        </div>

        {loading && <p className="text-center text-lg">Chargement des événements...</p>}
        {error && <p className="text-center text-lg text-red-500">Erreur: {error}</p>}
        {!loading && !error && evenements.length === 0 && (
          <p className="text-center text-lg">Aucun événement à afficher pour le moment.</p>
        )}

        {!loading && !error && evenements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {evenements.map((event) => (
              <Card key={event._id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image || 'https://via.placeholder.com/400x250?text=Image+non+disponible'} 
                    alt={event.titre} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">{event.titre}</h2>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {/* Formater la date et éventuellement l'heure si disponible */}
                    <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.lieu}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed h-20 overflow-hidden text-ellipsis">
                    {event.description}
                  </p>
                  <Link 
                    to={`/evenements/${event._id}`} 
                    className="flex items-center text-primary hover:underline"
                  >
                    Voir les détails
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 bg-primary/10 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Proposer un événement</h2>
          <p className="mb-6">
            Vous organisez un événement à Sidi Bennour ? Soumettez-le pour qu'il soit ajouté à notre calendrier.
          </p>
          <Link 
            to="/contact" // Ce lien pointe vers la page de contact, ce qui est pertinent
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Soumettre un événement
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EvenementsPage;
