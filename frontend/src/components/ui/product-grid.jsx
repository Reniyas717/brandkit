import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { Button } from './button';
import { Card, CardContent } from './card';

// Premium 3D Product Card - E-commerce Style
export const ProductCard3D = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            className="group relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
        >
            <motion.div
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    z: isHovered ? 50 : 0,
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
            >
                <Card className="overflow-hidden border-2 border-gray-200 hover:border-[#0EA5E9] transition-colors duration-300 bg-white shadow-lg hover:shadow-2xl">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Gradient Overlay on Hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                            animate={{
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Quick Actions */}
                        <motion.div
                            className="absolute top-4 right-4 flex flex-col gap-2"
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : 20,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0EA5E9] hover:text-white transition-colors">
                                <FaHeart className="w-4 h-4" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0EA5E9] hover:text-white transition-colors">
                                <FaEye className="w-4 h-4" />
                            </button>
                        </motion.div>

                        {/* Rating Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-1">
                            <FaStar className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-sm font-bold text-gray-900">4.9</span>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.div
                            className="absolute bottom-4 left-4 right-4"
                            animate={{
                                y: isHovered ? 0 : 100,
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <Button className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white shadow-xl">
                                <FaShoppingCart className="mr-2" />
                                Add to Cart
                            </Button>
                        </motion.div>
                    </div>

                    {/* Product Info */}
                    <CardContent className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <div className="text-2xl font-black text-[#0EA5E9]">
                                    ${product.price}
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">
                                    Free Shipping
                                </div>
                            </div>
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.1 : 1,
                                }}
                                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold"
                            >
                                IN STOCK
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

// Premium Product Grid
export const ProductGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <ProductCard3D product={product} />
                </motion.div>
            ))}
        </div>
    );
};
