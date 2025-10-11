"use client";

import React from "react";
import { CheckCircle, AlertTriangle, FileText } from "lucide-react";

// Define a type for suggestion objects
interface SuggestionObject {
  area: string;
  suggestion: string;
}

// Simplify allowed content types
type ContentType = string | string[] | SuggestionObject[];

// Props definition
interface ResultCardProps {
  title: string;
  content: ContentType;
}

// Map for icons and colors
const cardStyles: Record<
  string,
  { icon: React.ReactNode; color: string }
> = {
  "Formatting Feedback": {
    icon: <FileText className="h-6 w-6 text-yellow-800" />,
    color: "bg-yellow-100",
  },
  "Improvement Suggestions": {
    icon: <CheckCircle className="h-6 w-6 text-green-800" />,
    color: "bg-green-100",
  },
  "Missing Skills": {
    icon: <AlertTriangle className="h-6 w-6 text-red-800" />,
    color: "bg-red-100",
  },
};

export const ResultCard: React.FC<ResultCardProps> = ({ title, content }) => {
  // Special case: Skills Match card (numeric display)
  if (title === "Skills Match" && typeof content === "string") {
    const score = parseInt(content, 10) || 0;
    return (
      <div className="glass-card p-6 text-center rounded-2xl h-full flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Skills Match</h3>
        <p
          className={`text-7xl font-extrabold ${
            score > 80 ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {content}
        </p>
        <p className="text-gray-600 mt-2">
          Based on the provided job description.
        </p>
      </div>
    );
  }

  const style = cardStyles[title] || {
    icon: <FileText className="h-6 w-6 text-gray-800" />,
    color: "bg-gray-100",
  };

  // ✅ Function to safely render any content type
  const renderContent = (): React.ReactNode => {
    if (typeof content === "string") {
      return <p className="text-gray-600">{content}</p>;
    }

    if (Array.isArray(content)) {
      // Handle array of strings
      if (typeof content[0] === "string") {
        return (
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {(content as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      }

      // Handle array of SuggestionObjects
      if (
        typeof content[0] === "object" &&
        content[0] !== null &&
        "suggestion" in (content[0] as SuggestionObject)
      ) {
        return (
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {(content as SuggestionObject[]).map((item, index) => (
              <li key={index}>{item.suggestion}</li>
            ))}
          </ul>
        );
      }
    }

    return null;
  };

  // ✅ Rendered card structure
  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-start space-x-4">
        <div className={`rounded-full p-3 ${style.color}`}>{style.icon}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
