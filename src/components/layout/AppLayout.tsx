
import React from 'react';
import BottomTabBar from './BottomTabBar';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  title,
  showBackButton = false 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      {title && (
        <header className="relative z-10 glass-card-intense border-b border-white/10">
          <div className="px-4 py-4 pt-safe">
            <div className="flex items-center justify-between">
              {showBackButton && (
                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h1 className="text-xl font-bold text-white flex-1 text-center">
                {title}
              </h1>
              {showBackButton && <div className="w-9" />}
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="relative z-10 pb-20 px-4 pt-4">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
};

export default AppLayout;
