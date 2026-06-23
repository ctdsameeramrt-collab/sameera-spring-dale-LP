import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Check, Phone, MessageSquare, Download, MapPin, 
  Award, History, Sparkles, Clock, Compass, Grid, FileText, 
  ChevronRight, ArrowRight, ShieldAlert, CheckCircle2, Bookmark,
  TrendingUp, TreePine, Droplets, Users, BookOpen
} from 'lucide-react';

// Static Data & Modular Components
import { AMENITIES, PLOTS_LIST, PlotData, IMAGES_MAP } from './data';
import Header from './components/Header';
import LeadForm from './components/LeadForm';
import EnquiryModal from './components/EnquiryModal';
import InteractivePlotMap from './components/InteractivePlotMap';
import PricingCalculator from './components/PricingCalculator';
import LocationAdvantages from './components/LocationAdvantages';
import FAQSection from './components/FAQSection';
import LeadsDashboard from './components/LeadsDashboard';

export default function App() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    source: string;
    defaultPlotSize: string;
    actionType: 'brochure' | 'price' | 'visit' | 'general';
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    source: '',
    defaultPlotSize: '',
    actionType: 'general'
  });

  // Inject SEO JSON-LD schema into the document head on component mount
  useEffect(() => {
    // 1. FAQ schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where is Sameera Spring Dale located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sameera Spring Dale is situated in Nenmeli, near Chengalpattu District, Tamil Nadu. It is 4 km from Chengalpattu Railway Station and 15 mins from GST Road (NH-32)."
          }
        },
        {
          "@type": "Question",
          "name": "What are the plot sizes and pricing at Sameera Spring Dale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Plot sizes span 600, 800, 900, 1200, 1500, 1800, and 2117 Sq.Ft. Prices range from ₹2,890 to ₹3,190 per Sq.Ft, starting from ₹17.34 Lakhs."
          }
        },
        {
          "@type": "Question",
          "name": "Is Sameera Spring Dale DTCP and RERA approved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it is legally certified. It has DTCP Layout Number 206/2023, TN RERA Number TN/35/Layout/1420/2024, and Gram Panchayat Resolution No. 222."
          }
        }
      ]
    };

    // 2. Local Business Schema
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Sameera Spring Dale Chengalpattu",
      "image": IMAGES_MAP.entrance,
      "priceRange": "₹17,340,00 - ₹61,180,00",
      "telephone": "+919444490234",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nenmeli, Chengalpattu",
        "addressLocality": "Chengalpattu",
        "addressRegion": "TN",
        "postalCode": "603001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.6841",
        "longitude": "79.9981"
      }
    };

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.id = 'faq-schema-json';
    scriptFaq.text = JSON.stringify(faqSchema);

    const scriptBusiness = document.createElement('script');
    scriptBusiness.type = 'application/ld+json';
    scriptBusiness.id = 'business-schema-json';
    scriptBusiness.text = JSON.stringify(businessSchema);

    document.head.appendChild(scriptFaq);
    document.head.appendChild(scriptBusiness);

    // Update webpage meta title
    document.title = "Sameera Spring Dale | Premium RERA Approved Villa Plots in Chengalpattu";

    return () => {
      const existingFaq = document.getElementById('faq-schema-json');
      const existingBusiness = document.getElementById('business-schema-json');
      if (existingFaq) existingFaq.remove();
      if (existingBusiness) existingBusiness.remove();
    };
  }, []);

  const openEnquiryModal = (
    title: string, 
    subtitle: string, 
    source: string, 
    actionType: 'brochure' | 'price' | 'visit' | 'general',
    defaultPlotSize: string = ''
  ) => {
    setModalState({
      isOpen: true,
      title,
      subtitle,
      source,
      defaultPlotSize,
      actionType
    });
  };

  const closeEnquiryModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handlePlotSelectInquiry = (plot: PlotData) => {
    openEnquiryModal(
      `Enquire About Plot ${plot.plotNumber}`,
      `Lock-in rate for are of ${plot.sizeSqFt} Sq.Ft (${plot.dimensions}), ${plot.facing} facing, starting at ₹${plot.totalPriceLakhs} Lakhs*.`,
      `Interactive layout enquiry - Plot ${plot.plotNumber}`,
      'general',
      `${plot.sizeSqFt} Sq.Ft`
    );
  };

  const handleCalculatorInquiry = (customPlot: Partial<PlotData>) => {
    openEnquiryModal(
      'Exclusive Cost Sheet Requested',
      `Receive physical brochure, legal files, bank pre-approval checklist, and custom estimation details for plot size ${customPlot.sizeSqFt} Sq.Ft*`,
      'Cost Estimator submission link',
      'price',
      `${customPlot.sizeSqFt} Sq.Ft`
    );
  };

  // High-Trust Badges data
  const trustBadges = [
    { title: 'DTCP Approved', desc: 'Layout No: 206/2023', code: 'DTCP' },
    { title: 'RERA Listed', desc: 'TN/35/Layout/1420/2024', code: 'RERA' },
    { title: 'Panchayat Approved', desc: 'Resolution No: 222', code: 'LBA' },
    { title: 'Ready to Construct', desc: 'Clear Titles & immediate registration', code: 'PRO' },
    { title: 'Up to 80% Loan Support', desc: 'SBI, HDFC, ICICI, Axis Bank approvals', code: 'FIN' }
  ];

  return (
    <div className="min-h-screen bg-brand-beige-50 text-gray-800 font-sans selection:bg-brand-gold-300 selection:text-brand-green-950">
      
      {/* 1. Header Navigation Component */}
      <Header onOpenEnquiryModal={openEnquiryModal} />

      {/* Spacing for fixed header */}
      <div className="h-[60px] md:h-[68px]" />

      {/* 2. Hero Section: Premium, High-Influence CRO */}
      <section id="overview" className="relative bg-brand-green-950 pb-16 pt-12 md:py-24 text-white overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,157,83,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading and value props */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              
              {/* Trust Badge Pill */}
              <div className="inline-flex flex-wrap items-center gap-2 bg-brand-green-900/60 border border-brand-gold-500/20 px-3.5 py-1.5 rounded-full text-xs">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-brand-gold-200 font-bold uppercase tracking-wider font-mono">TN RERA Registered Gated Community</span>
              </div>

              {/* Title & Headline (SEO rich) */}
              <div className="space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-gold-100 tracking-tight leading-[1.1] font-normal">
                  Premium Villa Plots in <br />
                  <span className="text-gold-gradient font-bold">Nenmeli, Chengalpattu</span>
                </h1>
                <p className="text-brand-beige-100 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                  Own your independent residential land plot inside an 8.55-acre legally compliant gated community township. Starting from <span className="text-brand-gold-300 text-lg font-mono font-extrabold">₹17.34 Lakhs*</span> onwards.
                </p>
              </div>

              {/* Badges strip on Hero for extreme trust */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-brand-green-900/40 border border-brand-gold-500/10 p-3.5 rounded-xl">
                  <span className="text-[10px] text-brand-gold-300 uppercase tracking-wider font-extrabold block">DTCP approved</span>
                  <span className="text-xs font-bold font-mono text-white">Layout 206/2023</span>
                </div>
                <div className="bg-brand-green-900/40 border border-brand-gold-500/10 p-3.5 rounded-xl">
                  <span className="text-[10px] text-brand-gold-300 uppercase tracking-wider font-extrabold block">RERA certified</span>
                  <span className="text-xs font-bold font-mono text-white">TN/35/Layout/1420/2024</span>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-brand-green-900/40 border border-brand-gold-400/20 p-3.5 rounded-xl flex items-center justify-center gap-1.5 text-center">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-300">Ready To Build</span>
                </div>
              </div>

              {/* Primary Call to actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openEnquiryModal(
                    'Get Premium Brochure & Cost Sheets',
                    'Submit details below to download high-resolution maps, layouts, and cost sheets instantly.',
                    'Hero Download Brochure CTA',
                    'brochure'
                  )}
                  type="button"
                  className="bg-gold-gradient hover:shadow-brand-gold-500/20 text-white font-extrabold py-4 px-7 rounded-xl transition duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2 group cursor-pointer shadow-lg text-sm"
                >
                  <Download size={16} className="group-hover:animate-bounce" />
                  <span>Download Project Brochure</span>
                </button>
                
                <button
                  onClick={() => openEnquiryModal(
                    'Book A Premium Cab Site Tour',
                    'Complimentary private pickup & drops are organized for you and your family to visit Nenmeli site.',
                    'Hero site visit direct CTA',
                    'visit'
                  )}
                  type="button"
                  className="bg-brand-green-900 hover:bg-brand-green-800 text-brand-gold-200 border border-brand-gold-500/20 font-bold py-4 px-7 rounded-xl transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Clock size={16} />
                  <span>Book Free AC Site Visit</span>
                </button>
              </div>

              {/* Real-time statistics context to drive trust */}
              <div className="pt-4 border-t border-white/5 flex gap-6 text-xs text-brand-gold-100/60 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>143 Total Premium Plots</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Immediate Registration</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero High Conversion Form & Image */}
            <div className="lg:col-span-5">
              <div className="bg-brand-green-900 border border-brand-gold-500/20 rounded-2xl md:rounded-3xl p-6 shadow-2xl relative">
                <div className="absolute -top-3.5 -right-3 bg-brand-gold-500 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-full tracking-widest uppercase shadow">
                  Priority Spot Offer
                </div>

                <div className="mb-5 text-center">
                  <h3 className="font-serif text-xl md:text-2xl text-brand-gold-200">Express Interest</h3>
                  <p className="text-[11px] text-brand-gold-100/60 mt-1">Submit your parameters to unlock private developer pricing and callback</p>
                </div>

                {/* Form rendered natively */}
                <LeadForm source="Hero Direct Inquiry Box" compact={true} submitButtonText="Request Special Cost Sheet" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Real Project Assets / Grid Introduction */}
      <section id="highlights" className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-900/10 text-brand-green-900 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award size={12} />
              Project Highlights
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-green-950 font-normal">
              Introducing <span className="font-bold">Sameera Spring Dale</span> Gated Township
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Designed as a lush, organized residential plotted community, Sameera Spring Dale merges pristine nature with complete legal safety and city connectivity.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { title: '8.55 Acres', desc: 'Total community size across 2 premium phases', icon: <Compass className="text-brand-green-800" /> },
              { title: '143 Plots', desc: 'Carefully sized residential subdivisions ready to buy', icon: <Grid className="text-brand-green-800" /> },
              { title: '600–2117 Sq.Ft', desc: 'A wide variance of dimensions suited to all budgets', icon: <FileText className="text-brand-green-800" /> },
              { title: '₹17.34 Lakhs*', desc: 'Competitively priced start rate with pre-approved loans', icon: <Sparkles className="text-brand-green-800" /> }
            ].map((metric, idx) => (
              <div key={idx} className="bg-white border border-brand-beige-200 rounded-2xl p-5 hover:shadow-md transition">
                <div className="p-2 w-10 h-10 bg-brand-beige-50 rounded-lg flex items-center justify-center mb-3">
                  {metric.icon}
                </div>
                <h4 className="font-serif text-xl md:text-2xl text-brand-green-950 font-bold">{metric.title}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-normal font-medium">{metric.desc}</p>
              </div>
            ))}
          </div>

          {/* Developer Credibility Banner */}
          <div className="bg-brand-green-950 text-white rounded-3xl p-6 md:p-8 border border-brand-gold-500/10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-brand-gold-300 bg-brand-green-900 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
                  <History size={12} />
                  Developer Heritage: Creative Township Developers
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-gold-200">
                  Built on 40+ Years of Unwavering Trust
                </h3>
                <p className="text-xs md:text-sm text-brand-gold-100/80 leading-relaxed max-w-2xl">
                  Sameera Group (Creative Township Developers) stands as one of South India's premium real estate design houses. With over <span className="text-[#dfbf80] font-bold">50 delivered projects</span>, our layouts are globally admired for their legal transparency, high building qualities, and excellent appreciation yields.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
                <div className="bg-brand-green-900 border border-brand-gold-500/10 p-4 rounded-2xl">
                  <span className="text-2xl font-extrabold text-white block">50+</span>
                  <span className="text-[10px] text-brand-gold-100/60 uppercase font-bold tracking-wider">Completed communities across TN</span>
                </div>
                <button
                  onClick={() => openEnquiryModal(
                    'Request Title Documents & Proof',
                    'Request the complete legal files, including Parent Deeds, Patta, DTCP layout blueprints, and RERA approval forms.',
                    'Heritage Title files request',
                    'brochure'
                  )}
                  type="button"
                  className="bg-gold-gradient text-white text-xs font-bold py-3.5 px-4 rounded-xl text-center shadow-lg active:scale-[0.98] transition cursor-pointer"
                >
                  Verify Legal Clearances
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Pricing and Estimation Calculator Section */}
      <section id="pricing" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <PricingCalculator onQuoteEnquiry={handleCalculatorInquiry} />
        </div>
      </section>

      {/* 5. Gated Community Lifestyle & Amenities */}
      <section id="amenities" className="py-16 bg-brand-beige-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-900/10 text-brand-green-900 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award size={12} />
              Community Amenities
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-green-950 font-normal">
              A Class Apart: <span className="font-bold">Premium Amenities</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Sameera Spring Dale incorporates high-spec internal features that enhance comfort, safety, and healthy outdoor activities for your entire family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES.map((amen) => {
              // Safe resolve of essential lucide icons
              const renderIcon = () => {
                switch(amen.iconName) {
                  case 'Navigation': return <TrendingUp className="text-brand-green-900" size={20} />;
                  case 'ShieldCheck': return <ShieldCheck className="text-brand-green-900" size={20} />;
                  case 'Camera': return <Compass className="text-brand-green-900" size={20} />;
                  case 'CloudRain': return <Droplets className="text-brand-green-900" size={20} />;
                  case 'Trees': return <TreePine className="text-brand-green-900" size={20} />;
                  case 'Sparkles': return <Sparkles className="text-brand-green-900" size={20} />;
                  case 'Trophy': return <Award className="text-brand-green-900" size={20} />;
                  case 'Activity': return <TrendingUp className="text-brand-green-900" size={20} />;
                  case 'Users': return <Users className="text-brand-green-900" size={20} />;
                  case 'Lightbulb': return <Sparkles className="text-brand-green-900" size={20} />;
                  case 'Droplet': return <Droplets className="text-brand-green-900" size={20} />;
                  case 'Leaf': return <TreePine className="text-brand-green-900" size={20} />;
                  default: return <Award className="text-brand-green-900" size={20} />;
                }
              };

              return (
                <div 
                  key={amen.id}
                  className="bg-white border border-brand-beige-200 rounded-2xl p-6 transition-all duration-350 hover:shadow-lg group hover:border-[#dfbf80]/30"
                >
                  <div className="p-3 w-12 h-12 bg-brand-beige-100 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#f5ebce]">
                    {renderIcon()}
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-gold-600 bg-brand-gold-100 px-2 py-0.5 rounded">
                    {amen.tag}
                  </span>
                  <h4 className="font-serif text-lg text-brand-green-950 font-bold mt-2.5 group-hover:text-brand-green-900 transition-colors">
                    {amen.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {amen.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Highlight of Groundwater source */}
          <div className="mt-12 bg-[#ecfdf5] border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl shrink-0 h-12 w-12 flex items-center justify-center">
                <Droplets size={24} />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider font-mono">Portable Groundwater at ~30 Feet</span>
                <h4 className="font-serif text-lg text-brand-green-950 font-semibold leading-normal">
                  Abundant Supply of Pure, Sweet Water
                </h4>
                <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
                  Unlike many dry parts of surrounding Chennai, the Nenmeli water-table is extremely robust, providing highly portable municipal-grade sweet ground water at a depth of roughly 30 feet, guaranteeing future secure living.
                </p>
              </div>
            </div>

            <button
              onClick={() => openEnquiryModal(
                'Schedule Groundwater Inspection',
                'Schedule a site visit where we can physically show you the fully operational borewell setups inside the township.',
                'Groundwater detail block site click',
                'visit'
              )}
              type="button"
              className="px-5 py-3 bg-brand-green-900 hover:bg-brand-green-950 text-white rounded-xl text-xs font-bold transition duration-200 cursor-pointer shrink-0 text-center select-none"
            >
              Verify On Site
            </button>
          </div>

        </div>
      </section>

      {/* 6. Location Advantages & Connectivity Map */}
      <section id="location" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <LocationAdvantages />
        </div>
      </section>

      {/* 7. Master Layout Interactive Plan Selector */}
      <section id="layout" className="py-12 bg-brand-beige-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <InteractivePlotMap onPlotSelect={handlePlotSelectInquiry} />
        </div>
      </section>

      {/* 8. Photo Gallery of Real Generated Project Site Shots */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-900/10 text-brand-green-900 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen size={12} />
              Layout Gallery
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-green-950 font-normal">
              Actual Project <span className="font-bold">Project Developments</span> Gallery
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Explore layout infrastructure, standard entrances, and landscaped public play spaces designed exactly as seen on-site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group overflow-hidden rounded-2xl border border-brand-beige-200 bg-brand-beige-50 relative h-[250px] md:h-[300px] shadow-sm">
              <img 
                src={IMAGES_MAP.entrance} 
                alt="Elite Architectural Entrance Archway of Sameera Spring Dale Gated Community" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] text-brand-gold-300 font-mono font-bold tracking-widest uppercase">GATED ENTRANCE</span>
                <h4 className="text-white font-serif text-base font-bold mt-1">Design Architectural Portal Arch</h4>
                <p className="text-[11px] text-slate-300/80 mt-0.5 leading-normal">Premium 24×7 guardhouse and automated entry gate.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-brand-beige-200 bg-brand-beige-50 relative h-[250px] md:h-[300px] shadow-sm">
              <img 
                src={IMAGES_MAP.roads} 
                alt="Newly built Three-Layer Blacktop 30 Feet wide internal paths inside Sameera Spring Dale" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] text-brand-gold-300 font-mono font-bold tracking-widest uppercase">ROADS NETWORK</span>
                <h4 className="text-white font-serif text-base font-bold mt-1">30 Feet wide Tarmac internal road</h4>
                <p className="text-[11px] text-slate-300/80 mt-0.5 leading-normal">Featuring structural storm drains and dense LED illumination.</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-brand-beige-200 bg-brand-beige-50 relative h-[250px] md:h-[300px] shadow-sm">
              <img 
                src={IMAGES_MAP.park} 
                alt="Beautiful landscaped green central park with modern slides inside the layout" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] text-brand-gold-300 font-mono font-bold tracking-widest uppercase">LAYOUT SPACES</span>
                <h4 className="text-white font-serif text-base font-bold mt-1">Lush Landscaped Kids Park</h4>
                <p className="text-[11px] text-slate-300/80 mt-0.5 leading-normal">Featuring slide setups, outdoor badminton, and secure seating.</p>
              </div>
            </div>
          </div>

          {/* Map layout helper button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => openEnquiryModal(
                'Request Complete Legal Portfolio & Site Photos',
                'We will share a comprehensive PDF containing 35+ high-definition on-site layout photographs, drone footages, and registration files.',
                'Gallery detailed portfolio request',
                'brochure'
              )}
              type="button"
              className="inline-flex items-center gap-2 bg-brand-green-950 text-brand-gold-300 hover:text-white border border-brand-gold-400/20 hover:border-brand-gold-400 px-6 py-3.5 rounded-xl text-xs font-bold transition duration-200 shadow cursor-pointer select-none"
            >
              <Download size={14} />
              Download High-Res Site & Drone Photos Booklet (PDF)
            </button>
          </div>

        </div>
      </section>

      {/* 9. Why Invest in Nenmeli / Southern Chennai Growth Corridor (Editorial SEO Content Section) */}
      <section className="py-16 bg-brand-beige-50/70 border-y border-brand-beige-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Context analysis card */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-brand-gold-700 uppercase tracking-widest block font-mono">
                  Investment Spotlight
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-brand-green-950 font-normal">
                  Southern Chennai's <span className="font-bold">Next Residential Boom</span>
                </h2>
              </div>
              
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                Investments inside the <strong>Chengalpattu southern micro-market</strong> are compounding rapidly due to proximity to Chennai's main manufacturing and technology nodes. With <strong>Mahindra World City</strong> sitting just 15 minutes away, Nenmeli has transformed into the primary suburban destination for corporate employees looking to construct highly secure independent villas with affordable budgets.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3.5 items-start">
                  <div className="p-1.5 bg-brand-green-900 border border-brand-gold-500/10 rounded text-brand-gold-300 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-green-950">Mahindra World City Spillover</h4>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">Hosting global majors Infosys, Capgemini, BMW and Renault employing 50,000+ professionals demanding premium quality micro-villas.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-1.5 bg-brand-green-900 border border-brand-gold-500/10 rounded text-brand-gold-300 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-green-950">DTCP Approved Absolute Security</h4>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">Approved layouts guarantees highly institutional loans, clear boundaries, municipal water utilities access and high resale valuations.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="p-1.5 bg-brand-green-900 border border-brand-gold-500/10 rounded text-brand-gold-300 mt-0.5">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-green-950">Superior Rail-Road Corridor</h4>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">Convenient commuter railway trains from Chengalpattu Railway Station link to central Chennai within 45 to 60 mins smoothly.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Buying Journey Graphic Panel */}
            <div className="bg-brand-green-950 text-white rounded-3xl p-6 md:p-8 border border-brand-gold-500/20 shadow-2xl relative">
              <h3 className="font-serif text-xl text-brand-gold-200 mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
                <Clock size={18} className="text-brand-gold-400" />
                Transparent Buying Journey
              </h3>

              {/* Timber milestones */}
              <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-gold-500/20">
                {[
                  { step: '1', title: 'Pick Your Perfect Size', desc: 'Browse available blocks inside Phase-1 using our plot inspector.' },
                  { step: '2', title: 'Schedule AC Cab Tour', desc: 'Book a complimentary private cab site visits for your family.' },
                  { step: '3', title: 'Verify Legal Documentation', desc: 'Inspect layout approvals, parent deeds, and bank loan approvals.' },
                  { step: '4', title: 'Nominal Booking & Advance', desc: 'Secure your plot with a token booking advance and set registrars date.' },
                  { step: '5', title: 'Immediate registration', desc: 'Smooth processing with clear patta handed over within 24 hours.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 relative z-10">
                    <div className="w-9 h-9 rounded-full bg-brand-green-900 border border-brand-gold-400 text-brand-gold-300 flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-md">
                      {item.step}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-white">{item.title}</h4>
                      <p className="text-[11px] text-brand-gold-100/60 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Heavy Lead Generation Form Section (Page Foot CTA) */}
      <section className="py-16 bg-brand-green-950 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(194,157,83,0.1),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center">
          
          <div className="max-w-2xl mx-auto mb-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green-900 border border-brand-gold-500/20 text-brand-[#dfbf80] text-xs font-semibold uppercase tracking-wider font-mono">
              <Clock size={12} className="text-brand-gold-400" />
              Developer Desk Direct
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-gold-100">
              Schedule Your Free <span className="text-gold-gradient font-bold">VIP Site Visit</span>
            </h2>
            <p className="text-xs md:text-sm text-brand-gold-100/70 max-w-lg mx-auto leading-relaxed">
              Submit your inquiry to lock in premium rates, download full blueprints, and book an air-conditioned cab tour from anywhere in Chennai or Chengalpattu.
            </p>
          </div>

          <div className="bg-brand-green-900/60 border border-brand-gold-500/15 rounded-3xl p-6 md:p-8 text-left max-w-2xl mx-auto shadow-2xl">
            {/* The main lead form */}
            <LeadForm source="Page Footer Huge Lead Form" compact={false} submitButtonText="Request Immediate VIP Booking" />
          </div>

          {/* High conversions badge Strip */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs text-brand-gold-100/50">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" /> No hidden document fees
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" /> Zero brokerage commission
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" /> Pre-approved by top nationalized banks
            </span>
          </div>

        </div>
      </section>

      {/* 11. Searchable FAQ Desk Section */}
      <section id="faqs" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <FAQSection />
        </div>
      </section>

      {/* 12. Corporate Real Estate Footer */}
      <footer className="bg-[#05130b] text-white/70 py-12 border-t border-brand-gold-500/10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left developer desc */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex flex-col select-none">
                <span className="text-lg font-serif font-bold text-brand-gold-200 tracking-wider">SPRING DALE</span>
                <span className="text-[8px] font-sans text-brand-gold-100/40 font-bold tracking-widest uppercase mb-1">BY SAMEERA GROUPS</span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Sameera Spring Dale at Nenmeli, Chengalpattu is a premier residential plotted township engineered with premium class facilities and absolute legal titles.
              </p>
            </div>

            {/* Quick sections links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation Links</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#overview" className="hover:text-brand-gold-300 transition-colors">Project Overview</a></li>
                <li><a href="#highlights" className="hover:text-brand-gold-300 transition-colors">Layout Highlights</a></li>
                <li><a href="#pricing" className="hover:text-brand-gold-300 transition-colors">Pricing Estimates</a></li>
                <li><a href="#amenities" className="hover:text-brand-gold-300 transition-colors">Community Leisure</a></li>
                <li><a href="#location" className="hover:text-brand-gold-300 transition-colors">Location Mapping</a></li>
              </ul>
            </div>

            {/* Quick approvals status links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal Compliance</h4>
              <ul className="space-y-1.5 text-xs text-white/50">
                <li className="flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-400 shrink-0" />
                  <span>DTCP Layout No: 206/2023</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-400 shrink-0" />
                  <span>TN RERA: TN/35/Layout/1420/2024</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-400 shrink-0" />
                  <span>Panchayat Approved (No. 222)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-400 shrink-0" />
                  <span>Clear Titles & Patta Guaranteed</span>
                </li>
              </ul>
            </div>

            {/* Contact details desk */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Project Desk Office</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                <strong>Corporate Address:</strong><br />
                Sameera Groups Corporate Office,<br />
                Anna Nagar East, Chennai,<br />
                Tamil Nadu, India.
              </p>
              <div className="text-xs">
                <p className="font-semibold text-white">Direct Hotdesk:</p>
                <a href="tel:+919444490234" className="text-brand-gold-300 hover:underline font-mono">+91 94444 90234</a>
              </div>
            </div>
          </div>

          {/* RERA and legal marketing Partner disclaimer (Mandatory Indian real estate act compliance) */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="bg-[#0b2114]/80 border border-brand-gold-500/10 p-4 rounded-xl text-[10px] text-white/40 leading-relaxed">
              <strong>TN RERA Disclaimer:</strong> The information, visuals, and spatial representations contained in this website are for informational purposes only. This landing channel serves as an authorized lead registration node of Creative Township Developers / Sameera Groups / Sameera Lands & Constructions. Layout measurements, specifications, pricing ranges are derived exactly from Developer pricing plans and local registration laws. Final agreements will supersede estimates calculated on this landing portal. Registered Project ID: TN/35/Layout/1420/2024.
            </div>

            {/* Copyright and Dev toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30 pt-2 border-t border-white/5">
              <p>© 2026 Sameera Spring Dale. Authorized Lead Partner Channel. All Rights Reserved.</p>
              
              <div className="flex items-center gap-4">
                <a href="#overview" className="hover:text-white transition">Privacy Policy</a>
                <span>•</span>
                <a href="#overview" className="hover:text-white transition">Terms & Conditions</a>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    // Trigger custom event to open Local leads database
                    const customEvent = new CustomEvent('open_admin_dashboard_vault');
                    window.dispatchEvent(customEvent);
                  }}
                  className="hover:text-white/80 text-[9px] px-2 py-0.5 border border-white/10 rounded uppercase font-mono uppercase bg-slate-900 text-slate-400 flex items-center gap-1 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Local Leads Portal
                </button>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {/* 13. Double Overlay Enquiry Popup Dial Component */}
      <EnquiryModal
        isOpen={modalState.isOpen}
        onClose={closeEnquiryModal}
        title={modalState.title}
        subtitle={modalState.subtitle}
        source={modalState.source}
        defaultPlotSize={modalState.defaultPlotSize}
        actionType={modalState.actionType}
      />

      {/* 14. Local Admin Leads database Vault Counter & Slider */}
      <LeadsDashboard />

      {/* 15. Sticky Mobile Contact Bar (Extreme bottom rail for seamless conversion rates) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-green-950 border-t border-brand-gold-500/20 p-2.5 block lg:hidden shadow-2xl glass-nav">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          
          <a
            href="tel:+919444490234"
            className="flex flex-col items-center justify-center py-1.5 bg-brand-green-900 border border-brand-gold-400/20 rounded-xl text-brand-gold-300 transition active:bg-brand-green-800 min-h-[44px]"
          >
            <Phone size={14} />
            <span className="text-[10px] font-bold mt-0.5">Call Project</span>
          </a>

          <a
            href="https://wa.me/919444990234?text=Hi, can you share the Sameera Spring Dale pricing details and brochure with me?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 bg-emerald-600 rounded-xl text-white transition active:bg-emerald-500 min-h-[44px]"
          >
            <MessageSquare size={14} />
            <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
          </a>

          <button
            onClick={() => openEnquiryModal(
              'Exclusive VIP Booking Tour',
              'Lock-in rate for plots. Free air-conditioned site cab is scheduled upon request.',
              'Sticky lower screen bar CTA',
              'visit'
            )}
            type="button"
            className="flex flex-col items-center justify-center py-1.5 bg-gold-gradient rounded-xl text-white transition min-h-[44px] cursor-pointer"
          >
            <Bookmark size={14} />
            <span className="text-[10px] font-bold mt-0.5">Book Cab Tour</span>
          </button>

        </div>
      </div>

    </div>
  );
}
