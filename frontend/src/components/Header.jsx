import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { mockData } from './mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="nav-header">
      <div className="flex items-center">
        <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
          {mockData.project.name}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2">
        {mockData.navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => scrollToSection(item.href)}
            className="nav-link"
          >
            {item.name}
          </button>
        ))}
      </nav>

      <div className="hidden md:flex items-center space-x-3">
        <button 
          onClick={() => scrollToSection('#contact')}
          className="btn-secondary"
        >
          Get in Touch
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg md:hidden">
          <nav className="flex flex-col p-4">
            {mockData.navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="nav-link text-left w-full py-2"
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-primary mt-4"
            >
              Get in Touch
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;