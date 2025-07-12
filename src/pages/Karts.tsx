
import React, { useState } from 'react';
import { Plus, Settings, Wrench, Gauge, Battery, AlertTriangle, Search, Filter, TrendingUp, Zap } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import KartCard from '../components/karts/KartCard';
import AddKartModal from '../components/karts/AddKartModal';

// Mock data for karts
const mockKarts = [
  {
    id: 1,
    name: 'Thunder Bolt',
    brand: 'Tony Kart',
    model: 'Racer 401S',
    engine: 'Rotax Max',
    engineHours: 45.2,
    lastMaintenance: '2025-01-10',
    nextMaintenance: '2025-02-10',
    status: 'Ready',
    tyrePressure: { front: 12.5, rear: 13.0 },
    fuelLevel: 85,
    weight: 165,
    category: 'Senior',
    sessions: 28,
    bestLap: '1:02.45',
    notes: 'Fresh engine rebuild, running perfectly. New clutch installed last week.',
    maintenanceLog: [
      { date: '2025-01-10', type: 'Engine Service', notes: 'Oil change, spark plug replacement' },
      { date: '2024-12-28', type: 'Brake Service', notes: 'New brake pads installed' }
    ]
  },
  {
    id: 2,
    name: 'Speed Demon',
    brand: 'CRG',
    model: 'Road Rebel',
    engine: 'IAME X30',
    engineHours: 78.5,
    lastMaintenance: '2024-12-20',
    nextMaintenance: '2025-01-20',
    status: 'Maintenance Due',
    tyrePressure: { front: 11.8, rear: 12.5 },
    fuelLevel: 45,
    weight: 162,
    category: 'Senior',
    sessions: 45,
    bestLap: '1:03.12',
    notes: 'Needs carburetor adjustment. Chain tension checked last session.',
    maintenanceLog: [
      { date: '2024-12-20', type: 'General Service', notes: 'Chain lubrication, tyre pressure check' },
      { date: '2024-12-05', type: 'Engine Tuning', notes: 'Carburetor adjustment, air filter cleaning' }
    ]
  },
  {
    id: 3,
    name: 'Lightning Strike',
    brand: 'Birel ART',
    model: 'RY30-S8',
    engine: 'Rotax Junior',
    engineHours: 23.8,
    lastMaintenance: '2025-01-05',
    nextMaintenance: '2025-02-05',
    status: 'Ready',
    tyrePressure: { front: 10.5, rear: 11.0 },
    fuelLevel: 92,
    weight: 145,
    category: 'Junior',
    sessions: 15,
    bestLap: '1:08.34',
    notes: 'Brand new kart, still in break-in period. Excellent handling characteristics.',
    maintenanceLog: [
      { date: '2025-01-05', type: 'Initial Setup', notes: 'First service after break-in period' }
    ]
  }
];

const Karts = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredKarts = mockKarts
    .filter(kart => {
      const matchesSearch = kart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kart.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kart.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || 
                           kart.status.toLowerCase().replace(' ', '-') === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'engineHours') return a.engineHours - b.engineHours;
      if (sortBy === 'sessions') return b.sessions - a.sessions;
      return 0;
    });

  const readyKarts = mockKarts.filter(k => k.status === 'Ready').length;
  const maintenanceDue = mockKarts.filter(k => k.status === 'Maintenance Due').length;
  const totalSessions = mockKarts.reduce((sum, k) => sum + k.sessions, 0);
  const avgEngineHours = mockKarts.reduce((sum, k) => sum + k.engineHours, 0) / mockKarts.length;

  return (
    <AppLayout title="Karts">
      <div className="space-y-6 animate-fade-in">
        {/* Enhanced Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search karts, brands, or models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-card w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-white/60 border-0 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="ready">Ready</option>
                <option value="maintenance-due">Maintenance Due</option>
                <option value="in-service">In Service</option>
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass-card px-3 py-2 rounded-xl bg-white/5 text-white text-sm border-0 focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="engineHours">Engine Hours</option>
                <option value="sessions">Most Used</option>
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
              <span>Add Kart</span>
            </button>
          </div>
        </div>

        {/* Enhanced Kart Fleet Overview */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Fleet Overview</h2>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-green-400" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-green-400 mb-1">{readyKarts}</div>
              <div className="text-white/60 text-xs">Ready to Race</div>
            </div>
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-orange-400 mb-1">{maintenanceDue}</div>
              <div className="text-white/60 text-xs">Maintenance Due</div>
            </div>
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-blue-400 mb-1">{totalSessions}</div>
              <div className="text-white/60 text-xs">Total Sessions</div>
            </div>
            <div className="text-center p-3 glass-card hover-lift">
              <div className="text-2xl font-bold text-purple-400 mb-1">{avgEngineHours.toFixed(1)}h</div>
              <div className="text-white/60 text-xs">Avg Engine Hours</div>
            </div>
          </div>
        </div>

        {/* Fleet Health Monitor */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Fleet Health</h3>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="space-y-2">
            {mockKarts.map((kart) => (
              <div key={kart.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    kart.status === 'Ready' ? 'bg-green-400' :
                    kart.status === 'Maintenance Due' ? 'bg-orange-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-white/80 text-sm">{kart.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Battery className="w-3 h-3 text-white/60" />
                    <span className="text-xs text-white/60">{kart.fuelLevel}%</span>
                  </div>
                  <span className="text-xs text-white/60">{kart.engineHours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Karts List */}
        <div className="space-y-4">
          {filteredKarts.map((kart) => (
            <KartCard key={kart.id} kart={kart} />
          ))}
        </div>

        {filteredKarts.length === 0 && (
          <div className="glass-card p-8 text-center">
            <Settings className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No karts found</h3>
            <p className="text-white/60 text-sm mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start building your kart fleet'
              }
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="ios-button-glass"
            >
              Add Your First Kart
            </button>
          </div>
        )}
      </div>

      {/* Add Kart Modal */}
      {showAddModal && (
        <AddKartModal 
          onClose={() => setShowAddModal(false)}
          onSave={(kartData) => {
            console.log('Kart saved:', kartData);
            setShowAddModal(false);
          }}
        />
      )}
    </AppLayout>
  );
};

export default Karts;
