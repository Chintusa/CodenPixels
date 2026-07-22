import React from 'react';
import { motion } from 'motion/react';

export const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. Global Subtle Dot Matrix Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100/40 to-slate-50" 
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(37, 99, 235, 0.04) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px, 20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          maskImage: 'linear-gradient(to bottom, #000 80%, rgba(0,0,0,0.85) 95%, transparent 100%)',
        }}
      />

      {/*2. Floating Technical Grid Crosshairs Staggered Down the Scroll View */}
      {/* Upper Left Grid accent */}
      <div className="absolute top-[12%] left-[4%] opacity-[0.25] text-primary">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="4" fill="currentColor" />
          <text x="25" y="15" fill="currentColor" className="text-[6px] font-mono font-bold tracking-wider">CP-SEC_01</text>
        </svg>
      </div>

      {/* Upper Right Technical Bracket Accent */}
      <div className="absolute top-[18%] right-[5%] opacity-[0.2] text-[#06B6D4]">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M 10,0 L 0,0 L 0,10 M 70,0 L 80,0 L 80,10 M 0,70 L 0,80 L 10,80 M 80,70 L 80,80 L 70,80" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="1.5" fill="currentColor" />
          <text x="12" y="44" fill="currentColor" className="text-[7px] font-mono tracking-widest">[GRID: 80x80]</text>
        </svg>
      </div>

      {/* Middle Left Floating Engineering Grid */}
      <div className="absolute top-[42%] left-[3%] opacity-[0.15] text-[#8B5CF6]">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <rect x="0.5" y="0.5" width="99" height="99" rx="8" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Middle Right Staggered Matrix Coordinate Card */}
      <div className="absolute top-[55%] right-[4%] opacity-[0.2] hidden md:block">
        <div className="border border-slate-200/60 bg-slate-50/50 backdrop-blur-xs p-3 rounded-xl font-mono text-[8px] text-slate-400 space-y-1 w-32 shadow-2xs">
          <div className="flex justify-between border-b border-slate-200 pb-0.5 font-bold">
            <span>SYS_MONITOR</span>
            <span className="text-emerald-500">LIVE</span>
          </div>
          <div className="flex justify-between">
            <span>PING:</span>
            <span>12.4ms</span>
          </div>
          <div className="flex justify-between">
            <span>GRID_NODE:</span>
            <span>0x4F7C</span>
          </div>
        </div>
      </div>

      {/* Lower Left Blueprint Cube */}
      <div className="absolute top-[78%] left-[5%] opacity-[0.18] text-primary">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M 30,5 L 55,20 L 55,50 L 30,55 L 5,50 L 5,20 Z" stroke="currentColor" strokeWidth="1" />
          <path d="M 30,5 L 30,55 M 30,28 L 5,20 M 30,28 L 55,20" stroke="currentColor" strokeWidth="1" />
          <circle cx="30" cy="28" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* 3. Deep Rotating and Floating Gradient Bubble Accents */}
      {/* Accent Orb 1 */}
      <motion.div 
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[18%] left-[10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-[#2563EB]/10 to-[#8B5CF6]/5 rounded-full blur-[100px] sm:blur-[160px]"
      />

      {/* Accent Orb 2 */}
      <motion.div 
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[48%] right-[12%] w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-gradient-to-br from-[#06B6D4]/10 to-[#2563EB]/5 rounded-full blur-[90px] sm:blur-[140px]"
      />

      {/* Accent Orb 3 */}
      <motion.div 
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[82%] left-[15%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-[#8B5CF6]/8 to-[#06B6D4]/8 rounded-full blur-[110px] sm:blur-[150px]"
      />

      {/* 4. Fine-line Technical Grid Borders under fixed heights */}
      <div className="absolute top-[1500px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
      <div className="absolute top-[3000px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
      <div className="absolute top-[4500px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />

      {/* Animated Subtle Floating Particle Accents */}
      <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden">
        {[20, 45, 75, 90, 110, 135].map((topPct, idx) => (
          <motion.div
            key={idx}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/25"
            style={{
              top: `${topPct}vw`,
              left: `${15 + (idx * 16) % 70}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.45, 0.1],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 8 + (idx % 3) * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 1.5,
            }}
          />
        ))}
      </div>

    </div>
  );
};
