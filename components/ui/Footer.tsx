
import React from 'react';
import { ViewType } from '../../types';
import { NAV_LINKS } from '../../constants';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md pt-20 pb-12 px-8 mt-0 pointer-events-auto relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="md:col-span-2">
          <div className="font-serif italic text-3xl tracking-widest text-gray-900 dark:text-white mb-6">ValetWash</div>
          <p className="text-gray-600 dark:text-gray-500 max-w-sm text-sm leading-relaxed mb-8">
            Redefining automotive care through sustainable luxury. 
            We treat every vehicle as a masterpiece, bringing the studio to your sanctuary.
          </p>
          <div className="flex gap-4">
            {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
              <div 
                key={social}
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-[10px] text-gray-500 hover:bg-teal hover:text-black hover:border-teal transition-all cursor-pointer uppercase tracking-widest"
              >
                {social.slice(0, 2)}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-teal mb-8">Sitemap</h4>
          <ul className="space-y-4">
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <button 
                  onClick={() => onNavigate(link.id)}
                  className="text-gray-500 dark:text-gray-400 hover:text-teal dark:hover:text-white text-sm transition-colors uppercase tracking-wider text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-teal mb-8">Concierge</h4>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-light">
            <li>
              <a href="mailto:concierge@valetwash.com" className="hover:text-teal dark:hover:text-white transition-colors block py-1">
                concierge@valetwash.com
              </a>
            </li>
            <li className="py-1">+1 (555) 000-0000</li>
            <li className="leading-relaxed py-1">
              100 Obsidian Way,<br/>
              Beverly Hills, CA 90210
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-black/5 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 dark:text-gray-600 uppercase tracking-[0.15em]">
        <div>&copy; {new Date().getFullYear()} ValetWash. All rights reserved.</div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span>Engineered for Perfection</span>
          <span className="w-1 h-1 bg-teal rounded-full"></span>
        </div>
      </div>
    </footer>
  );
};
