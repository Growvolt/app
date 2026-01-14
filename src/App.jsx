import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, color } from 'framer-motion';
import { 
  ArrowRight, X, Instagram, Mail, Menu, Check,
  Cpu, XCircle, PhoneCall, BarChart, ShieldAlert, Users, Compass, 
  CheckCircle2, TrendingUp, Workflow, Clock, Lock, Phone, Send, Heart,
  ShieldCheck, FileText, Scale, Target, Lightbulb, Rocket, ChevronRight, ArrowLeft,
  Search, Code, Video, Box, Quote, Megaphone, Layout, Repeat, Zap, BarChart3, User,
  Play, Volume2, VolumeX, ChevronDown, ArrowUpRight
} from 'lucide-react';
import { style, text } from 'framer-motion/client';

// ==========================================
// 1. DATA & CONFIGURATION
// ==========================================

const FOOTER_DATA = {
  brand: {
    name: "Growvolt",
    description: "We craft premium digital experiences that elevate brands and drive measurable results.",
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

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description: "20 minutes. We learn your audience, audit your content, and identify the product hiding in your DMs.",
    explainer: "Most creators are sitting on goldmines. We help you see it.",
  },
  {
    number: "02",
    title: "Build & Launch",
    description: "We handle product creation, sales page, email sequence, and launch strategy. You focus on content.",
    explainer: "Done-for-you means done-for-you. No homework.",
  },
  {
    number: "03",
    title: "Scale & Optimize",
    description: "Post-launch, we analyze what's working, double down on winners, and systematize your revenue.",
    explainer: "Launch once, earn forever. That's the goal.",
  },
];

const CASE_STUDIES_DATA = [
  {
    id: "matt",
    name: "Matt Willson",
    platform: "Instagram",
    followers: "38K",
    problem: "Followers trusted him, but had nowhere to buy",
    solution: "We audited his content and noticed a recurring theme energy issues, bloating, digestion, morning routines",
    result: "$18K in first 30 days",
    quote: "I didn't think my audience would pay. They were waiting for me to sell.",
    image: "https://i.ibb.co/S46gxtMx/matt.jpg",
    fullStory: {
  TheProblem: {
    text: "Matt had a loyal male audience but zero leverage. His content performed well, but monetization was scattered—random brand deals, no system, no predictability.",
    points: [
      "Followers trusted him, but had nowhere to buy",
    ],
  },

  WhatWeDid: {
    text: "We audited his content and noticed a recurring theme: energy issues, bloating, digestion, morning routines.",
    points: [
      "Extracted his routines into a 30-Day Gut Reset",
      "Built a simple one-page funnel",
      "Positioned the product as a habit system, not a supplement",
    ],
  },

  TheResult: {
    text: "No ads. No hype. Just alignment.",
    points: [
      "First launch: $1,200 in 48 hours",
      "Stabilized at $4,800/month",
      "Zero brand dependency",
      "Matt didn’t grow faster — he just finally captured value",
    ],
  },

  metrics: ["$4.8K/month", "48-hour launch"],
}

  },
  {
    id: "mia",
    name: "Mia Reynolds",
    platform: "Instagram",
    followers: "45K",
    problem: " Mia had a deeply loyal audience—but hated selling",
    solution: "Low-ticket, low-friction entry",
    result: "$620$ in first week",
    quote: "Growvolt saw what I couldn't—my tutorials were free versions of a paid product.",
    image: "https://i.ibb.co/QFSgNcp6/mia.jpg",
    fullStory: {
       TheProblem: {
    text: "Mia had a deeply loyal audience—but hated selling. Her followers were burned out by extreme fitness culture and aggressive programs.",
    points: [
      "High trust",
      "Low pressure",
    ],
  },

  WhatWeDid: {
    text: "We leaned into softness, not scale.",
    points: [
      "Created Gentle Reset — 21 Days to Feeling Good Again",
      "Low-ticket, low-friction entry",
      "Zero transformation pressure",
    ],
  },

  TheResult: {
    text: "The funnel felt like an invitation, not a pitch.",
    points: [
      "$620 in the first week",
      "Consistent evergreen sales",
      "Seamless path into higher-touch offers",
      "Quiet products can still print — if they’re honest",
    ],
    
  },

  metrics: ["$620 first week", "High trust"],
}

  },
  {
    id: "Ava",
    name: "Ava Collins",
    platform: " Instagram + Reels",
    followers: "21K",
    problem: "The attention was organic.But there was no product to capture it",
    solution: "Product swaps by budget",
    result: "$1,350 in 6 days",
    quote: "I was addicted to views. Growvolt made me addicted to revenue instead.",
    image: "https://i.ibb.co/HpqwCKz7/ava.jpg",
    fullStory: {
     TheProblem: {
    text: "Ava was 30 days away from her wedding. Her audience knew it—and her DMs showed it. The urgency was real, the attention was organic, but there was no product to capture the moment.",
    points: [
      "Followers repeatedly asked for her skincare routine",
      "High engagement driven by a real-life deadline",
      "Creators usually let moments like this pass",
    ],
  },

  WhatWeDid: {
    text: "We treated the wedding countdown like a launch window and turned what she was already doing into a simple, timeline-based product.",
    points: [
      "Created “30-Day Wedding Glow-Up” based on her real routine",
      "Packaged daily AM/PM skincare + weekly checklists",
      "Positioned it as a beauty reset for weddings, events, and photos",
    ],
  },

  TheResult: {
    text: "The launch felt like following along—not being sold to.",
    points: [
      "$1,350 in 6 days with no ads or hype",
      "Majority buyers weren’t brides (events, trips, shoots)",
      "Continued evergreen sales after the wedding",
    ],
  },

  metrics: ["$1.35K in 6 days",  "High trust"],
}
  },

];

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of Sarah",
    code: "Sarah Jenkins - Digital Artist",
    role: "Digital Artist"
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of Michael",
    code: "Michael Chen - Photographer",
    role: "Photographer"
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of David",
    code: "David Miller - UX Designer",
    role: "UX Designer"
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of Emily",
    code: "Emily Zhang - Art Director",
    role: "Art Director"
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    alt: "Portrait of James",
    code: "James Wilson - Motion Designer",
    role: "Motion Designer"
  }
];

