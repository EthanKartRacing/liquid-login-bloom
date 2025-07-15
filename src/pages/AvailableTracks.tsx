import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Clock, Trophy, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import TrackCard from '../components/tracks/TrackCard';
import { useToast } from '../hooks/use-toast';

// All available tracks that can be added to personal collection
const availableTracks = [
  {
    id: 1,
    name: 'Eastern Creek Kart Circuit',
    location: 'Sydney, NSW',
    length: 1210,
    corners: 14,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '1:02.45',
    totalSessions: 0,
    averageLap: '1:05.32',
    lastVisit: '',
    notes: 'Fast flowing circuit with technical chicane section. Good for wheel-to-wheel racing.',
    personalRecord: '',
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    name: 'Go Kart Club of Victoria',
    location: 'Melbourne, VIC',
    length: 980,
    corners: 11,
    surface: 'Asphalt',
    direction: 'Anti-clockwise',
    bestLap: '0:58.12',
    totalSessions: 0,
    averageLap: '1:01.45',
    lastVisit: '',
    notes: 'Technical circuit with tight hairpins and elevation changes.',
    personalRecord: '',
    difficulty: 'Advanced'
  },
  {
    id: 3,
    name: 'Port Macquarie Kart Track',
    location: 'Port Macquarie, NSW',
    length: 1150,
    corners: 13,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '1:01.23',
    totalSessions: 0,
    averageLap: '1:04.67',
    lastVisit: '',
    notes: 'Coastal track with sea breeze affecting grip levels.',
    personalRecord: '',
    difficulty: 'Intermediate'
  },
  {
    id: 4,
    name: 'Adelaide International Raceway',
    location: 'Adelaide, SA',
    length: 1380,
    corners: 16,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '1:08.90',
    totalSessions: 0,
    averageLap: '1:12.34',
    lastVisit: '',
    notes: 'Championship-grade facility with multiple track configurations.',
    personalRecord: '',
    difficulty: 'Professional'
  },
  {
    id: 5,
    name: 'Sunshine Coast Kart Club',
    location: 'Sunshine Coast, QLD',
    length: 1050,
    corners: 12,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '0:59.45',
    totalSessions: 0,
    averageLap: '1:02.78',
    lastVisit: '',
    notes: 'Scenic track with challenging elevation changes and fast straights.',
    personalRecord: '',
    difficulty: 'Intermediate'
  },
  {
    id: 6,
    name: 'Perth Motorplex Kart Track',
    location: 'Perth, WA',
    length: 1290,
    corners: 15,
    surface: 'Asphalt',
    direction: 'Anti-clockwise',
    bestLap: '1:05.67',
    totalSessions: 0,
    averageLap: '1:09.12',
    lastVisit: '',
    notes: 'Modern facility with excellent safety features and spectator areas.',
    personalRecord: '',
    difficulty: 'Advanced'
  },
  {
    id: 7,
    name: 'Darwin Kart Club',
    location: 'Darwin, NT',
    length: 890,
    corners: 9,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '0:52.34',
    totalSessions: 0,
    averageLap: '0:55.67',
    lastVisit: '',
    notes: 'Compact track perfect for close racing and overtaking opportunities.',
    personalRecord: '',
    difficulty: 'Beginner'
  },
  {
    id: 8,
    name: 'Hobart Kart Club',
    location: 'Hobart, TAS',
    length: 1160,
    corners: 13,
    surface: 'Asphalt',
    direction: 'Clockwise',
    bestLap: '1:03.78',
    totalSessions: 0,
    averageLap: '1:07.23',
    lastVisit: '',
    notes: 'Island track with unique weather patterns affecting racing conditions.',
    personalRecord: '',
    difficulty: 'Intermediate'
  }
];

const AvailableTracks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [addedTracks, setAddedTracks] = useState<number[]>([]);
  const { toast } = useToast();

  // Load added tracks from localStorage
  useEffect(() => {
    const savedTracks = localStorage.getItem('userTracks');
    if (savedTracks) {
      const userTracks = JSON.parse(savedTracks);
      const trackIds = userTracks.map((track: any) => track.id);
      setAddedTracks(trackIds);
    }
  }, []);

  // Filter tracks based on search and filters
  const filteredTracks = availableTracks.filter(track => {
    const matchesSearch = track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || track.location.includes(filterLocation);
    const matchesDifficulty = !filterDifficulty || track.difficulty === filterDifficulty;
    
    return matchesSearch && matchesLocation && matchesDifficulty;
  });

  // Get unique locations and difficulties for filters
  const locations = [...new Set(availableTracks.map(track => track.location.split(', ')[1]))];
  const difficulties = [...new Set(availableTracks.map(track => track.difficulty))];

  const handleAddTrack = (track: any) => {
    // Get existing tracks from localStorage
    const existingTracks = localStorage.getItem('userTracks');
    const userTracks = existingTracks ? JSON.parse(existingTracks) : [];
    
    // Check if track is already added
    if (userTracks.some((t: any) => t.id === track.id)) {
      toast({
        title: "Track already added",
        description: `${track.name} is already in your track collection.`,
        variant: "destructive"
      });
      return;
    }

    // Add track to user collection
    const newTrack = {
      ...track,
      totalSessions: 0,
      lastVisit: '',
      personalRecord: '',
      notes: track.notes || ''
    };

    userTracks.push(newTrack);
    localStorage.setItem('userTracks', JSON.stringify(userTracks));
    
    // Update local state
    setAddedTracks(prev => [...prev, track.id]);

    toast({
      title: "Track added successfully",
      description: `${track.name} has been added to your track collection.`
    });
  };

  return (
    <AppLayout title="Available Tracks">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/tracks" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to My Tracks
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredTracks.length} track{filteredTracks.length !== 1 ? 's' : ''} available
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tracks by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Location Filter */}
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => (
            <div key={track.id} className="relative">
              <TrackCard 
                track={track}
                onToggleFavorite={() => {}} // No favorite functionality on available tracks page
                isFavorite={false}
              />
              
              {/* Add Track Button */}
              <div className="absolute top-4 right-4">
                {addedTracks.includes(track.id) ? (
                  <button
                    disabled
                    className="p-2 bg-green-500/20 text-green-500 rounded-lg cursor-default"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddTrack(track)}
                    className="p-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No tracks found matching your criteria
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterLocation('');
                setFilterDifficulty('');
              }}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default AvailableTracks;