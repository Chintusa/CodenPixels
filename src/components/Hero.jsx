import React from 'react';
import { motion } from 'motion/react';
import { Server, Layers, Shield, ArrowRight, Sparkles } from 'lucide-react';
import heroDashboardImage from "../assets/images/hero_dashboard_clean_1781549662475.jpg";

export const Hero = ({ onNavigate }) => {
  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <section className="relative min-h-[auto] md:min-h-screen pt-24 pb-12 sm:pt-28 md:pt-32 sm:pb-20 bg-transparent flex items-center overflow-hidden" id="hero">
      
      {/* Immersive radial gradient backplane lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-primary/10 to-secondary/15 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Column: Typography Content & CTA Actions */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0">
          
          <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-mono font-bold uppercase rounded-full mb-4 sm:mb-6 max-w-fit">
            <span className="w-2 h-2 bg-secondary rounded-full animate-ping" />
            <span>Accepting Digital Projects for 2026</span>
          </span>

          {/* Primary Meaningful H1 */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold sm:font-black tracking-tight text-slate-900 leading-[1.125] sm:leading-[1.1]">
            AI-Powered <span className="text-primary">Web Development</span> & Digital Solutions
          </h1>

          <p className="mt-4 sm:mt-6 text-slate-600 font-sans text-sm sm:text-base md:text-lg lg:text-xl font-normal sm:font-medium leading-relaxed max-w-xl">
            We engineer high-performance React & Next.js websites, scalable backend systems, custom APIs, and AI integrations that help modern businesses scale with authority.
          </p>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            
            {/* CTA 1: Start Your Project */}
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary hover:bg-[#1D4ED8] text-white font-sans text-xs sm:text-sm font-semibold rounded-2xl w-full sm:w-auto transition-all shadow-lg hover:shadow-primary/30 hover:scale-[1.02] cursor-pointer group"
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* CTA 2: View Our Work */}
            <a
              href="/projects"
              onClick={(e) => handleLinkClick(e, '/projects')}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200/80 w-full sm:w-auto transition-all cursor-pointer"
            >
              <span>View Portfolio Work</span>
            </a>
          </div>

          {/* Quick core metrics tags */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 border-t border-slate-200/60 pt-6 sm:pt-8 w-full">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield size={16} className="text-secondary" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-600 uppercase">Secure Deployments</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Server size={16} className="text-primary" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-600 uppercase">Core Web Vitals Ready</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Layers size={16} className="text-purple-500" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-600 uppercase">React 19 & Next.js</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Graphic Frame */}
        <div className="lg:col-span-6 w-full relative">
          
          {/* Ambient background decoration circle shape */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary rounded-[36px] blur-xl opacity-20" />

          {/* Browser Container Frame showcasing dashboard image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-w-md sm:max-w-none lg:max-w-full mx-auto group hover:scale-[1.01] transition-transform duration-300"
          >
            {/* Top window styling header */}
            <div className="bg-slate-50 px-3 sm:px-5 py-2.5 sm:py-3 border-b border-slate-200/65 flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
              </div>

              {/* Fake web browser URL bar */}
              <div className="bg-white border border-slate-200/80 px-3 sm:px-4 py-0.5 sm:py-1 rounded-lg text-[9px] sm:text-[11px] font-mono text-slate-500 select-none w-48 sm:w-64 text-center truncate shadow-xs">
                https://codenpixels.in/platform
              </div>

              <div className="w-8 sm:w-10" />
            </div>

            {/* Inner Dashboard Image with fetchpriority=high for LCP */}
            <div className="relative aspect-[4/3] xs:aspect-[16/10] sm:aspect-video lg:aspect-[4/3] xl:aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
              <img
                src={heroDashboardImage}
                alt="CodeNPixels AI Web Development and Dashboard Engineering Solutions"
                width="1200"
                height="800"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Subtle bottom browser footer with status indicator */}
            <div className="bg-slate-50 px-3 sm:px-5 py-2 sm:py-2.5 border-t border-slate-200/65 flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Production system ready</span>
              </span>
              <span>SSL ENCRYPTED</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
