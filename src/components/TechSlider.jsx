import React from 'react';
import LucideIcon from './LucideIcon';

const TECH_ITEMS = [
  { name: 'React', icon: 'CodeXml', color: 'text-sky-400', bgHex: 'hover:border-sky-500/30 hover:bg-sky-500/5' },
  { name: 'Next.js', icon: 'Cpu', color: 'text-slate-100', bgHex: 'hover:border-slate-400/30 hover:bg-slate-400/5' },
  { name: 'Tailwind CSS', icon: 'Palette', color: 'text-teal-400', bgHex: 'hover:border-teal-500/30 hover:bg-teal-500/5' },
  { name: 'JavaScript', icon: 'Terminal', color: 'text-yellow-400', bgHex: 'hover:border-yellow-500/30 hover:bg-yellow-500/5' },
  { name: 'TypeScript', icon: 'Layers', color: 'text-blue-400', bgHex: 'hover:border-blue-500/30 hover:bg-blue-500/5' },
  { name: 'Node.js', icon: 'Database', color: 'text-green-400', bgHex: 'hover:border-green-500/30 hover:bg-green-500/5' },
  { name: 'Express', icon: 'Webhook', color: 'text-slate-300', bgHex: 'hover:border-slate-300/30 hover:bg-slate-300/5' },
  { name: 'MongoDB', icon: 'Database', color: 'text-emerald-500', bgHex: 'hover:border-emerald-500/30 hover:bg-emerald-500/5' },
  { name: 'PostgreSQL', icon: 'Database', color: 'text-indigo-400', bgHex: 'hover:border-indigo-500/30 hover:bg-indigo-500/5' },
  { name: 'GitHub', icon: 'CodeXml', color: 'text-pink-400', bgHex: 'hover:border-pink-500/30 hover:bg-pink-500/5' }
];

export const TechSlider = () => {
  // Duplicate tech list multiple times to allow infinite seamless looping across wider screens
  const duplicatedTechList = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="py-20 bg-[#0F172A] text-white overflow-hidden relative" id="tech-slider">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cybernetic code grid watermark */}
      <div className="absolute left-[5%] top-[10%] opacity-15 text-[#06B6D4] font-mono text-[7px] hidden lg:block pointer-events-none select-none">
        {/* <span>// RUNTIME_GRID_INDEX: [OK]</span> */}
      </div>

      <div className="absolute right-[5%] bottom-[10%] opacity-10 text-primary font-mono text-[7px] hidden lg:block pointer-events-none select-none">
        <span>COMPILE: SUCCESSFUL_V2.1.0</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10 text-center">
        <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase bg-secondary/10 px-3 py-1 rounded-full inline-block mb-3">
          Our Tech Stack
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
          Technologies We Work With
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          Modern tools and frameworks we use to build fast, secure, and scalable digital products.
        </p>
      </div>

      {/* Marquee Wrapper with side gradient masks */}
      <div className="relative w-full overflow-hidden py-4 z-10">
        {/* Left Fading Edge */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#0F172A] to-transparent z-20 pointer-events-none" />
        {/* Right Fading Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#0F172A] to-transparent z-20 pointer-events-none" />

        {/* Outer scrolling container */}
        <div className="flex w-max relative">
          {/* Internal moving row inside index.css defined marquee keyframe animation */}
          {/* hover:[animation-play-state:paused] lets the browser directly stop transform loops cleanly */}
          <div className="flex gap-4 px-2 animate-marquee hover:[animation-play-state:paused]">
            {duplicatedTechList.map((item, idx) => (
              <div
                key={`tech-${idx}`}
                className={`flex items-center gap-3 px-6 py-3.5 bg-slate-900/60 border border-slate-800/70 rounded-full select-none cursor-pointer group transition-all duration-300 ${item.bgHex}`}
              >
                <div className={`transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                  <LucideIcon name={item.icon} size={20} />
                </div>
                <span className="font-display font-semibold text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSlider;
