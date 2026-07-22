import React, { useState } from 'react';
import { Terminal, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please fill in your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setSubscribed(true);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#0F172A]/95 backdrop-blur-md text-slate-300 border-t border-white/5 relative z-10 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
      {/* Decorative vertical coordinates overlay to give agency aesthetic depth */}
      <div className="absolute left-8 bottom-32 text-[10px] font-mono text-slate-700 tracking-widest uppercase rotate-90 select-none hidden xl:block">
        {/* CP : CORP : EST_2022 */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 mb-12 sm:mb-16">
          
          {/* Column 1: Company Meta */}
          <div className="flex flex-col gap-5">
            <button
          onClick={() => handleNavigation('home')}
          className="flex items-center gap-3 select-none cursor-pointer group"
        >
          <img
            src="/logo.png"
            alt="CodeNPixel Logo"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <div className="hidden sm:flex flex-col items-start leading-none">
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
              <span className="text-white-900">Code</span>
              <span className="text-white-900">N</span>
              <span className="text-[#2563EB]">Pixel</span>
            </h1>

            
          </div>
        </button>
            <p className="text-slate-400 text-sm leading-relaxed">
              We design and engineer secure, scalable, and beautifully animated full-stack digital products that help modern startups and enterprises grow worldwide.
            </p>
            <div className="flex flex-col gap-2.5 mt-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-secondary" />
                <span className="hover:text-white transition-colors">contact.codenpixels.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-secondary" />
                <span className="hover:text-white transition-colors">+91 7008404037</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-secondary pointer-events-none" />
                <span className="text-slate-400">Bhubaneswar , Odisha & Remote</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase mb-6">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'services', label: 'Services Catalogue' },
                { id: 'about', label: 'Corporate Story' },
                { id: 'projects', label: 'Work Portfolio' },
                { id: 'process', label: 'Work Methodology' },
                { id: 'contact', label: 'Contact Form' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-all hover:translate-x-1 hover:underline cursor-pointer flex items-center gap-1 group text-slate-400 text-left"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-secondary">›</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase mb-6">
              Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                'Custom Website Design',
                'Frontend Development',
                'Backend Development',
                'Full Stack Development',
                'Dynamic UI/UX Design',
                'API Optimization',
                'System Maintenance'
              ].map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      // setActiveTab('services');
                      // window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-all text-slate-400 text-left hover:translate-x-1 cursor-pointer flex items-center gap-1 group"
                  >
                    <span className="text-primary text-xs mr-1 opacity-60 group-hover:opacity-100 select-none">•</span>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Box */}
           <div>
            <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase mb-6">
              Stay Updated
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Subscribe to receive insights about modern web workflows, design patterns, and full-stack performance tuning.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Submit your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 text-white bg-primary hover:bg-secondary p-2 rounded-lg top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
            <div className="mt-2 min-h-[20px]">
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-secondary font-medium mt-1">
                  <CheckCircle2 size={12} />
                  <span>Success! You have subscribed.</span>
                </div>
              )}
              {error && (
                <span className="text-xs text-red-400 font-medium">{error}</span>
              )}
            </div>
          </div> 
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>&copy; {currentYear} CodenPixels Corp. All rights reserved.</span>
            <span className="text-slate-755 font-mono select-none hidden sm:block">|</span>
            <span className="hidden sm:block">Crafted for start-ups & builders.</span>
          </div>
          <div className="flex gap-6 font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer hover:underline">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer hover:underline">Terms of Service</span>
            <span className="hover:text-white cursor-pointer hover:underline" onClick={() => setActiveTab('contact')}>Client Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
