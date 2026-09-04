import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data';
import LucideIcon from './LucideIcon';

export const Process = ({ onNavigate, isStandalone = false }) => {
  const [activeStep, setActiveStep] = useState(1);

  const totalSteps = PROCESS_STEPS.length;

  // This makes the progress line reach the last step properly.
  const progressPercentage =
    ((activeStep - 1) / (totalSteps - 1)) * 100;

  const nextStep = PROCESS_STEPS.find(
    stepItem => stepItem.step === activeStep + 1
  );

  const HeadingTag = isStandalone ? 'h1' : 'h2';

  return (
   <section className="pt-0 pb-8 sm:pt-4 sm:pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-transparent relative overflow-hidden" id="process">
      {/* Absolute ambient lights */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid cross watermark background detail */}
      <div className="absolute right-12 top-[12%] text-secondary/15 font-mono text-[8px] hidden lg:block pointer-events-none select-none">
        <pre>{`[ENGINEERING_PIPELINE]
ID: PL_STAGE_7_TRUE
REV: 2026.06.12
MON: OK`}</pre>
      </div>

      <div className="absolute top-[48%] left-[2%] opacity-[0.2] text-[#8B5CF6] hidden xl:block pointer-events-none select-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="45"
            y="5"
            width="10"
            height="90"
            fill="currentColor"
            opacity="0.1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#2563EB] uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Our Work Workflow
          </span>

          <HeadingTag className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
            Our 7-Step Development Process
          </HeadingTag>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            How we translate your conceptual briefs into production-grade,
            secure, and blazing-fast digital realities. Click each node below to
            view operations.
          </p>
        </div>

        {/* Stepper Node Connectors for Desktop */}
        <div className="hidden lg:flex items-center justify-between gap-1 bg-white/40 backdrop-blur-md p-[18px] rounded-full border border-white/40 shadow-sm max-w-5xl mx-auto mb-16 relative">
          {/* Progress line wrapper */}
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {PROCESS_STEPS.map(stepItem => {
            const isCompleted = stepItem.step < activeStep;
            const isActive = stepItem.step === activeStep;

            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStep(stepItem.step)}
                className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none shrink-0"
              >
                <div
                  className={`w-12 h-12 rounded-full border flex items-center justify-center font-display font-bold text-sm tracking-tight transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-110'
                      : isCompleted
                      ? 'bg-secondary text-white border-secondary'
                      : 'bg-white text-slate-500 border-slate-200 group-hover:border-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={14} className="stroke-[2.5]" />
                  ) : (
                    `0${stepItem.step}`
                  )}
                </div>

                <span
                  className="text-[10px] xl:text-[11px] font-sans font-bold tracking-tight uppercase transition-colors"
                  style={{
                    color: isActive ? '#2563EB' : '#94A3B8'
                  }}
                >
                  {stepItem.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stepper Navigation for Mobile Views */}
        <div className="lg:hidden flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {PROCESS_STEPS.map(stepItem => {
            const isActive = stepItem.step === activeStep;

            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStep(stepItem.step)}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                0{stepItem.step} {stepItem.title}
              </button>
            );
          })}
        </div>

        {/* Active Step rich card details view */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {PROCESS_STEPS.map(stepItem => {
              if (stepItem.step !== activeStep) return null;

              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
                >
                  <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-slate-50 text-slate-100 font-display font-extrabold text-[80px] sm:text-[120px] leading-none select-none pointer-events-none -mr-3 sm:-mr-4 -mt-3 sm:-mt-4 opacity-50 font-mono">
                    {stepItem.step}
                  </div>

                  {/* Icon Panel on Left */}
                  <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="p-4 sm:p-[22px] bg-primary/10 text-primary border border-primary/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-sm">
                      <LucideIcon
                        name={stepItem.icon}
                        size={28}
                        className="stroke-[2] sm:size-[36px]"
                      />
                    </div>

                    <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest">
                      PHASE : 0{stepItem.step}
                    </span>

                    <h3 className="mt-1 text-xl sm:text-2xl md:text-3xl font-display font-bold sm:font-extrabold text-slate-900 tracking-tight leading-tight">
                      {stepItem.title}
                    </h3>
                  </div>

                  {/* Checklist Elements on Right */}
                  <div className="md:col-span-8">
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-medium mb-4 sm:mb-6">
                      {stepItem.description}
                    </p>

                    <h4 className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5 sm:mb-3.5 flex items-center gap-1.5">
                      <span>Key Operations Checklist</span>
                      <span className="w-6 h-px bg-slate-200 mr-2" />
                    </h4>

                    {/* Check items layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {stepItem.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 sm:p-3.5 bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl hover:border-slate-200 transition-colors"
                        >
                          <CheckCircle
                            size={13}
                            className="text-secondary shrink-0 mt-0.5 sm:size-[14px]"
                          />

                          <span className="text-[11px] sm:text-xs font-semibold text-slate-700 leading-snug">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Nav button */}
                    {activeStep < totalSteps && nextStep && (
                      <button
                        onClick={() => setActiveStep(prev => prev + 1)}
                        className="mt-6 sm:mt-8 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors cursor-pointer"
                      >
                        <span>
                          Proceed to Next Phase ({nextStep.title})
                        </span>
                        <ArrowRight size={13} className="sm:size-[14px]" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Process;