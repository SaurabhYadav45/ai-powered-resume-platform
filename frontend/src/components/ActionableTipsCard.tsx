"use client";

import React from "react";
import { CheckCircle2, Lightbulb } from "lucide-react";

interface ActionableTipsCardProps {
  tips: string[] | string;
  title?: string;
  icon?: React.ReactNode;
}

export const ActionableTipsCard: React.FC<ActionableTipsCardProps> = ({ 
  tips, 
  title = "Actionable Suggestions",
  icon = <Lightbulb className="w-5 h-5 text-indigo-500 mr-2" />
}) => {
  const tipsList = Array.isArray(tips) 
    ? tips 
    : typeof tips === 'string' 
      ? tips.split('\n').filter(t => t.trim() !== '') 
      : [];

  if (!tipsList || tipsList.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 h-full border border-indigo-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Lightbulb className="w-32 h-32 text-indigo-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center relative z-10">
        {icon}
        {title}
      </h3>
      
      <div className="space-y-4 relative z-10">
        {tipsList.map((tip, idx) => {
          // Clean up any bullet points or numbers from the AI string
          const cleanTip = tip.replace(/^[-*•\d.]+\s*/, '');
          return (
            <div key={idx} className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
              <p className="text-gray-700 text-sm leading-relaxed">{cleanTip}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
