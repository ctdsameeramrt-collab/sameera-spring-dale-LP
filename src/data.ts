// Structured Static Data for Sameera Spring Dale Gated Community

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to resolve Lucide Icon
  tag: string;
}

export interface LocationItem {
  name: string;
  distance: string;
  timeText: string;
  description: string;
}

export interface LocationCategory {
  id: string;
  title: string;
  items: LocationItem[];
}

export interface PlotData {
  id: string;
  plotNumber: string;
  sizeSqFt: number;
  facing: 'East' | 'North' | 'South' | 'West';
  dimensions: string;
  totalPriceLakhs: number;
  status: 'Available' | 'Selling Fast' | 'Reserved';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Where is Sameera Spring Dale located exactly?',
    answer: 'Sameera Spring Dale is located in Nenmeli, near Chengalpattu District, Tamil Nadu. It is strategically situated along the southern growth corridor of Chennai, just 4 km from Chengalpattu town center and 5 km from the Chengalpattu Railway Station.'
  },
  {
    id: 'faq-2',
    question: 'Who is the developer of this plotted development project?',
    answer: 'The project is proudly developed by Creative Township Developers, a part of the esteemed Sameera Groups or Sameera Lands & Constructions. Sameera Group is a highly trusted developer with more than 40 years of expertise and a track record of successfully delivering over 50 projects across Tamil Nadu.'
  },
  {
    id: 'faq-3',
    question: 'What legal approvals does Sameera Spring Dale have?',
    answer: 'Sameera Spring Dale is 100% legally compliant. It has received DTCP approval with Layout No. 206/2023, TN RERA approval with Registration No. TN/35/Layout/1420/2024, and local Gram Panchayat approval under Resolution No. 222. It features clear title, is ready for spot registration, and is ready for immediate villa construction.'
  },
  {
    id: 'faq-4',
    question: 'What are the plot sizes available in this community?',
    answer: 'We offer a wide range of plot sizes perfect for every family size and budget: 600 Sq.Ft, 800 Sq.Ft, 900 Sq.Ft, 1200 Sq.Ft, 1500 Sq.Ft, 1800 Sq.Ft, and up to 2117 Sq.Ft. These plots are ideally custom-proportioned for individual house, duplex villa constructions, or high-performing long-term land investments.'
  },
  {
    id: 'faq-5',
    question: 'What is the pricing range of the residential plots?',
    answer: 'The plots are priced highly competitively, ranging between ₹2,890 to ₹3,190 per Sq.Ft depending on the plot location, facing, and size. The starting price of a 600 Sq.Ft plot is ₹17.34 Lakhs. Standard 1200 Sq.Ft plots start from ₹34.68 Lakhs, with premium plots ranging up to approximately ₹61 Lakhs.'
  },
  {
    id: 'faq-6',
    question: 'Are bank loans available, and from which banks?',
    answer: 'Yes, because the project features complete legal clearances and RERA approval, bank loans are easily available from all leading public and private nationalized financial institutions. Pre-approved loan associations are active with State Bank of India (SBI), HDFC Bank, ICICI Bank, and Axis Bank, providing up to 80% loan eligibility based on individual profile approvals.'
  },
  {
    id: 'faq-7',
    question: 'How matches the connectivity to GST Road (NH-32) and Chennai?',
    answer: 'Sameera Spring Dale features superior connectivity. State Highway 58 (SH-58) is just 5 minutes away, while the grand GST Road (NH-32) is reached within 15 minutes. Chennai city limits are approximately 56 km away, and Tambaram, the southern gateway of Chennai, is reachable within 15-20 km via GST Road.'
  },
  {
    id: 'faq-8',
    question: 'Is there a sustainable water source at the site?',
    answer: 'Yes, one of the major strengths of Sameera Spring Dale at Nenmeli, Chengalpattu is the exceptional access to sweet, highly portable groundwater at a depth of approximately 30 feet. This ensures high water security and year-round convenience for residents making it highly ready to construct immediately.'
  },
  {
    id: 'faq-9',
    question: 'What infrastructure is already developed at the site?',
    answer: 'The developer has laid out comprehensive high-spec infrastructure, including architectural Entrance Archway with private security personnel, 30-feet and 22-feet wide internal three-layer Blacktop Roads, high-grade stormwater drains, decorative street lighting, dedicated children\'s layout park, badminton court, lush avenue tree plantations, and full perimeter fencing.'
  },
  {
    id: 'faq-10',
    question: 'Are there employment hubs nearby?',
    answer: 'Yes, the project is highly popular among professionals due to its proximity to the IT and Manufacturing Industrial Corridors. Mahindra World City – India\'s prestigious multi-sector Special Economic Zone hosting global technology and auto giants like Infosys, Capgemini, BMW and Renault – is just a 10-15 minute drive from the township.'
  },
  {
    id: 'faq-11',
    question: 'Which schools and educational institutions are situated nearby?',
    answer: 'Several highly reputed educational campuses surround Nenmeli, including Sree Gokulam Public School, Sivashakthi Academy, and Devi Saraswathi Trust School. Advanced college campuses nearby include Government Law College Chengalpattu, Asan Memorial Dental College, and Chengalpattu Government Medical College.'
  },
  {
    id: 'faq-12',
    question: 'How close are healthcare and hospitals to the site?',
    answer: 'Multi-speciality and government healthcare institutes are in close reach: Balaji Multispeciality Hospital and Asan Memorial Hospital are within 10 minutes, and the massive Chengalpattu Government General Hospital is situated under 12 minutes away, ensuring top-tier medical care on demand.'
  },
  {
    id: 'faq-13',
    question: 'Can I start villa construction immediately after registration?',
    answer: 'Absolutely. The campus is fully developed with all internal roads, boundary demarcations, electricity utility provisions, and water access set up. Many families have locked in plots specifically for custom home designs – meaning the community is 100% ready-to-build, with immediate registration, clear pattas, and possession delivery.'
  },
  {
    id: 'faq-14',
    question: 'Is it safe for young families and retired folk?',
    answer: 'Yes, Sameera Spring Dale is built as a fully secure premium gated community with a 24/7 guarded security gatehouse, strict restricted access, comprehensive perimeter walls, round-the-clock CCTV surveillance, and dedicated street lighting, creating a warm, safe micro-environment for young children and retired couples.'
  },
  {
    id: 'faq-15',
    question: 'How do I book a site visit, and is it free?',
    answer: 'Site visits are 100% complimentary! We provide premium private cab services to pick you up and drop you back from any point in Chennai or Chengalpattu. You can book an air-conditioned site visit easily by clicking the "Book Site Visit" CTA, submitting the form with your date, or instantly launching a chat on our WhatsApp / calling our desk.'
  },
  {
    id: 'faq-16',
    question: 'What is the step-by-step buying and registration process?',
    answer: 'Our transparent transactional pipeline is highly seamless: 1. Choose your preferred plot dimension using our master plan. 2. Book an on-site visit to inspect boundaries. 3. Finalize your plot with a nominal booking advance. 4. Our specialized panel assists with quick legal documentation check and bank loan approval setup. 5. Complete registration at the sub-registrar office. 6. Receive immediate physical possession and start constructing your dream home.'
  }
];

