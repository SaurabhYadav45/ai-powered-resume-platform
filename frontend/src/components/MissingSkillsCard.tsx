"use client";

import React from "react";
import { AlertTriangle, PlusCircle } from "lucide-react";

interface MissingSkillsCardProps {
  skills: string[] | string;
}

export const MissingSkillsCard: React.FC<MissingSkillsCardProps> = ({ skills }) => {
  // Sometimes the backend might return a string instead of an array depending on prompt parsing
  const skillsList = Array.isArray(skills) 
    ? skills 
    : typeof skills === 'string' 
      ? skills.split(',').map(s => s.trim()) 
      : [];

  if (!skillsList || skillsList.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 h-full border border-orange-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <AlertTriangle className="w-24 h-24 text-orange-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
        Missing Critical Skills
      </h3>
      <p className="text-gray-600 mb-6 text-sm">
        These skills are highly relevant to your target role but were not detected in your resume. Consider adding them if you possess them.
      </p>
      
      <div className="flex flex-wrap gap-3 relative z-10">
        {skillsList.map((skill, idx) => (
          <div key={idx} className="flex items-center bg-orange-50 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
            <PlusCircle className="w-4 h-4 mr-1.5 opacity-70" />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
