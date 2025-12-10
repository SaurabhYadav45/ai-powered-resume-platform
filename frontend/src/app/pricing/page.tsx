"use client";

import React from 'react';
import { CheckCircle, Star, Zap, Award, Users, Crown } from 'lucide-react';

import { Rubik } from 'next/font/google';

// Load Rubik font
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-rubik',
});


const PricingPage = () => {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl tracking-tight font-rubik">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Choose the perfect plan to optimize your resume and land your dream job. 
            All plans include our core AI analysis features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-4xl mx-auto content-glow">
          {/* Free Plan with Glassmorphism and Subtle Gradient */}
          <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition-all hover:scale-105 glass-card-purple ">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Free Plan</h2>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-600">/ forever</span>y
              </div>
              
              <p className="text-gray-600 mb-8">
                Perfect for getting started with resume optimization
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Basic AI Resume Analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">ATS Compatibility Check</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Single Resume Analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Standard Templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">PDF Export</span>
                </li>
              </ul>
              
              <a 
                href="/upload" 
                className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-gray-100 text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Get Started Free
              </a>
            </div>
          </div>

          {/* Pro Plan with Permanent Moving Gradient and Glassmorphism */}
          <div className="group relative rounded-2xl p-[3px] overflow-hidden transform transition-all hover:scale-105">
            {/* Permanent Moving Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-100 animate-spin-slow"></div>
            
            {/* Glass Card Content (without subtle gradient) */}
            <div className="relative h-full glass-card rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 px-4 py-1 rounded-bl-lg font-bold">
                POPULAR
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pro Plan</h2>
                  <Crown className="h-8 w-8 text-yellow-400" />
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">$1.0</span>
                  <span className="text-gray-600">/ month</span>
                </div>
                
                <p className="text-gray-600 mb-8">
                  Advanced features for serious job seekers
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Everything in Free Plan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Advanced AI Analysis with Scoring</span>
                  </li>
                  {/* <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited Resume Analyses</span>
                  </li> */}
                  {/* <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">All Premium Templates</span>
                  </li> */}
                  {/* <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Cover Letter Generator</span>
                  </li> */}
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Industry-Specific Keywords</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Job Match Recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Resume Version History</span>
                  </li>
                </ul>
                
                <a 
                  href="/login" 
                  className="block w-full bg-gray-900 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Comparison with Glassmorphism and Subtle Gradient */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Feature Comparison</h2>
          
          <div className="glass-card-purple rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              <div className="p-6 border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-4">
                  <li className="text-gray-700">AI Resume Analysis</li>
                  <li className="text-gray-700">ATS Compatibility</li>
                  <li className="text-gray-700">Resume Builder</li>
                  <li className="text-gray-700">Templates</li>
                  <li className="text-gray-700">PDF Export</li>
                  <li className="text-gray-700">Cover Letter Generator</li>
                  <li className="text-gray-700">Unlimited Analyses</li>
                  <li className="text-gray-700">Version History</li>
                  <li className="text-gray-700">Job Match Recommendations</li>
                </ul>
              </div>
              
              <div className="p-6 border-r border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Plan</h3>
                <ul className="space-y-4">
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><span className="text-gray-400">-</span></li>
                  <li><span className="text-gray-400">Limited (1)</span></li>
                  <li><span className="text-gray-400">-</span></li>
                  <li><span className="text-gray-400">-</span></li>
                </ul>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pro Plan</h3>
                <ul className="space-y-4">
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                  <li><CheckCircle className="h-5 w-5 text-green-500 inline mr-2" /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section with Glassmorphism and Subtle Gradient */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="glass-card-purple p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I switch plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div className="glass-card-purple p-6 rounded-xl shadow-sm ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a money-back guarantee?</h3>
              <p className="text-gray-600">We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.</p>
            </div>
            
            <div className="glass-card-purple p-6 rounded-xl shadow-sm ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I cancel my subscription?</h3>
              <p className="text-gray-600">You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for Spinning Gradient and Subtle Background */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
          width: 150%; 
          height: 150%;
          left: -25%;
          top: -25%;
        }
        
        .subtle-gradient-bg {
          background: radial-gradient(circle at top left, rgba(121, 106, 255, 0.1), transparent 40%),
                      radial-gradient(circle at bottom right, rgba(0, 255, 255, 0.1), transparent 40%);
          background-size: cover;
        }
      `}</style>
    </div>
  );
};

export default PricingPage;