const FAQ_DATA = [
  {
    question: "I only have 10K followers. Is that enough?",
    answer: "Yes. We've launched successful products with creators at 8K followers. It's not about size—it's about engagement and having an audience that trusts you.",
  },
  {
    question: "How long until I see revenue?",
    answer: "Most clients launch within 4-6 weeks and see first sales within 24 hours of launch. Our fastest launch was 3 weeks from first call to first sale.",
  },
  {
    question: "Do I need a big email list?",
    answer: "No. We've launched with lists of 200-500 people and hit $5K+ launches. Social followers can convert directly.",
  },
  {
    question: "What if my product doesn't sell?",
    answer: "We validate before we build. If our research shows low demand, we'll pivot before wasting time. Our 14-day guarantee covers you.",
  },
  {
    question: "How is this different from buying a course?",
    answer: "Courses teach theory. We do the work. You stay focused on content; we handle the business side.",
  },
  {
    question: "What kind of products do you build?",
    answer: "Digital products: guides, templates, mini-courses, workshops, memberships, paid communities. No physical products or high-touch coaching (yet).",
  },
];

// ==========================================
// 2. SHARED UTILS
// ==========================================

const BRAND_GRADIENT = "from-[#3B82F6] to-[#6D28D9]";

const Logo = React.memo(({ className = "" }) => (
  <span className={`font-bold text-xl tracking-tight text-white font-jakarta ${className}`}>
    Grow<span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>volt</span>
  </span>
));

const GlowText = ({ children }) => (
  <span className="text-white font-bold drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("desktop");

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth < 768) {
          setBreakpoint("mobile");
        } else {
          setBreakpoint("desktop");
        }
      }, 150);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    }
  }, []);

  return breakpoint;
}

const WhatsAppIcon = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const SectionDivider = React.memo(() => (
  <div className="w-full flex justify-center relative z-20 pointer-events-none -mt-[1px] -mb-[1px]">
    <div className="w-full max-w-xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
  </div>
));

