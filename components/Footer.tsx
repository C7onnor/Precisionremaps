import React from 'react';
import { COMPANY_NAME, LOCATION } from '../constants';
import { PageView } from '../types';

interface FooterProps {
    onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-black border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{COMPANY_NAME}</h2>
                        <p className="text-gray-500">Professional Vehicle Remapping in {LOCATION}.</p>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-400">
                        <button onClick={() => onNavigate(PageView.HOME)} className="hover:text-brand-orange transition">Home</button>
                        <button onClick={() => onNavigate(PageView.ABOUT)} className="hover:text-brand-orange transition">About</button>
                        <button onClick={() => onNavigate(PageView.CONTACT)} className="hover:text-brand-orange transition">Contact</button>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
                </div>
            </div>
        </footer>
    );
};