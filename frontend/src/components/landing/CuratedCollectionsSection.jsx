import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

const CuratedCollectionsSection = ({ products }) => {
    const [hoveredCard, setHoveredCard] = useState(null);

    // Split products for asymmetric layout
    const heroProduct = products[0];
    const sideProducts = products.slice(1, 3); // 2 small cards
    const bottomProducts = products.slice(3, 6); // 3 medium cards

    return (
        <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-3 text-gray-900">
                        Curated Collection
                    </h2>
                    <p className="text-lg text-gray-600">
                        Handpicked products for conscious living
                    </p>
                </motion.div>

                {/* Asymmetric Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-6">
                    {/* Large Hero Card - Takes 2 rows, 8 columns */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-8 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                        onMouseEnter={() => setHoveredCard('hero')}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        {/* Hero Card Content */}
                        <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
                            {/* Product Image */}
                            <motion.img
                                src={heroProduct.image}
                                alt={heroProduct.name}
                                className="w-full h-full object-cover"
                                animate={{
                                    scale: hoveredCard === 'hero' ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                                {/* Category Badge */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-4"
                                >
                                    <span className="inline-block px-4 py-2 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                        Featured
                                    </span>
                                </motion.div>

                                {/* Product Name */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl lg:text-5xl font-black text-white mb-3 leading-tight"
                                >
                                    {heroProduct.name}
                                </motion.h3>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white/90 text-base lg:text-lg mb-6 max-w-2xl"
                                >
                                    {heroProduct.description}
                                </motion.p>

                                {/* Price and CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-6"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-white/70 text-xs uppercase tracking-widest font-bold">Price</span>
                                        <span className="text-4xl font-black text-white">${heroProduct.price}</span>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-emerald-500 hover:text-white transition-colors duration-300 shadow-xl flex items-center gap-2"
                                    >
                                        <FaShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Wishlist Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-300 shadow-lg"
                            >
                                <FaHeart className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Small Side Cards - 4 columns, 1 row each */}
                    {sideProducts.map((product, idx) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="lg:col-span-4 group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
                            onMouseEnter={() => setHoveredCard(`side-${idx}`)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="relative h-[280px] overflow-hidden">
                                {/* Product Image */}
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    animate={{
                                        scale: hoveredCard === `side-${idx}` ? 1.15 : 1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Hover Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: hoveredCard === `side-${idx}` ? 1 : 0,
                                    }}
                                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                                />

                                {/* Content */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                    <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
                                        {product.name}
                                    </h4>

                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-white">
                                            ${product.price}
                                        </span>

                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors shadow-lg"
                                        >
                                            <FaShoppingCart className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Wishlist Icon */}
                                <motion.button
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.85 }}
                                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-md"
                                >
                                    <FaHeart className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Medium Cards - 3 equal cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {bottomProducts.map((product, idx) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300"
                            onMouseEnter={() => setHoveredCard(`bottom-${idx}`)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Product Image Container */}
                            <div className="relative h-[320px] overflow-hidden bg-gray-100">
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    animate={{
                                        scale: hoveredCard === `bottom-${idx}` ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Quick Add Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: hoveredCard === `bottom-${idx}` ? 1 : 0,
                                        y: hoveredCard === `bottom-${idx}` ? 0 : 20,
                                    }}
                                    className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-emerald-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <FaShoppingCart className="w-4 h-4" />
                                        Quick Add
                                    </motion.button>
                                </motion.div>

                                {/* Wishlist Button */}
                                <motion.button
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.85 }}
                                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-md"
                                >
                                    <FaHeart className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                    {product.name}
                                </h4>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-black text-emerald-600">
                                        ${product.price}
                                    </span>
                                    <span className="text-xs text-gray-500 line-through">
                                        ${(parseFloat(product.price) * 1.2).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CuratedCollectionsSection;
