
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Heart, X } from 'lucide-react';

interface Track {
  id: number;
  name: string;
  location: string;
  length: number;
  corners: number;
  surface: string;
  direction: string;
  bestLap: string;
  totalSessions: number;
  averageLap: string;
  lastVisit: string;
  notes: string;
  personalRecord: string;
  difficulty: string;
}

interface TrackSearchDropdownProps {
  tracks: Track[];
  selectedTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  onClearSelection: () => void;
}

const TrackSearchDropdown: React.FC<TrackSearchDropdownProps> = ({
  tracks,
  selectedTrack,
  onTrackSelect,
  onClearSelection
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTracks = tracks.filter(track =>
    track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTrackSelect = (track: Track) => {
    onTrackSelect(track);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="glass-card w-full px-3 py-2 rounded-xl bg-white/5 text-white border-0 focus:ring-2 focus:ring-blue-500 text-left flex items-center justify-between"
          >
            {selectedTrack ? (
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span className="truncate">{selectedTrack.name}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-white/60" />
                <span className="text-white/60">Search for favorite track...</span>
              </div>
            )}
          </button>
        </div>
        
        {selectedTrack && (
          <button
            onClick={onClearSelection}
            className="glass-card p-2 hover-lift"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl z-50 overflow-hidden animate-fade-in">
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Search tracks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 text-white placeholder:text-white/60 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredTracks.length > 0 ? (
              filteredTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track)}
                  className="w-full px-3 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-white font-medium">{track.name}</div>
                      <div className="flex items-center space-x-1 text-white/60 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{track.location}</span>
                        <span>•</span>
                        <span>{track.length}m</span>
                      </div>
                    </div>
                    {selectedTrack?.id === track.id && (
                      <Heart className="w-4 h-4 text-red-400 fill-current" />
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-white/60 text-center">
                No tracks found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackSearchDropdown;
