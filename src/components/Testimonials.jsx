import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export const Testimonials = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#0F172A]/95 backdrop-blur-md text-white relative overflow-hidden" id="testimonials">
      {/* Abstract atmospheric colored blur filters */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern backdrop of modern SaaS sites */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Decorative Blueprint watermark on Testimonials */}
      <div className="absolute top-10 left-10 opacity-15 text-[#06B6D4] font-mono text-[7px] hidden lg:block pointer-events-none select-none">
        {/* <span>[SYS_METRIC: SUCCESS_RATIO_100%] // AUTH_VALID : TRUE</span> */}
      </div>

      <div className="absolute bottom-10 right-10 opacity-10 text-primary hidden lg:block pointer-events-none select-none">
        <svg width="120" height="40" viewBox="0 0 120 40">
          <line x1="0" y1="20" x2="120" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <polygon points="60,15 65,25 55,25" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase bg-secondary/10 px-3 py-1 rounded-full inline-block mb-3">
            Client Success
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-white leading-tight">
            Trusted By Growing Companies
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Hear directly from the product managers and founders who built high-performance solutions with our engineering team.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between p-8 bg-slate-950/45 backdrop-blur-md border border-white/5 rounded-3xl relative h-full hover:border-white/20 hover:bg-slate-950/65 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              {/* Giant clean Quote graphic */}
              <div className="absolute -top-3 -right-2 text-slate-800 opacity-20 pointer-events-none group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                <Quote size={80} className="stroke-[1.5]" />
              </div>

              <div>
                {/* 5-Star Ratings */}
                <div className="flex items-center gap-1 mb-6 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed italic relative z-10">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-800"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    {testimonial.name}
                    <ShieldCheck size={14} className="text-[#06B6D4]" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {testimonial.role}, <span className="text-[#06B6D4] font-medium">{testimonial.company}</span>
                  </p>
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
