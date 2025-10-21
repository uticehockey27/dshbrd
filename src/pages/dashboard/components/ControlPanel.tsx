
import { useState } from 'react';

interface Location {
  id: string;
  city: string;
  state: string;
  progress: number;
  nextStep: string;
  targetDate: string;
}

interface MetricData {
  id: string;
  value: string;
  label: string;
  year1: string;
  year2: string;
  year3: string;
  barHeight1: string;
  barHeight2: string;
  barHeight3: string;
}

interface MetricData2 {
  id: string;
  value: string;
  label: string;
  percentage: string;
  chartValue: string;
}

interface ControlPanelProps {
  isOpen: boolean;
  locations: Location[];
  metricData: MetricData;
  metricData2: MetricData2;
  onUpdateLocation: (id: string, updates: Partial<Location>) => void;
  onRemoveLocation: (id: string) => void;
  onUpdateMetricData: (updates: Partial<MetricData>) => void;
  onUpdateMetricData2: (updates: Partial<MetricData2>) => void;
}

export default function ControlPanel({ 
  isOpen, 
  locations, 
  metricData, 
  metricData2,
  onUpdateLocation, 
  onRemoveLocation, 
  onUpdateMetricData,
  onUpdateMetricData2
}: ControlPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Location>>({});
  const [editingMetric, setEditingMetric] = useState(false);
  const [metricForm, setMetricForm] = useState<MetricData>(metricData);
  const [editingMetric2, setEditingMetric2] = useState(false);
  const [metricForm2, setMetricForm2] = useState<MetricData2>(metricData2);

  const startEdit = (location: Location) => {
    setEditingId(location.id);
    setEditForm(location);
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      onUpdateLocation(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const startMetricEdit = () => {
    setEditingMetric(true);
    setMetricForm(metricData);
  };

  const saveMetricEdit = () => {
    onUpdateMetricData(metricForm);
    setEditingMetric(false);
  };

  const cancelMetricEdit = () => {
    setEditingMetric(false);
    setMetricForm(metricData);
  };

  const startMetric2Edit = () => {
    setEditingMetric2(true);
    setMetricForm2(metricData2);
  };

  const saveMetric2Edit = () => {
    onUpdateMetricData2(metricForm2);
    setEditingMetric2(false);
  };

  const cancelMetric2Edit = () => {
    setEditingMetric2(false);
    setMetricForm2(metricData2);
  };

  const incrementProgress = (id: string, currentProgress: number) => {
    const newProgress = Math.min(currentProgress + 4, 100);
    onUpdateLocation(id, { progress: newProgress });
  };

  const decrementProgress = (id: string, currentProgress: number) => {
    const newProgress = Math.max(currentProgress - 4, 0);
    onUpdateLocation(id, { progress: newProgress });
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-800 border-r border-gray-700 transition-transform duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`} style={{ width: '384px', height: '1080px' }}>
      <div className="p-8 pt-20">
        <h2 className="text-2xl font-bold mb-8 text-white">Control Panel</h2>
        
        {/* Metric Card 1 Editor */}
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Metric Card 1</h3>
            {!editingMetric && (
              <button
                onClick={startMetricEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded text-lg transition-colors"
              >
                <i className="ri-edit-line"></i>
              </button>
            )}
          </div>
          
          {editingMetric ? (
            <div className="space-y-4">
              <input
                type="text"
                value={metricForm.value}
                onChange={(e) => setMetricForm({ ...metricForm, value: e.target.value })}
                className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                placeholder="Big Number"
              />
              <input
                type="text"
                value={metricForm.label}
                onChange={(e) => setMetricForm({ ...metricForm, label: e.target.value })}
                className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                placeholder="Text Below Number"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={metricForm.year1}
                  onChange={(e) => setMetricForm({ ...metricForm, year1: e.target.value })}
                  className="bg-gray-600 text-white px-4 py-3 rounded text-lg"
                  placeholder="Year 1"
                />
                <input
                  type="number"
                  value={metricForm.barHeight1}
                  onChange={(e) => setMetricForm({ ...metricForm, barHeight1: e.target.value })}
                  className="bg-gray-600 text-white px-4 py-3 rounded text-lg"
                  placeholder="Bar 1 Height %"
                  min="0"
                  max="100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={metricForm.year2}
                  onChange={(e) => setMetricForm({ ...metricForm, year2: e.target.value })}
                  className="bg-gray-600 text-white px-4 py-3 rounded text-lg"
                  placeholder="Year 2"
                />
                <input
                  type="number"
                  value={metricForm.barHeight2}
                  onChange={(e) => setMetricForm({ ...metricForm, barHeight2: e.target.value })}
                  className="bg-gray-600 text-white px-4 py-3 rounded text-lg"
                  placeholder="Bar 2 Height %"
                  min="0"
                  max="100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={metricForm.year3}
                  onChange={(e) => setMetricForm({ ...metricForm, year3: e.target.value })}
                  className="bg-gray-600 text-white px-4 py-3 rounded text-lg"
                  placeholder="Year 3"
                />
                <input
                  type="number"
                  value={metricForm.barHeight3}
                  onChange={(e) => setMetricForm({ ...metricForm, barHeight3: e.target.value })}
                  className="bg-gray-600 text-white px-4 py-3 rounded text-lg"
                  placeholder="Bar 3 Height %"
                  min="0"
                  max="100"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={saveMetricEdit}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-check-line mr-2"></i>
                  Save
                </button>
                <button
                  onClick={cancelMetricEdit}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-close-line mr-2"></i>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-300">
              <p className="text-lg"><strong>Number:</strong> {metricData.value}</p>
              <p className="text-lg"><strong>Label:</strong> {metricData.label}</p>
              <p className="text-lg"><strong>Year 1:</strong> {metricData.year1} ({metricData.barHeight1}%)</p>
              <p className="text-lg"><strong>Year 2:</strong> {metricData.year2} ({metricData.barHeight2}%)</p>
              <p className="text-lg"><strong>Year 3:</strong> {metricData.year3} ({metricData.barHeight3}%)</p>
            </div>
          )}
        </div>

        {/* Metric Card 2 Editor */}
        <div className="bg-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Metric Card 2</h3>
            {!editingMetric2 && (
              <button
                onClick={startMetric2Edit}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded text-lg transition-colors"
              >
                <i className="ri-edit-line"></i>
              </button>
            )}
          </div>
          
          {editingMetric2 ? (
            <div className="space-y-4">
              <input
                type="text"
                value={metricForm2.value}
                onChange={(e) => setMetricForm2({ ...metricForm2, value: e.target.value })}
                className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                placeholder="Big Number"
              />
              <input
                type="text"
                value={metricForm2.label}
                onChange={(e) => setMetricForm2({ ...metricForm2, label: e.target.value })}
                className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                placeholder="Text Below Number"
              />
              <input
                type="number"
                value={metricForm2.percentage}
                onChange={(e) => setMetricForm2({ ...metricForm2, percentage: e.target.value })}
                className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                placeholder="Circle Percentage"
                min="0"
                max="100"
              />
              <input
                type="text"
                value={metricForm2.chartValue}
                onChange={(e) => setMetricForm2({ ...metricForm2, chartValue: e.target.value })}
                className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                placeholder="Chart Value (e.g., $3,596.42)"
              />
              <div className="flex space-x-3">
                <button
                  onClick={saveMetric2Edit}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-check-line mr-2"></i>
                  Save
                </button>
                <button
                  onClick={cancelMetric2Edit}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-close-line mr-2"></i>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-300">
              <p className="text-lg"><strong>Number:</strong> {metricData2.value}</p>
              <p className="text-lg"><strong>Label:</strong> {metricData2.label}</p>
              <p className="text-lg"><strong>Percentage:</strong> {metricData2.percentage}%</p>
              <p className="text-lg"><strong>Chart Value:</strong> {metricData2.chartValue}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-6 max-h-screen overflow-y-auto">
          {locations.map((location) => (
            <div key={location.id} className="bg-gray-700 rounded-lg p-6">
              {editingId === location.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.city || ''}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    value={editForm.state || ''}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    value={editForm.nextStep || ''}
                    onChange={(e) => setEditForm({ ...editForm, nextStep: e.target.value })}
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                    placeholder="Next Step"
                  />
                  <input
                    type="text"
                    value={editForm.targetDate || ''}
                    onChange={(e) => setEditForm({ ...editForm, targetDate: e.target.value })}
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded text-lg"
                    placeholder="Target Date"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-lg transition-colors whitespace-nowrap"
                    >
                      <i className="ri-check-line mr-2"></i>
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-lg transition-colors whitespace-nowrap"
                    >
                      <i className="ri-close-line mr-2"></i>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-white text-xl">{location.city}, {location.state}</h3>
                      <p className="text-lg text-gray-300 mt-1">{location.nextStep}</p>
                      <p className="text-lg text-gray-400 mt-1">{location.targetDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(location)}
                        className="bg-blue-600 hover:bg-blue-707 text-white p-2 rounded text-lg transition-colors"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => onRemoveLocation(location.id)}
                        className="bg-red-600 hover:bg-red-7 text-white p-2 rounded text-lg transition-colors"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg text-gray-300">Progress</span>
                      <span className="text-lg font-semibold text-white">{location.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${location.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => decrementProgress(location.id, location.progress)}
                      disabled={location.progress <= 0}
                      className="bg-red-600 hover:bg-red-707 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-lg transition-colors whitespace-nowrap"
                    >
                      <i className="ri-subtract-line mr-2"></i>
                      -4%
                    </button>
                    <button
                      onClick={() => incrementProgress(location.id, location.progress)}
                      disabled={location.progress >= 100}
                      className="bg-green-600 hover:bg-green-707 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-lg transition-colors whitespace-nowrap"
                    >
                      <i className="ri-add-line mr-2"></i>
                      +4%
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
