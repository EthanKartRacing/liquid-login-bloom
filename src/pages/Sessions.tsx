
import React, { useState } from 'react';
import { Plus, Filter, Clock, MapPin, Trophy, Car } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import AddSessionModal from '../components/sessions/AddSessionModal';
import SessionCard from '../components/sessions/SessionCard';

// Mock data
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
    position: 3
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
    position: null
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
    position: null
  }
];

const Sessions = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filteredSessions = mockSessions.filter(session => 
    filterType === 'all' || session.type.toLowerCase() === filterType
  );

  return (
    <AppLayout title="Sessions">
      <div className="space-y-6 animate-fade-in">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="glass-card p-2 hover-lift">
              <Filter className="w-5 h-5 text-white/60" />
            </button>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sessions</option>
              <option value="race">Race</option>
              <option value="practice">Practice</option>
              <option value="track day">Track Day</option>
            </select>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="ios-button-racing flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Session</span>
          </button>
        </div>

        {/* Sessions Stats */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">This Month</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">8</div>
              <div className="text-white/60 text-xs">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">1:02.45</div>
              <div className="text-white/60 text-xs">Best Lap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">2</div>
              <div className="text-white/60 text-xs">Podiums</div>
            </div>
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
              {filterType === 'all' ? 'Start tracking your karting sessions' : `No ${filterType} sessions found`}
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="ios-button-glass"
            >
              Add Your First Session
            </button>
          </div>
        )}
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <AddSessionModal 
          onClose={() => setShowAddModal(false)}
          onSave={(sessionData) => {
            console.log('Session saved:', sessionData);
            setShowAddModal(false);
          }}
        />
      )}
    </AppLayout>
  );
};

export default Sessions;
