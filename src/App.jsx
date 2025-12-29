import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, X, Instagram, Mail, Menu, Check,
  Cpu, XCircle, PhoneCall, BarChart, ShieldAlert, Users, Compass, 
  CheckCircle2, TrendingUp, Workflow, Clock, Lock, Phone, Send, Heart,
  ShieldCheck, FileText, Scale, Target, Lightbulb, Rocket, ChevronRight, ArrowLeft
} from 'lucide-react';

// ==========================================
// DATA & CONFIGURATION
// ==========================================

// Consolidated Calendly Configuration for Dark Theme consistency
const CALENDLY_BASE = "https://calendly.com/growvolt-us/30min";
// Dark theme params: bg=050509 (Dark), text=ffffff (White), primary=5b6fff (Brand Blue)
const CALENDLY_PARAMS = "?background_color=050509&text_color=ffffff&primary_color=5b6fff";
const CALENDLY_URL = `${CALENDLY_BASE}${CALENDLY_PARAMS}`;

const FOOTER_DATA = {
  brand: {
    name: "Growvolt",
    description: "We craft premium digital experiences that elevate brands and drive measurable results. Let's build something extraordinary together.",
    socials: [
      { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/growvolt.us/" },
      { name: "Mail", icon: Mail, href: "mailto:growvolt.us@gmail.com" },
      { name: "WhatsApp", icon: "whatsapp", href: "https://wa.me/919316821844" }
    ]
  },
  menus: [
    {
      title: "Navigation",
      items: [
        { label: 'Home', id: 'home' },
        { label: 'Services', id: 'services' },
        { label: 'Case Studies', id: 'casestudies' },
        { label: 'About', id: 'about' },
        { label: 'Contact', id: 'contact' }
      ]
    },
    {
      title: "Services",
      items: [
        { label: 'Growvolt Build', id: 'services' },
        { label: 'Growvolt Launch', id: 'services' },
        { label: 'Growvolt Scale', id: 'services' }
      ]
    }
  ],
  legal: [
    { label: 'Privacy Policy', id: 'privacy' },
    { label: 'Terms of Service', id: 'terms' }
  ]
};

const CASE_STUDIES_DATA = [
  {
    id: "01",
    name: "Alex M.",
    summaryTitle: "From Inconsistent Brand Deals to Predictable $6K/Month",
    followers: "28K",
    niche: "Weight Loss & Fitness",
    platform: "Instagram + Shorts",
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg",
    location: "USA"
  },
  {
    id: "02",
    name: "Natalie R.",
    summaryTitle: "Monetizing a “Free Advice” Audience",
    followers: "19K",
    niche: "Sustainable Fat Loss",
    platform: "Instagram",
    image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
    location: "USA"
  },
  {
    id: "03",
    name: "Daniel K.",
    summaryTitle: "Turning Views Into Ownership",
    followers: "34K",
    niche: "Busy Pro Fat Loss",
    platform: "Instagram + Reels",
    image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg",
    location: "USA"
  },
  {
    id: "04",
    name: "Priya S.",
    summaryTitle: "Side Hustle to Serious Revenue",
    followers: "22K",
    niche: "Beginner Specialist",
    platform: "Instagram",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
    location: "USA"
  }
];

// ==========================================
// SHARED UTILS
// ==========================================

const GlowText = ({ children }) => (
  <span className="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
    {children}
  </span>
);

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const WhatsAppIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const SectionDivider = () => (
  <div className="w-full flex justify-center relative z-20 pointer-events-none">
    <div className="w-full max-w-xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
  </div>
);

// ==========================================
// METHODOLOGY COMPONENTS
// ==========================================

const Bullet = ({ icon, title, desc }) => (
  <div className="group flex items-start gap-4">
    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-base md:text-lg font-bold text-white mb-0.5 font-sans">{title}</h4>
      <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors font-sans">{desc}</p>
    </div>
  </div>
);

const TestimonialCard = ({ initials, name, role, quote }) => (
  <div className="p-8 md:p-10 rounded-[2rem] bg-[#0f0f14] border border-white/5 relative group hover:border-blue-500/30 transition-all duration-300">
    <div className="absolute -top-4 left-10 p-2.5 rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-600/40">
      <Quote size={20} />
    </div>
    <p className="text-base md:text-lg text-gray-300 mb-10 italic leading-relaxed pt-4 font-sans">
      "{quote}"
    </p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm font-sans">
        {initials}
      </div>
      <div>
        <p className="text-sm md:text-base font-bold text-white font-sans">{name}</p>
        <p className="text-xs md:text-sm text-gray-500 font-medium tracking-wide uppercase font-sans">{role}</p>
      </div>
    </div>
  </div>
);

const MergedSections = () => {
  const [activeTab, setActiveTab] = useState('build');

  const tabs = [
    { id: 'build', label: 'Build' },
    { id: 'launch', label: 'Launch' },
    { id: 'scale', label: 'Scale' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'build':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-4xl md:text-6xl font-black text-blue-500/20 font-sans">01</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-sans">Growvolt Build</h3>
                <p className="text-sm md:text-base text-blue-500 font-semibold font-sans">The Precision Blueprint</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
              We discover the product already validated by your audience's struggles and your unique insight.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<Search size={18} />} title="Deep-Dive Research" desc="Analyzing audience pains and conversations—not just demographics." />
              <Bullet icon={<Lightbulb size={18} />} title="Knowledge Synthesis" desc="Auditing content to extract your unique transformative framework." />
              <Bullet icon={<Code size={18} />} title="Product Architecture" desc="Blueprinting the exact product at the intersection of demand and authority." />
              <Bullet icon={<Video size={18} />} title="Asset Creation" desc="Producing core content and materials for a premium user experience." />
            </div>
          </div>
        );
      case 'launch':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-4xl md:text-6xl font-black text-blue-500/20 font-sans">02</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-sans">Growvolt Launch</h3>
                <p className="text-sm md:text-base text-blue-500 font-semibold font-sans">Market Penetration</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
              We deploy your asset into the market with a conversion-optimized journey designed for high-trust sales.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<Compass size={18} />} title="Strategic Roadmap" desc="Coordinated deployment across social channels to build massive anticipation." />
              <Bullet icon={<Megaphone size={18} />} title="Hype Engineering" desc="Psychology-backed messaging that frames your asset as the ultimate solution." />
              <Bullet icon={<Layout size={18} />} title="Conversion Funnels" desc="High-converting landing pages designed to minimize friction and maximize sales." />
              <Bullet icon={<Target size={18} />} title="Launch Execution" desc="Managing the live intake, support, and tech to ensure a flawless buying experience." />
            </div>
          </div>
        );
      case 'scale':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-4xl md:text-6xl font-black text-blue-500/20 font-sans">03</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-sans">Growvolt Scale</h3>
                <p className="text-sm md:text-base text-blue-500 font-semibold font-sans">Sustainable Velocity</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
              We shift from one-time launch energy to automated growth systems that compound over time.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<TrendingUp size={18} />} title="Automated Funnels" desc="Evergreen systems that capture leads and close sales 24/7 autonomously." />
              <Bullet icon={<BarChart3 size={18} />} title="Data Optimization" desc="Iterative testing of copy and creative to lower acquisition costs and increase ROI." />
              <Bullet icon={<Repeat size={18} />} title="Retention Logic" desc="Upsell paths and community structures to maximize lifetime customer value." />
              <Bullet icon={<Zap size={18} />} title="Ecosystem Expansion" desc="Identifying secondary product opportunities to keep your growth compounding." />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a0f] text-white py-16 md:py-28 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Mobile-Optimized Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <p className="text-[10px] md:text-xs text-blue-400 font-bold uppercase tracking-[0.2em] font-sans">The Growvolt Methodology</p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] font-sans">
            Build, Launch, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">Scale.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-sans">
            We architect, build, and power digital assets that turn your insight into a growing revenue stream.
          </p>
        </div>

        {/* Improved Interactive Tabs */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="mb-8 p-1.5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-xl py-3.5 md:py-4 text-xs md:text-base font-bold transition-all duration-300 font-sans ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-[#0f0f14] p-8 md:p-14 shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
            {renderTabContent()}
          </div>
        </div>

        {/* Partner Success Stories */}
        <div className="max-w-6xl mx-auto border-t border-white/5 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">Partner Impact</h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard 
              initials="SM" 
              name="Sarah Mitchell" 
              role="Leadership Coach" 
              quote="Growvolt transformed my scattered knowledge into a cohesive product that my audience couldn't wait to buy." 
            />
            <TestimonialCard 
              initials="MC" 
              name="Marcus Chen" 
              role="Tech Educator" 
              quote="I was skeptical about working with another agency, but Growvolt is different. They actually delivered results." 
            />
            <TestimonialCard 
              initials="JL" 
              name="Jessica Lee" 
              role="SaaS Founder" 
              quote="The systems they built continue to pay dividends months later. It's the best investment I've made this year." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// SHARED UI SECTIONS (EXISTING)
// ==========================================

const PainPointsFadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const PainPointsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const points = [
    {
      id: "01",
      title: "Less Brand Deals, Less Control",
      desc: "Brand deals are inconsistent, slow to close, and outside your control. One month you get paid, the next month you don’t. Relying on brands keeps your income unstable and capped.",
      icon: <ShieldAlert className="w-5 h-5 text-white/90" />
    },
    {
      id: "02",
      title: "Audience Trust, No Scalable Income",
      desc: "Your audience listens to you and asks for advice. But without a digital product, that trust doesn’t translate into revenue. Attention without ownership is a wasted asset.",
      icon: <Users className="w-5 h-5 text-white/90" />
    },
    {
      id: "03",
      title: "Too Many Ideas, No Clear Product",
      desc: "You know you should launch something — a course, guide, or system — but you’re stuck choosing. Without clarity on what they'd buy, hesitation turns into inaction.",
      icon: <Compass className="w-5 h-5 text-white/90" />
    }
  ];

  const handleScroll = (e) => {
    const { scrollLeft, offsetWidth } = e.target;
    if (offsetWidth === 0) return;
    const index = Math.round(scrollLeft / offsetWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#050509] relative z-20 overflow-hidden selection:bg-[#5B6FFF]/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B6FFF]/10 blur-[140px] rounded-full pointer-events-none opacity-50" />
      <div className="container mx-auto px-6 relative z-10 font-sans">
        <div className="text-center mb-10 md:mb-14">
          <PainPointsFadeIn>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-4 leading-tight font-sans">Your Current Situation</h2>
            <p className="text-zinc-300 max-w-lg mx-auto text-base md:text-lg leading-relaxed font-sans">The invisible barriers keeping you from <span className="text-white font-medium">monetizing</span> your influence effectively.</p>
          </PainPointsFadeIn>
        </div>
        <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {points.map((point, idx) => (
            <div key={point.id} className="min-w-[100%] md:min-w-0 snap-center px-1 md:px-0" style={{ scrollSnapStop: 'always' }}>
              <PainPointsFadeIn delay={idx * 0.1}>
                <div className="group relative h-full pt-8 px-8 pb-5 md:pt-10 md:px-10 md:pb-7 rounded-[2.5rem] bg-[#0a0a0e] border border-white/5 hover:border-white/10 hover:-translate-y-1.5 transition-all duration-500 flex flex-col overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5B6FFF]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute top-8 right-10 text-6xl font-sans font-black text-white/[0.02] group-hover:text-[#5B6FFF]/[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none">{point.id}</div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-[#5B6FFF]/10 group-hover:border-[#5B6FFF]/20 transition-all duration-500 relative z-10">
                    <div className="group-hover:scale-110 group-hover:text-[#5B6FFF] transition-all duration-500">{point.icon}    left: { x: 20 },
    right: { x: -20 },
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const WhatsAppIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const SectionDivider = () => (
  <div className="w-full flex justify-center relative z-20 pointer-events-none">
    <div className="w-full max-w-xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
  </div>
);

// ==========================================
// METHODOLOGY COMPONENTS
// ==========================================

const Bullet = ({ icon, title, desc }) => (
  <div className="group flex items-start gap-4">
    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-base md:text-lg font-bold text-white mb-0.5 font-sans">{title}</h4>
      <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors font-sans">{desc}</p>
    </div>
  </div>
);

const TestimonialCard = ({ initials, name, role, quote }) => (
  <div className="p-8 md:p-10 rounded-[2rem] bg-[#0f0f14] border border-white/5 relative group hover:border-blue-500/30 transition-all duration-300">
    <div className="absolute -top-4 left-10 p-2.5 rounded-xl bg-blue-600 text-white shadow-xl shadow-blue-600/40">
      <Quote size={20} />
    </div>
    <p className="text-base md:text-lg text-gray-300 mb-10 italic leading-relaxed pt-4 font-sans">
      "{quote}"
    </p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm font-sans">
        {initials}
      </div>
      <div>
        <p className="text-sm md:text-base font-bold text-white font-sans">{name}</p>
        <p className="text-xs md:text-sm text-gray-500 font-medium tracking-wide uppercase font-sans">{role}</p>
      </div>
    </div>
  </div>
);

const MergedSections = () => {
  const [activeTab, setActiveTab] = useState('build');

  const tabs = [
    { id: 'build', label: 'Build' },
    { id: 'launch', label: 'Launch' },
    { id: 'scale', label: 'Scale' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'build':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-4xl md:text-6xl font-black text-blue-500/20 font-sans">01</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-sans">Growvolt Build</h3>
                <p className="text-sm md:text-base text-blue-500 font-semibold font-sans">The Precision Blueprint</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
              We discover the product already validated by your audience's struggles and your unique insight.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<Search size={18} />} title="Deep-Dive Research" desc="Analyzing audience pains and conversations—not just demographics." />
              <Bullet icon={<Lightbulb size={18} />} title="Knowledge Synthesis" desc="Auditing content to extract your unique transformative framework." />
              <Bullet icon={<Code size={18} />} title="Product Architecture" desc="Blueprinting the exact product at the intersection of demand and authority." />
              <Bullet icon={<Video size={18} />} title="Asset Creation" desc="Producing core content and materials for a premium user experience." />
            </div>
          </div>
        );
      case 'launch':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-4xl md:text-6xl font-black text-blue-500/20 font-sans">02</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-sans">Growvolt Launch</h3>
                <p className="text-sm md:text-base text-blue-500 font-semibold font-sans">Market Penetration</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
              We deploy your asset into the market with a conversion-optimized journey designed for high-trust sales.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<Compass size={18} />} title="Strategic Roadmap" desc="Coordinated deployment across social channels to build massive anticipation." />
              <Bullet icon={<Megaphone size={18} />} title="Hype Engineering" desc="Psychology-backed messaging that frames your asset as the ultimate solution." />
              <Bullet icon={<Layout size={18} />} title="Conversion Funnels" desc="High-converting landing pages designed to minimize friction and maximize sales." />
              <Bullet icon={<Target size={18} />} title="Launch Execution" desc="Managing the live intake, support, and tech to ensure a flawless buying experience." />
            </div>
          </div>
        );
      case 'scale':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-4xl md:text-6xl font-black text-blue-500/20 font-sans">03</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-sans">Growvolt Scale</h3>
                <p className="text-sm md:text-base text-blue-500 font-semibold font-sans">Sustainable Velocity</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
              We shift from one-time launch energy to automated growth systems that compound over time.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<TrendingUp size={18} />} title="Automated Funnels" desc="Evergreen systems that capture leads and close sales 24/7 autonomously." />
              <Bullet icon={<BarChart3 size={18} />} title="Data Optimization" desc="Iterative testing of copy and creative to lower acquisition costs and increase ROI." />
              <Bullet icon={<Repeat size={18} />} title="Retention Logic" desc="Upsell paths and community structures to maximize lifetime customer value." />
              <Bullet icon={<Zap size={18} />} title="Ecosystem Expansion" desc="Identifying secondary product opportunities to keep your growth compounding." />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a0f] text-white py-16 md:py-28 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Mobile-Optimized Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <p className="text-[10px] md:text-xs text-blue-400 font-bold uppercase tracking-[0.2em] font-sans">The Growvolt Methodology</p>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] font-sans">
            Build, Launch, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">Scale.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-sans">
            We architect, build, and power digital assets that turn your insight into a growing revenue stream.
          </p>
        </div>

        {/* Improved Interactive Tabs */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="mb-8 p-1.5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-xl py-3.5 md:py-4 text-xs md:text-base font-bold transition-all duration-300 font-sans ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-[#0f0f14] p-8 md:p-14 shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
            {renderTabContent()}
          </div>
        </div>

        {/* Partner Success Stories */}
        <div className="max-w-6xl mx-auto border-t border-white/5 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">Partner Impact</h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard 
              initials="SM" 
              name="Sarah Mitchell" 
              role="Leadership Coach" 
              quote="Growvolt transformed my scattered knowledge into a cohesive product that my audience couldn't wait to buy." 
            />
            <TestimonialCard 
              initials="MC" 
              name="Marcus Chen" 
              role="Tech Educator" 
              quote="I was skeptical about working with another agency, but Growvolt is different. They actually delivered results." 
            />
            <TestimonialCard 
              initials="JL" 
              name="Jessica Lee" 
              role="SaaS Founder" 
              quote="The systems they built continue to pay dividends months later. It's the best investment I've made this year." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// SHARED UI SECTIONS (EXISTING)
// ==========================================

const PainPointsFadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const PainPointsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const points = [
    {
      id: "01",
      title: "Less Brand Deals, Less Control",
      desc: "Brand deals are inconsistent, slow to close, and outside your control. One month you get paid, the next month you don’t. Relying on brands keeps your income unstable and capped.",
      icon: <ShieldAlert className="w-5 h-5 text-white/90" />
    },
    {
      id: "02",
      title: "Audience Trust, No Scalable Income",
      desc: "Your audience listens to you and asks for advice. But without a digital product, that trust doesn’t translate into revenue. Attention without ownership is a wasted asset.",
      icon: <Users className="w-5 h-5 text-white/90" />
    },
    {
      id: "03",
      title: "Too Many Ideas, No Clear Product",
      desc: "You know you should launch something — a course, guide, or system — but you’re stuck choosing. Without clarity on what they'd buy, hesitation turns into inaction.",
      icon: <Compass className="w-5 h-5 text-white/90" />
    }
  ];

  const handleScroll = (e) => {
    const { scrollLeft, offsetWidth } = e.target;
    if (offsetWidth === 0) return;
    const index = Math.round(scrollLeft / offsetWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#050509] relative z-20 overflow-hidden selection:bg-[#5B6FFF]/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B6FFF]/10 blur-[140px] rounded-full pointer-events-none opacity-50" />
      <div className="container mx-auto px-6 relative z-10 font-sans">
        <div className="text-center mb-10 md:mb-14">
          <PainPointsFadeIn>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-4 leading-tight font-sans">Your Current Situation</h2>
            <p className="text-zinc-300 max-w-lg mx-auto text-base md:text-lg leading-relaxed font-sans">The invisible barriers keeping you from <span className="text-white font-medium">monetizing</span> your influence effectively.</p>
          </PainPointsFadeIn>
        </div>
        <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {points.map((point, idx) => (
            <div key={point.id} className="min-w-[100%] md:min-w-0 snap-center px-1 md:px-0" style={{ scrollSnapStop: 'always' }}>
              <PainPointsFadeIn delay={idx * 0.1}>
                <div className="group relative h-full pt-8 px-8 pb-5 md:pt-10 md:px-10 md:pb-7 rounded-[2.5rem] bg-[#0a0a0e] border border-white/5 hover:border-white/10 hover:-translate-y-1.5 transition-all duration-500 flex flex-col overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5B6FFF]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute top-8 right-10 text-6xl font-sans font-black text-white/[0.02] group-hover:text-[#5B6FFF]/[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none">{point.id}</div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-[#5B6FFF]/10 group-hover:border-[#5B6FFF]/20 transition-all duration-500 relative z-10">
                    <div className="group-hover:scale-110 group-hover:text-[#5B6FFF] transition-all duration-500">{point.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#5B6FFF] transition-colors relative z-10 font-sans">{point.title}</h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors relative z-10 font-sans">{point.desc}</p>
                  <div className="mt-auto pt-6 relative z-10"><div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#5B6FFF]/40 to-transparent transition-all duration-1000" /></div>
                </div>
              </PainPointsFadeIn>
            </div>
          ))}
        </div>
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {points.map((_, i) => (
            <div key={i} className={`transition-all duration-500 h-1.5 rounded-full ${activeIndex === i ? 'w-6 bg-[#5B6FFF]' : 'w-1.5 bg-white/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CreatorBusinessSection = () => (
  <section className="py-24 md:py-40 flex justify-center relative z-20">
    <div className="w-full max-w-4xl px-5 flex flex-col items-center text-center font-sans">
      <FadeIn className="w-full">
        <div className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-3 block w-full font-sans">$1M+ A YEAR CREATOR BUSINESSES</div>
        <h2 className="my-2.5 text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-12 text-center leading-tight font-sans tracking-tight">We Build, Launch & Scale<br /><span className="text-[#5B6FFF]">AI Digital Products</span></h2>
      </FadeIn>
      <div className="w-full grid md:grid-cols-1 gap-12 mt-10">
        {[
          { t: "BUILD", d: "AI-powered product creation built around your audience.", i: "https://images.pexels.com/photos/30530408/pexels-photo-30530408.jpeg" },
          { t: "FUNNEL", d: "High-converting funnels tailored to your community.", i: "https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg" },
          { t: "SCALE", d: "Performance marketing that grows your product after launch.", i: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg" }
        ].map((c, idx) => (
          <FadeIn key={idx} delay={0.3 + (idx * 0.1)}>
            <div className="bg-[#0a0a14] border border-white/5 rounded-[2.5rem] p-10 text-center h-full hover:border-zinc-800 transition-all group shadow-2xl overflow-hidden">
              <h2 className="mb-3 text-2xl font-semibold text-zinc-100 group-hover:text-[#5B6FFF] transition-colors font-sans">{c.t}</h2>
              <p className="mb-10 text-sm text-zinc-300 leading-relaxed font-sans">{c.d}</p>
              <div className="w-full h-56 rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] grayscale-0 opacity-100"><img src={c.i} alt={c.t} className="w-full h-full object-cover" /></div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const CalendlyBookingSection = ({ pageKey }) => {
  useEffect(() => {
    const containerId = `calendly-inline-widget-${pageKey}`;
    const container = document.getElementById(containerId);
    const initCalendly = () => {
      if (window.Calendly && container) {
        container.innerHTML = "";
        window.Calendly.initInlineWidget({
          // Force consistency with global Dark Theme params
          url: `${CALENDLY_BASE}${CALENDLY_PARAMS}&hide_landing_page_details=1&hide_gdpr_banner=1`,
          parentElement: container
        });
      }
    };
    let script = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = initCalendly;
      document.body.appendChild(script);
    } else if (window.Calendly) {
      initCalendly();
    }
  }, [pageKey]);

  return (
    <section className="py-24 md:py-32 flex justify-center relative z-20 font-sans">
      <div className="w-full max-w-7xl px-6">
        <div className="text-center mb-8">
          <FadeIn>
            <span className="text-[#5B6FFF] text-xs font-bold tracking-widest uppercase mb-4 block font-sans">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-sans tracking-tight">Lock in Your <span className="text-[#5B6FFF]">Growth Strategy</span></h2>
            <p className="text-zinc-300 text-sm md:text-lg max-w-2xl mx-auto mb-10 font-sans">Select a time below to speak with our team and architect your monetization engine.</p>
          </FadeIn>
        </div>
        <FadeIn delay={0.3}>
          <div className="bg-[#0a0a0e] border border-white/10 rounded-[3.5rem] p-1 md:p-1.5 backdrop-blur-sm overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20">
            <div id={`calendly-inline-widget-${pageKey}`} className="rounded-[3rem] overflow-hidden" style={{ minWidth: '320px', height: '660px', backgroundColor: '#050509' }}></div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
// ==========================================
// NAVIGATION COMPONENTS
// ==========================================

const StickyHeader = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", id: 'home' },
    { label: "Services", id: 'services' },
    { label: "Case Studies", id: 'casestudies' },
    { label: "About", id: 'about' },
    { label: "Contact Us", id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none font-sans">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl pl-6 pr-2 py-2.5 rounded-full bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all ${scrolled ? 'border-white/20' : ''}`}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}><span className="font-bold text-xl tracking-tight text-white font-serif">Growvolt</span></div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={`hover:text-white transition-colors relative group ${currentView.startsWith('casestudy') && item.id === 'casestudies' ? 'text-white' : currentView === item.id ? 'text-white' : ''}`}>
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#5B6FFF] transition-all ${currentView.startsWith('casestudy') && item.id === 'casestudies' ? 'w-full' : currentView === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => window.open(CALENDLY_URL, "_blank")} className="hidden sm:flex items-center px-5 py-2.5 rounded-full bg-white text-black font-bold text-[10px] uppercase tracking-wider hover:bg-zinc-200 transition-colors">Book Call</button>
            <button onClick={() => setIsMenuOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 active:scale-95 group"><Menu className="text-zinc-400 group-hover:text-white" size={20} /></button>
          </div>
        </motion.div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#050509]/95 backdrop-blur-2xl flex flex-col items-center justify-center font-serif text-white">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10"><X size={24} /></button>
            <motion.nav className="text-center space-y-6">
              {menuItems.map((item, idx) => (
                <div key={idx} className="overflow-hidden">
                  <motion.button onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.1 + (idx * 0.1) }} className="block text-4xl sm:text-6xl font-bold hover:text-[#5B6FFF] transition-all cursor-pointer font-serif">{item.label}</motion.button>
                </div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = ({ onNavigate }) => (
  <footer className="bg-[#050509] pt-20 pb-12 font-sans border-t border-white/5 text-white relative z-10">
    <div className="container mx-auto px-6 md:px-12 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-16">
        <div className="md:col-span-5 flex flex-col items-start text-white">
          <FadeIn>
            <span className="font-bold text-4xl tracking-tight font-sans mb-6 block cursor-pointer" onClick={() => onNavigate('home')}>{FOOTER_DATA.brand.name}</span>
            <p className="text-zinc-300 text-sm leading-relaxed mb-8 max-w-sm">{FOOTER_DATA.brand.description}</p>
            <div className="flex gap-4">
              {FOOTER_DATA.brand.socials.map((social) => {
                const IconComponent = social.icon === 'whatsapp' ? WhatsAppIcon : social.icon;
                return (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:gap-16">
          {FOOTER_DATA.menus.map((menu, menuIdx) => (
            <div key={menu.title}>
              <FadeIn delay={menuIdx * 0.1}>
                <h3 className="text-white font-bold text-lg mb-6 font-sans">{menu.title}</h3>
                <ul className="space-y-4">
                  {menu.items.map((item) => (
                    <li key={item.label}><button onClick={() => onNavigate(item.id)} className="text-zinc-400 hover:text-white text-sm transition-colors text-left font-medium font-sans">{item.label}</button></li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-sans">
        <p>© 2025 {FOOTER_DATA.brand.name}. All rights reserved.</p>
        <div className="flex gap-8 text-zinc-500">
          {FOOTER_DATA.legal.map((link) => (
            <button key={link.id} onClick={() => onNavigate(link.id)} className="hover:text-white transition-colors">{link.label}</button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ==========================================
// VIEWS
// ==========================================

const CaseStudiesView = ({ onNavigate }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#050509] min-h-screen pt-48 pb-40 px-6 font-sans">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-20 text-white">
        <FadeIn>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight font-sans">Case Studies</h2>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans">Real outcomes from our 2025 performance partnerships.</p>
        </FadeIn>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 font-sans">
        {CASE_STUDIES_DATA.map((study, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <button onClick={() => onNavigate(`casestudy-${study.id}`)} className="w-full group bg-[#0a0a14] border border-white/5 rounded-3xl overflow-hidden hover:border-[#5B6FFF]/30 transition-all duration-500 text-left shadow-2xl flex flex-col">
              <div className="w-full h-48 sm:h-56 overflow-hidden relative flex-shrink-0">
                <img src={study.image} alt={study.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#050509]/30 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-7 sm:p-9 flex flex-col gap-6 bg-[#0a0a14] relative">
                <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase">
                  <span className="text-[#5B6FFF]">CASE STUDY {study.id}</span>
                  <span className="text-zinc-500 flex items-center gap-1 group-hover:text-white transition-colors">OPEN PROJECT <ArrowRight size={10} /></span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 text-white">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-2xl tracking-tight font-sans">{study.name}</h3>
                    <p className="text-zinc-300 text-sm font-medium font-sans">{study.niche}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-[11px] text-zinc-500 font-medium sm:text-right font-sans">
                    <span className="font-bold uppercase tracking-widest">{study.followers} FOLLOWERS</span>
                    <span className="uppercase tracking-widest">{study.platform}</span>
                    <span className="uppercase tracking-widest">LOCATION ({study.location})</span>
                  </div>
                </div>
              </div>
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  </motion.div>
);

const SingleCaseStudyView = ({ id, onNavigate }) => {
  const study = CASE_STUDIES_DATA.find(s => s.id === id);
  if (!study) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#050509] text-white pb-40 pt-48 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => onNavigate('casestudies')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-16 text-[10px] font-bold uppercase tracking-widest group font-sans">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolios
        </button>
        
        <div className="space-y-24">
          {/* Main Title Block */}
          <FadeIn className="space-y-8">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1] font-sans">
              {study.name}: <span className="text-[#5B6FFF]">{study.summaryTitle}</span>
            </h1>
            <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
               <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-bold uppercase tracking-widest border-y border-white/5 py-6">
                 <div><span className="text-zinc-500">Niche:</span> <span className="text-white ml-2">{study.niche}</span></div>
                 <div><span className="text-zinc-500">Platform:</span> <span className="text-white ml-2">{study.platform}</span></div>
                 <div><span className="text-zinc-500">Followers:</span> <span className="text-white ml-2">{study.followers}</span></div>
               </div>
            </div>
          </FadeIn>

          <SectionDivider />
                    {/* The Problem Section */}
          <FadeIn className="space-y-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight">The <span className="text-[#5B6FFF]">Problem</span></h2>
            <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
              <p>Alex had an engaged audience but zero leverage. Brand deals were random, underpaid, and exhausting to chase.</p>
              <p>His income fluctuated between $400–$900/month, depending on replies in his inbox.</p>
              <p className="text-white font-bold">No system. No predictability. Total dependency on brand whims.</p>
            </div>
          </FadeIn>

          <SectionDivider />

          {/* What We Noticed Section */}
          <FadeIn className="space-y-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight">What We <span className="text-[#5B6FFF]">Noticed</span></h2>
            <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
              <p>When we audited his content and comments, one thing was obvious: People weren’t following him just for workouts — they were following him because he lost weight in a simple, realistic way.</p>
              <p>The real pain point for his audience wasn’t “getting fit.” It was losing the first 10–15 lbs without burning out.</p>
            </div>
          </FadeIn>

          <SectionDivider />

          {/* What We Built Section */}
          <FadeIn className="space-y-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight">What We <span className="text-[#5B6FFF]">Built</span></h2>
            <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
              <p>We synthesized Alex’s personal method into a premium digital product: <span className="text-white italic">“Lose 10 lbs in 30 Days (Without Extreme Dieting)”</span>.</p>
              <div className="space-y-1">
                <p>Built a frictionless funnel.</p>
                <p>Crafted a story-based launch.</p>
                <p>Positioned Alex as a guide, not a guru.</p>
              </div>
            </div>
          </FadeIn>

          <SectionDivider />

          {/* The Result Section */}
          <FadeIn className="space-y-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight">The <span className="text-[#5B6FFF]">Result</span></h2>
            <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
              <p><GlowText>$1,050</GlowText> in sales in the first 48 hours. Converted warm followers — no ads, no discounts.</p>
              <p>Scaled to <GlowText>$6,200/month</GlowText> in pure profit within 45 days.</p>
              <p className="text-white font-bold">Alex finally owned his revenue stream.</p>
            </div>
          </FadeIn>

          <SectionDivider />

          {/* Scale Phase Section */}
          <FadeIn className="space-y-8 pb-20">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight">Scale <span className="text-[#5B6FFF]">Phase</span></h2>
            <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
              <p>We added a habit-tracking upsell and a private accountability layer. Each upsell converted at 28–34%.</p>
              <p className="text-white text-xl md:text-2xl font-bold font-sans">Leverage achieved.</p>
            </div>
          </FadeIn>
        </div>
        
        <SectionDivider />
        <div className="mt-20 text-center">
           <button onClick={() => window.open(CALENDLY_URL, "_blank")} className="px-10 py-5 bg-[#5B6FFF] text-white font-bold rounded-full hover:bg-[#4a5be6] transition-all uppercase tracking-widest text-[10px] shadow-2xl shadow-[#5B6FFF]/20 font-sans">
              Architect your own system <ArrowRight size={16} className="inline ml-2" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};

const HomeView = ({ heroState, setHeroState, onNavigate }) => {
  const handleToggle = (state) => {
    setHeroState(state);
    if (state === 'book') setTimeout(() => { window.open(CALENDLY_URL, "_blank"); }, 300);
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative z-10 w-full min-h-[85vh] flex flex-col items-center justify-center px-6 pt-32 pb-28 font-sans">
        <div className="w-full max-w-2xl text-center">
          <FadeIn><div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 font-sans text-white"><span className="w-1.5 h-1.5 rounded-full bg-[#5B6FFF] shadow-[0_0_8px_rgba(91,111,255,0.8)]" /> <span className="text-[11px] font-bold uppercase tracking-widest font-sans">Creator Economy</span></div></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.15] mb-8 tracking-tighter text-white font-sans">
              Turn your Influence
              <br />
              <span className="text-[#5B6FFF]">Into Revenue</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><p className="text-zinc-300 mb-12 max-w-md mx-auto text-base md:text-lg leading-relaxed font-sans">Monetize your audience with tailored solutions that deliver real, lasting growth.</p></FadeIn>
          <FadeIn delay={0.3}>
            <div className="w-full max-w-[340px] mx-auto p-[1px] rounded-full bg-[#5B6FFF] shadow-2xl font-sans">
              <div className="relative grid grid-cols-2 p-1 bg-[#0a0a0e]/95 rounded-full overflow-hidden">
                <motion.div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-zinc-100 rounded-full z-0 shadow-lg" animate={{ left: heroState === 'explore' ? '4px' : 'calc(50%)' }} transition={{ type: "spring", stiffness: 350, damping: 25 }} />
                <button onClick={() => handleToggle('explore')} className={`relative z-10 py-2.5 text-xs font-bold transition-colors duration-300 uppercase tracking-wider ${heroState === 'explore' ? 'text-black' : 'text-zinc-400'}`}>Explore</button>
                <button onClick={() => handleToggle('book')} className={`relative z-10 py-2.5 text-xs font-bold transition-colors duration-300 uppercase tracking-wider ${heroState === 'book' ? 'text-black' : 'text-zinc-400'}`}>Book Call</button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      <SectionDivider />
      <PainPointsSection />
      <SectionDivider />
      <section className="py-28 md:py-44 bg-[#050509] relative overflow-hidden z-20 font-sans">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-white">
          <div className="grid md:grid-cols-5 gap-12 items-start text-left">
            <div className="md:col-span-3 space-y-8">
              <FadeIn><h2 className="text-2xl md:text-3xl font-bold leading-tight font-sans">It’s Not a Motivation Problem. <br /><span className="text-[#5B6FFF]">It’s a Monetization System Problem.</span></h2></FadeIn>
              <div className="space-y-6">
                <p className="text-zinc-300 text-sm md:text-base max-w-lg leading-relaxed font-sans">Most creators don’t fail because they lack talent. The reality is mechanical—they lack the infrastructure to own their revenue.</p>
                <ul className="space-y-4 font-sans">
                  {["Building products on assumptions", "Launching without a funnel engine", "Struggling through strategy alone"].map((it, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className="mt-1 text-[#5B6FFF]"><XCircle size={16} /></div>
                      <span className="text-zinc-300 text-sm leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <FadeIn delay={0.6}><button onClick={() => window.open(CALENDLY_URL, "_blank")} className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-[10px] font-bold rounded-full transition-all active:scale-95 uppercase tracking-wider hover:bg-zinc-200">Build a Better System</button></FadeIn>
            </div>
            <div className="md:col-span-2 hidden md:block"><div className="p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] flex items-center justify-center h-64 relative overflow-hidden"><div className="absolute inset-0 bg-[#5B6FFF]/5 blur-3xl rounded-full" /><Workflow size={64} className="text-[#5B6FFF]/20" /></div></div>
          </div>
        </div>
      </section>
      <SectionDivider />
      <CreatorBusinessSection />
      <SectionDivider />
      <section className="py-24 bg-[#050509] relative z-20 font-sans text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn><span className="text-[#5B6FFF] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">How It Works</span></FadeIn>
            <FadeIn delay={0.1}><h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-sans">From Concept to <span className="text-[#5B6FFF]">Cash Flow</span></h2></FadeIn>
          </div>
          <div className="space-y-12 relative text-left">
            {/* Modified vertical line to be slightly more prominent and pathway-like */}
            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#5B6FFF]/30 via-[#5B6FFF]/10 to-transparent" />
            {[{ title: "Strategy Call", desc: "We identify your audience’s biggest monetization opportunity and decide what’s actually worth building.", icon: PhoneCall }, { title: "Build Phase", desc: "We create the product and funnel — aligned with your voice, audience, and positioning.", icon: Cpu }, { title: "Launch & Optimize", desc: "You launch with a system, collect real data, and refine for consistent revenue — not guesswork.", icon: BarChart }].map((step, i) => (
              <FadeIn key={i} delay={0.1 * i} className="relative pl-20 group">
                <div className="absolute left-0 top-0 w-14 h-14 rounded-full border border-white/10 bg-[#0a0a0e] flex items-center justify-center z-10 group-hover:border-[#5B6FFF]/50 transition-all"><step.icon className="text-[#9a9aaa] group-hover:text-white transition-colors" size={20} /></div>
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all font-sans">
                  <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight font-sans">{step.title}</h3>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider /><CalendlyBookingSection pageKey="home" />
    </motion.div>
  );
};

const ServicesView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#0a0a0f] text-[#e2e8f0] font-sans antialiased pb-20">
    <section className="pt-48 pb-24 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5B6FFF]/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center text-white">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight font-sans">
              The Creator’s Trap: <span className="text-[#5B6FFF]">High Influence, Low Infrastructure</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              You've built the audience and the authority. But without a scalable backend, you're just an employee of your own personal brand.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-16 text-left mt-20">
            {[
              { icon: Clock, title: "The Content Hamster Wheel", text: "Revenue stops the moment you stop posting. You're trapped in a cycle just to maintain baseline." },
              { icon: Lock, title: "Fragmented Monetization", text: "Your expertise is scattered, never compounding into a structured asset you actually own." },
              { icon: Phone, title: "Dwindling Brand Deals", text: "Sponsorships are volatile. Relying on external brands leaves your income at their mercy." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}><div className="flex flex-col gap-3 text-white"><div className="w-10 h-10 rounded-xl bg-[#5B6FFF]/10 text-[#5B6FFF] flex items-center justify-center mb-1"><item.icon size={20} /></div><h3 className="text-lg md:text-xl font-bold mb-2 font-sans">{item.title}</h3><p className="text-zinc-300 leading-relaxed text-sm md:text-base font-sans">{item.text}</p></div></FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
    <MergedSections />
    <SectionDivider /><CalendlyBookingSection pageKey="services" />
  </motion.div>
);

const LegalView = ({ title, content, icon: IconComp }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#050509] text-zinc-300 font-sans min-h-screen pt-48 pb-24 px-6">
    <div className="max-w-4xl mx-auto text-white">
      <FadeIn>
        <div className="w-16 h-16 rounded-2xl bg-[#5B6FFF]/10 flex items-center justify-center mb-8 border border-[#5B6FFF]/20"><IconComp className="text-[#5B6FFF]" size={32} /></div>
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-12 tracking-tight font-sans">{title.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="text-[#5B6FFF]">{word}</span> : word + ' ')}</h1>
        <div className="space-y-10 text-lg leading-relaxed text-zinc-300 font-sans">{content.map((section, idx) => (<div key={idx} className="space-y-4"><h2 className="text-xl font-bold uppercase tracking-wider font-sans text-white">{section.heading}</h2><p>{section.text}</p></div>))}</div>
      </FadeIn>
    </div>
  </motion.div>
);

const ContactView = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#0a0a0f] text-[#e2e8f0] min-h-screen font-sans">
      <section className="pt-48 pb-24 px-6 max-w-4xl mx-auto text-white text-center">
        <FadeIn>
          <span className="text-[#5B6FFF] text-xs font-bold tracking-widest uppercase mb-6 block">Contact Us</span>
          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight mb-8 font-sans">Get In <span className="text-[#5B6FFF]">Touch</span></h1>
          <p className="text-zinc-300 text-lg max-w-xl mx-auto">Ready to build your asset?</p>
        </FadeIn>
        <div className="grid md:grid-cols-5 gap-12 mt-20 text-left">
          <div className="md:col-span-3">
            {submitted ? <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 rounded-[3rem] bg-[#5B6FFF]/5 border border-[#5B6FFF]/10 text-center"><div className="w-20 h-20 rounded-full bg-[#5B6FFF]/10 text-[#5B6FFF] flex items-center justify-center mx-auto mb-6"><Check size={40} /></div><h3 className="text-2xl font-bold text-white uppercase tracking-widest font-sans">Sent</h3></motion.div> : (
              <FadeIn delay={0.2}><form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Your Name" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#5B6FFF]" />
                <input type="email" placeholder="Your Email" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#5B6FFF]" />
                <textarea placeholder="Message..." rows="5" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-[#5B6FFF] resize-none" />
                <div className="flex justify-start">
                  <button type="submit" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black text-[10px] font-bold rounded-full transition-all active:scale-95 uppercase tracking-wider hover:bg-zinc-200">
                    Send Message <Send size={14} className="flex-shrink-0" />
                  </button>
                </div>
              </form></FadeIn>
            )}
          </div>
          <div className="md:col-span-2"><FadeIn delay={0.4}><div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-10"><div><p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mb-4">Direct Email</p><a href="mailto:growvolt.us@gmail.com" className="text-white font-bold text-base hover:text-[#5B6FFF] transition-colors break-all">growvolt.us@gmail.com</a></div><div><p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mb-4">Instagram</p><a href="https://instagram.com/growvolt.us" target="_blank" className="flex items-center gap-3 text-white font-bold text-base hover:text-[#5B6FFF] transition-colors font-sans"><Instagram size={20} className="text-[#5B6FFF]" /> @growvolt.us</a></div></div></FadeIn></div>
        </div>
      </section>
    </motion.div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

const App = () => {
  const [currentView, setCurrentView] = useState('home'); 
  const [heroState, setHeroState] = useState('explore'); 
  const { scrollY } = useScroll();
  const gridOpacity = useTransform(scrollY, [0, 800], [0.6, 0]); 

  useEffect(() => { window.scrollTo(0, 0); }, [currentView]);

  return (
    <div className="min-h-screen bg-[#050509] text-zinc-100 font-sans relative overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        .bg-grid-pattern { background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 60px 60px; mask-image: linear-gradient(to bottom, black 40%, transparent 100%); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <motion.div style={{ opacity: gridOpacity }} className="fixed top-0 left-0 right-0 h-screen bg-grid-pattern pointer-events-none z-0" />
      <StickyHeader onNavigate={setCurrentView} currentView={currentView} />

      <AnimatePresence mode="wait">
        {currentView === 'home' && <HomeView key="home" heroState={heroState} setHeroState={setHeroState} onNavigate={setCurrentView} />}
        {currentView === 'services' && <ServicesView key="services" />}
        {currentView === 'about' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#050509] text-white pb-40 pt-48 px-6 font-sans">
            <div className="max-w-4xl mx-auto space-y-24">
              <FadeIn className="space-y-8">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1] font-serif">
                  About <span className="text-[#5B6FFF]">Growvolt</span>
                </h1>
                <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
                  <p>We started Growvolt after noticing something that didn’t make sense.</p>
                  <p>Creators were doing the hardest part already — building an audience, earning trust, showing up consistently.</p>
                  <p>But when it came to money, everything felt random.</p>
                  <div className="space-y-1">
                    <p>Brand deals were inconsistent.</p>
                    <p>Income depended on algorithms.</p>
                    <p>And most creators didn’t actually own what they were selling.</p>
                  </div>
                  <p className="text-white font-bold">That gap bothered us. So we built Growvolt to fix it.</p>
                </div>
              </FadeIn>
              <SectionDivider />
              <FadeIn className="space-y-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight">What We <span className="text-[#5B6FFF]">Believe</span></h2>
                <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
                  <p>We don’t believe creators need to post more or chase trends. We believe they need structure.</p>
                  <div className="space-y-1">
                    <p>A clear product.</p>
                    <p>A simple way to sell it.</p>
                    <p>And a system that feels natural — not salesy.</p>
                  </div>
                  <p className="text-white font-bold">When creators own the product, they stop depending on luck.</p>
                </div>
              </FadeIn>
              <SectionDivider />
              <FadeIn className="space-y-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight">What We <span className="text-[#5B6FFF]">Do</span></h2>
                <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
                  <p>At Growvolt, we help creators turn what they already know into digital products their audience actually wants.</p>
                  <p>We handle the thinking, the building, and the launch — so creators can stay focused on creating.</p>
                  <p>Once something works, we scale it carefully. No rush. No noise. Just what makes sense.</p>
                </div>
              </FadeIn>
              <SectionDivider />
              <FadeIn className="space-y-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight">How We <span className="text-[#5B6FFF]">Work</span></h2>
                <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
                  <p>We keep Growvolt intentionally small.</p>
                  <p>We partner with only a few creators at a time and work on a performance-based profit share.</p>
                  <div className="space-y-1">
                    <p>If the product sells, we win together.</p>
                    <p>If it doesn’t, neither do we.</p>
                  </div>
                  <p className="text-white font-bold">That keeps everything aligned and honest.</p>
                </div>
              </FadeIn>
              <SectionDivider />
              <FadeIn className="space-y-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight">Who This <span className="text-[#5B6FFF]">Is For</span></h2>
                <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
                  <p>Growvolt is for creators who:</p>
                  <ul className="space-y-3 pl-4">
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#5B6FFF]" /> want long-term income, not quick wins</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#5B6FFF]" /> care about their audience’s trust</li>
                    <li className="flex items-center gap-3 text-white"><div className="w-1.5 h-1.5 rounded-full bg-[#5B6FFF]" /> and want to build something they actually own</li>
                  </ul>
                  <p>If you’re chasing shortcuts, we’re not a fit. If you’re thinking long-term, we probably are.</p>
                </div>
              </FadeIn>
              <SectionDivider />
              <FadeIn className="space-y-8 pb-20">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight">The <span className="text-[#5B6FFF]">Goal</span></h2>
                <div className="text-base md:text-lg text-zinc-300 space-y-6 leading-[1.3] font-sans">
                  <p>We’re not trying to build the biggest agency.</p>
                  <p>We’re here to help creators stop relying on luck and start building something solid.</p>
                  <p className="text-white text-xl md:text-2xl font-bold font-serif">That’s Growvolt.</p>
                </div>
              </FadeIn>
            </div>
            <SectionDivider />
            <CalendlyBookingSection pageKey="about" />
          </motion.div>
        )}
        {currentView === 'contact' && <ContactView key="contact" />}
        {currentView === 'casestudies' && <CaseStudiesView key="casestudies" onNavigate={setCurrentView} />}
        {CASE_STUDIES_DATA.map(study => (
          currentView === `casestudy-${study.id}` && <SingleCaseStudyView key={`case-${study.id}`} id={study.id} onNavigate={setCurrentView} />
        ))}
        {currentView === 'privacy' && <LegalView key="privacy" title="Privacy Policy" icon={ShieldCheck} content={[{ heading: "Data Collection", text: "We collect contact information through Calendly for strategic consultations." }, { heading: "Usage", text: "Data is strictly used for Growvolt communication and brand optimization." }, { heading: "Third-Party", text: "We use Calendly and WhatsApp. We never sell your data." }]} />}
        {currentView === 'terms' && <LegalView key="terms" title="Terms of Service" icon={Scale} content={[{ heading: "Services", text: "Includes digital product architecture and performance marketing." }, { heading: "Alignment", text: "Compensation is often tied to revenue milestones as per agreements." }, { heading: "Property", text: "Frameworks developed for your brand become your property upon completion." }]} />}
      </AnimatePresence>
            <Footer onNavigate={setCurrentView} />
    </div>
  );
};

export default App;
