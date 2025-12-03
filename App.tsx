
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preloader } from './components/Preloader';
import { Experience } from './components/three/Experience';
import { Navigation } from './components/ui/Navigation';
import { Loader } from '@react-three/drei';
import { ViewType, Theme } from './types';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      
      <div className={`${theme}`}>
        <div className={`w-full h-screen bg-platinum dark:bg-obsidian transition-colors duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <Navigation 
            currentView={currentView} 
            onChange={setCurrentView} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
            <color attach="background" args={[theme === 'dark' ? '#0A0A0B' : '#F0F2F5']} />
            <Suspense fallback={null}>
               {loaded && <Experience view={currentView} setView={setCurrentView} theme={theme} />}
            </Suspense>
          </Canvas>
        </div>
      </div>
      
      {/* Fallback loader for 3D assets */}
      <Loader />
    </>
  );
}

export default App;
