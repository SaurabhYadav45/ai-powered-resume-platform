import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Template } from '../data/templates';
// Import all template components
import { ModernTemplate } from '../components/templates/ModernTemplate';
import { SimpleTemplate } from '../components/templates/SimpleTemplate';
import { CreativeTemplate } from '../components/templates/CreativeTemplate';
import { TraditionalTemplate } from '../components/templates/TraditionalTemplate';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
// Import our new high-quality PDF generator
import { generateHighQualityPDF } from './pdfGenerator';

/**
 * Sample resume data for generating previews
 */
export const sampleResumeData = {
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "(555) 123-4567",
  github: "https://github.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
  summaryRaw: "Results-driven software engineer with 5 years of experience in developing scalable web applications. Passionate about creating efficient, maintainable code and mentoring junior developers.",
  education: [
    {
      institution: "Stanford University",
      degree: "M.S. Computer Science",
      year: "2016-2018",
      grade: "3.8 GPA"
    },
    {
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      year: "2012-2016",
      grade: "3.7 GPA"
    }
  ],
  skillsRaw: "JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker, Kubernetes, GraphQL",
  experience: [
    {
      company: "Tech Innovations Inc.",
      role: "Senior Software Engineer",
      date: "2020-Present",
      descriptionRaw: "• Led a team of 5 developers in building a cloud-based analytics platform\n• Implemented microservices architecture reducing latency by 40%\n• Mentored junior developers and conducted code reviews"
    },
    {
      company: "Digital Solutions LLC",
      role: "Software Engineer",
      date: "2018-2020",
      descriptionRaw: "• Developed RESTful APIs using Node.js and Express\n• Collaborated with UX designers to implement responsive UI components\n• Optimized database queries improving performance by 30%"
    }
  ],
  projects: [
    {
      title: "E-commerce Platform",
      techStack: "React, Node.js, MongoDB, Stripe",
      descriptionRaw: "• Built a full-stack e-commerce solution with real-time inventory\n• Integrated secure payment processing with Stripe API\n• Implemented user authentication and authorization",
      link: "https://ecommerce.example.com",
      repo: "https://github.com/alexjohnson/ecommerce"
    },
    {
      title: "Task Management App",
      techStack: "React Native, Firebase, Redux",
      descriptionRaw: "• Developed a cross-platform mobile application for task management\n• Implemented real-time synchronization using Firebase\n• Designed intuitive UI with drag-and-drop functionality",
      link: "https://taskapp.example.com",
      repo: "https://github.com/alexjohnson/taskapp"
    }
  ],
  achievementsRaw: "• Published 3 technical articles on Medium with over 10K total views\n• Winner of Hackathon 2021 - Best Use of AI Technology\n• Google Cloud Certified Professional Developer"
};

/**
 * Gets the appropriate template component based on template ID
 * @param templateId - The ID of the template
 * @returns The template component
 */
const getTemplateComponent = (templateId: string) => {
  if (templateId.startsWith('modern')) {
    return ModernTemplate;
  }
  if (templateId.startsWith('simple')) {
    return SimpleTemplate;
  }
  if (templateId.startsWith('creative')) {
    return CreativeTemplate;
  }
  if (templateId.startsWith('traditional')) {
    return TraditionalTemplate;
  }
  // Default to modern template
  return ModernTemplate;
};

/**
 * Checks if we're in a browser environment
 * @returns boolean indicating if we're in a browser
 */
const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Renders a template component to a DOM element
 * @param template - The template to render
 * @returns A promise that resolves to the rendered DOM element
 */
const renderTemplateToDOM = async (template: Template): Promise<HTMLDivElement> => {
  if (!isBrowser()) {
    throw new Error('This function can only be run in a browser environment');
  }
  
  return new Promise((resolve) => {
    // Create a temporary DOM element
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '210mm'; // A4 width
    tempDiv.style.minHeight = '297mm'; // A4 height
    tempDiv.style.backgroundColor = 'white'; // Ensure white background
    tempDiv.style.padding = '0';
    tempDiv.style.margin = '0';
    document.body.appendChild(tempDiv);
    
    // Get the appropriate template component
    const TemplateComponent = getTemplateComponent(template.id);
    
    // Render the component
    const root = createRoot(tempDiv);
    root.render(createElement(TemplateComponent, { data: sampleResumeData }));
    
    // Wait a bit for rendering to complete
    setTimeout(() => {
      resolve(tempDiv);
    }, 150); // Increased timeout to ensure proper rendering
  });
};

/**
 * Generates a sample resume PDF using the specified template
 * @param template - The template to use for generating the sample resume
 * @returns A Promise that resolves when the PDF is generated and downloaded
 */
// The old implementation using html2canvas and jsPDF has been replaced with PDF-lib
// for better quality PDF generation. See pdfGenerator.ts for the new implementation.

/**
 * Downloads a sample resume PDF using the specified template
 * @param template - The template to use for the sample resume
 */
export const downloadSampleResume = async (template: Template): Promise<void> => {
  if (!isBrowser()) {
    throw new Error('This function can only be run in a browser environment');
  }
  
  try {
    // Use our new high-quality PDF generator instead of the old one
    await generateHighQualityPDF(template);
  } catch (error) {
    console.error('Error downloading sample resume:', error);
    alert('Failed to download sample resume. Please try again.');
  }
};