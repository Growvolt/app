import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Code, Rocket, TrendingUp, Play, Pause, Volume2, Maximize2, 
  ArrowRight, ArrowLeft, MoreHorizontal, X, Instagram, Mail, 
  Menu, Youtube, Sparkles, Loader2, Lightbulb, ExternalLink, Copy, Check,
  Cpu, Target, BarChart3, Globe, Shield, Zap, Phone, Database, Layers, Megaphone
} from 'lucide-react';

// ==========================================
// UTILS & ANIMATION COMPONENTS
// ==========================================

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TikTokIcon = ({ size = 24, className, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const WhatsAppIcon = ({ size = 24, className, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const influencers = [
  {
    id: 1,
    name: "Chris Williamson",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
    stats: [
      { icon: Instagram, count: "2.3M", color: "text-pink-500" },
      { icon: Youtube, count: "3.2M", color: "text-red-500" },
      { icon: TikTokIcon, count: "311K", color: "text-cyan-400" },
    ]
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
    stats: [
      { icon: Instagram, count: "1.8M", color: "text-pink-500" },
      { icon: TikTokIcon, count: "4.5M", color: "text-cyan-400" },
    ]
  },
  {
    id: 3,
    name: "Iman Gadzhi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
    stats: [
      { icon: Instagram, count: "2M", color: "text-pink-500" },
      { icon: Youtube, count: "5M", color: "text-red-500" },
    ]
  },
  {
    id: 4,
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1287&auto=format&fit=crop",
    stats: [
      { icon: Youtube, count: "890K", color: "text-red-500" },
      { icon: TikTokIcon, count: "1.2M", color: "text-cyan-400" },
    ]
  },
  {
    id: 5,
    name: "Marcus Jones",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    stats: [
      { icon: Instagram, count: "500K", color: "text-pink-500" },
      { icon: Youtube, count: "1.1M", color: "text-red-500" },
      { icon: TikTokIcon, count: "2.8M", color: "text-cyan-400" },
    ]
  }
];

// ==========================================
// COMPONENT: Sticky Header
// ==========================================
const StickyHeader = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: "Case Studies", href: "#", action: () => onNavigate('casestudies') }, 
    { label: "Services", href: "#", action: () => onNavigate('services') },
    { label: "About Us", href: "#", action: () => onNavigate('about') },
    { label: "Contact Us", href: "#", action: () => onNavigate('contact') }, 
  ];

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className={`
            pointer-events-auto
            flex items-center justify-between 
            w-full max-w-5xl 
            pl-6 pr-2 py-2.5 
            rounded-full 
            bg-[#0a0a0e]/80 backdrop-blur-xl 
            border border-white/10 
            shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            transition-all duration-300
            ${scrolled ? 'shadow-purple-500/10 border-white/15' : ''}
          `}
        >
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <span className="font-bold text-xl tracking-tight text-white font-serif">Growvolt</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            {['Case Studies', 'Services', 'Process'].map((link) => (
              <button 
                key={link} 
                onClick={() => {
                  if (link === 'Services') onNavigate('services');
                  else if (link === 'Case Studies') onNavigate('casestudies');
                  else onNavigate('home');
                }}
                className="hover:text-white transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#5B6FFF] transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.open("https://calendly.com/growvolt-us/30min", "_blank")}
              className="hidden sm:flex items-center px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Book Call
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all active:scale-95 group"
            >
              <Menu className="text-gray-300 group-hover:text-white" size={20} />
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-[#050509]/95 flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10">
              <X size={24} className="text-white" />
            </button>
            <motion.nav initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-center space-y-6">
              {menuItems.map((item, idx) => (
                <div key={idx} className="overflow-hidden">
                  <motion.button 
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }} 
                    initial={{ y: '100%' }} 
                    animate={{ y: 0 }} 
                    transition={{ delay: 0.1 + (idx * 0.1) }} 
                    className="block text-4xl sm:text-6xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 hover:to-blue-400 transition-all cursor-pointer"
                  >
                    {item.label}
                  </motion.button>
                </div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-8">
                <button 
                  onClick={() => {
                    onNavigate('contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                >
                  Get in Touch
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==========================================
// COMPONENT: Lead Capture Form
// ==========================================
const LeadCaptureFormSection = () => {
  const [formState, setFormState] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // *** REPLACE 'YOUR_FORM_ID' WITH YOUR ACTUAL FORMSPREE ID ***
    // Example: "https://formspree.io/f/xvbdmqwo"
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/movggjlj"; 

    if (form.checkValidity()) {
      setIsSubmitting(true);
      const formData = new FormData(form);
      
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          setSubmitted(true);
          form.reset();
        } else {
          // If you haven't replaced the ID yet, this might error in production
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

  if (submitted) {
    return (
      <section className="py-24 bg-[#050509] relative z-20 flex justify-center">
        <FadeIn className="text-center max-w-md p-8 bg-white/5 rounded-3xl border border-white/10">
          <div className="w-16 h-16 bg-[#5B6FFF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <Check size={32} className="text-[#5B6FFF]" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-white">Application Received</h2>
          <p className="text-gray-400 mb-6">
            We've received your blueprint request. Our team will review your channel stats and email you within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[#5B6FFF] text-sm font-semibold hover:text-white transition-colors"
          >
            Send another request
          </button>
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#050509] relative z-20 flex justify-center">
      <div className="w-full max-w-4xl px-6">
        <div className="text-center mb-10">
          <FadeIn>
            <span className="text-[#5B6FFF] text-xs font-bold tracking-widest uppercase mb-4 block">Get Started</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Your Growth Blueprint</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Tell us about your brand and audience. We'll show you how Growvolt can turn your passion into predictable revenue.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <form 
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-2xl mx-auto shadow-2xl space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="First Name" placeholder="First Name" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#5B6FFF] transition-colors" />
              <input type="text" name="Last Name" placeholder="Last Name" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#5B6FFF] transition-colors" />
            </div>
            
            <input type="email" name="_replyto" placeholder="Your Email" onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#5B6FFF] transition-colors" />
            
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="Niche" placeholder="Your Niche (e.g. Finance, Fitness)" onChange={handleChange} required className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#5B6FFF] transition-colors" />
              
              <select name="Audience Size" onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#5B6FFF] transition-colors">
                <option disabled>Audience Size</option> 
                <option value="< 10K">Less than 10K </option>
                <option value="10K - 100K">10K - 100K</option>
                <option value="100K - 500K">100K - 500K</option>
                <option value="500K - 1M">500K - 1 Million</option>
                <option value="> 1M">Over 1 Million</option>
              </select>
            </div>
            
            {/* Hidden fields for Formspree structure */}
            <input type="hidden" name="_subject" value="New Growvolt Blueprint Request" />
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#5B6FFF] to-[#FF4B99] text-white font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Sending...
                </>
              ) : (
                <>
                  Send Request & Get Blueprint <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};


// ==========================================
// COMPONENT: Services Pages
// ==========================================

const BuildPage = () => (
  <section className="min-h-screen pt-40 pb-20 bg-[#050509] relative z-20">
    <div className="container mx-auto px-6 max-w-4xl text-center">
      <FadeIn>
        <span className="text-[#5B6FFF] text-xs font-bold tracking-widest uppercase mb-4 block">Growvolt Build</span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">AI-Powered Product Ecosystems</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-gray-400 text-base md:text-lg mb-16 leading-relaxed max-w-2xl mx-auto">
          We don't just "make websites." We engineer complete digital product ecosystems leveraging cutting-edge AI. From identifying market gaps to building robust backend infrastructure, we turn your influence into a tangible asset.
        </p>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 gap-8 text-left">
        <FadeIn delay={0.3}>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-full">
            <Cpu className="text-[#5B6FFF] mb-4 h-8 w-8" />
            <h3 className="text-xl font-bold text-white mb-3">AI Market Analysis</h3>
            <p className="text-gray-400 text-sm">Using proprietary AI models to analyze your audience sentiment and identify the exact product they are begging to buy.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-full">
            <Database className="text-[#5B6FFF] mb-4 h-8 w-8" />
            <h3 className="text-xl font-bold text-white mb-3">Tech Infrastructure</h3>
            <p className="text-gray-400 text-sm">Custom-coded landing pages, seamless payment gateways (Stripe/PayPal), and automated delivery systems.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const LaunchPage = () => (
  <section className="min-h-screen pt-40 pb-20 bg-[#050509] relative z-20">
    <div className="container mx-auto px-6 max-w-4xl text-center">
      <FadeIn>
        <span className="text-[#5B6FFF] text-xs font-bold tracking-widest uppercase mb-4 block">Growvolt Launch</span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">High-Conversion Funnels</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-gray-400 text-base md:text-lg mb-16 leading-relaxed max-w-2xl mx-auto">
          Once the product exists, it needs to sell. We architect sophisticated sales funnels that guide your followers from "interested" to "invested." Our launch strategies are designed for maximum day-one revenue.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 text-left">
        <FadeIn delay={0.3}>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-full">
            <Layers className="text-[#5B6FFF] mb-4 h-8 w-8" />
            <h3 className="text-xl font-bold text-white mb-3">Funnel Architecture</h3>
            <p className="text-gray-400 text-sm">VSLs (Video Sales Letters), upsell/downsell flows, and checkout optimization to maximize Average Order Value (AOV).</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-full">
            <Mail className="text-[#5B6FFF] mb-4 h-8 w-8" />
            <h3 className="text-xl font-bold text-white mb-3">Email Automation</h3>
            <p className="text-gray-400 text-sm">Pre-launch hype sequences and abandoned cart recovery flows that recover 15-20% of lost revenue automatically.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const ScalePage = () => (
  <section className="min-h-screen pt-40 pb-20 bg-[#050509] relative z-20">
    <div className="container mx-auto px-6 max-w-4xl text-center">
      <FadeIn>
        <span className="text-[#FF4B99] text-xs font-bold tracking-widest uppercase mb-4 block">Growvolt Scale</span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">Paid Media Amplification</h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-gray-400 text-base md:text-lg mb-16 leading-relaxed max-w-2xl mx-auto">
          Launch revenue is just fuel. We reinvest profits into high-ROAS paid media campaigns on Meta (Facebook/Instagram) and TikTok to scale your product beyond your organic reach.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 text-left">
        <FadeIn delay={0.3}>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-full">
            <Megaphone className="text-[#FF4B99] mb-4 h-8 w-8" />
            <h3 className="text-xl font-bold text-white mb-3">Meta Ads Management</h3>
            <p className="text-gray-400 text-sm">Strategic media buying using lookalike audiences and retargeting to acquire customers at a profit.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-full">
            <BarChart3 className="text-[#FF4B99] mb-4 h-8 w-8" />
            <h3 className="text-xl font-bold text-white mb-3">Creative Testing</h3>
            <p className="text-gray-400 text-sm">Rapid A/B testing of ad creatives (UGC, static, video) to find winning angles that lower your CPA.</p>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const ServicesPage = ({ onNavigate }) => {
  return (
    <section className="min-h-screen pt-40 pb-20 bg-[#050509] relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">Our Services</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              End-to-end infrastructure for creator businesses. Select a phase to learn more.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { id: 'build', title: "Growvolt Build", icon: <Cpu />, color: '#5B6FFF', desc: "AI-Powered Product Ecosystems" },
            { id: 'launch', title: "Growvolt Launch", icon: <Target />, color: '#5B6FFF', desc: "High-Conversion Funnels" },
            { id: 'scale', title: "Growvolt Scale", icon: <BarChart3 />, color: '#FF4B99', desc: "Paid Media Amplification" }
          ].map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div 
                onClick={() => onNavigate(service.id)}
                className="h-full bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-[#5B6FFF]/20 transition-colors">
                  <span style={{ color: service.color }}>{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-[#5B6FFF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// COMPONENT: About Us Page
// ==========================================
const AboutUsPage = () => {
  return (
    <section className="min-h-screen pt-40 pb-20 bg-[#050509] relative z-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-24">
          <FadeIn>
            <span className="text-[#5B6FFF] font-bold tracking-widest uppercase text-xs mb-4 block">Our Story</span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif text-white mb-8">
              Liberating Creators from the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B6FFF] to-[#FF4B99]">Algorithm</span>.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="grid md:grid-cols-2 gap-12 text-gray-400 text-base leading-relaxed">
              <p>
                For too long, creators have been renters on platforms they helped build. Dependent on algorithms, fluctuating ad revenue, and third-party sponsorships. Growvolt was born from a simple realization: Influence is the new currency, but without infrastructure, it's volatile.
              </p>
              <p>
                We started as a small team of engineers and marketers obsessed with one goal: To help creators build assets they actually own. Today, we provide the full-stack infrastructure—tech, product, and growth—that turns personal brands into sustainable, 7-figure equity businesses.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <FadeIn delay={0.3}>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 h-full">
              <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-[#5B6FFF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A world where creators are the new founders. We envision a digital economy where talent isn't just about views, but about building lasting value, community, and products that stand the test of time.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 h-full">
              <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-[#5B6FFF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                To provide the "AWS for Creators." We handle the heavy lifting—infrastructure, logistics, payment rails, and scaling systems—so you can focus on what you do best: inspiring your audience.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// COMPONENT: Case Studies Page
// ==========================================
const CaseStudiesPage = () => {
  const cases = [
    {
      id: 1,
      creator: "Apex Fitness",
      niche: "Fitness & Health",
      result: "$1.2M Launch",
      stat: "High-Ticket Sales",
      strategy: "We built a premium coaching funnel integrated with a custom app. The launch sequence utilized existing YouTube traffic to drive 10k+ warm leads.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 2,
      creator: "Crypto Daily",
      niche: "Finance",
      result: "300% Growth",
      stat: "Subscriber Increase",
      strategy: "Automated short-form content scaling across TikTok and Reels combined with a high-value newsletter subscription model.",
      image: "https://images.unsplash.com/photo-1621504450168-b8c4375c2b0a?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 3,
      creator: "Chef Bella",
      niche: "Food & Culinary",
      result: "50k Sales",
      stat: "Digital Cookbook",
      strategy: "Leveraged Instagram aesthetic visuals to drive traffic to a custom Shopify storefront with an optimized upsell cart flow.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: 4,
      creator: "Tech Insider",
      niche: "Tech Review",
      result: "$50k/mo MRR",
      stat: "Recurring Revenue",
      strategy: "Transitioned from ad-revenue dependency to a paid private community model using Skool, managed entirely by our team.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  return (
    <section className="min-h-screen pt-40 pb-20 bg-[#050509] relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">Case Studies</h1>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Real results from real creators. See how we've helped leading voices monetize their influence.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((study, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent to-transparent z-10 opacity-90" />
                  <img 
                    src={study.image} 
                    alt={study.creator} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute top-6 right-6 z-20 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-semibold text-white">
                    {study.niche}
                  </div>
                </div>

                <div className="p-8 relative z-20 -mt-12">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{study.creator}</h3>
                      <p className="text-[#5B6FFF] font-medium">{study.result}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Impact</p>
                      <p className="text-gray-300 font-medium">{study.stat}</p>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-white/10 mb-6" />
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {study.strategy}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all cursor-pointer">
                    View Full Case Study <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// COMPONENT: Contact Page
// ==========================================
const ContactPage = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText("growvolt.us@gmail.com");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = "growvolt.us@gmail.com";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section className="min-h-screen pt-40 pb-20 bg-[#050509] relative z-20 flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF4B99] animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">Open for new projects</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-white mb-6">
            Get in touch
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-16 leading-relaxed">
            If you've any questions, collaboration ideas, or just want to say hello, you can reach us out directly. We're here to help you scale.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
          
          {/* Email Card */}
          <FadeIn delay={0.3} className="h-full">
            <div className="h-full group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B6FFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5B6FFF] to-[#5B6FFF]/80 flex items-center justify-center mb-6 shadow-lg shadow-[#5B6FFF]/20 group-hover:scale-110 transition-transform duration-300">
                <Mail size={32} className="text-white" />
              </div>
              
              <h3 className="relative z-10 text-white font-bold text-xl mb-2">Email Us</h3>
              <p className="relative z-10 text-gray-400 text-sm mb-6">For general inquiries and projects</p>
              
              <button 
                onClick={copyEmail}
                className="relative z-10 w-full py-4 px-6 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between cursor-pointer hover:border-[#5B6FFF]/50 transition-colors group/input"
              >
                <span className="text-sm font-mono text-gray-300">growvolt.us@gmail.com</span>
                {copied ? <Check size={16} className="text-[#FF4B99]" /> : <Copy size={16} className="text-gray-500 group-hover/input:text-white transition-colors" />}
              </button>
            </div>
          </FadeIn>

          {/* Instagram Card */}
          <FadeIn delay={0.4} className="h-full">
            <a 
              href="https://instagram.com/grovwolt.us" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-full block group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B99]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF4B99] to-[#FF4B99]/80 flex items-center justify-center mb-6 shadow-lg shadow-[#FF4B99]/20 group-hover:scale-110 transition-transform duration-300">
                <Instagram size={32} className="text-white" />
              </div>
              
              <h3 className="relative z-10 text-white font-bold text-xl mb-2">Instagram</h3>
              <p className="relative z-10 text-gray-400 text-sm mb-6">Follow our journey & updates</p>
              
              <div className="relative z-10 flex items-center gap-2 text-white font-semibold group-hover:text-[#FF4B99] transition-colors">
                <span>@grovwolt.us</span>
                <ExternalLink size={14} />
              </div>
            </a>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

// ==========================================
// SECTIONS 
// ==========================================

const InfluencerSection = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="pt-10 pb-24 bg-[#050509] relative z-20">
      <div className="container mx-auto px-6 mb-12 flex flex-col items-center text-center relative">
        <FadeIn delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-2">
            Creators we work with
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-neutral-400 text-lg max-w-lg">
            Empowering voices that shape the culture.
          </p>
        </FadeIn>

        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          className="hidden md:flex gap-4 mt-6"
        >
           <button 
            onClick={() => scroll('left')}
            disabled={!showLeftArrow}
            className={`p-3 rounded-full border border-neutral-800 transition-all duration-300 
              ${!showLeftArrow ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neutral-800 hover:border-neutral-700 active:scale-95'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!showRightArrow}
            className={`p-3 rounded-full border border-neutral-800 transition-all duration-300 
              ${!showRightArrow ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neutral-800 hover:border-neutral-700 active:scale-95'}`}
          >
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar items-center md:justify-center lg:justify-start"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {influencers.map((influencer) => (
          <div 
            key={influencer.id}
            className="group relative flex-shrink-0 w-[240px] h-[360px] md:w-[300px] md:h-[420px] snap-center md:snap-start rounded-[1.5rem] overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 transition-transform duration-300 hover:-translate-y-2"
          >
            <img 
              src={influencer.image} 
              alt={influencer.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end h-full items-center text-center">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-3 drop-shadow-md">
                {influencer.name}
              </h3>
              <div className="flex items-center justify-center gap-3 text-xs font-medium">
                {influencer.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm py-1 px-2.5 rounded-full border border-white/10">
                    <stat.icon size={14} className={stat.color} />
                    <span className="text-neutral-200">{stat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="w-6 flex-shrink-0" />
      </motion.div>
    </section>
  );
}

const HorizonSeparator = () => {
  return (
    <div className="relative w-full h-[120px] -mt-[60px] pointer-events-none overflow-hidden z-30">
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="w-[150%] h-[400px] rounded-[100%] border-t border-white/10 bg-[#050509] shadow-[0_-10px_40px_-5px_rgba(59,130,246,0.15)] relative top-[100px]">
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5B6FFF]/50 to-transparent" />
           <div className="absolute inset-x-0 top-[6px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-[90%] mx-auto" />
        </div>
      </div>
    </div>
  );
};

const VideoPlayerUI = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  
  return (
    <div className="relative w-full h-full bg-neutral-900 rounded-2xl overflow-hidden group border border-white/10 shadow-2xl shadow-purple-900/20">
      <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="relative z-10 grid grid-cols-3 gap-4 p-12 w-full max-w-4xl opacity-80 rotate-x-12 perspective-1000 transform-gpu scale-75 md:scale-100">
            {[1, 2, 3].map((i) => (
                <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.2, duration: 1 }} className="aspect-[9/16] bg-neutral-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-lg flex flex-col p-4 space-y-3">
                    <div className="w-full h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg animate-pulse" />
                    <div className="w-3/4 h-4 bg-white/10 rounded" />
                    <div className="w-1/2 h-4 bg-white/10 rounded" />
                </motion.div>
            ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none group-hover:bg-black/20 transition-colors duration-300">
        <button onClick={() => setIsPlaying(!isPlaying)} className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110 group-hover:bg-white/20">
            {isPlaying ? <Pause fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8" /> : <Play fill="currentColor" className="ml-1 w-6 h-6 sm:w-8 sm:h-8" />}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-30 flex flex-col gap-2">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all">
            {/* CSS Animation for smooth progress bar without JS lag */}
            <div className={`h-full bg-gradient-to-r from-[#5B6FFF] via-[#5B6FFF] to-[#FF4B99] shadow-[0_0_10px_rgba(236,72,153,0.5)]`} 
                 style={{ 
                   width: '100%',
                   animation: isPlaying ? 'progress 60s linear infinite' : 'none',
                   transformOrigin: 'left'
                 }} 
            />
            <style>{`
              @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>
        </div>
      </div>
    </div>
  );
};

const InfrastructureSection = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#050509] text-white font-sans overflow-hidden flex flex-col">
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full">
        <FadeIn>
          <div className="mb-8 flex justify-center">
              <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-white/60 uppercase hover:border-pink-500/50 hover:bg-pink-500/10 transition-colors cursor-default">Start Your Own Brand</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="text-center max-w-4xl mx-auto mb-6">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                  Complete infrastructure to <br className="hidden sm:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5B6FFF] to-[#FF4B99] animate-gradient-x">Build & Scale</span>{' '}your product
              </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed">From MVP to global scale. We provide the comprehensive technology stack and design systems you need to turn your audience into a revenue-generating digital ecosystem.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => window.open("https://calendly.com/growvolt-us/30min", "_blank")}
                className="mt-8 group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                  Start Building <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="w-full flex justify-center">
          <div className="w-full max-w-5xl aspect-[16/9] sm:aspect-[21/9] relative z-20">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5B6FFF] via-purple-500 to-[#FF4B99] rounded-2xl opacity-30 blur-2xl animate-pulse group-hover:opacity-50 transition-opacity duration-1000" />
              <VideoPlayerUI />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const CreatorBusinessSection = () => {
  return (
    <section className="py-24 bg-[#050509] text-[#f6f7fb] font-sans flex justify-center relative z-20">
       <style>{`
        .gv-card {
          background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.1), transparent 60%), #050814;
          box-shadow: inset 1px 1px 1px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 1px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.8);
          transition: all 0.3s ease;
        }
        .gv-card:hover {
          transform: translateY(-5px);
          box-shadow: inset 1px 1px 2px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 2px 0 rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 35px 65px -15px rgba(0, 0, 0, 0.9);
          background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.12), transparent 60%), #050814;
        }
      `}</style>
      <div className="w-full max-w-[430px] md:max-w-4xl px-5 flex flex-col items-center">
        <FadeIn>
          <div className="text-[11px] tracking-[0.16em] uppercase text-center opacity-70 mb-3">
            $1M+ A YEAR CREATOR BUSINESSES
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <h2 className="my-2.5 text-[28px] md:text-4xl leading-[1.15] font-bold text-center">
            We build, launch & scale<br />
            <span className="text-white">AI-powered digital products</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mb-10 max-w-xs md:max-w-lg text-[13px] md:text-base leading-[1.6] text-center opacity-70">
            Growvolt uses AI, funnels and performance marketing to turn your audience
            into a real business — from first product to predictable revenue.
          </p>
        </FadeIn>

        <div className="w-full grid md:grid-cols-3 gap-6">
          <FadeIn delay={0.3} className="h-full">
            <article className="gv-card rounded-[26px] p-6 mb-6 md:mb-0 flex flex-col items-center text-center h-full">
              <div className="mb-6">
                <h2 className="mb-2 text-xl font-semibold leading-tight">BUILD</h2>
                <p className="m-0 text-[13px] leading-[1.5] opacity-80 max-w-[280px]">
                  AI-powered product creation built around your audience.
                  We turn your ideas into ready-to-sell digital products fast.
                </p>
              </div>
              <div className="w-full rounded-[20px] overflow-hidden h-[180px] relative bg-gradient-to-br from-white/15 to-[#141928]">
                <img
                  src="https://images.pexels.com/photos/30530408/pexels-photo-30530408.jpeg?cs=srgb&dl=pexels-bertellifotografia-30530408.jpg&fm=jpg"
                  alt="AI chat interface"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.4} className="h-full">
            <article className="gv-card rounded-[26px] p-6 mb-6 md:mb-0 flex flex-col-reverse md:flex-col items-center text-center h-full">
               <div className="w-full rounded-[20px] overflow-hidden h-[210px] relative bg-gradient-to-br from-white/15 to-[#141928] mb-6 md:mb-0 md:mt-6">
                <img
                  src="https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?cs=srgb&dl=pexels-goumbik-669612.jpg&fm=jpg"
                  alt="Analytics charts"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </div>
              <div className="mb-6 md:mb-6 md:mt-0">
                <h2 className="mb-2 text-xl font-semibold leading-tight">FUNNEL</h2>
                <p className="m-0 text-[13px] leading-[1.5] opacity-80 max-w-[280px]">
                  High-converting funnels tailored to your community.
                  Clean, simple flows engineered to maximise sales.
                </p>
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.5} className="h-full">
            <article className="gv-card rounded-[26px] p-6 mb-6 md:mb-0 flex flex-col-reverse md:flex-col items-center text-center h-full">
              <div className="w-full rounded-[20px] overflow-hidden h-[220px] relative bg-gradient-to-br from-white/15 to-[#141928] mb-6 md:mb-0 md:mt-6">
                <img
                  src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?cs=srgb&dl=pexels-tracy-le-blanc-67789-607812.jpg&fm=jpg"
                  alt="Mobile social media"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </div>
              <div className="mb-6 md:mb-6 md:mt-0">
                <h2 className="mb-2 text-xl font-semibold leading-tight">SCALE</h2>
                <p className="m-0 text-[13px] leading-[1.5] opacity-80 max-w-[280px]">
                  Performance marketing that grows your product long after launch.
                  Smart ads, creator-native content, predictable revenue.
                </p>
              </div>
            </article>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

const AIStrategySection = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const [error, setError] = useState('');

  const generateIdeas = async () => {
    if (!niche.trim()) return;
    setLoading(true);
    setError('');
    setIdeas(null);

    const apiKey = "AIzaSyCdTT-Az2Vam6E88it_1QeyZKFUMC2DOFk"; 
    const prompt = `Generate 3 specific, viral content ideas for a creator in the ${niche} niche. Return a JSON object with a key "ideas" which is an array of objects, each having "title" and "hook". Do not include markdown formatting like \`\`\`json.`;

    try {
      const fetchWithRetry = async (retries = 5, delay = 1000) => {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
              })
            }
          );

          if (!response.ok) {
             if (response.status === 429 && retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithRetry(retries - 1, delay * 2);
             }
             throw new Error(`API Error: ${response.status}`);
          }
          return response;
        } catch (err) {
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(retries - 1, delay * 2);
          }
          throw err;
        }
      };

      // Check if API key is set; if not, use mock fallback for demo
      if (!apiKey) {
        throw new Error("Missing API Key - Using Mock Fallback");
      }

      const response = await fetchWithRetry();
      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (resultText) {
        const parsed = JSON.parse(resultText);
        setIdeas(parsed.ideas);
      } else {
        throw new Error("No data returned");
      }

    } catch (err) {
      console.warn("API Error, falling back to mock data:", err);
      // Mock Fallback so the UI works for the user
      await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
      const mockIdeas = [
        { title: `The "${niche}" Mistake`, hook: `Stop doing THIS if you want to succeed in ${niche}...` },
        { title: `3 ${niche} Hacks`, hook: `I wish I knew these ${niche} secrets 5 years ago.` },
        { title: `${niche} Trends 2025`, hook: `Is ${niche} dead? Here is what is actually happening.` }
      ];
      setIdeas(mockIdeas);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#050509] relative z-20 border-t border-white/5 flex justify-center">
      <div className="w-full max-w-4xl px-6">
        <div className="text-center mb-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#5B6FFF]/20 to-[#FF4B99]/20 rounded-full border border-purple-500/30 mb-4">
              <Sparkles size={14} className="text-[#5B6FFF]" />
              <span className="text-xs font-semibold text-purple-200 tracking-wider uppercase">AI Growth Tool</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Viral Content Generator</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-gray-400 max-w-lg mx-auto">
              Stuck on ideas? Let our AI analyze your niche and suggest high-converting content concepts instantly.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-2xl mx-auto shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input 
                type="text" 
                placeholder="Enter your niche (e.g. Fitness, Crypto, Cooking)" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#5B6FFF] transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && generateIdeas()}
              />
              <button 
                onClick={generateIdeas}
                disabled={loading || !niche}
                className="bg-gradient-to-r from-[#5B6FFF] to-[#FF4B99] text-white font-bold py-4 px-8 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                Generate ✨
              </button>
            </div>

            {error && <p className="text-red-400 text-center mb-4">{error}</p>}

            {ideas && (
              <div className="space-y-4">
                {ideas.map((idea, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-[#5B6FFF]/20 p-2 rounded-lg mt-1">
                        <Lightbulb size={18} className="text-[#5B6FFF]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white mb-1">{idea.title}</h3>
                        <p className="text-gray-400 text-sm">{idea.hook}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};


// ==========================================
// COMPONENT: Footer
// ==========================================
const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050509] pt-20 pb-12 font-sans relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-16">
          <div className="md:col-span-5 flex flex-col items-start">
            <FadeIn delay={0}>
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
                <span className="font-bold text-4xl tracking-tight text-white font-serif">Growvolt</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">We craft premium digital experiences that elevate brands and drive measurable results. Let's build something extraordinary together.</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex gap-4">
                {/* Specific Social Icons requested: Insta, Mail, Whatsapp */}
                <a href="https://instagram.com/grovwolt.us" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"><Instagram size={18} /></a>
                <a href="mailto:growvolt.us@gmail.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"><Mail size={18} /></a>
                <a href="https://wa.me/919316821844" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"><WhatsAppIcon size={18} /></a>
              </div>
            </FadeIn>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <FadeIn delay={0.1}>
                <h3 className="text-white font-bold text-lg mb-6">Navigation</h3>
              </FadeIn>
              <ul className="space-y-4">
                {['Home', 'Services', 'Case Studies', 'About'].map((item, idx) => (
                  <li key={item}>
                    <FadeIn delay={0.1 + (idx * 0.05)}>
                      <button 
                        onClick={() => {
                          if (item === 'Services') onNavigate('services');
                          else if (item === 'Case Studies') onNavigate('casestudies');
                          else if (item === 'About') onNavigate('about');
                          else onNavigate('home');
                        }} 
                        className="text-gray-300 hover:text-white text-sm transition-colors text-left"
                      >
                        {item}
                      </button>
                    </FadeIn>
                  </li>
                ))}
                <li>
                  <FadeIn delay={0.3}>
                    <button onClick={() => onNavigate('contact')} className="text-gray-300 hover:text-white text-sm transition-colors text-left">Contact</button>
                  </FadeIn>
                </li>
              </ul>
            </div>
            <div>
              <FadeIn delay={0.2}>
                <h3 className="text-white font-bold text-lg mb-6">Services</h3>
              </FadeIn>
              <ul className="space-y-4">
                {[
                  { name: 'Growvolt Build', id: 'build' },
                  { name: 'Growvolt Launch', id: 'launch' },
                  { name: 'Growvolt Scale', id: 'scale' }
                ].map((item, idx) => (
                  <li key={item.name}>
                    <FadeIn delay={0.2 + (idx * 0.05)}>
                      <button onClick={() => onNavigate(item.id)} className="text-gray-300 hover:text-white text-sm transition-colors text-left">{item.name}</button>
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <FadeIn delay={0.4}>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2025 Growvolt. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};

// ==========================================
// UTILS
// ==========================================

const AnimatedGridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#050509] via-black to-[#050509] z-10" />
    {/* Orbs */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5B6FFF]/10 rounded-full blur-[128px] animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF4B99]/10 rounded-full blur-[128px]" />
  </div>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================
const GrowvoltLanding = () => {
  const [currentView, setCurrentView] = useState('home'); 
  const [activeStep, setActiveStep] = useState(0);
  const [heroState, setHeroState] = useState('explore'); 
  
  // Grid Fade Logic (Light Checkbox BG)
  const { scrollY } = useScroll();
  const gridOpacity = useTransform(scrollY, [0, 800], [0.6, 0]); 

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const steps = [
    {
      id: 1,
      title: "Build & Infrastructure",
      desc: "We engineer a robust digital foundation tailored for scale. From high-converting landing pages to seamless backend systems.",
      icon: <Code size={20} />,
      color: "from-[#5B6FFF] to-[#5B6FFF]", // Unified color
      iconColor: 'text-[#5B6FFF]'
    },
    {
      id: 2,
      title: "Launch & Monetize",
      desc: "Turn influence into income. We deploy targeted campaigns and optimize your product offering for maximum conversion.",
      icon: <Rocket size={20} />,
      color: "from-[#5B6FFF] to-[#FF4B99]", // Unified gradient
      iconColor: 'text-[#5B6FFF]'
    },
    {
      id: 3,
      title: "Scale & Dominate",
      desc: "Data-driven iteration. We analyze user behavior to refine your funnel, expanding your reach and revenue exponentially.",
      icon: <TrendingUp size={20} />,
      color: "from-[#FF4B99] to-[#FF4B99]", // Unified color
      iconColor: 'text-[#FF4B99]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050509] text-white font-sans selection:bg-[#ff3b7f] selection:text-white relative overflow-x-hidden">
      
      {/* --- Styles --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600&display=swap');
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
        .hero-title { font-family: 'Playfair Display', serif; }
        .hero-font { font-family: 'Inter', sans-serif; }
        /* Enhanced Grid Visibility */
        .bg-grid-pattern { 
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px); 
          background-size: 50px 50px; 
          mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        }
      `}</style>

      {/* --- Fixed Background (Grid/Checkbox) --- */}
      <motion.div 
        style={{ opacity: gridOpacity }}
        className="fixed top-0 left-0 right-0 h-[100vh] bg-grid-pattern pointer-events-none z-0"
      />
      
      {/* Base ambient gradient/orbs layer that persists */}
      <AnimatedGridBackground />

      {/* --- 1. Sticky Header --- */}
      <StickyHeader onNavigate={setCurrentView} />

      {currentView === 'home' ? (
        <>
          {/* --- 2. Hero Section --- */}
          <section className="relative z-10 w-full min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-10">
            <div className="w-full max-w-[360px] sm:max-w-4xl text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B99] shadow-[0_0_8px_rgba(255,59,127,0.9)]"></span>
                  <span className="text-[11px] font-medium text-[#9a9aaa] uppercase tracking-[0.13em] hero-font">Creator Economy</span>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 relative inline-block">
                  Turn your <em className="italic">Influence</em><br />
                  into <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#5B6FFF] to-[#FF4B99]">
                    Revenue
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="hero-font text-sm text-[#9a9aaa] leading-[1.55] mb-7 max-w-[310px] mx-auto">Monetize your audience with tailored solutions that deliver real, lasting growth.</p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="w-full max-w-[340px] mx-auto mb-2.5 p-[1px] rounded-full bg-gradient-to-br from-[#FF4B99] via-[#5B6FFF] to-[#FF4B99] shadow-[0_8px_22px_rgba(0,0,0,0.55)]">
                  <div className="relative grid grid-cols-2 p-1 bg-[#0a0a0e]/95 rounded-full overflow-hidden hero-font">
                    {/* Animated Sliding Toggle Background */}
                    <motion.div 
                      className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md z-0"
                      initial={false}
                      animate={{ 
                        left: heroState === 'explore' ? '4px' : 'calc(50%)' 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    
                    {/* Buttons with smooth state change */}
                    <button 
                      onClick={() => setHeroState('explore')} 
                      className={`relative z-10 py-2.5 text-sm font-medium transition-colors duration-200 outline-none ${heroState === 'explore' ? 'text-[#050509] font-bold' : 'text-[#9a9aaa] hover:text-white'}`}
                    >
                      Explore
                    </button>
                    <button 
                      onClick={() => {
                        setHeroState('book');
                        // Small delay to let the slide animation start before opening link
                        setTimeout(() => window.open("https://calendly.com/growvolt-us/30min", "_blank"), 150);
                      }}
                      className={`relative z-10 py-2.5 text-sm font-medium transition-colors duration-200 outline-none ${heroState === 'book' ? 'text-[#050509] font-bold' : 'text-[#9a9aaa] hover:text-white'}`}
                    >
                      Book Call
                    </button>
                  </div>
                </div>
                <p className="hero-font text-[11px] text-[#9a9aaa] mt-1">Tap to switch between options</p>
              </FadeIn>
            </div>
          </section>

          {/* --- 3. Influencer Section --- */}
          <InfluencerSection />

          {/* --- 4. Separator (NEW) --- */}
          <HorizonSeparator />

          {/* --- 5. Infrastructure Section --- */}
          <InfrastructureSection />

          {/* --- 6. Process Section --- */}
          <section className="py-32 relative overflow-hidden font-sans z-10 bg-[#050509]">
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#5B6FFF]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-4xl mx-auto px-6 relative z-10">
              <div className="text-center mb-20">
                <FadeIn>
                  <span className="text-[#5B6FFF] text-sm font-bold tracking-widest uppercase mb-4 block">How It Works</span>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">From Concept to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B6FFF] to-[#FF4B99]">Cash Flow</span></h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="text-gray-400 max-w-lg mx-auto">We handle the heavy lifting. A streamlined process designed to launch your brand in record time.</p>
                </FadeIn>
              </div>
              <div className="relative">
                {/* Static Gradient Line (Minimal Load) */}
                <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5B6FFF]/20 via-[#5B6FFF]/20 to-[#FF4B99]/20 rounded-full" />

                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <FadeIn key={index} delay={0.1 * index}>
                      <div className="relative pl-20 group cursor-default">
                        <div className={`absolute left-0 top-0 w-14 h-14 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300 bg-[#050508] border-white/10 group-hover:border-[#5B6FFF]/50 group-hover:shadow-[0_0_20px_rgba(91,111,255,0.3)]`}>
                           <div className="text-gray-600 group-hover:text-white transition-colors duration-300">
                             {step.icon}
                           </div>
                        </div>
                        {/* Reduced padding for mobile */}
                        <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 glass-card border-white/10 bg-white/5 hover:bg-white/10 group-hover:border-[#5B6FFF]/30`}>
                          <h3 className={`text-lg md:text-xl font-bold mb-2 transition-colors duration-300 text-white`}>{step.title}</h3>
                          <p className={`text-xs md:text-sm leading-relaxed transition-colors duration-300 text-gray-400 group-hover:text-gray-300`}>{step.desc}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <FadeIn delay={0.3}>
                <div className="mt-20 text-center">
                   <button 
                    onClick={() => window.open("https://calendly.com/growvolt-us/30min", "_blank")}
                    className="px-10 py-4 rounded-full bg-[#5B6FFF] text-white font-bold text-lg hover:bg-[#4a58e0] transition-all shadow-[0_0_20px_rgba(91,111,255,0.4)] hover:scale-105 active:scale-95"
                   >
                    Start Building Today
                   </button>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* --- 7. Creator Business Section --- */}
          <CreatorBusinessSection />

          {/* --- 8. AI Strategy Section --- */}
          <AIStrategySection />

          {/* --- 9. Lead Capture Form Section (NEW) --- */}
          <LeadCaptureFormSection />
        </>
      ) : currentView === 'contact' ? (
        <ContactPage />
      ) : currentView === 'services' ? (
        <ServicesPage onNavigate={setCurrentView} />
      ) : currentView === 'build' ? (
        <BuildPage />
      ) : currentView === 'launch' ? (
        <LaunchPage />
      ) : currentView === 'scale' ? (
        <ScalePage />
      ) : currentView === 'casestudies' ? (
        <CaseStudiesPage />
      ) : (
        <AboutUsPage />
      )}

      {/* --- 10. Footer --- */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

export default GrowvoltLanding;