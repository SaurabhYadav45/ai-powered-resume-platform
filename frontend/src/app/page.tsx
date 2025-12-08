"use client";

import { ArrowRight, Upload, CheckCircle, Star, Wand2, FileText, Briefcase, GraduationCap,Sparkles } from 'lucide-react';


/**
 * HomePage (Redesigned - Enhancv Style)
 * @description A focused, full-screen hero section with specific typography settings.
 * Uses standard CSS for font loading to avoid build resolution errors.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen font-sans overflow-hidden relative flex items-center justify-center">
       {/* Load Rubik Font via Standard CSS */}
       <style jsx global>{`
         @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap');
         
         .font-rubik {
           font-family: 'Rubik', sans-serif;
         }
       `}</style>

       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          {/* Main gradient is handled by globals.css body::before */}
       </div>

       {/* Content Wrapper - Centered Vertically */}
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* --- LEFT COLUMN: Text Content & CTAs --- */}
            <div className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0 z-10">
               
               {/* Main Headline with specific Rubik properties */}
               <h1 
                 className="font-rubik text-gray-900 tracking-normal"
                 style={{
                   fontSize: '58px',
                   lineHeight: '76px',
                   fontWeight: 500, // Medium
                 }}
               >
                 Land Your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">Dream Job</span> with an <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">AI-Powered</span> Resume Review
               </h1>

               {/* Description Text with specific properties */}
               <p 
                 className="font-rubik text-gray-600 max-w-lg mx-auto lg:mx-0"
                 style={{
                    fontSize: '16px',
                    lineHeight: '25.6px',
                    fontWeight: 400, // Regular
                 }}
               >
                 ATS Check, AI Writer, and One-Click Job Tailoring make your resume stand out to recruiters. Stop guessing and start getting hired.
               </p>

               {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                 <a
                   href="/builder"
                   className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500"
                 >
                   Build Your Resume
                 </a>
                 <a
                   href="/upload"
                   className="w-full sm:w-auto px-8 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-500 text-gray-800 text-lg font-bold rounded-xl shadow-sm hover:bg-white hover:border-gray-400 transition-all duration-300 flex items-center justify-center"
                 >
                   Get Your Resume Score
                 </a>
               </div>

               {/* Reviews / Social Proof */}
               <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex text-green-500">
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                     <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="font-medium">4,997 Reviews</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>28,452 users landed interviews last month</span>
               </div>
            </div>

            {/* --- RIGHT COLUMN: Visuals --- */}
            <div className="relative z-0 hidden lg:block perspective-1000 group h-[600px] w-full max-w-lg mx-auto cursor-pointer">
               {/* Decorative Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

               {/* The Flip Container */}
               <div className="flip-card-inner relative w-full h-full transition-transform duration-1000 transform-style-3d">
                  
                  {/* --- FRONT SIDE: The "Draft" Resume Image --- */}
                  <div className="absolute w-full h-full backface-hidden">
                     <div className="glass-card rounded-2xl p-2 shadow-2xl border border-white/40 h-full">
                        <div className="bg-white/95 rounded-xl h-full w-full flex flex-col relative overflow-hidden shadow-inner opacity-90">
                           <img 
                             src="./heroImg1.webp"
                             alt="Draft Resume" 
                             className="w-full h-full object-cover rounded-xl"
                           />
                           {/* Hint Badge */}
                           <div className="absolute bottom-8 right-8 bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce">
                              <Wand2 className="w-5 h-5 text-indigo-600" />
                              <div className="text-xs font-bold text-gray-800">Hover to Optimize</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* --- BACK SIDE: The "Hired" Resume Image --- */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                     <div className="glass-card rounded-2xl p-2 shadow-2xl border border-indigo-200 h-full">
                        <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-xl h-full w-full flex flex-col relative overflow-hidden shadow-inner">
                           <img 
                             src="./heroImg3.webp" 
                             alt="Hired Resume" 
                             className="w-full h-full object-cover rounded-xl"
                           />
                           {/* Floating 'Optimized' Badge */}
                           <div className="absolute bottom-8 right-8 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              <span className="text-sm font-bold">100% Optimized</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
       </div>
    </main>
  );
}




