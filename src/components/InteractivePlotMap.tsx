import { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, CheckCircle, ShieldCheck, AlertCircle, Sparkles, Filter, Info, Eye } from 'lucide-react';
import { PLOTS_LIST, PlotData, IMAGES_MAP } from '../data';

interface InteractivePlotMapProps {
  onPlotSelect: (plot: PlotData) => void;
}

export default function InteractivePlotMap({ onPlotSelect }: InteractivePlotMapProps) {
  const [selectedPlot, setSelectedPlot] = useState<PlotData>(PLOTS_LIST[4]); // default to a plot
  const [facingFilter, setFacingFilter] = useState<'All' | 'East' | 'North' | 'South' | 'West'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Selling Fast' | 'Reserved'>('All');
  const [viewMode, setViewMode] = useState<'vector' | 'satellite'>('vector');

  // Filtered plots list
  const filteredPlots = PLOTS_LIST.filter(plot => {
    const matchFacing = facingFilter === 'All' || plot.facing === facingFilter;
    const matchStatus = statusFilter === 'All' || plot.status === statusFilter;
    return matchFacing && matchStatus;
  });

  return (
    <div className="bg-white border border-brand-beige-200 rounded-3xl p-6 md:p-8 shadow-xl mt-8">
      {/* Tab switchers and filter header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-brand-beige-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-900/10 text-brand-green-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass size={12} />
            Master Layout Plan
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-brand-green-950">
            Interactive Community Layout Map
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Browse through 143 total plots, filter by directions, and tap on any block to enquire.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-brand-beige-50 border border-brand-beige-200 p-1.5 rounded-xl self-start xl:self-auto shrink-0 select-none">
          <button
            onClick={() => setViewMode('vector')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition duration-200 cursor-pointer ${
              viewMode === 'vector' 
                ? 'bg-brand-green-900 text-white shadow-md' 
                : 'text-brand-green-950 hover:bg-brand-beige-100'
            }`}
          >
            <Sparkles size={14} />
            Interactive Layout Grid
          </button>
          <button
            onClick={() => setViewMode('satellite')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition duration-200 cursor-pointer ${
              viewMode === 'satellite' 
                ? 'bg-brand-green-900 text-white shadow-md' 
                : 'text-brand-green-950 hover:bg-brand-beige-100'
            }`}
          >
            <Eye size={14} />
            Official Site Layout Plan
          </button>
        </div>
      </div>

      {viewMode === 'vector' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Controls & Grid Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Pills bar */}
            <div className="flex flex-wrap gap-4 items-center bg-brand-beige-50/50 p-4 rounded-2xl border border-brand-beige-100/80">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-green-950 text-gray-700">
                <Filter size={14} className="text-brand-gold-500" />
                <span>Filter Direction:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'North', 'East', 'South', 'West'] as const).map((direction) => (
                  <button
                    key={direction}
                    onClick={() => setFacingFilter(direction)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      facingFilter === direction
                        ? 'bg-brand-gold-500 text-white font-bold'
                        : 'bg-white hover:bg-brand-beige-100 text-brand-green-900 border border-brand-beige-200'
                    }`}
                  >
                    {direction} Facing
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Community Road Layout Frame */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 relative overflow-hidden min-h-[380px] md:min-h-[440px]">
              
              {/* Road overlays decoration */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="h-6 w-full bg-slate-300 flex items-center justify-center text-[10px] tracking-widest font-mono text-slate-500">
                  NORTH ROAD - 22 FEET WIDE
                </div>
                <div className="h-10 w-full bg-slate-300 flex items-center justify-center text-[10px] tracking-widest font-mono text-slate-500">
                  MAIN TOWNSHIP CORRIDOR - 30 FEET WIDE
                </div>
                <div className="h-6 w-full bg-slate-300 flex items-center justify-center text-[10px] tracking-widest font-mono text-slate-500">
                  SOUTH AVENUE - 22 FEET WIDE
                </div>
              </div>

              {/* Graphic Layout Grid */}
              <div className="relative z-10 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {filteredPlots.map((plot) => {
                  const isSelected = selectedPlot.id === plot.id;
                  
                  // Status Colors
                  let bgCol = 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800';
                  if (plot.status === 'Reserved') {
                    bgCol = 'bg-slate-100 hover:bg-slate-150 border-slate-300 text-slate-500';
                  } else if (plot.status === 'Selling Fast') {
                    bgCol = 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-800';
                  }

                  if (isSelected) {
                    bgCol = 'ring-4 ring-brand-gold-500 border-brand-green-800 bg-brand-green-900 text-white font-bold shadow-lg';
                  }

                  return (
                    <motion.button
                      key={plot.id}
                      whileHover={{ scale: isSelected ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPlot(plot)}
                      type="button"
                      className={`h-16 rounded-xl border flex flex-col items-center justify-center p-1.5 transition duration-200 select-none cursor-pointer ${bgCol}`}
                    >
                      <span className="text-[10px] font-mono opacity-60">Plot</span>
                      <span className="text-sm font-extrabold tracking-tight">{plot.plotNumber}</span>
                      <span className="text-[9px] font-mono tracking-tighter opacity-80">{plot.sizeSqFt} sq.ft</span>
                    </motion.button>
                  );
                })}
              </div>

              {filteredPlots.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center h-[300px]">
                  <AlertCircle size={32} className="text-amber-500 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">No plots match the selected filters.</p>
                  <button
                    onClick={() => { setFacingFilter('All'); setStatusFilter('All'); }}
                    className="mt-3 text-xs font-bold text-brand-green-800 underline hover:text-brand-green-950"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>

            {/* Layout Legend */}
            <div className="flex flex-wrap gap-6 items-center justify-center text-xs font-semibold py-2">
              <div className="flex items-center gap-1.5 text-emerald-800">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-50 border border-emerald-300 inline-block"></span>
                <span>Available ({PLOTS_LIST.filter(p => p.status === 'Available').length})</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-800">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-50 border border-amber-300 inline-block"></span>
                <span>Selling Fast ({PLOTS_LIST.filter(p => p.status === 'Selling Fast').length})</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-100 border border-slate-300 inline-block"></span>
                <span>Reserved ({PLOTS_LIST.filter(p => p.status === 'Reserved').length})</span>
              </div>
            </div>
          </div>

          {/* Plot Inspector Panel (Right side) */}
          <div className="bg-brand-green-950 text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-brand-gold-500/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between border-b border-brand-gold-500/10 pb-4 mb-4">
                <span className="text-xs font-bold text-brand-gold-400 tracking-wider uppercase font-mono">
                  Plot Details Inspector
                </span>
                <span className="text-[10px] bg-brand-green-900 border border-brand-gold-500/10 px-2 py-0.5 rounded font-mono">
                  SDS-{selectedPlot.id}
                </span>
              </div>

              {/* Huge Plot Heading */}
              <div className="mb-6">
                <h4 className="font-serif text-3xl text-brand-gold-200">
                  Plot {selectedPlot.plotNumber}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  {selectedPlot.status === 'Available' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle size={12} /> Ready to Register
                    </span>
                  )}
                  {selectedPlot.status === 'Selling Fast' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                      <Sparkles size={12} className="animate-pulse" /> Popular Dimension
                    </span>
                  )}
                  {selectedPlot.status === 'Reserved' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <Info size={12} /> Under Pre-booking Waitlist
                    </span>
                  )}
                </div>
              </div>

              {/* Specs List */}
              <div className="space-y-3.5 my-6 text-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-brand-gold-100/60 font-medium">Dimension Area</span>
                  <span className="text-white font-extrabold pr-1 text-base">{selectedPlot.sizeSqFt} Sq.Ft</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-brand-gold-100/60 font-medium">Boundary Layout</span>
                  <span className="text-white font-semibold font-mono">{selectedPlot.dimensions} Feet</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-brand-gold-100/60 font-medium">Layout Facing</span>
                  <span className="text-white font-bold">{selectedPlot.facing} Facing</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-brand-gold-100/60 font-medium">Pricing Quote</span>
                  <span className="text-brand-gold-300 font-extrabold text-base">₹{selectedPlot.totalPriceLakhs} Lakhs* onwards</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-gold-100/60 font-medium">Bank Loan Eligibility</span>
                  <span className="text-emerald-400 font-bold">~80% (SBI, HDFC, ICICI)</span>
                </div>
              </div>
            </div>

            {/* Click-to-Action for this plot container */}
            <div className="mt-8 pt-6 border-t border-brand-gold-500/10">
              <button
                onClick={() => onPlotSelect(selectedPlot)}
                type="button"
                className="w-full bg-gold-gradient text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-brand-gold-500/20 active:scale-[0.98] transition-transform text-center block cursor-pointer"
              >
                Inquire For Plot {selectedPlot.plotNumber}
              </button>
              <p className="text-[10px] text-center text-brand-gold-100/30 mt-3 font-medium leading-relaxed">
                *Subject to immediate registration. Government taxes and registration fees extra as applicable.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mt-8 rounded-2xl overflow-hidden border border-brand-beige-200 ring-1 ring-brand-green-950/5 group shadow-inner">
          <div className="absolute top-4 left-4 z-10 bg-brand-green-950/80 backdrop-blur-md border border-brand-gold-500/20 px-3 py-1.5 rounded-lg text-xs text-brand-gold-100 font-medium font-mono flex items-center gap-1">
            <Eye size={12} />
            Zoomable Layouthouse View
          </div>
          
          <img
            src={IMAGES_MAP.layout}
            alt="Official Site Layout print of Sameera Spring Dale Gated Community Plots"
            className="w-full h-auto object-cover max-h-[550px] transition duration-700 ease-out hover:scale-105"
            referrerPolicy="no-referrer"
          />

          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur shadow-lg border border-brand-beige-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3.5 z-10">
            <p className="text-xs text-brand-green-950 font-semibold leading-normal text-center sm:text-left">
              View the officially approved DTCP Layout (Plat No: 206/2023) featuring clear layout numbering.
            </p>
            <button
              onClick={() => {
                // Open general enquiry modal for master blueprint request
                const dummyPlot: PlotData = {
                  id: 'P-LAYOUT',
                  plotNumber: 'Entire Layout',
                  sizeSqFt: 1200,
                  facing: 'East',
                  dimensions: 'Multiple',
                  totalPriceLakhs: 34.68,
                  status: 'Available'
                };
                onPlotSelect(dummyPlot);
              }}
              type="button"
              className="bg-brand-green-900 text-white font-bold text-xs px-4.5 py-2.5 rounded-lg hover:bg-brand-green-800 transition shadow shrink-0 cursor-pointer"
            >
              Request High-Res Layout PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
