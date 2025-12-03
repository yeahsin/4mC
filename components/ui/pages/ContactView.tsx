
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

export const ContactView: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-8 flex flex-col items-center justify-center">
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/50 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10"
       >
         <div className="p-12 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10">
           <h1 className="text-4xl font-light mb-8 text-gray-900 dark:text-white">Concierge <br/><span className="text-teal font-serif italic">Support</span></h1>
           <p className="text-gray-600 dark:text-gray-400 mb-8">
             Our dedicated team is available 24/7 for our Obsidian members. For general inquiries, expect a response within the hour.
           </p>
           
           <div className="space-y-6">
             <div>
               <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Email</div>
               <div className="text-xl text-gray-900 dark:text-white">concierge@valetwash.com</div>
             </div>
             <div>
               <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">HQ</div>
               <div className="text-xl text-gray-900 dark:text-white">100 Obsidian Way<br/>Los Angeles, CA 90210</div>
             </div>
           </div>
         </div>

         <div className="p-12 bg-black/5 dark:bg-black/20">
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                <input type="text" className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                <select className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors">
                  <option>General Inquiry</option>
                  <option>Membership Application</option>
                  <option>Press / Media</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 text-gray-900 dark:text-white focus:outline-none focus:border-teal transition-colors"></textarea>
              </div>
              <Button type="button">Send Transmission</Button>
            </form>
         </div>
       </motion.div>
    </div>
  );
};
