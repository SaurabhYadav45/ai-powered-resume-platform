"use client";

import React from "react";
import { AlertOctagon, XCircle, FileWarning } from "lucide-react";

interface RedFlagsCardProps {
  unquantifiedPoints: string[] | string;
  buzzwords: string[] | string;
}

export const RedFlagsCard: React.FC<RedFlagsCardProps> = ({ unquantifiedPoints, buzzwords }) => {
  const parseList = (data: string[] | string) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return typeof data === 'string' ? data.split('\n').filter(t => t.trim() !== '') : [];
  };

  const pointsList = parseList(unquantifiedPoints);
  const buzzwordsList = parseList(buzzwords);

  if (pointsList.length === 0 && buzzwordsList.length === 0) {
    return null; // Return nothing if no red flags!
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-full border border-red-200 relative overflow-hidden bg-red-50/30">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <AlertOctagon className="w-32 h-32 text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center relative z-10">
        <AlertOctagon className="w-5 h-5 text-red-600 mr-2" />
        Red Flags to Fix
      </h3>
      
      <div className="space-y-6 relative z-10">
        {/* Unquantified Points */}
        {pointsList.length > 0 && (
          <div>
            {/* <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
              <FileWarning className="w-4 h-4 mr-1.5 text-red-600" />
              Missing Metrics (Add Numbers Here)
            </h4> */}
            <div className="space-y-3">
              {pointsList.map((point, idx) => {
                const cleanPoint = point.replace(/^[-*•\d.]+\s*/, '');
                const suggestionMatch = cleanPoint.match(/\[Suggestion:(.*?)\]/i);
                const mainText = cleanPoint.replace(/\[Suggestion:.*?\]/i, '').trim();
                const suggestionText = suggestionMatch ? suggestionMatch[1].trim() : null;

                return (
                  <div key={idx} className="flex flex-col bg-white/60 p-3 rounded-lg border border-red-100 shadow-sm">
                    <div className="flex items-start">
                      <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 shrink-0" />
                      <p className="text-gray-700 text-sm italic">"{mainText}"</p>
                    </div>
                    {suggestionText && (
                      <p className="text-xs font-medium text-indigo-700 mt-2 ml-6 bg-indigo-50/80 p-2 rounded-md border border-indigo-100">
                        <span className="font-bold mr-1">💡 Suggestion:</span>{suggestionText}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Buzzwords */}
        {buzzwordsList.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
              <FileWarning className="w-4 h-4 mr-1.5 text-red-600" />
              Clichés & Buzzwords Detected
            </h4>
            <div className="flex flex-wrap gap-2">
              {buzzwordsList.map((word, idx) => (
                <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 border border-red-200 line-through decoration-red-400">
                  {word.replace(/^[-*•\d.]+\s*/, '')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
