import React, { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { FaArrowLeft, FaArrowRight, FaStar, FaShoppingCart } from 'react-icons/fa';
import { Button } from './button';
import { Card, CardContent } from './card';

// 3D Tilt Card Component
export const Card3DTilt = ({ children, className = '' }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12.5deg', '-12.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12.5deg', '12.5deg']);

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
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: 'preserve-3d',
            }}
            className={className}
        >
            <div style={{ transform: 'translateZ(75px)', transformStyle: 'preserve-3d' }}>
                {children}
            </div>
        </motion.div>
    );
};

// 3D Circular Carousel
export const Carousel3D = ({ items, onItemClick }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
            setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        }
    }, [emblaApi, items.length]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
            setActiveIndex((prev) => (prev + 1) % items.length);
        }
    }, [emblaApi, items.length]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {items.map((item, index) => {
                        const offset = index - activeIndex;
                        const absOffset = Math.abs(offset);
                        const scale = 1 - absOffset * 0.2;
                        const opacity = 1 - absOffset * 0.3;
                        const zIndex = items.length - absOffset;
                        const rotateY = offset * 15;

                        return (
                            <div
                                key={index}
                                className="flex-[0_0_33.333%] min-w-0 px-4"
                                style={{ perspective: '1000px' }}
                            >
                                <motion.div
                                    animate={{
                                        scale,
                                        opacity,
                                        rotateY,
                                        z: -absOffset * 100,
                                    }}
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        zIndex,
                                        transformStyle: 'preserve-3d',
                                    }}
                                    onClick={() => onItemClick && onItemClick(item, index)}
                                >
                                    {item}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-12">
                <Button
                    onClick={scrollPrev}
                    size="icon"
                    variant="outline"
                    className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <FaArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                    onClick={scrollNext}
                    size="icon"
                    variant="outline"
                    className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <FaArrowRight className="w-5 h-5" />
                </Button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            emblaApi?.scrollTo(index);
                            setActiveIndex(index);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-[#0EA5E9]' : 'w-2 bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

// Premium Product Card with 3D Effect
export const ProductCard3D = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card3DTilt className="w-full h-full">
            <Card
                className="overflow-hidden cursor-pointer h-full border-2 hover:border-[#0EA5E9] transition-all duration-300 shadow-xl hover:shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        animate={{
                            scale: isHovered ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                        animate={{
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Floating Badge */}
                    <motion.div
                        className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full"
                        animate={{
                            y: isHovered ? 0 : -10,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        ✓ ECO-FRIENDLY
                    </motion.div>

                    {/* Quick Add Button */}
                    <motion.div
                        className="absolute bottom-4 left-4 right-4"
                        animate={{
                            y: isHovered ? 0 : 100,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{ transform: 'translateZ(50px)' }}
                    >
                        <Button className="w-full bg-white text-black hover:bg-gray-100 shadow-lg">
                            <FaShoppingCart className="mr-2" />
                            Quick Add
                        </Button>
                    </motion.div>
                </div>

                {/* Content Section */}
                <CardContent className="p-6" style={{ transform: 'translateZ(25px)' }}>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0 ml-2">
                            <FaStar className="w-4 h-4 fill-current" />
                            <span className="text-sm font-bold text-gray-900">4.9</span>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                            <div className="text-3xl font-black text-[#0EA5E9]">
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
                            className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold"
                        >
                            IN STOCK
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </Card3DTilt>
    );
};
