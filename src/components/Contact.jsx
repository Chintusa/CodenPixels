import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Calculator,
  Hourglass,
  IndianRupee,
  DollarSign,
  Globe
} from 'lucide-react';
import { getStoredCurrency, setStoredCurrency, STORAGE_UPDATE_EVENT } from '../utils/storage';

export const Contact = ({ onNavigate, isStandalone = false }) => {
  const WEB3FORMS_ACCESS_KEY = 'bfbb1c5c-3295-4e29-81d4-cdd2ac5ebd3c';

  const HeadingTag = isStandalone ? 'h1' : 'h2';

  // Currency selection: 'INR' or 'USD'
  const [currency, setCurrencyState] = useState(() => getStoredCurrency());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setCurrencyState(getStoredCurrency());
    };
    window.addEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
    return () => window.removeEventListener(STORAGE_UPDATE_EVENT, handleStorageUpdate);
  }, []);

  const handleCurrencyChange = (curr) => {
    setCurrencyState(curr);
    setStoredCurrency(curr);
  };

  // Core Contact form states
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Portfolio & Personal Branding',
    budget: currency === 'INR' ? '₹7,999 - ₹15,000' : '$129 - $350',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Cost Estimator State parameters
  const [estPageCount, setEstPageCount] = useState(5);
  const [estComplexity, setEstComplexity] = useState('Standard');

  // Calculates project hours, price, and delivery weeks
  const calculateEstimate = () => {
    // Highly attractive and justifiable rates for winning early clients
    // India: ₹750/hr base rate | International: $15/hr base rate
    const baseRate = currency === 'INR' ? 750 : 15;
    const basePages = estPageCount * 4; // ~4 hours per screen/feature
    let complexityMultiplier = 1;

    if (estComplexity === 'Standard') complexityMultiplier = 1;
    else if (estComplexity === 'Premium Interactive') complexityMultiplier = 1.35;
    else if (estComplexity === 'Database & Business Logic') complexityMultiplier = 1.75;
    else if (estComplexity === 'Full Enterprise / Realtime Mesh') complexityMultiplier = 2.25;

    const totalHours = Math.max(8, Math.round(basePages * complexityMultiplier));
    const totalPrice = totalHours * baseRate;

    return {
      hours: totalHours,
      price: totalPrice,
      deliveryWeeks: Math.max(1, Math.ceil(totalHours / 25))
    };
  };

  const estimate = calculateEstimate();

  // Applies the calculated estimate to the contact form fields
  const handleApplyEstimateToForm = () => {
    let budgetBucket = '';
    if (currency === 'INR') {
      if (estimate.price > 80000) budgetBucket = '₹80,000+';
      else if (estimate.price > 50000) budgetBucket = '₹50,000 - ₹80,000';
      else if (estimate.price > 25000) budgetBucket = '₹25,000 - ₹50,000';
      else if (estimate.price > 12000) budgetBucket = '₹12,000 - ₹25,000';
      else budgetBucket = '₹7,999 - ₹12,000';
    } else {
      if (estimate.price > 1500) budgetBucket = '$1,500+';
      else if (estimate.price > 900) budgetBucket = '$900 - $1,500';
      else if (estimate.price > 500) budgetBucket = '$500 - $900';
      else if (estimate.price > 250) budgetBucket = '$250 - $500';
      else budgetBucket = '$129 - $250';
    }

    const formattedPrice = currency === 'INR'
      ? `₹${estimate.price.toLocaleString('en-IN')}`
      : `$${estimate.price.toLocaleString('en-US')}`;

    setForm(prev => ({
      ...prev,
      budget: budgetBucket,
      message: `Hi CodeNPixels team, I scoped my project using your estimator tool. My project involves approximately ${estPageCount} screens/modules with "${estComplexity}" complexity. Estimated scope is ~${estimate.hours} hours at around ${formattedPrice} (${currency}) with delivery in ~${estimate.deliveryWeeks} week(s). Let's schedule a call to discuss the requirements!`
    }));

    const formContainer = document.getElementById('actual-contact-form');
    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Please provide your full name.';
    if (!form.email.trim()) {
      tempErrors.email = 'Please fill in your email address.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) tempErrors.message = 'Please write a short project description.';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setSubmitError('');

    const formattedPrice = currency === 'INR'
      ? `₹${estimate.price.toLocaleString('en-IN')}`
      : `$${estimate.price.toLocaleString('en-US')}`;

    const payload = {
      name: form.name,
      email: form.email,
      company: form.company || 'Not provided',
      projectType: form.projectType,
      currency: currency,
      budget: form.budget,
      estimated_screens: estPageCount,
      estimated_complexity: estComplexity,
      estimated_hours: `${estimate.hours} hrs`,
      estimated_price: formattedPrice,
      estimated_delivery: `${estimate.deliveryWeeks} week(s)`,
      message: form.message
    };

    try {
      // Primary: Call Vercel Serverless SMTP Function (/api/send-mail)
      let isSuccess = false;
      let errorMsg = '';

      try {
        const vercelResponse = await fetch('/api/send-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (vercelResponse.ok) {
          const vercelResult = await vercelResponse.json();
          if (vercelResult.success) {
            isSuccess = true;
          } else {
            errorMsg = vercelResult.error || 'Serverless mail delivery failed.';
          }
        }
      } catch (fnErr) {
        console.warn('Vercel API endpoint not reached, trying Netlify / fallback gateway...', fnErr);
      }

      // Secondary: Try Netlify Serverless Function if on Netlify
      if (!isSuccess && !errorMsg) {
        try {
          const netlifyResponse = await fetch('/.netlify/functions/send-mail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (netlifyResponse.ok) {
            const netlifyResult = await netlifyResponse.json();
            if (netlifyResult.success) {
              isSuccess = true;
            } else {
              errorMsg = netlifyResult.error || 'Netlify mail delivery failed.';
            }
          }
        } catch (netErr) {
          console.warn('Netlify endpoint not reached, trying Web3Forms fallback...', netErr);
        }
      }

      // Tertiary / Fallback: Web3Forms Gateway
      if (!isSuccess) {
        const fallbackResponse = await fetch('https://api.web3Forms.com/submit'.toLowerCase(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `New Project Enquiry from ${form.name} (${currency})`,
            from_name: 'CodeNPixels Client Portal',
            ...payload
          })
        });

        const fallbackResult = await fallbackResponse.json();
        if (fallbackResult.success) {
          isSuccess = true;
        } else {
          errorMsg = fallbackResult.message || errorMsg || 'Submission failed. Please try again.';
        }
      }

      if (isSuccess) {
        setSuccess(true);
        setForm({
          name: '',
          email: '',
          company: '',
          projectType: 'Portfolio & Personal Branding',
          budget: currency === 'INR' ? '₹7,999 - ₹15,000' : '$129 - $350',
          message: ''
        });
        setErrors({});
      } else {
        setSubmitError(errorMsg || 'Something went wrong. Please try again or email us directly.');
      }
    } catch (error) {
      setSubmitError('Failed to submit the form. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-0 pb-8 sm:pt-4 sm:pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-transparent relative overflow-hidden" id="contact">
      {/* Visual glow elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-mono tracking-widest text-[#2563EB] uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Strategy Consultation & Pricing
          </span>

          <HeadingTag className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
            Let's Map Your Digital Strategy
          </HeadingTag>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            Estimate your project cost with our transparent calculator, tailored for both Indian & global businesses, or send your requirements directly for a free technical plan.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex items-center p-1 bg-slate-100/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl shadow-xs">
            <button
              type="button"
              onClick={() => handleCurrencyChange('INR')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${currency === 'INR'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <IndianRupee size={14} />
              <span>India (INR ₹)</span>
            </button>
            <button
              type="button"
              onClick={() => handleCurrencyChange('USD')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${currency === 'USD'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <DollarSign size={14} />
              <span>USA / Global (USD $)</span>
            </button>
          </div>
        </div>

        {/* Estimator and Contact layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Estimator Panel */}
          <div className="lg:col-span-5 bg-white/50 backdrop-blur-md border border-white/60 shadow-xl rounded-3xl p-5 sm:p-6 md:p-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-tr from-primary to-secondary text-white rounded-xl">
                  <Calculator size={16} className="sm:size-[18px]" />
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900">
                  Instant Project Estimator
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {currency === 'INR' ? '₹750/hr Base' : '$15/hr Base'}
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-sans mb-5 sm:mb-6">
              Adjust screens, modules, and complexity to see estimated hours, transparent starting price, and rapid turnaround time.
            </p>

            {/* Screen count slider */}
            <div className="mb-5 sm:mb-6">
              <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs font-bold text-slate-700 mb-2">
                <span>Total Screens / Modules</span>
                <span className="text-primary font-mono text-xs sm:text-sm bg-primary/10 px-2 py-0.5 rounded-full">
                  {estPageCount} modules
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="25"
                value={estPageCount}
                onChange={e => setEstPageCount(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />

              <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-slate-400 font-mono mt-1 select-none">
                <span>1 screen (Starter)</span>
                <span>25+ screens (Enterprise)</span>
              </div>
            </div>

            {/* Complexity dropdown */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-2">
                Project Complexity
              </label>

              <select
                value={estComplexity}
                onChange={e => setEstComplexity(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none"
              >
                <option value="Standard">
                  Standard - Fast static design, responsive, SEO-ready
                </option>
                <option value="Premium Interactive">
                  Premium Interactive - Custom motion, animations, QR/Forms
                </option>
                <option value="Database & Business Logic">
                  Database & Logic - Auth, Billing, POS, Live Orders
                </option>
                <option value="Full Enterprise / Realtime Mesh">
                  Enterprise Cloud Mesh - ERP, Multi-branch, Realtime Sync
                </option>
              </select>
            </div>

            {/* Calculated summary panel */}
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200/80 p-4 sm:p-6 rounded-2xl mb-5 sm:mb-6 shadow-sm">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex flex-col gap-0.5 sm:gap-1 items-start">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                    <Hourglass size={11} className="text-secondary sm:size-[12px]" />
                    <span>Scope Estimate</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-display font-extrabold text-slate-800 font-mono">
                    {estimate.hours} hrs
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 sm:gap-1 items-start">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                    {currency === 'INR' ? (
                      <IndianRupee size={12} className="text-green-600 sm:size-[13px]" />
                    ) : (
                      <DollarSign size={12} className="text-green-600 sm:size-[13px]" />
                    )}
                    <span>Starting Price</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-display font-extrabold text-slate-800 font-mono">
                    {currency === 'INR'
                      ? `₹${estimate.price.toLocaleString('en-IN')}`
                      : `$${estimate.price.toLocaleString('en-US')}`}
                  </span>
                </div>
              </div>

              <div className="text-[11px] sm:text-xs text-slate-500 border-t border-slate-100 pt-3.5 sm:pt-4 font-sans leading-relaxed">
                Suggested delivery timeline: approximately{' '}
                <span className="font-bold text-primary">
                  {estimate.deliveryWeeks} week(s)
                </span>
                . Includes post-launch warranty & revisions.
              </div>
            </div>

            {/* Auto Populate Button */}
            <button
              type="button"
              onClick={handleApplyEstimateToForm}
              className="w-full py-2.5 sm:py-3 bg-slate-900 hover:bg-primary text-white text-[11px] sm:text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-md shadow-slate-900/10"
            >
              <Sparkles size={12} className="sm:size-[13px]" />
              <span>Auto-Populate Scope to Enquiry Form</span>
            </button>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 h-full" id="actual-contact-form">
            <div className="bg-white/50 backdrop-blur-md border border-white/60 p-5 sm:p-8 md:p-10 shadow-xl rounded-3xl relative animate-fadeIn">
              <span className="text-slate-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest block mb-3 sm:mb-4">
                {/* // PROJECT INTAKE FORM */}
              </span>

              {success ? (
                <div className="p-5 sm:p-8 bg-green-50 border border-green-200/90 rounded-2xl text-center text-slate-700 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px]">
                  <div className="p-3.5 sm:p-4 bg-green-500 text-white rounded-full shadow-md mb-4 animate-bounce">
                    <CheckCircle size={28} className="sm:size-[32px]" />
                  </div>

                  <h3 className="font-display font-extrabold text-base sm:text-lg text-green-900">
                    Consultation Request Received!
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm mt-2.5 leading-relaxed">
                    Thank you! Your project requirements have been submitted. Our engineering lead will review your specifications and reply with a milestone plan within 12 hours.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {submitError && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-full-name" className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Full Name <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="contact-full-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-white border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none ${errors.name
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                            : 'border-slate-200'
                          }`}
                      />

                      {errors.name && (
                        <p className="text-red-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Email Address <span className="text-red-500">*</span>
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full bg-white border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none ${errors.email
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                            : 'border-slate-200'
                          }`}
                      />

                      {errors.email && (
                        <p className="text-red-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle size={10} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Company */}
                    <div>
                      <label htmlFor="contact-company" className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Company / Business Name
                      </label>

                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleInputChange}
                        placeholder="Apex Brands Ltd / Cafe Central"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                      />
                    </div>

                    {/* Project Category */}
                    <div>
                      <label htmlFor="contact-project-type" className="block text-[10px] sm:text-xs font-bold text-[#1E293B] mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Service Required
                      </label>

                      <select
                        id="contact-project-type"
                        name="projectType"
                        value={form.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                      >
                        <option>Portfolio & Personal Branding</option>
                        <option>Smart QR Menu System (Restaurants & Cafes)</option>
                        <option>POS (Point of Sale) System</option>
                        <option>Billing & Invoicing Software</option>
                        <option>Cloud ERP & Multi-Branch Software</option>
                        <option>Custom Web Application Development</option>
                        <option>AI-Powered Web Development</option>
                        <option>Frontend Engineering (React / Next.js)</option>
                        <option>Backend Architecture & Cloud APIs</option>
                        <option>UI/UX Design Systems</option>
                        <option>Website Optimization & Maintenance</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="contact-budget" className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                      Budget Range ({currency})
                    </label>

                    <select
                      id="contact-budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                    >
                      {currency === 'INR' ? (
                        <>
                          <option>₹7,999 - ₹15,000 (Starter / Portfolio)</option>
                          <option>₹15,000 - ₹30,000 (Smart Menu / Website)</option>
                          <option>₹30,000 - ₹60,000 (Billing / POS / Custom App)</option>
                          <option>₹60,000 - ₹1,20,000 (Cloud ERP / Full Stack)</option>
                          <option>₹1,20,000+ (Custom Enterprise Platform)</option>
                        </>
                      ) : (
                        <>
                          <option>$129 - $350 (Starter / Portfolio)</option>
                          <option>$350 - $750 (Smart Menu / Business Site)</option>
                          <option>$750 - $1,500 (Billing / POS / Web App)</option>
                          <option>$1,500 - $3,000 (Cloud ERP / Full Stack)</option>
                          <option>$3,000+ (Enterprise Multi-Tenant App)</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] sm:text-xs font-bold text-[#1E293B] mb-1.5 sm:mb-2 tracking-wide uppercase">
                      Project Description <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Describe your goals, desired features (e.g. POS printing, QR ordering, ERP inventory), brand preferences, and expected timeframe..."
                      className={`w-full bg-white border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none ${errors.message
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                          : 'border-slate-200'
                        }`}
                    />

                    {errors.message && (
                      <p className="text-red-500 text-[10px] font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle size={10} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 sm:py-4 bg-primary hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold font-sans rounded-2xl transition-all shadow-md hover:shadow-primary/20 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Submit Project Request ({currency})</span>
                          <Send size={12} className="sm:size-[14px]" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;