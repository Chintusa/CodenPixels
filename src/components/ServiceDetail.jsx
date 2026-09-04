import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  Layers,
  CodeXml,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import LucideIcon from './LucideIcon';
import Breadcrumbs from './Breadcrumbs';
import { PROCESS_STEPS } from '../data';

export const ServiceDetail = ({ service, onNavigate }) => {
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-display font-bold text-slate-900">Service Not Found</h1>
        <p className="mt-4 text-slate-600">The requested service page does not exist.</p>
        <a
          href="/services"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/services');
          }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold"
        >
          <ArrowLeft size={16} />
          <span>Back to All Services</span>
        </a>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Services', path: '/services' },
    { label: service.title, path: `/services/${service.slug}` }
  ];

  return (
    <article className="pt-24 pb-16 sm:pt-28 sm:pb-24 bg-transparent relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        {/* Hero Section of Service */}
        <header className="mb-14 sm:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 bg-primary/10 text-primary rounded-xl inline-flex items-center justify-center">
              <LucideIcon name={service.icon} size={22} className="stroke-[2.2]" />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
              Specialized Service Offering
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {service.h1Title || service.title}
          </h1>

          <p className="mt-6 text-slate-600 font-sans text-base sm:text-lg lg:text-xl leading-relaxed">
            {service.longDescription}
          </p>

          {(service.startingPriceInr || service.startingPriceUsd) && (
            <div className="mt-6 inline-flex flex-wrap items-center gap-3 p-3 bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase px-2">
                Transparent Starter Rate:
              </span>
              {service.startingPriceInr && (
                <span className="text-xs font-mono font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-xl">
                  ₹{service.startingPriceInr.toLocaleString('en-IN')} (India)
                </span>
              )}
              {service.startingPriceUsd && (
                <span className="text-xs font-mono font-extrabold text-green-700 bg-green-50 border border-green-200/60 px-3 py-1 rounded-xl">
                  ${service.startingPriceUsd.toLocaleString('en-US')} (USA / Global)
                </span>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary hover:bg-[#1D4ED8] text-white font-sans text-xs sm:text-sm font-semibold rounded-2xl shadow-lg hover:shadow-primary/25 transition-all cursor-pointer group"
            >
              <span>Get a Project Proposal</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/projects');
              }}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans text-xs sm:text-sm font-semibold rounded-2xl border border-slate-200/80 transition-all cursor-pointer"
            >
              <span>View Case Studies</span>
            </a>
          </div>
        </header>

        {/* Problem vs Solution Comparison */}
        <section className="mb-16 sm:mb-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 bg-red-50/60 border border-red-100 rounded-3xl backdrop-blur-sm">
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider bg-red-100/80 px-2.5 py-1 rounded-md inline-block mb-3">
              The Challenge
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-3">
              Common Industry Obstacles
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {service.businessProblem}
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-blue-50/60 border border-blue-100 rounded-3xl backdrop-blur-sm">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-md inline-block mb-3">
              The CodeNPixels Advantage
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-3">
              Our Engineered Solution
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {service.solution}
            </p>
          </div>
        </section>

        {/* Features & Capabilities */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
              Key Features & Deliverables
            </h2>
            <p className="mt-3 text-slate-500 text-sm sm:text-base">
              Everything we engineer is built for long-term scalability, clean maintenance, and optimal speed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex items-start gap-3.5"
              >
                <div className="p-1.5 bg-primary/10 text-primary rounded-lg shrink-0 mt-0.5">
                  <Check size={16} className="stroke-[3]" />
                </div>
                <span className="text-sm font-semibold text-slate-800 leading-snug">{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Used */}
        <section className="mb-16 sm:mb-24 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary bg-white/10 px-3 py-1 rounded-full inline-block mb-3">
              Modern Technology Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Technologies & Frameworks We Employ
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              We choose battle-tested, high-performance tools that guarantee security, longevity, and peak developer ergonomics.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-cyan-300 font-semibold shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 7-Step Delivery Process */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
              How We Deliver
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
              Our 7-Step Delivery Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.slice(0, 4).map((stp) => (
              <div
                key={stp.step}
                className="p-6 bg-white/50 backdrop-blur-md border border-slate-200/70 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      Step {stp.step}
                    </span>
                    <LucideIcon name={stp.icon} size={20} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 mb-2">{stp.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{stp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono tracking-widest text-secondary uppercase bg-cyan-500/10 px-3 py-1 rounded-full inline-block mb-3">
                Value Proposition
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
                Tangible Business Outcomes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-2xl flex items-start gap-4"
                >
                  <div className="p-2 bg-gradient-to-tr from-primary to-secondary text-white rounded-xl shrink-0 mt-1 shadow-sm">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {benefit.split(' for ')[0]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="mb-16 sm:mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900">
                Common Questions About {service.title}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className="border border-slate-200/80 rounded-2xl bg-white/60 backdrop-blur-md overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-slate-900 hover:text-primary transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full inline-block font-bold">
              Ready to Build?
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight mt-4">
              Start Your {service.title} Project Today
            </h2>
            <p className="mt-3 text-white/90 text-sm sm:text-base leading-relaxed">
              Use our cost estimator to plan your budget or contact our engineering team directly for a tailored strategy consultation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="px-6 py-3.5 bg-white hover:bg-slate-900 hover:text-white text-slate-900 transition-colors text-xs sm:text-sm font-bold rounded-xl shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>Contact Engineering Team</span>
              </a>
              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/services');
                }}
                className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white transition-colors text-xs sm:text-sm font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Browse All Services</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
};

export default ServiceDetail;