export const AMENITIES: AmenityItem[] = [
  {
    id: 'amen-1',
    title: 'Three-Layer Blacktop Roads',
    description: 'Extensively wide 30 feet and 22 feet internal blacktop tarmac roads built to municipal specifications with concrete boundaries.',
    iconName: 'Navigation',
    tag: 'Infrastructure'
  },
  {
    id: 'amen-2',
    title: '24×7 Premium Gated Security',
    description: 'Fully secure environment with controlled access gateway, concrete security kiosk, vigilant security guards, and private perimeter.',
    iconName: 'ShieldCheck',
    tag: 'Safety'
  },
  {
    id: 'amen-3',
    title: 'Surrounding CCTV Surveillance',
    description: 'Fully active high-definition closed-circuit visual systems guarding the entrance, intersections, and parks for peak family security.',
    iconName: 'Camera',
    tag: 'Safety'
  },
  {
    id: 'amen-4',
    title: 'Storm Water Drains',
    description: 'Proactively designed brick-lined open or closed storm drains running along both sides of internal roads for absolute water drainage.',
    iconName: 'CloudRain',
    tag: 'Infrastructure'
  },
  {
    id: 'amen-5',
    title: 'Landscaped Central Park',
    description: 'Expansive community zone with ornamental landscaping, lush grassy lawns, seasonal flower beds, and custom shady garden sitting spaces.',
    iconName: 'Trees',
    tag: 'Leisure'
  },
  {
    id: 'amen-6',
    title: 'Modern Kids Play Area',
    description: 'Interactive play area for young toddlers and school children featuring colorful double slides, playground swings, and spring riders.',
    iconName: 'Sparkles',
    tag: 'Leisure'
  },
  {
    id: 'amen-7',
    title: 'Outdoor Badminton Court',
    description: 'Premium, fully leveled outdoor standard court with professional post fixtures, making sports active and in-community.',
    iconName: 'Trophy',
    tag: 'Sports'
  },
  {
    id: 'amen-8',
    title: 'Yoga & Meditation Deck',
    description: 'A dedicated, elevated smooth wooden or concrete platform shaded by ancient trees, perfect for mornings of mindfulness.',
    iconName: 'Activity',
    tag: 'Wellness'
  },
  {
    id: 'amen-9',
    title: 'Community Multi-Purpose Hall',
    description: 'Open-air or lightweight structure for hosting layout resident meetups, internal functions, celebrations, and security review meetings.',
    iconName: 'Users',
    tag: 'Social'
  },
  {
    id: 'amen-10',
    title: 'Street Lighting & Illumination',
    description: 'Densely spaced LED street pole lights along all internal pathways, making nighttime walks safe and peaceful with radiant glow.',
    iconName: 'Lightbulb',
    tag: 'Infrastructure'
  },
  {
    id: 'amen-11',
    title: 'High Portable Groundwater',
    description: 'Naturally pure, mineral-rich, completely portable groundwater easily reachable at an average of just 30 feet below ground level.',
    iconName: 'Droplet',
    tag: 'Utility'
  },
  {
    id: 'amen-12',
    title: 'Shaded Avenue Tree Plantation',
    description: 'Beautiful native ornamental green avenue trees planted along the sides of every plot boundary, enhancing fresh air and aesthetics.',
    iconName: 'Leaf',
    tag: 'Utility'
  }
];

