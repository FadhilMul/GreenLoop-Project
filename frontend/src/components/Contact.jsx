import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Instagram, Facebook, Twitter, Linkedin, Youtube, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { mockData } from './mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            organization: '',
            interest: '',
            message: ''
          });
        }, 5000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        setError(errorMessages.join('. '));
      } else {
        setError('An error occurred while sending your message. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const socialIconMap = {
    Instagram,
    Facebook,
    Twitter,
    Linkedin,
    Youtube
  };

  return (
    <section id="contact" className="section-padding bg-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            {mockData.contact.title}
          </h2>
          <p className="body-large max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {mockData.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {!isSubmitted ? (
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                    <p className="body-small text-red-800">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block body-medium font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block body-medium font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block body-medium font-semibold mb-2">
                    Organization/Institution
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your organization (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block body-medium font-semibold mb-2">
                    I'm interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select an option</option>
                    <option value="Learning about products">Learning about products</option>
                    <option value="Partnership opportunities">Partnership opportunities</option>
                    <option value="Joining the community">Joining the community</option>
                    <option value="Research collaboration">Research collaboration</option>
                    <option value="Bulk orders">Bulk orders</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block body-medium font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell us about your interest in our project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full btn-hover-scale flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <CheckCircle size={64} className="mx-auto" style={{ color: 'var(--accent-primary)' }} />
                </div>
                <h3 className="heading-3 mb-4">Message Sent!</h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for your interest in GreenLoop Project. We'll get back to you soon!
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-3 mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="mt-1" style={{ color: 'var(--accent-text)' }} />
                  <div>
                    <p className="body-medium font-semibold">Location</p>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      Student Campus<br />
                      Urban Development Hub<br />
                      City, Country
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={20} className="mt-1" style={{ color: 'var(--accent-text)' }} />
                  <div>
                    <p className="body-medium font-semibold">Email</p>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      hello@greenloopproject.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="mt-1" style={{ color: 'var(--accent-text)' }} />
                  <div>
                    <p className="body-medium font-semibold">Phone</p>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-3 mb-6">Follow Our Journey</h3>
              <div className="flex space-x-4">
                {mockData.socialMedia.map((social) => {
                  const IconComponent = socialIconMap[social.icon];
                  return (
                    <button
                      key={social.name}
                      className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                      title={social.name}
                    >
                      {IconComponent && <IconComponent size={24} style={{ color: 'var(--text-secondary)' }} />}
                    </button>
                  );
                })}
              </div>
              <p className="body-small mt-4" style={{ color: 'var(--text-muted)' }}>
                Stay updated with our latest products, community events, and sustainability tips.
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-3 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="body-small font-semibold">Response Time:</span>
                  <span className="body-small" style={{ color: 'var(--text-secondary)' }}>Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-small font-semibold">Best Time to Contact:</span>
                  <span className="body-small" style={{ color: 'var(--text-secondary)' }}>9 AM - 6 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-small font-semibold">Languages:</span>
                  <span className="body-small" style={{ color: 'var(--text-secondary)' }}>English, Local</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;