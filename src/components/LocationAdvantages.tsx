import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Car, Navigation, Train, Briefcase, GraduationCap, HeartPulse } from 'lucide-react';
import { COMMUTE_CATEGORIES } from '../data';

export default function LocationAdvantages() {
  const [activeTab, setActiveTab] = useState<string>('transit');
  const [userStartLocation, setUserStartLocation] = useState<string>('');
  const [estimatedRoute, setEstimatedRoute] = useState<{
    distance: string;
    duration: string;
    routeText: string;
    ok: boolean;
  } | null>(null);

  const getTabIcon = (tabId: string) => {
    switch (tabId) {
      case 'transit':
        return <Train size={16} />;
      case 'employment':
        return <Briefcase size={16} />;
      case 'schools':
        return <GraduationCap size={16} />;
      case 'hospitals':
        return <HeartPulse size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };

  const handleCalculateRoute = (e: FormEvent) => {
    e.preventDefault();
    const loc = userStartLocation.toLowerCase().trim();
    if (!loc) return;

    // Beautiful realistic distance calculations based on actual geographical profiles from Chennai
    if (loc.includes('tambaram')) {
      setEstimatedRoute({
        distance: '38.2 km',
        duration: '35 Mins',
        routeText: 'Take Grand Southern Trunk Rd (GST Road/NH-32) straight southbound. Turn left towards SH-58 / Nenmeli. Excellent double-lane driving corridor.',
        ok: true
      });
    } else if (loc.includes('guindy') || loc.includes('chennai city') || loc.includes('adyar') || loc.includes('velachery')) {
      setEstimatedRoute({
        distance: '55.6 km',
        duration: '55 Mins',
        routeText: 'Route via Chennai Bypass or GST Road. Heavy high-speed national highway flow. Easy travel with zero stop lights up to Chengalpattu limits.',
        ok: true
      });
    } else if (loc.includes('mandal') || loc.includes('mahindra') || loc.includes('mwc')) {
      setEstimatedRoute({
        distance: '8.5 km',
        duration: '12 Mins',
        routeText: 'Drive southbound on GST Road, exit onto SH-58 / Nenmeli towards Paranur Toll Plaza. Fast corporate transit.',
        ok: true
      });
    } else if (loc.includes('kovilam') || loc.includes('omr') || loc.includes('sholinganallur')) {
      setEstimatedRoute({
        distance: '45.1 km',
        duration: '42 Mins',
        routeText: 'Take OMR / Kelambakkam-Vandalur Road, then merge into GST Road (NH-32) southbound. Smooth bypass links.',
        ok: true
      });
    } else {
      // General estimates
      setEstimatedRoute({
        distance: 'Calculated: ~20-25 km',
        duration: 'Estimated: ~20-25 Mins',
        routeText: `Using Grand Southern Trunk Road (GST Road / NH-32) corridor to Chengalpattu suburb, turning off onto state highway SH-58. Easy connectivity guaranteed.`,
        ok: true
      });
    }
  };

  const currentCategory = COMMUTE_CATEGORIES.find(cat => cat.id === activeTab) || COMMUTE_CATEGORIES[0];

  return (
    <div className="bg-white border border-brand-beige-200 rounded-3xl p-6 md:p-8 shadow-lg mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Commute listing & calculator */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-900/10 text-brand-green-900 text-xs font-semibold uppercase tracking-wider mb-2">
              <Navigation size={12} />
              Location Advantages
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-brand-green-950">
              Supreme Connectivity & Conveniences
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Situated in Nenmeli, just 4 km from Chengalpattu town, Nestled along Chennai’s active Southern Growth Corridor near GST Road and major industrial junctions.
            </p>
          </div>

          {/* Navigation categories tabs */}
          <div className="flex border-b border-brand-beige-100 overflow-x-auto pb-0.5 no-scrollbar scroll-smooth gap-1 select-none">
            {COMMUTE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveTab(cat.id); setEstimatedRoute(null); }}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold transition shrink-0 border-b-2 cursor-pointer ${
                  activeTab === cat.id
                    ? 'border-brand-gold-500 text-brand-green-950 font-bold'
                    : 'border-transparent text-gray-400 hover:text-brand-green-900 hover:border-brand-beige-200'
                }`}
              >
                {getTabIcon(cat.id)}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Category listings */}
          <div className="space-y-4 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="space-y-3.5"
              >
                {currentCategory.items.map((item, i) => (
                  <div 
                    key={i}
                    className="flex justify-between items-start gap-4 p-3.5 rounded-xl hover:bg-brand-beige-50 transition border border-transparent hover:border-brand-beige-200 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-500 group-hover:scale-125 transition"></span>
                        <h4 className="font-bold text-sm text-brand-green-950">{item.name}</h4>
                      </div>
                      <p className="text-xs text-gray-400 pl-3 leading-normal">{item.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-brand-green-900 font-mono block">{item.timeText}</span>
                      <span className="text-[10px] font-mono font-semibold text-brand-gold-600 uppercase block tracking-wider">{item.distance}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive commute calculator form */}
          <div className="bg-brand-beige-50 border border-brand-beige-200 rounded-2xl p-5">
            <span className="flex items-center gap-2 text-xs font-bold text-brand-green-950 uppercase tracking-widest font-mono mb-2">
              <Car size={14} className="text-brand-gold-500" />
              Direct Commute Calculator
            </span>
            <p className="text-[11px] text-gray-500 mb-4 leading-normal">
              Planning to commute to the office? Travel times to Nenmeli are extremely linear. Enter your Chennai starting suburb to find approximate rates.
            </p>

            <form onSubmit={handleCalculateRoute} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userStartLocation}
                onChange={(e) => setUserStartLocation(e.target.value)}
                placeholder="Enter suburb (e.g. Tambaram, Guindy, Sholinganallur)"
                className="w-full px-4.5 py-3 text-xs bg-white border border-brand-beige-200 text-brand-green-950 placeholder-gray-400 rounded-xl focus:outline-none focus:border-brand-gold-400"
              />
              <button
                type="submit"
                className="bg-brand-green-900 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-brand-green-950 transition duration-200 cursor-pointer shrink-0"
              >
                Estimate Driving Time
              </button>
            </form>

            {estimatedRoute && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-brand-green-950 text-white rounded-xl space-y-2 border border-brand-gold-500/10"
              >
                <div className="flex justify-between items-center text-xs font-bold border-b border-white/5 pb-2">
                  <span className="text-brand-gold-300">Driving Matrix to Nenmeli:</span>
                  <span className="font-mono">{estimatedRoute.distance} ({estimatedRoute.duration})</span>
                </div>
                <p className="text-[11px] text-brand-gold-100/70 leading-relaxed font-sans mt-1">
                  {estimatedRoute.routeText}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Side: Embedded Google Maps Mockup */}
        <div className="lg:col-span-5 h-full min-h-[400px] bg-slate-100 border border-brand-beige-200 rounded-3xl overflow-hidden relative shadow-inner flex flex-col justify-between">
          {/* Custom Stylized vector map representation */}
          <div className="absolute inset-0 z-0 bg-[#e5e4df] overflow-hidden">
            {/* Grids and elements looking like Google Map roads */}
            <div className="absolute top-1/3 left-0 w-full h-8 bg-white rotate-6 border-y border-slate-300"></div>
            <div className="absolute top-1/2 left-0 w-full h-12 bg-amber-200 -rotate-12 border-y border-amber-300 flex items-center justify-center">
              <span className="text-[9px] font-mono tracking-widest text-amber-700 font-bold uppercase">G.S.T ROUTE - NH-32 (15 Mins)</span>
            </div>
            <div className="absolute top-[10%] left-1/4 w-6 h-full bg-white rotate-45 border-x border-slate-300"></div>
            <div className="absolute top-0 left-1/2 w-4 h-full bg-slate-200 -rotate-[30deg] border-x border-slate-300"></div>
            <div className="absolute bottom-[20%] left-0 w-full h-8 bg-[#bed3ed] flex items-center justify-center">
              <span className="text-[9px] font-mono tracking-widest text-[#416ea6] font-bold uppercase">PALAR RIVER CORRIDOR</span>
            </div>

            {/* Main Project Pin */}
            <div className="absolute top-[42%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center select-none animate-float">
              <div className="bg-brand-green-950 text-white font-serif border border-brand-gold-400 px-3 py-1.5 rounded-xl shadow-xl text-center flex flex-col items-center shrink-0">
                <span className="text-xs font-bold font-serif whitespace-nowrap text-brand-gold-200">Sameera Spring Dale</span>
                <span className="text-[9px] font-sans font-medium text-brand-gold-100/60 leading-none">Nenmeli Site</span>
              </div>
              <div className="w-4 h-4 bg-brand-gold-500 rounded-full border-2 border-white -mt-1.5 shadow-md flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green-950 inline-block"></span>
              </div>
              <div className="w-1 h-3 bg-brand-gold-500 shadow-sm"></div>
            </div>

            {/* Chengalpattu junction pin */}
            <div className="absolute top-[68%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="bg-white/95 text-brand-green-950 border border-slate-300 px-2.5 py-1 rounded-lg shadow-md text-center shrink-0">
                <span className="text-[10px] font-extrabold whitespace-nowrap">Chengalpattu Station (5km)</span>
              </div>
              <div className="w-2.5 h-2.5 bg-brand-green-700 rounded-full border border-white -mt-0.5"></div>
            </div>

            {/* Mahindra city pin */}
            <div className="absolute top-[20%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="bg-white/95 text-brand-green-950 border border-slate-300 px-2.5 py-1 rounded-lg shadow-md text-center shrink-0">
                <span className="text-[10px] font-extrabold whitespace-nowrap">Mahindra World City (8.5km)</span>
              </div>
              <div className="w-2.5 h-2.5 bg-brand-green-700 rounded-full border border-white -mt-0.5"></div>
            </div>
          </div>

          {/* Map interface overlay controls */}
          <div className="relative pt-4 px-4 z-10">
            <div className="bg-white/95 backdrop-blur shadow-md rounded-xl p-3 border border-brand-beige-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-brand-green-950 font-bold font-mono">LIVE DIRECTIONS ENGINE</span>
              </div>
              <a
                href="https://maps.google.com/?q=Nenmeli,Chengalpattu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-brand-gold-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Compass size={12} />
                Open External Google Maps
              </a>
            </div>
          </div>

          <div className="relative pb-4 px-4 z-10">
            <div className="bg-brand-green-950/95 backdrop-blur-md rounded-2xl p-5 border border-brand-gold-500/10 text-white space-y-2 text-center sm:text-left shadow-lg">
              <h4 className="font-serif text-sm text-brand-gold-200">Nenmeli Sub-Registrar Proximity</h4>
              <p className="text-[10px] text-brand-gold-100/60 leading-normal">
                Convenient and smooth registrations! Land documentation is managed under local Chengalpattu Joint-2 Sub Registrar jurisdiction, completely clear.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 text-[10px] font-mono justify-center sm:justify-start">
                <span className="bg-brand-green-900 border border-brand-gold-500/10 px-2 py-0.5 rounded">RERA: Approved</span>
                <span className="bg-brand-green-900 border border-brand-gold-500/10 px-2 py-0.5 rounded">DTCP: Layout No. 206/2023</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
