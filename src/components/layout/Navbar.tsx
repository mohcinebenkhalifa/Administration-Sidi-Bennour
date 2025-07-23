
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, MessageSquare, FileText, Calendar, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Accueil", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Services", path: "/services", icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: "Actualités", path: "/actualites", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Événements", path: "/evenements", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Participation", path: "/participation", icon: <Users className="w-4 h-4 mr-2" /> },
    { name: "Transparence", path: "/transparence", icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: "Contact", path: "/contact", icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Sidi Bennour</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md hover:bg-muted hover:text-primary transition duration-150 ease-in-out"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-4 py-3 rounded-md hover:bg-muted hover:text-primary transition duration-150 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
