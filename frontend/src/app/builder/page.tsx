"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Loader, Wand2, Printer, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';

// IMPORT ALL TEMPLATES
import { ModernTemplate, ResumeData } from '../../components/templates/ModernTemplate';
import { SimpleTemplate } from '../../components/templates/SimpleTemplate';
import { CreativeTemplate } from '../../components/templates/CreativeTemplate';
import { TraditionalTemplate } from '../../components/templates/TraditionalTemplate';

// Reuse the interface from the template component to ensure type safety
type ResumeFormData = ResumeData;

export default function ResumeBuilder() {
  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern-1');
  const resumeRef = useRef<HTMLDivElement>(null);

  // FIX: Use useEffect to read URL params on client-side to avoid build errors
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
      skillsRaw: "C++ (DSA), JavaScript, Typescript, Python, HTML, CSS, React.js, Next.js, Redux, Tailwind CSS, Node.js, Express.js, Mongoose, MongoDB, SQL, MySQL, Vector Databases, Langchain, Langraph, Langsmith, RAG, MCP Servers, Graph Database, Git, Github, VS Code, Postman, Cloudinary, Render, Vercel, OpenAI/Gemini API, Data Structure & Algorithm, OperatingSystem, Database Management System, Object-Oriented Programming, Computer Network, Software Engineering, ",
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

  // Watch form values for live preview
  const liveData = watch();

  const onSubmit: SubmitHandler<ResumeFormData> = async (data) => {
    setIsLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';
      const response = await axios.post(`${API_BASE_URL}/resume/build`, data);
      
      const polished = response.data.polishedContent;

      // --- CRITICAL FIX: Map AI Response back to Form Structure ---
      const updatedFormData: ResumeFormData = {
        fullName: polished.fullName,
        email: polished.email,
        phone: polished.phone,
        github: polished.github,
        linkedin: polished.linkedin,
        // Map 'professionalSummary' -> 'summaryRaw'
        summaryRaw: polished.professionalSummary,
        // Map 'skills' array -> 'skillsRaw' string
        skillsRaw: Array.isArray(polished.skills) ? polished.skills.join(', ') : polished.skills,
        // Map 'achievements' array -> 'achievementsRaw' string
        achievementsRaw: Array.isArray(polished.achievements) ? polished.achievements.join('\n') : polished.achievements || "",
        
        education: polished.education, // Structure matches

        // Map Experience: Convert descriptionPoints array back to string with bullets
        experience: polished.experience.map((exp: any) => ({
          company: exp.company,
          role: exp.role,
          date: exp.date,
          descriptionRaw: Array.isArray(exp.descriptionPoints) 
            ? exp.descriptionPoints.map((p: string) => `• ${p}`).join('\n') 
            : exp.descriptionPoints
        })),

        // Map Projects: Convert descriptionPoints array back to string with bullets
        projects: polished.projects.map((proj: any) => ({
          title: proj.title,
          techStack: proj.techStack,
          // Preserve links from original data if backend didn't return them
          link: proj.link || data.projects.find(p => p.title === proj.title)?.link || "", 
          repo: proj.repo || data.projects.find(p => p.title === proj.title)?.repo || "", 
          descriptionRaw: Array.isArray(proj.descriptionPoints) 
            ? proj.descriptionPoints.map((p: string) => `• ${p}`).join('\n') 
            : proj.descriptionPoints
        })),
      };

      // Reset the form with the new data. 
      // Because 'liveData' watches the form, this will automatically update the preview!
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

  // --- THE SWITCH LOGIC ---
  const renderTemplate = () => {
    if (selectedTemplate.startsWith('creative')) {
      return <CreativeTemplate data={liveData} />;
    }
    if (selectedTemplate.startsWith('simple')) {
      return <SimpleTemplate data={liveData} />;
    }
    if (selectedTemplate.startsWith('traditional')) {
      return <TraditionalTemplate data={liveData} />;
    }
    // Default fallback
    return <ModernTemplate data={liveData} />;
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <header className="text-center mb-10 print:hidden pt-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">AI Resume Builder</h1>
        <p className="mt-2 text-gray-600">Editing Template: <span className="font-bold text-indigo-600 uppercase">{selectedTemplate}</span></p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 print:block">
        
        {/* --- LEFT: INPUT FORM --- */}
        <div className="glass-card-purple p-6 rounded-2xl shadow-sm border border-gray-200 h-fit print:hidden max-h-[85vh] overflow-y-auto sticky top-4">
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        </div>

        {/* --- RIGHT: DYNAMIC LIVE PREVIEW --- */}
        <div className="glass-card-purple p-4 rounded-2xl flex flex-col items-center print:bg-white print:p-0 print:block">
          <div className="w-full flex justify-between items-center mb-4 print:hidden">
            <h2 className="text-xl font-semibold text-gray-700">Live Preview</h2>
            <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center shadow-sm">
              <Printer className="w-4 h-4 mr-2"/> Print / PDF
            </button>
          </div>

          <div className="overflow-auto w-full flex justify-center print:overflow-visible print:w-full print:block print:m-0">
            <div ref={resumeRef} className="print-content shadow-2xl w-[210mm] min-h-[297mm] origin-top scale-75 md:scale-90 lg:scale-100 transition-transform print:scale-100 print:shadow-none print:m-0 print:w-full bg-white">
               {/* DYNAMIC COMPONENT RENDERED HERE */}
               {renderTemplate()}
            </div>
          </div>
        </div>

      </div>
      
      {/* Helper CSS */}
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




// "use client";

// import React, { useState, useRef } from 'react';
// import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
// import { Loader, Wand2, Printer, Plus, Trash2, Github, Linkedin, Mail, Phone, ExternalLink, Code } from 'lucide-react';
// import axios from 'axios';

// // 1. Data Structure
// type ResumeFormData = {
//   fullName: string;
//   email: string;
//   phone: string;
//   github: string;
//   linkedin: string;
//   summaryRaw: string;
//   education: {
//     institution: string;
//     degree: string;
//     year: string;
//     grade: string;
//   }[];
//   skillsRaw: string;
//   experience: {
//     company: string;
//     role: string;
//     date: string;
//     descriptionRaw: string;
//   }[];
//   projects: {
//     title: string;
//     techStack: string;
//     descriptionRaw: string;
//     link: string;
//     repo: string;
//   }[];
//   achievementsRaw: string;
// };

// export default function ResumeBuilder() {
//   const [generatedResume, setGeneratedResume] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const resumeRef = useRef<HTMLDivElement>(null);

//   const { register, control, handleSubmit } = useForm<ResumeFormData>({
//     defaultValues: {
//       education: [{ 
//         institution: "Dr. Rizvi Learner's Academy, Jaunpur", 
//         degree: "Class 12th", 
//         year: "2019-2021", 
//         grade: "75%" 
//       }],
//       experience: [{ 
//         company: "TechTadka", 
//         role: "Full-Stack Developer", 
//         date: "01/05/2025 to 01/10/2025", 
//         descriptionRaw: "I was working as a Full stack developer and built Scalable and Robust Full-stack Application." 
//       }],
//       projects: [{ 
//         title: "StudyWave - An Edtech Learning Platform", 
//         techStack: "React, Tailwind, Nodejs, expressjs, mongodb, razorpay, jwt, Multer, mongoose", 
//         descriptionRaw: "Developed a full-stack EdTech platform with distinct portals, allowing instructors to create, sell, and track courses, while providing students a seamless interface for purchasing and learning.JWT and email-based OTP verification; integrated Razorpay for seamless payment processing and Cloudinary/Multer for robust media management.", 
//         link: "https://studywave-frontend.onrender.com/", 
//         repo: "" }]
//     }
//   });

//   const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experience" });
//   const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
//   const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: "projects" });

//   const onSubmit: SubmitHandler<ResumeFormData> = async (data) => {
//     setIsLoading(true);
//     try {
//       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';
//       const response = await axios.post(`${API_BASE_URL}/resume/build`, data);
//       setGeneratedResume(response.data.polishedContent);
//     } catch (error) {
//       console.error("Error building resume:", error);
//       alert("Failed to generate resume. Please check the backend.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // FIXED: Use native browser print. This preserves text selection and links.
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <main className="min-h-screen p-4 sm:p-8 font-sans bg-gray-50 print:bg-white print:p-0">
//       <div className="container mx-auto max-w-7xl print:max-w-none print:w-full print:m-0">
//         <header className="text-center mb-10 print:hidden">
//           <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">AI Resume Builder</h1>
//           <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">Fill in your details, and we'll format a professional resume for you.</p>
//         </header>

//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 print:block ">
          
//           {/* --- LEFT: INPUT FORM (Hidden during print) --- */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit print:hidden glass-card-purple">
//             <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b pb-2">
//               <Wand2 className="w-5 h-5 mr-2 text-indigo-600"/> Input Details
//             </h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
//               {/* Personal Info */}
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-gray-700">Personal Info</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input {...register("fullName")} defaultValue={"Saurabh Singh Yadav"} placeholder="Full Name" className="input-field" required />
//                   <input {...register("email")} defaultValue={"saurabhkry88@gmail.com"} placeholder="Email" className="input-field" required />
//                   <input {...register("phone")} defaultValue={"9602959967"} placeholder="Phone Number" className="input-field" />
//                   <input {...register("github")} defaultValue={"https://github.com/SaurabhYadav45/"} placeholder="GitHub URL" className="input-field" />
//                   <input {...register("linkedin")} defaultValue={"https://www.linkedin.com/in/saurabhyadav45/"} placeholder="LinkedIn/Portfolio URL" className="input-field md:col-span-2" />
//                 </div>
//               </div>

//               {/* Overview */}
//               <div>
//                  <h3 className="font-semibold text-gray-700 mb-2">Overview</h3>
//                  <textarea {...register("summaryRaw")} 
//                  defaultValue={"Full-Stack Developer with strong MERN Stack and Generative AI experience, passionate about building scalable full-stack applications"} 
//                  placeholder="Brief professional summary..." className="input-field h-20" />
//               </div>

//               {/* Education */}
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold text-gray-700">Education</h3>
//                   <button type="button" onClick={() => appendEdu({ institution: "", degree: "", year: "", grade: "" })} className="text-indigo-600 text-sm font-bold flex items-center"><Plus className="w-4 h-4 mr-1"/> Add</button>
//                 </div>
//                 {eduFields.map((field, index) => (
//                   <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
//                     <div className="grid grid-cols-2 gap-2">
//                       <input {...register(`education.${index}.institution`)} placeholder="School/College" className="input-field" />
//                       <input {...register(`education.${index}.degree`)} placeholder="Degree" className="input-field" />
//                       <input {...register(`education.${index}.year`)} placeholder="Year" className="input-field" />
//                       <input {...register(`education.${index}.grade`)} placeholder="Grade" className="input-field" />
//                     </div>
//                     <button type="button" onClick={() => removeEdu(index)} className="text-red-500 text-xs flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Remove</button>
//                   </div>
//                 ))}
//               </div>

//               {/* Skills */}
//               <div>
//                 <h3 className="font-semibold text-gray-700 mb-2">Technical Skills</h3>
//                 <textarea {...register("skillsRaw")}
//                  defaultValue={"C++ (DSA), JavaScript, Typescript, Python, HTML, CSS, React.js, Next.js, Redux, Tailwind CSS, Node.js, Express.js, Mongoose, MongoDB, SQL, MySQL, Vector Databases, Langchain, Langraph, Langsmith, RAG, MCP Servers, Graph Database, Git, Github, VS Code, Postman, Cloudinary, Render, Vercel, OpenAI/Gemini API, Data Structure & Algorithm, OperatingSystem, Database Management System, Object-Oriented Programming, Computer Network, Software Engineering, "}
//                  placeholder="Java, React, Node.js, SQL..." className="input-field h-16" />
//               </div>

//                {/* Experience */}
//                <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold text-gray-700">Experience</h3>
//                   <button type="button" onClick={() => appendExp({ company: "", role: "", date: "", descriptionRaw: "" })} className="text-indigo-600 text-sm font-bold flex items-center"><Plus className="w-4 h-4 mr-1"/> Add</button>
//                 </div>
//                 {expFields.map((field, index) => (
//                   <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
//                     <input {...register(`experience.${index}.company`)} placeholder="Company Name" className="input-field" />
//                     <input {...register(`experience.${index}.role`)} placeholder="Role" className="input-field" />
//                     <input {...register(`experience.${index}.date`)} placeholder="Duration" className="input-field" />
//                     <textarea {...register(`experience.${index}.descriptionRaw`)} placeholder="Responsibilities..." className="input-field h-20" />
//                     <button type="button" onClick={() => removeExp(index)} className="text-red-500 text-xs flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Remove</button>
//                   </div>
//                 ))}
//               </div>

//               {/* Projects */}
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold text-gray-700">Projects</h3>
//                   <button type="button" onClick={() => appendProj({ title: "", techStack: "", descriptionRaw: "", link: "", repo: "" })} className="text-indigo-600 text-sm font-bold flex items-center"><Plus className="w-4 h-4 mr-1"/> Add</button>
//                 </div>
//                 {projFields.map((field, index) => (
//                   <div key={field.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
//                     <input {...register(`projects.${index}.title`)} placeholder="Project Title" className="input-field" />
//                     <input {...register(`projects.${index}.techStack`)} placeholder="Tech Stack Used" className="input-field" />
//                     <div className="grid grid-cols-2 gap-2">
//                       <input {...register(`projects.${index}.link`)} placeholder="Live Demo Link (Optional)" className="input-field" />
//                       <input {...register(`projects.${index}.repo`)} placeholder="GitHub Repo Link (Optional)" className="input-field" />
//                     </div>
//                     <textarea {...register(`projects.${index}.descriptionRaw`)} placeholder="What did you build? What problem did it solve?" className="input-field h-20" />
//                     <button type="button" onClick={() => removeProj(index)} className="text-red-500 text-xs flex items-center"><Trash2 className="w-3 h-3 mr-1"/> Remove</button>
//                   </div>
//                 ))}
//               </div>

//               {/* Achievements */}
//               <div>
//                  <h3 className="font-semibold text-gray-700 mb-2">Achievements</h3>
//                  <textarea {...register("achievementsRaw")}
//                   defaultValue={"Solved 800+ DSA problems on Leetcode, Ranked in the top 15% globally with a contest rating of 1680 on LeetCode."}
//                   placeholder="Hackathon wins, certifications, leadership roles..." className="input-field h-20" />
//               </div>

//               <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-4 px-6 border-transparent rounded-xl shadow-sm text-lg font-semibold  bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 bg-gradient-to-r from-indigo-500 to-purple-500 text-white cursor-pointer">
//                 {isLoading ? <Loader className="animate-spin mr-2"/> : <Wand2 className="mr-2"/>} 
//                 Generate Resume
//               </button>
//             </form>
//           </div>

//           {/* --- RIGHT: LIVE PREVIEW --- */}
//           <div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-center print:bg-white print:p-0 print:block glass-card-purple">
//             <div className="w-full flex justify-between items-center mb-4 print:hidden">
//               <h2 className="text-xl font-semibold text-gray-700">Resume Preview</h2>
//               {generatedResume && (
//                 <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center shadow-sm transition">
//                   <Printer className="w-4 h-4 mr-2"/> Print / Save as PDF
//                 </button>
//               )}
//             </div>

//             {/* THE PAPER */}
//             <div className="overflow-auto w-full flex justify-center print:overflow-visible print:w-full print:block print:m-0">
//                 <div ref={resumeRef} className="bg-white text-[#000000] shadow-2xl w-[210mm] min-h-[297mm] p-[15mm] box-border origin-top scale-75 md:scale-90 lg:scale-100 transition-transform print:scale-100 print:shadow-none print:m-0 print:w-full" style={{ fontFamily: 'Calibri, sans-serif', fontSize: '11pt' }}>
//                   {!generatedResume ? (
//                     <div className="h-full flex flex-col justify-center items-center text-[#9ca3af] py-32 print:hidden">
//                       <p>Fill out the form to generate your resume.</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {/* 1. Header */}
//                       <div className="text-center border-b-2 border-[#1f2937] pb-3">
//                         <h1 className="text-3xl font-bold uppercase tracking-wide mb-1 text-[#000000]">{generatedResume.fullName}</h1>
//                         <div className="flex flex-wrap justify-center gap-3 text-sm text-[#374151]">
//                           {generatedResume.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {generatedResume.email}</span>}
//                           {generatedResume.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {generatedResume.phone}</span>}
                          
//                           {generatedResume.linkedin && (
//                             <a href={generatedResume.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#1e40af] underline font-semibold">
//                               <Linkedin className="w-3 h-3"/> LinkedIn
//                             </a>
//                           )}
//                           {generatedResume.github && (
//                             <a href={generatedResume.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#1e40af] underline font-semibold">
//                               <Github className="w-3 h-3"/> GitHub
//                             </a>
//                           )}
//                         </div>
//                       </div>

//                       {/* 2. Overview */}
//                       {generatedResume.professionalSummary && (
//                         <section>
//                           <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1 text-[#000000]">Overview</h3>
//                           <p className="text-justify leading-snug text-sm text-[#000000]">{generatedResume.professionalSummary}</p>
//                         </section>
//                       )}

//                       {/* 3. Education */}
//                       {generatedResume.education && generatedResume.education.length > 0 && (
//                         <section>
//                           <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2 text-[#000000]">Education</h3>
//                           <div className="space-y-1">
//                             {generatedResume.education.map((edu: any, i: number) => (
//                               <div key={i} className="flex justify-between text-sm text-[#000000]">
//                                 <div>
//                                   <span className="font-bold">{edu.institution}</span>
//                                   {edu.degree && <span className="italic"> — {edu.degree}</span>}
//                                 </div>
//                                 <div className="text-right">
//                                   <span>{edu.year}</span>
//                                   {edu.grade && <span className="ml-2 font-medium">({edu.grade})</span>}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </section>
//                       )}

//                       {/* 4. Technical Skills */}
//                       {generatedResume.skills && generatedResume.skills.length > 0 && (
//                         <section>
//                           <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1 text-[#000000]">Technical Skills</h3>
//                           <p className="leading-snug text-sm text-[#000000]">{generatedResume.skills.join(" • ")}</p>
//                         </section>
//                       )}

//                       {/* 5. Projects */}
//                       {generatedResume.projects && generatedResume.projects.length > 0 && (
//                         <section>
//                           <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2 text-[#000000]">Projects</h3>
//                           <div className="space-y-3">
//                             {generatedResume.projects.map((proj: any, i: number) => (
//                               <div key={i}>
//                                 <div className="flex justify-between items-baseline mb-1">
//                                   <div>
//                                     <span className="font-bold text-sm text-[#000000]">{proj.title}</span>
//                                     {proj.techStack && <span className="text-xs italic text-[#4b5563] ml-2">({proj.techStack})</span>}
//                                   </div>
                                  
//                                   <div className="text-xs font-medium text-[#1e40af] flex gap-3">
//                                     {proj.link && (
//                                       <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
//                                         Live Demo <ExternalLink className="w-3 h-3"/>
//                                       </a>
//                                     )}
//                                     {proj.link && proj.repo && <span>—</span>}
//                                     {proj.repo && (
//                                       <a href={proj.repo} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
//                                         GitHub Repository <Code className="w-3 h-3"/>
//                                       </a>
//                                     )}
//                                   </div>
//                                 </div>

//                                 <ul className="list-disc list-outside ml-4 text-sm space-y-0.5 text-[#1f2937]">
//                                   {proj.descriptionPoints.map((point: string, j: number) => (
//                                     <li key={j} className="pl-1">{point}</li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             ))}
//                           </div>
//                         </section>
//                       )}

//                       {/* 6. Experience */}
//                       {generatedResume.experience && generatedResume.experience.length > 0 && (
//                          <section>
//                            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-2 text-[#000000]">Experience</h3>
//                            <div className="space-y-3">
//                              {generatedResume.experience.map((job: any, i: number) => (
//                                <div key={i}>
//                                  <div className="flex justify-between font-bold text-sm text-[#000000]">
//                                    <span>{job.company}</span>
//                                    <span className="font-normal">{job.date}</span>
//                                  </div>
//                                  <p className="italic text-sm mb-1 text-[#000000]">{job.role}</p>
//                                  <ul className="list-disc list-outside ml-4 text-sm space-y-0.5 text-[#1f2937]">
//                                    {job.descriptionPoints.map((point: string, j: number) => (
//                                      <li key={j} className="pl-1">{point}</li>
//                                    ))}
//                                  </ul>
//                                </div>
//                              ))}
//                            </div>
//                          </section>
//                       )}

//                       {/* 7. Achievements */}
//                       {generatedResume.achievements && generatedResume.achievements.length > 0 && (
//                         <section>
//                           <h3 className="text-sm font-bold uppercase tracking-wider border-b border-[#d1d5db] mb-1 text-[#000000]">Achievements</h3>
//                           <ul className="list-disc list-outside ml-4 text-sm space-y-0.5 text-[#1f2937]">
//                              {generatedResume.achievements.map((ach: string, i: number) => (
//                                <li key={i}>{ach}</li>
//                              ))}
//                           </ul>
//                         </section>
//                       )}
//                     </div>
//                   )}
//                 </div>
//             </div>
//           </div>

//         </div>
//       </div>
      
//       {/* Helper CSS for Inputs and Print */}
//       <style jsx>{`
//         .input-field {
//           width: 100%;
//           padding: 0.75rem;
//           border-radius: 0.5rem;
//           border: 1px solid #e5e7eb;
//           outline: none;
//           transition: border-color 0.2s;
//         }
//         .input-field:focus {
//           border-color: #6366f1;
//           box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
//         }

//         /* PRINT STYLES */
//         @media print {
//           @page {
//             size: auto;
//             margin: 0mm;
//           }
//           body {
//             background-color: white;
//             color: black;
//           }
//           /* Hide everything except the resume container */
//           body > *:not(main) {
//             display: none !important;
//           }
//           main {
//             padding: 0 !important;
//             background: white !important;
//             margin: 0 !important;
//           }
//           /* Hide the input form and buttons */
//           .print\:hidden {
//             display: none !important;
//           }
//           /* Ensure the resume container takes up the full page */
//           .print-content {
//             box-shadow: none !important;
//             margin: 0 !important;
//             width: 100% !important;
//             max-width: 100% !important;
//             transform: none !important;
//             padding: 10mm 15mm !important; /* Adjust margins for print */
//           }
//           /* Fix for links in print */
//           a {
//             text-decoration: none !important;
//             color: #1e40af !important;
//           }
//         }
//       `}</style>
//     </main>
//   );
// }