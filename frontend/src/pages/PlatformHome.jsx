import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { brandService } from '../services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  FiArrowRight, FiBox, FiShield, FiGlobe, FiStar, FiCheck, 
  FiTrendingUp, FiZap, FiPlay, FiAward, FiPackage, FiArrowUpRight,
  FiTarget, FiLayers
} from 'react-icons/fi';
import { RiLeafLine, RiSparklingLine } from 'react-icons/ri';

// Product images for hero
const heroImages = [
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=500&fit=crop', // Skincare
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=500&fit=crop', // Natural products
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop', // Eco packaging
  'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=500&fit=crop', // Sustainable goods
];

// ============================================
// HERO SECTION - With Product Images
// ============================================
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#fafaf9]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100/50 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <motion.div style={{ opacity }} className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-sm font-medium text-emerald-700 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Trusted by 50,000+ conscious consumers
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-neutral-900"
            >
              Curate Your
              <span className="relative block mt-2">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Sustainable
                </span>
              </span>
              Lifestyle
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-neutral-600 leading-relaxed"
            >
              Build personalized subscription boxes from verified ethical brands. 
              Every purchase supports regenerative practices and plants trees worldwide.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/explore"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20"
              >
                Start Building
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/brands"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base border-2 border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-white transition-all"
              >
                <FiPlay className="w-4 h-4" />
                See How It Works
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-14 flex gap-10"
            >
              {[
                { value: '120+', label: 'Ethical Brands' },
                { value: '500K', label: 'Trees Planted' },
                { value: '4.9', label: 'Avg Rating', icon: FiStar },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-neutral-900">
                    {stat.icon && <stat.icon className="w-5 h-5 text-amber-500 fill-amber-500" />}
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Product Images Grid */}
          <motion.div 
            style={{ y: imageY }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[600px]">
              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute top-0 right-0 w-72 h-96 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10"
              >
                <img 
                  src={heroImages[0]} 
                  alt="Sustainable skincare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Second image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="absolute top-20 left-0 w-56 h-72 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10"
              >
                <img 
                  src={heroImages[1]} 
                  alt="Natural products"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Third image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute bottom-0 right-20 w-48 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10"
              >
                <img 
                  src={heroImages[2]} 
                  alt="Eco packaging"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-40 right-72 bg-white rounded-2xl p-4 shadow-xl shadow-neutral-900/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <RiLeafLine className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">This month</div>
                    <div className="font-bold text-neutral-900">12K Trees</div>
                  </div>
                </div>
              </motion.div>

              {/* Rating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute bottom-20 left-20 bg-white rounded-2xl p-4 shadow-xl shadow-neutral-900/10"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-neutral-900">4.9</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">50,000+ reviews</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FEATURES SECTION - Bento Grid Layout
// ============================================
const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
            <RiSparklingLine className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Why Choose BrandKit</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            Built for the
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"> conscious </span>
            consumer
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large Feature - Kit Builder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 md:col-span-7 relative group"
          >
            <div className="relative h-full min-h-[320px] p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-teal-400/20 rounded-full blur-xl" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                    <FiBox className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Custom Kit Builder</h3>
                  <p className="text-white/80 text-lg max-w-md leading-relaxed">
                    Mix products from multiple ethical brands into one personalized subscription box. Your curation, your rules.
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <Link to="/builder" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 font-semibold rounded-full text-sm hover:bg-white/90 transition-all">
                    Try Builder <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 md:col-span-5 relative group"
          >
            <div className="relative h-full min-h-[320px] p-8 rounded-[2rem] bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 overflow-hidden hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-500">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-200/50 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-200/30 rounded-full blur-2xl" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-5 shadow-lg shadow-violet-200">
                  <FiZap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">AI-Powered Picks</h3>
                <p className="text-neutral-600 leading-relaxed flex-1">
                  Smart recommendations that learn your values, preferences, and sustainability goals.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 border-2 border-white flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-neutral-500 text-sm">98% match accuracy</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Verified Ethical */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-12 sm:col-span-6 md:col-span-4"
          >
            <div className="relative h-full min-h-[280px] p-7 rounded-[2rem] bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 overflow-hidden group hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-500">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-5 shadow-lg shadow-amber-200">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Verified Ethical</h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  Every brand passes our rigorous 50-point sustainability audit.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['B-Corp', 'Carbon Neutral', 'Fair Trade'].map((badge) => (
                    <span key={badge} className="px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-amber-700 border border-amber-200">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Impact Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-12 sm:col-span-6 md:col-span-4"
          >
            <div className="relative h-full min-h-[280px] p-7 rounded-[2rem] bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-100 overflow-hidden group hover:shadow-xl hover:shadow-cyan-100/50 transition-all duration-500">
              {/* Mini chart visualization */}
              <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1.5 px-8 pb-4 opacity-30">
                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                  <div key={i} className="w-full bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center mb-5 shadow-lg shadow-cyan-200">
                  <FiTrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Impact Dashboard</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Track trees planted, carbon offset & water saved in real-time.
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-cyan-600">2.5M</span>
                  <span className="text-sm text-neutral-500">kg CO₂ offset</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Flexible Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-12 md:col-span-4"
          >
            <div className="relative h-full min-h-[280px] p-7 rounded-[2rem] bg-white border border-neutral-200 overflow-hidden group hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all duration-500">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-5">
                  <FiLayers className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Flexible Delivery</h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  Weekly, monthly, or quarterly—you choose your rhythm.
                </p>
                <div className="flex gap-2">
                  {['Weekly', 'Monthly', 'Quarterly'].map((freq, i) => (
                    <span 
                      key={freq} 
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        i === 1 
                          ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 ring-offset-2' 
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {freq}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BRANDS SECTION - Premium Showcase
// ============================================
const BrandsSection = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandService.getAllBrands();
        const data = response?.data || response?.brands || response;
        setBrands(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const displayBrands = brands.length > 0 ? brands.slice(0, 2) : [];

  return (
    <section ref={ref} className="py-28 bg-[#fafaf9] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <RiLeafLine className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Handpicked Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
              Meet the brands
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                shaping tomorrow
              </span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:text-right"
          >
            <p className="text-neutral-600 text-lg mb-6 max-w-md lg:ml-auto">
              Each brand is vetted through our 50-point ethical audit covering supply chain, labor practices, and environmental impact.
            </p>
            <Link
              to="/brands"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20"
            >
              Explore All Brands <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Brands Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayBrands.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {displayBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              >
                <Link
                  to={`/brands/${brand.slug || brand.id}`}
                  className="group block relative h-[400px] rounded-[2rem] overflow-hidden bg-white border border-neutral-200 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 h-[60%]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
                      style={{ 
                        backgroundImage: `url(${brand.hero_image_url || brand.logo_url || `https://images.unsplash.com/photo-${index === 0 ? '1542601906990-b4d3fb778b09' : '1556228578-0d85b1a4d571'}?w=800`})` 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-7 flex flex-col justify-between">
                    {/* Top badges */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-wrap gap-2">
                        {(brand.certifications || ['Organic', 'Cruelty-Free']).slice(0, 2).map((cert, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-emerald-700 border border-emerald-100 shadow-sm"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-amber-100 shadow-sm">
                        <FiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-neutral-900">{brand.rating || '4.8'}</span>
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-neutral-100">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                        {brand.description || brand.tagline || 'Committed to sustainable and ethical practices in every product.'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-neutral-500 text-sm">
                          <FiPackage className="w-4 h-4" />
                          {brand.product_count || '15'} Products
                        </span>
                        
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          Shop Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200">
            <p className="text-neutral-500 mb-4">No brands available at the moment.</p>
            <Link to="/explore" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all">
              Explore Products <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS - Vertical Timeline
// ============================================
const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const steps = [
    {
      step: '01',
      title: 'Discover Ethical Brands',
      description: 'Browse our curated collection of verified sustainable brands. Each one meets our strict 50-point ethical standards covering environmental impact, labor practices, and supply chain transparency.',
      icon: FiGlobe,
    },
    {
      step: '02',
      title: 'Build Your Perfect Kit',
      description: 'Mix and match products from different brands into one custom subscription box. Choose your delivery frequency—weekly, monthly, or quarterly—to match your lifestyle.',
      icon: FiBox,
    },
    {
      step: '03',
      title: 'Get AI-Powered Picks',
      description: 'Our intelligent recommendation engine learns your preferences and suggests products that align perfectly with your values, needs, and sustainability goals.',
      icon: FiZap,
    },
    {
      step: '04',
      title: 'Track Your Impact',
      description: 'Watch your positive footprint grow with every order. Track trees planted, carbon offset, water saved, and more through your personalized impact dashboard.',
      icon: FiTrendingUp,
    },
  ];

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">How It Works</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-neutral-900">
            Simple Steps to<br />Sustainable Living
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-200 via-teal-200 to-cyan-200 md:-translate-x-px" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 -translate-x-1/2 mt-2 z-10" />

              {/* Content */}
              <div className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                <div className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Step {step.step}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed max-w-md inline-block">
                  {step.description}
                </p>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20"
          >
            Start Building Your Kit <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIALS - Compact Professional Design
// ============================================
const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const testimonials = [
    {
      quote: "BrandKit transformed how I approach sustainable living. The curated selection makes discovering ethical brands effortless.",
      author: "Sarah Chen",
      role: "Environmental Advocate",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      quote: "The transparency and impact tracking keeps me motivated. I love seeing exactly where my products come from.",
      author: "Marcus Johnson",
      role: "Sustainability Blogger",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      quote: "AI recommendations are spot-on! Found perfect zero-waste alternatives for my entire skincare routine.",
      author: "Emma Williams",
      role: "Conscious Consumer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-neutral-900">
            Trusted by Thousands
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:shadow-lg hover:shadow-neutral-100 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                <img 
                  src={t.avatar} 
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm text-neutral-900">{t.author}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative p-14 md:p-20 rounded-[2.5rem] bg-neutral-900 text-white text-center overflow-hidden"
        >
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-8"
            >
              <FiAward className="w-4 h-4 text-emerald-400" />
              Join 50,000+ conscious consumers
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Make<br />a Real Impact?
            </h2>
            
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              Start your sustainable journey today. Build your first kit in minutes and join the movement for positive change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg bg-white text-neutral-900 hover:bg-neutral-100 transition-all shadow-xl"
              >
                Get Started Free <FiArrowRight />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Explore Products
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-neutral-500">
              <span className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-emerald-400" /> Free to join
              </span>
              <span className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-emerald-400" /> No commitments
              </span>
              <span className="flex items-center gap-2">
                <FiCheck className="w-4 h-4 text-emerald-400" /> Cancel anytime
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN PLATFORM HOME
// ============================================
const PlatformHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <BrandsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default PlatformHome;
