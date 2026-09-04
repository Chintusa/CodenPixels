import React, { useState, useEffect } from 'react';
import { Star, Quote, ShieldCheck, ChevronLeft, ChevronRight, MessageSquarePlus, Sparkles } from 'lucide-react';
import { getStoredTestimonials, STORAGE_UPDATE_EVENT } from '../utils/storage.js';

export const Testimonials = ({ onNavigate }) => {
  const [testimonials, setTestimonials] = useState(() => getStoredTestimonials());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Subscribe to storage updates so changes made in Admin reflect instantly
  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(getStoredTestimonials());
    };

    window.addEventListener(STORAGE_UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, handleUpdate);
  }, []);

  // Auto-play review slider
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex] || testimonials[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0F172A] text-white relative overflow-hidden" id="testimonials">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-14 md:mb-18">
          <span className="text-xs font-mono tracking-widest text-secondary uppercase bg-cyan-500/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3 border border-cyan-500/20">
            <Sparkles size={13} className="text-cyan-400" />
            <span>Client Success Stories</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-white leading-tight">
            Trusted by Founders in India & Worldwide
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            Real feedback from business owners, startups, and product managers who built high-performing web applications, smart menus, and digital platforms with CodeNPixels.
          </p>
        </div>

        {/* Highlighted Interactive Featured Review Carousel */}
        <div
          className="max-w-4xl mx-auto mb-16 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Large decorative quote mark */}
          <div className="absolute top-6 right-6 text-slate-800 opacity-40 pointer-events-none">
            <Quote size={80} className="stroke-[1.5]" />
          </div>

          <div className="relative z-10">
            {/* Top Stars & Product Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {current.productBuilt && (
                <span className="px-3 py-1 bg-primary/20 border border-primary/40 text-cyan-300 text-xs font-mono font-semibold rounded-full">
                  Delivered: {current.productBuilt}
                </span>
              )}
            </div>

            {/* Review Content */}
            <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-200 font-display font-medium leading-relaxed italic mb-8">
              "{current.content}"
            </blockquote>

            {/* Client Info & Photo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/50 shadow-md"
                />
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-1.5">
                    <span>{current.name}</span>
                    <ShieldCheck size={16} className="text-secondary" />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {current.role} • <span className="text-secondary font-medium">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-xs font-mono text-slate-400 font-semibold px-2">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Card Grid for Browsing More Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-6 bg-slate-950/50 backdrop-blur-md border border-slate-800/80 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">
                  "{item.content.length > 140 ? item.content.slice(0, 140) + '...' : item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div className="truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate flex items-center gap-1">
                    <span>{item.name}</span>
                    <ShieldCheck size={12} className="text-cyan-400 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
