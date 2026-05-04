import React, { useState } from 'react';
import { Search, Gauge, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '../components/Button';
import { VehicleStats } from '../types';
import { getVehicleStats } from '../services/mockRemapService';

export const Lookup: React.FC = () => {
  const [reg, setReg] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VehicleStats | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reg.length < 3) {
      setError('Please enter a valid registration');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const data = await getVehicleStats(reg);
      setResult(data);
    } catch (err: any) {
      // Display the specific error message from the service
      setError(err.message || 'Could not fetch vehicle details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? [
    {
      name: 'BHP',
      Stock: result.originalBhp,
      Tuned: result.tunedBhp,
    },
    {
      name: 'Torque (Nm)',
      Stock: result.originalTorque,
      Tuned: result.tunedTorque,
    },
  ] : [];

  return (
    <div className="min-h-screen bg-brand-darker py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Check Your <span className="text-brand-blue">Gains</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Enter your registration to see what we can do for your vehicle.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-brand-dark border border-white/10 p-6 rounded-2xl shadow-2xl mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="bg-yellow-400 text-black font-bold text-xs px-1 rounded-sm border border-black h-6 flex items-center">GB</div>
              </div>
              <input
                type="text"
                value={reg}
                onChange={(e) => setReg(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                placeholder="ENTER REG"
                className="w-full pl-12 pr-4 py-4 bg-gray-100 text-black text-2xl font-black rounded-lg border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-brand-blue uppercase tracking-widest text-center"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="md:w-1/3 py-4 text-xl"
            >
              {loading ? (
                <span className="flex items-center animate-pulse">
                  Analyzing...
                </span>
              ) : (
                <>
                  <Search className="w-6 h-6" /> Lookup Vehicle
                </>
              )}
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center font-bold bg-red-500/10 py-2 rounded-lg">{error}</p>}
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-fade-in-up space-y-8">
            
            {/* Vehicle Header */}
            <div className="bg-gradient-to-r from-brand-blue/20 to-brand-dark border border-brand-blue/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{result.vehicleName}</h3>
                <p className="text-brand-blue font-medium">{result.engine}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Compatible for Stage 1
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BHP Card */}
              <div className="bg-brand-dark border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-brand-orange/50 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Gauge className="w-24 h-24" />
                </div>
                <h4 className="text-gray-400 font-medium mb-2">Estimated Power (BHP)</h4>
                <div className="flex items-end gap-4">
                    <div className="text-3xl font-bold text-gray-500 line-through decoration-red-500 decoration-2">{result.originalBhp}</div>
                    <ArrowRight className="w-6 h-6 mb-2 text-brand-orange" />
                    <div className="text-5xl font-black text-white">{result.tunedBhp}</div>
                </div>
                <div className="mt-4 text-green-400 font-bold flex items-center">
                    + {result.tunedBhp - result.originalBhp} BHP Increase
                </div>
              </div>

              {/* Torque Card */}
              <div className="bg-brand-dark border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-brand-blue/50 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-24 h-24" />
                </div>
                <h4 className="text-gray-400 font-medium mb-2">Estimated Torque (Nm)</h4>
                <div className="flex items-end gap-4">
                    <div className="text-3xl font-bold text-gray-500 line-through decoration-red-500 decoration-2">{result.originalTorque}</div>
                    <ArrowRight className="w-6 h-6 mb-2 text-brand-blue" />
                    <div className="text-5xl font-black text-white">{result.tunedTorque}</div>
                </div>
                <div className="mt-4 text-green-400 font-bold flex items-center">
                    + {result.tunedTorque - result.originalTorque} Nm Increase
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-brand-dark border border-white/10 rounded-xl p-6 h-96">
              <h4 className="text-white font-bold mb-6">Performance Visualizer</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Legend />
                  <Bar dataKey="Stock" fill="#3b82f6" name="Stock" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Tuned" fill="#ff6600" name="Stage 1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center pt-8">
              <Button onClick={() => window.location.hash = '#contact'}>
                Book This Remap
              </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};