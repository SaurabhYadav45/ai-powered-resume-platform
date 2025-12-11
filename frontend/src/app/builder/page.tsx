"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Loader, Wand2, Printer, Plus, Trash2, Download, Settings, Type, Palette } from 'lucide-react';
import axios from 'axios';
import { ModernTemplate, ResumeData } from '../../components/templates/ModernTemplate';
import { SimpleTemplate } from '../../components/templates/SimpleTemplate';
import { CreativeTemplate } from '../../components/templates/CreativeTemplate';
import { TraditionalTemplate } from '../../components/templates/TraditionalTemplate';
import { generateHighQualityPDF } from '../../utils/pdfGenerator';

type ResumeFormData = ResumeData;

export default function ResumeBuilder() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern-1');
  const resumeRef = useRef<HTMLDivElement>(null);

  // --- Resume Settings State ---
  const [themeColor, setThemeColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Roboto'); // Default to Roboto

  // Font family options
  const fontOptions = [
    'Roboto', 'Lato', 'Montserrat', 'Open Sans', 'Raleway', 
    'Caladea', 'Lora', 'Roboto Slab', 'Playfair Display', 'Merriweather'
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const templateParam = params.get('template');
      if (templateParam) {
        setSelectedTemplate(templateParam);
      }
    }
  }, []);

  const { register, control, handleSubmit, watch, reset } = useForm<ResumeFormData>({
    defaultValues: {
      fullName: "Saurabh Singh Yadav",
      email: "saurabhkry88@gmail.com",
      phone: "9602959967",
      github: "https://github.com/SaurabhYadav45/",
      linkedin: "https://www.linkedin.com/in/saurabhyadav45/",
      summaryRaw: "Full-Stack Developer with strong MERN Stack and Generative AI experience, passionate about building scalable full-stack applications",
      skillsRaw: "C++ (DSA), JavaScript, Typescript, Python, HTML, CSS, React.js, Next.js, Redux, Tailwind CSS, Node.js, Express.js, Mongoose, MongoDB, SQL, MySQL, Git, Github, Postman, Cloudinary, Render, Vercel, OpenAI/Gemini API, Data Structure & Algorithm, OperatingSystem, Database Management System, Object-Oriented Programming",
      achievementsRaw: "Solved 800+ DSA problems on Leetcode, Ranked in the top 15% globally with a contest rating of 1680 on LeetCode.",
      education: [{ 
        institution: "Dr. Rizvi Learner's Academy, Jaunpur", 
        degree: "Class 12th", 
        year: "2019-2021", 
        grade: "75%" 
      }],
      experience: [{ 
        company: "TechTadka", 
        role: "Full-Stack Developer", 
        date: "01/05/2025 to 01/10/2025", 
        descriptionRaw: "I was working as a Full stack developer and built Scalable and Robust Full-stack Application." 
      }],
      projects: [{ 
        title: "StudyWave - An Edtech Learning Platform", 
        techStack: "React, Tailwind, Nodejs, expressjs, mongodb, razorpay, jwt, Multer, mongoose", 
        descriptionRaw: "Developed a full-stack EdTech platform with distinct portals, allowing instructors to create, sell, and track courses, while providing students a seamless interface for purchasing and learning.JWT and email-based OTP verification; integrated Razorpay for seamless payment processing and Cloudinary/Multer for robust media management.", 
        link: "https://studywave-frontend.onrender.com/", 
        repo: "" }]
    }
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experience" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: "projects" });

  const liveData = watch();

  const onSubmit: SubmitHandler<ResumeFormData> = async (data) => {
    setIsLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
      const response = await axios.post(`${API_BASE_URL}/resume/build`, data);
      
      const polished = response.data.polishedContent;

      const updatedFormData: ResumeFormData = {
        fullName: polished.fullName,
        email: polished.email,
        phone: polished.phone,
        github: polished.github,
        linkedin: polished.linkedin,
        summaryRaw: polished.professionalSummary,
        skillsRaw: Array.isArray(polished.skills) ? polished.skills.join(', ') : polished.skills,
        achievementsRaw: Array.isArray(polished.achievements) ? polished.achievements.join('\n') : polished.achievements || "",
        education: polished.education,
        experience: polished.experience.map((exp: any) => ({
          company: exp.company,
          role: exp.role,
          date: exp.date,
          descriptionRaw: Array.isArray(exp.descriptionPoints) 
            ? exp.descriptionPoints.map((p: string) => `• ${p}`).join('\n') 
            : exp.descriptionPoints
        })),
        projects: polished.projects.map((proj: any) => ({
          title: proj.title,
          techStack: proj.techStack,
          link: proj.link || data.projects.find(p => p.title === proj.title)?.link || "", 
          repo: proj.repo || data.projects.find(p => p.title === proj.title)?.repo || "", 
          descriptionRaw: Array.isArray(proj.descriptionPoints) 
            ? proj.descriptionPoints.map((p: string) => `• ${p}`).join('\n') 
            : proj.descriptionPoints
        })),
      };

      reset(updatedFormData);
      
    } catch (error) {
      console.error("Error building resume:", error);
      alert("Failed to connect to backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      const printButton = document.querySelector('.print-button');
      if (printButton) {
        printButton.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Generating...';
      }

      let category: 'Modern' | 'Traditional' | 'Simple' | 'Creative' = 'Modern';
      if (selectedTemplate.startsWith('traditional')) {
        category = 'Traditional';
      } else if (selectedTemplate.startsWith('simple')) {
        category = 'Simple';
      } else if (selectedTemplate.startsWith('creative')) {
        category = 'Creative';
      }

      const mockTemplate = {
        id: selectedTemplate,
        name: selectedTemplate.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        category: category,
        image: ''
      };

      await generateHighQualityPDF(mockTemplate, liveData);

      if (printButton) {
        printButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Download PDF';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      
      const printButton = document.querySelector('.print-button');
      if (printButton) {
        printButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Download PDF';
      }
    }
  };

  const renderTemplate = () => {
    // Use a default font size since we're removing the font size functionality
    const defaultFontSize = 16;
    
    const styleProps = { themeColor, fontFamily, fontSize: defaultFontSize };
    
    // @ts-ignore 
    if (selectedTemplate.startsWith('creative')) return <CreativeTemplate data={liveData} {...styleProps} />;
    // @ts-ignore
    if (selectedTemplate.startsWith('simple')) return <SimpleTemplate data={liveData} {...styleProps} />;
    // @ts-ignore
    if (selectedTemplate.startsWith('traditional')) return <TraditionalTemplate data={liveData} {...styleProps} />;
    
    // @ts-ignore
    return <ModernTemplate data={liveData} {...styleProps} />;
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <header className="text-center mb-10 print:hidden pt-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">AI Resume Builder</h1>
        <p className="mt-2 text-gray-600">Editing Template: <span className="font-bold text-indigo-600 uppercase">{selectedTemplate}</span></p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 print:block">
        
        {/* --- LEFT: INPUT FORM --- */}
        <div className="glass-card-purple p-6 rounded-2xl shadow-sm border border-gray-200 h-fit print:hidden max-h-[85vh] overflow-y-auto sticky top-4 custom-scrollbar">
          
             
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Resume Settings Section */}
                <div className="space-y-4 p-4 content-glow-purple rounded-lg border-2 border-gray-300">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Resume Settings
                  </h3>
                  
                  {/* Theme Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Theme Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="w-10 h-10 border-0 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">{themeColor}</span>
                    </div>
                  </div>
                  
                  {/* Font Family */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      Font Family
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="input-field"
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Personal Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input {...register("fullName")} placeholder="Full Name" className="input-field" required />
                    <input {...register("email")} placeholder="Email" className="input-field" required />
                    <input {...register("phone")} placeholder="Phone Number" className="input-field" />
                    <input {...register("linkedin")} placeholder="LinkedIn URL" className="input-field" />
                    <input {...register("github")} placeholder="GitHub URL" className="input-field md:col-span-2" />
                  </div>
                </div>

                {/* Overview */}
                <div>
                   <h3 className="font-semibold text-gray-700 mb-2">Overview</h3>
                   <textarea {...register("summaryRaw")} placeholder="Brief professional summary..." className="input-field h-20" />
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Education</h3>
                    <button type="button" onClick={() => appendEdu({ institution: "", degree: "", year: "", grade: "" })} className="text-indigo-600 text-sm font-bold flex items-center"><Plus className="w-4 h-4 mr-1"/> Add</button>
                  </div>
                  {eduFields.map((field, index) => (
                    <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input {...register(`education.${index}.institution`)} placeholder="School/College" className="input-field" />
                        <input {...register(`education.${index}.degree`)} placeholder="Degree" className="input-field" />
                        <input {...register(`education.${index}.year`)} placeholder="Year" className="input-field" />
                        <input {...register(`education.${index}.grade`)} placeholder="Grade" className="input-field" />
                      </div>
                      <button type="button" onClick={() => removeEdu(index)} className="text-red-500 text-xs flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Remove</button>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Projects</h3>
                    <button type="button" onClick={() => appendProj({ title: "", techStack: "", descriptionRaw: "", link: "", repo: "" })} className="text-indigo-600 text-sm font-bold flex items-center"><Plus className="w-4 h-4 mr-1"/> Add</button>
                  </div>
                  {projFields.map((field, index) => (
                    <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                      <input {...register(`projects.${index}.title`)} placeholder="Project Title" className="input-field" />
                      <input {...register(`projects.${index}.techStack`)} placeholder="Tech Stack Used" className="input-field" />
                      <div className="grid grid-cols-2 gap-2">
                        <input {...register(`projects.${index}.link`)} placeholder="Live Demo Link" className="input-field" />
                        <input {...register(`projects.${index}.repo`)} placeholder="GitHub Repo Link" className="input-field" />
                      </div>
                      <textarea {...register(`projects.${index}.descriptionRaw`)} placeholder="Project Description..." className="input-field h-32" />
                      <button type="button" onClick={() => removeProj(index)} className="text-red-500 text-xs flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Remove</button>
                    </div>
                  ))}
                </div>

                {/* Experience */}
                 <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Experience</h3>
                    <button type="button" onClick={() => appendExp({ company: "", role: "", date: "", descriptionRaw: "" })} className="text-indigo-600 text-sm font-bold flex items-center"><Plus className="w-4 h-4 mr-1"/> Add</button>
                  </div>
                  {expFields.map((field, index) => (
                    <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                      <input {...register(`experience.${index}.company`)} placeholder="Company Name" className="input-field" />
                      <input {...register(`experience.${index}.role`)} placeholder="Role" className="input-field" />
                      <input {...register(`experience.${index}.date`)} placeholder="Duration" className="input-field" />
                      <textarea {...register(`experience.${index}.descriptionRaw`)} placeholder="Responsibilities..." className="input-field h-32" />
                      <button type="button" onClick={() => removeExp(index)} className="text-red-500 text-xs flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Remove</button>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Technical Skills</h3>
                  <textarea {...register("skillsRaw")} placeholder="Java, React, Node.js, SQL..." className="input-field h-16" />
                </div>

                {/* Achievements */}
                <div>
                   <h3 className="font-semibold text-gray-700 mb-2">Achievements</h3>
                   <textarea {...register("achievementsRaw")} placeholder="Achievements..." className="input-field h-20" />
                </div>

                 <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-3 px-6 border-transparent rounded-xl shadow-sm text-lg font-semibold  bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 bg-gradient-to-r from-indigo-500 to-purple-500 text-white cursor-pointer">
                   {isLoading ? <Loader className="animate-spin mr-2"/> : <Wand2 className="mr-2"/>} 
                   AI Polish
                 </button>
             </form>
             {/* --- END Resume Settings --- */}
        </div>

        {/* --- RIGHT: DYNAMIC LIVE PREVIEW --- */}
        <div className="glass-card-purple p-4 rounded-2xl flex flex-col items-center print:bg-white print:p-0 print:block">
          <div className="w-full flex justify-between items-center mb-4 print:hidden">
            <h2 className="text-xl font-semibold text-gray-700">Live Preview</h2>
            <div className="flex gap-2">
              <button 
                onClick={handlePrint} 
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center shadow-sm"
              >
                <Printer className="w-4 h-4 mr-2"/> Print
              </button>
              <button 
                onClick={handleDownloadPDF} 
                className="print-button bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center shadow-sm"
              >
                <Download className="w-4 h-4 mr-2"/> Download PDF
              </button>
            </div>
          </div>

          <div className="overflow-auto w-full flex justify-center print:overflow-visible print:w-full print:block print:m-0">
            <div 
                ref={resumeRef} 
                style={{
                    color: themeColor,
                }}
                className="print-content shadow-2xl w-[210mm] min-h-[297mm] origin-top scale-75 md:scale-90 lg:scale-100 transition-transform print:scale-100 print:shadow-none print:m-0 print:w-full bg-white"
            >
               {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Helper CSS & Font Loading */}
      <style jsx global>{`
        /* IMPORT GOOGLE FONTS FOR PREVIEW */
        @import url('https://fonts.googleapis.com/css2?family=Roboto&family=Lato&family=Montserrat&family=Open+Sans&family=Raleway&family=Caladea&family=Lora&family=Roboto+Slab&family=Playfair+Display&family=Merriweather&display=swap');

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #D1D5DB;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5); 
          border-radius: 20px; 
        }
        @media print {
          @page { size: auto; margin: 0mm; }
          body { background-color: white; color: black; }
          nav, header, footer { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; background: white !important; width: 100% !important; display: block !important; }
          .print\:hidden { display: none !important; }
          .grid { display: block !important; }
          .bg-gray-100 { background-color: white !important; padding: 0 !important; }
          .scale-75, .scale-90, .lg\:scale-100 { transform: none !important; }
          .shadow-2xl { box-shadow: none !important; }
          .print-content { margin: 0 !important; width: 100% !important; max-width: 100% !important; padding: 0 !important; }
          a { text-decoration: none !important; color: #1e40af !important; }
        }
      `}</style>
    </div>
  );
}