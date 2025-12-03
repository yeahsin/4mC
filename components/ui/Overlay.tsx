
import React from 'react';
import { HomeView } from './pages/HomeView';
import { AboutView } from './pages/AboutView';
import { ServicesView } from './pages/ServicesView';
import { ContactView } from './pages/ContactView';
import { BookingView } from './pages/BookingView';
import { DoorstepView } from './pages/DoorstepView';
import { Footer } from './Footer';
import { ViewType } from '../../types';

interface OverlayProps {
  view: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Overlay: React.FC<OverlayProps> = ({ view, onNavigate }) => {
  const renderView = () => {
    switch (view) {
      case 'home': return <HomeView onNavigate={onNavigate} />;
      case 'about': return <AboutView />;
      case 'services': return <ServicesView />;
      case 'contact': return <ContactView />;
      case 'booking': return <BookingView />;
      case 'doorstep': return <DoorstepView />;
      default: return <HomeView onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="text-chrome w-full flex flex-col min-h-screen">
      <div className="flex-grow">
        {renderView()}
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};