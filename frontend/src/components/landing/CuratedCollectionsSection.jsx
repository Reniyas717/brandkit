import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '../ui/3d-card';
import { FaArrowRight, FaShoppingCart } from 'react-icons/fa';

// Creative Bento Grid with Auto-Rotating Featured Product
const CuratedCollectionsSection = ({ products }) => {
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
    // Get 4 distinct products for the grid
    const gridProducts = products.filter((_, i) => i !== featuredIndex).slice(0, 4);

    return (
        <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50 flex items-center">
            <div className="container mx-auto px-4 md:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-gray-900">Curated Collection</h2>
                    <p className="text-lg md:text-xl text-gray-600">Experience our products in motion</p>
                </motion.div>

                <div
                    className="space-y-6"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch h-auto md:h-[380px]">
                        {/* Featured Product */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featuredProduct.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="h-[300px] md:h-full"
                            >
                                <CardContainer className="inter-var w-full h-full" containerClassName="py-0 h-full">
                                    <CardBody className="bg-white relative group/card border-black/[0.05] w-full h-full rounded-[2rem] p-6 border transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/20 flex flex-col justify-between overflow-hidden">
                                        <div className="relative z-10">
                                            <CardItem
                                                translateZ="50"
                                                className="text-2xl font-black text-gray-900 mb-2 tracking-tight"
                                            >
                                                {featuredProduct.name}
                                            </CardItem>
                                            <CardItem
                                                as="p"
                                                translateZ="60"
                                                className="text-gray-500 text-sm max-w-sm leading-relaxed"
                                            >
                                                {featuredProduct.description}
                                            </CardItem>
                                        </div>

                                        <CardItem translateZ="80" className="absolute inset-0 w-full h-full">
                                            <img
                                                src={featuredProduct.image}
                                                className="h-full w-full object-cover rounded-[2rem] opacity-20 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100"
                                                alt="thumbnail"
                                                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}
                                            />
                                        </CardItem>

                                        <div className="flex justify-between items-center mt-auto relative z-10 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-sm">
                                            <CardItem
                                                translateZ="20"
                                                className="flex flex-col px-2"
                                            >
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Price</span>
                                                <span className="text-2xl font-black text-emerald-700">${featuredProduct.price}</span>
                                            </CardItem>
                                            <CardItem
                                                translateZ="40"
                                                as="button"
                                                className="px-6 py-3 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-lg flex items-center gap-2"
                                            >
                                                Shop Now <FaArrowRight className="w-3 h-3" />
                                            </CardItem>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </motion.div>
                        </AnimatePresence>

                        {/* Grid Products */}
                        <div className="grid grid-cols-2 gap-3 h-[300px] md:h-full">
                            {gridProducts.map((product, idx) => (
                                <CardContainer key={product.name} className="inter-var w-full h-full" containerClassName="py-0">
                                    <CardBody className="bg-white relative group/card border-black/[0.05] w-full h-full rounded-[1.5rem] p-3 border hover:border-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                                        <CardItem translateZ="30" className="w-full h-24 mb-2 overflow-hidden rounded-xl bg-gray-50">
                                            <img
                                                src={product.image}
                                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                alt="thumbnail"
                                            />
                                        </CardItem>

                                        <div className="mt-auto">
                                            <CardItem
                                                translateZ="40"
                                                className="text-xs font-bold text-gray-900 truncate"
                                            >
                                                {product.name}
                                            </CardItem>
                                            <div className="flex justify-between items-center mt-1">
                                                <CardItem
                                                    translateZ="20"
                                                    className="font-bold text-sm text-emerald-600"
                                                >
                                                    ${product.price}
                                                </CardItem>
                                                <CardItem
                                                    translateZ="40"
                                                    className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-900 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer group/btn shadow-sm"
                                                >
                                                    <FaShoppingCart size={10} className="group-hover/btn:scale-110 transition-transform" />
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
            </div>
        </section>
    );
};

export default CuratedCollectionsSection;
