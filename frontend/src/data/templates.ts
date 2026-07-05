export type TemplateCategory = 'All' | 'Modern' | 'Simple' | 'Creative';

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  image: string;
}

export const templates: Template[] = [
  {
    id: 'modern-1',
    name: 'The Innovator',
    category: 'Modern',
    image: '/templates/modern-image.png', 
  },
  {
    id: 'modern-2',
    name: 'Tech Lead',
    category: 'Modern',
    image: '/templates/modern-image2.png', // Reusing placeholder
  },
  {
    id: 'simple-1',
    name: 'Clean Slate',
    category: 'Simple',
    image: '/templates/simple-image1.png',
  },
  {
    id: 'simple-2',
    name: 'Centered Executive',
    category: 'Simple',
    image: '/templates/simple-image2.png', // Reusing the simple image placeholder
  },
  {
    id: 'creative-1',
    name: 'Bold & Bright',
    category: 'Creative',
    image: '/templates/creative-image.png',
  }
];