
import React, { useState } from 'react';
import { Settings, Gauge, Battery, Wrench, ChevronDown, ChevronUp, AlertTriangle, Calendar, Fuel } from 'lucide-react';

interface Kart {
  id: number;
  name: string;
  brand: string;
  model: string;
  engine: string;
  engineHours: number;
  lastMaintenance: string;
  nextMaintenance: string;
  status: string;
  tyrePressure: { front: number; rear: number };
  fuelLevel: number;
  weight: number;
  category: string;
  sessions: number;
  bestLap: string;
  notes: string;
  maintenanceLog: Array<{ date: string; type: string; notes: string }>;
}

interface KartCardProps {
  kart: Kart;
}

const KartCard: React.FC<KartCardProps> = ({ kart }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'text-green-400 bg-green-400/20';
      case 'maintenance due':
        return 'text-orange-400 bg-orange-400/20';
      case 'in service':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-white/60 bg-white/10';
    }
  };

  const getFuelColor = (level: number) => {
    if (level > 70) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="glass-card p-4 hover-lift">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold text-lg">{kart.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kart.status)}`}>
              {kart.status}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-white/60 text-sm mb-3">
            <div className="flex items-center space-x-1">
              <Settings className="w-4 h-4" />
              <span>{kart.brand} {kart.model}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Gauge className="w-4 h-4" />
              <span>{kart.engine}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-white font-medium">{kart.engineHours}h</div>
              <div className="text-white/60 text-xs">Engine Hours</div>
            </div>
            <div>
              <div className="text-white font-medium">{kart.sessions}</div>
              <div className="text-white/60 text-xs">Sessions</div>
            </div>
            <div>
              <div className={`font-medium ${getFuelColor(kart.fuelLevel)}`}>{kart.fuelLevel}%</div>
              <div className="text-white/60 text-xs">Fuel</div>
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
          {/* Detailed Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Category:</span>
                <span className="text-white text-sm">{kart.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Weight:</span>
                <span className="text-white text-sm">{kart.weight}kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Best Lap:</span>
                <span className="text-green-400 text-sm font-medium">{kart.bestLap}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Front Pressure:</span>
                <span className="text-white text-sm">{kart.tyrePressure.front} PSI</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Rear Pressure:</span>
                <span className="text-white text-sm">{kart.tyrePressure.rear} PSI</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Last Service:</span>
                <span className="text-white text-sm">{kart.lastMaintenance}</span>
              </div>
            </div>
          </div>

          {/* Maintenance Alert */}
          {kart.status === 'Maintenance Due' && (
            <div className="bg-orange-400/20 border border-orange-400/30 rounded-xl p-3 mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm font-medium">Maintenance Due: {kart.nextMaintenance}</span>
              </div>
            </div>
          )}

          {/* Notes */}
          {kart.notes && (
            <div className="mb-4">
              <h4 className="text-white font-medium text-sm mb-2">Notes:</h4>
              <p className="text-white/80 text-sm leading-relaxed">{kart.notes}</p>
            </div>
          )}

          {/* Recent Maintenance */}
          <div className="mb-4">
            <h4 className="text-white font-medium text-sm mb-2">Recent Maintenance:</h4>
            <div className="space-y-2">
              {kart.maintenanceLog.slice(0, 2).map((log, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-xs font-medium">{log.type}</span>
                    <span className="text-white/60 text-xs">{log.date}</span>
                  </div>
                  <p className="text-white/70 text-xs">{log.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="ios-button-glass flex-1 flex items-center justify-center space-x-2">
              <Wrench className="w-4 h-4" />
              <span>Maintenance</span>
            </button>
            <button className="ios-button-glass flex-1 flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KartCard;
