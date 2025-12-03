
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

export const DoorstepView: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-4 md:px-8 flex flex-col items-center">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-light mb-8 text-gray-900 dark:text-white">
          The <span className="text-teal font-serif italic">Mobile</span> Studio
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Experience the pinnacle of automotive care without leaving your sanctuary. 
          We transform your driveway into a high-end detailing bay.
        </p>
      </motion.div>

      {/* The Fleet Section */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
        <motion.div 
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative"
        >
          <div className="aspect-video bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm overflow-hidden flex items-center justify-center relative group">
             {/* Abstract Van Graphic */}
             <div className="w-48 h-24 border-2 border-teal/30 rounded-lg relative z-10 group-hover:border-teal/80 transition-colors duration-500">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-teal">ValetWash Unit 01</div>
               <div className="absolute -bottom-3 left-8 w-8 h-8 rounded-full border border-gray-500 bg-obsidian"></div>
               <div className="absolute -bottom-3 right-8 w-8 h-8 rounded-full border border-gray-500 bg-obsidian"></div>
             </div>
             <div className="absolute inset-0 bg-teal/5 animate-pulse"></div>
             
             {/* Tech Specs Overlay */}
             <div className="absolute top-4 left-4 text-[10px] text-gray-500 font-mono">
               <div>PWR: SOLAR HYBRID</div>
               <div>H2O: 500L PURIFIED</div>
             </div>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl font-light mb-6 text-gray-900 dark:text-white">Autonomous <span className="text-gold font-serif italic">Capability</span></h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Our vans are custom-engineered mobile laboratories. We do not require access to your water or electricity. 
          </p>
          <ul className="space-y-4">
            {[
              "Onboard de-ionized water filtration for spot-free rinsing.",
              "Whisper-quiet electric generators.",
              "High-lumen colour-matching lighting for garage interiors.",
              "100% biodegradable waste reclamation system."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-1 w-1.5 h-1.5 bg-teal rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Process Section */}
      <div className="max-w-5xl w-full mb-32">
        <h2 className="text-3xl font-light mb-16 text-center text-gray-900 dark:text-white">Protocol of <span className="text-teal font-serif italic">Arrival</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "01. Deployment", desc: "Technician arrives. Perimeter scan. Protective mats deployed to ensure zero driveway runoff." },
             { title: "02. The Ritual", desc: "The detail is performed with surgical precision using our mobile toolset." },
             { title: "03. Departure", desc: "Vehicle is inspected. Area is cleaned. We vanish without a trace, leaving only the shine." }
           ].map((step, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.2 }}
               viewport={{ once: true }}
               className="p-8 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 hover:border-teal/50 transition-colors"
             >
               <div className="text-xs font-mono text-teal mb-4 uppercase tracking-widest">{step.title}</div>
               <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button onClick={() => document.getElementById('root')?.scrollIntoView()}>Check Availability in Your Area</Button>
      </div>

    </div>
  );
};
