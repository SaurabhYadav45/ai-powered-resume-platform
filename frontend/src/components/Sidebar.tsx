"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  PenTool, 
  History, 
  Settings,
  LogOut,
  Menu,
  X,
  Crown
} from 'lucide-react';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Resume', href: '/upload', icon: FileText },
    { name: 'Resume Builder', href: '/builder', icon: PenTool },
    { name: 'Pricing', href: '/pricing', icon: Crown },
  ];

  const handleLogout = () => {
    Cookies.remove('authToken');
    window.location.href = '/login';
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 glass-card rounded-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        glass-card-purple m-4 rounded-2xl p-6 flex flex-col h-[700px] max-h-[85vh]
      `}>
        {/* <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
            R
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            CraftAI
          </span>
        </div> */}

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
            
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-white/60 text-purple-700 shadow-sm font-semibold' 
                    : 'text-gray-600 hover:bg-white/40 hover:text-purple-600'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 pt-6 border-t border-white/30">
          <button 
            onClick={() => alert("Settings coming soon! This will include: Name, Profile Picture, Forgot Password, Delete Account, and Email Verification.")}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-white/40 hover:text-purple-600 transition-all duration-300 relative"
          >
            <Settings size={20} />
            <span>Settings</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-wider text-white bg-purple-500/80 px-2 py-0.5 rounded-full">
              Soon
            </span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:shadow-sm transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
