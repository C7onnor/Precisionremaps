import React from 'react';
import { Tag, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';

interface Deal {
  id: number;
  title: string;
  description: string;
  validUntil: string;
}

const DEALS_DATA: Deal[] = [
  {
    id: 1,
    title: "Winter ECU Remap Special",
    description: "£250 deal on any OBD map and includes any ad ons like ad blue delete, dpf coding, egr delete and noise enhancements.",
    validUntil: "Til January 31st"
  },
  {
    id: 2,
    title: "Stage 1 ECU Remap Deal",
    description: "£200 for a Stage 1 remap and can also offer a warranty if your vehicle meets the criteria. ",
    validUntil: "Til January 31st"
  },
];

export const Deals: React.FC = () => {
  return (
    <div className="min-h-screen relative py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop" 
          alt="Car background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-darker/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4">Exclusive Offers</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Current Deals & Promotions
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Take advantage of our limited-time offers to get the best performance for the best price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEALS_DATA.map((deal) => (
            <div 
              key={deal.id} 
              className="bg-brand-dark border border-white/10 rounded-2xl p-8 hover:border-brand-blue/50 transition-all duration-300 group flex flex-col relative overflow-hidden shadow-xl"
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl group-hover:bg-brand-blue/20 transition-all"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="bg-brand-orange/20 p-3 rounded-lg text-brand-orange">
                  <Tag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-700 px-2 py-1 rounded">
                   Offer
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{deal.title}</h3>
              <p className="text-gray-400 mb-8 flex-grow leading-relaxed relative z-10">
                {deal.description}
              </p>

              <div className="mt-auto relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                   <Calendar className="w-4 h-4" />
                   <span>Valid: <span className="text-white">{deal.validUntil}</span></span>
                </div>
                
                <Button fullWidth onClick={() => window.location.hash = '#contact'}>
                  Claim Deal <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};