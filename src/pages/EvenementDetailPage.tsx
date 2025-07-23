import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowLeft, Users, Share2 } from "lucide-react";

// Réutiliser l'interface EvenementFromAPI (ou la définir ici si elle n'est pas importée)
interface EvenementFromAPI {
  _id: string;
  titre: string;
  description: string;
  date: string; // ISO string
  lieu: string;
  image?: string;
  organisateur: string;
  statut: string;
  // Propriétés optionnelles qui étaient dans les données factices, à ajouter au modèle si besoin
  // fullDetails?: string[];
  // schedule?: { time: string; activity: string }[];
  // gallery?: string[];
}

const EvenementDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // id est maintenant _id de MongoDB
  const [event, setEvent] = useState<EvenementFromAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID de l'événement non fourni.");
      setLoading(false);
      return;
    }

    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/evenements/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Événement non trouvé.");
          } else {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          setEvent(null);
        } else {
          const data: EvenementFromAPI = await response.json();
          setEvent(data);
          setError(null);
        }
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors de la récupération de l'événement.");
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]); // Se redéclenche si l'ID change

  // Les données factices `events` sont supprimées
  // ...

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Chargement de l'événement...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500">Erreur: {error}</div>;
  }

  if (!event) {
    // Ce cas est déjà couvert par l'erreur "Événement non trouvé"
    // mais on garde une sécurité
    return <div className="container mx-auto px-4 py-12 text-center">Événement non disponible.</div>;
  }

  // Simuler l'heure si elle n'est pas dans l'API, pour l'instant
  const eventTime = new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) || "Non spécifié";

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="flex items-center text-muted-foreground">
            <Link to="/evenements">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux événements
            </Link>
          </Button>
        </div>

        {/* Image principale */}
        <div className="mb-8 rounded-lg overflow-hidden h-96 relative">
          <img 
            src={event.image || 'https://via.placeholder.com/1200x400?text=Image+de+l\'événement'} 
            alt={event.titre} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{event.titre}</h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                 {/* L'heure n'est pas dans le modèle actuel, on utilise une valeur simulée ou on l'ajoute au modèle */}
                <span>{eventTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{event.lieu}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description de l'événement */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">À propos de cet événement</h2>
          <div className="prose max-w-none mb-6">
            {/* Utiliser event.description. Si vous avez fullDetails dans l'API, vous pouvez l'utiliser ici */}
            <p className="mb-4 text-lg">{event.description}</p>
            {/* Si votre API retourne un champ 'details' plus long, vous pouvez l'afficher ici
            Si `event.fullDetails` est ajouté à l'API et à l'interface :
            event.fullDetails?.map((paragraph, index) => (
              <p key={index} className="mb-4 text-lg">{paragraph}</p>
            ))*/}
          </div>
          
          <div className="mt-8 bg-muted p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Je participe
              </Button>
              <div className="ml-6 flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                 {/* Le nombre de participants viendrait de l'API ou d'un autre système */}
                <span className="text-muted-foreground">Participants (info à venir)</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              L'inscription est gratuite mais recommandée pour nous aider à organiser au mieux l'événement.
            </p>
          </div>
        </div>

        {/* Programme (à adapter si event.schedule est ajouté à l'API) */}
        {/* {event.schedule && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Programme</h2>
            <div className="border rounded-lg overflow-hidden">
              {event.schedule.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex p-4 ${index < event.schedule.length - 1 ? 'border-b' : ''}`}
                >
                  <div className="w-24 font-semibold">{item.time}</div>
                  <div>{item.activity}</div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Galerie d'images (à adapter si event.gallery est ajouté à l'API) */}
        {/* {event.gallery && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Galerie photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {event.gallery.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden h-48">
                  <img 
                    src={image} 
                    alt={`${event.titre} - image ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Localisation */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Lieu de l'événement</h2>
          <div className="rounded-lg overflow-hidden h-80 bg-muted">
            {/* Vous pouvez intégrer une vraie carte ici plus tard (ex: Google Maps, Leaflet) */}
            <div className="w-full h-full bg-[url('https://via.placeholder.com/800x400?text=Carte+du+lieu')] bg-cover bg-center relative flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h3 className="font-semibold mb-2">{event.lieu}</h3>
                <p className="text-muted-foreground">Sidi Bennour, Maroc</p>
                {/* <Button className="mt-2 w-full" size="sm"> Voir sur la carte </Button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Partage et actions */}
        <div className="flex justify-between items-center border-t pt-8">
          <div>
            <Button variant="outline" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
          </div>
          <div>
            <Button asChild>
              <Link to="/evenements">
                Voir tous les événements
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvenementDetailPage;
