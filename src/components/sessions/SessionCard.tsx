
import React, { useState } from 'react';
import { Clock, MapPin, Trophy, Car, Thermometer, ChevronDown, ChevronUp } from 'lucide-react';

interface SessionCardProps {
  session: {
    id: number;
    type: string;
    track: string;
    date: string;
    bestLap: string;
    totalLaps: number;
    kart: string;
    tyres: string;
    weather: string;
    temperature: number;
    position?: number | null;
  };
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const [expanded, setExpanded] = useState(false);

  const getSessionTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'race':
        return 'bg-red-500/20 text-red-400';
      case 'practice':
        return 'bg-blue-500/20 text-blue-400';
      case 'track day':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="glass-card p-4 hover-lift transition-all duration-300">
      <div 
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSessionTypeColor(session.type)}`}>
              <div className="w-3 h-3 rounded-full bg-current" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium text-sm">{session.type}</span>
                {session.position && (
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400 text-xs">P{session.position}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-xs">
                <MapPin className="w-3 h-3" />
                <span>{session.track}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-medium text-sm">{session.bestLap}</div>
            <div className="text-white/60 text-xs">{formatDate(session.date)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-white/60">
            <span>{session.totalLaps} laps</span>
            <span>•</span>
            <span>{session.weather}</span>
            <span>•</span>
            <span>{session.temperature}°C</span>
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-white/60" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/60" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="pt-3 mt-3 border-t border-white/10 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-white text-sm font-medium">Kart</div>
                  <div className="text-white/60 text-xs">{session.kart}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Tyres</div>
                  <div className="text-white/60 text-xs">{session.tyres}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <div>
                  <div className="text-white text-sm font-medium">Weather</div>
                  <div className="text-white/60 text-xs">{session.weather}, {session.temperature}°C</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-white text-sm font-medium">Session</div>
                  <div className="text-white/60 text-xs">{session.totalLaps} total laps</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <button className="ios-button-glass flex-1 text-sm py-2">
              View Details
            </button>
            <button className="ios-button-glass flex-1 text-sm py-2">
              Edit Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
