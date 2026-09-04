import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ currentPath = '/', onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/process', label: 'Process' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
    setIsOpen(false);
  };

  const isItemActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        id="main-nav"
        aria-label="Main Navigation"
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/50'
            : 'bg-white/10 backdrop-blur-sm py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo + Brand */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-3 select-none cursor-pointer group"
            aria-label="CodeNPixels Home"
          >
            <img
              src="/logo.png"
              alt="CodeNPixels Logo"
              width="48"
              height="48"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <div className="flex flex-col items-start leading-none">
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight font-display">
                <span className="text-slate-900">Code</span>
                <span className="text-slate-900">N</span>
                <span className="text-[#2563EB]">Pixels</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const active = isItemActive(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-[#2563EB] font-bold'
                      : 'text-slate-600 hover:text-[#2563EB]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {active && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-blue-50 rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 group cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="p-2.5 bg-white/70 hover:bg-white border border-white/40 text-slate-800 rounded-xl backdrop-blur-md shadow-sm transition-colors cursor-pointer"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isItemActive(item.path);

                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      aria-current={active ? 'page' : undefined}
                      className={`px-4 py-3 rounded-xl text-left font-semibold transition-all ${
                        active
                          ? 'bg-blue-50 text-[#2563EB] border-l-4 border-[#2563EB]'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}

                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;