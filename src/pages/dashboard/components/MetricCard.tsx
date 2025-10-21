
import { useState, useEffect } from 'react';

const safeParseInt = (val: string | undefined, fallback = 0): number => {
  const parsed = parseInt(val ?? '');
  return Number.isNaN(parsed) ? fallback : parsed;
};

interface MetricCardProps {
  value: string;
  label: string;
  icon: string;
  color: string;
  chart?: 'bar' | 'donut' | 'yearly-bar' | 'monthly-bar' | 'pie' | 'gauge' | 'vertical-bar';
  chartValue?: string;
  logo?: string;
  year1?: string;
  year2?: string;
  year3?: string;
  month1?: string;
  month2?: string;
  month3?: string;
  month4?: string;
  barHeight1?: string;
  barHeight2?: string;
  barHeight3?: string;
  barHeight4?: string;
  percentage?: string;
  referenceValue?: string;
  goalValue?: string;
  gaugePercentage?: string;
}

export default function MetricCard({
  value,
  label,
  icon,
  color,
  chart,
  chartValue,
  logo,
  year1 = '2024',
  year2 = '2025',
  year3 = '2026',
  month1 = 'Jan',
  month2 = 'Feb',
  month3 = 'Mar',
  month4 = 'Apr',
  barHeight1 = '67',
  barHeight2 = '100',
  barHeight3 = '83',
  barHeight4 = '90',
  percentage = '75',
  referenceValue = '62',
  goalValue = '100',
  gaugePercentage = '50',
}: MetricCardProps) {
  // Animation states
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  
  // Yearly bar chart states
  const [showYearlyLabel, setShowYearlyLabel] = useState(false);
  const [showYearlyNumber, setShowYearlyNumber] = useState(false);
  const [animatedYearlyNumber, setAnimatedYearlyNumber] = useState(0);
  const [animatedBar1Height, setAnimatedBar1Height] = useState(0);
  const [animatedBar2Height, setAnimatedBar2Height] = useState(0);
  const [animatedBar3Height, setAnimatedBar3Height] = useState(0);
  const [showYearLabels, setShowYearLabels] = useState(false);
  
  // Monthly bar chart states (same as yearly but separate for clarity)
  const [showMonthlyLabel, setShowMonthlyLabel] = useState(false);
  const [showMonthlyNumber, setShowMonthlyNumber] = useState(false);
  const [animatedMonthlyNumber, setAnimatedMonthlyNumber] = useState(0);
  const [animatedMonthBar1Height, setAnimatedMonthBar1Height] = useState(0);
  const [animatedMonthBar2Height, setAnimatedMonthBar2Height] = useState(0);
  const [animatedMonthBar3Height, setAnimatedMonthBar3Height] = useState(0);
  const [animatedMonthBar4Height, setAnimatedMonthBar4Height] = useState(0);
  const [showMonthLabels, setShowMonthLabels] = useState(false);
  
  // Vertical bar chart states
  const [showVerticalLabel, setShowVerticalLabel] = useState(false);
  const [showVerticalNumber, setShowVerticalNumber] = useState(false);
  const [animatedVerticalNumber, setAnimatedVerticalNumber] = useState(0);
  const [animatedVerticalBarHeight, setAnimatedVerticalBarHeight] = useState(0);
  const [showVerticalPercentage, setShowVerticalPercentage] = useState(false);
  
  // Pie chart states
  const [showPieLabel, setShowPieLabel] = useState(false);
  const [showPieNumber, setShowPieNumber] = useState(false);
  const [animatedPieNumber, setAnimatedPieNumber] = useState(0);
  const [animatedPieReferenceNumber, setAnimatedPieReferenceNumber] = useState(0);
  const [animatedPiePercentage, setAnimatedPiePercentage] = useState(0);
  const [showPiePercentage, setShowPiePercentage] = useState(false);
  
  // Gauge chart states
  const [showGaugeLabel, setShowGaugeLabel] = useState(false);
  const [showGaugeNumber, setShowGaugeNumber] = useState(false);
  const [animatedGaugeNumber, setAnimatedGaugeNumber] = useState(0);
  const [animatedGaugePercentage, setAnimatedGaugePercentage] = useState(0);
  const [showGaugePercentage, setShowGaugePercentage] = useState(false);

  // Calculate bar heights and other values
  const baseHeight = 48;
  const bar1Height = Math.round(baseHeight * (safeParseInt(barHeight1) / 100));
  const bar2Height = Math.round(baseHeight * (safeParseInt(barHeight2) / 100));
  const bar3Height = Math.round(baseHeight * (safeParseInt(barHeight3) / 100));
  const bar4Height = Math.round(baseHeight * (safeParseInt(barHeight4) / 100));

  // Vertical bar height (single bar)
  const verticalBaseHeight = 120;
  const verticalBarHeight = Math.round(verticalBaseHeight * (safeParseInt(percentage || '75') / 100));

  const isLocationCard = label === 'Total iCode Locations';
  const labelLine1 = isLocationCard ? 'Total iCode' : label;
  const labelLine2 = isLocationCard ? 'Locations' : '';

  const targetPercentage = safeParseInt(percentage);
  const strokeDashArrayValue = `${(animatedPercentage / 100) * 251.2}, 251.2`;

  const piePercentage = chart === 'pie' 
    ? Math.round((safeParseInt(value) / safeParseInt(referenceValue)) * 100 * 10) / 10 
    : 0;
  const pieStrokeDashArrayValue = `${(animatedPiePercentage / 100) * 251.2}, 251.2`;

  const gaugeRotation = (animatedGaugePercentage / 100) * 180;

  // Animation effects
  useEffect(() => {
    if (chart === 'donut') {
      // Reset states
      setShowLabel(false);
      setShowGoal(false);
      setShowNumber(false);
      setShowPercentage(false);
      setAnimatedNumber(0);
      setAnimatedPercentage(0);

      const labelTimer = setTimeout(() => setShowLabel(true), 300);
      const goalTimer = setTimeout(() => setShowGoal(true), 1100);
      
      const numberTimer = setTimeout(() => {
        setShowNumber(true);
        const numberDuration = 1500;
        const numberSteps = 50;
        const numberStepDuration = numberDuration / numberSteps;
        const numberIncrement = safeParseInt(value) / numberSteps;

        let numberCurrentStep = 0;
        const numberInterval = setInterval(() => {
          numberCurrentStep++;
          const newNumber = Math.min(
            Math.round(numberCurrentStep * numberIncrement),
            safeParseInt(value)
          );
          setAnimatedNumber(newNumber);

          if (newNumber >= safeParseInt(value)) {
            clearInterval(numberInterval);
          }
        }, numberStepDuration);
      }, 1700);

      const donutTimer = setTimeout(() => {
        setShowPercentage(true);
        animateDonutBounce();
      }, 3200);

      return () => {
        clearTimeout(labelTimer);
        clearTimeout(goalTimer);
        clearTimeout(numberTimer);
        clearTimeout(donutTimer);
      };
    }

    if (chart === 'yearly-bar') {
      // Reset states
      setShowYearlyLabel(false);
      setShowYearlyNumber(false);
      setAnimatedYearlyNumber(0);
      setAnimatedBar1Height(0);
      setAnimatedBar2Height(0);
      setAnimatedBar3Height(0);
      setShowYearLabels(false);

      const labelTimer = setTimeout(() => setShowYearlyLabel(true), 300);
      
      const numberTimer = setTimeout(() => {
        setShowYearlyNumber(true);
        animateNumber(setAnimatedYearlyNumber, safeParseInt(value));
      }, 1100);

      const barsTimer = setTimeout(() => animateBars(), 2800);
      const yearLabelsTimer = setTimeout(() => setShowYearLabels(true), 4200);

      return () => {
        clearTimeout(labelTimer);
        clearTimeout(numberTimer);
        clearTimeout(barsTimer);
        clearTimeout(yearLabelsTimer);
      };
    }

    if (chart === 'vertical-bar') {
      // Reset states
      setShowVerticalLabel(false);
      setShowVerticalNumber(false);
      setAnimatedVerticalNumber(0);
      setAnimatedVerticalBarHeight(0);
      setShowVerticalPercentage(false);

      const labelTimer = setTimeout(() => setShowVerticalLabel(true), 300);
      
      const numberTimer = setTimeout(() => {
        setShowVerticalNumber(true);
        animateNumber(setAnimatedVerticalNumber, safeParseInt(value));
      }, 1100);

      const barTimer = setTimeout(() => animateVerticalBar(), 2800);
      const percentageTimer = setTimeout(() => setShowVerticalPercentage(true), 4200);

      return () => {
        clearTimeout(labelTimer);
        clearTimeout(numberTimer);
        clearTimeout(barTimer);
        clearTimeout(percentageTimer);
      };
    }

    if (chart === 'monthly-bar') {
      // Reset states
      setShowMonthlyLabel(false);
      setShowMonthlyNumber(false);
      setAnimatedMonthlyNumber(0);
      setAnimatedMonthBar1Height(0);
      setAnimatedMonthBar2Height(0);
      setAnimatedMonthBar3Height(0);
      setAnimatedMonthBar4Height(0);
      setShowMonthLabels(false);

      const labelTimer = setTimeout(() => setShowMonthlyLabel(true), 300);
      
      const numberTimer = setTimeout(() => {
        setShowMonthlyNumber(true);
        animateNumber(setAnimatedMonthlyNumber, safeParseInt(value));
      }, 1100);

      const barsTimer = setTimeout(() => animateMonthlyBars(), 2800);
      const monthLabelsTimer = setTimeout(() => setShowMonthLabels(true), 4200);

      return () => {
        clearTimeout(labelTimer);
        clearTimeout(numberTimer);
        clearTimeout(barsTimer);
        clearTimeout(monthLabelsTimer);
      };
    }

    if (chart === 'pie') {
      // Reset states
      setShowPieLabel(false);
      setShowPieNumber(false);
      setAnimatedPieNumber(0);
      setAnimatedPieReferenceNumber(0);
      setAnimatedPiePercentage(0);
      setShowPiePercentage(false);

      const labelTimer = setTimeout(() => setShowPieLabel(true), 300);
      
      const numberTimer = setTimeout(() => {
        setShowPieNumber(true);
        animatePieNumbers();
      }, 1100);

      const pieTimer = setTimeout(() => {
        setShowPiePercentage(true);
        animatePieBounce();
      }, 2800);

      return () => {
        clearTimeout(labelTimer);
        clearTimeout(numberTimer);
        clearTimeout(pieTimer);
      };
    }

    if (chart === 'gauge') {
      // Reset states
      setShowGaugeLabel(false);
      setShowGaugeNumber(false);
      setAnimatedGaugeNumber(0);
      setAnimatedGaugePercentage(0);
      setShowGaugePercentage(false);

      const labelTimer = setTimeout(() => setShowGaugeLabel(true), 300);
      
      const numberTimer = setTimeout(() => {
        setShowGaugeNumber(true);
        animateNumber(setAnimatedGaugeNumber, safeParseInt(value));
      }, 1100);

      const gaugeTimer = setTimeout(() => {
        setShowGaugePercentage(true);
        animateGauge();
      }, 2800);

      return () => {
        clearTimeout(labelTimer);
        clearTimeout(numberTimer);
        clearTimeout(gaugeTimer);
      };
    }
  }, [chart, targetPercentage, value, referenceValue, bar1Height, bar2Height, bar3Height, bar4Height, piePercentage, gaugePercentage, verticalBarHeight]);

  // Animation helper functions
  const animateNumber = (setter: (value: number) => void, targetValue: number) => {
    const duration = 1500;
    const steps = 50;
    const stepDuration = duration / steps;
    const increment = targetValue / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const newNumber = Math.min(Math.round(currentStep * increment), targetValue);
      setter(newNumber);

      if (newNumber >= targetValue) {
        clearInterval(interval);
      }
    }, stepDuration);
  };

  const animateDonutBounce = () => {
    const firstBounceTarget = targetPercentage + 15;
    const firstBounceSteps = 40;
    const firstBounceIncrement = firstBounceTarget / firstBounceSteps;

    let step1 = 0;
    const bounce1 = setInterval(() => {
      step1++;
      const newPercentage = Math.min(step1 * firstBounceIncrement, firstBounceTarget);
      setAnimatedPercentage(newPercentage);

      if (newPercentage >= firstBounceTarget) {
        clearInterval(bounce1);
        setTimeout(() => animateDonutSecondBounce(firstBounceTarget), 100);
      }
    }, 800 / firstBounceSteps);
  };

  const animateDonutSecondBounce = (firstBounceTarget: number) => {
    const secondBounceTarget = targetPercentage - 8;
    const secondBounceSteps = 20;
    const secondBounceDecrement = (firstBounceTarget - secondBounceTarget) / secondBounceSteps;

    let step2 = 0;
    const bounce2 = setInterval(() => {
      step2++;
      const newPercentage = Math.max(
        firstBounceTarget - step2 * secondBounceDecrement,
        secondBounceTarget
      );
      setAnimatedPercentage(newPercentage);

      if (newPercentage <= secondBounceTarget) {
        clearInterval(bounce2);
        setTimeout(() => animateDonutFinalBounce(secondBounceTarget), 100);
      }
    }, 400 / secondBounceSteps);
  };

  const animateDonutFinalBounce = (secondBounceTarget: number) => {
    const thirdBounceTarget = targetPercentage + 4;
    const thirdBounceSteps = 15;
    const thirdBounceIncrement = (thirdBounceTarget - secondBounceTarget) / thirdBounceSteps;

    let step3 = 0;
    const bounce3 = setInterval(() => {
      step3++;
      const newPercentage = Math.min(
        secondBounceTarget + step3 * thirdBounceIncrement,
        thirdBounceTarget
      );
      setAnimatedPercentage(newPercentage);

      if (newPercentage >= thirdBounceTarget) {
        clearInterval(bounce3);
        setTimeout(() => animateDonutSettle(thirdBounceTarget), 100);
      }
    }, 300 / thirdBounceSteps);
  };

  const animateDonutSettle = (thirdBounceTarget: number) => {
    const settleSteps = 10;
    const settleDecrement = (thirdBounceTarget - targetPercentage) / settleSteps;

    let step4 = 0;
    const settle = setInterval(() => {
      step4++;
      const newPercentage = Math.max(
        thirdBounceTarget - step4 * settleDecrement,
        targetPercentage
      );
      setAnimatedPercentage(newPercentage);

      if (newPercentage <= targetPercentage) {
        clearInterval(settle);
        setAnimatedPercentage(targetPercentage);
      }
    }, 200 / settleSteps);
  };

  const animateBars = () => {
    // Animate bar 1
    const bar1Steps = 40;
    const bar1Increment = bar1Height / bar1Steps;
    let bar1Step = 0;
    const bar1Animation = setInterval(() => {
      bar1Step++;
      const newHeight = Math.min(bar1Step * bar1Increment, bar1Height);
      setAnimatedBar1Height(newHeight);
      if (newHeight >= bar1Height) clearInterval(bar1Animation);
    }, 1000 / bar1Steps);

    // Animate bar 2 with delay
    setTimeout(() => {
      const bar2Steps = 48;
      const bar2Increment = bar2Height / bar2Steps;
      let bar2Step = 0;
      const bar2Animation = setInterval(() => {
        bar2Step++;
        const newHeight = Math.min(bar2Step * bar2Increment, bar2Height);
        setAnimatedBar2Height(newHeight);
        if (newHeight >= bar2Height) clearInterval(bar2Animation);
      }, 1200 / bar2Steps);
    }, 200);

    // Animate bar 3 with delay
    setTimeout(() => {
      const bar3Steps = 40;
      const bar3Increment = bar3Height / bar3Steps;
      let bar3Step = 0;
      const bar3Animation = setInterval(() => {
        bar3Step++;
        const newHeight = Math.min(bar3Step * bar3Increment, bar3Height);
        setAnimatedBar3Height(newHeight);
        if (newHeight >= bar3Height) clearInterval(bar3Animation);
      }, 1000 / bar3Steps);
    }, 400);
  };

  const animateVerticalBar = () => {
    const barSteps = 50;
    const barIncrement = verticalBarHeight / barSteps;
    let barStep = 0;
    const barAnimation = setInterval(() => {
      barStep++;
      const newHeight = Math.min(barStep * barIncrement, verticalBarHeight);
      setAnimatedVerticalBarHeight(newHeight);
      if (newHeight >= verticalBarHeight) clearInterval(barAnimation);
    }, 1200 / barSteps);
  };

  const animatePieNumbers = () => {
    const numberDuration = 1500;
    const numberSteps = 50;
    const numberStepDuration = numberDuration / numberSteps;
    const numberIncrement = safeParseInt(value) / numberSteps;
    const referenceIncrement = safeParseInt(referenceValue) / numberSteps;

    let numberCurrentStep = 0;
    const numberInterval = setInterval(() => {
      numberCurrentStep++;
      const newNumber = Math.min(
        Math.round(numberCurrentStep * numberIncrement),
        safeParseInt(value)
      );
      const newReferenceNumber = Math.min(
        Math.round(numberCurrentStep * referenceIncrement),
        safeParseInt(referenceValue)
      );
      setAnimatedPieNumber(newNumber);
      setAnimatedPieReferenceNumber(newReferenceNumber);

      if (newNumber >= safeParseInt(value) && newReferenceNumber >= safeParseInt(referenceValue)) {
        clearInterval(numberInterval);
      }
    }, numberStepDuration);
  };

  const animatePieBounce = () => {
    const firstPhaseTarget = 50;
    const firstPhaseSteps = 40;
    const firstPhaseIncrement = firstPhaseTarget / firstPhaseSteps;

    let step1 = 0;
    const phase1 = setInterval(() => {
      step1++;
      const newPercentage = Math.min(step1 * firstPhaseIncrement, firstPhaseTarget);
      setAnimatedPiePercentage(newPercentage);

      if (newPercentage >= firstPhaseTarget) {
        clearInterval(phase1);
        setTimeout(() => animatePieOvershoot(firstPhaseTarget), 200);
      }
    }, 800 / firstPhaseSteps);
  };

  const animatePieOvershoot = (firstPhaseTarget: number) => {
    const targetPercentage = piePercentage;
    const overshoot = targetPercentage + 8;
    const overshootSteps = 30;
    const overshootIncrement = (overshoot - firstPhaseTarget) / overshootSteps;

    let step2 = 0;
    const phase2 = setInterval(() => {
      step2++;
      const newPercentage = Math.min(
        firstPhaseTarget + step2 * overshootIncrement,
        overshoot
      );
      setAnimatedPiePercentage(newPercentage);

      if (newPercentage >= overshoot) {
        clearInterval(phase2);
        setTimeout(() => animatePieSettle(overshoot, targetPercentage), 100);
      }
    }, 600 / overshootSteps);
  };

  const animatePieSettle = (overshoot: number, targetPercentage: number) => {
    const settleSteps = 20;
    const settleDecrement = (overshoot - targetPercentage) / settleSteps;

    let step3 = 0;
    const phase3 = setInterval(() => {
      step3++;
      const newPercentage = Math.max(
        overshoot - step3 * settleDecrement,
        targetPercentage
      );
      setAnimatedPiePercentage(newPercentage);

      if (newPercentage <= targetPercentage) {
        clearInterval(phase3);
        setAnimatedPiePercentage(targetPercentage);
      }
    }, 400 / settleSteps);
  };

  const animateGauge = () => {
    const targetGaugePercentage = safeParseInt(gaugePercentage);
    const gaugeDuration = 2000;
    const gaugeSteps = 60;
    const gaugeStepDuration = gaugeDuration / gaugeSteps;
    const gaugeIncrement = targetGaugePercentage / gaugeSteps;

    let gaugeCurrentStep = 0;
    const gaugeInterval = setInterval(() => {
      gaugeCurrentStep++;
      const newPercentage = Math.min(
        gaugeCurrentStep * gaugeIncrement,
        targetGaugePercentage
      );
      setAnimatedGaugePercentage(newPercentage);

      if (newPercentage >= targetGaugePercentage) {
        clearInterval(gaugeInterval);
      }
    }, gaugeStepDuration);
  };

  const animateMonthlyBars = () => {
    // Animate bar 1
    const bar1Steps = 40;
    const bar1Increment = bar1Height / bar1Steps;
    let bar1Step = 0;
    const bar1Animation = setInterval(() => {
      bar1Step++;
      const newHeight = Math.min(bar1Step * bar1Increment, bar1Height);
      setAnimatedMonthBar1Height(newHeight);
      if (newHeight >= bar1Height) clearInterval(bar1Animation);
    }, 1000 / bar1Steps);

    // Animate bar 2 with delay
    setTimeout(() => {
      const bar2Steps = 48;
      const bar2Increment = bar2Height / bar2Steps;
      let bar2Step = 0;
      const bar2Animation = setInterval(() => {
        bar2Step++;
        const newHeight = Math.min(bar2Step * bar2Increment, bar2Height);
        setAnimatedMonthBar2Height(newHeight);
        if (newHeight >= bar2Height) clearInterval(bar2Animation);
      }, 1200 / bar2Steps);
    }, 200);

    // Animate bar 3 with delay
    setTimeout(() => {
      const bar3Steps = 40;
      const bar3Increment = bar3Height / bar3Steps;
      let bar3Step = 0;
      const bar3Animation = setInterval(() => {
        bar3Step++;
        const newHeight = Math.min(bar3Step * bar3Increment, bar3Height);
        setAnimatedMonthBar3Height(newHeight);
        if (newHeight >= bar3Height) clearInterval(bar3Animation);
      }, 1000 / bar3Steps);
    }, 400);

    // Animate bar 4 with delay
    setTimeout(() => {
      const bar4Steps = 45;
      const bar4Increment = bar4Height / bar4Steps;
      let bar4Step = 0;
      const bar4Animation = setInterval(() => {
        bar4Step++;
        const newHeight = Math.min(bar4Step * bar4Increment, bar4Height);
        setAnimatedMonthBar4Height(newHeight);
        if (newHeight >= bar4Height) clearInterval(bar4Animation);
      }, 1100 / bar4Steps);
    }, 600);
  };

  return (
    <div className={`${color} rounded-xl p-8 text-white relative overflow-hidden h-56`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-2 -left-2 w-20 h-20 rounded-full bg-white/10"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Standard card header */}
        {chart !== 'yearly-bar' && chart !== 'monthly-bar' && chart !== 'donut' && chart !== 'pie' && chart !== 'gauge' && chart !== 'vertical-bar' && (
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <i className={`${icon} text-3xl`}></i>
            </div>
            {logo && (
              <div className="text-sm font-bold bg-white/20 px-3 py-2 rounded">
                {logo}
              </div>
            )}
          </div>
        )}

        {/* Standard card content */}
        {chart !== 'donut' && chart !== 'yearly-bar' && chart !== 'monthly-bar' && chart !== 'pie' && chart !== 'gauge' && chart !== 'vertical-bar' && (
          <div className="mb-4 flex-1">
            <div className="text-5xl font-bold mb-2">{value}</div>
            <div className="text-lg opacity-90 font-medium leading-tight">
              {labelLine1}
              {labelLine2 && (
                <>
                  <br />
                  {labelLine2}
                </>
              )}
            </div>
          </div>
        )}

        {/* Yearly bar chart */}
        {chart === 'yearly-bar' && (
          <div className="mb-3 text-center flex-1 flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-center" style={{ transform: 'translateY(-10px)' }}>
              <div className={`text-5xl font-bold mb-2 transition-opacity duration-700 ${
                showYearlyNumber ? 'opacity-100' : 'opacity-0'
              }`}>
                {animatedYearlyNumber}
              </div>
              <div className={`text-lg opacity-90 font-medium leading-tight transition-opacity duration-700 ${
                showYearlyLabel ? 'opacity-100' : 'opacity-0'
              }`}>
                {labelLine1}
                {labelLine2 && (
                  <>
                    <br />
                    {labelLine2}
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-1" style={{ transform: 'translateY(-10px)' }}>
              <div className="flex items-end justify-center space-x-3" style={{ height: '65px' }}>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: '42px',
                      height: `${animatedBar1Height}px`,
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                    }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-sm transition-all duration-1200 ease-out"
                    style={{
                      width: '42px',
                      height: `${animatedBar2Height}px`,
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                    }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: '42px',
                      height: `${animatedBar3Height}px`,
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="w-full h-0.5 bg-white/60"></div>
              
              <div
                className={`flex justify-center space-x-3 text-sm font-medium opacity-90 transition-opacity duration-700 ${
                  showYearLabels ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ paddingTop: '2px' }}
              >
                <span style={{ width: '42px', textAlign: 'center' }}>{year1}</span>
                <span style={{ width: '42px', textAlign: 'center' }}>{year2}</span>
                <span style={{ width: '42px', textAlign: 'center' }}>{year3}</span>
              </div>
            </div>
          </div>
        )}

        {/* Vertical bar chart */}
        {chart === 'vertical-bar' && (
          <div className="mb-3 flex-1 flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-center" style={{ transform: 'translateY(-20px)' }}>
              <div className={`text-5xl font-bold mb-2 text-left transition-opacity duration-700 ${
                showVerticalNumber ? 'opacity-100' : 'opacity-0'
              }`}>
                {animatedVerticalNumber}
              </div>
              <div className={`text-lg opacity-90 font-medium leading-tight text-left transition-opacity duration-700 ${
                showVerticalLabel ? 'opacity-100' : 'opacity-0'
              }`}>
                {label === 'Real Estate Search' ? (
                  <>
                    Real Estate<br />
                    Search
                  </>
                ) : (
                  <>
                    {labelLine1}
                    {labelLine2 && (
                      <>
                        <br />
                        {labelLine2}
                      </>
                )}
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-1 flex justify-end items-end" style={{ transform: 'translateY(-50px)', height: '140px' }}>
              <div className="flex flex-col items-center justify-end h-full">
                <div
                  className="rounded-lg transition-all duration-1200 ease-out relative"
                  style={{
                    width: '60px',
                    height: `${animatedVerticalBarHeight}px`,
                    transformOrigin: 'bottom',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                  }}
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                      showVerticalPercentage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <span className="text-sm font-bold text-gray-800">
                      {percentage || '75'}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly bar chart */}
        {chart === 'monthly-bar' && (
          <div className="mb-3 text-center flex-1 flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-center" style={{ transform: 'translateY(-10px)' }}>
              <div className={`text-5xl font-bold mb-2 transition-opacity duration-700 ${
                showMonthlyNumber ? 'opacity-100' : 'opacity-0'
              }`}>
                {animatedMonthlyNumber}
              </div>
              <div className={`text-lg opacity-90 font-medium leading-tight transition-opacity duration-700 ${
                showMonthlyLabel ? 'opacity-100' : 'opacity-0'
              }`}>
                {labelLine1}
                {labelLine2 && (
                  <>
                    <br />
                    {labelLine2}
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-1" style={{ transform: 'translateY(-10px)' }}>
              <div className="flex items-end justify-center space-x-2" style={{ height: '65px' }}>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: '31px',
                      height: `${animatedMonthBar1Height}px`,
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                    }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-sm transition-all duration-1200 ease-out"
                    style={{
                      width: '31px',
                      height: `${animatedMonthBar2Height}px`,
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                    }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: '31px',
                      height: `${animatedMonthBar3Height}px`,
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                    }}
                  ></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-sm transition-all duration-1100 ease-out"
                    style={{
                      width: '31px',
                      height: `${animatedMonthBar4Height}px`,
                      transformOrigin: 'bottom',
                      background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)'
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="w-full h-0.5 bg-white/60"></div>
              
              <div
                className={`flex justify-center space-x-2 text-sm font-medium opacity-90 transition-opacity duration-700 ${
                  showMonthLabels ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ paddingTop: '2px' }}
              >
                <span style={{ width: '31px', textAlign: 'center' }}>{month1}</span>
                <span style={{ width: '31px', textAlign: 'center' }}>{month2}</span>
                <span style={{ width: '31px', textAlign: 'center' }}>{month3}</span>
                <span style={{ width: '31px', textAlign: 'center' }}>{month4}</span>
              </div>
            </div>
          </div>
        )}

        {/* Pie chart */}
        {chart === 'pie' && (
          <div className="mb-4 flex-1">
            <div className={`text-5xl font-bold mb-2 text-center transition-opacity duration-700 ${
              showPieNumber ? 'opacity-100' : 'opacity-0'
            }`}>
              {animatedPieNumber} <span className="text-2xl">of</span> {animatedPieReferenceNumber}
            </div>
            <div className={`text-lg opacity-90 font-medium leading-tight mb-6 text-center transition-opacity duration-700 ${
              showPieLabel ? 'opacity-100' : 'opacity-0'
            }`}>
              {label === 'Real Estate Negotiations' ? (
                <>
                  Real Estate<br />
                  Negotiations
                </>
              ) : (
                <>
                  {labelLine1}
                  {labelLine2 && (
                    <>
                      <br />
                      {labelLine2}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-start pl-4">
              <div className="relative" style={{ marginLeft: '-33px' }}>
                <div className="relative" style={{ height: '55px' }}>
                  <div
                    className="absolute top-0 left-0 h-10 bg-white/20 rounded"
                    style={{ width: '200px', height: '55px' }}
                  ></div>

                  <div
                    className={`absolute top-0 left-0 h-10 bg-white rounded transition-all duration-1500 ease-out ${
                      showPiePercentage ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      width: `${(animatedPiePercentage / 100) * 200}px`,
                      height: '55px',
                    }}
                  ></div>

                  <div
                    className={`absolute top-0 h-10 flex items-center transition-all duration-1500 ease-out ${
                      showPiePercentage ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      left: `${(animatedPiePercentage / 100) * 200 + 10}px`,
                      height: '55px',
                    }}
                  >
                    <span className="text-sm font-bold text-white">
                      {Math.round(animatedPiePercentage * 10) / 10}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bar chart (simple) */}
        {chart === 'bar' && (
          <div className="flex items-end space-x-2 h-12">
            <div className="bg-white/30 w-3 h-6 rounded-sm"></div>
            <div className="bg-white/50 w-3 h-8 rounded-sm"></div>
            <div className="bg-white/70 w-3 h-12 rounded-sm"></div>
            <div className="bg-white/40 w-3 h-7 rounded-sm"></div>
            <div className="bg-white/60 w-3 h-10 rounded-sm"></div>
          </div>
        )}

        {/* Donut chart */}
        {chart === 'donut' && (
          <div className="flex items-center justify-center h-full relative">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg 
                  className={`w-60 h-60 ${
                    label === 'Total iCode Locations' 
                      ? 'transform scale-y-[-1]' 
                      : 'transform -rotate-90'
                  }`} 
                  viewBox="0 0 100 100"
                >
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
                    stroke="white"
                    strokeWidth="8"
                    strokeDasharray={strokeDashArrayValue}
                    strokeLinecap="round"
                    className="transition-all duration-75 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold transition-opacity duration-700 ${
                    showNumber ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {animatedNumber}
                  </span>
                  <span className={`text-lg font-medium opacity-90 text-center leading-tight transition-opacity duration-700 px-4 ${
                    showLabel ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {isLocationCard ? (
                      <>
                        Total iCode<br />
                        Locations
                      </>
                    ) : label === 'New Locations Opened YTD' ? (
                      <>
                        New Locations<br />
                        Opened YTD
                      </>
                    ) : (
                      <>
                        {labelLine1}
                        {labelLine2 && (
                          <>
                            <br />
                            {labelLine2}
                          </>
                        )}
                      </>
                    )}
                  </span>
                  <span className={`text-sm font-semibold opacity-75 mt-2 transition-all duration-700 ${
                    showGoal ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                    Goal: {chartValue || goalValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gauge chart */}
        {chart === 'gauge' && (
          <div className="flex items-center justify-center h-full relative">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center mb-4">
                <div
                  className={`text-5xl font-bold mb-2 transition-opacity duration-700 ${
                    showGaugeNumber ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transform: 'translateY(10px)' }}
                >
                  {animatedGaugeNumber} <span className="text-2xl">Days</span>
                </div>
                <div className={`text-lg opacity-90 font-medium leading-tight transition-opacity duration-700 ${
                  showGaugeLabel ? 'opacity-100' : 'opacity-0'
                }`}>
                  {label === 'Ordering iCode-in-a-Box' ? (
                    <>
                      Ordering iCode<br />
                      in-a-Box
                    </>
                  ) : (
                    <>
                      {labelLine1}
                      {labelLine2 && (
                        <>
                          <br />
                          {labelLine2}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              <div className="relative w-48 h-24 flex items-center justify-center">
                <svg className="w-48 h-24" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
                  <path
                    d="M 20 80 A 60 60 0 0 1 180 80"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  
                  <g
                    className={`transition-all duration-2000 ease-out ${
                      showGaugePercentage ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      transform: `rotate(${-90 + gaugeRotation}deg)`,
                      transformOrigin: '100px 80px',
                      animation: showGaugePercentage ? 'needleFadeIn 1800ms ease-out' : 'none'
                    }}
                  >
                    <path
                      d="M 100 80 L 95 10 L 100 5 L 105 10 Z"
                      fill="white"
                    />
                    <circle
                      cx="100"
                      cy="80"
                      r="8"
                      fill="white"
                    />
                  </g>
                </svg>
                
                <div className="absolute bottom-2 text-xs font-semibold text-white" style={{ left: '0px' }}>
                  Slow
                </div>
                <div className="absolute bottom-2 text-xs font-semibold text-white" style={{ right: '2px' }}>
                  Fast
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
