import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, FileText, Users, Info, Settings, MessageSquare, MapPin } from "lucide-react";
import sidiBennourImage from "@/assets/images/Sidi Bennour.png";

import communeImage from "@/assets/images/commune sidi bennour.jpg";
import actualiteImage from "@/assets/images/ورشة الإعداد المشترك لبرنامج عمل الانفتاح.jpg";
import intoxicationImage from "@/assets/images/intoxication-a-Sidi-Bennour.jpg";
import chevalEventImage from "@/assets/images/cheval-event.jpg";
import forumEventImage from "@/assets/images/forum-event.jpg";
import halqaEventImage from"@/assets/images/halqa-event.jpg";
import HoraireImage from "@/assets/images/HoraireImage.jpg";
const Index = () => {
  const featuredServices = [
    {
      title: "Services Techniques",
      description: "Entretien des routes, éclairage public et aménagement urbain",
      icon: <Settings className="h-10 w-10 text-primary" />,
      link: "/services#techniques"
    },
    {
      title: "Services Administratifs",
      description: "État civil, certificats et attestations administratives",
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: "/services#administratifs"
    },
    {
      title: "Services Sociaux",
      description: "Aide aux personnes en difficulté et actions sociales",
      icon: <Users className="h-10 w-10 text-primary" />,
      link: "/services#sociaux"
    }
  ];

  const latestNews = [
    {
      id: 1,
      title: "ورشة الإعداد المشترك لبرنامج عمل الانفتاح",
      date: "Mercredi 19 mars 2024",
      excerpt: "ورشة عمل مشتركة بين المجلس البلدي وجمعيات المجتمع المدني لتطوير برنامج عمل الانفتاح والتواصل مع المواطنين."
    },
    {
      id: 2,
      title: "intoxication-a-Sidi-Bennour",
      date: "Aid Al-Adha 2023",
      excerpt: "Province de Sidi Bennour : 60 personnes admises à l’hôpital pour intoxication alimentaire (autorités locales)"
    },
    {
      id: 3,
      title: "Nouveaux horaires pour les services municipaux",
      date: "2 Avril 2025",
      excerpt: "À partir du 1er mai, les bureaux municipaux adopteront de nouveaux horaires pour mieux servir les citoyens."
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Festival international de la Halqa ",
      date: "11 au 15 avril 2025",
      location: "La quatrième édition du Festival international de la Halqa se tient du 11 au 15 avril 2025 à Sidi Bennour.",
      image :halqaEventImage
     },
    {
      id: 2,
      title: " Forum d’orientation scolaire et universitaire",
      date: "26 et 27 février 2025",
      location: "École Supérieure de Technologie de Sidi Bennour",
     image:forumEventImage
    },
    {
      id: 3,
      title: "Journée dédiée au cheval",
      date: "24 avril 2024",
      location: "Hôtel de ville",
      image:chevalEventImage
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative text-white py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={sidiBennourImage} 
            alt="Sidi Bennour" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 select-all">Bienvenue à Sidi Bennour</h1>
            <p className="text-xl opacity-90 mb-8 select-all">
              Une commune moderne au service de ses citoyens
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/services">Découvrir nos services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-16 bg-white opacity-10 transform -skew-y-3 origin-right"></div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 select-all">La Commune de Sidi Bennour</h2>
              <p className="text-lg mb-4 select-all">
                située dans la région Casablanca-Settat, au Maroc, et constitue le chef-lieu de la province de Sidi Bennour.
                Elle se trouve à environ 67 km au sud d'El jadida,à 120 km au nord-ouest de Marrakech, et à 210 km au sud-ouest de Rabat. 
              </p>
              <p className="text-lg mb-6 select-all">
               Informations principales : <br />
               -Superficie : 6.15 km² <br />
               -Population : environ 60 928 habitants (recensement de 2020) <br />
               -Altitude: 185 mètres <br />
               -Maire : Mohamed Saissi Hossni(Parti Authenticité et Modernité, PAM)
              </p>
              <Button asChild>
                <Link to="/actualites">En savoir plus</Link>
              </Button>
            </div>
            <div className="md:w-1/2 h-80 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={communeImage} 
                alt="Commune de Sidi Bennour" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Découvrez les différents services proposés par la commune de Sidi Bennour pour améliorer votre quotidien.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <Button asChild variant="outline">
                      <Link to={service.link}>En savoir plus</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link to="/services">Voir tous les services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Info className="mr-2 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Dernières Actualités</h2>
              </div>
              <div className="space-y-6">
                {latestNews.map((news, index) => (
                  <div key={news.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="mb-4 h-40 -mx-6 -mt-6">
                      <img 
                        src={index === 0 ? actualiteImage : index === 1 ? intoxicationImage:index===2 ? HoraireImage : `https://images.unsplash.com/photo-${1580940540870 + news.id * 10520}?q=80&w=2670&auto=format&fit=crop`}
                        alt={news.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{news.date}</p>
                    <p className="mb-4">{news.excerpt}</p>
                    <Link 
                      to={`/actualites/${news.id}`} 
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      Lire la suite
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/actualites">Toutes les actualités</Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <Calendar className="mr-2 h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold select-all">Événements à Venir</h2>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={event.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex">
                    <div className="mr-4 w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
  <img 
    src={event.image}
    alt={event.title} 
    className="w-full h-full object-cover"
  />
</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 select-all">{event.title}</h3>
                        <div className="flex items-center mb-2">
                          <Calendar className="mr-2 h-4 w-4 text-secondary" />
                          <p className="select-all">{event.date}</p>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-secondary" />
                          <p className="select-all">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link to="/evenements">Tous les événements</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1596456239083-27d6a4061f7d?q=80&w=2670&auto=format&fit=crop" 
            alt="Participation citoyenne" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Participez à la vie de votre commune</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Votre avis compte ! Rejoignez les consultations publiques et contribuez aux projets qui façonnent l'avenir de Sidi Bennour.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/participation">Participer</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
