import React, { useState } from 'react';
import { Plus, Settings, Filter, Search, Wrench, CloudRain, Sun, Cloud, Snowflake, Eye, Star, Calendar } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';

// Mock data for setups
const mockSetups = [
  {
    id: 1,
    name: 'Eastern Creek Dry Setup',
    kart: 'Thunder Bolt',
    kartBrand: 'Tony Kart',
    track: 'Eastern Creek Kart Racing Complex',
    weather: 'Dry',
    temperature: 28,
    engineerRecommended: true,
    session: 'Practice Session - Jan 15',
    createdDate: '2025-01-15',
    parameters: {
      casterAngle: 3.5,
      rearTrackWidth: 1320,
      frontTrackWidth: 1380,
      axleType: 'Medium',
      tyreCompound: 'Bridgestone YDS',
      tyrePressures: {
        frontLeft: 12.5,
        frontRight: 12.3,
        rearLeft: 13.2,
        rearRight: 13.0
      }
    },
    notes: 'Perfect for hot dry conditions. Excellent grip and stability through corners.',
    bestLapTime: '1:02.45'
  },
  {
    id: 2,
    name: 'Wet Weather Base',
    kart: 'Speed Demon',
    kartBrand: 'CRG',
    track: 'Sydney Karting Park',
    weather: 'Wet',
    temperature: 18,
    engineerRecommended: false,
    session: null,
    createdDate: '2025-01-10',
    parameters: {
      casterAngle: 4.0,
      rearTrackWidth: 1310,
      frontTrackWidth: 1390,
      axleType: 'Soft',
      tyreCompound: 'Bridgestone YFD',
      tyrePressures: {
        frontLeft: 10.5,
        frontRight: 10.3,
        rearLeft: 11.0,
        rearRight: 10.8
      }
    },
    notes: 'Lower pressures for wet conditions. Softer axle for better feel.',
    bestLapTime: '1:08.23'
  },
  {
    id: 3,
    name: 'Junior Championship Setup',
    kart: 'Lightning Strike',
    kartBrand: 'Birel ART',
    track: 'Go Kart Club of Victoria',
    weather: 'Dry',
    temperature: 24,
    engineerRecommended: true,
    session: 'Qualifying - Jan 12',
    createdDate: '2025-01-12',
    parameters: {
      casterAngle: 3.0,
      rearTrackWidth: 1300,
      frontTrackWidth: 1360,
      axleType: 'Medium',
      tyreCompound: 'Bridgestone YDS',
      tyrePressures: {
        frontLeft: 11.8,
        frontRight: 11.6,
        rearLeft: 12.5,
        rearRight: 12.3
      }
    },
    notes: 'Championship winning setup. Balanced for consistency over speed.',
    bestLapTime: '1:08.34'
  }
];

const mockKarts = [
  { id: 1, name: 'Thunder Bolt', brand: 'Tony Kart' },
  { id: 2, name: 'Speed Demon', brand: 'CRG' },
  { id: 3, name: 'Lightning Strike', brand: 'Birel ART' }
];

const weatherTypes = [
  { value: 'dry', label: 'Dry', icon: Sun, color: 'text-yellow-400' },
  { value: 'wet', label: 'Wet', icon: CloudRain, color: 'text-blue-400' },
  { value: 'overcast', label: 'Overcast', icon: Cloud, color: 'text-gray-400' },
  { value: 'cold', label: 'Cold', icon: Snowflake, color: 'text-cyan-400' }
];

