
import React from 'react';
import { Home, Clock, MapPin, Car, Users, Settings, Newspaper } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomTabBar = () => {
  const location = useLocation();

  const tabs = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Clock, label: 'Sessions', path: '/sessions' },
    { icon: MapPin, label: 'Tracks', path: '/tracks' },
    { icon: Car, label: 'Karts', path: '/karts' },
    { icon: Newspaper, label: 'News', path: '/news' },
    { icon: Users, label: 'Social', path: '/social' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-card-intense border-t border-white/20 rounded-t-3xl px-1 py-2">
        <div className="flex justify-around items-center">
          {tabs.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            
            return (
              <Link
                key={path}
                to={path}
                className={`nav-tab ${isActive ? 'nav-tab-active' : ''} min-w-0 flex-1`}
              >
                <div className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-br from-red-500/20 to-pink-500/20 shadow-racing' 
                    : 'hover:bg-white/5'
                }`}>
                  <Icon 
                    size={16} 
                    className={`mx-auto mb-1 ${
                      isActive ? 'text-red-400' : 'text-white/60'
                    }`} 
                  />
                  <span className={`text-xs font-medium block ${
                    isActive ? 'text-red-400' : 'text-white/60'
                  }`}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomTabBar;
