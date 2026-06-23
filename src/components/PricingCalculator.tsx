import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, HelpCircle, PhoneCall, Sparkles, Shield, Bookmark, Calendar } from 'lucide-react';
import { PlotData } from '../data';

interface PricingCalculatorProps {
  onQuoteEnquiry: (customPlot: Partial<PlotData>) => void;
}

export default function PricingCalculator({ onQuoteEnquiry }: PricingCalculatorProps) {
  // Slider states
  const [plotSize, setPlotSize] = useState<number>(1200);
  const [ratePerSqFt, setRatePerSqFt] = useState<number>(2890); // default starting rate
  const [isCornerPlot, setIsCornerPlot] = useState<boolean>(false);

  // When corner plot is true, we hike rate representing premium location
  const activeRate = isCornerPlot ? 3190 : ratePerSqFt;
  const basicCost = plotSize * activeRate;
  const basicCostLakhs = (basicCost / 100000).toFixed(2);
  const loanEligibleLakhs = (parseFloat(basicCostLakhs) * 0.8).toFixed(2);
  const registrationEstimateLakhs = (parseFloat(basicCostLakhs) * 0.09).toFixed(2); // ~9% stamp duty & reg

  const majorPlotCards = [
    { size: 600, label: 'Starter Plot', cost: '17.34 Lakhs*', desc: 'Suited for cosy 2BHK micro-villas or high-yield long-term land investment.' },
    { size: 1200, label: 'Standard Premium', cost: '34.68 Lakhs*', desc: 'Our most popular size. Fits independent 3BHK duplex houses with private parking.' },
    { size: 1800, label: 'Elite Estate', cost: '52.02 Lakhs*', desc: 'For spacious luxury villas with private garden lawns, yoga decks, and balconies.' }
  ];

  return (
    <div className="bg-brand-beige-50/40 border border-brand-beige-200 rounded-3xl p-6 md:p-8 shadow-lg mt-8">
      {/* Sector Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-100 text-brand-gold-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Calculator size={12} />
          Pricing & Estimation
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-brand-green-950">
          Transparent Pricing Plans
        </h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Premium plots starting from <span className="text-brand-green-900 font-bold">₹2,890 to ₹3,190 per Sq.Ft</span>. 
          Use our estimator or lock in featured dimensions below.
        </p>
      </div>

      {/* Pricing Cards for Major Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {majorPlotCards.map((card) => (
          <div 
            key={card.size}
            className="bg-white border border-brand-beige-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all hover:scale-[1.02] duration-300 relative overflow-hidden group"
          >
            {card.size === 1200 && (
              <div className="absolute top-0 right-0 bg-brand-gold-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest animate-pulse">
                Best Value
              </div>
            )}
            
            <div>
              <span className="text-xs font-bold text-brand-gold-600/90 uppercase tracking-widest">{card.label}</span>
              <h4 className="font-serif text-3xl text-brand-green-950 mt-1.5 group-hover:text-brand-green-800 transition-colors">
                {card.size} <span className="text-sm font-sans font-medium text-gray-400">Sq.Ft</span>
              </h4>
              <div className="h-0.5 w-12 bg-brand-gold-400 my-4"></div>
              <p className="text-xs text-gray-500 leading-relaxed min-h-[50px]">{card.desc}</p>
            </div>

            <div className="mt-6 pt-5 border-t border-brand-beige-100">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Starting Price</span>
              <p className="text-2xl font-extrabold text-brand-green-900 mt-1">₹{card.cost}</p>
              
              <button
                onClick={() => onQuoteEnquiry({ sizeSqFt: card.size, totalPriceLakhs: parseFloat(card.cost) })}
                type="button"
                className="mt-4 w-full py-2.5 px-4 bg-brand-green-900 hover:bg-brand-green-950 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Bookmark size={12} />
                Get Custom Quote & Layout
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Master Interactive Cost Estimator Slider */}
      <div className="bg-brand-green-950 text-white rounded-3xl p-6 md:p-8 border border-brand-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Slider input metrics */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-brand-gold-400" />
              <h4 className="font-serif text-xl md:text-2xl text-brand-gold-200">Interactive Plot Cost Estimator</h4>
            </div>
            
            <p className="text-xs text-brand-gold-100/60 leading-relaxed max-w-lg">
              Adjust the slider to simulate custom villa plot boundaries from 600 to 2200 Sq.Ft and inspect bank loan and settlement matrices instantly.
            </p>

            {/* Slider Controls */}
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-brand-gold-200/80 tracking-wider uppercase font-mono">Desired Area Size</span>
                <span className="text-2xl font-extrabold text-brand-gold-200 font-mono">{plotSize} <span className="text-xs font-sans font-medium text-brand-gold-100/60">Sq.Ft</span></span>
              </div>

              <input
                id="plot-size-slider"
                type="range"
                min={600}
                max={2117}
                step={50}
                value={plotSize}
                onChange={(e) => setPlotSize(parseInt(e.target.value))}
                className="w-full h-2 bg-brand-green-900 border border-brand-gold-500/20 rounded-lg appearance-none cursor-pointer accent-brand-gold-400"
              />
              
              <div className="flex justify-between text-[10px] text-brand-gold-100/40 font-mono font-bold pt-1">
                <span>MIN: 600 SQ.FT</span>
                <span>AVERAGE: 1200 SQ.FT</span>
                <span>MAX: 2117 SQ.FT</span>
              </div>
            </div>

            {/* Premium toggle option */}
            <div className="bg-brand-green-900/50 border border-brand-gold-500/10 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-brand-gold-300">Upgrade to Corner / West-Facing Plot?</span>
                <p className="text-[10px] text-brand-gold-100/50">Premium location plots have highly flexible cross-ventilation access rates.</p>
              </div>
              <label htmlFor="corner-plot-toggle" className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  id="corner-plot-toggle"
                  type="checkbox"
                  checked={isCornerPlot}
                  onChange={(e) => setIsCornerPlot(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-brand-green-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-brand-gold-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-gold-500"></div>
              </label>
            </div>
          </div>

          {/* Results display panel */}
          <div className="lg:col-span-2 bg-brand-green-900 border border-brand-gold-500/10 rounded-2xl p-6 space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-brand-gold-400 uppercase font-semibold">Rough Payment Matrix</span>
            
            <div className="space-y-3 text-xs border-b border-white/5 pb-4">
              <div className="flex justify-between">
                <span className="text-brand-gold-100/60 font-medium">Estimated Plot Rate</span>
                <span className="font-bold text-white font-mono">₹{activeRate} / Sq.Ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gold-100/60 font-medium">Basic Agreement Value</span>
                <span className="font-extrabold text-white text-sm font-mono">₹{basicCostLakhs} Lakhs*</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gold-100/60 font-medium">Stamp Duty & Registration (Est.)</span>
                <span className="font-bold text-brand-gold-300 font-mono">₹{registrationEstimateLakhs} Lakhs</span>
              </div>
            </div>

            {/* Loan Matrix banner */}
            <div className="bg-brand-green-950/60 border border-emerald-500/15 rounded-xl p-3 flex gap-3 text-xs items-start">
              <Shield className="text-emerald-400 w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-300">SBI & HDFC Pre-Approved Loan</span>
                <p className="text-[10px] text-brand-gold-100/60 mt-0.5">Approx. <span className="text-white font-bold font-mono">₹{loanEligibleLakhs} Lakhs</span> eligible instantly subject to profiling.</p>
              </div>
            </div>

            <button
              onClick={() => onQuoteEnquiry({ sizeSqFt: plotSize, totalPriceLakhs: parseFloat(basicCostLakhs), facing: isCornerPlot ? 'West' : 'East' })}
              type="button"
              className="w-full bg-gold-gradient text-white font-bold text-xs py-3 rounded-xl hover:shadow-brand-gold-500/25 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar size={13} />
              Lock This Estimation & Schedule Site Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
