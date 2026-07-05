"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, PenTool, ArrowRight, PlusCircle, LayoutDashboard, Crown, Sparkles, Loader, Inbox, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getHistory, getDraft } from '../../utils/api';
import { HistoryResponse } from '../../types/history';

export default function DashboardPage() {
  const { userName, isPro, credits } = useAuth();
  
  const [history, setHistory] = useState<HistoryResponse[]>([]);
  const [hasDraft, setHasDraft] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [historyData, draftData] = await Promise.all([
          getHistory().catch(() => []),
          getDraft().catch(() => null)
        ]);
        
        setHistory(historyData || []);
        if (draftData && draftData.data && draftData.data.personalInfo && draftData.data.personalInfo.fullName) {
          setHasDraft(true);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-rubik">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 py-4">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight font-rubik">
            Welcome <span className="font-rubik bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">{userName || 'User'}!</span> 
          </h1>
          <p className="text-sm text-gray-600 font-medium">Embark on the journey to define your professional legacy.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/builder" className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <PlusCircle size={20} />
            New Resume
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Plan Card */}
        <div className="glass-card-purple rounded-3xl p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
              <Crown className="text-yellow-500" size={24}/> Current Plan
            </h3>
          </div>
          <div className="mb-4">
            <span className="text-2xl font-bold text-gray-900">{isPro ? 'Pro' : 'Free'}</span>
          </div>
          {!isPro && (
            <Link href="/pricing" className="text-xs font-medium text-purple-600 flex items-center gap-1 group-hover:text-purple-700 transition-colors">
              Upgrade for unlimited access <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* AI Analyses Card */}
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
              <Sparkles className="text-indigo-500" size={24}/> AI Analyses
            </h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-indigo-600">{isPro ? 'Unlimited' : credits}</span>
            {!isPro && <span className="text-sm text-gray-500 font-medium mb-1">/ 5 remaining</span>}
          </div>
          {!isPro && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: `${(credits / 5) * 100}%`}}></div>
            </div>
          )}
        </div>

        {/* Saved Resumes Card */}
        <div className="glass-card rounded-3xl p-6 relative overflow-hidden hover:shadow-xl transition-all duration-300">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="text-pink-500" size={24}/> Saved Drafts
            </h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-pink-600">{hasDraft ? 1 : 0}</span>
            <span className="text-sm text-gray-500 font-medium mb-1">drafts</span>
          </div>
          {hasDraft && (
            <Link href="/builder" className="text-xs font-medium text-pink-600 flex items-center gap-1 hover:text-pink-700 transition-colors">
              Continue editing <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Builder Action */}
        <div className="glass-card-purple rounded-3xl p-8 flex flex-col items-start hover:shadow-xl transition-all duration-300 border border-purple-100 group">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <PenTool className="text-purple-600" size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{hasDraft ? 'Continue Building' : 'Build New Resume'}</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">Design a meticulously tailored, recruiter-ready profile that highlights your true potential and bypasses automated filters with ease.</p>
          <Link href="/builder" className="mt-auto w-full text-center bg-white text-purple-700 text-sm font-semibold py-2 px-4 rounded-xl border border-purple-200 hover:bg-purple-50 transition-colors shadow-sm">
            {hasDraft ? 'Resume Draft' : 'Start Building'}
          </Link>
        </div>

        {/* Analyzer Action */}
        <div className="glass-card-blue rounded-3xl p-8 flex flex-col items-start hover:shadow-xl transition-all duration-300 border border-blue-100 group">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <LayoutDashboard className="text-blue-600" size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Analyze Your Resume</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">Instantly uncover hidden weaknesses and unlock personalized, data-driven insights to elevate your application to the top of the pile.</p>
          <Link href="/upload" className="mt-auto w-full text-center bg-white text-blue-700 text-sm font-semibold py-2 px-4 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm">
            Analyze Now
          </Link>
        </div>

      </div>

      {/* Resumes List Section */}
      <div className="glass-card rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">Analysis History</h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-white/30">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Inbox className="text-gray-300" size={40} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No history found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">You haven't analyzed any resumes yet. Start by uploading one!</p>
            <Link href="/upload" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm px-8 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Analyze a Resume
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item._id} className="bg-white/50 p-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.fileName}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 text-green-600"><CheckCircle size={14} /> Analyzed successfully</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Skills Match</p>
                    <p className={`text-2xl font-bold ${item.analysisResult.skillsMatch >= 80 ? 'text-green-500' : item.analysisResult.skillsMatch >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {item.analysisResult.skillsMatch}%
                    </p>
                  </div>
                  <Link href={`/upload?historyId=${item._id}`} className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-indigo-600">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
