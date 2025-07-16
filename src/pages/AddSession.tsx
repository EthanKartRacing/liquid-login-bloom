import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Calendar, MapPin, Car, Zap, Clock, Thermometer, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data
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

const steps = [
  { id: 1, title: 'Session Type', icon: Calendar },
  { id: 2, title: 'Track & Date', icon: MapPin },
  { id: 3, title: 'Equipment', icon: Car },
  { id: 4, title: 'Conditions', icon: Thermometer },
  { id: 5, title: 'Lap Times', icon: Clock },
  { id: 6, title: 'Notes', icon: FileText }
];

const AddSession: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    track: '',
    date: new Date().toISOString().split('T')[0],
    kart: '',
    tyres: '',
    weather: '',
    temperature: 25,
    lapTimes: [''],
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

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.type !== '';
      case 2: return formData.track !== '' && formData.date !== '';
      case 3: return formData.kart !== '' && formData.tyres !== '';
      case 4: return formData.weather !== '';
      case 5: return formData.lapTimes.some(time => time.trim() !== '');
      case 6: return true; // Notes are optional
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Calculate best lap time
    const validLapTimes = formData.lapTimes.filter(time => time.trim() !== '');
    const bestLap = validLapTimes.length > 0 
      ? validLapTimes.reduce((best, current) => {
          return current < best ? current : best;
        })
      : '0:00.00';

    const sessionData = {
      ...formData,
      bestLap,
      totalLaps: validLapTimes.length,
      id: Date.now()
    };

    // In a real app, you'd save to backend/localStorage here
    console.log('Session saved:', sessionData);
    
    navigate('/sessions');
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Session Type</h2>
              <p className="text-white/60">What type of session are you recording?</p>
            </div>
            <div className="space-y-4">
              {['Practice', 'Race', 'Track Day'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleInputChange('type', type)}
                  className={`w-full p-4 rounded-xl border transition-all ${
                    formData.type === type
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Track & Date</h2>
              <p className="text-white/60">Where and when did you race?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Track</label>
                <select
                  value={formData.track}
                  onChange={(e) => handleInputChange('track', e.target.value)}
                  className="ios-input"
                >
                  <option value="">Select Track</option>
                  {mockTracks.map(track => (
                    <option key={track} value={track}>{track}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="ios-input"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Car className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Equipment</h2>
              <p className="text-white/60">What kart and tyres did you use?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Kart</label>
                <select
                  value={formData.kart}
                  onChange={(e) => handleInputChange('kart', e.target.value)}
                  className="ios-input"
                >
                  <option value="">Select Kart</option>
                  {mockKarts.map(kart => (
                    <option key={kart} value={kart}>{kart}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Tyres</label>
                <select
                  value={formData.tyres}
                  onChange={(e) => handleInputChange('tyres', e.target.value)}
                  className="ios-input"
                >
                  <option value="">Select Tyres</option>
                  {mockTyres.map(tyre => (
                    <option key={tyre} value={tyre}>{tyre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Thermometer className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Track Conditions</h2>
              <p className="text-white/60">What were the conditions like?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Weather</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Dry', 'Wet', 'Overcast', 'Mixed'].map((weather) => (
                    <button
                      key={weather}
                      onClick={() => handleInputChange('weather', weather)}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.weather === weather
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {weather}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Temperature: {formData.temperature}°C
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Lap Times</h2>
              <p className="text-white/60">Enter your lap times</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm font-medium">Lap Times</span>
                <button
                  onClick={addLapTime}
                  className="ios-button-glass text-sm px-3 py-1"
                >
                  + Add Lap
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {formData.lapTimes.map((lapTime, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-white/60 text-sm w-12">#{index + 1}</span>
                    <input
                      type="text"
                      value={lapTime}
                      onChange={(e) => updateLapTime(index, e.target.value)}
                      placeholder="1:23.45"
                      className="ios-input flex-1"
                    />
                    {formData.lapTimes.length > 1 && (
                      <button
                        onClick={() => removeLapTime(index)}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Session Notes</h2>
              <p className="text-white/60">Any additional notes about your session?</p>
            </div>
            <div>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="ios-input resize-none"
                rows={6}
                placeholder="Session notes, setup changes, track conditions, things to improve..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/sessions')}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Sessions</span>
          </button>
          <h1 className="text-lg font-semibold text-white">Add Session</h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/60">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          {renderStepContent()}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass-card p-4 border-t border-white/10">
        <div className="max-w-md mx-auto flex justify-between space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 1
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleFinish}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium flex-1 justify-center transition-all ${
                canProceed()
                  ? 'ios-button-racing'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Finish</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium flex-1 justify-center transition-all ${
                canProceed()
                  ? 'ios-button-racing'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSession;