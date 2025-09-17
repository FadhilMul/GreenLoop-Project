import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { mockData } from './mock';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="mb-6">
          <span className="caption text-accent-text font-semibold tracking-wide uppercase">
            {mockData.project.tagline}
          </span>
        </div>
        
        <h1 className="heading-1 mb-6">
          {mockData.hero.title}
        </h1>
        
        <p className="body-large mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          {mockData.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => scrollToSection('#products')}
            className="btn-primary btn-hover-scale flex items-center gap-2"
          >
            {mockData.hero.primaryCTA}
            <ArrowRight size={20} />
          </button>
          
          <button 
            onClick={() => scrollToSection('#about')}
            className="btn-secondary btn-hover-scale flex items-center gap-2"
          >
            <Play size={20} />
            {mockData.hero.secondaryCTA}
          </button>
        </div>
      </div>

      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${mockData.hero.backgroundImage})`,
          zIndex: -1
        }}
      />
    </section>
  );
};

export default Hero;