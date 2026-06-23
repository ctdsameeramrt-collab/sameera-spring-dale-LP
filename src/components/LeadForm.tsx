import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, Phone, MessageSquare, Download } from 'lucide-react';

interface LeadFormProps {
  source: string;
  defaultPlotSize?: string;
  onSuccess?: (leadName: string) => void;
  submitButtonText?: string;
  compact?: boolean;
}

export default function LeadForm({
  source,
  defaultPlotSize = '',
  onSuccess,
  submitButtonText = 'Submit Details',
  compact = false
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plotSize: defaultPlotSize,
    budget: '',
    visitDate: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = '10-digit mobile number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-+]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate real API submission
    setTimeout(() => {
      const newLead = {
        id: 'LEAD-' + Date.now(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        plotSize: formData.plotSize || defaultPlotSize || 'Not Specified',
        budget: formData.budget || 'Not Specified',
        visitDate: formData.visitDate || 'Instant Contact',
        message: formData.message.trim() || 'Interested in project',
        source,
        createdAt: new Date().toISOString()
      };

      // Store in localStorage for admin viewer
      try {
        const existingLeads = JSON.parse(localStorage.getItem('sameera_springdale_leads') || '[]');
        existingLeads.unshift(newLead);
        localStorage.setItem('sameera_springdale_leads', JSON.stringify(existingLeads));
        
        // Dispatch custom event to notify admin leads counter
        window.dispatchEvent(new Event('new_lead_submitted'));
      } catch (err) {
        console.error('Error saving lead to local storage:', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmittedName(formData.name.trim());
      
      if (onSuccess) {
        onSuccess(formData.name.trim());
      }
    }, 1200);
  };

  const handleWhatsAppSuccessRedirect = () => {
    // Generate pre-filled WhatsApp link with lead details
    const text = `Hi, I just submitted an enquiry on the Sameera Spring Dale website.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Interest:* ${formData.plotSize || defaultPlotSize || 'Residential Plot'}\n*Budget:* ${formData.budget || 'Not Checked'}\n*Source:* ${source}\n\nPlease share the Brochure & Cost Sheets.`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919444990234?text=${encodedText}`, '_blank');
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 px-4 bg-brand-green-950/40 border border-brand-gold-500/20 rounded-2xl animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green-700/20 text-brand-gold-400 mb-4 animate-bounce">
          <CheckCircle2 size={40} className="stroke-2" />
        </div>
        <h3 className="font-serif text-2xl text-brand-gold-200 mb-2">Thank You, {submittedName}!</h3>
        <p className="text-brand-gold-100/80 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Your enquiry has been securely logged. Our Senior Relationship Specialist will call you within <span className="text-brand-gold-300 font-semibold">15 minutes</span> with customized layout rates.
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <button
            onClick={handleWhatsAppSuccessRedirect}
            type="button"
            className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition duration-300 shadow-md hover:shadow-emerald-900/50"
          >
            <MessageSquare size={18} />
            Connect via WhatsApp
          </button>
          
          <a
            href="tel:+919444490234"
            className="flex items-center justify-center gap-2 w-full py-3 border border-brand-gold-400/30 bg-brand-green-900/40 hover:bg-brand-green-900/70 text-brand-gold-300 rounded-xl font-medium transition duration-300"
          >
            <Phone size={18} />
            Call Project Desk Now
          </a>
        </div>
        
        <p className="text-xs text-brand-gold-100/40 mt-6">
          Reference Code: SDS-{Date.now().toString().slice(-6)}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name-input" className="block text-xs font-semibold text-brand-gold-200/90 tracking-wide uppercase mb-1">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name-input"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-3 bg-brand-green-900/30 border ${errors.name ? 'border-red-400/60 focus:border-red-400' : 'border-brand-gold-500/20 focus:border-brand-gold-400'} text-white placeholder-brand-gold-100/30 rounded-xl focus:outline-none transition text-sm`}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1 font-medium">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone-input" className="block text-xs font-semibold text-brand-gold-200/90 tracking-wide uppercase mb-1">
            Indian Mobile Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold-300/60 text-xs font-mono font-semibold">+91</span>
            <input
              id="phone-input"
              type="tel"
              maxLength={10}
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
              className={`w-full pl-12 pr-4 py-3 bg-brand-green-900/30 border ${errors.phone ? 'border-red-400/60 focus:border-red-400' : 'border-brand-gold-500/20 focus:border-brand-gold-400'} text-white placeholder-brand-gold-100/30 rounded-xl focus:outline-none transition font-mono text-sm`}
            />
          </div>
          {errors.phone && <p className="text-red-400 text-xs mt-1 font-medium">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email-input" className="block text-xs font-semibold text-brand-gold-200/90 tracking-wide uppercase mb-1">
            Email Address <span className="text-brand-gold-100/40 text-[10px] lowercase">(optional)</span>
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="e.g. name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 bg-brand-green-900/30 border ${errors.email ? 'border-red-400/60 focus:border-red-400' : 'border-brand-gold-500/20 focus:border-brand-gold-400'} text-white placeholder-brand-gold-100/30 rounded-xl focus:outline-none transition text-sm`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1 font-medium">{errors.email}</p>}
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="plot-size-select" className="block text-xs font-semibold text-brand-gold-200/90 tracking-wide uppercase mb-1">
              Required Plot Size
            </label>
            <select
              id="plot-size-select"
              value={formData.plotSize}
              onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
              className="w-full px-4 py-3 bg-brand-green-950 border border-brand-gold-500/20 text-brand-gold-100 rounded-xl focus:outline-none focus:border-brand-gold-400 transition text-sm appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23c29d53' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5H7z'/></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat' }}
            >
              <option value="">Choose plot size...</option>
              <option value="600 Sq.Ft">600 Sq.Ft (₹17.34 Lakhs* onwards)</option>
              <option value="800 Sq.Ft">800 Sq.Ft (₹23.12 Lakhs* onwards)</option>
              <option value="900 Sq.Ft">900 Sq.Ft (₹26.01 Lakhs* onwards)</option>
              <option value="1200 Sq.Ft">1200 Sq.Ft (₹34.68 Lakhs* onwards)</option>
              <option value="1500 Sq.Ft">1500 Sq.Ft (₹43.35 Lakhs* onwards)</option>
              <option value="1800 Sq.Ft">1800 Sq.Ft (₹52.02 Lakhs* onwards)</option>
              <option value="2117 Sq.Ft">2117 Sq.Ft (₹61.18 Lakhs* onwards)</option>
              <option value="Custom Size">Custom / Layout Range</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget-select" className="block text-xs font-semibold text-brand-gold-200/90 tracking-wide uppercase mb-1">
              Your Budget Range
            </label>
            <select
              id="budget-select"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 bg-brand-green-950 border border-brand-gold-500/20 text-brand-gold-100 rounded-xl focus:outline-none focus:border-brand-gold-400 transition text-sm appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23c29d53' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5H7z'/></svg>")`, backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat' }}
            >
              <option value="">Choose budget...</option>
              <option value="₹17L - ₹25L">₹17 Lakhs – ₹25 Lakhs</option>
              <option value="₹25L - ₹35L">₹25 Lakhs – ₹35 Lakhs</option>
              <option value="₹35L - ₹50L">₹35 Lakhs – ₹50 Lakhs</option>
              <option value="₹50L - ₹65L">₹50 Lakhs – ₹65 Lakhs</option>
              <option value="Above ₹65L">Above ₹65 Lakhs</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="visit-date-input" className="block text-xs font-semibold text-brand-gold-200/90 tracking-wide uppercase mb-1">
          {source.toLowerCase().includes('site') || source.toLowerCase().includes('visit') 
            ? 'Preferred Site Visit Date' 
            : 'Preferred Contact / Visit Date'}
        </label>
        <input
          id="visit-date-input"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={formData.visitDate}
          onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
          className="w-full px-4 py-3 bg-brand-green-900/30 border border-brand-gold-500/20 text-brand-gold-100 rounded-xl focus:outline-none focus:border-brand-gold-400 transition text-sm cursor-pointer"
        />
      </div>

      <div>
        <label htmlFor="message-input" className="block text-xs font-semibold text-brand-gold-200/90 tracking-wide uppercase mb-1">
          Special Notes or Requirements
        </label>
        <textarea
          id="message-input"
          rows={compact ? 2 : 3}
          placeholder="I would like to receive the master layout print, structural approvals..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-brand-green-900/30 border border-brand-gold-500/20 text-white placeholder-brand-gold-100/30 rounded-xl focus:outline-none focus:border-brand-gold-400 transition text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative overflow-hidden w-full py-4 px-6 rounded-xl font-bold text-white bg-gold-gradient shadow-lg hover:shadow-brand-gold-500/20 hover:scale-[1.01] active:scale-[0.99] transition duration-300 flex items-center justify-center gap-3 cursor-pointer group"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Securing Connection...</span>
          </>
        ) : (
          <>
            <span>{submitButtonText}</span>
            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-gold-100/50 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Secure 256-Bit SSL Encrypted Link</span>
      </div>
    </form>
  );
}
