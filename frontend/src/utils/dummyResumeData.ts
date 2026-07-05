import { ResumeData } from '../types/builder';

export const dummyResumeData: ResumeData = {
  sectionOrder: ['summary', 'experience', 'projects', 'skills', 'achievements', 'education'],
  personalInfo: {
    fullName: "Alex Johnson",
    jobTitle: "Senior Software Engineer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    summary: "Results-driven Software Engineer with over 6 years of experience in building scalable web applications. Expert in React, Node.js, and cloud architectures. Proven track record of leading cross-functional teams to deliver high-quality software on time.",
  },
  experience: [
    {
      id: "exp-1",
      jobTitle: "Senior Frontend Engineer",
      company: "TechNova Solutions",
      location: "San Francisco, CA",
      startDate: "Jan 2021",
      endDate: "Present",
      current: true,
      description: "• Spearheaded the migration of a legacy Angular application to Next.js, improving page load times by 40% and SEO rankings.\n• Architected a reusable component library used by 5 internal teams, reducing UI development time by 30%.\n• Mentored 3 junior developers, establishing best practices in code reviews and testing.",
    },
    {
      id: "exp-2",
      jobTitle: "Software Engineer",
      company: "DataSync Inc.",
      location: "Austin, TX",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      current: false,
      description: "• Developed and maintained RESTful APIs using Node.js and Express, serving over 1M daily requests.\n• Integrated third-party payment gateways (Stripe, PayPal) reducing payment processing errors by 15%.\n• Optimized PostgreSQL database queries, reducing average response time from 300ms to 80ms.",
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of Texas at Austin",
      location: "Austin, TX",
      startDate: "Aug 2014",
      endDate: "May 2018",
      description: "Graduated with Honors. Capstone Project: AI-driven predictive analytics model for retail.",
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "StudyWave - EdTech Platform",
      description: "Developed a full-stack learning management system with JWT authentication and Razorpay integration.",
      link: "https://studywave.com",
      techStack: "React, Node.js, MongoDB"
    }
  ],
  skills: [
    { id: "skill-1", name: "JavaScript / TypeScript" },
    { id: "skill-2", name: "React / Next.js" },
    { id: "skill-3", name: "Node.js / Express" },
    { id: "skill-4", name: "PostgreSQL / MongoDB" },
    { id: "skill-5", name: "AWS (EC2, S3, Lambda)" },
    { id: "skill-6", name: "Docker & CI/CD" },
  ],
  achievements: [
    { id: "achieve-1", description: "Solved 500+ problems on LeetCode." },
    { id: "achieve-2", description: "AWS Certified Developer – Associate." }
  ]
};
