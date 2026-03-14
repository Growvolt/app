import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll, useSpring } from "framer-motion";

// --- UTILITY ---
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// --- COMPONENT: MoneyCounter ---
function MoneyCounter({ value }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    Math.round(latest).toLocaleString('en-US')
  );

  useEffect(() => {
    const controls = animate(count, value, { 
      duration: 1.5, 
      ease: [0.16, 1, 0.3, 1] 
    });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}

// --- REDESIGNED HEADER COMPONENT (INTERSECTION OBSERVER APPROACH) ---
export function Header({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const isManualScrolling = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedItem = items.find(
            (item) => (item.url === "#" ? "home" : item.url.substring(1)) === id
          );
          if (matchedItem) {
            setActiveTab(matchedItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    items.forEach((item) => {
      const id = item.url === "#" ? "home" : item.url.substring(1);
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleNavClick = (name) => {
    isManualScrolling.current = true;
    setActiveTab(name);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  return (
    <div className={cn("fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[1000] w-[95%] sm:w-auto max-w-2xl transition-all duration-300", className)}>
      <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-6 bg-[#141414]/85 border border-white/10 backdrop-blur-2xl backdrop-saturate-200 py-1.5 px-2 sm:px-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] w-full">
        {items.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => handleNavClick(item.name)}
              className={cn(
                "relative cursor-pointer text-xs sm:text-sm font-bold px-3 sm:px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap",
                "text-white/60 hover:text-white",
                isActive && "text-white shadow-sm",
              )}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[#F4753D]/20 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 35, mass: 1.2 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#F4753D] rounded-t-full">
                    <div className="absolute w-12 h-6 bg-[#F4753D]/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#F4753D]/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#F4753D]/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// --- COMPONENT: AnimatedTestimonials ---
const AnimatedTestimonials = ({ testimonials, className }) => {
  const active = 0; // Locked to Mukesh
  const isActive = (index) => index === active;
  const rotations = [0, -6, 4];

  return (
    <div className={cn("max-w-sm md:max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rotations[index % rotations.length] }}
                  whileInView={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index % rotations.length],
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="absolute inset-0 origin-bottom transform-gpu will-change-transform"
                >
                  <img 
                    src={testimonial.src} 
                    alt={testimonial.name} 
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-[2rem] object-cover object-center shadow-2xl border border-gray-100 bg-gray-100" 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-center flex-col py-2 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="transform-gpu"
          >
            <h3 className="text-2xl font-black text-[#141414]">{testimonials[active].name}</h3>
            <p className="text-sm font-bold text-[#F4753D] uppercase tracking-widest mt-1">{testimonials[active].designation}</p>
            <p className="text-lg md:text-xl font-medium text-gray-500 mt-6 leading-relaxed">{testimonials[active].quote}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: ThreeLayerAlignment ---
const ThreeLayerAlignment = () => {
  const pillars = [
    {
      title: "Audience Trust",
      description: "Products surgically aligned with your voice to solve the real needs of your community.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      highlight: false
    },
    {
      title: "Platform Sovereignty",
      description: "True asset ownership. Diversify revenue away from volatile algorithms with products you control.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
      highlight: true
    },
    {
      title: "Shadow Operations",
      description: "We handle the architecture and execution so you can stay focused on high-level creation.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      highlight: false
    }
  ];

  return (
    <div id="alignment" className="bg-gradient-to-br from-black to-[#1a0600] sm:rounded-[3rem] mx-0 sm:mx-6 px-4 py-16 sm:py-24 max-w-[1200px] lg:mx-auto relative overflow-hidden antialiased font-sans">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4753D]/10 rounded-full blur-[80px] z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-[80px] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-4">
            The Alignment <br />
            <span className="text-[#F4753D]">Framework.</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-medium border-l-2 border-[#F4753D] pl-4 max-w-sm">
            Three pillars engineered for creator equity and operational silence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-[2rem] transition-all duration-500 h-auto md:min-h-[420px] overflow-hidden group transform-gpu ${
                pillar.highlight 
                ? 'bg-white shadow-xl scale-[1.02] md:scale-100' 
                : 'bg-gradient-to-br from-black to-[#1a0600] border border-white/5'
              }`}
            >
              <div className="relative z-10 mb-6">
                <h3 className={`text-2xl sm:text-3xl font-black mb-3 tracking-tight ${
                  pillar.highlight ? 'text-[#141414]' : 'text-white'
                }`}>
                  {pillar.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                  pillar.highlight ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {pillar.description}
                </p>
              </div>

              <div className="relative h-32 sm:h-40 w-full rounded-xl overflow-hidden mt-4 bg-gray-900">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 will-change-transform"
                />
                <div className={`absolute inset-0 pointer-events-none ${
                  pillar.highlight 
                  ? 'bg-gradient-to-t from-white/40 to-transparent' 
                  : 'bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60'
                }`} />
              </div>

              <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 bg-[#F4753D] ${
                pillar.highlight ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: MetricsSection ---
const MetricsSection = () => {
  const metrics = [
    { val: '$40K+', label: 'REVENUE' },
    { val: '12+', label: 'PRODUCTS' },
    { val: '3%', label: 'CONVERSION' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-16 border-t border-gray-100 pt-10">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-[#F4753D] tracking-tighter">
              {m.val}
            </span>
            <span className="text-[10px] md:text-xs font-black text-[#141414] tracking-widest mt-1 opacity-40 uppercase">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN LANDING PAGE ---
export default function App() {
  const navItems = [
    { name: "Home", url: "#" }, 
    { name: "Proof", url: "#proof" }, 
    { name: "Process", url: "#process" }, 
    { name: "Diagnose", url: "#apply" }
  ];

  const operatorData = [
    { name: "Mukesh", designation: "Shadow Operator", quote: "I’m Mukesh — the one behind your launch system, turning audience demand into digital products and scalable creator-owned revenue.", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" },
    { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" },
    { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" }
  ];

  const [followers, setFollowers] = useState("50,000");
  const [engagement, setEngagement] = useState("5");
  const [revenue, setRevenue] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const processContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: processContainerRef,
    offset: ["start 80%", "end 20%"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const calculateRevenue = () => {
    const f = parseInt(followers.replace(/,/g, '')) || 0;
    const e = parseFloat(engagement) || 0;
    const result = f * (e / 100) * 0.4 * 49;
    setRevenue(result);
    setIsCalculated(true);
  };

  const handleApplySubmit = (e) => { e.preventDefault(); setFormSubmitted(true); };

  useEffect(() => {
    document.body.style.overflow = selectedStudy ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedStudy]);

  // Clean Smooth Scroll Implementation
  const handleGlobalClick = useCallback((e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href === '#' ? 'home' : href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for the fixed header
          behavior: "smooth"
        });
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  const caseStudies = [
    { 
      id: 1, 
      handle: "@eat_with_hetvi",
      niche: "Meal Planning & Healthy Eating", 
      title: "Healthy Eating System", 
      image: "https://i.ibb.co/W4Tm9pQS/hetvi.webp?q=80&w=1200&auto=format&fit=crop", 
      shortDesc: "Moving from brand collaborations to owned recurring revenue with a system + community.",
      revenue: "$4,200 Launch",
      stats: { audience: "~22k Instagram", revenue: "~$4,200 (Launch) + ~$1,200 MRR" },
      situation: [
        "Her audience constantly asked: what to eat daily, how to plan meals, and how to stay consistent.",
        "People didn’t just want recipes; they wanted a system to stay consistent."
      ],
      implementation: {
        intro: "We validated demand around meal planning and accountability, then built a structured offer.",
        product: ["Healthy Eating ebook", "Meal planning framework", "Daily habit trackers", "Private community", "Weekly group guidance calls"],
        system: ["Landing page", "Checkout system", "Automated delivery", "Community onboarding"],
        content: ["Why most diets fail", "Why people struggle with consistency", "How a simple system removes decision fatigue"]
      },
      observation: "Audience engagement increased when the community and accountability aspect was introduced.",
      adjustment: "Positioned the offer as: 'A system to stay consistent with healthy eating.' Not a recipe book. A system + community experience.",
      result: [
        "143 members joined in the first launch",
        "~$4,200 launch revenue",
        "Community now generating ~$1,200+ monthly recurring revenue"
      ]
    },
    { 
      id: 2, 
      handle: "@everthewanderer",
      niche: "Travel & iPhone Photography", 
      title: "Travel Photography System", 
      image: "https://i.ibb.co/SqGN5Xy/wandrer.webp?q=80&w=1200&auto=format&fit=crop", 
      shortDesc: "Helping travelers replicate professional results using just their phones.",
      revenue: "$5,800 Launch",
      stats: { audience: "~60k Instagram", revenue: "~$5,800 (Launch)" },
      situation: [
        "Followers loved her travel photos but constantly asked how to take similar photos and edit them using a phone.",
        "Clear signal: people wanted to replicate the results."
      ],
      implementation: {
        intro: "We validated demand around smartphone travel photography and built a beginner-friendly digital course.",
        product: ["Composition techniques for travel photos", "Lighting fundamentals", "Editing workflow", "Simple shooting exercises"],
        system: ["Landing page", "Checkout system", "Automated course delivery"],
        content: ["Why travel photos often look flat", "How composition changes the result", "Editing techniques behind her photos"]
      },
      observation: "Most followers weren’t photographers. They were travelers who wanted better photos.",
      adjustment: "Positioned the course as: 'Take professional looking travel photos using just your phone.'",
      result: [
        "118 course sales",
        "~$5,800 launch revenue",
        "Continues generating ~$300–500 monthly organic sales"
      ]
    },
    { 
      id: 3, 
      handle: "@martinwikestad",
      niche: "Architecture & Landscape Photography", 
      title: "Composition & Editing Course", 
      image: "https://i.ibb.co/mF8kn7hn/martin.webp?q=80&w=1200&auto=format&fit=crop", 
      shortDesc: "Monetizing the process behind the photos for an architecture-loving audience.",
      revenue: "$6,400 Launch",
      stats: { audience: "~70k Instagram", revenue: "~$6,400 (Launch)" },
      situation: [
        "Followers frequently asked how he composes architecture shots and his process when shooting.",
        "The demand wasn’t gear; it was understanding the process behind the photos."
      ],
      implementation: {
        intro: "We validated demand around composition and editing workflow, then built a structured course.",
        product: ["Composition principles", "Framing and perspective techniques", "Editing workflow breakdown", "Real shooting examples"],
        system: ["Landing page", "Checkout system", "Automated course delivery"],
        content: ["Behind-the-scenes editing", "Before/after comparisons", "Breakdown of real photos"]
      },
      observation: "Followers engaged heavily with process breakdown content.",
      adjustment: "Positioned the product as: 'Learn the exact process behind creating these photos.'",
      result: [
        "132 course sales",
        "~$6,400 launch revenue",
        "Additional $700–900 monthly organic sales"
      ]
    }
  ];

  const testimonialPartners = [
    { 
      name: 'Silvia Quiros (@silviaquiros)', 
      img: 'https://i.ibb.co/R43jN24B/silviaquiros.webp?q=80&w=200&auto=format&fit=crop', 
      stats: 'Makeup & Beauty', 
      quote: '"I\'d been posting tutorials for years without thinking I could turn them into something people would pay for. Mukesh structured everything and handled the whole setup — landing page, checkout, launch — so I didn\'t have to. Seeing the first sales come through was a moment I genuinely wasn\'t expecting."', 
      meta: 'Launched Digital Product' 
    },
    { 
      name: 'Pili Nemer (@pilinemer)', 
      img: 'https://i.ibb.co/PGf6F85y/pilinemer.webp?q=80&w=200&auto=format&fit=crop', 
      stats: 'Fitness & Lifestyle', 
      quote: '"I had loads of content but no real way to hand followers something they could follow start to finish. Getting it structured into an actual system made everything click, and the response when we launched genuinely surprised me. It feels good to finally have something solid to point people toward."', 
      meta: 'Systemized Coaching' 
    }
  ];

  return (
    <div className="font-sans text-[#111] bg-[#FAFAFA] overflow-x-hidden antialiased selection:bg-[#F4753D] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        .glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
      `}} />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <Header items={navItems} />

      {/* HERO SECTION */}
      <section id="home" className="relative pt-36 pb-24 md:pt-48 md:pb-32 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gray-200/80 bg-white/50 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-8 md:mb-10">
              <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4753D] opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F4753D]"></span>
              </span>
              <span className="text-[11px] font-semibold text-gray-600 tracking-[0.15em] uppercase pt-px">
                  Monetization System
              </span>
          </div>

          <h1 className="text-[2.5rem] sm:text-5xl md:text-[4.5rem] lg:text-[5rem] font-black leading-[1.1] md:leading-[1.05] tracking-tighter text-[#141414] mb-8 md:mb-10 max-w-4xl mx-auto">
              Turn Creator Attention Into <br className="hidden md:block" />
              <span className="text-[#F4753D] relative inline-block mx-2 md:mx-0 mt-1 md:mt-0">
                  Digital Product
                  <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-[8px] md:h-[12px] text-[#F4753D] -z-10 opacity-90" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none">
                      <motion.path 
                          initial={{ pathLength: 0, opacity: 0 }} 
                          animate={{ pathLength: 1, opacity: 1 }} 
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} 
                          d="M4 12 C50 2 150 2 196 12" 
                          stroke="currentColor" 
                          strokeWidth="3.5" 
                          strokeLinecap="round" 
                      />
                  </svg>
              </span> Revenue.
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-medium tracking-tight mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto px-4">
              I design the product, build the system, and run the launch — turning audience demand into <strong className="text-[#141414] font-bold">revenue you own.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full text-center md:text-left pt-8 md:pt-10 border-t border-gray-200 mb-12 md:mb-16">
              <div className="flex flex-col items-center md:items-start">
                  <h4 className="font-bold text-[#141414] text-lg mb-3 flex items-center justify-center md:justify-start gap-2">
                      <span className="text-[#F4753D]">✦</span> Product Strategy
                  </h4>
                  <p className="text-gray-500 font-medium text-base leading-relaxed">
                      Identify what your audience already wants to buy.
                  </p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                  <h4 className="font-bold text-[#141414] text-lg mb-3 flex items-center justify-center md:justify-start gap-2">
                      <span className="text-[#F4753D]">✦</span> Launch Infrastructure
                  </h4>
                  <p className="text-gray-500 font-medium text-base leading-relaxed">
                      Funnels, checkout, and delivery built end-to-end.
                  </p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                  <h4 className="font-bold text-[#141414] text-lg mb-3 flex items-center justify-center md:justify-start gap-2">
                      <span className="text-[#F4753D]">✦</span> Launch Execution
                  </h4>
                  <p className="text-gray-500 font-medium text-base leading-relaxed">
                      Story-driven launches that convert attention into sales.
                  </p>
              </div>
          </div>

          <div className="flex items-center p-1.5 bg-white border border-gray-200 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] z-40 relative">
              <a href="#proof" className="bg-[#F4753D] text-white px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base flex items-center gap-2 hover:bg-orange-600 transition-all shadow-[0_4px_15px_rgba(244,117,61,0.4)]">
                  See Proof <i className="fa-solid fa-arrow-down"></i>
              </a>
              <a href="#apply" className="px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base text-[#141414] hover:bg-gray-50 transition-all">
                  Diagnose
              </a>
          </div>
      </section>

      {/* METRICS SECTION */}
      <MetricsSection />

      {/* PROOF SECTION */}
      <section id="proof" className="bg-gradient-to-br from-black to-[#1a0600] rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-8 px-6 md:px-12 py-14 md:py-20 max-w-[1400px] xl:mx-auto relative overflow-hidden shadow-2xl mt-12 mb-16">
          <div className="relative z-10 max-w-5xl mx-auto text-center">
              <span className="text-[#F4753D] font-bold tracking-widest uppercase text-sm mb-2 md:mb-3 block">Partnerships</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">Hear From <span className="text-[#F4753D]">Creator Partners</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                  {testimonialPartners.map((p, idx) => (
                    <div key={idx} className="glass-card rounded-[2rem] p-6 md:p-8 relative transform-gpu">
                      <div className="flex items-center gap-4 mb-6">
                        <img 
                          src={p.img} 
                          loading="lazy" 
                          decoding="async" 
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 object-cover bg-white/10" 
                          alt="" 
                        />
                        <div><h4 className="text-white font-bold">{p.name}</h4><p className="text-xs text-[#F4753D] font-medium mt-1">{p.stats}</p></div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">{p.quote}</p>
                      <div className="flex items-center gap-2 pt-4 border-t border-white/10"><i className="fa-solid fa-check-circle text-[#F4753D]"></i><span className="text-white text-xs font-bold uppercase tracking-wider">{p.meta}</span></div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <section id="case-studies" className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-10 md:mb-12">
            <span className="text-[#F4753D] font-bold tracking-widest uppercase text-sm mb-2 block">The Data</span>
            <h2 className="text-4xl md:text-5xl font-bold max-w-md">Creator <span className="text-[#F4753D]">Case Studies</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {caseStudies.map((study) => (
                  <motion.div 
                    layoutId={`study-${study.id}`} 
                    key={study.id} 
                    onClick={() => setSelectedStudy(study)} 
                    className="group bg-white border border-gray-200/80 rounded-[2rem] p-5 cursor-pointer shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col transform-gpu will-change-transform"
                  >
                    <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                      <img 
                        src={study.image} 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu" 
                        alt="" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/10 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-4 left-5 right-5">
                        <div className="flex flex-col mb-1.5">
                           <span className="text-white text-xs md:text-sm font-black tracking-tight mb-0.5">{study.handle}</span>
                           <span className="text-white/70 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em]">{study.niche}</span>
                        </div>
                        <h3 className="text-xl md:text-[1.35rem] font-black text-white tracking-tighter leading-tight">{study.title}</h3>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 mb-5">
                      <span className="font-bold text-gray-500 text-xs uppercase tracking-wider">Revenue</span>
                      <span className="text-lg md:text-xl font-black text-[#F4753D]">{study.revenue}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-5 font-medium leading-relaxed">{study.shortDesc}</p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Read Strategy</span>
                      <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#F4753D] group-hover:text-white flex items-center justify-center transition-colors"><i className="fa-solid fa-arrow-right text-xs"></i></div>
                    </div>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedStudy && (
          <>
            {/* OPTIMIZATION 1: Solid background color instead of backdrop-blur to save GPU on mobile */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStudy(null)} className="fixed inset-0 bg-[#141414]/98 z-[1000] cursor-zoom-out transform-gpu" />
            
            {/* OPTIMIZATION 2: Snappier, less complex spring physics for the layout transition */}
            <motion.div 
              layoutId={`study-${selectedStudy.id}`} 
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              className="fixed inset-4 md:inset-10 lg:inset-x-20 xl:inset-x-60 lg:inset-y-10 bg-white z-[1001] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col transform-gpu will-change-transform"
            >
              <div className="absolute top-4 right-4 z-[1002]">
                <button 
                  onClick={() => setSelectedStudy(null)} 
                  className="w-10 h-10 md:w-12 md:h-12 bg-[#e5e5e5] hover:bg-[#ccc] text-[#141414] rounded-full flex items-center justify-center transition-all border border-white/20 shadow-lg"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
                <div className="flex flex-col items-center">
                  
                  {/* Image Container - Always visible immediately */}
                  <div className="w-full flex justify-center bg-gray-50 md:bg-white md:pt-0">
                    <div className="relative w-full max-w-full md:max-w-2xl aspect-square md:aspect-video lg:aspect-square md:max-h-[50vh] shrink-0 overflow-hidden md:rounded-b-[2rem] shadow-sm">
                      <img 
                        src={selectedStudy.image} 
                        loading="eager"
                        className="w-full h-full object-cover transform-gpu" 
                        alt="" 
                      />
                    </div>
                  </div>
                  
                  {/* OPTIMIZATION 3: Fade in the heavy text content slightly AFTER the modal expands to prevent layout thrashing */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Header Content */}
                    <div className="w-full px-6 py-8 md:px-12 lg:px-20 text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                          <span className="bg-[#F4753D] text-white text-xs font-bold px-5 py-1.5 rounded-full">{selectedStudy.handle}</span>
                          <span className="bg-[#141414] text-white text-xs font-bold px-5 py-1.5 rounded-full">{selectedStudy.niche}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-[#141414] tracking-tighter leading-tight max-w-3xl mx-auto md:mx-0">
                        {selectedStudy.title}
                      </h2>
                    </div>

                    <div className="px-6 md:px-12 lg:px-20 pb-8 w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-gray-100 pt-10">
                        <div className="lg:col-span-8 space-y-12">
                          <section>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4753D] mb-4">Situation</h4>
                            <div className="space-y-4">
                              {selectedStudy.situation.map((para, i) => (
                                <p key={i} className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">{para}</p>
                              ))}
                            </div>
                          </section>
                          <section className="bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4753D] mb-6">Implementation</h4>
                            <p className="text-[#141414] text-lg font-bold mb-8 leading-snug">{selectedStudy.implementation.intro}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div>
                                <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">The Program Included:</h5>
                                <ul className="space-y-3">
                                  {selectedStudy.implementation.product.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#141414] font-bold text-sm">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4753D]"></span> {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Launch Content Pillars:</h5>
                                <ul className="space-y-3">
                                  {selectedStudy.implementation.content.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#141414] font-bold text-sm">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#141414]"></span> {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </section>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <section>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4753D] mb-4">Observation</h4>
                              <p className="text-gray-600 font-medium text-base leading-relaxed">{selectedStudy.observation}</p>
                            </section>
                            <section>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4753D] mb-4">Adjustment</h4>
                              <p className="text-[#141414] font-bold text-base leading-relaxed italic">"{selectedStudy.adjustment}"</p>
                            </section>
                          </div>
                        </div>
                        <div className="lg:col-span-4 space-y-8">
                          <div className="bg-gradient-to-br from-black to-[#1a0600] rounded-[2.5rem] p-8 text-white shadow-xl sticky top-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F4753D] mb-6 border-b border-white/10 pb-4">Results</h4>
                            <ul className="space-y-6">
                              {selectedStudy.result.map((res, i) => (
                                <li key={i} className="flex items-start gap-4">
                                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#F4753D] shrink-0 mt-0.5"><i className="fa-solid fa-check"></i></span>
                                  <p className="text-base font-bold leading-tight">{res}</p>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-12 pt-8 border-t border-white/10">
                              <button onClick={() => { setSelectedStudy(null); window.location.hash = "#apply"; }} className="w-full bg-[#F4753D] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-600/20">Diagnose My Brand</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PROCESS SECTION */}
      <section id="process" className="py-16 md:py-32 px-6 max-w-5xl mx-auto text-center border-t border-gray-100">
          <span className="text-[#F4753D] font-bold tracking-widest uppercase text-sm mb-2 md:mb-3 block">The Playbook</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 md:mb-24 text-[#141414]">The Creator Monetization <span className="text-[#F4753D]">System</span></h2>
          
          <div ref={processContainerRef} className="relative text-left max-w-3xl mx-auto">
              {/* Background Animated Line - Optimized with GPU transform */}
              <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-gray-200 overflow-hidden transform-gpu">
                <motion.div 
                  style={{ scaleY, originY: 0, willChange: "transform" }}
                  className="w-full h-full bg-gradient-to-b from-[#F4753D] to-[#F4753D]/30 transform-gpu"
                />
              </div>

              {[
                { h: 'Audience Intelligence', n: '01', c: 'We analyze audience signals to uncover exact problems.', align: 'left' },
                { h: 'Product Architecture', n: '02', c: 'We design a digital product tailored precisely to demand.', align: 'right' },
                { h: 'Launch Story System', n: '03', c: 'A 14-day story campaign that builds anticipation.', align: 'left' },
                { h: 'Revenue Launch', n: '04', c: 'We deploy and convert attention into revenue.', align: 'right' }
              ].map((s, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_80px_1fr] items-center mb-24 md:mb-40 last:mb-0">
                  {s.align === 'left' ? (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        className="text-right pr-4 md:pr-12 transform-gpu will-change-transform"
                      >
                        <h4 className="text-lg md:text-2xl font-black text-[#141414] leading-tight">{s.h}</h4>
                        <p className="text-[10px] md:text-xs text-[#F4753D] font-black tracking-widest uppercase mt-2">{s.n}</p>
                      </motion.div>
                      
                      <div className="relative flex justify-center z-10">
                        <motion.div 
                          whileInView={{ scale: [0, 1.2, 1] }}
                          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                          className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-white border-[3px] md:border-4 border-[#F4753D] shadow-sm transform-gpu will-change-transform"
                        />
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        className="pl-4 md:pl-12 transform-gpu will-change-transform"
                      >
                        <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{s.c}</p>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        className="text-right pr-4 md:pr-12 transform-gpu will-change-transform"
                      >
                        <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{s.c}</p>
                      </motion.div>
                      
                      <div className="relative flex justify-center z-10">
                        <motion.div 
                          whileInView={{ scale: [0, 1.2, 1] }}
                          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                          className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#141414] border-[3px] md:border-4 border-white shadow-sm transform-gpu will-change-transform"
                        />
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        className="pl-4 md:pl-12 transform-gpu will-change-transform"
                      >
                        <h4 className="text-lg md:text-2xl font-black text-[#141414] leading-tight">{s.h}</h4>
                        <p className="text-[10px] md:text-xs text-[#F4753D] font-black tracking-widest uppercase mt-2">{s.n}</p>
                      </motion.div>
                    </>
                  )}
                </div>
              ))}
          </div>
      </section>

      {/* MERGED: OPERATOR, ALIGNMENT & ECONOMICS SECTION */}
      <section id="operator-economics" className="py-16 md:py-20 px-6 max-w-7xl mx-auto space-y-16 md:space-y-20">
        <div>
          <div className="text-center mb-10 md:mb-12">
            <span className="text-[#F4753D] font-bold tracking-widest uppercase text-sm mb-2 md:mb-3 block">Behind the scenes</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#141414]">The <span className="text-[#F4753D]">Shadow Operator</span></h2>
          </div>
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-12 md:mb-16">
            <AnimatedTestimonials testimonials={operatorData} />
          </div>
          <div className="flex justify-center mb-12 md:mb-16">
            <motion.div 
              initial={{ height: 0 }} 
              whileInView={{ height: 60 }} 
              viewport={{ once: true, margin: "0px 0px -50px 0px" }} 
              className="w-0.5 bg-gradient-to-b from-[#F4753D] to-transparent md:h-20 transform-gpu will-change-transform" 
            />
          </div>
        </div>

        <ThreeLayerAlignment />

        <div id="economics" className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
                <span className="text-[#F4753D] font-bold tracking-widest uppercase text-sm mb-2 md:mb-3 block">The Economics</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-[#141414]">The Strategic <span className="text-[#F4753D]">Advantage</span></h2>
                <p className="text-gray-500 font-medium text-base md:text-lg mb-8 md:mb-10 leading-relaxed">Brand deals are temporary. A digital product turns your audience into a repeatable revenue engine with permanent ownership.</p>
                <div className="space-y-3 md:space-y-4">
                    {[
                      { h: 'High Profit Margins', d: '90%+ margins with zero physical inventory or shipping costs.', icon: 'fa-chart-line' },
                      { h: 'Direct Ownership', d: 'You own the customer data and the relationship, not the algorithm.', icon: 'fa-user-lock' },
                      { h: 'Automated Scalability', d: 'Sell to 10 or 10,000 people simultaneously without extra effort.', icon: 'fa-gears' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 md:p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#F4753D] flex-shrink-0 group-hover:bg-[#F4753D] group-hover:text-white transition-colors"><i className={`fa-solid ${item.icon} text-sm md:text-base`}></i></div>
                        <div><h4 className="font-bold text-[#141414] mb-1">{item.h}</h4><p className="text-xs md:text-sm text-gray-500 font-medium">{item.d}</p></div>
                      </div>
                    ))}
                </div>
            </div>

            <div className="relative group mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-[#F4753D]/5 rounded-[3rem] -rotate-2 transform group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="relative bg-gradient-to-br from-black to-[#1a0600] rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-8"><i className="fa-solid fa-calculator text-[#F4753D] text-xl md:text-2xl"></i><h3 className="text-xl md:text-2xl font-bold">Revenue Simulator</h3></div>
                    <div className="space-y-5 mb-8 md:mb-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Total Followers</label>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-1 flex items-center focus-within:border-[#F4753D]/50 transition-colors">
                              <input type="text" value={followers} onChange={(e) => setFollowers(e.target.value)} className="w-full bg-transparent outline-none px-4 py-2.5 text-white font-bold text-base md:text-lg" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Engagement Rate (%)</label>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-1 flex items-center focus-within:border-[#F4753D]/50 transition-colors">
                              <input type="number" value={engagement} onChange={(e) => setEngagement(e.target.value)} className="w-full bg-transparent outline-none px-4 py-2.5 text-white font-bold text-base md:text-lg" />
                            </div>
                        </div>
                        <button onClick={calculateRevenue} className="w-full bg-[#F4753D] text-white py-3.5 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-600/20 text-sm md:text-base">Calculate Potential</button>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center min-h-[140px] flex flex-col justify-center">
                        {isCalculated ? (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-black">Estimated Launch Revenue</p>
                            <div className="text-4xl md:text-5xl font-black text-[#F4753D] tracking-tighter tabular-nums mb-2">
                              $<MoneyCounter value={revenue} />
                            </div>
                            <p className="text-[10px] text-gray-500 italic">*Based on 40% conversion of engaged fans to a $49 offer.</p>
                          </motion.div>
                        ) : (
                          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Enter data above to see potential</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* DIAGNOSE SECTION */}
      <section id="apply" className="py-16 md:py-20 px-6 md:px-12 text-center max-w-4xl mx-4 md:mx-auto bg-white rounded-[3rem] border border-gray-100 shadow-2xl relative z-10">
          <span className="text-[#F4753D] font-bold tracking-widest uppercase text-sm mb-2 md:mb-3 block">Take Action</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-5 text-[#141414] tracking-tight">Get Your Creator <br className="hidden md:block" /><span className="text-[#F4753D]">Monetization Diagnosis.</span></h2>
          <p className="text-gray-500 text-base md:text-xl font-medium max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">I’ll analyze your audience to map the digital product opportunity inside your brand.</p>
          <AnimatePresence mode="wait">{formSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto bg-gray-50 border border-gray-100 p-8 md:p-10 rounded-[2rem]"><div className="w-14 h-14 bg-[#F4753D]/10 rounded-full flex items-center justify-center mx-auto mb-5 text-[#F4753D] text-2xl"><i className="fa-solid fa-check"></i></div><h3 className="text-xl md:text-2xl font-black text-[#141414] mb-2">Application Received</h3><p className="text-gray-600 font-medium text-sm md:text-base">We will reach out within 12 hours.</p></motion.div>
            ) : (
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleApplySubmit} className="max-w-2xl mx-auto text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-1.5 flex items-center"><i className="fa-solid fa-layer-group text-gray-400 ml-4 text-base"></i><input required type="text" placeholder="Creator Niche" className="w-full bg-transparent outline-none px-4 py-2.5 text-[#141414] placeholder-gray-400 font-semibold" /></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-1.5 flex items-center"><i className="fa-brands fa-instagram text-gray-400 ml-4 text-base"></i><input required type="text" placeholder="IG Handle (@creator)" className="w-full bg-transparent outline-none px-4 py-2.5 text-[#141414] placeholder-gray-400 font-semibold" /></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-1.5 flex items-center"><i className="fa-solid fa-eye text-gray-400 ml-4 text-base"></i><input required type="number" placeholder="Avg. Story Views" className="w-full bg-transparent outline-none px-4 py-2.5 text-[#141414] placeholder-gray-400 font-semibold" /></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-1.5 flex items-center"><i className="fa-brands fa-whatsapp text-gray-400 ml-4 text-base"></i><input required type="tel" placeholder="WhatsApp Number" className="w-full bg-transparent outline-none px-4 py-2.5 text-[#141414] placeholder-gray-400 font-semibold" /></div>
                </div>
                <button type="submit" className="w-full bg-[#141414] hover:bg-[#F4753D] text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg text-base md:text-lg flex items-center justify-center gap-2 group">Get My Monetization Plan <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i></button>
              </motion.form>
            )}</AnimatePresence>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-black to-[#1a0600] text-white pt-16 md:pt-20 pb-10 rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-8 mb-4 md:mb-8 relative z-0 overflow-hidden shadow-2xl mt-12 md:mt-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
              <div className="mb-4"><h2 className="text-3xl md:text-4xl font-black tracking-tighter">Creator <span className="text-[#F4753D]">Ownership</span></h2></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-14 mb-10">
                  <div className="md:col-span-2"><p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">A future where creators stop renting influence and start owning what they build.</p></div>
                  <div><h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px] md:text-xs">Navigation</h4><ul className="flex flex-col gap-2.5 text-xs md:text-sm text-gray-400"><li><a href="#" className="hover:text-[#F4753D] transition-colors">Home</a></li><li><a href="#proof" className="hover:text-[#F4753D] transition-colors">Proof</a></li><li><a href="#apply" className="hover:text-[#F4753D] transition-colors">Diagnose</a></li></ul></div>
                  <div><h4 className="text-white font-bold mb-4 uppercase tracking-wider text-[10px] md:text-xs">Contact</h4><p className="text-xs md:text-sm text-gray-400">hello@launchpartner.com</p></div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-500 pt-6 border-t border-gray-800/50 gap-3"><p>© 2026 Mukesh.</p></div>
          </div>
      </footer>
    </div>
  );
}