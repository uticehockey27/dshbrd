
import { useState, useEffect } from 'react';
import MetricCard from './components/MetricCard';
import LocationProgress from './components/LocationProgress';

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

const categories = [
  { id: 'construction', name: 'Construction', icon: 'ri-building-line' },
  { id: 'marketing', name: 'Marketing', icon: 'ri-megaphone-line' },
  { id: 'sales', name: 'Sales', icon: 'ri-line-chart-line' },
  { id: 'curriculum', name: 'Curriculum', icon: 'ri-book-open-line' },
];

export default function Dashboard() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [countdown, setCountdown] = useState(60);
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
    }
  ]);

  // Load metric data from localStorage or use default
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

  // Load metric data 2 from localStorage or use default
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

  // Load metric data 3 from localStorage or use default
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

  // Load metric data 4 from localStorage or use default
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

  // Load metric data 5 from localStorage or use default
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

  // Load metric data 6 from localStorage or use default
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

  // Load metric data 7 from localStorage or use default
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

  // Auto-rotation and countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCurrentCategory(prevCategory => (prevCategory + 1) % categories.length);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic values for other cards only (not the first two metric cards)
  const totalLocations = locations.length;

  const updateLocation = (id: string, updates: Partial<Location>) => {
    setLocations(prev =>
      prev.map(loc => (loc.id === id ? { ...loc, ...updates } : loc))
    );
  };

  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  // Force sync with localStorage on component mount
  useEffect(() => {
    const syncWithLocalStorage = () => {
      const savedMetric = localStorage.getItem('dashboardMetricData');
      const savedMetric2 = localStorage.getItem('dashboardMetricData2');
      const savedMetric3 = localStorage.getItem('dashboardMetricData3');
      const savedMetric4 = localStorage.getItem('dashboardMetricData4');
      const savedMetric5 = localStorage.getItem('dashboardMetricData5');
      const savedMetric6 = localStorage.getItem('dashboardMetricData6');
      const savedMetric7 = localStorage.getItem('dashboardMetricData7');

      if (savedMetric) {
        try {
          setMetricData(JSON.parse(savedMetric));
        } catch (e) {
          console.error('Error parsing metric data:', e);
        }
      }

      if (savedMetric2) {
        try {
          setMetricData2(JSON.parse(savedMetric2));
        } catch (e) {
          console.error('Error parsing metric data 2:', e);
        }
      }

      if (savedMetric3) {
        try {
          setMetricData3(JSON.parse(savedMetric3));
        } catch (e) {
          console.error('Error parsing metric data 3:', e);
        }
      }

      if (savedMetric4) {
        try {
          setMetricData4(JSON.parse(savedMetric4));
        } catch (e) {
          console.error('Error parsing metric data 4:', e);
        }
      }

      if (savedMetric5) {
        try {
          setMetricData5(JSON.parse(savedMetric5));
        } catch (e) {
          console.error('Error parsing metric data 5:', e);
        }
      }

      if (savedMetric6) {
        try {
          setMetricData6(JSON.parse(savedMetric6));
        } catch (e) {
          console.error('Error parsing metric data 6:', e);
        }
      }

      if (savedMetric7) {
        try {
          setMetricData7(JSON.parse(savedMetric7));
        } catch (e) {
          console.error('Error parsing metric data 7:', e);
        }
      }
    };

    // Sync immediately on mount
    syncWithLocalStorage();
  }, []);

  const countdownPercentage = ((60 - countdown) / 60) * 100;
  const strokeDashArray = `${(countdownPercentage / 100) * 251.2}, 251.2`;

  const renderConstructionDashboard = () => (
    <>
      {/* Top Metrics Row */}
      <div className="grid grid-cols-7 gap-8 mb-6 px-12">
        <MetricCard
          value={metricData.value}
          label={metricData.label}
          icon="ri-progress-3-line"
          color="bg-gradient-to-br from-yellow-500 to-green-500"
          chart="yearly-bar"
          year1={metricData.year1}
          year2={metricData.year2}
          year3={metricData.year3}
          barHeight1={metricData.barHeight1}
          barHeight2={metricData.barHeight2}
          barHeight3={metricData.barHeight3}
        />
        <MetricCard
          value={metricData2.value}
          label={metricData2.label}
          icon="ri-check-double-line"
          color="bg-gradient-to-br from-blue-500 to-cyan-500"
          chart="donut"
          chartValue={metricData2.chartValue}
          percentage={metricData2.percentage}
        />
        <MetricCard
          value={metricData3.value}
          label={metricData3.label}
          icon="ri-map-pin-line"
          color="bg-gradient-to-br from-red-500 to-pink-500"
          chart="vertical-bar"
          year1={metricData.year1}
          year2={metricData.year2}
          year3={metricData.year3}
          barHeight1={metricData.barHeight1}
          barHeight2={metricData.barHeight2}
          barHeight3={metricData.barHeight3}
        />
        <MetricCard
          value={metricData4.value}
          label={metricData4.label}
          icon="ri-handshake-line"
          color="bg-gradient-to-br from-purple-500 to-indigo-500"
          chart="pie"
          referenceValue={metricData.value}
        />
        <MetricCard
          value={metricData5.value}
          label={metricData5.label}
          icon="ri-check-double-line"
          color="bg-gradient-to-br from-teal-500 to-blue-500"
          chart="donut"
          chartValue={metricData5.chartValue}
          percentage={metricData5.percentage}
          goalValue={metricData5.goalValue}
        />
        <MetricCard
          value={metricData6.value}
          label={metricData6.label}
          icon="ri-box-3-line"
          color="bg-gradient-to-br from-orange-500 to-red-500"
          chart="gauge"
          gaugePercentage={metricData6.gaugePercentage}
        />
        <MetricCard
          value={metricData7.value}
          label={metricData7.label}
          icon="ri-star-line"
          color="bg-gradient-to-br from-green-500 to-teal-500"
          chart="monthly-bar"
          month1={metricData7.month1}
          month2={metricData7.month2}
          month3={metricData7.month3}
          month4={metricData7.month4}
          barHeight1={metricData7.barHeight1}
          barHeight2={metricData7.barHeight2}
          barHeight3={metricData7.barHeight3}
          barHeight4={metricData7.barHeight4}
        />
      </div>

      {/* Location Progress Section */}
      <div
        className="bg-gray-900 flex-1 w-full relative"
        style={{
          paddingTop: '24px',
          paddingLeft: '48px',
          paddingRight: '48px',
          paddingBottom: '20px'
        }}
      >
        <div className="flex justify-between items-center mb-4 relative z-10">
          <a
            href="/control"
            className="text-3xl font-bold hover:text-blue-400 transition-colors cursor-pointer"
          >
            Construction Progress (Top 10)
          </a>
          <div className="text-right">
            <div className="text-2xl font-semibold">Target Open</div>
          </div>
        </div>
        {/* Background step lines only in the progress area */}
        <div className="relative flex-1">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-gray-400 opacity-35 z-0"
              style={{ left: `${240 + i * 57.6}px` }}
            />
          ))}

          <div
            className="relative z-10"
            style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            {locations.map((location, index) => (
              <LocationProgress
                key={location.id}
                location={location}
                animationDelay={index * 100}
                onComplete={() => {
                  updateLocation(location.id, { progress: 100 });
                  setTimeout(() => removeLocation(location.id), 2000);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderPlaceholderDashboard = (title: string, icon: string) => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <i className={`${icon} text-8xl text-gray-600 mb-6`}></i>
        <h2 className="text-4xl font-bold text-gray-400 mb-4">{title} Dashboard</h2>
        <p className="text-xl text-gray-500">Coming Soon</p>
      </div>
    </div>
  );

  return (
    <div
      className="w-screen h-screen bg-gray-900 text-white relative overflow-hidden"
      style={{ width: '1920px', height: '1080px' }}
    >
      {/* Category Navigation Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => {
                  setCurrentCategory(index);
                  setCountdown(60);
                }}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                  currentCategory === index
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <i className={`${category.icon} text-xl`}></i>
                <span className="text-lg font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="8"
                  strokeDasharray={strokeDashArray}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{countdown}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Next Category</div>
              <div className="text-lg font-semibold text-white">
                {categories[(currentCategory + 1) % categories.length].name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="h-full flex flex-col" style={{ paddingTop: '20px' }}>
        {currentCategory === 0 && renderConstructionDashboard()}
        {currentCategory === 1 && renderPlaceholderDashboard('Marketing', 'ri-megaphone-line')}
        {currentCategory === 2 && renderPlaceholderDashboard('Sales', 'ri-line-chart-line')}
        {currentCategory === 3 && renderPlaceholderDashboard('Curriculum', 'ri-book-open-line')}
      </div>
    </div>
  );
}
