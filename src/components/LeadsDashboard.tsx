import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Eye, FileSpreadsheet, Trash2, X, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  plotSize?: string;
  budget?: string;
  visitDate?: string;
  message?: string;
  source: string;
  createdAt: string;
}

export default function LeadsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterSource, setFilterSource] = useState<string>('All');

  // Load leads from localStorage
  const loadLeads = () => {
    try {
      const storedLeads = JSON.parse(localStorage.getItem('sameera_springdale_leads') || '[]');
      setLeads(storedLeads);
    } catch (e) {
      console.error('Error reading local storage leads:', e);
    }
  };

  useEffect(() => {
    loadLeads();
    
    // Listen for custom events when a new lead is submitted
    const handleNewLead = () => {
      loadLeads();
    };

    window.addEventListener('new_lead_submitted', handleNewLead);
    return () => {
      window.removeEventListener('new_lead_submitted', handleNewLead);
    };
  }, []);

  const handleClearLeads = () => {
    if (window.confirm('Are you sure you want to delete all submitted lead logs from local storage? This is irreversible.')) {
      localStorage.setItem('sameera_springdale_leads', '[]');
      setLeads([]);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export! Please submit some enquiries first.');
      return;
    }

    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'Source', 'Required Plot Size', 'Budget Range', 'Preferred Visit Date', 'Message'];
    const rows = leads.map(lead => [
      lead.id,
      new Date(lead.createdAt).toLocaleDateString(),
      lead.name,
      lead.phone,
      lead.email || 'N/A',
      lead.source,
      lead.plotSize || 'N/A',
      lead.budget || 'N/A',
      lead.visitDate || 'N/A',
      `"${(lead.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sameera_springdale_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const seedDummyLeads = () => {
    const dummyLeads: Lead[] = [
      {
        id: 'LEAD-101',
        name: 'Ramesh Kumar',
        phone: '9840123456',
        email: 'ramesh.kumar@gmail.com',
        plotSize: '1200 Sq.Ft',
        budget: '₹35L - ₹50L',
        visitDate: '2026-06-25',
        message: 'Looking for north facing 30x40 plots inside phase 1.',
        source: 'Interactive Layout Map',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'LEAD-102',
        name: 'Divya Shanmugam',
        phone: '9444190887',
        email: 'divya.s88@yahoo.com',
        plotSize: '600 Sq.Ft',
        budget: '₹17L - ₹25L',
        visitDate: '2026-06-28',
        message: 'Shared office colleague referred. Need immediate spot registration quote.',
        source: 'Pricing Calculator',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
      },
      {
        id: 'LEAD-103',
        name: 'Siddharth Iyer (NRI)',
        phone: '9600125544',
        email: 'sidd.iyer@elitefirm.sg',
        plotSize: '1800 Sq.Ft',
        budget: 'Above ₹65L',
        visitDate: '2026-07-02',
        message: 'Singapore relocation planning. Want 1800 sq ft or clubbed plots. Please share RERA titles.',
        source: 'Brochure Download Modal',
        createdAt: new Date(Date.now() - 3600000 * 25).toISOString()
      }
    ];

    try {
      const existing = JSON.parse(localStorage.getItem('sameera_springdale_leads') || '[]');
      const compiled = [...dummyLeads, ...existing];
      localStorage.setItem('sameera_springdale_leads', JSON.stringify(compiled));
      setLeads(compiled);
    } catch (e) {
      console.error(e);
    }
  };

  const sourcesList = ['All', ...Array.from(new Set(leads.map(l => l.source)))];
  const filteredLeads = leads.filter(l => filterSource === 'All' || l.source === filterSource);

  return (
    <>
      {/* Floating Small Button for Admins */}
      <div className="fixed bottom-24 right-5 z-40 select-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-brand-green-950 text-brand-gold-300 border border-brand-gold-400/30 flex items-center gap-2 p-2.5 px-4 rounded-full shadow-2xl hover:bg-brand-green-900 cursor-pointer text-xs font-bold leading-none select-none transition"
        >
          <Shield size={14} className="text-brand-gold-400" />
          <span>Leads Manager ({leads.length})</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Dark outer backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar drawer containing logs */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="relative w-full max-w-2xl h-full bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden z-20"
            >
              <div>
                {/* Header panel */}
                <div className="p-6 bg-slate-950 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-brand-gold-500/10 text-brand-gold-400 rounded-lg">
                      <Shield size={18} />
                    </div>
                    <div>
                      <h3 className="text-white text-base font-bold">Secure Local Leads Vault</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Captures submitted user inquiries in real-time inside LocalStorage</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Subheader Toolbar */}
                <div className="p-4 bg-slate-950/40 border-b border-white/5 flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">Source Filter:</span>
                    <select
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                      className="bg-slate-800 text-white rounded px-2 py-1 text-xs outline-none cursor-pointer border border-white/10"
                    >
                      {sourcesList.map(src => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    {leads.length === 0 && (
                      <button
                        onClick={seedDummyLeads}
                        type="button"
                        className="bg-brand-green-900 hover:bg-brand-green-800 text-white text-[10px] font-bold px-3 py-1.5 rounded transition cursor-pointer"
                      >
                        Seed Sample Leads
                      </button>
                    )}
                    <button
                      onClick={loadLeads}
                      type="button"
                      className="text-slate-400 hover:text-white p-1.5 rounded bg-slate-800 transition cursor-pointer"
                      title="Reload Logs"
                    >
                      <RefreshCw size={12} />
                    </button>
                    <button
                      onClick={handleExportCSV}
                      type="button"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded transition flex items-center gap-1 cursor-pointer"
                    >
                      <FileSpreadsheet size={12} />
                      Excel CSV
                    </button>
                    <button
                      onClick={handleClearLeads}
                      type="button"
                      className="bg-red-900/65 hover:bg-red-900 text-red-200 text-[10px] font-bold px-2 py-1.5 rounded transition cursor-pointer"
                      title="Clear database"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Central Logs Feed */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="bg-slate-950 border border-white/5 rounded-xl p-4.5 space-y-3 shadow-inner relative hover:border-brand-gold-500/20 transition-all duration-300 group"
                    >
                      <span className="absolute top-4 right-4 text-[9px] font-mono font-bold bg-slate-850 text-slate-400 px-2 py-0.5 rounded border border-white/5 uppercase">
                        {lead.source}
                      </span>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                          <h4 className="text-white text-sm font-bold">{lead.name}</h4>
                        </div>
                        <p className="text-[10px] text-slate-400 pl-5 font-mono">Submitted: {new Date(lead.createdAt).toLocaleString()}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs pl-5 text-slate-300">
                        <div>
                          <span className="text-slate-500 font-medium block">Phone Number</span>
                          <a href={`tel:${lead.phone}`} className="font-mono text-brand-gold-300 font-bold hover:underline">{lead.phone}</a>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium block">Email Address</span>
                          <span className="font-mono truncate block" title={lead.email || 'N/A'}>{lead.email || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium block">Plot / Size Interest</span>
                          <span className="font-bold text-white">{lead.plotSize || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium block">Budget Range</span>
                          <span className="font-bold text-brand-gold-400">{lead.budget || 'N/A'}</span>
                        </div>
                      </div>

                      {lead.visitDate && (
                        <div className="bg-slate-900 border border-white/5 p-2 px-3.5 rounded-lg text-xs ml-5 text-slate-400">
                          <span className="text-slate-500 block font-semibold text-[10px]">PREFERRED VISIT DATE</span>
                          <span className="text-white font-bold">{lead.visitDate}</span>
                        </div>
                      )}

                      {lead.message && (
                        <div className="text-xs pl-5 italic text-slate-400 leading-relaxed border-l border-brand-gold-500/10 ml-5 py-0.5">
                          "{lead.message}"
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 text-slate-500">
                    <Shield size={40} className="stroke-[1.5] text-slate-600 mb-2 animate-pulse" />
                    <p className="text-sm font-semibold text-slate-400">No leads captured yet.</p>
                    <p className="text-xs max-w-xs mx-auto text-slate-600 mt-1">Submit an enquiry form on the website to see it logged instantly in this manager desk!</p>
                  </div>
                )}
              </div>

              {/* Footer admin message */}
              <div className="p-4 bg-slate-950 border-t border-white/5 text-center text-[10px] text-slate-500">
                Authorized Developers Sandbox Dashboard. Private Offline Data.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