// Optimization: Memoize background to prevent re-renders on scroll
const BackgroundGlows = React.memo(() => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
    <div 
      className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-[100%] opacity-20 blur-[100px]"
      style={{ background: 'radial-gradient(circle at 50% 50%, #3B82F6, transparent 70%)' }} 
    />
    <motion.div 
      animate={{ 
        x: [0, 30, 0], 
        y: [0, -20, 0], 
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] bg-purple-600/10 rounded-full blur-[100px]" 
    />
    <motion.div 
      animate={{ 
        x: [0, -30, 0], 
        y: [0, 30, 0], 
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="absolute top-[40%] right-[5%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[100px]" 
    />
  </div>
));

// ==========================================
// 3. UI COMPONENTS
// ==========================================

const Bullet = ({ icon, title, desc }) => (
  <div className="group flex items-start gap-4">
    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-gradient-to-r ${BRAND_GRADIENT} group-hover:text-white transition-all duration-300`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="text-base md:text-lg font-bold text-white mb-0.5 font-jakarta">{title}</h4>
      <p className="text-sm md:text-base text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors font-inter">{desc}</p>
    </div>
  </div>
);

const TestimonialCard = ({ initials, name, role, quote }) => (
  <div className="p-8 md:p-10 rounded-[2rem] bg-[#0f0f14]/50 backdrop-blur-sm border border-white/5 relative group hover:border-blue-500/30 transition-all duration-300">
    <div className={`absolute -top-4 left-10 p-2.5 rounded-xl bg-gradient-to-r ${BRAND_GRADIENT} text-white shadow-xl shadow-blue-600/20`}>
      <Quote size={20} />
    </div>
    <p className="text-base md:text-lg text-zinc-300 mb-10 italic leading-relaxed pt-4 font-inter">
      "{quote}"
    </p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-extrabold text-sm font-jakarta">
        {initials}
      </div>
      <div>
        <p className="text-sm md:text-base font-bold text-white font-jakarta">{name}</p>
        <p className="text-xs md:text-sm text-zinc-500 font-medium tracking-wide uppercase font-jakarta">{role}</p>
      </div>
    </div>
  </div>
);

// ==========================================
// 4. SECTIONS
// ==========================================

const ExpandingGallery = ({ className }) => {
  const [activeImage, setActiveImage] = useState(0);
  const breakpoint = useBreakpoint();

  if (breakpoint === "mobile") {
    return (
      <div className="w-full flex items-center justify-center py-10 relative z-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn("relative w-full px-4 overflow-hidden select-none", className)}
          style={{ touchAction: "pan-y" }}
        >
          <div className="text-center mb-8">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} text-xs font-extrabold uppercase tracking-[0.2em] mb-3 block font-jakarta`}>Partners</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-jakarta">
              Our Creative <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Partners</span>
            </h2>
          </div>

          <div
            className="flex items-center justify-center w-full overflow-hidden"
            style={{ touchAction: "pan-y", gap: "8px" }}
          >
            {GALLERY_IMAGES.slice(0, 5).map((image, index) => {
              const isActive = activeImage === index;
              return (
                <motion.div
                  key={index}
                  className="relative cursor-pointer overflow-hidden rounded-2xl flex-shrink-0 border border-white/5 bg-white/5"
                  animate={{
                    flex: isActive ? "1 1 55%" : "0 0 10%",
                    opacity: isActive ? 1 : 0.6,
                    filter: isActive ? "grayscale(0%)" : "grayscale(50%)",
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={() => setActiveImage(index)}
                  style={{ height: "300px", minWidth: 0, willChange: "flex, opacity" }}
                >
                  <img
                    src={image.src}
                    className="w-full h-full object-cover pointer-events-none"
                    alt={image.alt}
                    draggable={false}
                    loading="lazy"
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                      >
                        <p className="text-sm font-bold text-white font-jakarta leading-tight">
                          {image.code.split(' - ')[0]}
                        </p>
                         <p className="text-[10px] text-zinc-300 uppercase tracking-wider font-jakarta mt-0.5">
                          {image.role}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-[10px] uppercase tracking-widest text-zinc-500 mt-6 font-bold font-jakarta">
            Tap to expand
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 flex flex-col items-center justify-center relative z-20 overflow-hidden">
      {/* Added subtle glow behind gallery title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <FadeIn className="text-center mb-12 relative z-10">
        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block font-jakarta`}>Our Network</span>
        {/* STANDARDIZED HEADING */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-jakarta">
          Our Creative <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Partners</span>
        </h2>
      </FadeIn>
      
      <div className="flex gap-4 w-full max-w-6xl h-[500px] px-6 relative z-10">
        {GALLERY_IMAGES.map((image, index) => {
          const isActive = activeImage === index;
          return (
            <motion.div
              key={index}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0e]",
                isActive ? "flex-[3]" : "flex-[0.5] hover:flex-[0.75] hover:border-white/20"
              )}
              onClick={() => setActiveImage(index)}
              layout
              transition={{ duration: 0.5, ease: "circOut" }}
              style={{ willChange: "flex" }}
            >
              <img
                src={image.src}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: isActive ? 'scale(1)' : 'scale(1.1)' }}
                alt={image.alt}
                loading="lazy"
              />
              
              <motion.div 
                className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-300"
                animate={{ opacity: isActive ? 0 : 1 }}
              />

              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key="active-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                  >
                    <h3 className="text-3xl font-extrabold text-white mb-2 font-jakarta">
                      {image.code.split(' - ')[0]}
                    </h3>
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                        <p className="text-white/90 text-xs font-bold uppercase tracking-wider font-jakarta">
                        {image.role}
                        </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white font-extrabold text-xl -rotate-90 whitespace-nowrap opacity-60 tracking-widest uppercase font-jakarta">
                       {image.code.split(' - ')[0].split(' ')[0]}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
       <p className="text-center text-xs font-bold uppercase tracking-widest text-zinc-500 mt-10 font-jakarta relative z-10">
          Click cards to explore
       </p>
    </div>
  );
};

const ProcessSection = () => {
  return (
    // Changed bg-[#050509] to transparent to allow global flow
    <section id="process" className="bg-transparent text-white py-20 px-5 font-sans flex justify-center relative z-20">
      <div className="w-full max-w-[1100px]">
        {/* Header */}
        <p className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} text-[13px] tracking-[2px] font-semibold mb-3 uppercase font-jakarta`}>
          THE PROCESS
        </p>
        {/* STANDARDIZED HEADING (Left aligned, but standardized font) */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight font-jakarta">
          Simple. Repeatable. Profitable.
        </h2>
        <p className="text-zinc-400 mb-16 text-base font-inter">
          Three steps between you and recurring revenue.
        </p>

        {/* Steps Container */}
        <div className="flex flex-col gap-[60px]">
          
          {/* Step 1 */}
          <div className="flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-[52px] h-[52px] rounded-full bg-[#0f0f14] text-[#3B82F6] flex items-center justify-center font-bold text-base border border-white/5 shadow-sm font-jakarta">
                01
              </div>
              <div className="w-0.5 h-full bg-gradient-to-b from-[#3B82F6] to-transparent mt-2 rounded-full"></div>
            </div>
            <div className="pt-2">
              <h3 className="text-[20px] sm:text-[22px] mb-2 font-bold text-white font-jakarta">Discovery Call</h3>
              <p className="text-zinc-400 max-w-[480px] leading-relaxed mb-2.5 text-sm sm:text-base font-inter">
                20 minutes. We learn your audience, audit your content, and
                identify the product hiding in your DMs.
              </p>
              <span className="text-[#3B82F6] italic text-sm font-inter">
                Most creators are sitting on goldmines. We help you see it.
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-[52px] h-[52px] rounded-full bg-[#0f0f14] text-[#3B82F6] flex items-center justify-center font-bold text-base border border-white/5 shadow-sm font-jakarta">
                02
              </div>
              <div className="w-0.5 h-full bg-gradient-to-b from-[#3B82F6] to-transparent mt-2 rounded-full"></div>
            </div>
            <div className="pt-2">
              <h3 className="text-[20px] sm:text-[22px] mb-2 font-bold text-white font-jakarta">Build & Launch</h3>
              <p className="text-zinc-400 max-w-[480px] leading-relaxed mb-2.5 text-sm sm:text-base font-inter">
                We handle product creation, sales page, email sequence, and
                launch strategy. You focus on content.
              </p>
              <span className="text-[#3B82F6] italic text-sm font-inter">
                Done-for-you means done-for-you. No homework.
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-[52px] h-[52px] rounded-full bg-[#0f0f14] text-[#3B82F6] flex items-center justify-center font-bold text-base border border-white/5 shadow-sm font-jakarta">
                03
              </div>
              {/* No line for the last step */}
            </div>
            <div className="pt-2">
              <h3 className="text-[20px] sm:text-[22px] mb-2 font-bold text-white font-jakarta">Scale & Optimize</h3>
              <p className="text-zinc-400 max-w-[480px] leading-relaxed mb-2.5 text-sm sm:text-base font-inter">
                Post-launch, we analyze what’s working, double down on winners,
                and systematize your revenue.
              </p>
              <span className="text-[#3B82F6] italic text-sm font-inter">
                Launch once, earn forever. That’s the goal.
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-zinc-400 mb-2 font-inter">Ready to start?</p>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.open("https://calendly.com/growvolt-us/30min", "_blank");
            }}
            className="text-[#3B82F6] font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-1 group font-jakarta"
          >
            Book your discovery call 
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}



// Helper component to inject script for the Strategy Call section
const ScriptInjector = () => {
    useEffect(() => {
        const head = document.querySelector('head');
        let script = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
        
        if (!script) {
            script = document.createElement('script');
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            head.appendChild(script);
        }

        const initWidget = () => {
            if (window.Calendly) {
                window.Calendly.initInlineWidget({
                    url: 'https://calendly.com/growvolt-us/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0b0b0f&text_color=ffffff&primary_color=3b82f6',
                    parentElement: document.getElementById('calendly-strategy-embed'),
                    prefill: {},
                    utm: {}
                });
            }
        };

        if (script.complete) {
            initWidget();
        } else {
            script.onload = initWidget;
            // Fallback just in case script was already loaded
            setTimeout(initWidget, 1000); 
        }
    }, []);

    return null;
};

const StrategyCallSection = () => {
  return (
    <>
      <ScriptInjector />
      <section className="strategy-section">
        <div className="strategy-container">

          {/* Left Content */}
          <div className="strategy-left">
            <p className="strategy-label">LET’S TALK</p>
            <h2>Book Your Free Strategy Call</h2>
            <p className="strategy-sub">
              20 minutes. Zero pressure. We'll analyze your audience and show you
              the product opportunity you're sitting on.
            </p>

            <ul className="strategy-list">
              <li>Audience analysis & product fit assessment</li>
              <li>Revenue potential estimate for your niche</li>
              <li>Clear next steps (whether we work together or not)</li>
            </ul>

            <div className="strategy-meta">
              <span>⏱ 20 minutes</span>
              <span>📅 Via Zoom</span>
            </div>
          </div>

          {/* Right Card - Full Calendly Integration */}
          <div className="strategy-card">
            <div id="calendly-strategy-embed" style={{ height: '100%', width: '100%', background: '#b4b4b4!important' }}></div>
          </div>

        </div>
      </section>

      <style>{`
        /* Smooth Transition Gradient added here */
        .strategy-section {
          background: linear-gradient(to bottom, transparent, #050509);
          padding: 100px 20px;
          color: white;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          position: relative;
          z-index: 20;
        }

        .strategy-container {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: flex-start;
        }

        .strategy-label {
          color: #3B82F6;
          font-size: 12px;
          letter-spacing: 2px;
          font-weight: 600;
          margin-bottom: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* STANDARDIZED HEADING via CSS */
        .strategy-left h2 {
          font-size: 48px; 
          margin: 0;
          margin-bottom: 16px;
          line-height: 1.1;
          font-weight: 800; /* Extrabold */
          letter-spacing: -0.025em; /* Tracking tight */
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .strategy-sub {
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 30px;
          font-size: 16px;
        }

        .strategy-list {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }

        .strategy-list li {
          margin-bottom: 14px;
          padding-left: 28px;
          position: relative;
          color: #e5e7eb;
        }

        .strategy-list li::before {
          content: "✔";
          position: absolute;
          left: 0;
          color: #3B82F6;
          font-weight: bold;
        }

        .strategy-meta {
          display: flex;
          gap: 24px;
          color: #9ca3af;
          font-size: 14px;
        }
        
        .strategy-meta span {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .strategy-card {
          background: #0b0b0f;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 0;
          text-align: center;
          box-shadow: 0 0 60px rgba(59,130,246,0.05);
          height: 650px; 
          overflow: hidden; 
        }

        @media (max-width: 800px) {
          .strategy-container {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .strategy-left h2 {
            font-size: 30px; /* Equivalent to text-3xl */
          }

          .strategy-card {
             height: 600px;
          }
        }
      `}</style>
    </>
  );
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Updated with ambient glow effects
    <section className="py-20 md:py-32 relative z-20 overflow-hidden">
      {/* Background & Glow Layers */}
      <div className="absolute inset-0 bg-[#050509] -z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-30 pointer-events-none -z-10">
           <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
           <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block font-jakarta`}>
              FAQ
            </span>
            {/* STANDARDIZED HEADING */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-jakarta">
              Questions We <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Get Asked</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg">
              Straight answers. No runaround.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className={`bg-[#0a0a0e]/80 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${
                  openIndex === index ? "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-sm md:text-base pr-4 font-jakarta transition-colors ${openIndex === index ? 'text-white' : 'text-zinc-300'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-inter">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="text-center mt-16">
            <FadeIn delay={0.4}>
                <p className="text-zinc-500 mb-4 text-sm font-jakarta font-bold uppercase tracking-widest">Still have questions?</p>
                <button 
                    onClick={() => window.open("https://calendly.com/growvolt-us/30min", "_blank")}
                    className={`inline-flex items-center gap-2 text-blue-400 font-bold text-sm md:text-base hover:text-blue-300 transition-colors font-jakarta`}
                >
                    Book a free call and ask us directly <ArrowRight size={16} />
                </button>
            </FadeIn>
        </div>
      </div>
    </section>
  );
};

const CalendlyBookingSection = ({ pageKey }) => {
    return null;
};

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
    <section className="py-20 md:py-32 relative z-20 overflow-hidden selection:bg-blue-500/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <FadeIn>
            {/* STANDARDIZED HEADING */}
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight font-jakarta">Your Current Situation</h2>
            <p className="text-zinc-500 max-w-lg mx-auto text-base md:text-lg leading-relaxed font-inter">The invisible barriers keeping you from <span className="text-white font-medium">monetizing</span> your influence effectively.</p>
          </FadeIn>
        </div>
        <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {points.map((point, idx) => (
            <div key={point.id} className="min-w-[100%] md:min-w-0 snap-center px-1 md:px-0" style={{ scrollSnapStop: 'always' }}>
              <FadeIn delay={idx * 0.1}>
                <div className="group relative h-full pt-8 px-8 pb-5 md:pt-10 md:px-10 md:pb-7 rounded-[2.5rem] bg-[#0a0a0e]/80 backdrop-blur-sm border border-white/5 hover:border-white/10 hover:-translate-y-1.5 transition-all duration-500 flex flex-col overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${BRAND_GRADIENT} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none`} />
                  <div className={`absolute top-8 right-10 text-6xl font-extrabold text-white/[0.02] group-hover:text-blue-500/[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none font-jakarta`}>{point.id}</div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all duration-500 relative z-10">
                    <div className="group-hover:scale-110 group-hover:text-blue-400 transition-all duration-500">{point.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors relative z-10 font-jakarta">{point.title}</h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors relative z-10 font-inter">{point.desc}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {points.map((_, i) => (
            <div key={i} className={`transition-all duration-500 h-1.5 rounded-full ${activeIndex === i ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoSection = ({ 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  thumbnailUrl 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const brandGradient = 'linear-gradient(to right, #3B82F6, #6D28D9)';

  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden flex flex-col justify-center perspective-1000">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14 relative"
        >
          {/* Ambient Glow behind text */}
          <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
          
          {/* UPDATED HEADER: Controlled for 2 lines on desktop, kept slightly smaller per instruction */}
          <h2 className="relative z-10 text-2xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight mb-6 leading-tight font-jakarta drop-shadow-xl max-w-5xl mx-auto">
            See how we help creators turn expertise into<br className="hidden md:block" />
            <span 
              className="bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] ml-2"
              style={{ backgroundImage: brandGradient }}
            >
              scalable products
            </span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-inter relative z-10">
            A 3-minute overview of our process and the results we've delivered for our partners.
          </p>
        </motion.div>

        {/* Video Container - Optimized for Performance */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Laptop Frame Container */}
          <div 
            className="relative rounded-t-2xl bg-[#0a0a0e] border border-white/10 shadow-2xl overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
            }}
          >
            {/* Screen Content */}
            <div className="aspect-video w-full relative bg-black">
              {isPlaying ? (
                <iframe
                  src={`${videoUrl}?autoplay=1&rel=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Introduction video"
                  loading="lazy"
                />
              ) : (
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none"
                  aria-label="Play introduction video"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] to-[#050509] flex items-center justify-center">
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                    />
                    
                    {/* Play Button */}
                    <div className="relative z-10 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
          
          {/* Laptop Bottom Bar */}
          <div className="h-4 w-full bg-[#1a1a20] rounded-b-xl border-t border-white/5 relative flex justify-center">
             <div className="w-16 h-1 bg-white/20 rounded-full mt-1.5" />
          </div>
        </div>

        {/* Credibility Signal */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-sm md:text-base text-zinc-400 font-inter">
            Trusted by{' '}
            <span 
              className="font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: brandGradient }}
            >
              50+ creators
            </span>{' '}
            generating{' '}
            <span 
              className="font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: brandGradient }}
            >
              $2M+
            </span>{' '}
            in digital product revenue
          </p>
        </motion.div>
      </div>
    </section>
  );
};

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
          <motion.div 
            key="build"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className={`text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} opacity-20`}>01</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-jakarta">Growvolt Build</h3>
                <p className={`text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} font-bold font-jakarta`}>The Precision Blueprint</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-zinc-300 mb-8 leading-relaxed font-inter">
              We discover the product already validated by your audience's struggles and your unique insight.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<Search size={18} />} title="Deep-Dive Research" desc="Analyzing audience pains and conversations—not just demographics." />
              <Bullet icon={<Lightbulb size={18} />} title="Knowledge Synthesis" desc="Auditing content to extract your unique transformative framework." />
              <Bullet icon={<Code size={18} />} title="Product Architecture" desc="Blueprinting the exact product at the intersection of demand and authority." />
              <Bullet icon={<Video size={18} />} title="Asset Creation" desc="Producing core content and materials for a premium user experience." />
            </div>
          </motion.div>
        );
      case 'launch':
        return (
          <motion.div 
            key="launch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className={`text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} opacity-20`}>02</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-jakarta">Growvolt Launch</h3>
                <p className={`text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} font-bold font-jakarta`}>Market Penetration</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-zinc-300 mb-8 leading-relaxed font-inter">
              We deploy your asset into the market with a conversion-optimized journey designed for high-trust sales.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<Compass size={18} />} title="Strategic Roadmap" desc="Coordinated deployment across social channels to build massive anticipation." />
              <Bullet icon={<Megaphone size={18} />} title="Hype Engineering" desc="Psychology-backed messaging that frames your asset as the ultimate solution." />
              <Bullet icon={<Layout size={18} />} title="Conversion Funnels" desc="High-converting landing pages designed to minimize friction and maximize sales." />
              <Bullet icon={<Target size={18} />} title="Launch Execution" desc="Managing the live intake, support, and tech to ensure a flawless buying experience." />
            </div>
          </motion.div>
        );
      case 'scale':
        return (
          <motion.div 
            key="scale"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className={`text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} opacity-20`}>03</span>
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight font-jakarta">Growvolt Scale</h3>
                <p className={`text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} font-bold font-jakarta`}>Sustainable Velocity</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-zinc-300 mb-8 leading-relaxed font-inter">
              We shift from one-time launch energy to automated growth systems that compound over time.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <Bullet icon={<TrendingUp size={18} />} title="Automated Funnels" desc="Evergreen systems that capture leads and close sales 24/7 autonomously." />
              <Bullet icon={<BarChart3 size={18} />} title="Data Optimization" desc="Iterative testing of copy and creative to lower acquisition costs and increase ROI." />
              <Bullet icon={<Repeat size={18} />} title="Retention Logic" desc="Upsell paths and community structures to maximize lifetime customer value." />
              <Bullet icon={<Zap size={18} />} title="Ecosystem Expansion" desc="Identifying secondary product opportunities to keep your growth compounding." />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-white py-20 md:py-32 font-inter relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Mobile-Optimized Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <p className="text-[10px] md:text-xs text-blue-400 font-extrabold uppercase tracking-[0.2em] font-jakarta">The Growvolt Methodology</p>
          </div>
          {/* STANDARDIZED HEADING */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight font-jakarta">
            Build, Launch, <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Scale.</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-inter">
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
                  className={`relative rounded-xl py-3.5 md:py-4 text-xs md:text-base font-bold transition-all duration-300 font-jakarta ${
                    activeTab === tab.id 
                      ? `bg-gradient-to-r ${BRAND_GRADIENT} text-white shadow-xl shadow-blue-600/20` 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-[#0f0f14]/80 p-8 md:p-14 shadow-3xl relative overflow-hidden backdrop-blur-sm min-h-[500px]">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none`} />
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>

        {/* Partner Success Stories */}
        <div className="max-w-6xl mx-auto border-t border-white/5 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-jakarta">Partner Impact</h3>
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
// 5. NAVIGATION & FOOTER (Defined BEFORE Views)
// ==========================================

const StickyHeader = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
        const isScrolled = window.scrollY > 20;
        if (isScrolled !== scrolled) setScrolled(isScrolled);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    if (!isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "Home", id: 'home' },
    { label: "Services", id: 'services' },
    { label: "Case Studies", id: 'casestudies' },
    { label: "About", id: 'about' },
    { label: "Contact Us", id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, ease:'easeOut' }} 
          className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl pl-6 pr-2 py-2.5 rounded-full bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all ${scrolled ? 'border-white/20' : ''}`}
        >
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo />
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-zinc-400 font-jakarta">
            {menuItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={`hover:text-white transition-colors relative group ${currentView.startsWith('casestudy') && item.id === 'casestudies' ? 'text-white' : currentView === item.id ? 'text-white' : ''}`}>
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r ${BRAND_GRADIENT} transition-all ${currentView.startsWith('casestudy') && item.id === 'casestudies' ? 'w-full' : currentView === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => window.open("https://calendly.com/growvolt-us/30min", "_blank")} className="hidden sm:flex items-center px-5 py-2.5 rounded-full bg-white text-black font-extrabold text-[10px] uppercase tracking-wider hover:bg-zinc-200 transition-colors font-jakarta">Book Call</button>
            <button 
              ref={buttonRef}
              onClick={toggleMenu} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 active:scale-95 group relative overflow-hidden"
            >
               <Menu className="text-zinc-400 group-hover:text-white" size={20} />
            </button>
          </div>
        </motion.div>
      </header>
      
      <AnimatePresence>
        {isMenuOpen && buttonRect && (
          <motion.div 
            initial={{ 
              clipPath: `circle(0px at ${buttonRect.left + buttonRect.width/2}px ${buttonRect.top + buttonRect.height/2}px)`
            }}
            animate={{ 
              clipPath: `circle(150% at ${buttonRect.left + buttonRect.width/2}px ${buttonRect.top + buttonRect.height/2}px)`
            }}
            exit={{ 
              clipPath: `circle(0px at ${buttonRect.left + buttonRect.width/2}px ${buttonRect.top + buttonRect.height/2}px)`
            }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[60] bg-[#050509] flex flex-col items-center justify-center"
          >
            {/* The Close Button - Perfectly positioned over the trigger */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: 'absolute',
                top: buttonRect.top,
                left: buttonRect.left,
                width: buttonRect.width,
                height: buttonRect.height,
              }}
              className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-50"
            >
              <X size={20} />
            </button>

            <nav className="text-center space-y-6 relative z-10">
              {menuItems.map((item, idx) => {
                const isActive = (currentView === item.id) || (item.id === 'casestudies' && currentView.startsWith('casestudy'));
                return (
                  <div key={idx} className="overflow-hidden">
                    <motion.button 
                      onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }} 
                      initial={{ x: -40, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      transition={{ delay: 0.1 + (idx * 0.0), duration: 0.2, ease: "easeIn" }} 
                      className={`block text-3xl font-extrabold tracking-tight transition-all cursor-pointer font-jakarta hover:text-blue-400 ${isActive ? 'text-blue-500' : 'text-white'}`}
                    >
                      {item.label}
                    </motion.button>
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = ({ onNavigate }) => (
  <footer className="bg-[#050509] pt-20 pb-12 border-t border-white/5 text-white relative z-10">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-16">
        <div className="md:col-span-5 flex flex-col items-start text-white">
          <FadeIn>
            <span className="mb-6 block cursor-pointer" onClick={() => onNavigate('home')}><Logo className="text-6xl" /></span>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-sm font-inter">{FOOTER_DATA.brand.description}</p>
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
                <h3 className="text-white font-bold text-lg mb-6 font-jakarta">{menu.title}</h3>
                <ul className="space-y-4">
                  {menu.items.map((item) => (
                    <li key={item.label}><button onClick={() => onNavigate(item.id)} className="text-zinc-400 hover:text-white text-sm transition-colors text-left font-bold font-jakarta">{item.label}</button></li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-jakarta font-bold">
        <p>© 2025 Growvolt. All rights reserved.</p>
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
// 6. VIEW COMPONENTS
// ==========================================

const CaseStudiesView = ({ onNavigate }) => {
  const [selectedCase, setSelectedCase] = useState(null);
  
  const activeCase = CASE_STUDIES_DATA.find((c) => c.id === selectedCase);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#050509] min-h-screen pt-36 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-20">
          <FadeIn>
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} text-xs font-extrabold uppercase tracking-[0.2em] mb-4 block font-jakarta`}>
              Results
            </span>
            {/* STANDARDIZED HEADING */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-jakarta">
              Creators Who <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Took the Leap</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-inter">
              Real creators. Real products. Real revenue.
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASE_STUDIES_DATA.map((study, idx) => (
            <FadeIn key={study.id} delay={idx * 0.1}>
              <div
                className="group relative p-6 md:p-8 rounded-[2rem] bg-[#0a0a0e] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedCase(study.id)}
              >
                {/* Image & Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-blue-500/20 transition-colors">
                    <img src={study.image} alt={study.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider font-jakarta">
                        {study.platform} · {study.followers}
                      </span>
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl text-white font-jakarta">
                      {study.name}
                    </h3>
                  </div>
                </div>

                {/* Problem/Solution/Result */}
                <div className="space-y-3 mb-6 text-sm font-inter">
                  <div className="flex gap-3">
                    <span className="text-zinc-500 w-16 flex-shrink-0 font-medium">Problem:</span>
                    <span className="text-zinc-300">{study.problem}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-500 w-16 flex-shrink-0 font-medium">Solution:</span>
                    <span className="text-zinc-300">{study.solution}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-blue-400 w-16 flex-shrink-0 font-bold">Result:</span>
                    <span className="text-blue-400 font-bold">{study.result}</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-zinc-500 italic border-l-2 border-blue-500/20 pl-4 py-1 mb-6 font-inter">
                  "{study.quote}"
                </blockquote>

                {/* Hover CTA */}
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 font-jakarta">
                  Read full story <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-[#0a0a0e] border border-white/10 p-6 md:p-10 shadow-2xl no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8 md:mb-10 pb-8 border-b border-white/5">
                 <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={activeCase.image} alt={activeCase.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-3 font-jakarta">
                        {activeCase.platform} · {activeCase.followers}
                    </span>
                    <h3 className="font-bold text-2xl md:text-3xl text-white mb-2 font-jakarta">
                        {activeCase.name}
                    </h3>
                    <p className="text-blue-400 font-bold text-lg md:text-xl font-jakarta">{activeCase.result}</p>
                  </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
                {activeCase.fullStory.metrics.map((metric, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center flex items-center justify-center">
                    <span className="text-white font-bold text-xs md:text-sm font-jakarta">{metric}</span>
                  </div>
                ))}
              </div>

             {/* Story */}
<div className="space-y-8 text-sm md:text-base font-inter leading-relaxed">

  {/* The Problem */}
  <div>
    <h4 className="font-bold text-lg text-white mb-2 font-jakarta">
      The Problem
    </h4>

    <p className="text-zinc-400 mb-3">
      {activeCase.fullStory.TheProblem.text}
    </p>

    <ul className="list-disc pl-5 text-zinc-400 space-y-1">
      {activeCase.fullStory.TheProblem.points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  </div>

  {/* What We Did */}
  <div>
    <h4 className="font-bold text-lg text-white mb-2 font-jakarta">
      What We Did
    </h4>

    <p className="text-zinc-400 mb-3">
      {activeCase.fullStory.WhatWeDid.text}
    </p>

    <ul className="list-disc pl-5 text-zinc-400 space-y-1">
      {activeCase.fullStory.WhatWeDid.points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  </div>

  {/* The Result */}
  <div>
    <h4 className="font-bold text-lg text-white mb-2 font-jakarta">
      The Result
    </h4>

    <p className="text-zinc-400 mb-3">
      {activeCase.fullStory.TheResult.text}
    </p>

    <ul className="list-disc pl-5 text-zinc-400 space-y-1">
      {activeCase.fullStory.TheResult.points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  </div>



</div>


              {/* CTA */}
              <div className="mt-10 md:mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-zinc-500 mb-4 text-sm font-bold uppercase tracking-widest font-jakarta">Ready to write your success story?</p>
                <button
                  onClick={() => window.open("https://calendly.com/growvolt-us/30min", "_blank")}
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${BRAND_GRADIENT} text-white font-extrabold rounded-full hover:scale-105 transition-all uppercase tracking-widest text-xs font-jakarta shadow-lg shadow-blue-500/20`}
                >
                  Book Your Strategy Call <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HomeView = ({ heroState, setHeroState, onNavigate }) => {
  const handleToggle = (state) => {
    setHeroState(state);
    if (state === 'book') setTimeout(() => { window.open("https://calendly.com/growvolt-us/30min", "_blank"); }, 300);
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative z-10 w-full min-h-[85vh] flex flex-col items-center justify-center px-6 pt-36 pb-20 md:pt-48 md:pb-32">
        <div className="w-full max-w-2xl text-center">
          <FadeIn><div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 text-white"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> <span className="text-[11px] font-extrabold uppercase tracking-widest font-jakarta">Creator Economy</span></div></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.15] mb-8 tracking-tighter text-white font-jakarta">
              Turn your Influence
              <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Into Revenue</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}><p className="text-zinc-400 mb-12 max-w-md mx-auto text-base md:text-lg leading-relaxed font-inter">Monetize your audience with tailored solutions that deliver real, lasting growth.</p></FadeIn>
          <FadeIn delay={0.3}>
            <div className={`w-full max-w-[340px] mx-auto p-[1px] rounded-full bg-gradient-to-r ${BRAND_GRADIENT} shadow-2xl`}>
              <div className="relative grid grid-cols-2 p-1 bg-[#0a0a0e]/95 rounded-full overflow-hidden">
                <motion.div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-zinc-100 rounded-full z-0 shadow-lg" animate={{ left: heroState === 'explore' ? '4px' : 'calc(50%)' }} transition={{ type: "spring", stiffness: 350, damping: 25 }} />
                <button onClick={() => handleToggle('explore')} className={`relative z-10 py-2.5 text-xs font-extrabold transition-colors duration-300 uppercase tracking-wider font-jakarta ${heroState === 'explore' ? 'text-black' : 'text-zinc-500'}`}>Explore</button>
                <button onClick={() => handleToggle('book')} className={`relative z-10 py-2.5 text-xs font-extrabold transition-colors duration-300 uppercase tracking-wider font-jakarta ${heroState === 'book' ? 'text-black' : 'text-zinc-500'}`}>Book Call</button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      <SectionDivider />
      <PainPointsSection />
      <SectionDivider />
      <VideoSection />
      <SectionDivider />
      <ExpandingGallery />
      <SectionDivider />
      <ProcessSection />
      <SectionDivider />
      <StrategyCallSection />
      <SectionDivider />
      <FAQSection />
    </motion.div>
  );
};

const ServicesView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#0a0a0f] text-[#e2e8f0] antialiased pb-20 md:pb-32">
    <section className="pt-36 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center text-white">
          <FadeIn>
            {/* REVERTED TO ORIGINAL SPECIFIC STYLING */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight font-jakarta">
              The Creator’s Trap: <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>High Influence, Low Infrastructure</span>
            </h2>
            <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-inter">
              You've built the audience and the authority. But without a scalable backend, you're just an employee of your own personal brand.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-16 text-left mt-20">
            {[
              { icon: Clock, title: "The Content Hamster Wheel", text: "Revenue stops the moment you stop posting. You're trapped in a cycle just to maintain baseline." },
              { icon: Lock, title: "Fragmented Monetization", text: "Your expertise is scattered, never compounding into a structured asset you actually own." },
              { icon: Phone, title: "Dwindling Brand Deals", text: "Sponsorships are volatile. Relying on external brands leaves your income at their mercy." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}><div className="flex flex-col gap-3 text-white"><div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1"><item.icon size={20} /></div><h3 className="text-lg md:text-xl font-extrabold mb-2 font-jakarta">{item.title}</h3><p className="text-zinc-400 leading-relaxed text-sm md:text-base font-inter">{item.text}</p></div></FadeIn>
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
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-[#050509] text-zinc-300 min-h-screen pt-36 pb-20 md:pt-48 md:pb-32 px-6">
    <div className="max-w-4xl mx-auto text-white">
      <FadeIn>
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20"><IconComp className="text-blue-500" size={32} /></div>
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-12 tracking-tight font-jakarta">{title.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>{word}</span> : word + ' ')}</h1>
        <div className="space-y-10 text-lg leading-relaxed text-zinc-400 font-inter">{content.map((section, idx) => (<div key={idx} className="space-y-4"><h2 className="text-xl font-extrabold uppercase tracking-wider font-jakarta text-white">{section.heading}</h2><p>{section.text}</p></div>))}</div>
      </FadeIn>
    </div>
  </motion.div>
);

const ContactView = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // *** IMPORTANT: PASTE YOUR FORMSPREE ID HERE ***
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjggvjvz"; 

    if (form.checkValidity()) {
      setIsSubmitting(true);
      const formData = new FormData(form);
      
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'app/json'
          }
        });
        
        if (response.ok) {
          setSubmitted(true);
          form.reset();
        } else {
          console.error("Form submission failed");
          alert("There was a problem submitting your form. Please try again later.");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("There was a network problem. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.4 }} 
      className="bg-[#0a0a0f] text-[#e2e8f0] min-h-screen"
    >
      <section className="pt-36 pb-20 md:pt-48 md:pb-32 px-6 max-w-4xl mx-auto text-white text-center">
        <FadeIn>
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT} text-xs font-extrabold tracking-widest uppercase mb-6 block font-jakarta`}>
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight mb-8 font-jakarta">
            Get In <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Touch</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto font-inter">
            Ready to build your asset?
          </p>
        </FadeIn>
        
        <div className="grid md:grid-cols-5 gap-12 mt-20 text-left">
          {/* Form Side */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="p-12 rounded-[3rem] bg-blue-500/5 border border-blue-500/10 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-extrabold text-white uppercase tracking-widest font-jakarta">
                  Sent
                </h3>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-zinc-500 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <FadeIn delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 font-inter disabled:opacity-50"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 font-inter disabled:opacity-50"
                  />

                  <textarea
                    name="message"
                    placeholder="Message..."
                    rows="5"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 resize-none font-inter disabled:opacity-50"
                  />

                  <div className="flex justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r ${BRAND_GRADIENT} text-white text-[10px] font-extrabold rounded-full transition-all active:scale-95 uppercase tracking-wider hover:opacity-90 font-jakarta disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} 
                      {!isSubmitting && <Send size={14} />}
                    </button>
                  </div>
                </form>
              </FadeIn>
            )}
          </div>
          
          {/* Info Side */}
          <div className="md:col-span-2">
            <FadeIn delay={0.4}>
              <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-10">
                <div>
                  <p className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-widest mb-4 font-jakarta">
                    Direct Email
                  </p>
                  <a href="mailto:growvolt.us@gmail.com" className="text-white font-extrabold text-base hover:text-blue-400 transition-colors break-all font-jakarta">
                   growvolt.us@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-widest mb-4 font-jakarta">
                    Instagram
                  </p>
                  <a href="https://instagram.com/growvolt.us" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white font-extrabold text-base hover:text-blue-400 transition-colors font-jakarta">
                    <Instagram size={20} className="text-blue-500" /> @growvolt.us
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </motion.div>
  );
};


// ==========================================
// 8. APP COMPONENT (Main Entry)
// ==========================================

const App = () => {
  const [currentView, setCurrentView] = useState('home'); 
  const [heroState, setHeroState] = useState('explore'); 
  const { scrollY } = useScroll();
  const gridOpacity = useTransform(scrollY, [0, 800], [0.6, 0]); 

  useEffect(() => { window.scrollTo(0, 0); }, [currentView]);

  return (
    <div className="min-h-screen bg-[#050509] text-zinc-100 font-inter relative overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Plus+Jakarta+Sans:wght@500;700;800&family=Playfair+Display:wght@400;700;900&display=swap');
        
        :root {
          --font-inter: 'Inter', sans-serif;
          --font-jakarta: 'Plus Jakarta Sans', sans-serif;
        }

        .font-inter { font-family: var(--font-inter); }
        .font-jakarta { font-family: var(--font-jakarta); }

        .bg-grid-pattern { 
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px); 
          background-size: 60px 60px; 
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%); 
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <BackgroundGlows />
      <motion.div style={{ opacity: gridOpacity }} className="fixed top-0 left-0 right-0 h-screen bg-grid-pattern pointer-events-none z-0" />
      <StickyHeader onNavigate={setCurrentView} currentView={currentView} />

      <AnimatePresence mode="wait">
        {currentView === 'home' && <HomeView key="home" heroState={heroState} setHeroState={setHeroState} onNavigate={setCurrentView} />}
        {currentView === 'services' && <ServicesView key="services" />}
        {currentView === 'about' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-white pb-20 md:pb-32 pt-36 md:pt-48 px-6">
            <div className="max-w-4xl mx-auto space-y-20 md:space-y-32">
              <FadeIn className="space-y-8">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-8 tracking-tight leading-[1.1] font-jakarta">
                  About Grow<span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>volt</span>
                </h1>
                <div className="text-base md:text-lg text-zinc-400 space-y-6 leading-[1.3] font-inter">
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
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-jakarta tracking-tight">What We <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Believe</span></h2>
                <div className="text-base md:text-lg text-zinc-400 space-y-6 leading-[1.3] font-inter">
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
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-jakarta tracking-tight">What We <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Do</span></h2>
                <div className="text-base md:text-lg text-zinc-400 space-y-6 leading-[1.3] font-inter">
                  <p>At Growvolt, we help creators turn what they already know into digital products their audience actually wants.</p>
                  <p>We handle the thinking, the building, and the launch — so creators can stay focused on creating.</p>
                  <p>Once something works, we scale it carefully. No rush. No noise. Just what makes sense.</p>
                </div>
              </FadeIn>
              <SectionDivider />
              <FadeIn className="space-y-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-jakarta tracking-tight">How We <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Work</span></h2>
                <div className="text-base md:text-lg text-zinc-400 space-y-6 leading-[1.3] font-inter">
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
              <FadeIn className="space-y-8 pb-20">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold font-jakarta tracking-tight">The <span className={`bg-clip-text text-transparent bg-gradient-to-r ${BRAND_GRADIENT}`}>Goal</span></h2>
                <div className="text-base md:text-lg text-zinc-400 space-y-6 leading-[1.3] font-inter">
                  <p>We’re not trying to build the biggest agency.</p>
                  <p>We’re here to help creators stop relying on luck and start building something solid.</p>
                  <p className="text-white text-xl md:text-2xl font-extrabold font-jakarta">That’s Growvolt.</p>
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
        {currentView === 'privacy' && <LegalView key="privacy" title="Privacy Policy" icon={ShieldCheck} content={[{
          text:"Last updated January 2026"
        },
  {
    heading: "Data Collection",
    text: "We collect personal and contact information such as name, email address, and messages submitted through our contact forms or scheduling tools (e.g., Calendly) for communication and consultation purposes."
  },
  {
    heading: "Automatically Collected Data",
    text: "When you visit our website, we may automatically collect technical data including IP address, browser type, device information, pages visited, and interaction behavior to improve website performance."
  },
  {
    heading: "Usage",
    text: "Collected data is strictly used for communication, responding to inquiries, providing services, improving user experience, and optimizing our brand and offerings."
  },
  {
    heading: "Cookies & Tracking",
    text: "We may use cookies and similar tracking technologies to analyze traffic, remember preferences, and enhance your browsing experience. You can disable cookies in your browser settings if preferred."
  },
  {
    heading: "Data Sharing",
    text: "We do not sell, rent, or trade your personal data. Information may only be shared with trusted third-party service providers when necessary to operate our services or when legally required."
  },
  {
    heading: "Data Security",
    text: "We implement reasonable technical and organizational safeguards to protect your information. However, no online transmission or storage system can be guaranteed to be completely secure."
  },
  {
    heading: "Third-Party Services",
    text: "Our website may include links or integrations with third-party services. We are not responsible for the privacy practices or content of those external platforms."
  },
  {
    heading: "User Rights",
    text: "You may request access, correction, or deletion of your personal data, subject to applicable laws. Requests can be made through our official communication channels."
  },
  {
    heading: "Policy Updates",
    text: "This Privacy Policy may be updated periodically. Continued use of our website indicates acceptance of any changes made."
  }

]} />}
        {currentView === 'terms' && <LegalView key="terms" title="Terms of Service" icon={Scale} content={[
          {
            text:"Last Updated January 2026",
          },
     {     
    heading: "Acceptance of Terms",
    text: "By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations."
  },
  {
    heading: "Eligibility",
    text: "You must be at least 18 years old or have permission from a legal guardian to use our services."
  },
  {
    heading: "Use of Services",
    text: "You agree to use our website only for lawful purposes and in a manner that does not violate applicable laws, infringe on the rights of others, or disrupt platform functionality."
  },
  {
    heading: "Intellectual Property",
    text: "All content, branding, design, and materials on this website are the intellectual property of the company and may not be copied, reproduced, or distributed without prior written permission."
  },
  {
    heading: "User Submissions",
    text: "Any information or content you submit through forms or communications must be accurate and lawful. You grant us the right to use such submissions solely to provide and improve our services."
  },
  {
    heading: "Third-Party Links",
    text: "Our website may include links to third-party platforms. We are not responsible for the content, policies, or practices of those external websites."
  },
  {
    heading: "Disclaimer",
    text: "Our services are provided on an 'as is' and 'as available' basis. We make no warranties regarding accuracy, reliability, or uninterrupted availability."
  },
  {
    heading: "Limitation of Liability",
    text: "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services."
  },
  {
    heading: "Indemnification",
    text: "You agree to indemnify and hold harmless the company from any claims, damages, or expenses arising from your misuse of the website or violation of these Terms."
  },
  {
    heading: "Termination",
    text: "We reserve the right to suspend or terminate access to our services at our discretion if these Terms are violated or misuse is detected."
  },
  {
    heading: "Governing Law",
    text: "These Terms of Service are governed by and interpreted in accordance with the applicable laws of the jurisdiction in which the company operates."
  },
  {
    heading: "Updates to Terms",
    text: "We may update these Terms of Service at any time. Continued use of the website constitutes acceptance of the revised terms."
  }]} />}
      </AnimatePresence>
      <Footer onNavigate={setCurrentView} />
    </div>
  );
};



export default App;
