"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalysisResult } from '../types';

interface IndustryBenchmarkProps {
  analysis: AnalysisResult;
}

export const IndustryBenchmark: React.FC<IndustryBenchmarkProps> = ({ analysis }) => {
  // Prepare data for the comparison chart
  const comparisonData = [
    {
      name: 'Your Score',
      skillsMatch: analysis.skillsMatch,
      atsScore: analysis.atsScore,
      impact: analysis.impactScore,
    },
    {
      name: 'Industry Avg',
      skillsMatch: analysis.industryBenchmark.avgSkillsMatch,
      atsScore: analysis.industryBenchmark.avgAtsScore,
      impact: analysis.industryBenchmark.avgImpactScore,
    }
  ];

  // Determine if the candidate is above or below average
  const isAboveAverage = (candidateScore: number, benchmarkScore: number) => {
    return candidateScore >= benchmarkScore;
  };

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Industry Benchmark Comparison</h3>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#6b7280" />
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
            <Legend />
            <Bar 
              dataKey="skillsMatch" 
              name="Skills Match" 
              radius={[4, 4, 0, 0]}
              fill="#4f46e5"
            />
            <Bar 
              dataKey="atsScore" 
              name="ATS Score" 
              radius={[4, 4, 0, 0]}
              fill="#10b981"
            />
            <Bar 
              dataKey="impact" 
              name="Impact Score" 
              radius={[4, 4, 0, 0]}
              fill="#f59e0b"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/50 p-4 rounded-xl">
          <h4 className="font-semibold text-gray-800">Skills Match</h4>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-indigo-600">{analysis.skillsMatch}%</span>
            <span className={`ml-2 text-sm font-medium ${
              isAboveAverage(analysis.skillsMatch, analysis.industryBenchmark.avgSkillsMatch) 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {isAboveAverage(analysis.skillsMatch, analysis.industryBenchmark.avgSkillsMatch) ? 'Above' : 'Below'} Average
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Industry Avg: {analysis.industryBenchmark.avgSkillsMatch}%</p>
        </div>
        
        <div className="bg-white/50 p-4 rounded-xl">
          <h4 className="font-semibold text-gray-800">ATS Performance</h4>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-green-600">{analysis.atsScore}%</span>
            <span className={`ml-2 text-sm font-medium ${
              isAboveAverage(analysis.atsScore, analysis.industryBenchmark.avgAtsScore) 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {isAboveAverage(analysis.atsScore, analysis.industryBenchmark.avgAtsScore) ? 'Above' : 'Below'} Average
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Industry Avg: {analysis.industryBenchmark.avgAtsScore}%</p>
        </div>
        
        <div className="bg-white/50 p-4 rounded-xl">
          <h4 className="font-semibold text-gray-800">Impact</h4>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold text-yellow-600">{analysis.impactScore}%</span>
            <span className={`ml-2 text-sm font-medium ${
              isAboveAverage(analysis.impactScore, analysis.industryBenchmark.avgImpactScore) 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {isAboveAverage(analysis.impactScore, analysis.industryBenchmark.avgImpactScore) ? 'Above' : 'Below'} Average
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Industry Avg: {analysis.industryBenchmark.avgImpactScore}%</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold text-gray-800">Top Keywords in Your Industry</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {analysis.industryBenchmark.topKeywords.map((keyword, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};