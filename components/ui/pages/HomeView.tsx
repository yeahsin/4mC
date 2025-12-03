import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';
import { PACKAGES, STEPS } from '../../../constants';
import { CarCategory, ViewType, ServiceStep } from '../../../types';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = "", id = "", fullHeight = true }) => (
  <section id={id} className={`${fullHeight ? 'min-h-screen' : ''} w-full flex flex-col justify-center items-center p-8 max-w-7xl mx-auto py-20 ${className}`}>
    {children}
  </section>
);

const RitualStepCard: React.FC<{ step: ServiceStep; index: number }> = ({ step, index }) => {
  // Custom Icons based on step.icon string ('water', 'sparkles', 'shield')
  const renderIcon = (type: string) => {
    switch (type) {
      case 'water':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-teal mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
            <motion.path
              d="M50 10 C30 40 10 50 10 75 C10 95 30 100 50 100 C70 100 90 95 90 75 C90 50 70 40 50 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {[...Array(3)].map((_, i) => (
              <motion.circle
                key={i}
                cx={30 + i * 20}
                cy={80}
                r={3}
                fill="currentColor"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -40, opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.5, ease: "easeOut" }}
              />
            ))}
          </svg>
        );
      case 'sparkles':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-gold mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
             <motion.path 
               d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="2"
               initial={{ pathLength: 0, scale: 0 }}
               whileInView={{ pathLength: 1, scale: 1 }}
               transition={{ duration: 1 }}
             />
             <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }}>
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
             </motion.g>
          </svg>
        );
      case 'shield':
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-gray-900 dark:text-white mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
            <motion.path
              d="M50 10 L90 25 V55 C90 80 50 95 50 95 C50 95 10 80 10 55 V25 L50 10 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />
            <motion.path
               d="M35 50 L45 60 L65 40"
               fill="none"
               stroke="#00E5D2"
               strokeWidth="3"
               strokeLinecap="round"
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               transition={{ delay: 1, duration: 0.5 }}
            />
          </svg>
        );
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="group relative p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-teal/50 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-500 rounded-sm overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 text-xs font-serif italic text-gray-400 dark:text-white/20 group-hover:text-teal/40 transition-colors">0{step.id}</div>
      <div className="relative z-10 flex flex-col items-center text-center">
        {renderIcon(step.icon)}
        <h3 className="text-xl font-light text-gray-900 dark:text-white mb-3 tracking-wide">{step.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
      </div>
      
      {/* Corner Accents */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-teal/0 group-hover:border-teal/100 transition-all duration-300" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-teal/0 group-hover:border-teal/100 transition-all duration-300" />
    </motion.div>
  );
};

export const HomeView: React.FC<{ onNavigate: (view: ViewType) => void }> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<CarCategory>(CarCategory.SEDAN);

  return (
    <>
      {/* SCENE 1: ARRIVAL */}
      <Section className="items-start text-left relative pointer-events-none">
        <div className="md:w-1/2 mt-32 pointer-events-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-light text-gray-900 dark:text-white leading-tight mb-8"
          >
            We don’t wash cars. <br />
            <span className="font-serif italic text-teal">We crown them.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8"
          >
            The on-demand detailing service for the obsessive. 
            We bring the studio to your driveway.
          </motion.p>
          <Button onClick={() => onNavigate('booking')}>Initiate Ritual</Button>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-600"
        >
          Scroll to Explore
        </motion.div>
      </Section>

      {/* SCENE 2: RITUAL HEADER (Background Spheres) */}
      <Section id="ritual" className="items-center text-center pointer-events-none py-32" fullHeight={false}>
        <div className="relative top-[-5vh] pointer-events-auto">
          <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl font-light mb-4 text-gray-900 dark:text-white"
          >
            The Three-Stage <span className="text-gold font-serif italic">Ceremony</span>
          </motion.h2>
          <p className="text-sm text-gray-500 uppercase tracking-widest">Interact with the spheres</p>
        </div>
      </Section>

      {/* SCENE 2.5: RITUAL DEEP DIVE (Visual Breakdown) */}
      <Section className="pointer-events-auto items-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
           {STEPS.map((step, idx) => (
             <RitualStepCard key={step.id} step={step} index={idx} />
           ))}
        </div>
        <div className="mt-16">
          <Button variant="text" onClick={() => onNavigate('services')}>Explore Technical Specs</Button>
        </div>
      </Section>

      {/* SCENE 3: PACKAGES PREVIEW */}
      <Section id="pricing" className="pointer-events-auto">
        <div className="w-full max-w-5xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 p-8 md:p-12 rounded-sm relative overflow-hidden">
            <h3 className="text-3xl font-light mb-8 text-center text-gray-900 dark:text-white">Transparent <span className="text-teal font-serif italic">Pricing</span></h3>
            
            {/* Category Selector */}
            <div className="flex justify-center gap-4 mb-10 overflow-x-auto pb-2">
                {Object.values(CarCategory).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all ${
                            selectedCategory === cat 
                            ? 'border-teal text-teal bg-teal/10' 
                            : 'border-black/10 dark:border-white/10 text-gray-500 hover:border-black/30 dark:hover:border-white/30'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PACKAGES.map((pkg) => (
                    <div 
                        key={pkg.id} 
                        className={`p-6 border ${pkg.popular ? 'border-teal/30 bg-black/5 dark:bg-white/5' : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'} transition-colors group cursor-pointer`}
                        onClick={() => onNavigate('services')}
                    >
                        <div className="text-xs text-gray-500 uppercase mb-2 group-hover:text-teal transition-colors">{pkg.name}</div>
                        <div className="text-2xl font-serif text-gray-900 dark:text-white mb-4">₹{pkg.prices[selectedCategory].toLocaleString()}</div>
                        <div className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                            {pkg.features.slice(0, 3).join(', ')}...
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <Button variant="outline" onClick={() => onNavigate('services')}>View Full Menu</Button>
            </div>
        </div>
      </Section>

      {/* SCENE 4: MEMBERSHIP / FOOTER */}
      <Section id="membership" className="pointer-events-auto min-h-[60vh] py-32" fullHeight={false}>
        <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-light mb-6 text-gray-900 dark:text-white">Obsidian <span className="font-serif italic text-gold">Members</span></h2>
            <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                Join the inner circle. Priority scheduling, unlimited maintenance washes, 
                and quarterly ceramic refreshments.
            </p>
            <div className="flex gap-4 justify-center">
                <Button onClick={() => onNavigate('contact')}>Apply for Membership</Button>
                <Button variant="text" onClick={() => onNavigate('services')}>View Benefits</Button>
            </div>
        </div>
      </Section>
    </>
  );
};