import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-transparent relative z-10 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto h-screen p-4 md:p-8">
        {/* We can place a Topbar here if needed, or just let pages handle their own headers */}
        {children}
      </div>
    </div>
  );
}