// "use client";

// // REMOVED: import Link from 'next/link'; to avoid build resolution errors
// import { ArrowRight, Upload, CheckCircle, Star, Wand2, FileText } from 'lucide-react';

// /**
//  * HomePage (Redesigned)
//  * @description A modern, split-layout landing page inspired by Enhancv structure,
//  * keeping the project's existing theme and glassmorphism styles.
//  */
// export default function HomePage() {
//   return (
//     <main className="min-h-screen font-sans overflow-hidden relative">
//        {/* Content Wrapper */}
//        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-24 lg:pb-24">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

//             {/* --- LEFT COLUMN: Text Content & CTAs --- */}
//             <div className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0 z-10">
//                {/* Trust Badge */}
//                <div className="inline-flex items-center space-x-2 bg-white/40 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-900 w-fit mx-auto lg:mx-0 shadow-sm">
//                   <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
//                   <span>AI-Powered Resume Optimization</span>
//                </div>

//                {/* Main Headline */}
//                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
//                  Land Your <br className="hidden lg:block" />
//                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">Dream Job</span>
//                  <br /> Faster.
//                </h1>

//                {/* Subheadline */}
//                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0">
//                  Stop guessing. Get instant, data-driven feedback on your resume or build a perfect one from scratch. Tailored to beat the ATS and impress recruiters.
//                </p>

//                {/* Action Buttons */}
//                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
//                  {/* Replaced Link with a tag */}
//                  <a
//                    href="/upload"
//                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
//                  >
//                    <Upload className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
//                    Analyze Resume
//                  </a>
//                  {/* Replaced Link with a tag */}
//                  <a
//                    href="/builder"
//                    className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm border border-white/50 text-indigo-900 text-lg font-bold rounded-xl shadow-md hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center group"
//                  >
//                    <Wand2 className="w-5 h-5 mr-2 text-purple-600 group-hover:rotate-12 transition-transform" />
//                    Build New
//                  </a>
//                </div>

//                {/* Social Proof */}
//                <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <div className="flex -space-x-3">
//                        {[1,2,3,4].map(i => (
//                          <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gray-200 shadow-sm" style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`, backgroundSize: 'cover'}}></div>
//                        ))}
//                     </div>
//                     <span className="ml-2">Trusted by 10k+ candidates</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-indigo-900">
//                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                      <span className="font-bold">4.9/5 Rating</span>
//                   </div>
//                </div>
//             </div>

//             {/* --- RIGHT COLUMN: Dynamic Visuals --- */}
//             <div className="relative z-0 hidden lg:block perspective-1000">
//                {/* Decorative Glow */}
//                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

//                {/* Main Glass Card - Abstract Dashboard View */}
//                <div className="glass-card rounded-2xl p-2 transform rotate-y-12 rotate-z-2 hover:rotate-0 transition-transform duration-700 shadow-2xl border border-white/40 max-w-md mx-auto">
//                   <div className="bg-white/90 rounded-xl p-6 h-[450px] w-full flex flex-col gap-5 overflow-hidden shadow-inner">
//                      {/* Mock UI Elements */}
//                      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
//                         <div className="h-4 w-24 bg-gray-200 rounded"></div>
//                         <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold">JD</div>
//                      </div>
                     
//                      <div className="flex gap-4">
//                         <div className="flex-1 bg-indigo-50 rounded-lg border border-indigo-100 p-4 flex flex-col items-center justify-center gap-2">
//                            <div className="text-3xl font-bold text-indigo-600">88%</div>
//                            <div className="text-xs text-indigo-800 font-semibold uppercase">Match Score</div>
//                         </div>
//                         <div className="flex-1 bg-green-50 rounded-lg border border-green-100 p-4 flex flex-col items-center justify-center gap-2">
//                            <div className="text-3xl font-bold text-green-600">A+</div>
//                            <div className="text-xs text-green-800 font-semibold uppercase">Impact</div>
//                         </div>
//                      </div>

