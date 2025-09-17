import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { mockData } from './mock';

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="heading-3 mb-4">
              {mockData.project.name}
            </h3>
            <p className="body-medium mb-6 max-w-md" style={{ color: 'var(--text-secondary)' }}>
              {mockData.project.tagline}. Creating sustainable urban solutions through innovative 
              eco-products and community engagement.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span>Made with</span>
              <Heart size={16} fill="var(--accent-primary)" color="var(--accent-primary)" />
              <span>by students passionate about sustainability</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="body-medium font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {mockData.navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block body-small hover:text-green-600 transition-colors text-left"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="body-medium font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1" style={{ color: 'var(--accent-text)' }} />
                <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  hello@greenloopproject.org
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1" style={{ color: 'var(--accent-text)' }} />
                <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" style={{ color: 'var(--accent-text)' }} />
                <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  Student Campus, Urban Development Hub
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="body-small" style={{ color: 'var(--text-muted)' }}>
              © {currentYear} {mockData.project.name}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button className="body-small hover:text-green-600 transition-colors" style={{ color: 'var(--text-muted)' }}>
                Privacy Policy
              </button>
              <button className="body-small hover:text-green-600 transition-colors" style={{ color: 'var(--text-muted)' }}>
                Terms of Service
              </button>
              <button className="body-small hover:text-green-600 transition-colors" style={{ color: 'var(--text-muted)' }}>
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;