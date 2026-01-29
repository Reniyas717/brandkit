import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLeaf, FaArrowRight, FaStar, FaPlay, FaShippingFast, FaRecycle, FaHeart, FaQuoteLeft } from 'react-icons/fa';
import { GiPlantSeed } from 'react-icons/gi';

// Typewriter Effect Component
const TypewriterText = ({ words, className }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentText(word.substring(0, currentText.length + 1));
                if (currentText === word) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setCurrentText(word.substring(0, currentText.length - 1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <span className={className}>
            {currentText}
            <span className="animate-pulse text-amber-500">|</span>
        </span>
    );
};

const TerraVerdeHero = ({ brand }) => {
    const typewriterWords = ['Sustainable', 'Ethical', 'Handcrafted', 'Timeless'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop'
    ];

    const stats = [
        { number: '50+', label: 'Artisan Partners', icon: FaHeart },
        { number: '15', label: 'Countries', icon: FaLeaf },
        { number: '100%', label: 'Sustainable', icon: FaRecycle }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-[#FFFBF5] overflow-hidden">
            {/* Organic Background Shapes */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
                <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Vertical Stack Layout - Mobile First */}
                <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-center min-h-screen">
                    
                    {/* Image Section - Top on mobile, Right on desktop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 lg:order-2 relative pt-24 lg:pt-32 pb-8 lg:pb-0"
                    >
                        {/* Main Image Carousel */}
                        <div className="relative max-w-md mx-auto lg:max-w-none">
                            {/* Background Card */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-[3rem] rotate-2 scale-105" />
                            
                            <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-amber-900/20 border-8 border-white">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={heroImages[currentImageIndex]}
                                        alt="Terra Verde Fashion"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-[400px] lg:h-[500px] object-cover"
                                    />
                                </AnimatePresence>
                                
                                {/* Image Overlay Badge */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-amber-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                                                <GiPlantSeed className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-stone-800 text-sm">Earth Conscious</p>
                                                <p className="text-xs text-stone-500">Made with Love</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-4 -right-4 lg:-right-8 grid grid-cols-3 gap-2">
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + idx * 0.1 }}
                                        className="bg-white rounded-xl p-3 shadow-lg border border-amber-100 text-center min-w-[70px]"
                                    >
                                        <stat.icon className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                                        <p className="text-lg font-black text-stone-800">{stat.number}</p>
                                        <p className="text-xs text-stone-500 leading-tight">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 }}
                                className="absolute -top-8 -left-4 lg:-left-16 bg-white rounded-2xl p-4 shadow-xl border border-amber-100 max-w-xs hidden lg:block"
                            >
                                <FaQuoteLeft className="w-6 h-6 text-amber-400 mb-2" />
                                <p className="text-sm text-stone-600 italic mb-3">
                                    "Every thread tells a story of sustainability and craftsmanship."
                                </p>
                                <div className="flex items-center gap-2">
                                    <img src="https://i.pravatar.cc/32?img=25" className="w-8 h-8 rounded-full" alt="Testimonial" />
                                    <div>
                                        <p className="text-xs font-bold text-stone-800">Sarah Chen</p>
                                        <p className="text-xs text-stone-500">Designer</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section - Bottom on mobile, Left on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 lg:order-1 text-center lg:text-left px-4 lg:px-0 pb-16 lg:pb-0"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full mb-6"
                        >
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                            <span className="text-sm font-bold text-amber-700">Crafted with Purpose</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-6"
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-800 leading-tight mb-2">
                                Terra Verde
                            </h1>
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-600">
                                Fashion That's{' '}
                                <TypewriterText 
                                    words={typewriterWords}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600"
                                />
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg text-stone-500 leading-relaxed mb-8 max-w-lg lg:max-w-none"
                        >
                            Where ancient wisdom meets modern innovation. Each piece is thoughtfully designed 
                            by skilled artisans who pour their heritage into every stitch.
                        </motion.p>

                        {/* Features Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
                        >
                            {[
                                { icon: FaRecycle, text: 'Eco-Friendly' },
                                { icon: FaHeart, text: 'Handmade' },
                                { icon: FaShippingFast, text: 'Carbon Neutral' }
                            ].map((feature, idx) => (
                                <div 
                                    key={idx}
                                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm"
                                >
                                    <feature.icon className="w-4 h-4 text-amber-500" />
                                    <span className="text-sm font-medium text-stone-600">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8"
                        >
                            <Link
                                to="/builder"
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105 transition-all duration-300"
                            >
                                Discover Collection
                                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            
                            <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/80 backdrop-blur border-2 border-stone-200 text-stone-700 font-semibold rounded-2xl hover:bg-white hover:border-amber-300 hover:text-amber-700 transition-all">
                                <FaPlay className="w-4 h-4" />
                                Our Story
                            </button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 border-t border-stone-200"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1,2,3,4].map((i) => (
                                        <img 
                                            key={i}
                                            src={`https://i.pravatar.cc/32?img=${i+35}`} 
                                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                            alt="Customer"
                                        />
                                    ))}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-stone-800 text-sm">2,500+</p>
                                    <p className="text-xs text-stone-500">Happy Customers</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[1,2,3,4,5].map((i) => (
                                        <FaStar key={i} className="w-4 h-4 text-amber-400" />
                                    ))}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-stone-800 text-sm">4.9</p>
                                    <p className="text-xs text-stone-500">Rating</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TerraVerdeHero;
