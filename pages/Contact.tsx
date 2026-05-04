import React, { useState } from 'react';
import { Phone, MapPin, Instagram, Send, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { PHONE_NUMBER, FULL_ADDRESS } from '../constants';

export const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', reg: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Send data to Netlify Forms
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    "form-name": "contact", // Must match the name attribute in index.html form
                    "subject": `New Website Enquiry - ${formState.reg ? formState.reg.toUpperCase() : 'General'}`,
                    "name": formState.name,
                    "email": formState.email,
                    "reg": formState.reg,
                    "message": formState.message
                }).toString()
            });

            alert("Message Sent! We will get back to you shortly.");
            setFormState({ name: '', email: '', reg: '', message: '' });
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please give us a call instead.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-darker py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-white mb-4">Get In Touch</h1>
                    <p className="text-gray-400">Ready to transform your drive? Send us a message.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-brand-dark p-8 rounded-2xl border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Details</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="bg-brand-blue/20 p-3 rounded-lg text-brand-blue">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Call Us</p>
                                        <p className="text-white font-medium">{PHONE_NUMBER}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="bg-brand-blue/20 p-3 rounded-lg text-brand-blue">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Visit Us</p>
                                        <p className="text-white font-medium">{FULL_ADDRESS}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h4 className="text-white font-bold mb-4">Follow Us</h4>
                                <div className="flex gap-4">
                                    <a 
                                        href="https://www.instagram.com/precision_remaps" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="bg-pink-600 p-3 rounded-full text-white hover:bg-pink-700 transition"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-brand-dark p-8 rounded-2xl border border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Hidden input for Netlify Form Handling */}
                            <input type="hidden" name="form-name" value="contact" />

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    className="w-full bg-brand-darker border border-gray-700 rounded-lg p-3 text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition"
                                    value={formState.name}
                                    onChange={e => setFormState({...formState, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Vehicle Registration</label>
                                <input 
                                    type="text" 
                                    name="reg"
                                    className="w-full bg-brand-darker border border-gray-700 rounded-lg p-3 text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition uppercase"
                                    placeholder="AB12 CDE"
                                    value={formState.reg}
                                    onChange={e => setFormState({...formState, reg: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    className="w-full bg-brand-darker border border-gray-700 rounded-lg p-3 text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition"
                                    value={formState.email}
                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea 
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-brand-darker border border-gray-700 rounded-lg p-3 text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition"
                                    value={formState.message}
                                    onChange={e => setFormState({...formState, message: e.target.value})}
                                ></textarea>
                            </div>
                            <Button type="submit" fullWidth disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Send Message <Send className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};