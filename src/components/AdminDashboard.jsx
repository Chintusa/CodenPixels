import React, { useState, useEffect } from 'react';
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Upload,
  Download,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Layers,
  MessageSquare,
  Briefcase,
  DollarSign,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import {
  getStoredServices,
  saveStoredServices,
  addStoredService,
  updateStoredService,
  deleteStoredService,
  getStoredProjects,
  saveStoredProjects,
  addStoredProject,
  updateStoredProject,
  deleteStoredProject,
  getStoredTestimonials,
  saveStoredTestimonials,
  addStoredTestimonial,
  updateStoredTestimonial,
  deleteStoredTestimonial,
  exportDatabaseJson,
  importDatabaseJson,
  resetAllDataToDefaults,
  STORAGE_UPDATE_EVENT
} from '../utils/storage.js';

export const AdminDashboard = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('testimonials');
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });

  // Modals & Form states
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: '',
    company: '',
    productBuilt: '',
    content: '',
    rating: 5,
    avatar: ''
  });

  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    category: 'Frontend',
    type: '',
    client: '',
    description: '',
    technologies: '',
    image: '',
    liveUrl: ''
  });

  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    h1Title: '',
    startingPriceInr: '₹14,999',
    startingPriceUsd: '$249',
    description: '',
    longDescription: '',
    businessProblem: '',
    solution: '',
    technologies: '',
    features: ''
  });

  const [isAddingNew, setIsAddingNew] = useState(false);

  // Sync state from storage
  const refreshAllData = () => {
    setServices(getStoredServices());
    setProjects(getStoredProjects());
    setTestimonials(getStoredTestimonials());
  };

  useEffect(() => {
    refreshAllData();
    window.addEventListener(STORAGE_UPDATE_EVENT, refreshAllData);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, refreshAllData);
  }, []);

  const showNotification = (text, type = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg({ text: '', type: '' }), 4000);
  };

  // Helper for image upload to base64
  const handleImageFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // Testimonial / Review Handlers
  // ==========================================
  const handleOpenReviewModal = (item = null) => {
    if (item) {
      setEditingReview(item);
      setReviewForm({
        name: item.name || '',
        role: item.role || '',
        company: item.company || '',
        productBuilt: item.productBuilt || '',
        content: item.content || '',
        rating: item.rating || 5,
        avatar: item.avatar || ''
      });
    } else {
      setEditingReview(null);
      setReviewForm({
        name: '',
        role: 'Founder & CEO',
        company: '',
        productBuilt: 'Custom Web Application',
        content: '',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=140&h=140&q=80'
      });
    }
    setIsAddingNew(true);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.content) {
      showNotification('Customer Name and Review Content are required.', 'error');
      return;
    }

    if (editingReview) {
      updateStoredTestimonial(editingReview.id, reviewForm);
      showNotification('Customer review updated successfully!');
    } else {
      addStoredTestimonial(reviewForm);
      showNotification('New customer review added successfully!');
    }

    setIsAddingNew(false);
    setEditingReview(null);
  };

  const handleDeleteReview = (id) => {
    if (confirm('Are you sure you want to delete this customer review?')) {
      deleteStoredTestimonial(id);
      showNotification('Customer review deleted.');
    }
  };

  // ==========================================
  // Project / Work Handlers
  // ==========================================
  const handleOpenProjectModal = (item = null) => {
    if (item) {
      setEditingProject(item);
      setProjectForm({
        name: item.name || '',
        category: item.category || 'Frontend',
        type: item.type || '',
        client: item.client || '',
        description: item.description || '',
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || '',
        image: item.image || '',
        liveUrl: item.liveUrl || ''
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        name: '',
        category: 'Full Stack',
        type: 'Web Application',
        client: 'Client Project',
        description: '',
        technologies: 'React, Tailwind CSS, Node.js',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        liveUrl: 'https://codenpixels.in'
      });
    }
    setIsAddingNew(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.description) {
      showNotification('Project Name and Description are required.', 'error');
      return;
    }

    const payload = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingProject) {
      updateStoredProject(editingProject.id, payload);
      showNotification('Project updated successfully!');
    } else {
      addStoredProject(payload);
      showNotification('New project created and added to showcase!');
    }

    setIsAddingNew(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteStoredProject(id);
      showNotification('Project removed from portfolio.');
    }
  };

  // ==========================================
  // Services & Pricing Handlers
  // ==========================================
  const handleOpenServiceModal = (item = null) => {
    if (item) {
      setEditingService(item);
      setServiceForm({
        title: item.title || '',
        h1Title: item.h1Title || '',
        startingPriceInr: item.startingPriceInr || '₹14,999',
        startingPriceUsd: item.startingPriceUsd || '$249',
        description: item.description || '',
        longDescription: item.longDescription || '',
        businessProblem: item.businessProblem || '',
        solution: item.solution || '',
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || '',
        features: Array.isArray(item.features) ? item.features.join('\n') : item.features || ''
      });
    } else {
      setEditingService(null);
      setServiceForm({
        title: '',
        h1Title: '',
        startingPriceInr: '₹14,999',
        startingPriceUsd: '$249',
        description: '',
        longDescription: '',
        businessProblem: '',
        solution: '',
        technologies: 'React, Node.js, Tailwind CSS',
        features: 'Responsive UI Design\nSEO & Speed Optimization\nCustom Cloud Deployment'
      });
    }
    setIsAddingNew(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.description) {
      showNotification('Service Title and Description are required.', 'error');
      return;
    }

    const payload = {
      ...serviceForm,
      features: serviceForm.features.split('\n').map(s => s.trim()).filter(Boolean),
      technologies: serviceForm.technologies.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingService) {
      updateStoredService(editingService.id, payload);
      showNotification('Service offering & pricing updated!');
    } else {
      addStoredService(payload);
      showNotification('New service added to catalogue!');
    }

    setIsAddingNew(false);
    setEditingService(null);
  };

  const handleDeleteService = (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteStoredService(id);
      showNotification('Service removed from catalogue.');
    }
  };

  // ==========================================
  // Backup & Restore Handlers
  // ==========================================
  const handleExportJson = () => {
    const jsonStr = exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codenpixels_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotification('Backup JSON exported successfully!');
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importDatabaseJson(event.target.result);
      if (res.success) {
        showNotification('Database imported & restored successfully!');
      } else {
        showNotification(`Import failed: ${res.error}`, 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all reviews, services, and projects back to original defaults? Any custom additions will be cleared.')) {
      resetAllDataToDefaults();
      showNotification('All data reset to factory defaults.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                title="Return to Website"
              >
                <ArrowLeft size={18} />
              </a>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                CodeNPixels Management Console
              </h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Manage client reviews, customer photos, recent work showcase, services & dual currency pricing without a backend server.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Export JSON</span>
            </button>

            <label className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer">
              <Upload size={14} />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            <button
              onClick={handleResetDefaults}
              className="px-3.5 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold rounded-xl border border-red-800/50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg.text && (
          <div
            className={`mt-4 p-4 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
              feedbackMsg.type === 'error'
                ? 'bg-red-900/40 border border-red-700 text-red-200'
                : 'bg-emerald-900/40 border border-emerald-700 text-emerald-200'
            }`}
          >
            {feedbackMsg.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 my-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => {
              setActiveTab('testimonials');
              setIsAddingNew(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare size={16} />
            <span>Customer Reviews ({testimonials.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('projects');
              setIsAddingNew(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase size={16} />
            <span>Recent Works & Portfolio ({projects.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('services');
              setIsAddingNew(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <DollarSign size={16} />
            <span>Services & Pricing ({services.length})</span>
          </button>
        </div>

        {/* ==========================================
            TAB 1: TESTIMONIALS & REVIEWS CRUD
        =========================================== */}
        {activeTab === 'testimonials' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Client Reviews & Testimonials</h2>
                <p className="text-xs text-slate-400">Add reviews with client photos and product details.</p>
              </div>

              <button
                onClick={() => handleOpenReviewModal()}
                className="px-4 py-2.5 bg-primary hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Review</span>
              </button>
            </div>

            {/* Testimonials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-slate-800/50 border border-slate-700/80 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-600"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-white">{item.name}</h3>
                          <p className="text-xs text-slate-400">{item.role}</p>
                          <p className="text-[11px] text-cyan-400">{item.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenReviewModal(item)}
                          className="p-2 text-slate-400 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="Edit Review"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(item.id)}
                          className="p-2 text-red-400 hover:text-red-200 bg-red-950/40 hover:bg-red-900/60 rounded-lg transition-colors cursor-pointer"
                          title="Delete Review"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {item.productBuilt && (
                      <span className="text-[10px] font-mono font-semibold bg-primary/20 text-cyan-300 px-2.5 py-1 rounded-md mb-3 inline-block">
                        Product: {item.productBuilt}
                      </span>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                      "{item.content}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700/60">
                    <div className="flex text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <span>{item.date || 'Verified Review'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: RECENT WORKS & PORTFOLIO CRUD
        =========================================== */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Portfolio Works & Case Studies</h2>
                <p className="text-xs text-slate-400">Showcase products, apps, smart menus, and websites.</p>
              </div>

              <button
                onClick={() => handleOpenProjectModal()}
                className="px-4 py-2.5 bg-primary hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 bg-slate-800/50 border border-slate-700/80 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-700 relative">
                      <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white">{proj.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.technologies?.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono bg-slate-700/80 text-slate-300 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                    {proj.liveUrl ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Preview</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : <span />}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenProjectModal(proj)}
                        className="p-2 text-slate-400 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 text-red-400 hover:text-red-200 bg-red-950/40 hover:bg-red-900/60 rounded-lg transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: SERVICES & PRICING CRUD
        =========================================== */}
        {activeTab === 'services' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Services & Pricing Matrix</h2>
                <p className="text-xs text-slate-400">Configure starter pricing (INR ₹ and USD $) and offerings.</p>
              </div>

              <button
                onClick={() => handleOpenServiceModal()}
                className="px-4 py-2.5 bg-primary hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus size={16} />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id || srv.slug}
                  className="p-6 bg-slate-800/50 border border-slate-700/80 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-white">{srv.title}</h3>
                        <span className="text-[11px] font-mono text-cyan-400">/services/{srv.slug}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenServiceModal(srv)}
                          className="p-2 text-slate-400 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-2 text-red-400 hover:text-red-200 bg-red-950/40 hover:bg-red-900/60 rounded-lg transition-colors cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{srv.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-mono">India Starting:</span>
                        <span className="font-bold text-emerald-400">{srv.startingPriceInr || '₹14,999'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-mono">Global Starting:</span>
                        <span className="font-bold text-cyan-400">{srv.startingPriceUsd || '$249'}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-400">
                      {srv.features?.slice(0, 3).map((f, i) => (
                        <div key={i} className="truncate">• {f}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            ADD / EDIT MODALS
        =========================================== */}
        {isAddingNew && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                  {activeTab === 'testimonials' && (editingReview ? 'Edit Customer Review' : 'Add New Customer Review')}
                  {activeTab === 'projects' && (editingProject ? 'Edit Project' : 'Add New Project')}
                  {activeTab === 'services' && (editingService ? 'Edit Service & Pricing' : 'Add New Service')}
                </h3>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form 1: Review */}
              {activeTab === 'testimonials' && (
                <form onSubmit={handleSaveReview} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Customer Full Name *</label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Role / Designation</label>
                      <input
                        type="text"
                        value={reviewForm.role}
                        onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                        placeholder="e.g. Founder & CEO"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Company / Country</label>
                      <input
                        type="text"
                        value={reviewForm.company}
                        onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                        placeholder="e.g. Apex Global (USA)"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Product We Built</label>
                      <input
                        type="text"
                        value={reviewForm.productBuilt}
                        onChange={(e) => setReviewForm({ ...reviewForm, productBuilt: e.target.value })}
                        placeholder="e.g. Smart QR Menu & POS System"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Customer Photo (Image URL or Upload)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={reviewForm.avatar}
                        onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                        placeholder="https://... photo URL"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                      <label className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold shrink-0 cursor-pointer">
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, (base64) => setReviewForm({ ...reviewForm, avatar: base64 }))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Rating (1 to 5 Stars)</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                      <option value="3">⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Review Content *</label>
                    <textarea
                      rows={4}
                      value={reviewForm.content}
                      onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                      placeholder="Write customer feedback, results, and quote..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white resize-none"
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-primary hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Save size={14} />
                      <span>Save Review</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Form 2: Project */}
              {activeTab === 'projects' && (
                <form onSubmit={handleSaveProject} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Project Name *</label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        placeholder="e.g. Bistro Cloud POS & QR Menu"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="AI / Automation">AI / Automation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Client / Project Type</label>
                      <input
                        type="text"
                        value={projectForm.client}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        placeholder="e.g. Urban Cafe Chain"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Live URL Preview</label>
                      <input
                        type="url"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Cover Image (URL or Upload)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        placeholder="https://... cover image"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                      <label className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold shrink-0 cursor-pointer">
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, (base64) => setProjectForm({ ...projectForm, image: base64 }))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Technologies Used (comma-separated)</label>
                    <input
                      type="text"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      placeholder="React, TypeScript, Tailwind CSS, PostgreSQL"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                    <textarea
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Brief overview of the work delivered..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white resize-none"
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-primary hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Save size={14} />
                      <span>Save Project</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Form 3: Service */}
              {activeTab === 'services' && (
                <form onSubmit={handleSaveService} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Service Title *</label>
                      <input
                        type="text"
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        placeholder="e.g. Smart Menu System"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">H1 Heading</label>
                      <input
                        type="text"
                        value={serviceForm.h1Title}
                        onChange={(e) => setServiceForm({ ...serviceForm, h1Title: e.target.value })}
                        placeholder="e.g. Contactless Smart QR Restaurant Menu System"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">India Starting Price (INR)</label>
                      <input
                        type="text"
                        value={serviceForm.startingPriceInr}
                        onChange={(e) => setServiceForm({ ...serviceForm, startingPriceInr: e.target.value })}
                        placeholder="₹12,999"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Global Starting Price (USD)</label>
                      <input
                        type="text"
                        value={serviceForm.startingPriceUsd}
                        onChange={(e) => setServiceForm({ ...serviceForm, startingPriceUsd: e.target.value })}
                        placeholder="$199"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Short Description *</label>
                    <textarea
                      rows={2}
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Short summary for service card..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Key Features (One per line)</label>
                    <textarea
                      rows={4}
                      value={serviceForm.features}
                      onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-primary hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Save size={14} />
                      <span>Save Service</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
