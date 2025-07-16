
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Clock, MapPin, Trophy, Car, Calendar, TrendingUp, BarChart3, Target } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import SessionCard from '../components/sessions/SessionCard';

// Enhanced mock data with more sessions
const mockSessions = [
  {
    id: 1,
    type: 'Race',
    track: 'Eastern Creek Kart Circuit',
    date: '2025-01-12',
    bestLap: '1:02.45',
    totalLaps: 18,
    kart: 'CRG Road Rebel',
    tyres: 'Bridgestone YDS',
    weather: 'Dry',
    temperature: 28,
    position: 3,
    improvement: '+0.23s'
  },
  {
    id: 2,
    type: 'Practice',
    track: 'Go Kart Club of Victoria',
    date: '2025-01-10',
    bestLap: '1:05.12',
    totalLaps: 25,
    kart: 'Tony Kart Racer 401S',
    tyres: 'Dunlop SL1A',
    weather: 'Wet',
    temperature: 18,
    position: null,
    improvement: '-0.45s'
  },
  {
    id: 3,
    type: 'Track Day',
    track: 'Newcastle Kart Racing Club',
    date: '2025-01-08',
    bestLap: '1:08.34',
    totalLaps: 32,
    kart: 'CRG Road Rebel',
    tyres: 'Bridgestone YDS',
    weather: 'Dry',
    temperature: 25,
    position: null,
    improvement: '-0.12s'
  },
  {
    id: 4,
    type: 'Qualifying',
    track: 'Adelaide International Raceway',
    date: '2025-01-05',
    bestLap: '0:58.91',
    totalLaps: 12,
    kart: 'Tony Kart Racer 401S',
    tyres: 'Bridgestone YDS',
    weather: 'Dry',
    temperature: 32,
    position: 1,
    improvement: '-1.23s'
  }
];

const Sessions = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredSessions = mockSessions
    .filter(session => filterType === 'all' || session.type.toLowerCase() === filterType)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'bestLap') return a.bestLap.localeCompare(b.bestLap);
      return 0;
    });

  const totalSessions = mockSessions.length;
  const bestOverallLap = mockSessions.reduce((best, session) => 
    session.bestLap < best ? session.bestLap : best, '9:99.99');
  const podiumFinishes = mockSessions.filter(s => s.position && s.position <= 3).length;
  const avgLapsPerSession = Math.round(mockSessions.reduce((sum, s) => sum + s.totalLaps, 0) / totalSessions);

  return (
    <AppLayout title="Sessions">
      <div className="space-y-6 animate-fade-in">
        {/* Enhanced Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sessions</option>
              <option value="race">Race</option>
              <option value="practice">Practice</option>
              <option value="qualifying">Qualifying</option>
              <option value="track day">Track Day</option>
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Latest First</option>
              <option value="bestLap">Fastest Lap</option>
            </select>

            <button className="glass-card p-2 hover-lift">
              <Filter className="w-4 h-4 text-white/60" />
            </button>
          </div>
          
          <button 
            onClick={() => navigate('/sessions/add')}
            className="ios-button-racing flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Session</span>
          </button>
        </div>

        {/* Enhanced Sessions Stats */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Performance Overview</h2>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-white mb-1">{totalSessions}</div>
              <div className="text-white/60 text-xs">Total Sessions</div>
            </div>
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-green-400 mb-1">{bestOverallLap}</div>
              <div className="text-white/60 text-xs">Personal Best</div>
            </div>
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{podiumFinishes}</div>
              <div className="text-white/60 text-xs">Podium Finishes</div>
            </div>
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-blue-400 mb-1">{avgLapsPerSession}</div>
              <div className="text-white/60 text-xs">Avg Laps/Session</div>
            </div>
          </div>
        </div>

        {/* Recent Improvements */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Recent Progress</h3>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="space-y-2">
            {mockSessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-white/80 text-sm">{session.track}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">{session.bestLap}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.improvement.startsWith('-') 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {session.improvement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="glass-card p-8 text-center">
            <Clock className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No sessions found</h3>
            <p className="text-white/60 text-sm mb-4">
              {filterType === 'all' 
                ? 'Start tracking your karting sessions' 
                : `No ${filterType} sessions found`
              }
            </p>
            <button 
              onClick={() => navigate('/sessions/add')}
              className="ios-button-glass"
            >
              Log Your First Session
            </button>
          </div>
        )}
      </div>

    </AppLayout>
  );
};

export default Sessions;
