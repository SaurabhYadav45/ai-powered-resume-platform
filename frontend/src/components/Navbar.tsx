"use client";

import React, { useState } from 'react';
import { FileText, LogOut, History, Menu, X, Brain, FilePen,LayoutTemplate, LogIn, IndianRupee, Sun, Moon, LayoutDashboard, Crown, ChevronDown, User, ArrowRight, Home } from 'lucide-react';
// Corrected relative path to ensure the module is found
import { useAuth } from '../hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Navbar Component (with Glassmorphism & Builder Link)
 * @description A responsive navigation bar with a frosted glass effect and links to Analyze, Builder, and History.
 */
export const Navbar = () => {
  const { isLoggedIn, logout, userEmail, userName, isPro } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard = pathname === '/dashboard';
  const isUpload = pathname === '/upload';
  const isBuilder = pathname === '/builder';
  const isTemplates = pathname === '/templates';
  const isPricing = pathname === '/pricing';

  const getDesktopLinkClass = (isActive: boolean) => 
    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-purple-200 text-purple-800' : 'text-gray-700 hover:bg-purple-200'
    }`;

  const getMobileLinkClass = (isActive: boolean) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive ? 'bg-purple-200 text-purple-800' : 'text-gray-700 hover:bg-purple-200'
    }`;

  return (
    <nav className="glass-card sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors">
              <FileText className="h-8 w-8" />
              <span className="text-xl md:text-2xl font-bold tracking-tight">ResuMate</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-between flex-1">
            {/* Center Navigation Items */}
            <div className="flex items-center justify-center space-x-4 flex-1">
              <a href="/" className={getDesktopLinkClass(pathname === '/')}>
                <Home className="mr-2 h-4 w-4" /> Home
              </a>
              <a href="/upload" className={getDesktopLinkClass(isUpload)}>
                <Brain className="mr-2 h-4 w-4" /> Analyze
              </a>
              {/* NEW: Builder Link */}
              <a href="/builder" className={getDesktopLinkClass(isBuilder)}>
                <FilePen className="mr-2 h-4 w-4" /> Builder
              </a>
              <a href="/templates" className={getDesktopLinkClass(isTemplates)}>
                <LayoutTemplate className="mr-2 h-4 w-4" /> Templates
              </a>
              <a href="/pricing" className={getDesktopLinkClass(isPricing)}>
                <IndianRupee className="mr-2 h-4 w-4" /> Pricing
              </a>
            </div>

            {/* Right-aligned Auth Items */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={() => alert("Dark/Light mode coming soon in the next version!")}
                    className="text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-purple-100 cursor-pointer"
                  >
                    <Sun className="h-5 w-5" />
                  </button>
                  {!isPro && (
                    <a href="/pricing" className="flex items-center text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
                      <Crown className="mr-2 h-4 w-4" /> Upgrade
                    </a>
                  )}
                  
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <div 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-200 to-pink-200 border-2 border-white shadow-sm flex items-center justify-center text-xl cursor-pointer hover:scale-105 transition-transform"
                    >
                      🦊
                    </div>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 py-2 z-50">
                        <button 
                          onClick={() => setIsDropdownOpen(false)}
                          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="px-4 py-3 border-b border-gray-100 pr-8">
                          <p className="text-sm font-semibold text-gray-800">{userName || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{userEmail || 'user@example.com'}</p>
                        </div>
                        
                        <div className="py-1">
                          <a 
                            href="/dashboard" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isDashboard) {
                                router.push('/dashboard');
                              }
                              setIsDropdownOpen(false);
                            }}
                            className={`flex items-center px-4 py-2 text-sm transition-colors ${
                              isDashboard 
                                ? 'bg-purple-100 text-purple-800 font-semibold border-l-4 border-purple-500' 
                                : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700 border-l-4 border-transparent'
                            }`}
                          >
                            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                          </a>
                          <a href="/pricing" className="flex items-center px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 transition-colors">
                            <Crown className="mr-2 h-4 w-4" /> Upgrade to Premium
                          </a>
                          <button 
                            onClick={logout}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <a href="/login" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Hamburger Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-purple-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/20">
          <a href="/" className={getMobileLinkClass(pathname === '/')}>
            Home
          </a>
          <a href="/upload" className={getMobileLinkClass(isUpload)}>
            Analyze
          </a>
          <a href="/builder" className={getMobileLinkClass(isBuilder)}>
            Builder
          </a>
          {/* NEW: Templates Link */}
          <a href="/templates" className={getMobileLinkClass(isTemplates)}>
            Templates
          </a>
          <a href="/pricing" className={getMobileLinkClass(isPricing)}>
            Pricing
          </a>
          
          {isLoggedIn ? (
            <>
              {!isPro && (
                <a href="/pricing" className="flex items-center text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-md text-base font-medium">
                  <Crown className="mr-2 h-5 w-5" /> Upgrade
                </a>
              )}
              <div className="px-3 py-2 border-t border-b border-white/20 my-2">
                <p className="text-sm font-semibold text-gray-800">{userName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail || 'user@example.com'}</p>
              </div>
              <a 
                href="/dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isDashboard) {
                    router.push('/dashboard');
                  }
                  setIsMenuOpen(false);
                }}
                className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isDashboard 
                    ? 'bg-purple-200 text-purple-900 border-l-4 border-purple-600' 
                    : 'text-gray-700 hover:bg-purple-200 border-l-4 border-transparent'
                }`}
              >
                <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
              </a>
              <button onClick={logout} className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 transition-colors rounded-md">
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </button>
            </>
          ) : (
            <a href="/login" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:bg-purple-600 flex items-center justify-center px-3 py-2 rounded-md text-base font-medium">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};