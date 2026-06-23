import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Calendar, ShieldCheck, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenEnquiryModal: (title: string, subtitle: string, source: string, actionType: 'brochure' | 'price' | 'visit' | 'general') => void;
}

export default function Header({ onOpenEnquiryModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Pricing Calculator', href: '#pricing' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location Advantages', href: '#location' },
    { label: 'Master Layout', href: '#layout' },
    { label: 'FAQ Accordion', href: '#faqs' }
  ];

  return (
    <>
      {/* Sticky Premium Header Menu */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg py-3' 
            : 'bg-brand-green-950/95 border-b border-white/5 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Brand Logo and Developer Flag */}
          <a href="#" className="flex flex-col select-none group">
            <div className="flex items-center gap-1.5">
              <span className="text-xl md:text-2xl font-serif tracking-wider text-gold-gradient font-bold uppercase">
                SPRING DALE
              </span>
            </div>
            <span className="text-[9px] font-sans font-bold tracking-widest text-[#dfbf80]/70 uppercase leading-none mt-0.5 group-hover:text-brand-gold-300 transition-colors">
              BY SAMEERA GROUPS
            </span>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-brand-gold-300 hover:scale-[1.02] text-xs font-bold tracking-wide transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-gold-400 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Quick CTAs on Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919444490234"
              className="flex items-center gap-1.5 px-3 py-2 border border-brand-gold-500/10 hover:border-brand-gold-400/40 text-brand-gold-300 font-mono text-xs font-bold rounded-lg transition"
            >
              <Phone size={12} />
              <span>+91 94444 90234</span>
            </a>
            
            <a
              href="https://wa.me/919444990234?text=Hi, I am interested in Sameera Spring Dale plots at Nenmeli, Chengalpattu. Please share details."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Chat</span>
            </a>

            <button
              onClick={() => onOpenEnquiryModal(
                'Schedule A Private Site Visit',
                'We arrange premium complimentary private cab pickups and drop-offs across Chennai / Chengalpattu.',
                'Header Site Visit CTA',
                'visit'
              )}
              type="button"
              className="bg-gold-gradient hover:shadow-brand-gold-500/10 text-white text-xs font-bold px-4 py-2 rounded-lg hover:scale-[1.01] transition cursor-pointer flex items-center gap-1.5"
            >
              <Calendar size={13} />
              Book Site Visit
            </button>
          </div>

          {/* Mobile Hamburguer button (min-width target 44px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-brand-gold-300 hover:text-white rounded-lg hover:bg-brand-green-900/60 transition cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-[58px] left-0 right-0 z-30 bg-brand-green-950 border-b border-brand-gold-500/20 shadow-2xl overflow-hidden block lg:hidden"
          >
            <div className="px-5 py-6 space-y-5">
              <div className="grid grid-cols-1 gap-2 border-b border-white/5 pb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/90 hover:text-brand-gold-300 py-2.5 px-3 rounded-lg hover:bg-brand-green-900/40 text-sm font-bold tracking-wide transition block"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile Quick Action Buttons (Touch targets >= 44px) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:+919444490234"
                  className="flex items-center justify-center gap-2 py-3 bg-brand-green-900 border border-brand-gold-500/20 text-brand-gold-300 font-mono text-xs font-bold rounded-xl transition min-h-[44px]"
                >
                  <Phone size={14} />
                  <span>Call Office</span>
                </a>
                
                <a
                  href="https://wa.me/919444990234?text=Hi, I am looking for details of Sameera Spring Dale Chengalpattu."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition min-h-[44px]"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiryModal(
                    'Exclusive Site Visit Booking',
                    'Submit your detail to receive complimentary premium transport pickup directly to Sameera Spring Dale site.',
                    'Mobile Header CTA',
                    'visit'
                  );
                }}
                type="button"
                className="w-full bg-gold-gradient py-3.5 rounded-xl font-bold text-white text-xs text-center flex items-center justify-center gap-2 transition min-h-[44px] cursor-pointer"
              >
                <Calendar size={14} />
                Book Free Private Tour
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-gold-100/30 text-center pt-2 border-t border-white/5">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>TN RERA TN/35/Layout/1420/2024 Approved Township</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