//                      <div className="space-y-3 mt-2">
//                         <div className="h-2 bg-gray-100 rounded w-3/4"></div>
//                         <div className="h-2 bg-gray-100 rounded w-full"></div>
//                         <div className="h-2 bg-gray-100 rounded w-5/6"></div>
//                         <div className="h-2 bg-gray-100 rounded w-1/2"></div>
//                      </div>

//                      <div className="mt-auto bg-gray-50 p-4 rounded-lg border border-gray-100">
//                         <div className="flex items-center gap-2 mb-2">
//                            <CheckCircle className="w-4 h-4 text-green-500" />
//                            <span className="text-xs font-bold text-gray-700">AI Suggestion</span>
//                         </div>
//                         <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
//                         <div className="h-2 bg-gray-200 rounded w-2/3"></div>
//                      </div>
//                   </div>
//                </div>

//                {/* Floating Widget 1 */}
//                <div className="absolute top-10 -right-4 glass-card p-4 rounded-xl shadow-xl border border-white/60 animate-[bounce_4s_infinite]">
//                   <div className="flex items-center gap-3">
//                      <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
//                      <div>
//                         <p className="text-xs text-gray-500 font-medium">ATS Check</p>
//                         <p className="text-sm font-bold text-gray-800">Passed</p>
//                      </div>
//                   </div>
//                </div>

//                 {/* Floating Widget 2 */}
//                <div className="absolute bottom-20 -left-8 glass-card p-4 rounded-xl shadow-xl border border-white/60 animate-[bounce_5s_infinite]">
//                   <div className="flex items-center gap-3">
//                      <div className="p-2 bg-purple-100 rounded-lg"><FileText className="w-5 h-5 text-purple-600" /></div>
//                      <div>
//                         <p className="text-xs text-gray-500 font-medium">Keywords</p>
//                         <p className="text-sm font-bold text-gray-800">Optimized</p>
//                      </div>
//                   </div>
//                </div>
//             </div>
//           </div>
//        </div>

//        {/* --- FEATURES STRIP --- */}
//        <div className="container mx-auto px-4 pb-20">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
//              {[
//                { icon: <Upload className="w-6 h-6 text-indigo-600" />, title: "Upload & Analyze", desc: "Instant feedback on your resume's weak spots." },
//                { icon: <Wand2 className="w-6 h-6 text-purple-600" />, title: "AI Builder", desc: "Build a professional resume from scratch with AI." },
//                { icon: <CheckCircle className="w-6 h-6 text-pink-600" />, title: "Cover Letters", desc: "Generate tailored cover letters in seconds." }
//              ].map((feature, i) => (
//                <div key={i} className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-default border border-white/30 shadow-sm hover:shadow-md">
//                   <div className="h-12 w-12 bg-white/60 rounded-xl flex items-center justify-center mb-4 shadow-sm">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
//                   <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
//                </div>
//              ))}
//           </div>
//        </div>
//     </main>
//   );
// }




// "use client";

// import { ArrowRight } from 'lucide-react';

// /**
//  * HomePage (with Gradient Text)
//  * @description The main landing page for the application, now with a styled, eye-catching heading.
//  */
// export default function HomePage() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center p-8">
//       <div className="w-full md:max-w-3xl">
//         <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
//           Land Your 
//           {/* Add the gradient span for "Dream Job" */}
//           <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text"> Dream Job </span> 
//           with an 
//           {/* Add the gradient span for "AI-Powered" */}
//           <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"> AI-Powered </span> 
//           Resume Review
//         </h1>
//         <p className="mt-6 text-lg text-gray-600">
//           Upload your resume and get instant, data-driven feedback on skills, formatting, and keywords to stand out to recruiters.
//         </p>
//         <div className="mt-10">
//           <a 
//             href="/upload" 
//             className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-500 "
//           >
//             Get Started
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </a>

//           {/* <a 
//             href="/login" 
//             className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500"
//           >
//             Login
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </a> */}
//         </div>
//       </div>
//     </main>
//   );
// }