export const COMMUTE_CATEGORIES: LocationCategory[] = [
  {
    id: 'transit',
    title: 'Transit & Connectivity',
    items: [
      { name: 'State Highway SH-58', distance: '1.2 km', timeText: '5 Mins', description: 'Immediate double-lane highspeed road access' },
      { name: 'Chengalpattu Railway Station', distance: '5 km', timeText: '10 Mins', description: 'Major southern commuter railway junction linking local electric trains to Chennai' },
      { name: 'GST Road (NH-32)', distance: '6.5 km', timeText: '15 Mins', description: 'Chennai\'s main southern commercial development lifeline' },
      { name: 'Nenmeli Bus Stand', distance: '1 km', timeText: '5 Mins', description: 'Step-out public transport bus routes' },
      { name: 'Tambaram Gateway', distance: '38 km', timeText: '35 Mins', description: 'Direct corridor highway run to Outer Ring Road links' }
    ]
  },
  {
    id: 'employment',
    title: 'Employment Corridors',
    items: [
      { name: 'Mahindra World City', distance: '8.5 km', timeText: '12 Mins', description: 'India\'s epic 1500-acre integrated city employing 50,000+ professionals' },
      { name: 'Infosys Tech Park Campus', distance: '9 km', timeText: '14 Mins', description: 'One of APAC\'s largest IT services development campuses' },
      { name: 'Capgemini Tech Center', distance: '9.2 km', timeText: '15 Mins', description: 'Top multinational IT consultancy hub' },
      { name: 'Maraimalai Nagar Industrial Hub', distance: '15 km', timeText: '20 Mins', description: 'Automotive and engineering cluster hosting tier-1 suppliers' }
    ]
  },
  {
    id: 'schools',
    title: 'Reputed Schools & Colleges',
    items: [
      { name: 'Sree Gokulam Public School', distance: '3.2 km', timeText: '8 Mins', description: 'Highly rated CBSE schooling' },
      { name: 'Sivashakthi Academy', distance: '3.5 km', timeText: '8 Mins', description: 'Elite matriculation and development academy' },
      { name: 'Devi Saraswathi Trust School', distance: '2.5 km', timeText: '6 Mins', description: 'Traditional academic excellence' },
      { name: 'Government Law College', distance: '4.5 km', timeText: '10 Mins', description: 'Distinguished judicial education' },
      { name: 'Asan Memorial Dental College', distance: '5 km', timeText: '12 Mins', description: 'Premium dental hospital and education campus' },
      { name: 'Chengalpattu Medical College', distance: '5.5 km', timeText: '12 Mins', description: 'Pioneering Tamil Nadu state medical university' }
    ]
  },
  {
    id: 'hospitals',
    title: 'Modern Healthcare & Hospitals',
    items: [
      { name: 'Balaji Multispeciality Hospital', distance: '4.2 km', timeText: '10 Mins', description: 'Advanced emergency & trauma treatment' },
      { name: 'Asan Memorial Hospital', distance: '5 km', timeText: '11 Mins', description: 'Multi-discipline outpatient and tertiary care center' },
      { name: 'Chengalpattu Government Hospital', distance: '5.4 km', timeText: '12 Mins', description: 'Massive multi-speciality state welfare hospital' }
    ]
  }
];

