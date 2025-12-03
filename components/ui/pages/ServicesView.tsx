
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICE_DETAILS, PACKAGES } from '../../../constants';
import { CarCategory } from '../../../types';
import { Button } from '../Button';

export const ServicesView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CarCategory>(CarCategory.SEDAN);

  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-4 md:px-8 flex flex-col items-center">
       
       {/* HERO */}
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="max-w-6xl w-full mb-24 text-center"
       >
         <h1 className="text-5xl md:text-7xl font-light mb-8 text-gray-900 dark:text-white">
           Curated <span className="text-teal font-serif italic">Treatments</span>
         </h1>
         <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
           From essential maintenance to complete restoration. Select the level of care your vehicle demands.
         </p>
       </motion.div>

       {/* PACKAGES GRID */}
       <div className="max-w-7xl w-full mb-32">
          {/* Category Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-1 rounded-none">
              {Object.values(CarCategory).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat ? 'bg-teal text-obsidian' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-8 border backdrop-blur-sm flex flex-col ${
                  pkg.popular 
                    ? 'bg-black/10 dark:bg-white/10 border-teal/50 shadow-[0_0_30px_rgba(0,229,210,0.1)]' 
                    : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                } transition-all duration-300 group`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-teal text-obsidian text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
                    Recommended
                  </div>
                )}
                
                <h3 className="text-xl text-gray-900 dark:text-white font-light mb-2">{pkg.name}</h3>
                <div className="text-3xl font-serif text-teal mb-6">
                  ₹{pkg.prices[activeCategory].toLocaleString()}
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="mt-1.5 w-1 h-1 bg-teal rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant={pkg.popular ? 'primary' : 'outline'} className="w-full">
                  Book Treatment
                </Button>
              </motion.div>
            ))}
          </div>
       </div>

       {/* DETAILED BREAKDOWN */}
       <div className="max-w-6xl w-full">
         <h2 className="text-3xl font-light mb-16 text-center text-gray-900 dark:text-white">
           <span className="font-serif italic text-gold">Technical</span> Specifications
         </h2>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {SERVICE_DETAILS.map((detail, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="border-l border-black/10 dark:border-white/10 pl-8 hover:border-teal transition-colors duration-500"
             >
               <h3 className="text-xl text-teal uppercase tracking-widest mb-6">{detail.title}</h3>
               <ul className="grid grid-cols-1 gap-3">
                 {detail.items.map((item, i) => (
                   <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-3">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black/30 dark:text-white/30">
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                      {item}
                   </li>
                 ))}
               </ul>
             </motion.div>
           ))}
         </div>
       </div>

    </div>
  );
};
