import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaEye, FaLeaf } from 'react-icons/fa';

const TerraVerdeCollections = ({ products = [], brand }) => {
    const displayProducts = products.length > 0 ? products.slice(0, 8) : [
        { id: 1, name: 'Organic Cotton Tee', price: 49.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', category: 'Apparel' },
        { id: 2, name: 'Bamboo Fiber Shirt', price: 79.99, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', category: 'Apparel' },
        { id: 3, name: 'Hemp Canvas Bag', price: 65.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', category: 'Accessories' },
        { id: 4, name: 'Recycled Denim Jacket', price: 149.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', category: 'Outerwear' }
    ];

    return (
        <section id="collections" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
                >
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full text-xs font-semibold text-amber-700 mb-3">
                            <FaLeaf className="w-3 h-3" />
                            Featured Collection
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-black text-stone-800">
                            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">For You</span>
                        </h2>
                        <p className="mt-2 text-stone-500 max-w-xl">
                            Handpicked sustainable essentials for conscious living
                        </p>
                    </div>
                    <Link
                        to="/builder"
                        className="group inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                    >
                        View All Products
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative bg-stone-50 rounded-3xl overflow-hidden border border-stone-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300">
                                {/* Product Image */}
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={product.image || product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Link
                                            to="/builder"
                                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-stone-800 font-semibold rounded-xl hover:bg-amber-50 transition-colors shadow-lg"
                                        >
                                            <FaEye className="w-4 h-4" />
                                            View
                                        </Link>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-medium text-stone-600">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="text-stone-800 font-semibold mb-1 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                                        ₹{Number.isFinite(Number(product.price)) ? Number(product.price).toFixed(2) : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TerraVerdeCollections;
