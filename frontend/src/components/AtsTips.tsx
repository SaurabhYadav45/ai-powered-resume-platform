"use client";

import React from "react";
import { Lightbulb, CheckCircle } from "lucide-react";
import { AnalysisResult } from '../types';

interface AtsTipsProps {
  tips: AnalysisResult['atsOptimizationTips'];
}

export const AtsTips: React.FC<AtsTipsProps> = ({ tips }) => {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-6 w-6 text-yellow-500 mr-3" />
        <h3 className="text-xl font-bold text-gray-800">ATS Optimization Tips</h3>
      </div>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> Implement these suggestions to significantly improve your chances of passing through Applicant Tracking Systems.
        </p>
      </div>
    </div>
  );
};