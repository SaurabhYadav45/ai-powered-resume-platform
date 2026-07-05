"use client";

import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, FileText, Briefcase, Loader, ServerCrash, Wand2, Copy, Target, Crown, Sparkles } from 'lucide-react';

// Corrected paths to use Next.js style aliases (@/)
import { SkillChart } from '@/components/SkillChart';
import { DetailedScores } from '@/components/DetailedScores';
import { OverallAssessment } from '@/components/OverallAssessment';
import { AtsTips } from '@/components/AtsTips';
import { IndustryBenchmark } from '@/components/IndustryBenchmark';
import { ActionableTipsCard } from '@/components/ActionableTipsCard';
import { MissingSkillsCard } from '@/components/MissingSkillsCard';
import { RedFlagsCard } from '@/components/RedFlagsCard';
import { analyzeResumeApi, generateCoverLetterApi, getHistory } from '@/utils/api';
import { AnalysisResult, FormValues } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
  resume: z.any()
    .refine((files) => files?.length === 1, "A resume file is required.")
    .refine((files) => files?.[0]?.size <= 10 * 1024 * 1024, `Max file size is 10MB.`)
    .refine(
      (files) => ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"].includes(files?.[0]?.type),
      "Only PDF, DOCX, JPG, and PNG formats are accepted."
    ),
  jobDescription: z.string().optional(),
});

