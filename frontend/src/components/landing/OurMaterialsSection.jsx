import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const OurMaterialsSection = () => {
    const materials = [
        {
            title: 'Organic Cotton',
            description: 'Premium organic cotton sourced from certified sustainable farms. Soft, breathable, and kind to your skin.',
            staticImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
            hoverGif: 'https://media.giphy.com/media/xT9IgN8YKRhByRBzMI/giphy.gif', // Cotton plant growing
        },
        {
            title: 'Hemp Fiber',
            description: 'Durable and sustainable hemp fiber that gets softer with every wash. Naturally resistant to mold and UV light.',
            staticImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
            hoverGif: 'https://media.giphy.com/media/3o6ZsYq8L7C8Zqzw7S/giphy.gif', // Plant growing timelapse
        },
        {
            title: 'Bamboo',
            description: 'Fast-growing renewable resource that requires no pesticides. Incredibly soft and naturally antibacterial.',
            staticImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
            hoverGif: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif', // Bamboo swaying
        },
        {
            title: 'Recycled Materials',
            description: 'Giving new life to waste materials through innovative recycling processes. Reducing landfill and ocean pollution.',
            staticImage: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80',
            hoverGif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmVjeWNsaW5nYm90dGxlcw/3oEjI6SIIHBdRxXI40/giphy.gif', // Recycling symbol
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-3 text-gray-900">Our Materials</h2>
                    <p className="text-lg text-gray-600">Sourced responsibly, crafted beautifully</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {materials.map((material, idx) => (
                        <motion.div
                            key={material.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="max-w-xs w-full mx-auto"
                        >
                            <div
                                className={cn(
                                    "group w-full cursor-pointer overflow-hidden relative h-96 rounded-2xl shadow-xl flex flex-col justify-end p-6 border border-gray-100",
                                    "bg-cover bg-center",
                                    "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                                    "transition-all duration-500"
                                )}
                                style={{
                                    backgroundImage: `url(${material.staticImage})`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundImage = `url(${material.hoverGif})`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundImage = `url(${material.staticImage})`;
                                }}
                            >
                                {/* Gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Content */}
                                <div className="relative z-50">
                                    <h3 className="font-bold text-2xl md:text-3xl text-white mb-3">
                                        {material.title}
                                    </h3>
                                    <p className="font-normal text-sm text-white/90 leading-relaxed">
                                        {material.description}
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

export default OurMaterialsSection;
