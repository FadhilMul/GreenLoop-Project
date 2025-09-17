import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Share2, Mail, Leaf, Recycle, CheckCircle } from 'lucide-react';
import { mockData } from './mock';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const product = mockData.products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-2 mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'videos', label: 'Video Gallery' },
    { id: 'howto', label: 'How-to Guide' }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const handleContact = () => {
    navigate('/#contact');
  };

  // Mock data for galleries and guides
  const photoGallery = [
    { id: 1, url: product.image, title: `${product.name} in use`, type: 'product' },
    { id: 2, url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09", title: "Community workshop", type: 'event' },
    { id: 3, url: "https://images.unsplash.com/photo-1515344905723-babc01aac23d", title: "Before and after", type: 'process' },
    { id: 4, url: "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg", title: "Results showcase", type: 'result' }
  ];

  const videoGallery = [
    { id: 1, title: `How to use ${product.name}`, thumbnail: product.image, duration: "3:24", type: 'tutorial' },
    { id: 2, title: "Community project showcase", thumbnail: "https://images.unsplash.com/photo-1542800952-e5471ed41326", duration: "5:12", type: 'showcase' },
    { id: 3, title: "Making process", thumbnail: "https://images.unsplash.com/photo-1594058573823-d8edf1ad3380", duration: "4:35", type: 'process' }
  ];

  const howToSteps = product.id === 1 ? [
    { step: 1, title: "Prepare the soil", description: "Choose a spot with good drainage and prepare the soil by loosening it to about 2-3 inches deep.", image: "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg" },
    { step: 2, title: "Plant the seed paper", description: "Place the seed paper on the soil surface. You can tear it into smaller pieces if needed.", image: product.image },
    { step: 3, title: "Cover lightly", description: "Sprinkle a thin layer of soil over the seed paper, just enough to barely cover it.", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" },
    { step: 4, title: "Water gently", description: "Water the area gently but thoroughly. Keep the soil moist but not waterlogged.", image: "https://images.unsplash.com/photo-1515344905723-babc01aac23d" },
    { step: 5, title: "Wait and watch", description: "Seeds typically germinate within 1-3 weeks. Continue watering regularly and watch your plants grow!", image: "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg" }
  ] : [
    { step: 1, title: "Choose your items", description: "Select clean, dry items you want to store. The pouch is perfect for small accessories, stationery, or eco-friendly products.", image: product.image },
    { step: 2, title: "Organize efficiently", description: "The upcycled design makes each pouch unique. Use the natural compartments and textures to organize different types of items.", image: "https://images.unsplash.com/photo-1594058573823-d8edf1ad3380" },
    { step: 3, title: "Care and maintenance", description: "Clean with a damp cloth when needed. The upcycled materials are durable but should be kept away from excessive moisture.", image: "https://images.unsplash.com/photo-1542800952-e5471ed41326" },
    { step: 4, title: "Share the story", description: "Each pouch represents textile waste diverted from landfills. Share the sustainability story with others!", image: "https://images.unsplash.com/photo-1531270165448-73e7ee678f2a" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="text-sm hover:text-green-600 transition-colors flex items-center gap-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
            <div className="flex items-center gap-2">
              {product.category === 'Urban Farming' ? 
                <Leaf size={20} style={{ color: 'var(--accent-text)' }} /> :
                <Recycle size={20} style={{ color: 'var(--accent-text)' }} />
              }
              <span className="body-small font-semibold text-accent-text">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding bg-section mt-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-1 mb-6">{product.name}</h1>
              <p className="body-large mb-6">{product.description}</p>
              <div className="flex gap-6">
                <button 
                  onClick={handleContact}
                  className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Mail size={20} />
                  Contact Us
                </button>
                <button 
                  onClick={handleShare}
                  className="text-gray-600 hover:text-gray-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Share2 size={20} />
                  Share Product
                </button>
              </div>
            </div>
            <div>
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding">
        <div className="container">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="heading-2 mb-6">Product Benefits</h2>
                  <div className="space-y-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle size={20} className="mt-1 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                        <span className="body-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="heading-2 mb-6">Specifications</h2>
                  <div className="space-y-3">
                    {product.id === 1 ? (
                      <>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Paper Type:</span>
                          <span className="body-medium">100% Recycled</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Seed Variety:</span>
                          <span className="body-medium">Herbs & Flowers</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Germination:</span>
                          <span className="body-medium">1-3 weeks</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Best Season:</span>
                          <span className="body-medium">Spring/Summer</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Material:</span>
                          <span className="body-medium">Upcycled Textiles</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Size:</span>
                          <span className="body-medium">Various (15-25cm)</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Care:</span>
                          <span className="body-medium">Spot clean only</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="body-medium font-semibold">Durability:</span>
                          <span className="body-medium">2+ years</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photo Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="heading-2 mb-8 text-center">Photo Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photoGallery.map((photo) => (
                  <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow-sm card-hover-lift">
                    <img 
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="body-medium font-semibold mb-2">{photo.title}</h3>
                      <span className="caption bg-gray-100 px-2 py-1 rounded">
                        {photo.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Gallery Tab */}
          {activeTab === 'videos' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="heading-2 mb-8 text-center">Video Gallery</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoGallery.map((video) => (
                  <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-sm card-hover-lift">
                    <div className="relative">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <Play size={48} className="text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="body-medium font-semibold mb-2">{video.title}</h3>
                      <span className="caption bg-gray-100 px-2 py-1 rounded">
                        {video.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How-to Guide Tab */}
          {activeTab === 'howto' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-2 mb-8 text-center">How-to Guide</h2>
              <div className="space-y-8">
                {howToSteps.map((step) => (
                  <div key={step.step} className="grid md:grid-cols-2 gap-6 items-center">
                    <div className={step.step % 2 === 0 ? 'md:order-2' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" 
                             style={{ backgroundColor: 'var(--accent-primary)' }}>
                          {step.step}
                        </div>
                        <h3 className="heading-3">{step.title}</h3>
                      </div>
                      <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                        {step.description}
                      </p>
                    </div>
                    <div className={step.step % 2 === 0 ? 'md:order-1' : ''}>
                      <img 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;