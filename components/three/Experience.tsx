
import React, { useState, useEffect } from 'react';
import { ScrollControls, Scroll, useScroll, Environment, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CarShader } from './CarShader';
import { RitualSpheres } from './RitualSpheres';
import { Overlay } from '../ui/Overlay';
import { ViewType, Theme } from '../../types';

interface ExperienceProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  theme: Theme;
}

const SceneContent: React.FC<{ view: ViewType; theme: Theme }> = ({ view, theme }) => {
  const scroll = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGoldenHour, setIsGoldenHour] = useState(false);

  // Time of day logic for lighting
  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      // Golden Hour: 6-9 AM or 4-7 PM (16-19)
      setIsGoldenHour((hour >= 6 && hour < 9) || (hour >= 16 && hour < 19));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    if (scroll) {
      setScrollProgress(scroll.offset);
    }
  });

  // If not on home, force car to a nice "display" position or animation
  const isHome = view === 'home';
  const effectiveProgress = isHome ? scrollProgress : 0.1; // Slight turn for static pages

  return (
    <>
      {/* Dynamic Ambient Lighting */}
      <ambientLight intensity={theme === 'light' ? 0.8 : (isGoldenHour ? 0.4 : 0.2)} />
      
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={theme === 'light' ? 1.5 : 1} 
        castShadow 
      />
      
      {/* Golden Hour Directional Light - Adds Warm Rim Lighting */}
      <directionalLight
        position={[-5, 5, 5]}
        intensity={isGoldenHour ? 2.5 : 0}
        color="#FFD54F"
        castShadow
      />

      {/* Dynamic Environment Reflection Map */}
      <Environment preset={theme === 'light' ? "studio" : (isGoldenHour ? "sunset" : "city")} />

      {/* CAR */}
      {/* Updated initial position to [0, 0, 0] to center it. 
          If on home, it moves down as we scroll. Reduced factor from 20 to 18 to keep it visible longer. */}
      <group position={[0, isHome ? -(effectiveProgress * 18) : 0, 0]}>
         <CarShader scrollProgress={effectiveProgress} />
      </group>

      {/* SPHERES - Only on Home Scroll */}
      {isHome && (
        <group position={[0, -15 + (effectiveProgress * 15), -5]}>
           {effectiveProgress > 0.15 && effectiveProgress < 0.6 && <RitualSpheres theme={theme} />}
        </group>
      )}

      {/* FOOTER PARTICLES - Color adapts to lighting condition */}
      <group position={[0, -5, -2]}>
         {(effectiveProgress > 0.8 || !isHome) && (
           <Sparkles 
             count={200} 
             scale={10} 
             size={2} 
             speed={0.4} 
             opacity={0.5} 
             color={theme === 'light' ? "#0A0A0B" : (isGoldenHour ? "#FFD54F" : "#00E5D2")} 
           />
         )}
      </group>
    </>
  );
};

export const Experience: React.FC<ExperienceProps> = ({ view, setView, theme }) => {
  // Simple check for mobile viewport width
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Determine page length based on view - Adjusted to ensure footer visibility on all pages
  const getPages = () => {
    switch (view) {
      case 'home': 
        return isMobile ? 11.5 : 6.5; 
      case 'about': 
        return isMobile ? 2.6 : 2.1; 
      case 'services': 
        // Significant content in services, requires more scroll space
        return isMobile ? 6.5 : 3.8; 
      case 'contact': 
        return isMobile ? 2.2 : 1.8; 
      case 'booking': 
        return isMobile ? 2.2 : 1.8; 
      case 'doorstep':
        return isMobile ? 3.0 : 2.4;
      default: 
        return isMobile ? 2.5 : 2.0;
    }
  };

  return (
    // Key forces remount of ScrollControls when view changes, resetting scroll position
    <ScrollControls key={view + (isMobile ? '-mob' : '-desk')} pages={getPages()} damping={0.1}>
      <SceneContent view={view} theme={theme} />
      <Scroll html style={{ width: '100%' }}>
        <Overlay view={view} onNavigate={setView} />
      </Scroll>
    </ScrollControls>
  );
};