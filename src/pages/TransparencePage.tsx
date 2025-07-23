import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Users, ArrowDown, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Interface for data coming from the API
interface TransparenceDocFromAPI {
  _id: string;
  titre: string;
  description: string;
  categorie: 'budget' | 'projet' | 'decision_conseil' | 'consultation' | 'marche_public' | 'autre'; // Match the enum in the backend model
  annee?: number;
  document_url: string;
  type_document?: 'pdf' | 'rapport' | 'compte_rendu' | 'plan' | 'autre'; // Match the enum
  taille_document?: string;
  date_publication?: string; // Should be a date string
  publie_par?: string;
  tags?: string[];
  est_public?: boolean;
  // Additional fields if needed for specific categories like projects
  statutProjet?: 'en_cours' | 'termine' | 'planifie'; // Example for projects
  budgetProjet?: string; // Example for projects
  dateDebutProjet?: string; // Example for projects
  dateFinProjet?: string; // Example for projects
  progressionProjet?: number; // Example for projects
  participantsConsultation?: number; // Example for consultations
  decisionsConsultation?: string[]; // Example for consultations
}

const TransparencePage = () => {
  const [allDocs, setAllDocs] = useState<TransparenceDocFromAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/transparence');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: TransparenceDocFromAPI[] = await response.json();
        setAllDocs(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue lors de la récupération des documents.");
        setAllDocs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  // Helper function to filter documents by category
  const getDocumentsByCategory = (category: TransparenceDocFromAPI['categorie']) => {
    return allDocs.filter(doc => doc.categorie === category);
  };

  // Data for each tab will be derived from allDocs using the helper
  const budgetDocuments = getDocumentsByCategory('budget');
  // For projects, we might need to further separate them if the API returns them mixed
  // Or if the 'projet' category itself contains enough info (like statutProjet)
  const ongoingProjectDocuments = getDocumentsByCategory('projet').filter(p => p.statutProjet === 'en_cours');
  const completedProjectDocuments = getDocumentsByCategory('projet').filter(p => p.statutProjet === 'termine');
  const councilMeetingDocuments = getDocumentsByCategory('decision_conseil');
  const consultationResultDocuments = getDocumentsByCategory('consultation');
  // const marchePublicDocuments = getDocumentsByCategory('marche_public'); // For the public tenders section

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Chargement des données de transparence...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Transparence</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accédez aux informations sur la gestion de la commune, les finances publiques et les décisions du conseil municipal.
          </p>
        </div>

        <Tabs defaultValue="budgets" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="budgets" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Budgets et Finances</span>
            </TabsTrigger>
            <TabsTrigger value="projets" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Projets</span>
            </TabsTrigger>
            <TabsTrigger value="decisions" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Décisions du Conseil</span>
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Résultats des Consultations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="budgets" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Budgets et Finances</h2>
              <p>
                Consultez les informations détaillées sur les recettes, les dépenses et les investissements de la commune.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Répartition du budget 2024</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Infrastructures</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Services sociaux</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Éducation et culture</span>
                        <span>20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Administration</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Environnement</span>
                        <span>5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Évolution du budget</h3>
                  <div className="space-y-6">
                    {budgetDocuments.map((budget) => (
                      <div key={budget._id} className="border-b pb-4 last:border-0 last:pb-0">
                        <h4 className="font-semibold mb-2">{budget.titre}</h4>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Recettes</p>
                            <p className="text-lg font-medium">{budget.budgetProjet}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Dépenses</p>
                            <p className="text-lg font-medium">{budget.budgetProjet}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                          <ArrowDown className="mr-2 h-4 w-4" />
                          Télécharger le rapport complet
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Marchés publics</h3>
              <p className="mb-4">
                Consultez les informations sur les appels d'offres et les marchés publics attribués par la commune.
              </p>
              <Button>Accéder aux marchés publics</Button>
            </div>
          </TabsContent>

          <TabsContent value="projets" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Projets en cours et passés</h2>
              <p>
                Suivez l'état d'avancement des projets communaux et consultez les informations sur les projets achevés.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Projets en cours</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {ongoingProjectDocuments.map((project) => (
                <Card key={project._id}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{project.titre}</h4>
                    <div className="text-sm text-muted-foreground mb-4">
                      <p>Budget: {project.budgetProjet}</p>
                      <p>Début: {project.dateDebutProjet}</p>
                      <p>Fin prévue: {project.dateFinProjet}</p>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Avancement</span>
                        <span className="text-sm font-medium">{project.progressionProjet}%</span>
                      </div>
                      <Progress value={project.progressionProjet} className="h-2" />
                    </div>
                    <p className="text-sm">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4">Projets achevés</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {completedProjectDocuments.map((project) => (
                <Card key={project._id}>
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        Achevé
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{project.titre}</h4>
                    <div className="text-sm text-muted-foreground mb-4">
                      <p>Budget: {project.budgetProjet}</p>
                      <p>Achevé en: {project.dateFinProjet}</p>
                    </div>
                    <p className="text-sm">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="decisions" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Décisions du Conseil Municipal</h2>
              <p>
                Consultez les procès-verbaux des réunions du conseil municipal et restez informé des décisions prises.
              </p>
            </div>

            <div className="space-y-6">
              {councilMeetingDocuments.map((meeting, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{meeting.titre}</h3>
                        <p className="text-muted-foreground">{meeting.date_publication}</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Télécharger le PV
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Ordre du jour :</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {meeting.decisionsConsultation?.map((item, idx) => (
                          <li key={idx} className="text-muted-foreground">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button>Voir toutes les réunions du conseil</Button>
            </div>
          </TabsContent>

          <TabsContent value="consultations" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Résultats des Consultations</h2>
              <p>
                Découvrez les résultats des consultations publiques et les décisions prises suite à la participation citoyenne.
              </p>
            </div>

            <div className="space-y-8">
              {consultationResultDocuments.map((consultation) => (
                <Card key={consultation._id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{consultation.titre}</h3>
                        <p className="text-muted-foreground">{consultation.date_publication} • {consultation.participantsConsultation} participants</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Rapport complet
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Décisions prises suite à la consultation :</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {consultation.decisionsConsultation?.map((decision, idx) => (
                          <li key={idx} className="text-muted-foreground">{decision}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-primary text-white p-8 rounded-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Déclarations de conflit d'intérêts</h2>
            <p className="text-xl mb-6">
              Consultez les déclarations de conflit d'intérêts des élus et des fonctionnaires municipaux.
            </p>
            <Button className="bg-white text-primary hover:bg-gray-100">
              Accéder aux déclarations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencePage;
