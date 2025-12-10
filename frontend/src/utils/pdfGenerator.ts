import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Template } from '../data/templates';

// Define the structure of our resume data
interface Education {
  institution: string;
  degree: string;
  year: string;
  grade: string;
}

interface Experience {
  company: string;
  role: string;
  date: string;
  descriptionRaw: string;
}

interface Project {
  title: string;
  techStack: string;
  descriptionRaw: string;
  link: string;
  repo: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summaryRaw: string;
  education: Education[];
  skillsRaw: string;
  experience: Experience[];
  projects: Project[];
  achievementsRaw: string;
}

/**
 * Generates a high-quality PDF using PDF-lib instead of html2canvas
 * @param template - The template to use for generating the sample resume
 * @param resumeData - Optional resume data to use instead of sample data
 * @returns A Promise that resolves when the PDF is generated and downloaded
 */
export const generateHighQualityPDF = async (template: Template, resumeData?: ResumeData): Promise<void> => {
  try {
    console.log('Starting PDF generation for template:', template.name);
    
    // Use provided resume data or fall back to sample data
    const data = resumeData || {
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
    
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();
    
    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Add a page with US Letter dimensions (8.5 x 11 inches)
    const page = pdfDoc.addPage([612, 792]); // 8.5 x 11 inches in points (72 points per inch)
    
    // Get page dimensions
    const { width, height } = page.getSize();
    
    // Set up styling constants
    const margin = 50;
    const contentWidth = width - 2 * margin;
    
    // Draw header with name
    page.drawText(data.fullName, {
      x: margin,
      y: height - margin - 20,
      size: 24,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    
    // Draw contact information
    const contactInfo = [];
    if (data.email) contactInfo.push(data.email);
    if (data.phone) contactInfo.push(data.phone);
    if (data.linkedin) contactInfo.push(data.linkedin);
    if (data.github) contactInfo.push(data.github);
    
    const contactText = contactInfo.join(' | ');
    page.drawText(contactText, {
      x: margin,
      y: height - margin - 50,
      size: 10,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    
    // Draw professional summary
    if (data.summaryRaw) {
      const summaryY = height - margin - 90;
      page.drawText('PROFESSIONAL SUMMARY', {
        x: margin,
        y: summaryY,
        size: 12,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
      
      // Draw a line under the section title
      page.drawLine({
        start: { x: margin, y: summaryY - 5 },
        end: { x: width - margin, y: summaryY - 5 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      
      // Split summary into lines and draw them
      const summaryLines = splitTextIntoLines(data.summaryRaw, helveticaFont, 11, contentWidth);
      summaryLines.forEach((line, index) => {
        page.drawText(line, {
          x: margin,
          y: summaryY - 20 - (index * 15),
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      });
    }
    
    // Draw education section
    const educationStartY = height - margin - 180;
    page.drawText('EDUCATION', {
      x: margin,
      y: educationStartY,
      size: 12,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    
    // Draw a line under the section title
    page.drawLine({
      start: { x: margin, y: educationStartY - 5 },
      end: { x: width - margin, y: educationStartY - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    
    // Draw education entries
    data.education.forEach((edu: Education, index: number) => {
      const eduY = educationStartY - 25 - (index * 30);
      
      // Institution and degree
      page.drawText(`${edu.institution}${edu.degree ? ` - ${edu.degree}` : ''}`, {
        x: margin,
        y: eduY,
        size: 11,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
      
      // Year and grade
      page.drawText(`${edu.year}${edu.grade ? ` - ${edu.grade}` : ''}`, {
        x: width - margin - 150,
        y: eduY,
        size: 10,
        font: helveticaFont,
        color: rgb(0.3, 0.3, 0.3),
      });
    });
    
    // Draw skills section
    const skillsY = educationStartY - 25 - (data.education.length * 30) - 30;
    page.drawText('SKILLS', {
      x: margin,
      y: skillsY,
      size: 12,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    
    // Draw a line under the section title
    page.drawLine({
      start: { x: margin, y: skillsY - 5 },
      end: { x: width - margin, y: skillsY - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    
    // Split skills into lines and draw them
    const skillsLines = splitTextIntoLines(data.skillsRaw, helveticaFont, 11, contentWidth);
    skillsLines.forEach((line, index) => {
      page.drawText(line, {
        x: margin,
        y: skillsY - 20 - (index * 15),
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });
    
    // Draw experience section
    const experienceStartY = skillsY - 20 - (skillsLines.length * 15) - 30;
    page.drawText('EXPERIENCE', {
      x: margin,
      y: experienceStartY,
      size: 12,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    
    // Draw a line under the section title
    page.drawLine({
      start: { x: margin, y: experienceStartY - 5 },
      end: { x: width - margin, y: experienceStartY - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    
    // Draw experience entries
    let currentY = experienceStartY - 25;
    data.experience.forEach((exp: Experience, index: number) => {
      // Company and role
      page.drawText(`${exp.role} - ${exp.company}`, {
        x: margin,
        y: currentY,
        size: 11,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
      
      // Date
      page.drawText(exp.date, {
        x: width - margin - 100,
        y: currentY,
        size: 10,
        font: helveticaFont,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      currentY -= 15;
      
      // Description
      const descLines = splitTextIntoLines(exp.descriptionRaw, helveticaFont, 10, contentWidth);
      descLines.forEach((line, idx) => {
        page.drawText(line, {
          x: margin + 10,
          y: currentY - (idx * 12),
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      });
      
      currentY -= (descLines.length * 12) + 10;
    });
    
    // Draw projects section
    const projectsStartY = currentY - 20;
    page.drawText('PROJECTS', {
      x: margin,
      y: projectsStartY,
      size: 12,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    
    // Draw a line under the section title
    page.drawLine({
      start: { x: margin, y: projectsStartY - 5 },
      end: { x: width - margin, y: projectsStartY - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    
    // Draw project entries
    currentY = projectsStartY - 25;
    data.projects.forEach((proj: Project, index: number) => {
      // Project title
      page.drawText(proj.title, {
        x: margin,
        y: currentY,
        size: 11,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });
      
      // Tech stack
      page.drawText(proj.techStack, {
        x: width - margin - 150,
        y: currentY,
        size: 10,
        font: helveticaFont,
        color: rgb(0.3, 0.3, 0.3),
      });
      
      currentY -= 15;
      
      // Description
      const projDescLines = splitTextIntoLines(proj.descriptionRaw, helveticaFont, 10, contentWidth);
      projDescLines.forEach((line, idx) => {
        page.drawText(line, {
          x: margin + 10,
          y: currentY - (idx * 12),
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      });
      
      currentY -= (projDescLines.length * 12) + 10;
    });
    
    // Draw achievements section
    const achievementsStartY = currentY - 20;
    page.drawText('ACHIEVEMENTS', {
      x: margin,
      y: achievementsStartY,
      size: 12,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    
    // Draw a line under the section title
    page.drawLine({
      start: { x: margin, y: achievementsStartY - 5 },
      end: { x: width - margin, y: achievementsStartY - 5 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    
    // Split achievements into lines and draw them
    const achievementsLines = splitTextIntoLines(data.achievementsRaw, helveticaFont, 11, contentWidth);
    achievementsLines.forEach((line, index) => {
      page.drawText(line, {
        x: margin,
        y: achievementsStartY - 20 - (index * 15),
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });
    
    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();
    
    // Create a Blob and download the PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.fullName || 'resume'}_Resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('PDF generation completed successfully');
  } catch (error) {
    console.error('Error in PDF generation:', error);
    throw error;
  }
};

/**
 * Helper function to split text into lines that fit within a given width
 */
const splitTextIntoLines = (text: string, font: any, size: number, maxWidth: number): string[] => {
  try {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const textWidth = font.widthOfTextAtSize(testLine, size);
      
      if (textWidth > maxWidth) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          // Handle case where a single word is longer than maxWidth
          lines.push(word);
        }
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  } catch (error) {
    console.error('Error in splitTextIntoLines:', error);
    return [text]; // Return the original text as a single line if there's an error
  }
};