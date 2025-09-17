import React from 'react';
import { ArrowRight, Leaf, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockData } from './mock';

const Products = () => {
  const navigate = useNavigate();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section id="products" className="section-padding bg-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Our Eco-Products
          </h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Innovative solutions that transform how we think about urban sustainability.
          </p>
        </div>

        <div className="ai-grid">
          {mockData.products.map((product) => (
            <div key={product.id} className="product-card card-hover-lift">
              <div className="mb-4">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                {product.category === 'Urban Farming' ? 
                  <Leaf size={20} style={{ color: 'var(--accent-text)' }} /> :
                  <Recycle size={20} style={{ color: 'var(--accent-text)' }} />
                }
                <span className="body-small font-semibold text-accent-text">
                  {product.category}
                </span>
              </div>

              <h3 className="heading-3 mb-3">
                {product.name}
              </h3>
              
              <p className="body-medium mb-6" style={{ color: 'var(--text-secondary)' }}>
                {product.description}
              </p>

              <button 
                onClick={() => handleProductClick(product.id)}
                className="btn-primary w-full btn-hover-scale flex items-center justify-center gap-2"
              >
                Learn More
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-sm">
            <h3 className="heading-3 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="body-medium mb-6" style={{ color: 'var(--text-secondary)' }}>
              Join our community of eco-warriors and start creating positive environmental impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('#contact')}
                className="btn-primary btn-hover-scale"
              >
                Get in Touch
              </button>
              <button 
                onClick={() => scrollToSection('#vision')}
                className="btn-secondary btn-hover-scale"
              >
                Our Vision
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;