import React, { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useBrand } from '../hooks/useBrand';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
    FaLeaf, FaSeedling, FaRecycle, FaGlobeAmericas,
    FaHeart, FaShieldAlt, FaStar, FaArrowRight, FaArrowLeft,
    FaCheck, FaWater, FaSun, FaTree
} from 'react-icons/fa';

// Premium Carousel Component
const PremiumCarousel = ({ products }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
        dragFree: true
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            className="flex-[0_0_400px] min-w-0"
                            whileHover={{ y: -10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Card className="overflow-hidden group cursor-pointer h-full">
                                <div className="relative h-96 overflow-hidden">
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        <Button className="w-full bg-white text-black hover:bg-gray-100">
                                            Quick Add <FaArrowRight className="ml-2" />
                                        </Button>
                                    </motion.div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold">{product.name}</h3>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <FaStar className="w-4 h-4 fill-current" />
                                            <span className="text-sm font-semibold">4.9</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-[#0EA5E9]">${product.price}</span>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide">In Stock</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full">
                    <FaArrowLeft />
                </Button>
                <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full">
                    <FaArrowRight />
                </Button>
            </div>
        </div>
    );
};

// Asymmetric Grid Section
const AsymmetricGrid = () => {
    const items = [
        {
            title: 'Organic Cotton',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
            size: 'large',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            title: 'Hemp Fiber',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
            size: 'medium',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            title: 'Bamboo',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
            size: 'medium',
            color: 'from-pink-500 to-rose-600'
        },
        {
            title: 'Recycled Materials',
            image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80',
            size: 'large',
            color: 'from-purple-500 to-indigo-600'
        },
    ];

    return (
        <div className="grid grid-cols-12 gap-6 auto-rows-[300px]">
            {/* Large Card - Spans 8 columns, 2 rows */}
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
                    <p className="text-white/90 text-lg mb-6 max-w-md">Premium organic cotton sourced from certified sustainable farms</p>
                    <Button className="w-fit bg-white text-black hover:bg-gray-100">
                        Explore <FaArrowRight className="ml-2" />
                    </Button>
                </div>
            </motion.div>

            {/* Medium Card - Spans 4 columns, 1 row */}
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
                    <p className="text-white/90 text-sm">Durable & sustainable</p>
                </div>
            </motion.div>

            {/* Medium Card - Spans 4 columns, 1 row */}
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
                    <p className="text-white/90 text-sm">Fast-growing resource</p>
                </div>
            </motion.div>

            {/* Large Card - Spans 12 columns, 1 row */}
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
                        <p className="text-white/90 text-xl">Giving new life to waste materials through innovative recycling processes</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Split Hero Section
const SplitHero = ({ brand }) => {
    return (
        <div className="grid lg:grid-cols-2 min-h-screen">
            {/* Left Side - Content */}
            <div className="flex items-center justify-center p-16 bg-gradient-to-br from-gray-50 to-white">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <FaLeaf className="w-6 h-6 text-emerald-600" />
                        <FaRecycle className="w-6 h-6 text-blue-600" />
                        <FaGlobeAmericas className="w-6 h-6 text-pink-600" />
                        <span className="text-sm uppercase tracking-widest text-gray-500 font-semibold ml-2">
                            Sustainable Living
                        </span>
                    </div>

                    <h1 className="text-7xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                            {brand?.name?.toUpperCase() || 'ECOLUX ESSENTIALS'}
                        </span>
                    </h1>

                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                        {brand?.description || 'Premium sustainable lifestyle products crafted with care for you and the planet.'}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="group">
                            Explore Collection
                            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button size="lg" variant="outline">
                            Our Story
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t">
                        <div>
                            <div className="text-4xl font-black text-emerald-600 mb-2">500+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">Products</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-blue-600 mb-2">50K+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-pink-600 mb-2">100%</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">Sustainable</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="relative overflow-hidden"
            >
                <img
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80"
                    alt="Sustainable products"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
        </div>
    );
};

// Staggered Feature Cards
const StaggeredFeatures = () => {
    const features = [
        { icon: FaSeedling, title: 'Farm to Fiber', desc: 'Fully traceable supply chains verified at source', color: 'emerald' },
        { icon: FaShieldAlt, title: 'Certified Quality', desc: 'Third-party organic certifications', color: 'blue' },
        { icon: FaHeart, title: 'Low Impact', desc: 'Natural dyes and zero-waste packaging', color: 'pink' },
        { icon: FaWater, title: 'Water Conscious', desc: 'Minimal water usage in production', color: 'cyan' },
        { icon: FaSun, title: 'Solar Powered', desc: 'Renewable energy manufacturing', color: 'yellow' },
        { icon: FaTree, title: 'Carbon Neutral', desc: 'Offset programs for every purchase', color: 'green' },
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={index % 2 === 0 ? 'lg:mt-12' : ''}
                >
                    <Card className="h-full border-2 hover:border-gray-300 transition-colors">
                        <CardContent className="p-8">
                            <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6`}>
                                <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] cursor-pointer group">
                                Learn More
                                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

const BrandExperience = () => {
    const { brand, loading } = useBrand('ecolux-essentials');

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
            {/* Split Hero */}
            <SplitHero brand={brand} />

            {/* Asymmetric Materials Grid */}
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

            {/* Staggered Features */}
            <section className="py-32 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-black mb-4">Why Choose Us</h2>
                        <p className="text-xl text-gray-600">Committed to sustainability at every step</p>
                    </motion.div>
                    <StaggeredFeatures />
                </div>
            </section>

            {/* Premium Carousel */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-6xl font-black mb-4">Featured Products</h2>
                        <p className="text-xl text-gray-600">Curated selection of our bestsellers</p>
                    </motion.div>
                    <PremiumCarousel products={products} />
                </div>
            </section>

            {/* Full Width CTA */}
            <section className="relative py-48 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-blue-900/90" />
                <div className="relative container mx-auto px-8 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-7xl font-black mb-6">Ready to Make a Difference?</h2>
                        <p className="text-2xl mb-12 opacity-90">
                            Join thousands of conscious consumers choosing sustainable products
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-12">
                                Start Shopping <FaArrowRight className="ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-12">
                                Learn More
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BrandExperience;
