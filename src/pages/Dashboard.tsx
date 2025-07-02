
import React from 'react';
import { Clock, Zap, Trophy, Plus, TrendingUp, MapPin } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';

const Dashboard = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';
  
  // Mock data - will be replaced with real data later
  const driverName = 'Alex';
  const recentTracks = [
    { name: 'Eastern Creek Kart Circuit', location: 'NSW', lastSession: '2 days ago' },
    { name: 'Go Kart Club of Victoria', location: 'VIC', lastSession: '1 week ago' },
    { name: 'Newcastle Kart Racing Club', location: 'NSW', lastSession: '2 weeks ago' },
  ];
  
  const recentSessions = [
    { type: 'Race', track: 'Eastern Creek', bestLap: '1:02.45', date: 'Today' },
    { type: 'Practice', track: 'Go Kart Club', bestLap: '1:05.12', date: 'Jan 10' },
    { type: 'Track Day', track: 'Newcastle', bestLap: '1:08.34', date: 'Jan 8' },
  ];
  
  const recentSetups = [
    { track: 'Eastern Creek', tyres: 'Bridgestone YDS', width: 'Standard', conditions: 'Dry' },
    { track: 'Go Kart Club', tyres: 'Dunlop SL1A', width: 'Wide Front', conditions: 'Wet' },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Greeting Header */}
        <div className="glass-card-intense p-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            {greeting}, {driverName}! 🏁
          </h1>
          <p className="text-white/70">
            Ready to hit the track today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="glass-card p-4 hover-lift active:scale-95 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium text-sm">Start Session</h3>
                <p className="text-white/60 text-xs">Log new session</p>
              </div>
            </div>
          </button>

          <button className="glass-card p-4 hover-lift active:scale-95 transition-all">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium text-sm">Last Setup</h3>
                <p className="text-white/60 text-xs">Eastern Creek</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Tracks */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>Recent Tracks</span>
            </h2>
            <button className="text-blue-400 text-sm font-medium">See All</button>
          </div>
          <div className="space-y-3">
            {recentTracks.map((track, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div>
                  <h3 className="text-white font-medium text-sm">{track.name}</h3>
                  <p className="text-white/60 text-xs">{track.location}</p>
                </div>
                <span className="text-white/60 text-xs">{track.lastSession}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span>Recent Sessions</span>
            </h2>
            <button className="text-green-400 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    session.type === 'Race' ? 'bg-red-500/20' :
                    session.type === 'Practice' ? 'bg-blue-500/20' : 'bg-green-500/20'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      session.type === 'Race' ? 'bg-red-400' :
                      session.type === 'Practice' ? 'bg-blue-400' : 'bg-green-400'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium text-sm">{session.type}</span>
                      <span className="text-white/60 text-xs">•</span>
                      <span className="text-white/60 text-xs">{session.track}</span>
                    </div>
                    <p className="text-white/60 text-xs">Best: {session.bestLap}</p>
                  </div>
                </div>
                <span className="text-white/60 text-xs">{session.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Setups */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Recent Setups</span>
            </h2>
            <button className="text-yellow-400 text-sm font-medium">Manage</button>
          </div>
          <div className="space-y-3">
            {recentSetups.map((setup, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium text-sm">{setup.track}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    setup.conditions === 'Dry' 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {setup.conditions}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-white/60">
                  <span>Tyres: {setup.tyres}</span>
                  <span>•</span>
                  <span>Width: {setup.width}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>This Week</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">5</div>
              <div className="text-white/60 text-xs">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">1:02.45</div>
              <div className="text-white/60 text-xs">Best Lap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">3</div>
              <div className="text-white/60 text-xs">Tracks</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
