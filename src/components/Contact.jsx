import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Calculator,
  Hourglass,
  IndianRupee
} from 'lucide-react';

export const Contact = () => {
  const WEB3FORMS_ACCESS_KEY = 'bfbb1c5c-3295-4e29-81d4-cdd2ac5ebd3c';

  // Core Contact form states
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Frontend Development',
    budget: '₹15,000 - ₹30,000',
    message: ''
  });

const [loading, setLoading] = useState(false); // This state checks whether the form is being submitted.
  const [success, setSuccess] = useState(false); // This checks whether form submission was successful.
  const [errors, setErrors] = useState({}); // This stores form validation errors.
  const [submitError, setSubmitError] = useState('');

  // Cost Estimator State parameters
  const [estPageCount, setEstPageCount] = useState(5);// Initially project has 5 screens/pages.
  const [estComplexity, setEstComplexity] = useState('Premium interactive');// This stores selected project complexity.

  // This function calculates project hours, price, and delivery weeks.
  const calculateEstimate = () => {
    let baseRate = 1000; // ₹1000/hr base hourly rate.
    let basePages = estPageCount * 5; // 5 hours per page/screen.
    let complexityMultiplier = 1;

    if (estComplexity === 'Standard') complexityMultiplier = 1;
    else if (estComplexity === 'Premium interactive') complexityMultiplier = 1.35;
    else if (estComplexity === 'Enterprise Relational') complexityMultiplier = 1.75;
    else if (estComplexity === 'Realtime Node Mesh') complexityMultiplier = 2.25;


        // Total hours is calculated by multiplying base hours with complexity multiplier.
    // Math.round() rounds it to the nearest whole number.
    let totalHours = Math.round(basePages * complexityMultiplier);
    let totalPrice = totalHours * baseRate;


  

    return {
      hours: totalHours,
      price: totalPrice,
      deliveryWeeks: Math.ceil(totalHours / 30)    // Delivery weeks is calculated by assuming 30 working hours per week.
    };
  };

   // This calls the function and stores the result in estimate object.(hours, price, deliveryWeeks)
  const estimate = calculateEstimate();

   // This function applies the calculated estimate to the contact form fields.
  // It runs when user clicks on "Auto-Populate Specifics to Form" button.
  const handleApplyEstimateToForm = () => {
    let budgetBucket = '₹15,000 - ₹30,000';

    if (estimate.price > 90000) budgetBucket = '₹90,000+';
    else if (estimate.price > 70000) budgetBucket = '₹70,000 - ₹90,000';
    else if (estimate.price > 50000) budgetBucket = '₹50,000 - ₹70,000';
    else if (estimate.price > 30000) budgetBucket = '₹30,000 - ₹50,000';

    setForm(prev => ({
      ...prev,
      budget: budgetBucket,
      message: `Hi CodenPixel team, I evaluated my project scope using your Estimator tool. I have approximately ${estPageCount} key pages/screens with a complexity level of "${estComplexity}". The estimated project scope is around ${estimate.hours} hours, with an approximate cost of ₹${estimate.price.toLocaleString('en-IN')} and expected delivery in ${estimate.deliveryWeeks} week(s). Let's arrange a discussion call to plan the project properly.`
    }));

    const formContainer = document.getElementById('actual-contact-form');

    if (formContainer) {
      formContainer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // This function updates form values when user types or selects something.
  const handleInputChange = e => {
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

  // This function validates and submits the form to Web3Forms.
  const handleSubmit = async e => {
    e.preventDefault();

    const tempErrors = {};

    if (!form.name.trim()) {
      tempErrors.name = 'Please provide your full name.';
    }

    if (!form.email.trim()) {
      tempErrors.email = 'Please fill in your email address.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!form.message.trim()) {
      tempErrors.message = 'Please write a short project description.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New Project Enquiry from CodenPixel Website',
          from_name: 'CodenPixel Website',
          name: form.name,
          email: form.email,
          company: form.company || 'Not provided',
          project_type: form.projectType,
          budget: form.budget,
          estimated_pages: estPageCount,
          estimated_complexity: estComplexity,
          estimated_hours: `${estimate.hours} hrs`,
          estimated_price: `₹${estimate.price.toLocaleString('en-IN')}`,
          estimated_delivery: `${estimate.deliveryWeeks} week(s)`,
          message: form.message
        })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);

        setForm({
          name: '',
          email: '',
          company: '',
          projectType: 'Frontend Development',
          budget: '₹15,000 - ₹30,000',
          message: ''
        });

        setErrors({});
      } else {
        setSubmitError(
          result.message || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      setSubmitError(
        'Failed to submit the form. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-0 pb-8 sm:pt-4 sm:pb-16 md:pt-8 md:pb-24 lg:pt-10 lg:pb-28 bg-transparent relative overflow-hidden" id="contact">
      {/* Visual glow elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative blueprint SVG */}
      <div className="absolute right-[5%] top-[15%] opacity-15 text-primary hidden xl:block pointer-events-none select-none">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M 5,30 L 55,30 M 30,5 L 30,55"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      <div className="absolute left-8 bottom-12 opacity-25 text-[#06B6D4] font-mono text-[7px] hidden lg:block pointer-events-none select-none">
        <span>
          {/* STACT_TR: /STAGED/STRATEGY_VAL_REG_04 */}
          </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-widest text-[#2563EB] uppercase bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Strategy Consultation & Planning
          </span>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold sm:font-extrabold tracking-tight text-slate-900 leading-tight">
            Let's Map Your Digital Strategy
          </h2>

          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg">
            Estimate your project cost with our interactive calculator, or send
            your project details directly to receive custom planning support.
          </p>
        </div>

        {/* Estimator and Contact layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Estimator Panel */}
          <div className="lg:col-span-5 bg-white/40 backdrop-blur-md border border-white/40 shadow-lg rounded-3xl p-5 sm:p-6 md:p-8 animate-fadeIn">
            <span className="text-slate-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
              {/* // PROJECT ESTIMATOR */}
            </span>

            <div className="flex items-center gap-2 mt-3.5 sm:mt-4 mb-5 sm:mb-6">
              <div className="p-2 bg-gradient-to-tr from-primary to-secondary text-white rounded-xl">
                <Calculator size={16} className="sm:size-[18px]" />
              </div>

              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900">
                Custom Website Cost Estimator
              </h3>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-sans mb-5 sm:mb-6">
              Adjust the page count and project complexity to calculate
              estimated development hours, cost, and delivery time.
            </p>

            {/* Page count slider */}
            <div className="mb-5 sm:mb-6">
              <div className="flex items-center justify-between gap-3 text-[11px] sm:text-xs font-bold text-slate-700 mb-2">
                <span>Total Pages / Screens</span>

                <span className="text-primary font-mono text-xs sm:text-sm bg-primary/10 px-2 py-0.5 rounded-full">
                  {estPageCount} screens
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="25"
                value={estPageCount}
                onChange={e => setEstPageCount(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer animate-none"
              />

              <div className="flex justify-between items-center text-[8px] sm:text-[9px] text-slate-400 font-mono mt-1 select-none">
                <span>1 page</span>
                <span>25 pages</span>
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
                  Standard - Static design, responsive layout
                </option>

                <option value="Premium interactive">
                  Premium Interactive - Animations, dynamic user flows
                </option>

                <option value="Enterprise Relational">
                  Enterprise Relational - Backend, database, user accounts
                </option>

                <option value="Realtime Node Mesh">
                  Realtime Node Mesh - Chat, WebSockets, live updates
                </option>
              </select>
            </div>

            {/* Calculated summary panel */}
            <div className="bg-white/55 backdrop-blur-sm border border-white/35 p-4 sm:p-6 rounded-2xl mb-5 sm:mb-6 shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3 sm:mb-4">
                {/* // CALCULATED SUMMARY */}
              </span>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex flex-col gap-0.5 sm:gap-1 items-start">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                    <Hourglass size={11} className="text-secondary sm:size-[12px]" />
                    <span>Project Hours</span>
                  </div>

                  <span className="text-xl sm:text-2xl font-display font-extrabold text-slate-800 font-mono">
                    {estimate.hours} hrs
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 sm:gap-1 items-start">
                  <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 font-medium">
                    <IndianRupee size={12} className="text-green-500 sm:size-[13px]" />
                    <span>Estimated Cost</span>
                  </div>

                  <span className="text-xl sm:text-2xl font-display font-extrabold text-slate-800 font-mono">
                    ₹{estimate.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="text-[11px] sm:text-xs text-slate-500 border-t border-slate-100 pt-3.5 sm:pt-4 font-sans leading-relaxed">
                Suggested delivery time: approximately{' '}
                <span className="font-bold text-primary">
                  {estimate.deliveryWeeks} week(s)
                </span>
                .
              </div>
            </div>

            {/* Auto Populate Button */}
            <button
              type="button"
              onClick={handleApplyEstimateToForm}
              className="w-full py-2.5 sm:py-3 bg-slate-900 hover:bg-primary text-white text-[11px] sm:text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-md shadow-slate-900/10"
            >
              <Sparkles size={12} className="sm:size-[13px]" />
              <span>Auto-Populate Specifics to Form</span>
            </button>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 h-full" id="actual-contact-form">
            <div className="bg-white/40 backdrop-blur-md border border-white/40 p-5 sm:p-8 md:p-10 shadow-lg rounded-3xl relative animate-fadeIn">
              <span className="text-slate-400 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest block mb-3 sm:mb-4">
                {/* // CONTACT_FORM_v4 */}
              </span>

              {success ? (
                <div className="p-5 sm:p-8 bg-green-50 border border-green-200/90 rounded-2xl text-center text-slate-700 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[350px]">
                  <div className="p-3.5 sm:p-4 bg-green-500 text-white rounded-full shadow-md mb-4 animate-bounce">
                    <CheckCircle size={28} className="sm:size-[32px]" />
                  </div>

                  <h3 className="font-display font-extrabold text-base sm:text-lg text-green-900">
                    Consultation Request Sent!
                  </h3>

                  <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm mt-2.5 leading-relaxed">
                    Thank you! Your project details have been submitted
                    successfully. Our team will review your requirements and
                    contact you soon.
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
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Full Name <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full bg-white border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none ${
                          errors.name
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
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Email Address <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full bg-white border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none ${
                          errors.email
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
                      <label className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Company Name
                      </label>

                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleInputChange}
                        placeholder="Apex Brands Ltd"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none"
                      />
                    </div>

                    {/* Project Category */}
                    <div>
                      <label className="block text-[10px] sm:text-xs font-bold text-[#1E293B] mb-1.5 sm:mb-2 tracking-wide uppercase">
                        Project Category
                      </label>

                      <select
                        name="projectType"
                        value={form.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none animate-none"
                      >
                        <option>Website Design</option>
                        <option>Frontend Development</option>
                        <option>Backend Development</option>
                        <option>Full Stack Development</option>
                        <option>UI/UX Design</option>
                        <option>API Integration</option>
                        <option>Code Audit & Maintenance</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-700 mb-1.5 sm:mb-2 tracking-wide uppercase">
                      Budget Range
                    </label>

                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none animate-none"
                    >
                      <option>₹15,000 - ₹30,000</option>
                      <option>₹30,000 - ₹50,000</option>
                      <option>₹50,000 - ₹70,000</option>
                      <option>₹70,000 - ₹90,000</option>
                      <option>₹90,000+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#1E293B] mb-1.5 sm:mb-2 tracking-wide uppercase">
                      Project Description <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleInputChange}
                      placeholder="Describe your website, features, pages, design style, and expected delivery time..."
                      className={`w-full bg-white border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none resize-none ${
                        errors.message
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
                          <span>Submit Project Request</span>
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