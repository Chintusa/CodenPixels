import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, CheckCircle, Info, X } from 'lucide-react';
import { PROJECTS } from '../data';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Frontend', 'Full Stack'];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeCategory === 'All') return true;
    return proj.category === activeCategory;
  });

  const openLivePreview = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
   <section className="pt-0 pb-8 sm:pt-4 sm:pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-transparent relative overflow-hidden" id="projects">
      {/* Dynamic graphic background elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#06B6D4]/5 rounded-full blur-[120px] pointer-events-none select-none" />

      {/* Aesthetic matrix corner crosshairs */}
      <div className="absolute top-12 left-8 opacity-15 text-slate-400 hidden xl:block pointer-events-none select-none">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-10 opacity-20 text-slate-400 hidden xl:block pointer-events-none select-none">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Our Digital Innovations
          </span>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
            Engineered Masterpieces
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            Explore a curated selection of responsive websites, AI-powered apps,
            product showcases, and modern frontend builds crafted with clean UI
            and smooth user experience.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active Projects Grid Showcase */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group p-4 bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl hover:bg-white/65 hover:border-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-200 border border-slate-100 shadow-inner">
                    <img
                      src={project.image}
                      alt={project.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Floating pill tags in thumbnail */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-sm border border-slate-200/50 px-3 py-1 rounded-full">
                      <span className="text-[10px] font-mono font-extrabold text-slate-700 tracking-wider">
                        TAG : {project.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Text Meta */}
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {/* // TYPE : {project.type.toUpperCase()} */}
                  </span>

                  <h3 className="mt-1 text-lg font-display font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-2.5 text-xs md:text-sm text-slate-500 leading-relaxed font-sans min-h-[40px]">
                    {project.description}
                  </p>

                  {/* Technologies Checklist */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}

                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-400 font-medium bg-slate-50 border border-slate-200/40 px-1.5 py-0.5 rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-3 bg-white hover:bg-slate-900 hover:text-white border border-slate-200 text-slate-700 text-xs font-bold leading-none rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Info size={14} />
                    Details
                  </button>

                  <button
                    onClick={() => openLivePreview(project.liveUrl)}
                    className="w-full py-3 bg-primary hover:bg-[#1D4ED8] text-white border border-primary text-xs font-bold leading-none rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    Live Preview
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Project Details Overlay Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="bg-white/80 backdrop-blur-xl border border-white/30 w-full max-w-2xl rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl relative overflow-y-auto max-h-[92vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-500 rounded-full transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Modal Title Details */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono font-bold text-primary uppercase bg-primary/10 border border-primary/10 px-3 py-1 rounded-full">
                    {selectedProject.category} Project
                  </span>

                  <h3 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
                    {selectedProject.name}
                  </h3>

                  {/* <div className="mt-2 text-xs text-slate-400 font-mono">
                    Type:{' '}
                    <span className="text-slate-600 font-bold">
                      {selectedProject.type}
                    </span>
                  </div> */}
                </div>

                {/* Graphic Image Banner in Modal */}
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-200 border border-slate-200">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Long Description and tech details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">
                      PROJECT OVERVIEW
                    </h4>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-3">
                      PROJECT STACK
                    </h4>

                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono font-medium bg-slate-50 text-slate-600 border border-slate-200/60 px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">
                        STATUS
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-[#06B6D4] font-semibold">
                        <CheckCircle size={14} />
                        <span>Live & Deployed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Close Pane
                  </button>

                  <button
                    onClick={() => openLivePreview(selectedProject.liveUrl)}
                    className="px-5 py-2.5 bg-primary hover:bg-[#1D4ED8] text-white font-sans text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Live Preview
                    <ExternalLink size={12} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProject(null);

                      const contactElem = document.getElementById('contact');

                      if (contactElem) {
                        contactElem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-5 py-2.5 bg-[#0F172A] hover:bg-primary text-white font-sans text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Request Similar Build
                    <ExternalLink size={12} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;