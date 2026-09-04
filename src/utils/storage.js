import { SERVICES as defaultServices, PROJECTS as defaultProjects, TESTIMONIALS as defaultTestimonials } from '../data.js';

const STORAGE_KEYS = {
  SERVICES: 'codenpixels_services_v1',
  PROJECTS: 'codenpixels_projects_v1',
  TESTIMONIALS: 'codenpixels_testimonials_v1',
  CURRENCY: 'codenpixels_currency_pref'
};

// Event name dispatched whenever storage is updated from dashboard
export const STORAGE_UPDATE_EVENT = 'codenpixels_data_updated';

function safeGet(key, defaultVal) {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultVal;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return defaultVal;
  }
}

function safeSet(key, val) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Services CRUD
export function getStoredServices() {
  return safeGet(STORAGE_KEYS.SERVICES, defaultServices);
}

export function saveStoredServices(services) {
  safeSet(STORAGE_KEYS.SERVICES, services);
}

export function addStoredService(newService) {
  const current = getStoredServices();
  const slug = newService.slug || newService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const item = {
    ...newService,
    id: slug,
    slug: slug,
    features: Array.isArray(newService.features) ? newService.features : (newService.features || '').split('\n').filter(Boolean),
    technologies: Array.isArray(newService.technologies) ? newService.technologies : (newService.technologies || '').split(',').map(s => s.trim()).filter(Boolean),
    benefits: Array.isArray(newService.benefits) ? newService.benefits : (newService.benefits || '').split('\n').filter(Boolean),
    faqs: newService.faqs || []
  };
  const updated = [item, ...current];
  saveStoredServices(updated);
  return item;
}

export function updateStoredService(id, updatedService) {
  const current = getStoredServices();
  const index = current.findIndex(s => s.id === id || s.slug === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedService };
    saveStoredServices([...current]);
  }
}

export function deleteStoredService(id) {
  const current = getStoredServices();
  const updated = current.filter(s => s.id !== id && s.slug !== id);
  saveStoredServices(updated);
}

// Projects CRUD
export function getStoredProjects() {
  return safeGet(STORAGE_KEYS.PROJECTS, defaultProjects);
}

export function saveStoredProjects(projects) {
  safeSet(STORAGE_KEYS.PROJECTS, projects);
}

export function addStoredProject(newProject) {
  const current = getStoredProjects();
  const id = newProject.id || `proj-${Date.now()}`;
  const slug = newProject.slug || newProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const item = {
    ...newProject,
    id,
    slug,
    technologies: Array.isArray(newProject.technologies) ? newProject.technologies : (newProject.technologies || '').split(',').map(s => s.trim()).filter(Boolean)
  };
  const updated = [item, ...current];
  saveStoredProjects(updated);
  return item;
}

export function updateStoredProject(id, updatedProject) {
  const current = getStoredProjects();
  const index = current.findIndex(p => p.id === id || p.slug === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedProject };
    saveStoredProjects([...current]);
  }
}

export function deleteStoredProject(id) {
  const current = getStoredProjects();
  const updated = current.filter(p => p.id !== id && p.slug !== id);
  saveStoredProjects(updated);
}

// Testimonials / Client Reviews CRUD
export function getStoredTestimonials() {
  return safeGet(STORAGE_KEYS.TESTIMONIALS, defaultTestimonials);
}

export function saveStoredTestimonials(testimonials) {
  safeSet(STORAGE_KEYS.TESTIMONIALS, testimonials);
}

export function addStoredTestimonial(newTestimonial) {
  const current = getStoredTestimonials();
  const id = newTestimonial.id || `test-${Date.now()}`;
  const item = {
    ...newTestimonial,
    id,
    rating: Number(newTestimonial.rating) || 5,
    verified: true,
    date: newTestimonial.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };
  const updated = [item, ...current];
  saveStoredTestimonials(updated);
  return item;
}

export function updateStoredTestimonial(id, updatedTestimonial) {
  const current = getStoredTestimonials();
  const index = current.findIndex(t => t.id === id);
  if (index !== -1) {
    current[index] = { ...current[index], ...updatedTestimonial };
    saveStoredTestimonials([...current]);
  }
}

export function deleteStoredTestimonial(id) {
  const current = getStoredTestimonials();
  const updated = current.filter(t => t.id !== id);
  saveStoredTestimonials(updated);
}

// Currency Preference
export function getCurrencyPreference() {
  if (typeof window === 'undefined') return 'INR';
  return localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'INR';
}

export function setCurrencyPreference(curr) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
  window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { key: STORAGE_KEYS.CURRENCY } }));
}

export const getStoredCurrency = getCurrencyPreference;
export const setStoredCurrency = setCurrencyPreference;

// Export & Import & Reset
export function exportDatabaseJson() {
  const data = {
    services: getStoredServices(),
    projects: getStoredProjects(),
    testimonials: getStoredTestimonials(),
    exportedAt: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
}

export function importDatabaseJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.services && Array.isArray(parsed.services)) {
      saveStoredServices(parsed.services);
    }
    if (parsed.projects && Array.isArray(parsed.projects)) {
      saveStoredProjects(parsed.projects);
    }
    if (parsed.testimonials && Array.isArray(parsed.testimonials)) {
      saveStoredTestimonials(parsed.testimonials);
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export function resetAllDataToDefaults() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.SERVICES);
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
  window.dispatchEvent(new CustomEvent(STORAGE_UPDATE_EVENT, { detail: { key: 'all' } }));
}
