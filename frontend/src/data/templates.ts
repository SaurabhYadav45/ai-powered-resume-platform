export type TemplateCategory = 'All' | 'Modern' | 'Traditional' | 'Simple' | 'Creative';

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  image: string;
}

export const templates: Template[] = [
  // --- MODERN (6 Templates) ---
  {
    id: 'modern-1',
    name: 'The Innovator',
    category: 'Modern',
    image: '/templates/modern-image1.png', // Make sure you have a file named modern-1.jpg in public/templates
  },
  {
    id: 'modern-2',
    name: 'Tech Lead',
    category: 'Modern',
    image: '/templates/modern-image2.png',
  },
  {
    id: 'modern-3',
    name: 'Startup Founder',
    category: 'Modern',
    image: '/templates/modern-image3.png',
  },
  {
    id: 'modern-4',
    name: 'Product Manager',
    category: 'Modern',
    image: '/templates/modern-image4.png',
  },
  {
    id: 'modern-5',
    name: 'Full Stack',
    category: 'Modern',
    image: '/templates/modern-image5.png',
  },
  {
    id: 'modern-6',
    name: 'Digital Nomad',
    category: 'Modern',
    image: '/templates/modern-image6.png',
  },

  // --- TRADITIONAL (6 Templates) ---
  {
    id: 'traditional-1',
    name: 'Executive',
    category: 'Traditional',
    image: '/templates/traditional-image.png',
  },
  {
    id: 'traditional-2',
    name: 'Academic CV',
    category: 'Traditional',
    image: '/templates/traditional-image2.png',
  },
  {
    id: 'traditional-3',
    name: 'Legal Counsel',
    category: 'Traditional',
    image: '/templates/traditional-image3.png',
  },
  {
    id: 'traditional-4',
    name: 'Corporate',
    category: 'Traditional',
    image: '/templates/traditional-image4.png',
  },
  {
    id: 'traditional-5',
    name: 'Consultant',
    category: 'Traditional',
    image: '/templates/traditional-image5.png',
  },
  {
    id: 'traditional-6',
    name: 'Banking & Finance',
    category: 'Traditional',
    image: '/templates/traditional-image6.png',
  },

  // --- SIMPLE (6 Templates) ---
  {
    id: 'simple-1',
    name: 'Clean Slate',
    category: 'Simple',
    image: '/templates/simple-image.png',
  },
  {
    id: 'simple-2',
    name: 'The Minimalist',
    category: 'Simple',
    image: '/templates/simple-image2.png',
  },
  {
    id: 'simple-3',
    name: 'Entry Level',
    category: 'Simple',
    image: '/templates/simple-image3.png',
  },
  {
    id: 'simple-4',
    name: 'Internship',
    category: 'Simple',
    image: '/templates/simple-image4.png',
  },
  {
    id: 'simple-5',
    name: 'Academic Lite',
    category: 'Simple',
    image: '/templates/simple-image5.png',
  },
  {
    id: 'simple-6',
    name: 'Just The Facts',
    category: 'Simple',
    image: '/templates/simple-image6.png',
  },

  // --- CREATIVE (6 Templates) ---
  {
    id: 'creative-1',
    name: 'Bold & Bright',
    category: 'Creative',
    image: '/templates/creative-image.png',
  },
  {
    id: 'creative-2',
    name: 'Designer Profile',
    category: 'Creative',
    image: '/templates/creative-image2.png',
  },
  {
    id: 'creative-3',
    name: 'Art Director',
    category: 'Creative',
    image: '/templates/creative-image3.png',
  },
  {
    id: 'creative-4',
    name: 'Marketing Guru',
    category: 'Creative',
    image: '/templates/creative-image4.png',
  },
  {
    id: 'creative-5',
    name: 'Portfolio',
    category: 'Creative',
    image: '/templates/creative-image5.png',
  },
  {
    id: 'creative-6',
    name: 'Social Media',
    category: 'Creative',
    image: '/templates/creative-image6.png',
  }
];