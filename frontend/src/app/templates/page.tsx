"use client";

import React, { useState } from 'react';
import { ArrowRight, Check, LayoutTemplate, Filter, Star, Download } from 'lucide-react';
import { templates, TemplateCategory, Template } from '../../data/templates';
import { useRouter } from 'next/navigation';
import { Rubik } from 'next/font/google';
import { downloadSampleResume } from '../../utils/templateUtils';

// Load Rubik font
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-rubik',
});

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('All');
  const [downloadingTemplate, setDownloadingTemplate] = useState<string | null>(null);
  const router = useRouter();

  // Filter logic
  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  const categories: TemplateCategory[] = ['All', 'Modern', 'Traditional', 'Simple', 'Creative'];

  const handleUseTemplate = (templateId: string) => {
    router.push(`/builder?template=${templateId}`);
  };

  // New function to handle template download
  const handleDownloadTemplate = async (template: Template) => {
    try {
      setDownloadingTemplate(template.id);
      await downloadSampleResume(template);
    } catch (error) {
      console.error('Error downloading sample resume:', error);
      alert('Failed to download sample resume. Please try again.');
    } finally {
      setDownloadingTemplate(null);
    }
  };

  return (
    <main className={`min-h-screen font-sans ${rubik.variable}`}>
      
      {/* --- HERO SECTION --- */}
      {/* UPDATED: Removed bg-white so the global animated background shows. Added relative z-10. */}
      <section className="relative pt-10 pb-10 overflow-hidden z-10">
         
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
               
               {/* Left Content */}
               <div className="lg:w-1/2 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 backdrop-blur border border-indigo-100 text-indigo-700 text-sm font-semibold mb-6 shadow-sm">
                    <LayoutTemplate className="w-4 h-4" />
                    <span>Library of 50+ Designs</span>
                  </div>

                  {/* UPDATED: Heading with specific typography */}
                  <h1 
                    className="font-rubik text-gray-900 tracking-normal mb-6"
                    style={{
                      fontSize: '58px',
                      lineHeight: '76px',
                      fontWeight: 500, // Medium
                    }}
                  >
                    Resume Templates <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      That Get You Hired
                    </span>
                  </h1>

                  {/* UPDATED: Description with specific typography */}
                  <p 
                    className="font-rubik text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
                    style={{
                      fontSize: '16px',
                      lineHeight: '25.6px',
                      fontWeight: 400, // Regular
                    }}
                  >
                    Choose from our free, ATS-friendly resume templates. Preview samples or use our intuitive AI Builder to customize them in minutes. Each template comes with a downloadable sample to help you visualize the final result.
                  </p>

                  <div className="flex flex-col items-center lg:items-start gap-6">
                    <button 
                      onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} 
                      className="px-8 py-3 cursor-pointer bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg transform hover:scale-105 duration-200"
                    >
                      Browse Templates
                    </button>

                    {/* NEW: Reviews / Social Proof */}
                    <div className="flex items-center gap-4 text-sm font-rubik text-gray-700">
                       <span className="font-medium text-lg">Excellent</span>
                       <div className="flex text-green-500">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                       </div>
                       <span className="text-gray-500">4,997 Reviews</span>
                    </div>
                  </div>
               </div>

               {/* Right Content - Static Image with MOVING GRADIENT BORDER */}
               <div className="lg:w-1/2 flex justify-center perspective-1000">
                  {/* The Gradient Border Container */}
                  <div className="relative p-[8px] rounded-2xl overflow-hidden group shadow-2xl">
                     
                     {/* 1. The Moving Gradient Layer */}
                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow opacity-100"></div>
                     
                     {/* 2. The Content Container */}
                     <div className="relative bg-gray-100 rounded-xl overflow-hidden h-[500px] w-[380px] flex items-center justify-center p-1">
                        <img 
                          src="./heroTemplate.png" 
                          alt="Resume Templates Preview" 
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-white/50 flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                           <span className="text-sm font-bold text-gray-800">ATS Optimized</span>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* --- FILTER & GALLERY SECTION --- */}
      <section id="gallery" className="py-4 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md scale-105' 
                  : 'bg-white/60 backdrop-blur-sm text-gray-600 border border-gray-200 hover:bg-white hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid with Animated Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
           {filteredTemplates.map((template) => (
             // Outer Wrapper acting as the Border Container
             <div 
               key={template.id} 
               className="group relative rounded-2xl p-[3px] overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
             >
                {/* 1. Animated Gradient Layer (Visible on Hover) */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow"></div>
                
                {/* 2. Static Border Layer (Visible by default) */}
                <div className="absolute inset-0 bg-gray-200 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>

                {/* 3. The Actual Card Content */}
                <div className="relative h-full bg-white rounded-xl overflow-hidden flex flex-col">
                    {/* Image Container */}
                    <div className="aspect-[1/1.414] w-full overflow-hidden bg-gray-100 relative">
                      <img 
                        src={template.image} 
                        alt={template.name} 
                        className="w-full h-full object-cover object-top transition-transform duration-700" 
                      />
                      
                      {/* Hover Overlay with Dual Actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                          <button 
                            onClick={() => handleUseTemplate(template.id)}
                            className="cursor-pointer px-6 py-3 bg-white text-gray-900 font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 hover:bg-indigo-50 shadow-lg text-sm w-4/5 justify-center"
                          >
                            Use Template <ArrowRight className="w-4 h-4"/>
                          </button>
                          
                          <button 
                            onClick={() => handleDownloadTemplate(template)}
                            disabled={downloadingTemplate === template.id}
                            className={`cursor-pointer px-6 py-3 font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 shadow-lg text-sm w-4/5 justify-center ${
                              downloadingTemplate === template.id 
                                ? 'bg-indigo-400 text-white' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                          >
                            {downloadingTemplate === template.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating...
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4"/> Sample Resume
                              </>
                            )}
                          </button>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 border-t border-gray-100 bg-white">
                      <div className="flex justify-between items-center">
                          <h3 className="font-bold text-gray-900">{template.name}</h3>
                          <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md">
                            {template.category}
                          </span>
                      </div>
                    </div>
                </div>
             </div>
           ))}
        </div>

        {filteredTemplates.length === 0 && (
           <div className="text-center py-20 text-gray-500 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/20">
             <p>No templates found in this category.</p>
           </div>
        )}
      </section>
      
      {/* CSS for Spinning Gradient */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
          width: 150%; 
          height: 150%;
          left: -25%;
          top: -25%;
        }
      `}</style>
    </main>
  );
}