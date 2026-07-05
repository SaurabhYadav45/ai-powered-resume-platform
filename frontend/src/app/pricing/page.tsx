"use client";

import React, { useState } from 'react';
import { CheckCircle, Star, Crown, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { Rubik } from 'next/font/google';

// Load Rubik font
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-rubik',
});

const PricingPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period."
    },
    {
      question: "Are the templates ATS-friendly?",
      answer: "Yes, all our templates are rigorously tested to ensure they pass Applicant Tracking Systems (ATS) while remaining visually appealing to recruiters."
    },
    {
      question: "What if I need help building my resume?",
      answer: "Our AI provides step-by-step guidance. With the Pro or Lifetime plans, you also get tailored industry-specific keywords and job match recommendations to maximize your chances."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl tracking-tight font-rubik text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mt-4">
            Choose the perfect plan to optimize your resume and land your dream job. 
            All plans include our core AI analysis features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto content-glow items-stretch">
          
          {/* Free Plan */}
          <div className="rounded-2xl shadow-lg border border-gray-200 transform transition-all hover:-translate-y-1 hover:shadow-xl glass-card-purple flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Free</h2>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              
              <div className="mb-4">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-sm text-gray-500 font-medium ml-1">/ forever</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-6 min-h-[40px]">
                Perfect for getting started with basic resume optimization.
              </p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Basic AI Resume Analysis',
                  'ATS Compatibility Check',
                  'Single Resume Analysis',
                  'Standard Templates',
                  'PDF Export'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="/upload" 
                className="block w-full bg-black text-white text-center py-2.5 px-4 rounded-xl text-sm font-semibold  transition-colors"
              >
                Get Started Free
              </a>
            </div>
          </div>

          {/* Pro Plan (Monthly) */}
          <div className="group relative rounded-2xl p-[2px] overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col">
            {/* Permanent Moving Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-100 animate-spin-slow"></div>
            
            {/* Glass Card Content */}
            <div className="relative h-full glass-card rounded-2xl shadow-xl overflow-hidden flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Pro</h2>
                  <div className="flex items-center gap-3">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded text-xs font-bold tracking-wider shadow-sm">
                      POPULAR
                    </span>
                    <Crown className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                
                <div className="mb-4 flex items-end">
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">$1</span>
                  <span className="text-sm text-gray-500 font-medium ml-1 mb-1">/ year</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-6 min-h-[40px]">
                  Advanced tools and unlimited analyses for serious job seekers.
                </p>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    'Everything in Free',
                    'Advanced AI Scoring',
                    'Unlimited Analyses',
                    'Premium Templates',
                    'Industry Keywords',
                    'Job Match Recommendations',
                    'Version History'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => alert("Payment integration coming soon!")}
                  className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2.5 px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="rounded-2xl shadow-lg border border-gray-800 bg-gray-900 transform transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Lifetime</h2>
                <Sparkles className="h-6 w-6 text-pink-400" />
              </div>
              
              <div className="mb-4 flex items-end">
                <span className="text-4xl font-extrabold text-white">$5</span>
                <span className="text-sm text-gray-400 font-medium ml-1 mb-1">/ once</span>
              </div>
              
              <p className="text-sm text-gray-400 mb-6 min-h-[40px]">
                Pay once and enjoy all Pro features forever. Best value.
              </p>
              
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'All Pro Features',
                  'One-time Payment',
                  'Lifetime Updates',
                  'Priority Support',
                  'Exclusive Beta Access'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => alert("Payment integration coming soon!")}
                className="w-full cursor-pointer bg-white text-gray-900 text-center py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Lifetime Access
              </button>
            </div>
          </div>

        </div>

        {/* Trust Badge Section */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-green-50 border border-green-100 text-green-800 px-6 py-3 rounded-full shadow-sm">
            <ShieldCheck className="h-6 w-6 text-green-600" />
            <span className="font-medium text-sm">30-Day Money-Back Guarantee on all premium plans. No questions asked.</span>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Compare Features</h2>
          
          <div className="glass-card-purple rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-900 w-2/5">Features</th>
                    <th className="px-4 py-4 font-semibold text-gray-900 text-center">Free</th>
                    <th className="px-4 py-4 font-semibold text-indigo-700 text-center">Pro</th>
                    <th className="px-4 py-4 font-semibold text-gray-900 text-center">Lifetime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {[
                    { name: 'AI Resume Analysis', free: true, pro: true, life: true },
                    { name: 'ATS Compatibility', free: true, pro: true, life: true },
                    { name: 'Resume Builder', free: true, pro: true, life: true },
                    { name: 'Templates', free: 'Standard', pro: 'Premium', life: 'Premium' },
                    { name: 'PDF Export', free: true, pro: true, life: true },
                    { name: 'Unlimited Analyses', free: false, pro: true, life: true },
                    { name: 'Job Match Recommendations', free: false, pro: true, life: true },
                    { name: 'Priority Support', free: false, pro: false, life: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-3 text-gray-700 font-medium">{row.name}</td>
                      <td className="px-4 py-3 text-center">
                        {typeof row.free === 'boolean' 
                          ? (row.free ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <span className="text-gray-300">-</span>)
                          : <span className="text-gray-600 text-xs">{row.free}</span>}
                      </td>
                      <td className="px-4 py-3 text-center bg-indigo-50/30">
                        {typeof row.pro === 'boolean' 
                          ? (row.pro ? <CheckCircle className="h-4 w-4 text-indigo-500 mx-auto" /> : <span className="text-gray-300">-</span>)
                          : <span className="text-indigo-700 text-xs font-medium">{row.pro}</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {typeof row.life === 'boolean' 
                          ? (row.life ? <CheckCircle className="h-4 w-4 text-pink-500 mx-auto" /> : <span className="text-gray-300">-</span>)
                          : <span className="text-gray-900 text-xs font-medium">{row.life}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="glass-card-purple rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-800">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS for Spinning Gradient */}
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
      `}</style>
    </div>
  );
};

export default PricingPage;