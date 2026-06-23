import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS, FAQItem } from '../data';

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1'); // default to opened first FAQ

  // Search filter
  const filteredFAQs = FAQ_ITEMS.filter(faq => {
    return faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleFAQ = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="bg-brand-beige-50/20 border border-brand-beige-200 rounded-3xl p-6 md:p-8 shadow-sm mt-8">
      
      {/* Subject Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-brand-beige-200">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-900/10 text-brand-green-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle size={12} />
            Instant Knowledge Desk
          </span>
          <h3 className="font-serif text-3xl text-brand-green-950">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Quick, transparent answers concerning legal titles, registration timelines, loan parameters, and infrastructure.
          </p>
        </div>

        {/* Dynamic Accordion Search bar */}
        <div className="relative w-full lg:max-w-xs shrink-0 select-none">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search approvals, pricing, loans..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-brand-beige-200 text-xs text-brand-green-950 placeholder-gray-400 rounded-xl focus:outline-none focus:border-brand-gold-400 focus:ring-1 focus:ring-brand-gold-400/40 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 hover:text-brand-green-950"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Accordion list */}
      <div className="mt-6 space-y-3">
        {filteredFAQs.map((faq) => {
          const isExpanded = expandedId === faq.id;
          
          return (
            <div 
              key={faq.id}
              className="bg-white border border-brand-beige-200/60 rounded-2xl overflow-hidden transition-all hover:border-brand-beige-200"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                type="button"
                className="w-full text-left px-5 py-4.5 flex items-center justify-between gap-4 text-brand-green-950 select-none cursor-pointer"
              >
                <span className="font-bold text-sm md:text-base pr-2 leading-snug">
                  {faq.question}
                </span>
                <span className={`shrink-0 p-1.5 rounded-full bg-brand-beige-50 text-brand-green-950 transition duration-300 ${isExpanded ? 'rotate-180 bg-brand-green-900 text-white' : ''}`}>
                  <ChevronDown size={14} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-brand-beige-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-brand-beige-100 p-6">
            <HelpCircle size={32} className="text-brand-gold-500 mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-semibold text-brand-green-950">We couldn't find an exact match for your query.</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Please submit an enquiry at the bottom, or select the Quick Whatsapp Assist link below for customized help.</p>
            <a
              href="https://wa.me/919444990234?text=Hi, I am looking for answers about approvals and bank loans at Sameera Spring Dale."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-brand-gold-700 hover:underline"
            >
              Ask an agent directly on WhatsApp
              <ArrowRight size={12} />
            </a>
          </div>
        )}
      </div>

    </div>
  );
}
