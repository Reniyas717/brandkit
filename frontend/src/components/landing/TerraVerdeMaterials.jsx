import React from 'react';
import { motion } from 'framer-motion';
import { GiCottonFlower, GiTreeBranch, GiRose, GiPlantSeed } from 'react-icons/gi';
import { FaHandsHelping, FaGlobeAmericas, FaSeedling } from 'react-icons/fa';

const TerraVerdeMaterials = () => {
    const materials = [
        {
            icon: GiCottonFlower,
            name: 'Organic Cotton',
            description: 'Hand-picked from sustainable farms, free from harmful chemicals',
            image: 'https://images.unsplash.com/photo-1445758816635-9187db3b4238?w=400&q=80',
            color: 'from-yellow-400 to-amber-500',
            benefits: ['Pesticide-free', 'Biodegradable', 'Soft texture']
        },
        {
            icon: GiTreeBranch,
            name: 'Bamboo Fiber',
            description: 'Rapidly renewable resource with natural antibacterial properties',
            image: 'https://images.unsplash.com/photo-1571239023704-21d2bfaf6b82?w=400&q=80',
            color: 'from-green-400 to-emerald-500',
            benefits: ['Fast growing', 'Antimicrobial', 'UV protection']
        },
        {
            icon: GiRose,
            name: 'Natural Dyes',
            description: 'Plant-based colors that connect you with nature\'s palette',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
            color: 'from-purple-400 to-pink-500',
            benefits: ['Non-toxic', 'Fade resistant', 'Eco-friendly']
        },
        {
            icon: GiPlantSeed,
            name: 'Hemp Canvas',
            description: 'Durable, versatile fiber that improves soil health',
            image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&q=80',
            color: 'from-teal-400 to-cyan-500',
            benefits: ['Carbon negative', 'Durable', 'Renewable']
        }
    ];

    const processes = [
        {
            icon: FaHandsHelping,
            title: 'Artisan Crafted',
            description: 'Every piece is lovingly handmade by skilled artisans using traditional techniques passed down through generations.',
            stat: '50+',
            statLabel: 'Partner Artisans'
        },
        {
            icon: FaGlobeAmericas,
            title: 'Global Impact',
            description: 'Supporting communities worldwide while preserving traditional craftsmanship and creating sustainable livelihoods.',
            stat: '15',
            statLabel: 'Countries'
        },
        {
            icon: FaSeedling,
            title: 'Earth Positive',
            description: 'Our materials actually give back to the earth, improving soil health and capturing carbon from the atmosphere.',
            stat: '100%',
            statLabel: 'Regenerative'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.3'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 2c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z' fill-rule='evenodd'/%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="container mx-auto px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                        Nature's Finest Materials
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-amber-800 to-orange-600 bg-clip-text text-transparent">
                        Grown, Not Made
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We believe the earth provides everything we need. Our materials are carefully selected from nature's garden,
                        processed with respect for both the environment and the artisans who craft them.
                    </p>
                </motion.div>

                {/* Materials Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
                >
                    {materials.map((material, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        >
                            {/* Material Image */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={material.image}
                                    alt={material.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${material.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                    <material.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-black text-gray-900 mb-3">{material.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{material.description}</p>
                                
                                {/* Benefits */}
                                <div className="space-y-2">
                                    {material.benefits.map((benefit, benefitIndex) => (
                                        <motion.div
                                            key={benefitIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: (index * 0.1) + (benefitIndex * 0.05) }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${material.color}`} />
                                            <span className="text-xs text-gray-500 font-medium">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Process Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-4xl font-black text-center text-gray-900 mb-12">
                        Our Sacred Process
                    </h3>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {processes.map((process, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="text-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                                >
                                    <process.icon className="w-10 h-10 text-white" />
                                </motion.div>
                                
                                <div className="mb-4">
                                    <div className="text-4xl font-black text-amber-600 mb-1">{process.stat}</div>
                                    <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">{process.statLabel}</div>
                                </div>
                                
                                <h4 className="text-2xl font-black text-gray-900 mb-4">{process.title}</h4>
                                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{process.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
                        
                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', bounce: 0.4 }}
                                className="inline-flex items-center gap-3 mb-6"
                            >
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <GiPlantSeed className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-4xl font-black text-white">Feel the Difference</h3>
                            </motion.div>
                            <p className="text-2xl text-white/90 leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
                                When you touch our products, you feel the love of the earth. 
                                <span className="text-yellow-200 font-black"> Every thread tells a story of sustainability.</span>
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                            >
                                <span>Discover Our Materials</span>
                                <FaSeedling className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TerraVerdeMaterials;