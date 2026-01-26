import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { FaArrowRight } from 'react-icons/fa';

const OurMaterialsSection = () => {
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
        <section className="py-20 bg-white">
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

                <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-12 lg:col-span-8 row-span-2 relative overflow-hidden rounded-2xl group cursor-pointer"
                    >
                        <img src={items[0].image} alt={items[0].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${items[0].color} mix-blend-multiply opacity-60`} />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{items[0].title}</h3>
                            <p className="text-white/90 text-sm md:text-base mb-4 max-w-md">{items[0].description}</p>
                            <Button className="w-fit bg-white text-black hover:bg-gray-100 text-sm h-9 px-4">
                                Explore <FaArrowRight className="ml-2 w-3 h-3" />
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 lg:col-span-4 row-span-1 relative overflow-hidden rounded-2xl group cursor-pointer"
                    >
                        <img src={items[1].image} alt={items[1].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${items[1].color} mix-blend-multiply opacity-60`} />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h3 className="text-2xl font-black text-white mb-1">{items[1].title}</h3>
                            <p className="text-white/90 text-xs">{items[1].description}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 lg:col-span-4 row-span-1 relative overflow-hidden rounded-2xl group cursor-pointer"
                    >
                        <img src={items[2].image} alt={items[2].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${items[2].color} mix-blend-multiply opacity-60`} />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h3 className="text-2xl font-black text-white mb-1">{items[2].title}</h3>
                            <p className="text-white/90 text-xs">{items[2].description}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="col-span-12 row-span-1 relative overflow-hidden rounded-2xl group cursor-pointer"
                    >
                        <img src={items[3].image} alt={items[3].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className={`absolute inset-0 bg-gradient-to-r ${items[3].color} mix-blend-multiply opacity-60`} />
                        <div className="absolute inset-0 px-8 flex items-center">
                            <div className="max-w-2xl">
                                <h3 className="text-3xl font-black text-white mb-2">{items[3].title}</h3>
                                <p className="text-white/90 text-lg">{items[3].description}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurMaterialsSection;
