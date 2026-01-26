import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { FaLeaf, FaRecycle, FaGlobeAmericas, FaHeart, FaCheck, FaArrowRight } from 'react-icons/fa';

// Hero Layout 1: Asymmetric Split with Scroll Parallax
const HeroLayout1 = ({ brand }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <motion.div ref={ref} style={{ opacity, scale }} className="h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
            {/* Left Content - 40% */}
            <div className="absolute left-0 top-0 w-full lg:w-2/5 h-full flex items-center px-8 lg:px-16 z-10 pt-20 lg:pt-0">
                <motion.div style={{ y: y2 }} className="w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 mb-6">
                            <FaLeaf className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-bold text-emerald-800 uppercase">Sustainable</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none text-gray-900">
                            {brand?.name?.split(' ')[0]?.toUpperCase() || 'ECO'}
                            <br />
                            <span className="text-emerald-600">
                                {brand?.name?.split(' ')[1]?.toUpperCase() || 'LUX'}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md">
                            {brand?.description || 'Premium sustainable lifestyle products crafted with care for you and the planet.'}
                        </p>

                        <Button size="lg" className="group bg-emerald-600 text-white hover:bg-emerald-700">
                            Shop Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <div className="mt-12 flex gap-8">
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-emerald-600">500+</div>
                                <div className="text-sm text-gray-600">Products</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-black text-blue-600">50K+</div>
                                <div className="text-sm text-gray-600">Customers</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Image - 60% with Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute right-0 top-0 w-full lg:w-3/5 h-full opacity-20 lg:opacity-100"
            >
                <motion.img
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent to-emerald-50" />
            </motion.div>
        </motion.div>
    );
};

// Hero Layout 2: Centered with Floating Cards
const HeroLayout2 = ({ brand }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <motion.div ref={ref} style={{ opacity }} className="h-screen relative overflow-hidden bg-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Centered Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
                <motion.div
                    style={{ y }}
                    className="max-w-4xl"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm uppercase tracking-wider">
                            New Collection
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
                    >
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            SUSTAINABLE
                        </span>
                        <br />
                        <span className="text-gray-900">LIFESTYLE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
                    >
                        Discover products that make a difference for you and the planet
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Button size="lg" className="px-8 py-6 text-lg">Explore Collection</Button>
                        <Button size="lg" variant="outline" className="px-8 py-6 text-lg">Learn More</Button>
                    </motion.div>
                </motion.div>

                {/* Floating Product Cards */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    {[
                        { img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80', x: '10%', y: '20%', delay: 0.8 },
                        { img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80', x: '80%', y: '30%', delay: 1 },
                        { img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80', x: '15%', y: '70%', delay: 1.2 },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotate: 0,
                                y: [0, -20, 0]
                            }}
                            transition={{
                                delay: item.delay,
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute w-48 h-64 rounded-2xl shadow-2xl overflow-hidden"
                            style={{ left: item.x, top: item.y }}
                        >
                            <img src={item.img} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Hero Layout 3: Diagonal Grid with Scroll Effects
const HeroLayout3 = ({ brand }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <motion.div ref={ref} style={{ opacity }} className="h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Content */}
                <motion.div
                    style={{ y }}
                    className="flex items-center justify-center lg:justify-end px-8 lg:pr-16 order-2 lg:order-1 pt-20 lg:pt-0 text-center lg:text-left"
                >
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
                                <FaRecycle className="w-8 h-8 text-pink-600" />
                                <FaGlobeAmericas className="w-8 h-8 text-purple-600" />
                                <FaLeaf className="w-8 h-8 text-blue-600" />
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                                <span className="text-gray-900">Design</span>
                                <br />
                                <span className="text-gray-900">Meets</span>
                                <br />
                                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                    SUSTAINABILITY
                                </span>
                            </h1>

                            <p className="text-xl text-gray-700 mb-8">
                                Where style and responsibility converge in perfect harmony
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                                <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0">
                                    Discover More
                                </Button>
                                <Button size="lg" variant="outline">
                                    View Collection
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl">
                                    <FaCheck className="w-6 h-6 text-pink-600 mb-2" />
                                    <div className="font-bold text-gray-900">100% Organic</div>
                                    <div className="text-sm text-gray-600">Certified materials</div>
                                </div>
                                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl">
                                    <FaHeart className="w-6 h-6 text-purple-600 mb-2" />
                                    <div className="font-bold text-gray-900">Ethically Made</div>
                                    <div className="text-sm text-gray-600">Fair trade practices</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right: Image Grid with Rotation */}
                <motion.div
                    style={{ rotate }}
                    className="relative order-1 lg:order-2 opacity-50 lg:opacity-100"
                >
                    <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8 lg:p-16">
                        {[
                            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
                            'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
                            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
                            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80',
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 * i, duration: 0.6 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className="rounded-3xl overflow-hidden shadow-xl"
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Auto-Rotating Hero Component
const AutoRotatingHero = ({ brand }) => {
    const [currentHero, setCurrentHero] = useState(0);

    const heroes = [HeroLayout1, HeroLayout2, HeroLayout3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHero((prev) => (prev + 1) % heroes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const CurrentHeroComponent = heroes[currentHero];

    return (
        <div className="relative bg-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentHero}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CurrentHeroComponent brand={brand} />
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
                {heroes.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentHero(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentHero ? 'bg-gray-900 w-8 h-2' : 'bg-gray-400 w-2 h-2'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AutoRotatingHero;