const Setups = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKart, setFilterKart] = useState('all');
  const [filterWeather, setFilterWeather] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedSetup, setSelectedSetup] = useState(null);

  const filteredSetups = mockSetups
    .filter(setup => {
      const matchesSearch = setup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           setup.kart.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           setup.track.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesKart = filterKart === 'all' || setup.kart === filterKart;
      const matchesWeather = filterWeather === 'all' || setup.weather.toLowerCase() === filterWeather;
      return matchesSearch && matchesKart && matchesWeather;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'kart') return a.kart.localeCompare(b.kart);
      return 0;
    });

  const getWeatherIcon = (weather) => {
    const weatherType = weatherTypes.find(w => w.value === weather.toLowerCase());
    return weatherType ? weatherType.icon : Sun;
  };

  const getWeatherColor = (weather) => {
    const weatherType = weatherTypes.find(w => w.value === weather.toLowerCase());
    return weatherType ? weatherType.color : 'text-yellow-400';
  };

  const engineerSetups = mockSetups.filter(s => s.engineerRecommended).length;
  const totalSetups = mockSetups.length;
  const drySetups = mockSetups.filter(s => s.weather === 'Dry').length;
  const wetSetups = mockSetups.filter(s => s.weather === 'Wet').length;

  return (
    <AppLayout title="Setups">
      <div className="space-y-6 animate-fade-in">
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search setups, karts, or tracks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-card w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-white/60 border-0 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <select 
                value={filterKart}
                onChange={(e) => setFilterKart(e.target.value)}
                className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Karts</option>
                {mockKarts.map(kart => (
                  <option key={kart.id} value={kart.name}>{kart.name}</option>
                ))}
              </select>

              <select 
                value={filterWeather}
                onChange={(e) => setFilterWeather(e.target.value)}
                className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Weather</option>
                {weatherTypes.map(weather => (
                  <option key={weather.value} value={weather.value}>{weather.label}</option>
                ))}
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="kart">Sort by Kart</option>
              </select>
              
              <button className="glass-card p-2 hover-lift">
                <Filter className="w-4 h-4 text-white/60" />
              </button>
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="ios-button-racing flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Setup</span>
            </button>
          </div>
        </div>

        {/* Setup Overview */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Setup Collection</h2>
            <div className="flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-purple-400" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-purple-400 mb-1">{totalSetups}</div>
              <div className="text-white/60 text-xs">Total Setups</div>
            </div>
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-green-400 mb-1">{engineerSetups}</div>
              <div className="text-white/60 text-xs">Engineer Recommended</div>
            </div>
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-yellow-400 mb-1">{drySetups}</div>
              <div className="text-white/60 text-xs">Dry Conditions</div>
            </div>
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-blue-400 mb-1">{wetSetups}</div>
              <div className="text-white/60 text-xs">Wet Conditions</div>
            </div>
          </div>
        </div>

        {/* Setup List */}
        <div className="space-y-4">
          {filteredSetups.map((setup) => {
            const WeatherIcon = getWeatherIcon(setup.weather);
            return (
              <div key={setup.id} className="glass-card p-4 hover-lift">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-medium">{setup.name}</h3>
                      {setup.engineerRecommended && (
                        <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400">Engineer</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-white/60 text-sm">
                      <span>{setup.kart} ({setup.kartBrand})</span>
                      <div className="flex items-center space-x-1">
                        <WeatherIcon className={`w-4 h-4 ${getWeatherColor(setup.weather)}`} />
                        <span>{setup.weather} - {setup.temperature}°C</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mt-1">{setup.track}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {setup.bestLapTime && (
                      <div className="text-right">
                        <div className="text-white text-sm font-medium">{setup.bestLapTime}</div>
                        <div className="text-white/60 text-xs">Best Lap</div>
                      </div>
                    )}
                    <button 
                      onClick={() => setSelectedSetup(setup)}
                      className="glass-card p-2 hover-lift"
                    >
                      <Eye className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
                
                {/* Quick Setup Parameters */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">Caster:</span>
                    <span className="text-white">{setup.parameters.casterAngle}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Axle:</span>
                    <span className="text-white">{setup.parameters.axleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Front Track:</span>
                    <span className="text-white">{setup.parameters.frontTrackWidth}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Rear Track:</span>
                    <span className="text-white">{setup.parameters.rearTrackWidth}mm</span>
                  </div>
                </div>

                {setup.session && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center space-x-2 text-white/60 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>Used in: {setup.session}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredSetups.length === 0 && (
          <div className="glass-card p-8 text-center">
            <Settings className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No setups found</h3>
            <p className="text-white/60 text-sm mb-4">
              {searchTerm || filterKart !== 'all' || filterWeather !== 'all'
                ? 'Try adjusting your search or filters' 
                : 'Start building your setup collection'
              }
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="ios-button-glass"
            >
              Create Your First Setup
            </button>
          </div>
        )}
      </div>

      {/* Setup Detail Modal */}
      {selectedSetup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{selectedSetup.name}</h3>
                <button 
                  onClick={() => setSelectedSetup(null)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Kart:</span>
                      <span className="text-white">{selectedSetup.kart} ({selectedSetup.kartBrand})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Track:</span>
                      <span className="text-white">{selectedSetup.track}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Weather:</span>
                      <span className="text-white">{selectedSetup.weather} - {selectedSetup.temperature}°C</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Setup Parameters</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Caster Angle:</span>
                      <span className="text-white">{selectedSetup.parameters.casterAngle}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Front Track Width:</span>
                      <span className="text-white">{selectedSetup.parameters.frontTrackWidth}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Rear Track Width:</span>
                      <span className="text-white">{selectedSetup.parameters.rearTrackWidth}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Axle Type:</span>
                      <span className="text-white">{selectedSetup.parameters.axleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Tyre Compound:</span>
                      <span className="text-white">{selectedSetup.parameters.tyreCompound}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Tyre Pressures</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Front Left:</span>
                      <span className="text-white">{selectedSetup.parameters.tyrePressures.frontLeft} PSI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Front Right:</span>
                      <span className="text-white">{selectedSetup.parameters.tyrePressures.frontRight} PSI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Rear Left:</span>
                      <span className="text-white">{selectedSetup.parameters.tyrePressures.rearLeft} PSI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Rear Right:</span>
                      <span className="text-white">{selectedSetup.parameters.tyrePressures.rearRight} PSI</span>
                    </div>
                  </div>
                </div>

                {selectedSetup.notes && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Notes</h4>
                    <p className="text-white/80 text-sm bg-white/5 rounded-lg p-3">
                      {selectedSetup.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Setup Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Setup</h3>
            <p className="text-white/60 text-sm mb-4">Setup form will be implemented here with all the required parameters from context.md</p>
            <button 
              onClick={() => setShowAddModal(false)}
              className="ios-button-glass w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Setups;