import React from 'react';
import { FileText, Github, Linkedin, Twitter, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    // Applied glass-card style for consistency with the rest of the app
    <footer className="glass-card mt-12 border-t border-white/20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="flex items-center space-x-2 text-indigo-600 mb-4 hover:text-indigo-800 transition-colors">
              <FileText className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">ResuMate</span>
            </a>
            <p className="text-sm text-gray-600 leading-relaxed">
              Empowering job seekers with AI-driven resume analysis and building tools to land their dream jobs.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/upload" className="hover:text-indigo-600 transition-colors">Analyze Resume</a></li>
              <li><a href="/builder" className="hover:text-indigo-600 transition-colors">Resume Builder</a></li>
              <li><a href="/templates" className="hover:text-indigo-600 transition-colors">Templates Gallery</a></li>
            </ul>
          </div>

          {/* Resources Links (Placeholders) */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Career Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Interview Prep</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Resume Examples</a></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-indigo-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ResuMate. All rights reserved.</p>
          
          <p className="mt-4 md:mt-0 font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Built & Designed by Saurabh Yadav
          </p>

          <div className="flex items-center gap-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 mx-1" />
            <span>for job seekers everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};