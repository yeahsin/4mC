
import React from 'react';
import { motion } from 'framer-motion';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-8 flex flex-col items-center">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="max-w-3xl w-full bg-white/50 dark:bg-black/40 backdrop-blur-lg border border-black/10 dark:border-white/5 p-12 md:p-16"
       >
         <h1 className="text-5xl md:text-7xl font-light mb-8 text-gray-900 dark:text-white">The <span className="text-teal font-serif italic">Obsidian</span> Standard</h1>
         
         <div className="space-y-8 text-gray-700 dark:text-gray-300 font-light leading-relaxed text-lg">
           <p>
             ValetWash began with a single question: Why does the car wash experience feel so industrial, when the machines we drive are masterpieces of engineering?
           </p>
           <p>
             We are not cleaners. We are preservationists. Our technicians are trained in the art of paint correction, material science, and chemical bonding. We view every vehicle as a canvas that deserves to be restored to its showroom glory—and then protected beyond it.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
             <div className="border-l border-gold pl-6">
                <h3 className="text-gold text-sm tracking-widest uppercase mb-2">Sustainable Luxury</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Our waterless and low-water techniques save 150 liters per wash. Our products are 100% biodegradable, leaving no trace on your driveway.</p>
             </div>
             <div className="border-l border-teal pl-6">
                <h3 className="text-teal text-sm tracking-widest uppercase mb-2">Mobile Studio</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Our vans are solar-powered laboratories, equipped with soft-water filtration, high-lumen inspection lights, and artisanal compounds.</p>
             </div>
           </div>

           <p>
             This is not an errand. It is a ritual. A ceremony performed at your doorstep, crowning your vehicle while you focus on what matters.
           </p>
         </div>
       </motion.div>
    </div>
  );
};
