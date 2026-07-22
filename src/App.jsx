import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechSlider from './components/TechSlider';
import Stats from './components/Stats';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { ArrowRight, ChevronRight, Terminal, Sparkles, CodeXml, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab ] = useState('home');

  // Animation variants mapping for page layouts
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      
      {/* Decorative Interactive Background System */}
      <BackgroundDecoration />

      {/* Sticky Header Navigation bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Core View Area with smooth page-switch transition */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          
          {/* VIEW CASE 1: HOME PAGE DASHBOARD */}
          {activeTab === 'home' && (
            <motion.div
              key="home-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col"
            >
              <Hero setActiveTab={setActiveTab} />
              
              <TechSlider />
              
              <Stats />

              {/* Home Services teaser card block with redirect */}
              <section className="py-24 sm:py-32 backdrop-blur-md bg-white/20 border-t border-b border-white/25">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
                    <div>
                      {/* <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">// BRIEF CATALOGUE</span> */}
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight mt-2">What We Engineer Best</h2>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-bold sm:font-extrabold text-primary hover:text-secondary group transition-all"
                    >
                      <span>Explore Our Complete Services</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  {/* Reuse services rendering */}
                  <Services setActiveTab={setActiveTab} />
                </div>
              </section>

              {/* Home Projects filter showcase wrapper */}
              <section className="py-24 sm:py-32 bg-transparent">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
                    <div>
                      {/* <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">// CURATED PREVIEW</span> */}
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight mt-2">Our Staged Deliverables</h2>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('projects');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-bold sm:font-extrabold text-[#06B6D4] hover:text-primary group transition-all"
                    >
                      <span>View Custom Showcase Portfolio</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <Projects />
                </div>
              </section>

              <Process />

              <Testimonials />

              <FAQ />

              <Contact />
            </motion.div>
          )}

          {/* VIEW CASE 2: DEDICATED SERVICES STANDALONE PAGE */}
          {activeTab === 'services' && (
            <motion.div
              key="services-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24"
            >
              <Services setActiveTab={setActiveTab} />
              
              <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* Visual Banner linking back to consultations */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-primary/15">
                  <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />
                  <div className="max-w-2xl relative z-10">
                    <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase bg-white/20 px-3 py-1 rounded-full inline-block font-bold">
                      Let's Build It
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display font-black tracking-tight mt-4">
                      Need custom system parameters?
                    </h3>
                    <p className="mt-4 text-white/90 text-sm md:text-base leading-relaxed">
                      If you have specific cloud architectures, existing database engines, or legacy code layers to refactor, let our developers map your roadmap.
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="mt-8 px-6 py-3 bg-white hover:bg-slate-900 hover:text-white text-slate-900 transition-colors text-xs font-bold font-sans rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageSquare size={13} />
                      Arrange Core Technology Strategy Session
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW CASE 3: DEDICATED ABOUT PAGE */}
          {activeTab === 'about' && (
            <motion.div
              key="about-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24"
            >
              <About setActiveTab={setActiveTab} />
            </motion.div>
          )}

          {/* VIEW CASE 4: DEDICATED PORTFOLIO PROJECTS SHOWCASE */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24"
            >
              <Projects />
            </motion.div>
          )}

          {/* VIEW CASE 5: DEDICATED PROCESS PAGE STEPS */}
          {activeTab === 'process' && (
            <motion.div
              key="process-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24"
            >
              <Process />
            </motion.div>
          )}

          {/* VIEW CASE 6: DEDICATED CONTACT FORM PAGE */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24"
            >
              <Contact />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Corporate footer details pane shared layout */}
      <Footer setActiveTab={setActiveTab} />
      
    </div>
  );
}
