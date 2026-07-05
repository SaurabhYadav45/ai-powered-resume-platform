"use client";

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Save, Eye, Edit2, CheckCircle2, Loader2 } from 'lucide-react';
import { ResumeForm, STEPS } from '../../components/builder/ResumeForm';
import { ResumePreview } from '../../components/builder/ResumePreview';
import { dummyResumeData } from '../../utils/dummyResumeData';
import { ResumeData } from '../../types/builder';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');

  const [data, setData] = useState<ResumeData>(dummyResumeData);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDraft = async () => {
      const token = Cookies.get('authToken');
      if (!token) {
        setIsLoading(false);
        return; // Use dummy data if not logged in
      }

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
        const response = await axios.get(`${API_URL}/resume/draft`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error: any) {
        console.error("Failed to fetch draft:", error);
        // If 404 (no draft found), just silently fall back to dummy data
      } finally {
        setIsLoading(false);
      }
    };

    fetchDraft();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume`,
  });

  const handleSave = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      alert("Please log in to save your draft to the database.");
      return;
    }

    setIsSaving(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
      await axios.post(`${API_URL}/resume/draft`, { data }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Resume draft saved successfully!');
    } catch (error) {
      console.error("Failed to save draft:", error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAiImprove = async (text: string, onComplete: (improved: string) => void) => {
    const token = Cookies.get('authToken');
    if (!token) {
      alert("Please log in to use the AI Improvement feature.");
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
      const response = await axios.post(
        `${API_URL}/resume/improve-text`, 
        { text }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data && response.data.improved) {
        onComplete(response.data.improved);
      }
    } catch (error) {
      console.error("Failed to improve text:", error);
      alert('AI Improvement failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading your resume draft...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-6 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto w-full">
      
      {/* Top Stepper and Actions Row */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sticky top-6 z-40">
        
        {/* Wizard Header / Stepper */}
        <div className="flex-1 flex space-x-2 overflow-x-auto pb-2 xl:pb-0 custom-scrollbar">
          {STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`cursor-pointer whitespace-nowrap flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                currentStep === idx 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : currentStep > idx 
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {currentStep > idx && <CheckCircle2 className="w-4 h-4 mr-1.5" />}
              {step}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 shrink-0">
          {/* Mobile view toggle */}
          <button 
            onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
            className="cursor-pointer lg:hidden flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            {viewMode === 'edit' ? <><Eye className="w-4 h-4 mr-1.5" /> Preview</> : <><Edit2 className="w-4 h-4 mr-1.5" /> Edit</>}
          </button>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
          >
            <Save className="w-4 h-4 mr-1.5" /> {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            onClick={handlePrint}
            className="cursor-pointer flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4 mr-1.5" /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Content Split View */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden relative pb-6">
        
        {/* Left Side: Editor */}
        <div className={`w-full lg:w-1/2 p-6 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm h-[calc(100vh-10rem)] custom-scrollbar ${viewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <ResumeForm data={data} onChange={setData} onAiImprove={handleAiImprove} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>

        {/* Right Side: Live Preview */}
        <div className={`w-full lg:w-1/2 bg-gray-200/80 p-4 rounded-xl border border-gray-200 shadow-inner overflow-y-auto flex justify-center h-[calc(100vh-10rem)] custom-scrollbar ${viewMode === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="relative transition-all transform origin-top lg:scale-[0.6] xl:scale-[0.65] hover:scale-[0.62] xl:hover:scale-[0.67] duration-300 print:scale-100 h-fit">
            <div className="shadow-2xl">
              <ResumePreview data={data} ref={componentRef} templateId={templateId} />
            </div>
          </div>
        </div>

      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5); 
          border-radius: 20px; 
        }
      `}</style>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-10 h-10 text-purple-600 animate-spin" /></div>}>
      <BuilderContent />
    </Suspense>
  );
}