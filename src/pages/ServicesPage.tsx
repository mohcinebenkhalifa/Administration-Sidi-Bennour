import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, FileText, Users, HelpCircle, ShieldCheck, Building } from "lucide-react";

// Interface pour les données de service venant de l'API
interface ServiceFromAPI {
  _id: string;
  titre: string;
  description: string;
  categorie: string; // Ex: "Technique", "Administratif", "Social", "Autre"
  icon?: string; // Nom de l'icône (optionnel, peut être géré dynamiquement)
  disponible?: boolean;
  delai?: string;
  documents_requis?: string[];
  procedure?: string;
}

// Fonction pour mapper les catégories à des icônes Lucide
const getIconForCategory = (categoryName: string, iconName?: string) => {
  // On pourrait utiliser iconName si fourni par l'API et mappé à des composants Icônes
  // Pour l'instant, on se base sur la catégorie
  switch (categoryName.toLowerCase()) {
    case "techniques":
    case "technique":
      return <Settings className="h-8 w-8 text-primary" />;
    case "administratifs":
    case "administratif":
      return <FileText className="h-8 w-8 text-primary" />;
    case "sociaux":
    case "social":
      return <Users className="h-8 w-8 text-primary" />;
    case "sécurité": // Exemple de nouvelle catégorie
      return <ShieldCheck className="h-8 w-8 text-primary" />;
    case "urbanisme": // Exemple de nouvelle catégorie
      return <Building className="h-8 w-8 text-primary" />;
    default:
      return <HelpCircle className="h-8 w-8 text-primary" />;
  }
};

const ServicesPage = () => {
  const [allServices, setAllServices] = useState<ServiceFromAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/services');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: ServiceFromAPI[] = await response.json();
        setAllServices(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors de la récupération des services.");
        setAllServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filtrer les services par catégorie pour chaque onglet
  const technicalServices = allServices.filter(s => s.categorie.toLowerCase() === "techniques" || s.categorie.toLowerCase() === "technique");
  const administrativeServices = allServices.filter(s => s.categorie.toLowerCase() === "administratifs" || s.categorie.toLowerCase() === "administratif");
  const socialServices = allServices.filter(s => s.categorie.toLowerCase() === "sociaux" || s.categorie.toLowerCase() === "social");
  // Vous pouvez ajouter d'autres catégories ici si nécessaire
  // const autresServices = allServices.filter(s => !["techniques", "technique", "administratifs", "administratif", "sociaux", "social"].includes(s.categorie.toLowerCase()));

  const renderServiceList = (services: ServiceFromAPI[], categoryName: string) => {
    if (loading) return <p className="text-center py-4">Chargement...</p>;
    if (error && services.length === 0) return <p className="text-center py-4 text-red-500">Erreur de chargement des services {categoryName.toLowerCase()}.</p>;
    if (services.length === 0) return <p className="text-center py-4">Aucun service {categoryName.toLowerCase()} disponible pour le moment.</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service._id}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  {getIconForCategory(service.categorie, service.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.titre}</h3>
                <p className="text-muted-foreground text-sm h-20 overflow-hidden text-ellipsis">{service.description}</p>
                {/* Vous pouvez ajouter un Link ici si vous avez une page de détail pour les services */}
                {/* <Link to={`/services/${service._id}`}>Plus de détails</Link> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nos Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'ensemble des services proposés par la commune de Sidi Bennour pour répondre aux besoins quotidiens des citoyens.
          </p>
        </div>

        <Tabs defaultValue="techniques" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="techniques" id="tab-techniques" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Services Techniques</span>
            </TabsTrigger>
            <TabsTrigger value="administratifs" id="tab-administratifs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Services Administratifs</span>
            </TabsTrigger>
            <TabsTrigger value="sociaux" id="tab-sociaux" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Services Sociaux</span>
            </TabsTrigger>
            {/* Ajoutez ici d'autres TabsTrigger si vous avez plus de catégories principales */}
          </TabsList>

          <TabsContent value="techniques" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Services Techniques</h2>
              <p>
                Les services techniques de la commune sont responsables de l'entretien et de l'amélioration des infrastructures et équipements publics pour assurer un cadre de vie agréable à tous les citoyens.
              </p>
            </div>
            {renderServiceList(technicalServices, "Techniques")}
          </TabsContent>

          <TabsContent value="administratifs" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Services Administratifs</h2>
              <p>
                Les services administratifs facilitent les démarches quotidiennes des citoyens et assurent une gestion efficace des affaires municipales.
              </p>
            </div>
            {renderServiceList(administrativeServices, "Administratifs")}
          </TabsContent>

          <TabsContent value="sociaux" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Services Sociaux</h2>
              <p>
                Les services sociaux sont dédiés à l'accompagnement des personnes vulnérables et au développement du bien-être collectif à travers des initiatives sociales, culturelles et sportives.
              </p>
            </div>
            {renderServiceList(socialServices, "Sociaux")}
          </TabsContent>
          
          {/* Ajoutez ici d'autres TabsContent pour les catégories supplémentaires */}
        </Tabs>

        {error && !loading && allServices.length === 0 && (
          <p className="text-center text-lg text-red-500 mt-8">Erreur générale: {error}. Impossible de charger les services.</p>
        )}
        {!loading && !error && allServices.length === 0 && (
            <p className="text-center text-lg mt-8">Aucun service n'est disponible pour le moment.</p>
        )}

        <div className="mt-12 p-6 bg-primary/10 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Comment accéder à nos services ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">En personne</h3>
              <p>Rendez-vous à l'hôtel de ville pendant les heures d'ouverture :</p>
              <ul className="list-disc list-inside mt-2">
                <li>Lundi au vendredi : 8h30 - 16h30</li>
                <li>Samedi : 9h00 - 12h00</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Par téléphone</h3>
              <p>Contactez-nous au +212 5XX-XXXXXX :</p>
              <ul className="list-disc list-inside mt-2">
                <li>Lundi au vendredi : 9h00 - 16h00</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">En ligne</h3>
              <p>Utilisez notre formulaire de contact pour toute demande d'information :</p>
              <ul className="list-disc list-inside mt-2">
                <li>Disponible 24h/24, 7j/7</li>
                <li>Réponse sous 48h ouvrables</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
