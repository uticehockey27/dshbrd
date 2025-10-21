
import { useState, useEffect } from 'react';

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

interface MetricData3 {
  id: string;
  value: string;
  label: string;
}

interface MetricData4 {
  id: string;
  value: string;
  label: string;
}

interface MetricData5 {
  id: string;
  value: string;
  label: string;
  percentage: string;
  chartValue: string;
  goalValue: string;
}

interface MetricData6 {
  id: string;
  value: string;
  label: string;
  gaugePercentage: string;
}

interface MetricData7 {
  id: string;
  value: string;
  label: string;
  month1: string;
  month2: string;
  month3: string;
  month4: string;
  barHeight1: string;
  barHeight2: string;
  barHeight3: string;
  barHeight4: string;
}

export default function Control() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      city: 'Brookline',
      state: 'MA',
      progress: 95,
      nextStep: 'Graphic & Signage Installation',
      targetDate: '02/22/26'
    },
    {
      id: '2',
      city: 'Ashburn',
      state: 'VA',
      progress: 88,
      nextStep: 'Certificate of Occupancy',
      targetDate: '10/15/25'
    },
    {
      id: '3',
      city: 'Urbana',
      state: 'MD',
      progress: 92,
      nextStep: 'Grand Opening',
      targetDate: '10/30/25'
    },
    {
      id: '4',
      city: 'Ravenswood',
      state: 'IL',
      progress: 76,
      nextStep: 'iCode In-a-Box Delivery',
      targetDate: '11/14/25'
    },
    {
      id: '5',
      city: 'Riverview',
      state: 'FL',
      progress: 52,
      nextStep: '1st Round Inspections',
      targetDate: '12/24/25'
    },
    {
      id: '6',
      city: 'Bee Cave',
      state: 'TX',
      progress: 68,
      nextStep: 'Paint & Trim',
      targetDate: '01/28/26'
    },
    {
      id: '7',
      city: 'Bowie',
      state: 'MD',
      progress: 44,
      nextStep: '1st Round Inspections',
      targetDate: '03/02/26'
    },
    {
      id: '8',
      city: 'East Renton',
      state: 'WA',
      progress: 32,
      nextStep: 'Construction Started',
      targetDate: '03/26/26'
    },
    {
      id: '9',
      city: 'San Ramon',
      state: 'CA',
      progress: 24,
      nextStep: 'Construction Permit Approved',
      targetDate: '04/14/26'
    },
    {
      id: '10',
      city: 'Bee Cave',
      state: 'TX',
      progress: 16,
      nextStep: 'GC Selection',
      targetDate: '04/31/26'
    }
  ]);

  // Metric data states with localStorage integration
  const [metricData, setMetricData] = useState<MetricData>(() => {
    const saved = localStorage.getItem('dashboardMetricData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved metric data:', e);
      }
    }
    return {
      id: 'in-progress',
      value: '10',
      label: 'In Progress',
      year1: '2024',
      year2: '2025',
      year3: '2026',
      barHeight1: '67',
      barHeight2: '100',
      barHeight3: '83'
    };
  });

  const [metricData2, setMetricData2] = useState<MetricData2>(() => {
    const saved = localStorage.getItem('dashboardMetricData2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved metric data 2:', e);
      }
    }
    return {
      id: 'opened-ytd',
      value: '12',
      label: 'Opened YTD',
      percentage: '75',
      chartValue: '$3,596.42'
    };
  });

  const [metricData3, setMetricData3] = useState<MetricData3>(() => {
    const saved = localStorage.getItem('dashboardMetricData3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved metric data 3:', e);
      }
    }
    return {
      id: 'real-estate-search',
      value: '8',
      label: 'Real Estate Search'
    };
  });

  const [metricData4, setMetricData4] = useState<MetricData4>(() => {
    const saved = localStorage.getItem('dashboardMetricData4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved metric data 4:', e);
      }
    }
    return {
      id: 'real-estate-negotiations',
      value: '4',
      label: 'Real Estate Negotiations'
    };
  });

  const [metricData5, setMetricData5] = useState<MetricData5>(() => {
    const saved = localStorage.getItem('dashboardMetricData5');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved metric data 5:', e);
      }
    }
    return {
      id: 'total-icode-locations',
      value: '12',
      label: 'Total iCode Locations',
      percentage: '75',
      chartValue: '$3,596.42',
      goalValue: '100'
    };
  });

  const [metricData6, setMetricData6] = useState<MetricData6>(() => {
    const saved = localStorage.getItem('dashboardMetricData6');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved metric data 6:', e);
      }
    }
    return {
      id: 'ordering-icode-in-a-box',
      value: '2',
      label: 'Ordering iCode-in-a-Box',
      gaugePercentage: '50'
    };
  });

  const [metricData7, setMetricData7] = useState<MetricData7>(() => {
    const saved = localStorage.getItem('dashboardMetricData7');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved metric data 7:', e);
      }
    }
    return {
      id: 'new-location-signed',
      value: '2',
      label: 'New Location Signed',
      month1: 'Jan',
      month2: 'Feb',
      month3: 'Mar',
      month4: 'Apr',
      barHeight1: '50',
      barHeight2: '100',
      barHeight3: '75',
      barHeight4: '90'
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('dashboardMetricData', JSON.stringify(metricData));
  }, [metricData]);

  useEffect(() => {
    localStorage.setItem('dashboardMetricData2', JSON.stringify(metricData2));
  }, [metricData2]);

  useEffect(() => {
    localStorage.setItem('dashboardMetricData3', JSON.stringify(metricData3));
  }, [metricData3]);

  useEffect(() => {
    localStorage.setItem('dashboardMetricData4', JSON.stringify(metricData4));
  }, [metricData4]);

  useEffect(() => {
    localStorage.setItem('dashboardMetricData5', JSON.stringify(metricData5));
  }, [metricData5]);

  useEffect(() => {
    localStorage.setItem('dashboardMetricData6', JSON.stringify(metricData6));
  }, [metricData6]);

  useEffect(() => {
    localStorage.setItem('dashboardMetricData7', JSON.stringify(metricData7));
  }, [metricData7]);

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Location>>({});
  const [editingMetric, setEditingMetric] = useState(false);
  const [metricForm, setMetricForm] = useState<MetricData>(metricData);
  const [editingMetric2, setEditingMetric2] = useState(false);
  const [metricForm2, setMetricForm2] = useState<MetricData2>(metricData2);
  const [editingMetric3, setEditingMetric3] = useState(false);
  const [metricForm3, setMetricForm3] = useState<MetricData3>(metricData3);
  const [editingMetric4, setEditingMetric4] = useState(false);
  const [metricForm4, setMetricForm4] = useState<MetricData4>(metricData4);
  const [editingMetric5, setEditingMetric5] = useState(false);
  const [metricForm5, setMetricForm5] = useState<MetricData5>(metricData5);
  const [editingMetric6, setEditingMetric6] = useState(false);
  const [metricForm6, setMetricForm6] = useState<MetricData6>(metricData6);
  const [editingMetric7, setEditingMetric7] = useState(false);
  const [metricForm7, setMetricForm7] = useState<MetricData7>(metricData7);

  // Helper functions
  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocations(prev =>
      prev.map(loc => (loc.id === id ? { ...loc, ...updates } : loc))
    );
  };

  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const incrementProgress = (id: string, currentProgress: number) => {
    const newProgress = Math.min(currentProgress + 4, 100);
    updateLocation(id, { progress: newProgress });
  };

  const decrementProgress = (id: string, currentProgress: number) => {
    const newProgress = Math.max(currentProgress - 4, 0);
    updateLocation(id, { progress: newProgress });
  };

  // Location edit functions
  const startEdit = (location: Location) => {
    setEditingId(location.id);
    setEditForm(location);
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      updateLocation(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Metric edit functions
  const createMetricEditFunctions = (
    metricData: any,
    setMetricData: (data: any) => void,
    setEditing: (editing: boolean) => void,
    setForm: (form: any) => void
  ) => ({
    start: () => {
      setEditing(true);
      setForm(metricData);
    },
    save: (form: any) => {
      setMetricData(form);
      setEditing(false);
    },
    cancel: () => {
      setEditing(false);
      setForm(metricData);
    }
  });

  const metric1Edit = createMetricEditFunctions(metricData, setMetricData, setEditingMetric, setMetricForm);
  const metric2Edit = createMetricEditFunctions(metricData2, setMetricData2, setEditingMetric2, setMetricForm2);
  const metric3Edit = createMetricEditFunctions(metricData3, setMetricData3, setEditingMetric3, setMetricForm3);
  const metric4Edit = createMetricEditFunctions(metricData4, setMetricData4, setEditingMetric4, setMetricForm4);
  const metric5Edit = createMetricEditFunctions(metricData5, setMetricData5, setEditingMetric5, setMetricForm5);
  const metric6Edit = createMetricEditFunctions(metricData6, setMetricData6, setEditingMetric6, setMetricForm6);
  const metric7Edit = createMetricEditFunctions(metricData7, setMetricData7, setEditingMetric7, setMetricForm7);

  const renderMetricEditor = (
    title: string,
    editing: boolean,
    data: any,
    form: any,
    setForm: (form: any) => void,
    editFunctions: any,
    type: 'bar' | 'donut' | 'pie' | 'gauge' | 'monthly-bar'
  ) => (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {!editing && (
          <button
            onClick={editFunctions.start}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <i className="ri-edit-line mr-2"></i>
            Edit
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={form.value}
              onChange={e => setForm({ ...form, value: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
              placeholder="Big Number"
            />
            <input
              type="text"
              value={form.label}
              onChange={e => setForm({ ...form, label: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
              placeholder="Text Below Number"
            />
          </div>

          {type === 'bar' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['1', '2', '3'].map(num => (
                <div key={num} className="space-y-2">
                  <label className="text-sm text-gray-300">Year {num}</label>
                  <input
                    type="text"
                    value={form[`year${num}`]}
                    onChange={e => setForm({ ...form, [`year${num}`]: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                    placeholder={`Year ${num}`}
                  />
                  <input
                    type="number"
                    value={form[`barHeight${num}`]}
                    onChange={e => setForm({ ...form, [`barHeight${num}`]: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                    placeholder="Bar Height %"
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
          )}

          {type === 'monthly-bar' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['1', '2', '3', '4'].map(num => (
                <div key={num} className="space-y-2">
                  <label className="text-sm text-gray-300">Month {num}</label>
                  <input
                    type="text"
                    value={form[`month${num}`]}
                    onChange={e => setForm({ ...form, [`month${num}`]: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                    placeholder={`Month ${num}`}
                  />
                  <input
                    type="number"
                    value={form[`barHeight${num}`]}
                    onChange={e => setForm({ ...form, [`barHeight${num}`]: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                    placeholder="Bar Height %"
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
          )}

          {(type === 'donut') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                value={form.percentage}
                onChange={e => setForm({ ...form, percentage: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                placeholder="Circle Percentage"
                min="0"
                max="100"
              />
              <input
                type="text"
                value={form.chartValue}
                onChange={e => setForm({ ...form, chartValue: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                placeholder="Goal Value"
              />
              {form.goalValue !== undefined && (
                <input
                  type="text"
                  value={form.goalValue}
                  onChange={e => setForm({ ...form, goalValue: e.target.value })}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                  placeholder="Additional Goal Value"
                />
              )}
            </div>
          )}

          {type === 'pie' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <i className="ri-information-line text-blue-600 mr-2 mt-1"></i>
                <div className="text-blue-800 text-sm">
                  <p><strong>Pie Chart Formula:</strong> (Card Value ÷ Card 1 Value) × 100</p>
                  <p className="mt-1">
                    Current calculation: ({form.value} ÷ {metricData.value}) × 100 = {' '}
                    {Math.round((parseInt(form.value || '0') / parseInt(metricData.value || '1')) * 100 * 10) / 10}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {type === 'gauge' && (
            <div>
              <label className="block text-sm text-gray-300 mb-2">Gauge Percentage (1-100)</label>
              <input
                type="number"
                value={form.gaugePercentage}
                onChange={e => setForm({ ...form, gaugePercentage: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg"
                placeholder="Gauge Percentage"
                min="1"
                max="100"
              />
              <div className="mt-2 text-sm text-gray-400">
                <p>• 1-33%: Slow (Red section)</p>
                <p>• 34-66%: Target (Yellow section)</p>
                <p>• 67-100%: Fast (Green section)</p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => editFunctions.save(form)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap flex items-center justify-center"
            >
              <i className="ri-check-line mr-2"></i>
              Save Changes
            </button>
            <button
              onClick={editFunctions.cancel}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap flex items-center justify-center"
            >
              <i className="ri-close-line mr-2"></i>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p><strong>Number:</strong> {data.value}</p>
              <p><strong>Label:</strong> {data.label}</p>
            </div>
            <div>
              {type === 'bar' && (
                <>
                  <p><strong>{data.year1}:</strong> {data.barHeight1}%</p>
                  <p><strong>{data.year2}:</strong> {data.barHeight2}%</p>
                  <p><strong>{data.year3}:</strong> {data.barHeight3}%</p>
                </>
              )}
              {type === 'monthly-bar' && (
                <>
                  <p><strong>{data.month1}:</strong> {data.barHeight1}%</p>
                  <p><strong>{data.month2}:</strong> {data.barHeight2}%</p>
                  <p><strong>{data.month3}:</strong> {data.barHeight3}%</p>
                  <p><strong>{data.month4}:</strong> {data.barHeight4}%</p>
                </>
              )}
              {type === 'donut' && (
                <>
                  <p><strong>Percentage:</strong> {data.percentage}%</p>
                  <p><strong>Goal Value:</strong> {data.chartValue}</p>
                  {data.goalValue && <p><strong>Additional Goal:</strong> {data.goalValue}</p>}
                </>
              )}
              {type === 'pie' && (
                <>
                  <p><strong>Pie Percentage:</strong> {Math.round((parseInt(data.value) / parseInt(metricData.value)) * 100 * 10) / 10}%</p>
                  <p><strong>Formula:</strong> ({data.value} ÷ {metricData.value}) × 100</p>
                </>
              )}
              {type === 'gauge' && (
                <>
                  <p><strong>Gauge Percentage:</strong> {data.gaugePercentage}%</p>
                  <p><strong>Section:</strong> {
                    parseInt(data.gaugePercentage) <= 33 ? 'Slow' :
                    parseInt(data.gaugePercentage) <= 66 ? 'Target' : 'Fast'
                  }</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // New state for dashboard sections
  const [activeSection, setActiveSection] = useState<string>('construction');

  const renderDashboardSection = (title: string, sectionKey: string, content: React.ReactNode) => (
    <div className="bg-gray-800 rounded-lg mb-6">
      <button
        onClick={() => setActiveSection(activeSection === sectionKey ? '' : sectionKey)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-700 transition-colors rounded-lg"
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <i className={`ri-arrow-${activeSection === sectionKey ? 'up' : 'down'}-s-line text-2xl text-gray-400`}></i>
      </button>
      
      {activeSection === sectionKey && (
        <div className="px-6 pb-6">
          {content}
        </div>
      )}
    </div>
  );

  const constructionDashboardContent = (
    <div className="space-y-6">
      {/* Metric Card Editors */}
      {renderMetricEditor(`Metric Card 1 - ${metricData.label}`, editingMetric, metricData, metricForm, setMetricForm, metric1Edit, 'bar')}
      {renderMetricEditor(`Metric Card 2 - ${metricData2.label}`, editingMetric2, metricData2, metricForm2, setMetricForm2, metric2Edit, 'donut')}
      {renderMetricEditor(`Metric Card 3 - ${metricData3.label}`, editingMetric3, metricData3, metricForm3, setMetricForm3, metric3Edit, 'pie')}
      {renderMetricEditor(`Metric Card 4 - ${metricData4.label}`, editingMetric4, metricData4, metricForm4, setMetricForm4, metric4Edit, 'pie')}
      {renderMetricEditor(`Metric Card 5 - ${metricData5.label}`, editingMetric5, metricData5, metricForm5, setMetricForm5, metric5Edit, 'donut')}
      {renderMetricEditor(`Metric Card 6 - ${metricData6.label}`, editingMetric6, metricData6, metricForm6, setMetricForm6, metric6Edit, 'gauge')}
      {renderMetricEditor(`Metric Card 7 - ${metricData7.label}`, editingMetric7, metricData7, metricForm7, setMetricForm7, metric7Edit, 'monthly-bar')}

      {/* Location Controls */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Location Progress Controls</h3>
        <div className="space-y-4">
          {locations.map(location => (
            <div key={location.id} className="bg-gray-600 rounded-lg p-4">
              {editingId === location.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editForm.city || ''}
                      onChange={e => setEditForm({ ...editForm, city: e.target.value })}
                      className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={editForm.state || ''}
                      onChange={e => setEditForm({ ...editForm, state: e.target.value })}
                      className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg"
                      placeholder="State"
                    />
                  </div>
                  <input
                    type="text"
                    value={editForm.nextStep || ''}
                    onChange={e => setEditForm({ ...editForm, nextStep: e.target.value })}
                    className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg"
                    placeholder="Next Step"
                  />
                  <input
                    type="text"
                    value={editForm.targetDate || ''}
                    onChange={e => setEditForm({ ...editForm, targetDate: e.target.value })}
                    className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg"
                    placeholder="Target Date"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap flex items-center justify-center"
                    >
                      <i className="ri-check-line mr-2"></i>
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap flex items-center justify-center"
                    >
                      <i className="ri-close-line mr-2"></i>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-white">{location.city}, {location.state}</p>
                  <p className="text-gray-300"><strong>Next Step:</strong> {location.nextStep}</p>
                  <p className="text-gray-300"><strong>Target Date:</strong> {location.targetDate}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Progress:</span>
                    <div className="flex-1 bg-gray-500 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-green-500 h-4"
                        style={{ width: `${location.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-300">{location.progress}%</span>
                    <button
                      onClick={() => incrementProgress(location.id, location.progress)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                      title="Increase progress"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementProgress(location.id, location.progress)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      title="Decrease progress"
                    >
                      -
                    </button>
                    <button
                      onClick={() => startEdit(location)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                      title="Edit location"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => removeLocation(location.id)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                      title="Delete location"
                    >
                      🗑
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard Control Panel</h1>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center"
          >
            <i className="ri-tv-line mr-2"></i>
            View Dashboard
          </a>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Construction Dashboard */}
        {renderDashboardSection('Construction Dashboard', 'construction', constructionDashboardContent)}

        {/* Warehouse Dashboard */}
        {renderDashboardSection('Warehouse Dashboard', 'warehouse', (
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <i className="ri-building-2-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-400 text-lg">Warehouse dashboard controls will be added here</p>
          </div>
        ))}

        {/* Marketing Dashboard */}
        {renderDashboardSection('Marketing Dashboard', 'marketing', (
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <i className="ri-megaphone-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-400 text-lg">Marketing dashboard controls will be added here</p>
          </div>
        ))}

        {/* Curriculum Dashboard */}
        {renderDashboardSection('Curriculum Dashboard', 'curriculum', (
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <i className="ri-book-open-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-400 text-lg">Curriculum dashboard controls will be added here</p>
          </div>
        ))}

        {/* Sales Dashboard */}
        {renderDashboardSection('Sales Dashboard', 'sales', (
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <i className="ri-line-chart-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-400 text-lg">Sales dashboard controls will be added here</p>
          </div>
        ))}
      </div>
    </div>
  );
}
