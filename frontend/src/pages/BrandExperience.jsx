import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../hooks/useBrand';
import { Button } from '../components/ui/button';
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
import {
    FaLeaf, FaSeedling, FaRecycle, FaGlobeAmericas,
    FaHeart, FaShieldAlt, FaStar, FaArrowRight, FaArrowLeft,
    FaCheck, FaWater, FaSun, FaTree, FaShoppingCart
} from 'react-icons/fa';

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
        <motion.div ref={ref} style={{ opacity, scale }} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
            {/* Left Content - 40% */}
            <div className="absolute left-0 top-0 w-2/5 h-full flex items-center p-16 z-10">
                <motion.div style={{ y: y2 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 mb-6">
                            <FaLeaf className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-bold text-emerald-800 uppercase">Sustainable</span>
                        </div>

                        <h1 className="text-8xl font-black mb-6 leading-none text-gray-900">
                            {brand?.name?.split(' ')[0]?.toUpperCase() || 'ECO'}
                            <br />
                            <span className="text-emerald-600">
                                {brand?.name?.split(' ')[1]?.toUpperCase() || 'LUX'}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-700 mb-8 max-w-md">
                            {brand?.description}
                        </p>

                        <Button size="lg" className="group">
                            Shop Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <div className="mt-12 flex gap-8">
                            <div>
                                <div className="text-4xl font-black text-emerald-600">500+</div>
                                <div className="text-sm text-gray-600">Products</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-blue-600">50K+</div>
                                <div className="text-sm text-gray-600">Customers</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Right Image - 60% with Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute right-0 top-0 w-3/5 h-full"
            >
                <motion.img
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-emerald-50" />
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
        <motion.div ref={ref} style={{ opacity }} className="min-h-screen relative overflow-hidden bg-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Centered Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
                <motion.div
                    style={{ y }}
                    className="text-center max-w-4xl"
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
                        className="text-9xl font-black mb-6 leading-none"
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
                        className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
                    >
                        Discover products that make a difference for you and the planet
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex justify-center gap-4"
                    >
                        <Button size="lg">Explore Collection</Button>
                        <Button size="lg" variant="outline">Learn More</Button>
                    </motion.div>
                </motion.div>

                {/* Floating Product Cards */}
                <div className="absolute inset-0 pointer-events-none">
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
        <motion.div ref={ref} style={{ opacity }} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            <div className="min-h-screen grid grid-cols-2">
                {/* Left: Content */}
                <motion.div
                    style={{ y }}
                    className="flex items-center justify-end pr-16"
                >
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <FaRecycle className="w-8 h-8 text-pink-600" />
                                <FaGlobeAmericas className="w-8 h-8 text-purple-600" />
                                <FaLeaf className="w-8 h-8 text-blue-600" />
                            </div>

                            <h1 className="text-7xl font-black mb-6 leading-tight">
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

                            <div className="flex gap-4 mb-12">
                                <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600">
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
                    className="relative"
                >
                    <div className="absolute inset-0 grid grid-cols-2 gap-4 p-16">
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

// Auto-Rotating Hero Container
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
        <div className="relative">
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
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentHero ? 'bg-gray-900 w-8' : 'bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

// Asymmetric Grid
const AsymmetricGrid = () => {
    const items = [
        {
            title: 'Organic Cotton',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
            color: 'from-emerald-500 to-teal-600',
            description: 'Premium organic cotton sourced from certified sustainable farms'
        },
        {
            title: 'Hemp Fiber',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
            color: 'from-blue-500 to-cyan-600',
            description: 'Durable & sustainable'
        },
        {
            title: 'Bamboo',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
            color: 'from-pink-500 to-rose-600',
            description: 'Fast-growing resource'
        },
        {
            title: 'Recycled Materials',
            image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80',
            color: 'from-purple-500 to-indigo-600',
            description: 'Giving new life to waste materials'
        },
    ];

    return (
        <div className="grid grid-cols-12 gap-6 auto-rows-[300px]">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-8 row-span-2 relative overflow-hidden rounded-3xl group cursor-pointer"
            >
                <img src={items[0].image} alt={items[0].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-br ${items[0].color} mix-blend-multiply opacity-60`} />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <h3 className="text-5xl font-black text-white mb-4">{items[0].title}</h3>
                    <p className="text-white/90 text-lg mb-6 max-w-md">{items[0].description}</p>
                    <Button className="w-fit bg-white text-black hover:bg-gray-100">
                        Explore <FaArrowRight className="ml-2" />
                    </Button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-4 row-span-1 relative overflow-hidden rounded-3xl group cursor-pointer"
            >
                <img src={items[1].image} alt={items[1].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-br ${items[1].color} mix-blend-multiply opacity-60`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-3xl font-black text-white mb-2">{items[1].title}</h3>
                    <p className="text-white/90 text-sm">{items[1].description}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-4 row-span-1 relative overflow-hidden rounded-3xl group cursor-pointer"
            >
                <img src={items[2].image} alt={items[2].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-br ${items[2].color} mix-blend-multiply opacity-60`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-3xl font-black text-white mb-2">{items[2].title}</h3>
                    <p className="text-white/90 text-sm">{items[2].description}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="col-span-12 row-span-1 relative overflow-hidden rounded-3xl group cursor-pointer"
            >
                <img src={items[3].image} alt={items[3].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-r ${items[3].color} mix-blend-multiply opacity-60`} />
                <div className="absolute inset-0 px-12 flex items-center">
                    <div className="max-w-2xl">
                        <h3 className="text-5xl font-black text-white mb-4">{items[3].title}</h3>
                        <p className="text-white/90 text-xl">{items[3].description}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Creative Bento Grid with Auto-Rotating Featured Product
const BentoProductGrid = ({ products }) => {
    // State for auto-rotating featured product
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-rotate effect
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setFeaturedIndex((prev) => (prev + 1) % products.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, products.length]);

    // Current product logic
    const featuredProduct = products[featuredIndex];
    // Get 4 distinct products for the grid (excluding current featured if possible, or just next 4)
    const gridProducts = products.filter((_, i) => i !== featuredIndex).slice(0, 4);

    return (
        <div className="space-y-24">
            <div
                className="space-y-12"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {/* Top Row: Featured Product + 2 items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-[600px]">
                    {/* Featured Large Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={featuredProduct.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className="h-full"
                        >
                            <CardContainer className="inter-var w-full h-full" containerClassName="py-0 h-full">
                                <CardBody className="bg-white relative group/card border-black/[0.05] w-full h-full rounded-[2.5rem] p-10 border transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/20 flex flex-col justify-between">
                                    <div className="relative z-10">
                                        <CardItem
                                            translateZ="50"
                                            className="text-4xl font-black text-gray-900 mb-3 tracking-tight"
                                        >
                                            {featuredProduct.name}
                                        </CardItem>
                                        <CardItem
                                            as="p"
                                            translateZ="60"
                                            className="text-gray-500 text-lg max-w-sm leading-relaxed"
                                        >
                                            {featuredProduct.description}
                                        </CardItem>
                                    </div>

                                    <CardItem translateZ="80" className="absolute inset-0 w-full h-full">
                                        <img
                                            src={featuredProduct.image}
                                            className="h-full w-full object-cover rounded-[2.5rem] opacity-20 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100"
                                            alt="thumbnail"
                                            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
                                        />
                                    </CardItem>

                                    <div className="flex justify-between items-center mt-auto relative z-10 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-sm">
                                        <CardItem
                                            translateZ="20"
                                            className="flex flex-col px-2"
                                        >
                                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Price</span>
                                            <span className="text-3xl font-black text-emerald-700">${featuredProduct.price}</span>
                                        </CardItem>
                                        <CardItem
                                            translateZ="40"
                                            as="button"
                                            className="px-8 py-4 rounded-2xl bg-gray-900 text-white text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            Shop Now <FaArrowRight className="w-3 h-3" />
                                        </CardItem>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </motion.div>
                    </AnimatePresence>

                    {/* Right Column Grid */}
                    <div className="grid grid-cols-2 gap-6 h-full">
                        {gridProducts.map((product, idx) => (
                            <CardContainer key={product.name} className="inter-var w-full h-full" containerClassName="py-0">
                                <CardBody className="bg-white relative group/card border-black/[0.05] w-full h-full rounded-[2rem] p-6 border hover:border-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                                    <CardItem translateZ="30" className="w-full aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-50">
                                        <img
                                            src={product.image}
                                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            alt="thumbnail"
                                        />
                                    </CardItem>

                                    <div className="mt-auto">
                                        <CardItem
                                            translateZ="40"
                                            className="text-base font-bold text-gray-900 truncate"
                                        >
                                            {product.name}
                                        </CardItem>
                                        <div className="flex justify-between items-center mt-2">
                                            <CardItem
                                                translateZ="20"
                                                className="font-bold text-lg text-emerald-600"
                                            >
                                                ${product.price}
                                            </CardItem>
                                            <CardItem
                                                translateZ="40"
                                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer group/btn shadow-sm"
                                            >
                                                <FaShoppingCart size={12} className="group-hover/btn:scale-110 transition-transform" />
                                            </CardItem>
                                        </div>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        ))}
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2">
                    {products.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setFeaturedIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === featuredIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                        />
                    ))}
                </div>
            </div>

            {/* NEW SECTION: Sustainability Process */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-emerald-50/50 -skew-y-3 transform origin-top-left scale-110" />
                <div className="relative z-10 max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Transparency</span>
                        <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6">From Nature to You</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Every step of our process is designed to minimize footprint and maximize positive impact.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: FaSeedling, title: "Sourcing", desc: "We partner directly with organic farms to ensure regenerative practices.", step: "01" },
                            { icon: FaWater, title: "Production", desc: "Zero-waste manufacturing powered by 100% renewable energy.", step: "02" },
                            { icon: FaRecycle, title: "Lifecycle", desc: "Designed for longevity and fully recyclable at end of life.", step: "03" }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                <div className="absolute -top-10 -left-10 text-[120px] font-black text-emerald-900/5 select-none transition-transform group-hover:scale-110 duration-500">
                                    {item.step}
                                </div>
                                <div className="relative bg-white p-10 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                                        <item.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const BrandExperience = () => {
    const { brand, loading } = useBrand('ecolux-essentials');
    const navigate = useNavigate();

    const products = [
        { name: 'Organic Tote Bag', price: '49.99', description: 'Handwoven hemp tote with reinforced straps', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80' },
        { name: 'Bamboo Utensil Set', price: '24.99', description: 'Complete set with carrying case', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80' },
        { name: 'Recycled Notebook', price: '18.99', description: '100% post-consumer recycled paper', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80' },
        { name: 'Cotton T-Shirt', price: '39.99', description: 'Organic cotton with natural dyes', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
        { name: 'Reusable Water Bottle', price: '34.99', description: 'Stainless steel, BPA-free', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80' },
        { name: 'Hemp Backpack', price: '89.99', description: 'Durable hemp canvas with laptop sleeve', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAF9]">
            {/* Auto-Rotating Heroes with Scroll Animations */}
            <AutoRotatingHero brand={brand} />

            {/* Materials Grid */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-black mb-4">Our Materials</h2>
                        <p className="text-xl text-gray-600">Sourced responsibly, crafted beautifully</p>
                    </motion.div>
                    <AsymmetricGrid />
                </div>
            </section>

            {/* Products Carousel */}
            <section className="py-32 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-black mb-4">Curated Collection</h2>
                        <p className="text-xl text-gray-600">Experience our products in motion</p>
                    </motion.div>
                    <BentoProductGrid products={products} />
                </div>
            </section>

            {/* CTA Section - Build Your Kit */}
            <section className="py-32 bg-gradient-to-br from-emerald-500 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>
                <div className="container mx-auto px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-6xl font-black text-white mb-6">
                            Ready to Build Your Kit?
                        </h2>
                        <p className="text-xl text-emerald-50 mb-12">
                            Create a personalized subscription box with your favorite sustainable products
                        </p>
                        <Button
                            onClick={() => navigate('/builder')}
                            size="lg"
                            className="bg-white text-emerald-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-2xl"
                        >
                            <FaShoppingCart className="mr-3" />
                            Start Building
                            <FaArrowRight className="ml-3" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BrandExperience;
