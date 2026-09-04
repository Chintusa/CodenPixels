import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, IndianRupee, DollarSign, Sparkles } from 'lucide-react';
import { getStoredServices, getStoredCurrency, STORAGE_UPDATE_EVENT } from '../utils/storage';
import LucideIcon from './LucideIcon';

export const Services = ({ onNavigate, isStandalone = false }) => {
  const [services, setServices] = useState(() => getStoredServices());
  const [currency, setCurrency] = useState(() => getStoredCurrency());
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const handleStorageUpdate = () => {
      setServices(getStoredServices());
      setCurrency(getStoredCurrency());
    };
    window.addEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
  }, []);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const HeadingTag = isStandalone ? 'h1' : 'h2';

  // Get unique categories
  const categories = ['All', ...new Set(services.map(s => s.category).filter(Boolean))];

  const filteredServices = services.filter(srv => {
    if (activeCategory === 'All') return true;
    return srv.category === activeCategory;
  });

  return (
    <section className="pt-0 pb-8 sm:pt-4 sm:pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-transparent relative overflow-hidden" id="services">
      {/* Decorative colored grid spots */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Service Catalogue & Transparent Pricing
          </span>
          <HeadingTag className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
            Engineered Capabilities for Modern Growth
          </HeadingTag>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            High-converting websites, Smart QR Restaurant Menus, Cloud ERPs, Billing Software, POS systems, and AI-powered digital products with transparent pricing for Indian & Global businesses.
          </p>

          {/* Category Filter Pills */}
          {categories.length > 2 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-sans transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white/80 text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredServices.map((srv) => {
            const inrPrice = srv.startingPriceInr ? `₹${srv.startingPriceInr.toLocaleString('en-IN')}` : null;
            const usdPrice = srv.startingPriceUsd ? `$${srv.startingPriceUsd.toLocaleString('en-US')}` : null;

            return (
              <div
                key={srv.slug || srv.id}
                className="flex flex-col justify-between p-6 sm:p-8 bg-white/50 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl hover:bg-white hover:border-primary/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden group h-full"
              >
                <div>
                  {/* Glowing background accent for hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Header with Icon and Pricing Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6 relative z-10">
                    <div className="p-3 bg-white border border-slate-100 shadow-sm text-primary rounded-xl sm:rounded-2xl group-hover:-translate-y-1 transition-transform">
                      <LucideIcon name={srv.icon} size={22} className="stroke-[2] sm:size-[24px]" />
                    </div>

                    {(inrPrice || usdPrice) && (
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Starting from</span>
                        <div className="flex items-center gap-1 font-mono font-extrabold text-sm text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <span>{currency === 'USD' ? (usdPrice || inrPrice) : (inrPrice || usdPrice)}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({currency === 'USD' ? 'USD' : 'INR'})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10">
                    {srv.category && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary bg-cyan-500/10 px-2.5 py-0.5 rounded-md inline-block mb-2">
                        {srv.category}
                      </span>
                    )}

                    <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 group-hover:text-primary transition-colors">
                      <a
                        href={`/services/${srv.slug}`}
                        onClick={(e) => handleLinkClick(e, `/services/${srv.slug}`)}
                        className="hover:underline"
                      >
                        {srv.title}
                      </a>
                    </h3>
                    
                    <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {srv.description}
                    </p>
                  </div>

                  {/* Checklist snippet inside the card */}
                  {srv.features && srv.features.length > 0 && (
                    <div className="mt-5 sm:mt-6 space-y-2 relative z-10">
                      {srv.features.slice(0, 3).map((feat, index) => (
                        <div key={index} className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-700">
                          <Check size={12} className="text-secondary stroke-[3.5] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Link to dedicated service page */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 relative z-10">
                  <a
                    href={`/services/${srv.slug}`}
                    onClick={(e) => handleLinkClick(e, `/services/${srv.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary group-hover:text-secondary transition-colors"
                  >
                    <span>Explore Specifications</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="/contact"
                    onClick={(e) => handleLinkClick(e, '/contact')}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;

