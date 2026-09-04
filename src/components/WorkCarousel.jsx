import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, CodeXml } from 'lucide-react';

export const WorkCarousel = ({ projects = [], onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const displayProjects = projects.length > 0 ? projects : [];

  useEffect(() => {
    if (isPaused || displayProjects.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, displayProjects.length]);

  if (displayProjects.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayProjects.length) % displayProjects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayProjects.length);
  };

  const currentProject = displayProjects[currentIndex];

  return (
    <div
      className="relative w-full max-w-6xl mx-auto my-8 px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 lg:p-12">
          
          {/* Left Column: Project Details */}
          <div className="lg:col-span-6 flex flex-col justify-between order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/20 text-cyan-300 text-xs font-mono font-bold uppercase rounded-full border border-primary/30 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-cyan-400" />
                  <span>Featured Deliverable</span>
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold bg-slate-800/80 px-2.5 py-1 rounded-full">
                  {currentProject.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight">
                {currentProject.name}
              </h3>

              <p className="mt-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                {currentProject.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {currentProject.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-slate-800/90 border border-slate-700 text-slate-300 text-[11px] font-mono rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-primary hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Launch Live Preview</span>
                  <ExternalLink size={14} />
                </a>
              )}

              <a
                href="/projects"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/projects');
                  }
                }}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                <span>Browse All Work ({displayProjects.length})</span>
              </a>
            </div>
          </div>

          {/* Right Column: Project Preview Image */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/60 shadow-2xl group">
              <img
                src={currentProject.image}
                alt={currentProject.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/60 text-[11px] font-mono text-slate-300">
                Client: <span className="text-white font-bold">{currentProject.client || 'Showcase Project'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Navigation Controls */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {displayProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to project slide ${idx + 1}`}
                className={`h-2 transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-primary shadow-sm shadow-primary/50'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-mono text-slate-400 font-semibold px-1">
              {currentIndex + 1} / {displayProjects.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkCarousel;
