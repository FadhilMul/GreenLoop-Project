// Mock data for GreenLoop Project landing page

export const mockData = {
  // Project Information
  project: {
    name: "GreenLoop Project",
    tagline: "Cultivating Sustainable Cities",
    mission: "To promote a sustainable lifestyle through urban farming and upcycling, by providing environmentally friendly products that are easy to use, affordable, and have a positive impact on the city.",
    description: "We are a passionate student community dedicated to transforming urban spaces through innovative eco-friendly solutions. Our mission is to make sustainability accessible, practical, and impactful for city dwellers."
  },

  // Hero Section
  hero: {
    title: "Growing Green Cities, One Seed at a Time",
    subtitle: "Join our community in creating sustainable urban spaces through innovative eco-products and urban farming solutions.",
    primaryCTA: "Explore Our Products",
    secondaryCTA: "Join Our Community",
    backgroundImage: "https://images.unsplash.com/photo-1527690499469-ef2eff9c6735"
  },

  // Products
  products: [
    {
      id: 1,
      name: "Plantable Seed Paper",
      description: "Transform any space into a green oasis with our biodegradable seed paper. Simply plant it in soil, water, and watch it grow into beautiful herbs, flowers, or vegetables.",
      features: [
        "100% biodegradable and eco-friendly",
        "Contains organic seeds for herbs and flowers",
        "Easy to use - just plant and water",
        "Perfect for urban balconies and small spaces"
      ],
      image: "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg",
      category: "Urban Farming"
    },
    {
      id: 2,
      name: "Upcycled Eco-Pouches",
      description: "Stylish and durable pouches made from repurposed clothing materials. Each pouch gives new life to textile waste while providing practical storage solutions.",
      features: [
        "Made from 100% upcycled textile materials",
        "Durable and water-resistant",
        "Unique designs - no two pouches are identical",
        "Supports circular economy principles"
      ],
      image: "https://images.unsplash.com/photo-1594058573823-d8edf1ad3380",
      category: "Upcycling"
    }
  ],

  // Community Stats
  stats: [
    { number: "500+", label: "Community Members" },
    { number: "1,200+", label: "Seeds Planted" },
    { number: "300+", label: "Clothes Upcycled" },
    { number: "50+", label: "Urban Gardens Created" }
  ],

  // Vision Section
  vision: {
    title: "Our Vision for Tomorrow",
    description: "We envision cities where sustainability is woven into the fabric of daily life. Where every rooftop garden contributes to cleaner air, where textile waste becomes beautiful useful items, and where communities come together to create positive environmental impact.",
    goals: [
      {
        title: "Carbon Neutral Communities",
        description: "Supporting local food production to reduce transportation emissions",
        icon: "Leaf"
      },
      {
        title: "Waste Reduction",
        description: "Transforming textile waste into valuable products through upcycling",
        icon: "Recycle"
      },
      {
        title: "Urban Green Spaces",
        description: "Creating more green spaces in urban environments for biodiversity",
        icon: "Trees"
      },
      {
        title: "Community Engagement",
        description: "Building awareness and action around sustainable living practices",
        icon: "Users"
      }
    ],
    image: "https://images.unsplash.com/photo-1556983852-43bf21186b2a"
  },

  // Team/Community
  community: {
    title: "Meet Our Community",
    description: "We are students, dreamers, and changemakers united by our passion for sustainability and urban innovation.",
    image: "https://images.unsplash.com/photo-1542800952-e5471ed41326"
  },

  // Contact Form
  contact: {
    title: "Let's Collaborate",
    subtitle: "Ready to join the green revolution? Get in touch to learn more about our products, partnership opportunities, or how you can contribute to sustainable urban development.",
    formFields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "organization", label: "Organization/Institution", type: "text", required: false },
      { name: "interest", label: "I'm interested in", type: "select", options: [
        "Learning about products",
        "Partnership opportunities", 
        "Joining the community",
        "Research collaboration",
        "Bulk orders",
        "Other"
      ]},
      { name: "message", label: "Message", type: "textarea", required: true }
    ]
  },

  // Social Media (placeholders)
  socialMedia: [
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "LinkedIn", icon: "Linkedin", url: "#" },
    { name: "YouTube", icon: "Youtube", url: "#" }
  ],

  // Navigation
  navigation: [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "#contact" }
  ]
};