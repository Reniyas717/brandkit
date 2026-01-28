import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaMountain, FaUsers, FaAward, FaSeedling } from 'react-icons/fa';
import { RiEarthFill } from 'react-icons/ri';

const TerraVerdeBrandStory = () => {
    const values = [
        {
            icon: FaSeedling,
            title: 'Organic Heritage',
            description: 'Rooted in generations of traditional farming wisdom, bringing authentic organic practices to modern life.',
            color: 'from-amber-500 to-orange-600'
        },
        {
            icon: FaHeart,
            title: 'Artisan Crafted',
            description: 'Each product is lovingly handmade by skilled artisans who pour their passion into every detail.',
            color: 'from-rose-500 to-pink-600'
        },
        {
            icon: FaMountain,
            title: 'Earth Connected',
            description: 'Sourced from pristine natural landscapes, maintaining the purest connection to Mother Earth.',
            color: 'from-stone-500 to-slate-600'
        },
        {
            icon: FaUsers,
            title: 'Community First',
            description: 'Supporting local farming communities and preserving traditional knowledge for future generations.',
            color: 'from-emerald-500 to-teal-600'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/40 relative overflow-hidden">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(234, 88, 12, 0.1) 0%, transparent 50%),
                        linear-gradient(45deg, transparent 30%, rgba(217, 119, 6, 0.05) 50%, transparent 70%)
                    `
                }} />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <div className="absolute top-32 right-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-6 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                        Our Heritage
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-amber-800 to-orange-600 bg-clip-text text-transparent">
                        Rooted in Nature's Wisdom
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        For three generations, we've been guardians of ancient earth wisdom, crafting products that honor 
                        both tradition and the planet's natural rhythms.
                    </p>
                </motion.div>

                {/* Founder Story */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-12 items-center mb-24"
                >
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                                alt="Terra Verde Founder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 rounded-2xl shadow-xl max-w-xs">
                            <div className="text-4xl font-black mb-2">1952</div>
                            <div className="text-sm opacity-90">Three generations of earth stewardship</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-black text-gray-900 mb-6">
                            From Ancient Soil to Modern Soul
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Our story began in the volcanic soils of Guatemala, where my grandfather taught me that the earth 
                                holds secrets older than memory. He showed me how to read the language of plants, the rhythm of seasons, 
                                and the sacred relationship between humanity and nature.
                            </p>
                            <p>
                                Terra Verde was born from this ancient wisdom, combined with a modern mission to share these 
                                time-honored practices with the world. Every product we create carries the essence of this connection—
                                pure, authentic, and deeply rooted in respect for our planet.
                            </p>
                            <p className="font-bold text-amber-700">
                                "The earth provides everything we need, if we listen with humble hearts."
                            </p>
                            <div className="pt-4">
                                <div className="font-bold text-gray-900">Miguel Herrera</div>
                                <div className="text-sm text-gray-500">Founder & Chief Earth Keeper</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Core Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h3 className="text-4xl font-black text-center text-gray-900 mb-12">
                        Our Sacred Values
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-3">{value.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
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
                    <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                        
                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', bounce: 0.4 }}
                                className="inline-flex items-center gap-3 mb-6"
                            >
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <RiEarthFill className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-4xl font-black text-white">Honor the Earth</h3>
                            </motion.div>
                            <p className="text-2xl text-white/90 leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
                                Experience the wisdom of generations—where ancient traditions meet modern consciousness. 
                                <span className="text-yellow-300 font-black">Ready to reconnect with nature?</span>
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                            >
                                <span>Discover Natural Wisdom</span>
                                <FaMountain className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TerraVerdeBrandStory;