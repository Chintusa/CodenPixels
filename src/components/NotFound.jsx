import React from 'react';
import { Home, Compass, Layers, Mail, ArrowLeft } from 'lucide-react';

export const NotFound = ({ onNavigate }) => {
  return (
    <section className="min-h-[75vh] flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-xl mx-auto text-center bg-white/50 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl">
        <span className="text-4xl sm:text-6xl font-display font-extrabold text-primary mb-2 block">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-2">
          Page Not Found
        </h1>
        <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Explore our core sections below.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200/70 hover:border-primary/30 rounded-xl transition-all flex items-center gap-3 text-slate-800 text-xs sm:text-sm font-semibold"
          >
            <Home size={16} className="text-primary shrink-0" />
            <span>Homepage</span>
          </a>

          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/services');
            }}
            className="p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200/70 hover:border-primary/30 rounded-xl transition-all flex items-center gap-3 text-slate-800 text-xs sm:text-sm font-semibold"
          >
            <Compass size={16} className="text-secondary shrink-0" />
            <span>Our Services</span>
          </a>

          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/projects');
            }}
            className="p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200/70 hover:border-primary/30 rounded-xl transition-all flex items-center gap-3 text-slate-800 text-xs sm:text-sm font-semibold"
          >
            <Layers size={16} className="text-purple-500 shrink-0" />
            <span>Work Portfolio</span>
          </a>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
            className="p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200/70 hover:border-primary/30 rounded-xl transition-all flex items-center gap-3 text-slate-800 text-xs sm:text-sm font-semibold"
          >
            <Mail size={16} className="text-emerald-500 shrink-0" />
            <span>Contact & Quotes</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Homepage</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
