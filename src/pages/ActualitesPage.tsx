import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Interface pour les données d'actualité venant de l'API
interface ActualiteFromAPI {
  _id: string;
  titre: string;
  description: string;
  image?: string; // L'image est optionnelle dans votre modèle backend
  date: string; // La date est une chaîne de caractères (ISO string) venant de l'API
  categorie: string;
  auteur: string;
  // Ajoutez d'autres champs si nécessaire selon votre modèle Mongoose
}

const ActualitesPage = () => {
  // Remplacer les données factices par un état pour les données de l'API
  const [actualites, setActualites] = useState<ActualiteFromAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/actualites');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: ActualiteFromAPI[] = await response.json();
        setActualites(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors de la récupération des actualités.");
        setActualites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, []); // Se déclenche une fois après le montage du composant

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Actualités</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Restez informé des dernières actualités et développements de la commune de Sidi Bennour.
          </p>
        </div>

        {loading && <p className="text-center text-lg">Chargement des actualités...</p>}
        {error && <p className="text-center text-lg text-red-500">Erreur: {error}</p>}
        {!loading && !error && actualites.length === 0 && (
          <p className="text-center text-lg">Aucune actualité à afficher pour le moment.</p>
        )}

        {!loading && !error && actualites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualites.map((item) => (
              <Card key={item._id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image || 'https://via.placeholder.com/400x250?text=Image+non+disponible'} // Image par défaut si item.image est vide
                    alt={item.titre} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {/* Formater la date si nécessaire */}
                    <span className="text-sm">{new Date(item.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{item.titre}</h2>
                  {/* Utiliser la description complète au lieu de l'extrait si l'extrait n'est pas dans l'API */}
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed h-20 overflow-hidden text-ellipsis">
                    {item.description} 
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-2">
                    {/* Le lien devrait pointer vers un ID de l'API maintenant, par ex. item._id */}
                    <Link to={`/actualites/${item._id}`} className="flex items-center">
                      Lire la suite
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Abonnez-vous à notre newsletter</h2>
          <p className="mb-6">Recevez les dernières actualités de la commune directement dans votre boîte mail.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="px-4 py-2 rounded-md border flex-grow"
            />
            <Button>S'abonner</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualitesPage;
