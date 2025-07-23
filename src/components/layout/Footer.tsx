
import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Commune de Sidi Bennour</h3>
            <p className="mb-4">
              Travailler ensemble pour une commune moderne, transparente et participative.
            </p>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 h-5 w-5" />
              <p>Avenue Mohammed V, Sidi Bennour, Maroc</p>
            </div>
            <div className="flex items-center mb-2">
              <Phone className="mr-2 h-5 w-5" />
              <p>+212 653-725806</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              <p>cusidibennour@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">Accueil</Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline">Services</Link>
              </li>
              <li>
                <Link to="/actualites" className="hover:underline">Actualités</Link>
              </li>
              <li>
                <Link to="/evenements" className="hover:underline">Événements</Link>
              </li>
              <li>
                <Link to="/transparence" className="hover:underline">Transparence</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Nous Contacter</h3>
            <p className="mb-4">
              Avez-vous des questions ou des suggestions? N'hésitez pas à nous contacter.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-white text-primary px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Contactez-nous
            </Link>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center">
          <p> {new Date().getFullYear()} Commune de Sidi Bennour.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
