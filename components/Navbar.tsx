import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { NavItem, PageView } from '../types';
import { NAV_ITEMS, COMPANY_NAME, LOGO_URL } from '../constants';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-brand-darker/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-2" 
            onClick={() => handleNavClick(PageView.HOME)}
          >
             {/* Simulating the logo provided in prompt or fallback to text/icon */}
            <div className="relative h-10 w-auto flex items-center">
                 <img 
                    src={LOGO_URL} 
                    alt={COMPANY_NAME} 
                    className="h-12 w-auto object-contain mr-2 hidden md:block"
                    onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                 />
                 <div className="flex flex-col md:hidden">
                    <span className="text-2xl font-black text-brand-blue tracking-tighter">PRECISION</span>
                    <span className="text-sm font-bold text-brand-orange tracking-widest -mt-1">REMAPS</span>
                 </div>
                 <div className="hidden md:flex flex-col">
                    <span className="text-2xl font-black text-brand-blue tracking-tighter">PRECISION</span>
                 </div>
                 <div className="hidden md:flex flex-col ml-1">
                    <span className="text-2xl font-bold text-brand-orange tracking-widest">REMAPS</span>
                 </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === item.view
                      ? 'text-brand-orange bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.view)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentView === item.view
                    ? 'text-brand-orange bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};