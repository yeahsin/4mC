import React, { useEffect, useState } from 'react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center text-chrome">
      <div className="relative w-64 h-1 bg-gray-900 rounded-full overflow-hidden mb-4">
        <div 
          className="absolute top-0 left-0 h-full bg-teal transition-all duration-100 ease-linear shadow-[0_0_15px_#00E5D2]" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      <div className="h-8 overflow-hidden relative">
          <span className="block text-sm uppercase tracking-[0.4em] animate-pulse">
            {progress < 100 ? "Calibrating Sensors..." : "System Online"}
          </span>
      </div>
    </div>
  );
};