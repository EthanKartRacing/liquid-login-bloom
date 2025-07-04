
import React, { useState } from 'react';
import { X, Settings, Gauge, Wrench } from 'lucide-react';

interface AddKartModalProps {
  onClose: () => void;
  onSave: (kartData: any) => void;
}

const AddKartModal: React.FC<AddKartModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    engine: '',
    weight: '',
    category: 'Senior',
    tyrePressureFront: '',
    tyrePressureRear: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      weight: parseInt(formData.weight),
      tyrePressure: {
        front: parseFloat(formData.tyrePressureFront),
        rear: parseFloat(formData.tyrePressureRear)
      },
      id: Date.now(), // Mock ID
      engineHours: 0,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Ready',
      fuelLevel: 100,
      sessions: 0,
      bestLap: '0:00.00',
      maintenanceLog: []
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
          <h2 className="text-xl font-bold text-white">Add New Kart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kart Name */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Kart Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              placeholder="e.g., Thunder Bolt"
            />
          </div>

          {/* Brand and Model */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Brand *
              </label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="e.g., Tony Kart"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Model *
              </label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="e.g., Racer 401S"
              />
            </div>
          </div>

          {/* Engine */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Engine *
            </label>
            <div className="relative">
              <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                required
                value={formData.engine}
                onChange={(e) => handleInputChange('engine', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="e.g., Rotax Max"
              />
            </div>
          </div>

          {/* Weight and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                required
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="165"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              >
                <option value="Cadet">Cadet</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
          </div>

          {/* Tyre Pressures */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Front Pressure (PSI)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.tyrePressureFront}
                onChange={(e) => handleInputChange('tyrePressureFront', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="12.0"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Rear Pressure (PSI)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.tyrePressureRear}
                onChange={(e) => handleInputChange('tyrePressureRear', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                placeholder="13.0"
              />
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
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-none"
              placeholder="Add any notes about setup, modifications, or maintenance..."
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
              Add Kart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKartModal;
