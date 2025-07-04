
import React, { useState } from 'react';
import { Plus, MapPin, Clock, Trophy, Filter, Search } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import TrackCard from '../components/tracks/TrackCard';
import AddTrackModal from '../components/tracks/AddTrackModal';

// Mock data for tracks
const mockTracks = [
  {
    id: 1,
    name: 'Eastern Creek Kart Circuit',
    location: 'Sydney, NSW',
    length: 1210,
    corners: 14,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '1:02.45',
    totalSessions: 12,
    averageLap: '1:05.32',
    lastVisit: '2025-01-12',
    notes: 'Fast flowing circuit with technical chicane section. Good for wheel-to-wheel racing.',
    personalRecord: '1:02.45',
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    name: 'Go Kart Club of Victoria',
    location: 'Melbourne, VIC',
    length: 980,
    corners: 12,
    surface: 'Asphalt',
    direction: 'Anti-clockwise',
    bestLap: '1:05.12',
    totalSessions: 8,
    averageLap: '1:07.89',
    lastVisit: '2025-01-10',
    notes: 'Technical circuit with tight hairpins. Requires precise braking and acceleration.',
    personalRecord: '1:05.12',
    difficulty: 'Advanced'
  },
  {
    id: 3,
    name: 'Newcastle Kart Racing Club',
    location: 'Newcastle, NSW',
    length: 1150,
    corners: 11,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '1:08.34',
    totalSessions: 5,
    averageLap: '1:11.15',
    lastVisit: '2025-01-08',
    notes: 'Scenic coastal track with elevation changes. Challenging in windy conditions.',
    personalRecord: '1:08.34',
    difficulty: 'Beginner'
  },
  {
    id: 4,
    name: 'Adelaide International Raceway',
    location: 'Adelaide, SA',
    length: 1340,
    corners: 8,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '0:58.91',
    totalSessions: 15,
    averageLap: '1:01.23',
    lastVisit: '2024-12-28',
    notes: 'High-speed circuit with long straights. Great for testing top speed setups.',
    personalRecord: '0:58.91',
    difficulty: 'Intermediate'
  }
];

const Tracks = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const filteredTracks = mockTracks.filter(track => {
    const matchesSearch = track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || 
                             track.difficulty.toLowerCase() === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <AppLayout title="Tracks">
      <div className="space-y-6 animate-fade-in">
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search tracks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-card w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-white/60 border-0 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <select 
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="ios-button-racing flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Track</span>
            </button>
          </div>
        </div>

        {/* Track Stats */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Track Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{mockTracks.length}</div>
              <div className="text-white/60 text-xs">Total Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">0:58.91</div>
              <div className="text-white/60 text-xs">Best Overall</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">40</div>
              <div className="text-white/60 text-xs">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">1185m</div>
              <div className="text-white/60 text-xs">Avg Length</div>
            </div>
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-4">
          {filteredTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="glass-card p-8 text-center">
            <MapPin className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No tracks found</h3>
            <p className="text-white/60 text-sm mb-4">
              {searchTerm || filterDifficulty !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start tracking your favorite karting circuits'
              }
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="ios-button-glass"
            >
              Add Your First Track
            </button>
          </div>
        )}
      </div>

      {/* Add Track Modal */}
      {showAddModal && (
        <AddTrackModal 
          onClose={() => setShowAddModal(false)}
          onSave={(trackData) => {
            console.log('Track saved:', trackData);
            setShowAddModal(false);
          }}
        />
      )}
    </AppLayout>
  );
};

export default Tracks;
