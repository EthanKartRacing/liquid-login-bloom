
import React, { useState } from 'react';
import { MapPin, Clock, Trophy, ChevronDown, ChevronUp, Calendar, Target, Heart } from 'lucide-react';

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

interface TrackCardProps {
  track: Track;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, isFavorite = false, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-400 bg-green-400/20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  return (
    <div className="glass-card p-4 hover-lift">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-semibold text-lg">{track.name}</h3>
              {isFavorite && (
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(track.difficulty)}`}>
                {track.difficulty}
              </span>
              {onToggleFavorite && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                  }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${isFavorite ? 'text-red-400 fill-current' : 'text-white/60'} hover:text-red-400`} 
                  />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-white/60 text-sm mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{track.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{track.bestLap}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-white font-medium">{track.length}m</div>
              <div className="text-white/60 text-xs">Length</div>
            </div>
            <div>
              <div className="text-white font-medium">{track.corners}</div>
              <div className="text-white/60 text-xs">Corners</div>
            </div>
            <div>
              <div className="text-white font-medium">{track.totalSessions}</div>
              <div className="text-white/60 text-xs">Sessions</div>
            </div>
          </div>
        </div>

        <div className="ml-4">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/60" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Surface:</span>
                <span className="text-white text-sm">{track.surface}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Direction:</span>
                <span className="text-white text-sm">{track.direction}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Average Lap:</span>
                <span className="text-white text-sm">{track.averageLap}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Personal Best:</span>
                <span className="text-green-400 text-sm font-medium">{track.personalRecord}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Last Visit:</span>
                <span className="text-white text-sm">{track.lastVisit}</span>
              </div>
            </div>
          </div>

          {track.notes && (
            <div className="mb-4">
              <h4 className="text-white font-medium text-sm mb-2">Notes:</h4>
              <p className="text-white/80 text-sm leading-relaxed">{track.notes}</p>
            </div>
          )}

          <div className="flex space-x-2">
            <button className="ios-button-glass flex-1 flex items-center justify-center space-x-2">
              <Target className="w-4 h-4" />
              <span>View Records</span>
            </button>
            <button className="ios-button-glass flex-1 flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Book Session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackCard;
