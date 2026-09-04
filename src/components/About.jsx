import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Eye, CodeXml, Shield, Server, Zap, Cpu, ArrowUpRight } from 'lucide-react';

export const About = ({ onNavigate, isStandalone = false }) => {
  const [activeStorySegment, setActiveStorySegment] = useState('origin');

  const HeadingTag = isStandalone ? 'h1' : 'h2';

  const storySegments = {
    origin: {
      year: 'Established 2022',
      title: 'How CodenPixels Began',
      body: 'CodenPixels was founded by a passionate assembly of software architects and systems designers who saw a persistent divide: many digital platforms were either aesthetically flat or structurally sluggish under load. We united with a single oath—never compromise engineering speed for beauty. We help startups and ambitious projects deploy clean-code bases that scale safely from day one.',
    },
    methods: {
      year: 'Agile & Client-Led',
      title: 'Our Interactive Flow',
      body: 'We abandon traditional black-box development. Our clients participate in active weekly checkins, viewing functional staging sites at every phase. We build software in small, targeted feature sprints, ensuring real-world test results dictate roadmap changes rather than theoretical assumptions.',
    },
    standards: {
      year: 'Uncompromising Quality',
      title: 'Absolute Quality Mandate',
      body: 'To ensure long-term stability, we adhere to strict TypeScript modeling. Every route, dataset, and visual modal must trigger instantly, yielding excellent core web metrics. We deliver fully commented code repositories that remain effortless for any team to scale.',
    }
  };

  const whyChooseUsList = [
    {
      id: 'clean',
      title: 'Clean Code',
      description: 'Fully typed TypeScript codebase layouts with precise division of duties, making systems easy to audit and scale.',
      icon: <CodeXml className="text-primary" size={20} />
    },
    {
      id: 'secure',
      title: 'Secure Development',
      description: 'Strict input sanitization, JWT validation, cryptographic storage schemes, and secure API transport networks.',
      icon: <Shield className="text-secondary" size={20} />
    },
    {
      id: 'scalable',
      title: 'Scalable Solutions',
      description: 'Resilient database indexes, cloud routing adapters, and CDN caching patterns for maximum database traffic support.',
      icon: <Server className="text-purple-400" size={20} />
    },
    {
      id: 'delivery',
      title: 'Fast Delivery',
      description: 'Rigorous agile timelines, rapid modular builds, and automated deployments getting your product live on time.',
      icon: <Zap className="text-[#06B6D4]" size={20} />
    },
    {
      id: 'stack',
      title: 'Modern Technology Stack',
      description: 'Leveraging React, Next.js, tailwind-v4, Docker runtime grids, and secure relational database architectures.',
      icon: <Cpu className="text-pink-400" size={20} />
    }
  ];

  return (
    <section className="pt-0 pb-8 sm:pt-4 sm:pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-transparent relative overflow-hidden" id="about">
      {/* Immersive Section-level background structures */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none select-none" />

      {/* Grid Coordinates watermark */}
      <div className="absolute top-8 right-12 opacity-20 text-[#2563EB] font-mono text-[7px] hidden lg:block pointer-events-none select-none">
        {/* <span>LOC_COORDS: [32.7441, -117.1611] // REG: CAL_GRID</span> */}
      </div>

      <div className="absolute left-[3%] top-[35%] opacity-[0.25] text-primary hidden lg:block pointer-events-none select-none">
        <svg width="40" height="120" viewBox="0 0 40 120" fill="none">
          <line x1="20" y1="0" x2="20" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <rect x="15" y="50" width="10" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="110" r="2.5" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About Intro Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-end mb-12 sm:mb-20">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#2563EB] uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
              About CodenPixels
            </span>
            <HeadingTag className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
              A High-Precision Digital Engineering Agency
            </HeadingTag>
          </div>
          <div>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed">
              We operate at the intersection of stunning design aesthetics and flawless cloud engineering. We believe modern software must load instantly, behave predictably, and establish concrete user trust.
            </p>
          </div>
        </div>

        {/* Story Tabbed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch mb-16 sm:mb-24 bg-white/35 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-md">
          {/* Tabs Navigation */}
          <div className="lg:col-span-4 bg-white/20 p-5 sm:p-6 md:p-8 flex flex-col justify-between border-r border-white/20">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-slate-450 uppercase mb-4 sm:mb-6"> OUR STORY</h3>
              <div className="flex flex-col gap-2">
                {Object.keys(storySegments).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveStorySegment(key)}
                    className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-sans text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                      activeStorySegment === key
                        ? 'bg-white/60 text-primary shadow-md border-l-4 border-primary'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/40'
                    }`}
                  >
                    <span>{key === 'origin' ? 'The Origin' : key === 'methods' ? 'Development Methods' : 'Quality Mandates'}</span>
                    <ArrowUpRight size={13} className={activeStorySegment === key ? 'text-primary' : 'text-slate-400'} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200/80 hidden lg:block">
              <span className="text-[10px] font-mono text-slate-400">
                {/* STATUS: CORE OPERATION LIVE */}
                </span>
            </div>
          </div>

          {/* Active Story Body */}
          <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 lg:p-12 bg-transparent flex flex-col justify-center">
            <span className="text-xs font-mono font-bold text-secondary uppercase tracking-tight">
              {storySegments[activeStorySegment].year}
            </span>
            <h3 className="mt-1.5 sm:mt-2 text-xl xs:text-2xl sm:text-3xl lg:text-3.5xl font-display font-extrabold text-slate-905 leading-snug">
              {storySegments[activeStorySegment].title}
            </h3>
            <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full my-4 sm:my-5" />
            <p className="text-slate-655 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl">
              {storySegments[activeStorySegment].body}
            </p>
          </div>
        </div>

        {/* Mission & Vision Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-24">
          
          {/* Mission Card */}
          <div className="p-6 sm:p-8 md:p-10 bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl relative overflow-hidden group hover:bg-white/65 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 h-full">
            <div className="absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            <div className="p-2.5 sm:p-3 bg-white border border-slate-200/80 text-primary w-fit rounded-2xl shadow-sm mb-5 sm:mb-6">
              <Target size={20} className="stroke-[2.5] sm:size-[22px]" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-display font-extrabold text-slate-900">
              Our Mission
            </h3>
            <p className="mt-3 sm:mt-4 text-slate-655 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
              "Deliver innovative digital solutions that empower businesses."
            </p>
            <p className="mt-2 text-[10px] text-slate-400 leading-relaxed font-mono">
              METHOD : BEAST-GRID STABILITY 
              {/* CORE_STANDARD_REV_1  */}
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-6 sm:p-8 md:p-10 bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl relative overflow-hidden group hover:bg-white/65 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 h-full">
            <div className="absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />
            <div className="p-2.5 sm:p-3 bg-white border border-slate-200/80 text-secondary w-fit rounded-2xl shadow-sm mb-5 sm:mb-6">
              <Eye size={20} className="stroke-[2.5] sm:size-[22px]" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-display font-extrabold text-slate-900">
              Our Vision
            </h3>
            <p className="mt-3 sm:mt-4 text-slate-655 text-xs sm:text-sm md:text-base leading-relaxed">
              "Become a trusted technology partner worldwide."
            </p>
            <p className="mt-2 text-[10px] text-slate-400 leading-relaxed font-mono">
              OUTCOME : LONG-TERM ARCHITECTURAL AUTONOMY 
            </p>
          </div>

        </div>

        {/* Why Choose Us Section */}
        <div>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase bg-secondary/10 px-3 py-1 rounded-full inline-block mb-3">
              Why Choose Us
            </span>
            <h2 className="text-2xl xs:text-3xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
              Engineered Beyond Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {whyChooseUsList.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl hover:bg-white/65 hover:border-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="p-2 bg-white border border-slate-200 w-fit rounded-xl shadow-sm mb-4 transition-transform duration-300 group-hover:scale-110 sm:p-2.5">
                    {item.icon}
                  </div>
                  <h3 className="text-[#0F172A] font-display font-extrabold text-xs sm:text-sm md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] sm:text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
