
import { useState, useEffect } from 'react';

interface Location {
  id: string;
  city: string;
  state: string;
  progress: number;
  nextStep: string;
  targetDate: string;
}

interface LocationProgressProps {
  location: Location;
  onComplete: () => void;
  animationDelay?: number;
}

export default function LocationProgress({ location, onComplete, animationDelay = 0 }: LocationProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showLocationAndDate, setShowLocationAndDate] = useState(false);
  const [startGradientAnimation, setStartGradientAnimation] = useState(false);
  const percentage = `${location.progress}%`;
  const nextStepText = `Next: ${location.nextStep}`;

  // Calculate progress bar width to align with the 25 vertical lines
  const progressAreaWidth = 25 * 57.6; // 1440px total width to reach the 25th line
  const targetProgressBarWidth = (location.progress / 100) * progressAreaWidth;
  const currentProgressBarWidth = (animatedProgress / 100) * progressAreaWidth;

  // Estimate text width (rough calculation: 8px per character)
  const estimatedTextWidth = nextStepText.length * 8 + 32; // +32 for padding
  const isBarTooShort = currentProgressBarWidth < estimatedTextWidth;

  useEffect(() => {
    const timer = setTimeout(() => {
      // First, fade in location name and date
      setShowLocationAndDate(true);
      
      // Then start progress bar animation after location/date fade in
      setTimeout(() => {
        setAnimatedProgress(location.progress);
        
        // Start gradient animation after progress bar is fully rendered (2.5s animation)
        setTimeout(() => {
          setStartGradientAnimation(true);
        }, 2500);
        
        // Show progress text after animation completes (2.5s animation + small delay)
        setTimeout(() => {
          setShowText(true);
        }, 2600);
      }, 800); // Wait 800ms for location/date fade in to complete
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [location.progress, animationDelay]);

  return (
    <div className="bg-transparent transition-colors relative" style={{ padding: '6px 8px' }}>      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <div className="flex items-center space-x-6">
            <div className="w-40 text-left">
              <div className={`font-semibold text-white text-xl transition-opacity duration-700 ${
                showLocationAndDate ? 'opacity-100' : 'opacity-0'
              }`}>
                {location.city}, {location.state}
              </div>
            </div>
            
            <div className="flex-1 mx-6 relative">
              <div className="relative">
                {/* Progress bar with conditional content based on bar width */}
                <div 
                  className={`h-13 transition-all duration-[2500ms] ease-out flex items-center relative z-20 ${
                    startGradientAnimation ? 'animated-gradient' : ''
                  } ${isBarTooShort ? 'justify-center' : 'justify-end pr-4'}`}
                  style={{ 
                    width: `${currentProgressBarWidth}px`, 
                    height: '52px',
                    borderRadius: '0 3px 3px 0',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6, #8b5cf6, #3b82f6)',
                    backgroundSize: '200% 100%'
                  }}
                >
                  <span 
                    className={`text-sm font-bold text-white transition-opacity duration-500 ${
                      showText ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {isBarTooShort ? percentage : nextStepText}
                  </span>
                </div>
                
                {/* Text/Percentage positioned to follow the end of the progress bar */}
                <div 
                  className="absolute top-0 h-full flex items-center transition-all duration-[2500ms] ease-out"
                  style={{ 
                    left: `${currentProgressBarWidth + 10}px`,
                    height: '52px'
                  }}
                >
                  <span 
                    className={`text-lg text-gray-300 whitespace-nowrap transition-opacity duration-500 ${
                      showText ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {isBarTooShort ? nextStepText : percentage}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="w-80"></div>
          </div>
        </div>
        
        {/* Date positioned at fixed location to align under TARGET column */}
        <div 
          className="absolute text-right"
          style={{ right: '0px', top: '50%', transform: 'translateY(-50%)', width: '120px' }}
        >
          <div className={`text-lg font-semibold text-gray-300 transition-opacity duration-700 ${
            showLocationAndDate ? 'opacity-100' : 'opacity-0'
          }`}>
            {location.targetDate}
          </div>
        </div>
      </div>
    </div>
  );
}
