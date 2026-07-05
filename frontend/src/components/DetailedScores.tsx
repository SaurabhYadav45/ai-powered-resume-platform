"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalysisResult } from '../types';

interface DetailedScoresProps {
  analysis: AnalysisResult;
}

export const DetailedScores = ({ analysis }: DetailedScoresProps) => {
  const scoreData = [
    { name: 'ATS Score', score: analysis.atsScore || 0 },
    { name: 'Impact', score: analysis.impactScore || 0 },
    { name: 'Action Verbs', score: analysis.actionVerbsScore || 0 },
    { name: 'Relevance', score: analysis.contentRelevance || 0 },
    { name: 'Length', score: analysis.lengthScore || 0 },
    { name: 'Metrics Usage', score: analysis.quantificationScore || 0 },
    { name: 'Readability', score: analysis.readabilityScore || 0 },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Detailed Scores</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={scoreData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              angle={-45} 
              textAnchor="end" 
              height={60}
            />
            <YAxis 
              stroke="#6b7280" 
              domain={[0, 100]}
              tickCount={6}
            />
            <Tooltip
              cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
              contentStyle={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
              }}
              formatter={(value) => [`${value}%`, 'Score']}
            />
            <Bar 
              dataKey="score" 
              name="Score" 
              radius={[4, 4, 0, 0]}
            >
              {scoreData.map((entry, index) => (
                <rect 
                  key={`bar-${index}`} 
                  fill={
                    entry.score >= 80 ? '#10B981' : 
                    entry.score >= 60 ? '#FBBF24' : 
                    '#EF4444'
                  } 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p className="text-center">
          Scores are color-coded: <span className="text-green-500 font-semibold">Green (80-100)</span> = Excellent, 
          <span className="text-yellow-500 font-semibold mx-1">Yellow (60-79)</span> = Good, 
          <span className="text-red-500 font-semibold ml-1">Red (0-59)</span> = Needs Improvement
        </p>
      </div>
    </div>
  );
};