export const PLOTS_LIST: PlotData[] = [
  { id: 'P-01', plotNumber: 'A-01', sizeSqFt: 600, facing: 'East', dimensions: '20 x 30', totalPriceLakhs: 17.34, status: 'Reserved' },
  { id: 'P-02', plotNumber: 'A-02', sizeSqFt: 600, facing: 'East', dimensions: '20 x 30', totalPriceLakhs: 17.34, status: 'Available' },
  { id: 'P-03', plotNumber: 'A-03', sizeSqFt: 800, facing: 'North', dimensions: '20 x 40', totalPriceLakhs: 23.12, status: 'Available' },
  { id: 'P-04', plotNumber: 'A-04', sizeSqFt: 900, facing: 'North', dimensions: '22.5 x 40', totalPriceLakhs: 26.01, status: 'Selling Fast' },
  { id: 'P-05', plotNumber: 'A-05', sizeSqFt: 1200, facing: 'East', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Available' },
  { id: 'P-06', plotNumber: 'A-06', sizeSqFt: 1200, facing: 'East', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Selling Fast' },
  { id: 'P-07', plotNumber: 'A-07', sizeSqFt: 1500, facing: 'West', dimensions: '30 x 50', totalPriceLakhs: 43.35, status: 'Reserved' },
  { id: 'P-08', plotNumber: 'A-08', sizeSqFt: 1800, facing: 'North', dimensions: '30 x 60', totalPriceLakhs: 52.02, status: 'Available' },
  { id: 'P-09', plotNumber: 'A-09', sizeSqFt: 2117, facing: 'South', dimensions: '35 x 60.5', totalPriceLakhs: 61.18, status: 'Selling Fast' },
  { id: 'P-10', plotNumber: 'B-01', sizeSqFt: 600, facing: 'South', dimensions: '20 x 30', totalPriceLakhs: 17.34, status: 'Available' },
  { id: 'P-11', plotNumber: 'B-02', sizeSqFt: 800, facing: 'North', dimensions: '20 x 40', totalPriceLakhs: 23.12, status: 'Available' },
  { id: 'P-12', plotNumber: 'B-03', sizeSqFt: 900, facing: 'East', dimensions: '22.5 x 40', totalPriceLakhs: 26.01, status: 'Available' },
  { id: 'P-13', plotNumber: 'B-04', sizeSqFt: 1200, facing: 'East', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Reserved' },
  { id: 'P-14', plotNumber: 'B-05', sizeSqFt: 1200, facing: 'West', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Available' },
  { id: 'P-15', plotNumber: 'B-06', sizeSqFt: 1500, facing: 'North', dimensions: '30 x 50', totalPriceLakhs: 43.35, status: 'Available' },
  { id: 'P-16', plotNumber: 'B-07', sizeSqFt: 1800, facing: 'East', dimensions: '30 x 60', totalPriceLakhs: 52.02, status: 'Selling Fast' },
  { id: 'P-17', plotNumber: 'C-01', sizeSqFt: 600, facing: 'North', dimensions: '20 x 30', totalPriceLakhs: 17.34, status: 'Available' },
  { id: 'P-18', plotNumber: 'C-02', sizeSqFt: 600, facing: 'North', dimensions: '20 x 30', totalPriceLakhs: 17.34, status: 'Available' },
  { id: 'P-19', plotNumber: 'C-03', sizeSqFt: 800, facing: 'East', dimensions: '20 x 40', totalPriceLakhs: 23.12, status: 'Reserved' },
  { id: 'P-20', plotNumber: 'C-04', sizeSqFt: 900, facing: 'West', dimensions: '22.5 x 40', totalPriceLakhs: 26.01, status: 'Available' },
  { id: 'P-21', plotNumber: 'C-05', sizeSqFt: 1200, facing: 'South', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Available' },
  { id: 'P-22', plotNumber: 'C-06', sizeSqFt: 1200, facing: 'East', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Selling Fast' },
  { id: 'P-23', plotNumber: 'C-07', sizeSqFt: 1500, facing: 'North', dimensions: '30 x 50', totalPriceLakhs: 43.35, status: 'Available' },
  { id: 'P-24', plotNumber: 'C-08', sizeSqFt: 1800, facing: 'West', dimensions: '30 x 60', totalPriceLakhs: 52.02, status: 'Available' },
  { id: 'P-25', plotNumber: 'D-01', sizeSqFt: 600, facing: 'West', dimensions: '20 x 30', totalPriceLakhs: 17.34, status: 'Available' },
  { id: 'P-26', plotNumber: 'D-02', sizeSqFt: 800, facing: 'South', dimensions: '20 x 40', totalPriceLakhs: 23.12, status: 'Available' },
  { id: 'P-27', plotNumber: 'D-03', sizeSqFt: 900, facing: 'North', dimensions: '22.5 x 40', totalPriceLakhs: 26.01, status: 'Reserved' },
  { id: 'P-28', plotNumber: 'D-04', sizeSqFt: 1200, facing: 'East', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Available' },
  { id: 'P-29', plotNumber: 'D-05', sizeSqFt: 1200, facing: 'West', dimensions: '30 x 40', totalPriceLakhs: 34.68, status: 'Available' },
  { id: 'P-30', plotNumber: 'D-06', sizeSqFt: 1500, facing: 'East', dimensions: '30 x 50', totalPriceLakhs: 43.35, status: 'Selling Fast' },
  { id: 'P-31', plotNumber: 'D-07', sizeSqFt: 1800, facing: 'South', dimensions: '30 x 60', totalPriceLakhs: 52.02, status: 'Available' },
  { id: 'P-32', plotNumber: 'D-08', sizeSqFt: 2117, facing: 'North', dimensions: '35 x 60.5', totalPriceLakhs: 61.18, status: 'Available' }
];

export const IMAGES_MAP = {
  entrance: '/src/assets/images/entrance_arch_1782124293496.jpg',
  roads: '/src/assets/images/blacktop_roads_1782124312370.jpg',
  park: '/src/assets/images/childrens_park_1782124327762.jpg',
  layout: '/src/assets/images/master_layout_1782124346578.jpg'
};
