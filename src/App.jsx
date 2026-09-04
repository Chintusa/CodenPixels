import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechSlider from './components/TechSlider';
import Stats from './components/Stats';
import Services from './components/Services';
import ServiceDetail from './components/ServiceDetail';
import About from './components/About';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import WorkCarousel from './components/WorkCarousel';
import AdminDashboard from './components/AdminDashboard';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { ChevronRight, MessageSquare, Sparkles } from 'lucide-react';
import { SERVICES } from './data';
import { getStoredServices, getStoredProjects, STORAGE_UPDATE_EVENT } from './utils/storage';

// Helper to normalize path
function normalizePath(pathname) {
  if (!pathname || pathname === '') return '/';
  // Strip trailing slash except root
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default function App({ initialPath }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (initialPath) return normalizePath(initialPath);
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [projectsList, setProjectsList] = useState(() => getStoredProjects());
  const [servicesList, setServicesList] = useState(() => getStoredServices());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setProjectsList(getStoredProjects());
      setServicesList(getStoredServices());
    };
    window.addEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
  }, []);

  // Handle browser back and forward navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Universal navigation handler for SPA link clicks
  const navigateTo = (path) => {
    const targetPath = normalizePath(path);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(targetPath);
  };

  // Animation variants mapping for page layouts
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: 'easeIn' } }
  };

  // Determine current view component
  const renderCurrentView = () => {
    // 1. Root Homepage
    if (currentPath === '/') {
      return (
        <motion.div
          key="home-view"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col"
        >
          <Hero onNavigate={navigateTo} />
          
          <TechSlider />
          
          <Stats />

          {/* Home Services teaser card block */}
          <section className="py-20 sm:py-28 backdrop-blur-md bg-white/30 border-t border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                <div>
                  <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                    Engineered Capabilities
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
                    What We Engineer Best
                  </h2>
                </div>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/services');
                  }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-secondary group transition-all"
                >
                  <span>Explore All Services</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <Services onNavigate={navigateTo} />
            </div>
          </section>

          {/* Interactive Recent Works Showcase Carousel */}
          <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900/5 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WorkCarousel projects={projectsList} onNavigate={navigateTo} />
            </div>
          </section>

          {/* Home Projects filter grid wrapper */}
          <section className="py-20 sm:py-28 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                <div>
                  <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-full">
                    Curated Deliverables
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
                    Full Project Catalogue
                  </h2>
                </div>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/projects');
                  }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-secondary hover:text-primary group transition-all"
                >
                  <span>View All Projects</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <Projects onNavigate={navigateTo} />
            </div>
          </section>

          <Process onNavigate={navigateTo} />

          {/* Customer Reviews with Photos & Live CRUD */}
          <Testimonials />

          <FAQ onNavigate={navigateTo} />

          <Contact onNavigate={navigateTo} />
        </motion.div>
      );
    }

    // 2. Services Overview Page
    if (currentPath === '/services') {
      return (
        <motion.div
          key="services-overview-view"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-24"
        >
          <Services onNavigate={navigateTo} isStandalone={true} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-primary/15">
              <div className="max-w-2xl relative z-10">
                <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase bg-white/20 px-3 py-1 rounded-full inline-block font-bold">
                  Let's Build It
                </span>
                <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight mt-4">
                  Need Custom System Parameters?
                </h2>
                <p className="mt-4 text-white/90 text-sm md:text-base leading-relaxed">
                  If you have specific cloud architectures, existing database engines, or legacy code layers to refactor, let our engineering team build your technical roadmap.
                </p>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/contact');
                  }}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-900 hover:text-white text-slate-900 transition-colors text-xs sm:text-sm font-bold font-sans rounded-xl shadow-md cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <span>Arrange Technical Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // 3. Individual Service Detail Pages: /services/:slug
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const matchedService = servicesList.find(
        (s) => s.slug === slug || s.id === slug
      ) || SERVICES.find((s) => s.slug === slug || s.id === slug);

      return (
        <motion.div
          key={`service-${slug}`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ServiceDetail service={matchedService} onNavigate={navigateTo} />
        </motion.div>
      );
    }

    // 4. About Page
    if (currentPath === '/about') {
      return (
        <motion.div
          key="about-view"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-24"
        >
          <About onNavigate={navigateTo} isStandalone={true} />
        </motion.div>
      );
    }

    // 5. Projects Showcase Page
    if (currentPath === '/projects') {
      return (
        <motion.div
          key="projects-view"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <WorkCarousel projects={projectsList} onNavigate={navigateTo} />
          </div>
          <Projects onNavigate={navigateTo} isStandalone={true} />
        </motion.div>
      );
    }

    // 6. Process Page
    if (currentPath === '/process') {
      return (
        <motion.div
          key="process-view"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-24"
        >
          <Process onNavigate={navigateTo} isStandalone={true} />
        </motion.div>
      );
    }

    // 7. Contact Form & Estimator Page
    if (currentPath === '/contact') {
      return (
        <motion.div
          key="contact-view"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-24"
        >
          <Contact onNavigate={navigateTo} isStandalone={true} />
        </motion.div>
      );
    }

    // 8. Admin Showcase & Content Dashboard: /admin
    if (currentPath === '/admin') {
      return (
        <motion.div
          key="admin-view"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pt-24"
        >
          <AdminDashboard onNavigate={navigateTo} />
        </motion.div>
      );
    }

    // 9. 404 Not Found Page
    return (
      <motion.div
        key="404-view"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <NotFound onNavigate={navigateTo} />
      </motion.div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      
      {/* Decorative Interactive Background System */}
      <BackgroundDecoration />

      {/* Sticky Header Navigation bar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Core View Area */}
      <main id="main-content" className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          {renderCurrentView()}
        </AnimatePresence>
      </main>

      {/* Corporate footer details pane */}
      <Footer onNavigate={navigateTo} />
      
    </div>
  );
}

