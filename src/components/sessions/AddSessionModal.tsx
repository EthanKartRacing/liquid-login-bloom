
import React, { useState } from 'react';
import { X, Plus, Clock, MapPin, Car, Thermometer } from 'lucide-react';

interface AddSessionModalProps {
  onClose: () => void;
  onSave: (sessionData: any) => void;
}

// Mock data for dropdowns
const mockTracks = [
  'Eastern Creek Kart Circuit',
  'Go Kart Club of Victoria',
  'Newcastle Kart Racing Club',
  'Bolivar Karting Complex',
  'Emerald Karting Circuit'
];

const mockKarts = [
  'CRG Road Rebel',
  'Tony Kart Racer 401S',
  'CompKart Covert 3.0',
  'LN Kart Storm'
];

const mockTyres = [
  'Bridgestone YDS',
  'Dunlop SL1A',
  'Vega XM3',
  'MG Red'
];

const AddSessionModal: React.FC<AddSessionModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: 'Practice',
    track: '',
    kart: '',
    tyres: '',
    date: new Date().toISOString().split('T')[0],
    lapTimes: [''],
    weather: 'Dry',
    temperature: 25,
    notes: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLapTime = () => {
    setFormData(prev => ({
      ...prev,
      lapTimes: [...prev.lapTimes, '']
    }));
  };

  const updateLapTime = (index: number, value: string) => {
    const newLapTimes = [...formData.lapTimes];
    newLapTimes[index] = value;
    setFormData(prev => ({
      ...prev,
      lapTimes: newLapTimes
    }));
  };

  const removeLapTime = (index: number) => {
    if (formData.lapTimes.length > 1) {
      const newLapTimes = formData.lapTimes.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        lapTimes: newLapTimes
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate best lap time
    const validLapTimes = formData.lapTimes.filter(time => time.trim() !== '');
    const bestLap = validLapTimes.length > 0 
      ? validLapTimes.reduce((best, current) => {
          // Simple string comparison for demo - in real app would need proper time parsing
          return current < best ? current : best;
        })
      : '0:00.00';

    const sessionData = {
      ...formData,
      bestLap,
      totalLaps: validLapTimes.length,
      id: Date.now() // Mock ID
    };

    onSave(sessionData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass-card-intense max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass-card-intense p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Add Session</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Session Type */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Session Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="ios-input"
              required
            >
              <option value="Practice">Practice</option>
              <option value="Race">Race</option>
              <option value="Track Day">Track Day</option>
            </select>
          </div>

          {/* Track & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Track
              </label>
              <select
                value={formData.track}
                onChange={(e) => handleInputChange('track', e.target.value)}
                className="ios-input"
                required
              >
                <option value="">Select Track</option>
                {mockTracks.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="ios-input"
                required
              />
            </div>
          </div>

          {/* Kart & Tyres */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Kart
              </label>
              <select
                value={formData.kart}
                onChange={(e) => handleInputChange('kart', e.target.value)}
                className="ios-input"
                required
              >
                <option value="">Select Kart</option>
                {mockKarts.map(kart => (
                  <option key={kart} value={kart}>{kart}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Tyres
              </label>
              <select
                value={formData.tyres}
                onChange={(e) => handleInputChange('tyres', e.target.value)}
                className="ios-input"
                required
              >
                <option value="">Select Tyres</option>
                {mockTyres.map(tyre => (
                  <option key={tyre} value={tyre}>{tyre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Weather & Temperature */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Weather
              </label>
              <select
                value={formData.weather}
                onChange={(e) => handleInputChange('weather', e.target.value)}
                className="ios-input"
              >
                <option value="Dry">Dry</option>
                <option value="Wet">Wet</option>
                <option value="Overcast">Overcast</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', parseInt(e.target.value))}
                className="ios-input"
                min="0"
                max="50"
              />
            </div>
          </div>

          {/* Lap Times */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-white/80 text-sm font-medium">
                Lap Times
              </label>
              <button
                type="button"
                onClick={addLapTime}
                className="ios-button-glass text-xs px-3 py-1"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Lap
              </button>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {formData.lapTimes.map((lapTime, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={lapTime}
                    onChange={(e) => updateLapTime(index, e.target.value)}
                    placeholder="1:23.45"
                    className="ios-input flex-1"
                  />
                  {formData.lapTimes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLapTime(index)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="ios-input resize-none"
              rows={3}
              placeholder="Session notes, setup changes, track conditions..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="ios-button-racing w-full"
          >
            Save Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSessionModal;
