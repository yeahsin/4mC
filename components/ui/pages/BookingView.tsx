
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

export const BookingView: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-8 flex flex-col items-center">
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         className="max-w-2xl w-full"
       >
         <h1 className="text-5xl font-light mb-12 text-center text-gray-900 dark:text-white">Secure Your <span className="text-teal font-serif italic">Slot</span></h1>
         
         <div className="bg-white dark:bg-obsidian border border-teal/20 p-8 shadow-[0_0_30px_rgba(0,229,210,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal to-transparent opacity-50"></div>
            
            {/* Mock Calendar UI */}
            <div className="mb-8">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-gray-900 dark:text-white text-lg">October 2023</h3>
                 <div className="flex gap-2">
                   <button className="w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-teal text-gray-900 dark:text-white transition-colors">&lt;</button>
                   <button className="w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 hover:border-teal text-gray-900 dark:text-white transition-colors">&gt;</button>
                 </div>
               </div>
               <div className="grid grid-cols-7 gap-2 mb-2">
                 {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center text-xs text-gray-500 dark:text-gray-600">{d}</div>)}
               </div>
               <div className="grid grid-cols-7 gap-2">
                 {Array.from({length: 31}).map((_, i) => {
                   const isAvailable = [5, 8, 12, 15, 20, 25].includes(i);
                   return (
                     <button 
                       key={i} 
                       disabled={!isAvailable}
                       className={`aspect-square flex items-center justify-center text-sm border transition-all duration-300
                         ${isAvailable 
                           ? 'border-teal/30 text-teal hover:bg-teal hover:text-black cursor-pointer shadow-[0_0_10px_rgba(0,229,210,0.1)]' 
                           : 'border-transparent text-gray-300 dark:text-gray-800 cursor-not-allowed'
                         }`}
                     >
                       {i + 1}
                     </button>
                   );
                 })}
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-4 border border-black/10 dark:border-white/10">
                  <div className="w-2 h-2 bg-teal rounded-full animate-pulse"></div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Select a date to view available arrival windows.</div>
               </div>
               <Button className="w-full">Confirm Reservation</Button>
            </div>
         </div>
         
         <p className="text-center text-xs text-gray-500 dark:text-gray-600 mt-8 uppercase tracking-widest">
           No payment required until completion of service.
         </p>
       </motion.div>
    </div>
  );
};
