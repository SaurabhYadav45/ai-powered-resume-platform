"use client";

import React from "react";
import { CheckCircle, AlertTriangle, FileText, Target, TrendingUp, List, Clock } from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  description?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, description }) => {
  // Determine color based on score
  const getColorClass = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Determine icon based on title
  const getIcon = () => {
    switch (title) {
      case "ATS Score":
        return <Target className="h-6 w-6 text-blue-800" />;
      case "Impact Score":
        return <TrendingUp className="h-6 w-6 text-purple-800" />;
      case "Action Verbs Score":
        return <List className="h-6 w-6 text-indigo-800" />;
      case "Content Relevance":
        return <FileText className="h-6 w-6 text-teal-800" />;
      case "Length Score":
        return <Clock className="h-6 w-6 text-pink-800" />;
      default:
        return <FileText className="h-6 w-6 text-gray-800" />;
    }
  };

  // Determine background color based on title
  const getBackgroundClass = () => {
    switch (title) {
      case "ATS Score":
        return "bg-blue-100";
      case "Impact Score":
        return "bg-purple-100";
      case "Action Verbs Score":
        return "bg-indigo-100";
      case "Content Relevance":
        return "bg-teal-100";
      case "Length Score":
        return "bg-pink-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-center">
      <div className="flex items-start space-x-4">
        <div className={`rounded-full p-3 ${getBackgroundClass()}`}>
          {getIcon()}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          <p className={`text-4xl font-extrabold ${getColorClass()}`}>
            {score}%
          </p>
          {description && (
            <p className="text-gray-600 mt-2 text-sm">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};