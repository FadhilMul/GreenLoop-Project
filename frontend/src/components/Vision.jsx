import React from 'react';
import { Leaf, Recycle, Trees, Users } from 'lucide-react';
import { mockData } from './mock';

const Vision = () => {
  const iconMap = {
    'Leaf': Leaf,
    'Recycle': Recycle,
    'Trees': Trees,
    'Users': Users
  };

  return (
    <section id="vision" className="section-padding">
      <div className="container">
        <div className="grid-2 mb-16">
          <div>
            <h2 className="heading-2 mb-6">
              {mockData.vision.title}
            </h2>
            <p className="body-large mb-6">
              {mockData.vision.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary btn-hover-scale">
                Join Our Mission
              </button>
              <button className="btn-secondary btn-hover-scale">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <img 
              src={mockData.vision.image}
              alt="Sustainable Urban Future"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Vision Goals Grid */}
        <div className="ai-grid">
          {mockData.vision.goals.map((goal, index) => {
            const IconComponent = iconMap[goal.icon];
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm card-hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  {IconComponent && (
                    <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--accent-wash)' }}>
                      <IconComponent size={24} style={{ color: 'var(--accent-text)' }} />
                    </div>
                  )}
                  <h3 className="heading-3">
                    {goal.title}
                  </h3>
                </div>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {goal.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Impact Vision */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="heading-2 mb-8">
              The Future We're Building
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--accent-wash)' }}>
                  <span className="text-2xl font-bold" style={{ color: 'var(--accent-text)' }}>
                    2030
                  </span>
                </div>
                <h4 className="heading-3 mb-2">Carbon Neutral Cities</h4>
                <p className="body-small">Supporting local food systems that reduce transport emissions by 40%</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--accent-wash)' }}>
                  <span className="text-2xl font-bold" style={{ color: 'var(--accent-text)' }}>
                    50%
                  </span>
                </div>
                <h4 className="heading-3 mb-2">Waste Reduction</h4>
                <p className="body-small">Diverting textile waste from landfills through creative upcycling</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--accent-wash)' }}>
                  <span className="text-2xl font-bold" style={{ color: 'var(--accent-text)' }}>
                    1K+
                  </span>
                </div>
                <h4 className="heading-3 mb-2">Green Spaces</h4>
                <p className="body-small">New urban gardens and green spaces created by our community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;