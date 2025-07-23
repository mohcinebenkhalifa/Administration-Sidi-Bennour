
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ParticipationPage = () => {
  const consultations = [
    {
      id: 1,
      title: "Révision du plan d'urbanisme",
      status: "En cours",
      endDate: "30 Juin 2025",
      description: "Donnez votre avis sur les futures orientations d'aménagement du territoire communal.",
      participation: 120
    },
    {
      id: 2,
      title: "Réaménagement du parc central",
      status: "En cours",
      endDate: "15 Mai 2025",
      description: "Participez à la conception du nouveau parc central avec plus d'espaces verts et de zones de loisirs.",
      participation: 85
    },
    {
      id: 3,
      title: "Mobilité et transport urbain",
      status: "À venir",
      endDate: "1 Août 2025",
      description: "Comment améliorer la circulation et les transports publics dans la commune ?",
      participation: 0
    }
  ];

  const communityProjects = [
    {
      id: 1,
      title: "Jardins communautaires",
      category: "Environnement",
      status: "En cours",
      description: "Création et entretien de jardins partagés dans différents quartiers de la ville.",
      progress: 65,
      volunteers: 28
    },
    {
      id: 2,
      title: "Fresques murales",
      category: "Culture",
      status: "En cours",
      description: "Embellissement des murs de la ville avec des œuvres d'art réalisées par des artistes locaux.",
      progress: 40,
      volunteers: 15
    },
    {
      id: 3,
      title: "Réseau d'entraide seniors",
      category: "Social",
      status: "Recrutement",
      description: "Création d'un réseau de bénévoles pour accompagner les personnes âgées dans leur quotidien.",
      progress: 20,
      volunteers: 12
    }
  ];

  const participatoryBudgets = [
    {
      id: 1,
      title: "Aire de jeux inclusive",
      budget: "150 000 DH",
      votes: 342,
      description: "Construction d'une aire de jeux adaptée aux enfants en situation de handicap."
    },
    {
      id: 2,
      title: "Pistes cyclables",
      budget: "200 000 DH",
      votes: 289,
      description: "Aménagement de pistes cyclables sécurisées pour encourager la mobilité douce."
    },
    {
      id: 3,
      title: "Système d'irrigation intelligent",
      budget: "125 000 DH",
      votes: 156,
      description: "Installation d'un système d'irrigation intelligent pour économiser l'eau dans les espaces verts."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Participation Citoyenne</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Impliquez-vous dans la vie de votre commune et contribuez activement à son développement.
          </p>
        </div>

        <Tabs defaultValue="consultations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Consultations</span>
            </TabsTrigger>
            <TabsTrigger value="projets" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Projets Communautaires</span>
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Budgets Participatifs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultations" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Consultations Publiques</h2>
              <p>
                Donnez votre avis sur les projets et les politiques de la commune. Votre participation aide la municipalité à prendre des décisions qui reflètent les besoins et les aspirations des citoyens.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {consultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardContent className="p-6">
                    <div className="mb-2 flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${consultation.status === "En cours" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                        {consultation.status}
                      </span>
                      <span className="text-sm text-muted-foreground">Fin: {consultation.endDate}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{consultation.title}</h3>
                    <p className="text-muted-foreground mb-4">{consultation.description}</p>
                    
                    {consultation.participation > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-1">{consultation.participation} participations</p>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      disabled={consultation.status !== "En cours"}
                    >
                      {consultation.status === "En cours" ? "Participer" : "Bientôt disponible"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projets" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Projets Communautaires</h2>
              <p>
                Engagez-vous dans des projets concrets pour améliorer votre commune. Les projets communautaires sont une excellente façon de rencontrer d'autres citoyens et de contribuer directement au bien-être collectif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="mb-2 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                        {project.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "En cours" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Avancement</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.volunteers} bénévoles actifs
                    </p>
                    
                    <Button className="w-full">
                      Rejoindre le projet
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budgets" className="mt-6">
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-2">Budgets Participatifs</h2>
              <p>
                Votez pour les projets que vous souhaitez voir financés par la commune. Le budget participatif permet aux citoyens de décider directement de l'allocation d'une partie du budget municipal.
              </p>
            </div>

            <div className="bg-primary/10 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-2">Budget participatif 2025</h3>
              <p className="mb-2">Le vote est ouvert jusqu'au 30 juin 2025</p>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-bold">500 000 DH</span>
                  <p className="text-sm">Budget total</p>
                </div>
                <div className="h-10 border-l border-primary/20"></div>
                <div>
                  <span className="text-2xl font-bold">787</span>
                  <p className="text-sm">Votes</p>
                </div>
                <div className="h-10 border-l border-primary/20"></div>
                <div>
                  <span className="text-2xl font-bold">3</span>
                  <p className="text-sm">Projets proposés</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {participatoryBudgets.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {project.budget}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {project.votes} votes
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <Button className="w-full">
                      Voter pour ce projet
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-primary text-white p-8 rounded-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Vous avez une idée pour améliorer la commune ?</h2>
            <p className="text-xl mb-6">
              Proposez votre initiative et contribuez à façonner l'avenir de Sidi Bennour.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/contact">Proposer une idée</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipationPage;
