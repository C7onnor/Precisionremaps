import React from 'react';
import { Award, PenTool, ThumbsUp } from 'lucide-react';
import { OWNER_NAME, EXPERIENCE_YEARS, LOCATION } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-darker py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4">About The Expert</h2>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Precision Tuning with a Personal Touch
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Welcome to Precision Remaps. My name is {OWNER_NAME}, and I have been in the automotive tuning industry for over {EXPERIENCE_YEARS} years. 
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Based here in {LOCATION}, I've built a reputation on honesty, technical precision, and genuine results. Unlike generic "flash and dash" services, I take the time to understand your vehicle's health before applying any software upgrades.
            </p>
            <div className="flex gap-6">
                <div className="flex items-center gap-2 text-white">
                    <Award className="text-brand-blue" /> Master Technician
                </div>
                <div className="flex items-center gap-2 text-white">
                    <ThumbsUp className="text-brand-orange" /> Lifetime Software Warranty
                </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-brand-blue rounded-2xl rotate-3 opacity-20 blur-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974&auto=format&fit=crop" 
              alt="Chris working on a car" 
              className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover aspect-video lg:aspect-square"
            />
          </div>
        </div>

        {/* Timeline / Process */}
        <div className="bg-brand-dark rounded-3xl p-12 border border-white/5">
          <h3 className="text-3xl font-bold text-white text-center mb-16">The Precision Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Step 
                number="01" 
                title="Health Check" 
                desc="We perform a full diagnostic scan to ensure your engine is healthy enough for tuning."
            />
            <Step 
                number="02" 
                title="Custom Remap" 
                desc="We extract your ECU data and write a custom file tailored to your car and driving style."
            />
            <Step 
                number="03" 
                title="Testing" 
                desc="A final data-log road test confirms everything is performing safely and optimally."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Step: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="relative p-6 border-l-2 border-brand-orange/30 hover:border-brand-orange transition-colors">
        <span className="text-6xl font-black text-white/5 absolute -top-4 left-4">{number}</span>
        <h4 className="text-xl font-bold text-white mb-2 relative z-10">{title}</h4>
        <p className="text-gray-400 relative z-10">{desc}</p>
    </div>
);