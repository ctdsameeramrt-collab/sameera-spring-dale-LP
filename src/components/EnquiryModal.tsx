import { AnimatePresence, motion } from 'motion/react';
import { X, ShieldCheck, HelpCircle, FileText, Calendar, Compass, PhoneCall } from 'lucide-react';
import LeadForm from './LeadForm';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  source: string;
  defaultPlotSize?: string;
  actionType?: 'brochure' | 'price' | 'visit' | 'general' | 'plot';
}

export default function EnquiryModal({
  isOpen,
  onClose,
  title,
  subtitle,
  source,
  defaultPlotSize = '',
  actionType = 'general'
}: EnquiryModalProps) {
  
  const getHeaderIcon = () => {
    switch (actionType) {
      case 'brochure':
        return <FileText className="text-brand-gold-300 w-8 h-8 stroke-[1.5]" />;
      case 'price':
        return <HelpCircle className="text-brand-gold-300 w-8 h-8 stroke-[1.5]" />;
      case 'visit':
        return <Calendar className="text-brand-gold-300 w-8 h-8 stroke-[1.5]" />;
      case 'plot':
        return <Compass className="text-brand-gold-300 w-8 h-8 stroke-[1.5]" />;
      default:
        return <PhoneCall className="text-brand-gold-300 w-8 h-8 stroke-[1.5]" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-green-950/80 backdrop-blur-md"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-lg bg-brand-green-900 border border-brand-gold-500/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Top decorative banner */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient" />

            {/* Exit button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-gold-200/50 hover:text-brand-gold-300/100 p-2 rounded-full hover:bg-brand-green-800/40 transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8">
              {/* Modal Core Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-brand-green-950 rounded-2xl border border-brand-gold-500/10 flex items-center justify-center shrink-0">
                  {getHeaderIcon()}
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-gold-100 leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs text-brand-gold-100/60 mt-1 leading-relaxed">
                    {subtitle}
                  </p>
                </div>
              </div>

              {/* Renders dynamic responsive lead capture form */}
              <LeadForm
                source={source}
                defaultPlotSize={defaultPlotSize}
                compact={actionType === 'brochure' || actionType === 'price'}
                submitButtonText={
                  actionType === 'brochure' 
                    ? 'Download Premium Brochure' 
                    : actionType === 'price' 
                    ? 'Get Instant Price List' 
                    : actionType === 'visit' 
                    ? 'Book Free Cab & Visit' 
                    : 'Submit Safe Request'
                }
                onSuccess={() => {
                  // After successful submission, we can keep the success screen active
                  // Or let the form handle its success screen. Modifying nothing else.
                }}
              />

              {/* Credibility section */}
              <div className="mt-6 pt-5 border-t border-brand-gold-500/10 flex justify-between items-center text-[11px] text-brand-gold-100/40">
                <p className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>RERA approved development</span>
                </p>
                <p>Licensed: TN/35/Layout/1420/2024</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
