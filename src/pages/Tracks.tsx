
import React, { useState, useEffect } from 'react';
import { Library, MapPin, Clock, Trophy, Filter, Search, Cloud, Thermometer, Wind, Droplets, Calendar, TrendingUp, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import TrackCard from '../components/tracks/TrackCard';
import TrackSearchDropdown from '../components/tracks/TrackSearchDropdown';

// Enhanced mock weather data with more details
const mockWeather = {
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  windDirection: 'NE',
  visibility: 10,
  uvIndex: 6,
  pressure: 1013,
  feelsLike: 26,
  trackTemp: 28,
  gripLevel: 85,
  surfaceCondition: 'Dry',
  forecast: [
    { time: '12:00', temp: 24, condition: 'Sunny' },
    { time: '15:00', temp: 26, condition: 'Cloudy' },
    { time: '18:00', temp: 22, condition: 'Clear' }
  ]
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [favoriteTrack, setFavoriteTrack] = useState<typeof mockTracks[0] | null>(null);
  const [userTracks, setUserTracks] = useState<typeof mockTracks>([]);

  // Load user tracks and favorite track from localStorage on mount
  useEffect(() => {
    // Load user tracks
    const savedTracks = localStorage.getItem('userTracks');
    if (savedTracks) {
      const tracks = JSON.parse(savedTracks);
      setUserTracks(tracks);
      
      // Load favorite track from user tracks
      const savedFavoriteId = localStorage.getItem('favoriteTrackId');
      if (savedFavoriteId) {
        const track = tracks.find((t: any) => t.id === parseInt(savedFavoriteId));
        if (track) {
          setFavoriteTrack(track);
        }
      }
    } else {
      // If no saved tracks, use default mock tracks
      setUserTracks(mockTracks);
      localStorage.setItem('userTracks', JSON.stringify(mockTracks));
    }
  }, []);

  // Listen for storage changes to update tracks when they're added from AvailableTracks page
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTracks = localStorage.getItem('userTracks');
      if (savedTracks) {
        setUserTracks(JSON.parse(savedTracks));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for changes (since localStorage events don't fire within same tab)
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Save favorite track to localStorage
  const handleFavoriteTrackSelect = (track: typeof mockTracks[0]) => {
    setFavoriteTrack(track);
    localStorage.setItem('favoriteTrackId', track.id.toString());
  };

  const handleClearFavorite = () => {
    setFavoriteTrack(null);
    localStorage.removeItem('favoriteTrackId');
  };

  const toggleTrackFavorite = (track: typeof mockTracks[0]) => {
    if (favoriteTrack?.id === track.id) {
      handleClearFavorite();
    } else {
      handleFavoriteTrackSelect(track);
    }
  };

  const filteredTracks = userTracks.filter(track => {
    const matchesSearch = track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || 
                             track.difficulty.toLowerCase() === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <AppLayout title="Tracks">
      <div className="space-y-6 animate-fade-in">
        {/* Enhanced Weather Section */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white">
                {favoriteTrack ? 'Favorite Track Live Conditions' : 'Track Conditions'}
              </h2>
              {favoriteTrack ? (
                <div className="flex items-center space-x-2 mt-1">
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                  <span className="text-white/80 text-sm">{favoriteTrack.name}</span>
                  <span className="text-white/60 text-xs">• {favoriteTrack.location}</span>
                </div>
              ) : (
                <p className="text-white/60 text-xs">Select a favorite track for personalized conditions</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Cloud className="w-5 h-5 text-blue-400" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Track Search Dropdown */}
          <div className="mb-4">
            <TrackSearchDropdown
              tracks={userTracks}
              selectedTrack={favoriteTrack}
              onTrackSelect={handleFavoriteTrackSelect}
              onClearSelection={handleClearFavorite}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{mockWeather.temperature}°C</div>
                  <div className="text-white/60 text-xs">Air • Track {mockWeather.trackTemp}°C</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Wind className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{mockWeather.windSpeed} km/h</div>
                  <div className="text-white/60 text-xs">{mockWeather.windDirection} • {mockWeather.pressure} hPa</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{mockWeather.humidity}%</div>
                  <div className="text-white/60 text-xs">Humidity • {mockWeather.visibility}km vis</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-medium">{mockWeather.gripLevel}%</div>
                  <div className="text-white/60 text-xs">Grip • {mockWeather.surfaceCondition}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather forecast */}
          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              {mockWeather.forecast.map((hour, index) => (
                <div key={index} className="text-center">
                  <div className="text-white/60 text-xs mb-1">{hour.time}</div>
                  <div className="text-white text-sm font-medium">{hour.temp}°</div>
                  <div className="text-white/60 text-xs">{hour.condition}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search tracks or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-card w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-white/60 border-0 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
              
              <button className="glass-card p-2 hover-lift">
                <Filter className="w-4 h-4 text-white/60" />
              </button>
            </div>
            
            <Link 
              to="/available-tracks"
              className="ios-button-racing flex items-center space-x-2"
            >
              <Library className="w-4 h-4" />
              <span>Browse Tracks</span>
            </Link>
          </div>
        </div>

        {/* Enhanced Track Stats */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Track Statistics</h2>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-white mb-1">{mockTracks.length}</div>
              <div className="text-white/60 text-xs">Total Tracks</div>
            </div>
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-green-400 mb-1">0:58.91</div>
              <div className="text-white/60 text-xs">Personal Best</div>
            </div>
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-blue-400 mb-1">40</div>
              <div className="text-white/60 text-xs">Total Sessions</div>
            </div>
            <div className="text-center p-3 glass-card">
              <div className="text-2xl font-bold text-orange-400 mb-1">1185m</div>
              <div className="text-white/60 text-xs">Average Length</div>
            </div>
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-4">
          {filteredTracks.map((track) => (
            <TrackCard 
              key={track.id} 
              track={track}
              isFavorite={favoriteTrack?.id === track.id}
              onToggleFavorite={() => toggleTrackFavorite(track)}
            />
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="glass-card p-8 text-center">
            <MapPin className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No tracks found</h3>
            <p className="text-white/60 text-sm mb-4">
              {searchTerm || filterDifficulty !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start building your track collection'
              }
            </p>
            <Link 
              to="/available-tracks"
              className="ios-button-glass"
            >
              Browse Available Tracks
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Tracks;
