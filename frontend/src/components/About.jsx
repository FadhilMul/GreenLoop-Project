import React from 'react';
import { mockData } from './mock';

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="grid-2">
          <div>
            <h2 className="heading-2 mb-6">
              About {mockData.project.name}
            </h2>
            <p className="body-large mb-4">
              {mockData.project.description}
            </p>
            <p className="body-medium mb-6" style={{ color: 'var(--text-secondary)' }}>
              {mockData.project.mission}
            </p>
            
            {/* Community Highlights */}
            <div className="space-y-4">
              <h3 className="heading-3 mb-4">What We Do</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-3" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                  <p className="body-medium">Develop eco-friendly products that make sustainability accessible to urban communities</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-3" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                  <p className="body-medium">Transform waste materials into valuable, functional items through upcycling</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-3" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                  <p className="body-medium">Promote urban farming solutions that bring nature back to city spaces</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-3" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                  <p className="body-medium">Build a community of changemakers passionate about environmental impact</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <img 
              src={mockData.community.image}
              alt="GreenLoop Community"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <p className="caption mt-4">
              Our community working together to create sustainable urban solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;