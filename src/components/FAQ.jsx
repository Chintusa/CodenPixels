import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { FAQS } from '../data';

export const FAQ = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [activeFaqId, setActiveFaqId] = useState(FAQS[0]?.id || null);

  const topics = ['All', 'Pricing', 'Development Process', 'Project Timeline', 'Support', 'Maintenance'];

  const filteredFaqs = FAQS.filter((faq) => {
    if (selectedTopic === 'All') return true;
    if (selectedTopic === 'Development Process' && faq.topic === 'Process') return true;
    if (selectedTopic === 'Project Timeline' && faq.topic === 'Timeline') return true;
    return faq.topic === selectedTopic;
  });

  const toggleFaq = (id) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <section className="py-12 sm:py-20 md:py-28 lg:py-32 bg-transparent relative overflow-hidden" id="faq">
      {/* Absolute decorative gradient highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Elegant Technical Compass/Gears behind Accordion */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.2] text-[#8B5CF6] hidden xl:block pointer-events-none select-none">
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <circle cx="55" cy="55" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="55" cy="55" r="15" stroke="currentColor" strokeWidth="1" />
          <line x1="55" y1="0" x2="55" y2="110" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="55" x2="110" y2="55" stroke="currentColor" strokeWidth="1" />
          <text x="65" y="45" fill="currentColor" className="text-[6px] font-mono">[QA_NODE_D_11]</text>
        </svg>
      </div>

      <div className="absolute right-12 bottom-[12%] text-primary/10 font-mono text-[7px] hidden lg:block pointer-events-none select-none">
        {/* <span>SECURITY_KEY: SHA256_RSA_ENC_VALIDATED // OK</span> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Got Questions? We Have Answers
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            Everything you need to know about our custom website design, development process, support schedules, and maintenance pricing.
          </p>
        </div>

        {/* Topics Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {topics.map((topic) => {
            const isSelected = 
              (topic === 'All' && selectedTopic === 'All') ||
              (topic === 'Development Process' && selectedTopic === 'Process') ||
              (topic === 'Project Timeline' && selectedTopic === 'Timeline') ||
              (topic === 'Pricing' && selectedTopic === 'Pricing') ||
              (topic === 'Support' && selectedTopic === 'Support') ||
              (topic === 'Maintenance' && selectedTopic === 'Maintenance');
            
            return (
              <button
                key={topic}
                onClick={() => {
                  if (topic === 'All') setSelectedTopic('All');
                  else if (topic === 'Development Process') setSelectedTopic('Process');
                  else if (topic === 'Project Timeline') setSelectedTopic('Timeline');
                  else setSelectedTopic(topic);
                  
                  // Auto open the first FAQ in the newly filtered list
                  const matches = FAQS.filter(f => {
                    if (topic === 'All') return true;
                    if (topic === 'Development Process' && f.topic === 'Process') return true;
                    if (topic === 'Project Timeline' && f.topic === 'Timeline') return true;
                    return f.topic === topic;
                  });
                  setActiveFaqId(matches[0]?.id || null);
                }}
                className={`px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/10'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:border-slate-350 hover:bg-slate-50'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion Layout - Inline expanding answers */}
        <div className="max-w-4xl mx-auto flex flex-col gap-3 sm:gap-4">
          {filteredFaqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? 'bg-white/60 border-primary/50 shadow-xl shadow-blue-500/[0.04] ring-2 ring-primary/5'
                    : 'bg-white/40 border-white/40 hover:bg-white/60 hover:border-white hover:shadow-sm'
                }`}
              >
                {/* Question Header Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none focus:outline-none"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`mt-0.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all ${
                      isOpen ? 'bg-primary/10 text-primary border-primary/20 animate-none' : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      <HelpCircle size={15} className="sm:size-[18px]" />
                    </div>
                    <div>
                      <span className="text-[8px] sm:text-[10px] font-mono font-bold tracking-wider text-slate-400 bg-slate-100/60 px-2 py-0.5 rounded-full inline-block">
                        {faq.topic.toUpperCase()}
                      </span>
                      <h3 className={`mt-1 text-sm sm:text-base md:text-lg font-display font-bold leading-snug transition-colors ${
                        isOpen ? 'text-primary' : 'text-slate-800'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-1 sm:p-1.5 rounded-full border transition-transform duration-300 shrink-0 ${
                    isOpen ? 'bg-primary text-white border-primary rotate-180' : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}>
                    {isOpen ? <Minus size={12} className="sm:size-[15px]" /> : <Plus size={12} className="sm:size-[15px]" />}
                  </div>
                </button>

                {/* Expanding Answer Section */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2 border-t border-slate-100/60">
                        <div className="pl-0 sm:pl-12">
                          <p className="text-slate-655 text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-3xl">
                            {faq.answer}
                          </p>
                          
                          <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-slate-100/50 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                            <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                              Verified Solution
                            </span>
                            
                            <a
                              href="#contact"
                              onClick={(e) => {
                                const contactElem = document.getElementById('contact');
                                if (contactElem) {
                                  e.preventDefault();
                                  contactElem.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className="text-[10px] sm:text-xs font-bold text-[#2563EB] hover:text-primary transition-colors flex items-center gap-1 group"
                            >
                              <span>Still have questions? Ask Us Directly</span>
                              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
