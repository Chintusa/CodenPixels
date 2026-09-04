import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { getStoredServices, STORAGE_UPDATE_EVENT } from '../utils/storage';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [services, setServices] = useState(() => getStoredServices());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setServices(getStoredServices());
    };
    window.addEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please fill in your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setSubscribed(true);
    setEmail('');
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { path: '/', label: 'Home Page' },
    { path: '/services', label: 'Services Catalogue' },
    { path: '/about', label: 'Company Story' },
    { path: '/projects', label: 'Work Portfolio' },
    { path: '/process', label: 'Work Methodology' },
    { path: '/contact', label: 'Contact & Quotes' },
    { path: '/admin', label: 'Admin Console' }
  ];

  return (
    <footer id="main-footer" className="bg-[#0F172A] text-slate-300 border-t border-slate-800 relative z-10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 mb-12 sm:mb-16">
          
          {/* Column 1: Company Meta (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
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
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <div className="flex flex-col items-start leading-none">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white">
                  <span>Code</span>
                  <span>N</span>
                  <span className="text-[#2563EB]">Pixels</span>
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed">
              We design and engineer secure, scalable, and beautifully crafted full-stack digital products, custom web applications, QR menus, cloud ERPs, and POS systems for ambitious businesses.
            </p>

            <div className="flex flex-col gap-2.5 mt-2">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-secondary shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-secondary shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-secondary shrink-0" />
                <span>{COMPANY_INFO.location.addressDisplay}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="hover:text-white transition-all text-slate-400 flex items-center gap-1.5 group"
                  >
                    <span className="text-slate-600 group-hover:text-secondary transition-colors">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase mb-5">
              Specialized Services
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {services.map((srv) => (
                <li key={srv.slug}>
                  <a
                    href={`/services/${srv.slug}`}
                    onClick={(e) => handleLinkClick(e, `/services/${srv.slug}`)}
                    className="hover:text-white transition-all text-slate-400 flex items-center gap-1.5 group"
                  >
                    <span className="text-primary text-xs opacity-70 group-hover:opacity-100">•</span>
                    <span className="truncate">{srv.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Search (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-display font-semibold text-sm tracking-wider uppercase mb-5">
              Stay Connected
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Subscribe for insights on modern web development, cloud ERP systems, and digital growth strategies.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1 text-white bg-primary hover:bg-[#1D4ED8] p-2.5 rounded-lg top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
            <div className="mt-2 min-h-[20px]">
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-secondary font-medium mt-1">
                  <CheckCircle2 size={12} />
                  <span>Subscribed successfully!</span>
                </div>
              )}
              {error && (
                <span className="text-xs text-red-400 font-medium">{error}</span>
              )}
            </div>
          </div> 
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>&copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline">{COMPANY_INFO.tagline}</span>
          </div>
          <div className="flex gap-6 font-medium text-slate-400">
            <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-white transition-colors">
              Request a Quote
            </a>
            <a href="/services" onClick={(e) => handleLinkClick(e, '/services')} className="hover:text-white transition-colors">
              All Services
            </a>
            <a href="/projects" onClick={(e) => handleLinkClick(e, '/projects')} className="hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="/admin" onClick={(e) => handleLinkClick(e, '/admin')} className="hover:text-white transition-colors flex items-center gap-1">
              <Shield size={11} className="text-cyan-400" />
              <span>Admin Console</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