export default function UploadPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescriptionText, setJobDescriptionText] = useState<string>('');
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const resultsRef = useRef<HTMLDivElement>(null);
  // 1. Create a new ref for the cover letter section
  const coverLetterRef = useRef<HTMLDivElement>(null);
  
  const { credits, isPro, refreshUser } = useAuth();
  const outOfCredits = !isPro && credits <= 0;

  const searchParams = useSearchParams();
  const historyId = searchParams.get('historyId');

  React.useEffect(() => {
    if (historyId) {
      setIsLoading(true);
      getHistory().then(history => {
        const item = history.find(h => h._id === historyId);
        if (item) {
          setAnalysisResult(item.analysisResult);
          setFileName(item.fileName);
          
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        }
      }).catch(err => {
        console.error('Failed to load history item:', err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [historyId]);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const resumeFile = watch("resume");
  React.useEffect(() => {
    if (resumeFile && resumeFile.length > 0) {
      setFileName(resumeFile[0].name);
    } else {
      setFileName('');
    }
  }, [resumeFile]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setCoverLetter('');

    try {
      const { analysisResult: resultData, resumeText: extractedText } = await analyzeResumeApi(data);
      setAnalysisResult(resultData);
      setResumeText(extractedText);
      setJobDescriptionText(data.jobDescription || '');
      
      await refreshUser(); // Update credit count
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!resumeText || !jobDescriptionText) {
      setError("A job description is required to generate a cover letter.");
      return;
    }
    setIsGeneratingLetter(true);
    setError(null);
    try {
      const { coverLetter: generatedLetter } = await generateCoverLetterApi(resumeText, jobDescriptionText);
      setCoverLetter(generatedLetter);

      // 2. Add the scroll logic
      setTimeout(() => {
        coverLetterRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to generate cover letter.";
      setError(errorMessage);
    } finally {
      setIsGeneratingLetter(false);
    }
  };
  
  const handleCopyText = () => {
    navigator.clipboard.writeText(coverLetter).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed to copy.');
    });
  };

  return (
    <main className="min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {!historyId && (
          <header className="text-center mb-10">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text pb-1">AI Resume Analyzer</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm">
                <Sparkles className="w-4 h-4 mr-1.5" />
                AI-Powered
              </span>
            </div>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Get instant feedback on your resume to see how you match up.
            </p>

            <div className="max-w-4xl mx-auto w-full bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100/80 text-purple-600">
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <p className="text-gray-900 font-semibold text-base">{isPro ? 'Unlimited analyses' : `${credits} analyses remaining`}</p>
                  <p className="text-gray-500 text-sm">Upgrade to Premium for unlimited analyses</p>
                </div>
              </div>
              {!isPro && (
                <button className="flex items-center px-5 py-2 bg-white border border-purple-200 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.2)] text-sm font-semibold text-gray-800 hover:bg-purple-50 transition-colors cursor-pointer">
                  <Crown className="w-4 h-4 text-yellow-500 mr-2" />
                  Upgrade
                </button>
              )}
            </div>
          </header>
        )}

        {!historyId && (
          <div className="max-w-4xl mx-auto mb-12 content-glow">
            <div className="rounded-2xl p-8 glass-card-purple">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Form fields... */}
                <div>
                  <label htmlFor="resume-upload-input" className="block text-lg font-semibold text-gray-700 mb-2">
                    <FileText className="inline-block w-5 h-5 mr-2 align-text-bottom" />
                    Upload Your Resume
                  </label>
                  <div className="mt-2 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-white/50 border-dashed rounded-xl hover:border-indigo-400 transition-colors bg-white/20">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-indigo-500/70" />
                      <div className="flex justify-center text-sm text-gray-700">
                        <label htmlFor="resume-upload-input" className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input id="resume-upload-input" type="file" className="sr-only" {...register("resume")} accept=".pdf,.docx,image/jpeg,image/png" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG up to 10MB</p>
                      {fileName && <p className="text-sm text-green-700 pt-2 font-semibold">{fileName}</p>}
                    </div>
                  </div>
                  {errors.resume && <p className="mt-2 text-sm text-red-600">{errors.resume.message?.toString()}</p>}
                </div>
                <div>
                  <label htmlFor="jobDescription" className="block text-lg font-semibold text-gray-700 mb-2">
                    <Briefcase className="inline-block w-5 h-5 mr-2 align-text-bottom" />
                    Job Description (Optional)
                  </label>
                  <textarea
                    id="jobDescription"
                    {...register("jobDescription")}
                    rows={4}
                    className="w-full p-4 text-gray-700 bg-white/60 border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-500 shadow-inner"
                    placeholder="Paste the job description here..."
                  />
                </div>
                <div>
                  {outOfCredits && (
                    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm text-center">
                      You have run out of free analysis credits. Please upgrade to Pro to continue.
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || outOfCredits}
                    className="w-full flex items-center justify-center py-4 px-6 border-transparent rounded-xl shadow-md text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white cursor-pointer transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <><Loader className="animate-spin mr-3 h-5 w-5" /> Analyzing...</>
                    ) : (
                      <><Sparkles className="mr-2 h-5 w-5 text-indigo-200" /> Analyze My Resume</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div ref={resultsRef}>
          {error && (
            <div className="max-w-4xl mx-auto my-8 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-sm" role="alert">
              <div className="flex items-center">
                <div className="py-1"><ServerCrash className="h-6 w-6 text-red-500 mr-4" /></div>
                <div><p className="font-bold">An Error Occurred</p><p className="text-sm">{error}</p></div>
              </div>
            </div>
          )}

          {historyId && !analysisResult && isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          )}

          {analysisResult && (
            <div className="max-w-6xl mx-auto animate-fade-in space-y-10">
              
              {/* Top Overview Section */}
              <div className="grid grid-cols-1 gap-8">
                <OverallAssessment analysis={analysisResult} />
              </div>

              {/* Data & Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <DetailedScores analysis={analysisResult} />
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Keyword Analysis</h3>
                  <SkillChart data={analysisResult.keywordFrequency} />
                </div>
              </div>
              
              {/* Industry Benchmark */}
              <div className="grid grid-cols-1 gap-8">
                <IndustryBenchmark analysis={analysisResult} />
              </div>

              {/* Action Plan Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <MissingSkillsCard skills={analysisResult.missingSkills} />
                <ActionableTipsCard title="Formatting Feedback" tips={analysisResult.formattingFeedback} />
                <ActionableTipsCard title="Improvement Suggestions" tips={analysisResult.suggestions} />
              </div>
              
              {/* Secondary Tips Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-6">
                <AtsTips tips={analysisResult.atsOptimizationTips} />
                {(analysisResult.unquantifiedBulletPoints?.length > 0 || analysisResult.buzzwordsDetected?.length > 0) && (
                  <RedFlagsCard 
                    unquantifiedPoints={analysisResult.unquantifiedBulletPoints} 
                    buzzwords={analysisResult.buzzwordsDetected} 
                  />
                )}
              </div>

              {/* Cover Letter Section */}
              <div className="text-center pt-8">
                <button
                  onClick={handleGenerateCoverLetter}
                  disabled={isGeneratingLetter || !jobDescriptionText}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 cursor-pointer"
                >
                  {isGeneratingLetter ? (
                    <><Loader className="animate-spin mr-3 h-5 w-5" /> Generating...</>
                  ) : (
                    <><Wand2 className="mr-2 h-5 w-5" /> Generate Cover Letter</>
                  )}
                </button>
                {!jobDescriptionText && <p className="text-sm text-gray-500 mt-2">A job description is required to generate a cover letter.</p>}
              </div>

              {/* 3. Attach the ref to the cover letter container */}
              <div ref={coverLetterRef}>
                {coverLetter && (
                  <div className="glass-card rounded-2xl p-6 relative">
                     <h3 className="text-2xl font-bold text-gray-800 mb-4 ">Your Generated Cover Letter</h3>
                     <textarea
                       readOnly
                       value={coverLetter}
                       className="w-full h-96 p-4 bg-white/60 border border-white/50 rounded-md text-gray-800 font-mono"
                     />
                     <button onClick={handleCopyText} className="absolute top-6 right-6 bg-gray-700 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 flex items-center">
                       <Copy className="mr-2 h-4 w-4" />
                       {copySuccess || 'Copy'}
                     </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
