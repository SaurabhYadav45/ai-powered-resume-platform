import * as z from 'zod';

// Zod schema for form validation
export const formSchema = z.object({
  resume: z.any(),
  jobDescription: z.string().optional(),
});

// Type inferred from the Zod schema
export type FormValues = z.infer<typeof formSchema>;

// Type for the analysis result object from the AI
export interface AnalysisResult {
  skillsMatch: number;
  missingSkills: string[];
  formattingFeedback: string;
  suggestions: string[];
  keywordFrequency: { keyword: string; count: number }[];
  atsScore: number;
  atsOptimizationTips: string[];
  impactScore: number;
  actionVerbsScore: number;
  contentRelevance: number;
  lengthScore: number;
  industryBenchmark: {
    avgSkillsMatch: number;
    avgAtsScore: number;
    avgImpactScore: number;
    topKeywords: string[];
  };
}

// NEW: Type for the entire response from the /analyze endpoint
export interface AnalyzeApiResponse {
  analysisResult: AnalysisResult;
  resumeText: string;
}
