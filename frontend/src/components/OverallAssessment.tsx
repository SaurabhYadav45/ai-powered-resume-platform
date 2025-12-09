"use client";

import React from "react";
import { Star, Award, TrendingUp } from "lucide-react";
import { AnalysisResult } from '../types';

interface OverallAssessmentProps {
  analysis: AnalysisResult;
}

export const OverallAssessment: React.FC<OverallAssessmentProps> = ({ analysis }) => {
  // Calculate average score
  const scores = [
    analysis.atsScore,
    analysis.impactScore,
    analysis.actionVerbsScore,
    analysis.contentRelevance,
    analysis.lengthScore
  ];
  
  const averageScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  
  // Determine overall rating
  const getRating = () => {
    if (averageScore >= 85) return "Excellent";
    if (averageScore >= 70) return "Good";
    if (averageScore >= 50) return "Average";
    return "Needs Improvement";
  };
  
  // Determine color based on score
  const getColorClass = () => {
    if (averageScore >= 85) return "text-green-600";
    if (averageScore >= 70) return "text-blue-600";
    if (averageScore >= 50) return "text-yellow-600";
    return "text-red-600";
  };
  
  // Determine recommendation
  const getRecommendation = () => {
    const lowestScore = Math.min(...scores);
    if (lowestScore < 60) {
      if (analysis.atsScore === lowestScore) {
        return "Focus on optimizing your resume for Applicant Tracking Systems by incorporating more relevant keywords from job descriptions.";
      }
      if (analysis.impactScore === lowestScore) {
        return "Quantify your achievements with specific metrics and numbers to demonstrate greater impact.";
      }
      if (analysis.actionVerbsScore === lowestScore) {
        return "Use stronger and more varied action verbs to begin your bullet points.";
      }
      if (analysis.contentRelevance === lowestScore) {
        return "Ensure your experience aligns more closely with the roles you're targeting.";
      }
      if (analysis.lengthScore === lowestScore) {
        return "Adjust your resume length to better fit industry standards (typically 1-2 pages).";
      }
    }
    return "Your resume is in good shape! Focus on continuous improvements in all areas.";
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-4 mr-6">
            <Award className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Overall Assessment</h2>
            <p className="text-gray-600">Based on comprehensive analysis</p>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <div className="inline-flex items-center bg-white/50 rounded-full px-6 py-3">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <span className={`text-3xl font-extrabold ${getColorClass()}`}>
              {averageScore}%
            </span>
          </div>
          <p className="mt-2 text-lg font-semibold text-gray-700">{getRating()}</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-white/50 rounded-xl">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
          Recommendation
        </h3>
        <p className="mt-2 text-gray-700">{getRecommendation()}</p>
      </div>
    </div>
  );
};