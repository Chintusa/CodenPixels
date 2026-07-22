import React, { useState, useEffect } from 'react';
import { Award, Heart, ClipboardCheck, Clock } from 'lucide-react';

export const Stats = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    years: 0
  });

  const stats = [
    {
      id: 'projects',
      name: 'Projects Completed',
      targetValue: 50,
      suffix: '+',
      icon: <ClipboardCheck className="text-primary" size={24} />,
      description: 'Production applications staged securely'
    },
    {
      id: 'clients',
      name: 'Happy Clients',
      targetValue: 30,
      suffix: '+',
      icon: <Heart className="text-[#06B6D4]" size={24} />,
      description: 'Startups and corporations globally'
    },
    {
      id: 'satisfaction',
      name: 'Satisfaction Rate',
      targetValue: 99,
      suffix: '%',
      icon: <Award className="text-purple-400" size={24} />,
      description: 'Uncompromising standard score'
    },
    {
      id: 'years',
      name: 'Years Experience',
      targetValue: 5,
      suffix: '+',
      icon: <Clock className="text-secondary" size={24} />,
      description: 'Continuous digital development'
    }
  ];

  useEffect(() => {
    // Progressive counter effect triggering immediately after render
    const duration = 2000; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Exponential out easing formula for that premium luxury glide
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.floor(easeOut * 50),
        clients: Math.floor(easeOut * 30),
        satisfaction: Math.floor(easeOut * 99),
        years: Math.floor(easeOut * 5)
      });

      if (frame >= totalFrames) {
        clearInterval(interval);
        // Correct eventual precision errors
        setCounts({
          projects: 50,
          clients: 30,
          satisfaction: 99,
          years: 5
        });
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-20 md:py-28 lg:py-32 bg-transparent relative overflow-hidden" id="stats">
      {/* Visual coordinates and aesthetic borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Embedded subtle grid watermark */}
      <div className="absolute top-[30%] -left-10 w-44 h-44 bg-primary/5 rounded-full blur-2xl pointer-events-none select-none" />
      <div className="absolute bottom-1/4 -right-10 w-44 h-44 bg-[#06B6D4]/5 rounded-full blur-2xl pointer-events-none select-none" />

      <div className="absolute top-4 right-10 text-slate-350 opacity-20 font-mono text-[7px] hidden lg:block pointer-events-none select-none">
        {/* <span>STATISTICAL_CORE_LOAD: 100% // ENG_OK</span> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const currentVal = counts[stat.id] ?? 0;
            return (
              <div
                key={stat.id}
                className="group relative p-5 sm:p-6 bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl hover:bg-white/65 hover:border-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col justify-between h-full animate-fadeIn"
              >
                {/* Visual glowing point on top right */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 sm:p-2 bg-white rounded-lg border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 font-mono text-[10px] sm:text-xs font-semibold select-none">
                    {/* // STAT : {stat.id.toUpperCase()} */}
                  </span>
                  
                  <div className="mt-3 sm:mt-4 flex items-baseline gap-0.5 sm:gap-1">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-primary bg-clip-text">
                      {currentVal}
                    </span>
                    <span className="text-2xl sm:text-3xl font-display font-bold text-primary">
                      {stat.suffix}
                    </span>
                  </div>

                  <h3 className="mt-2 sm:mt-3 text-sm sm:text-base font-display font-bold text-slate-800">
                    {stat.name}
                  </h3>
                  
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Micro interactive progress loader bar */}
                <div className="mt-5 sm:mt-6 w-full h-[3px] bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                    style={{ width: `${(currentVal / stat.targetValue) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
