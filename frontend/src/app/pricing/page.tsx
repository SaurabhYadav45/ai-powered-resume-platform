"use client";

import React from 'react';
import { CheckCircle, Star, Zap, Award, Users, Crown } from 'lucide-react';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan to optimize your resume and land your dream job. 
            All plans include our core AI analysis features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition-all hover:scale-105">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Free Plan</h2>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-600">/ forever</span>
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
                className="block w-full bg-gray-100 text-gray-900 text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Get Started Free
              </a>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 relative">
            <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 px-4 py-1 rounded-bl-lg font-bold">
              POPULAR
            </div>
            
            <div className="p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Pro Plan</h2>
                <Crown className="h-8 w-8 text-yellow-300" />
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-extrabold">$9.99</span>
                <span className="text-indigo-200">/ month</span>
              </div>
              
              <p className="text-indigo-100 mb-8">
                Advanced features for serious job seekers
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Everything in Free Plan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Advanced AI Analysis with Scoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unlimited Resume Analyses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>All Premium Templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cover Letter Generator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Industry-Specific Keywords</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Job Match Recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Resume Version History</span>
                </li>
              </ul>
              
              <a 
                href="/login" 
                className="block w-full bg-white text-indigo-600 text-center py-3 px-6 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Feature Comparison</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I switch plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a money-back guarantee?</h3>
              <p className="text-gray-600">We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I cancel my subscription?</h3>
              <p className="text-gray-600">You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;