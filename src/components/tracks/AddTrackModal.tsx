
import React, { useState } from 'react';
import { X, MapPin, Ruler, RotateCcw } from 'lucide-react';

interface AddTrackModalProps {
  onClose: () => void;
  onSave: (trackData: any) => void;
}

const AddTrackModal: React.FC<AddTrackModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    length: '',
    corners: '',
    surface: 'Asphalt',
    direction: 'Clockwise',
    difficulty: 'Intermediate',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      length: parseInt(formData.length),
      corners: parseInt(formData.corners),
      id: Date.now(), // Mock ID
      bestLap: '0:00.00',
      totalSessions: 0,
      averageLap: '0:00.00',
      lastVisit: new Date().toISOString().split('T')[0],
      personalRecord: '0:00.00'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass-card-intense p-6 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add New Track</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Track Name */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Track Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              placeholder="e.g., Eastern Creek Kart Circuit"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="e.g., Sydney, NSW"
              />
            </div>
          </div>

          {/* Track Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Length (m) *
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="number"
                  required
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  placeholder="1200"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Corners *
              </label>
              <input
                type="number"
                required
                value={formData.corners}
                onChange={(e) => handleInputChange('corners', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="14"
              />
            </div>
          </div>

          {/* Surface and Direction */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Surface
              </label>
              <select
                value={formData.surface}
                onChange={(e) => handleInputChange('surface', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              >
                <option value="Asphalt">Asphalt</option>
                <option value="Concrete">Concrete</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Direction
              </label>
              <select
                value={formData.direction}
                onChange={(e) => handleInputChange('direction', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              >
                <option value="Clockwise">Clockwise</option>
                <option value="Anti-clockwise">Anti-clockwise</option>
              </select>
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Difficulty Level
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-none"
              placeholder="Add any notes about the track layout, conditions, or tips..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 ios-button-glass"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 ios-button-racing"
            >
              Add Track
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrackModal;
