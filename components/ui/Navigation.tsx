
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../constants';
import { ViewType, Theme } from '../../types';

interface NavigationProps {
  currentView: ViewType;
  onChange: (view: ViewType) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onChange, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: ViewType) => {
    onChange(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 pointer-events-auto cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-4 h-4 rounded-full bg-teal shadow-[0_0_10px_#00E5D2] group-hover:scale-125 transition-transform" />
          <span className="font-serif italic text-xl tracking-widest group-hover:text-teal transition-colors">ValetWash</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          {NAV_LINKS.map(link => (
            <button 
              key={link.name} 
              onClick={() => onChange(link.id)} 
              className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                currentView === link.id ? 'text-teal' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="ml-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-teal hover:text-teal transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-4 md:hidden pointer-events-auto">
          <button 
             onClick={toggleTheme}
             className="w-8 h-8 flex items-center justify-center text-white"
          >
             {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          
          <button 
            className="text-white p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white mt-1.5 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-obsidian/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col gap-8 text-center">
              {NAV_LINKS.map(link => (
                <motion.button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.id)} 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-2xl font-serif italic tracking-widest transition-colors ${
                    currentView === link.id ? 'text-teal' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
            
            <div className="absolute bottom-12 text-xs text-gray-500 uppercase tracking-widest">
              Est. 2024 • Los Angeles
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
