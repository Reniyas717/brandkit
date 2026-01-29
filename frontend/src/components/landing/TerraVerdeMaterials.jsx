import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaRecycle, FaWater, FaHandsHelping, FaGlobeAmericas } from 'react-icons/fa';
import { GiPlantSeed } from 'react-icons/gi';

const TerraVerdeMaterials = () => {
    const materials = [
        {
            name: 'Organic Cotton',
            icon: FaSeedling,
            image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop',
            desc: 'Soft, breathable, and grown without harmful chemicals.',
            color: 'from-amber-400 to-orange-500'
        },
        {
            name: 'Bamboo Fiber',
            icon: FaLeaf,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            desc: 'Naturally antibacterial and highly renewable.',
            color: 'from-orange-400 to-amber-500'
        },
        {
            name: 'Recycled Materials',
            icon: FaRecycle,
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
            desc: 'Made from post-consumer recycled materials.',
            color: 'from-amber-500 to-yellow-500'
        },
        {
            name: 'Hemp',
            icon: FaWater,
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
            desc: 'Durable, low-water, and naturally pest-resistant.',
            color: 'from-orange-500 to-red-400'
        }
    ];

    const stats = [
        { icon: FaHandsHelping, stat: '50+', label: 'Partner Artisans', desc: 'Skilled craftspeople worldwide' },
        { icon: FaGlobeAmericas, stat: '15', label: 'Countries', desc: 'Global sustainable sourcing' },
        { icon: FaSeedling, stat: '100%', label: 'Regenerative', desc: 'Earth-positive materials' }
    ];

    return (
        <section id="materials" className="py-24 bg-gradient-to-b from-[#FFFBF5] to-amber-50/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl translate-y-1/2" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full text-sm font-semibold text-amber-700 mb-4">
                        <GiPlantSeed className="w-4 h-4" />
                        Nature's Finest Materials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-stone-800 mb-4">
                        Grown, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Not Made</span>
                    </h2>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                        We believe the earth provides everything we need. Our materials are carefully selected 
                        from nature's garden, processed with respect for both the environment and the artisans.
                    </p>
                </motion.div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {materials.map((mat, idx) => (
                        <motion.div
                            key={mat.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-amber-900/5 border border-amber-100 hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={mat.image}
                                    alt={mat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                                <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${mat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                    <mat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-800 mb-2">{mat.name}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed">{mat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-amber-900/5 border border-amber-100"
                >
                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="text-center group"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-8 h-8 text-amber-600" />
                                </div>
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-1">
                                    {item.stat}
                                </div>
                                <div className="text-sm font-bold text-stone-800 uppercase tracking-wider mb-1">
                                    {item.label}
                                </div>
                                <p className="text-sm text-stone-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TerraVerdeMaterials;