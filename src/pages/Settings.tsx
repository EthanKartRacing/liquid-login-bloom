
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Upload,
  Trash2,
  HelpCircle,
  Mail,
  Star,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Globe,
  Lock,
  Eye,
  Database
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    sessions: true,
    maintenance: true,
    weather: false,
    social: true
  });
  const [darkMode, setDarkMode] = useState(true);
  const [units, setUnits] = useState('metric');
  const [language, setLanguage] = useState('en');

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <AppLayout title="Settings">
      <div className="space-y-6 animate-fade-in">
        {/* Profile Section */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">John Racer</h2>
              <p className="text-white/60 text-sm">Professional Driver • Sydney, NSW</p>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-400 text-sm font-medium">4.8 Rating</span>
              </div>
            </div>
            <button className="ios-button-glass">
              <span>Edit Profile</span>
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-lg font-bold text-white">47</div>
              <div className="text-white/60 text-xs">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">0:58.91</div>
              <div className="text-white/60 text-xs">Best Lap</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">8</div>
              <div className="text-white/60 text-xs">Tracks</div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  {darkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-yellow-400" />}
                </div>
                <div>
                  <div className="text-white font-medium">Theme</div>
                  <div className="text-white/60 text-sm">Dark mode enabled</div>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-blue-500' : 'bg-white/20'
                } relative`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Units</div>
                  <div className="text-white/60 text-sm">Metric system</div>
                </div>
              </div>
              <select 
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="glass-card px-3 py-1 rounded-lg bg-white/5 text-white text-sm border-0"
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Language</div>
                  <div className="text-white/60 text-sm">English (Australia)</div>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="glass-card px-3 py-1 rounded-lg bg-white/5 text-white text-sm border-0"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Bell className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium capitalize">
                      {key === 'sessions' ? 'Session Reminders' :
                       key === 'maintenance' ? 'Maintenance Alerts' :
                       key === 'weather' ? 'Weather Updates' : 'Social Activity'}
                    </div>
                    <div className="text-white/60 text-sm">
                      {key === 'sessions' ? 'Get notified about upcoming sessions' :
                       key === 'maintenance' ? 'Kart maintenance reminders' :
                       key === 'weather' ? 'Track weather conditions' : 'Friend activity updates'}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleNotificationChange(key)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    enabled ? 'bg-green-500' : 'bg-white/20'
                  } relative`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                    enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Data & Privacy
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-3 px-4 glass-card hover-lift">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="text-white font-medium">Export Data</div>
                  <div className="text-white/60 text-sm">Download your session data</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button className="w-full flex items-center justify-between py-3 px-4 glass-card hover-lift">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-green-400" />
                <div className="text-left">
                  <div className="text-white font-medium">Privacy Settings</div>
                  <div className="text-white/60 text-sm">Manage data sharing preferences</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button className="w-full flex items-center justify-between py-3 px-4 glass-card hover-lift">
              <div className="flex items-center space-x-3">
                <Trash2 className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <div className="text-white font-medium">Delete Account</div>
                  <div className="text-white/60 text-sm">Permanently remove your data</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Support
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-3 px-4 glass-card hover-lift">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <div className="text-left">
                  <div className="text-white font-medium">Help Center</div>
                  <div className="text-white/60 text-sm">FAQs and tutorials</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button className="w-full flex items-center justify-between py-3 px-4 glass-card hover-lift">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <div className="text-white font-medium">Contact Support</div>
                  <div className="text-white/60 text-sm">Get help from our team</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>

            <button className="w-full flex items-center justify-between py-3 px-4 glass-card hover-lift">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <div className="text-left">
                  <div className="text-white font-medium">Rate KartMate</div>
                  <div className="text-white/60 text-sm">Help us improve the app</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="glass-card p-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
              <div className="text-white font-bold">KM</div>
            </div>
            <div>
              <div className="text-white font-medium">KartMate</div>
              <div className="text-white/60 text-sm">Version 1.0.0 (Beta)</div>
            </div>
            <div className="pt-2 border-t border-white/10">
              <p className="text-white/60 text-xs">
                Made with ❤️ for the Australian karting community
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
