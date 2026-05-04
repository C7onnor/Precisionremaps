import React from 'react';
import { ArrowRight, Cpu, Settings, ShieldCheck, Gauge } from 'lucide-react';
import { Button } from '../components/Button';
import { PageView } from '../types';

interface HomeProps {
  onNavigate: (view: PageView) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=1974&auto=format&fit=crop" 
            alt="Mechanic working on car engine" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/90 to-brand-blue/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              Unlock Your Car's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">
                True Potential
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Paisley's premier ECU remapping specialists. 
              Enhanced power, improved economy, and a drive transformed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => onNavigate(PageView.LOOKUP)}
                className="text-lg px-8 py-4"
              >
                Check Your Stats <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate(PageView.CONTACT)}
                className="text-lg px-8 py-4"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Precision Remaps?</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Cpu className="w-10 h-10 text-brand-blue" />}
              title="Advanced ECU Tuning"
              description="Using state-of-the-art genuine equipment to safely extract maximum performance from your engine."
            />
            <FeatureCard 
              icon={<Settings className="w-10 h-10 text-brand-orange" />}
              title="Custom Calibration"
              description="Every file is custom written for your specific vehicle, modifications, and driving requirements."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10 text-brand-blue" />}
              title="Safe & Reliable"
              description="We stay within safe manufacturer limits to ensure reliability while delivering impressive gains."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <Gauge className="w-[500px] h-[500px] absolute -right-20 -bottom-20 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <StatNumber number="14+" label="Years Experience" />
                <StatNumber number="5k+" label="Vehicles Tuned" />
                <StatNumber number="100%" label="Satisfaction" />
                <StatNumber number="24h" label="Support" />
            </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-brand-darker p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300 hover:transform hover:-translate-y-2 group">
    <div className="bg-white/5 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const StatNumber: React.FC<{ number: string; label: string }> = ({ number, label }) => (
    <div>
        <div className="text-5xl md:text-6xl font-black text-white mb-2">{number}</div>
        <div className="text-brand-darker font-bold uppercase tracking-wider">{label}</div>
    </div>
);