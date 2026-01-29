import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaGlobeAmericas, FaHandHoldingHeart, FaQuoteLeft } from 'react-icons/fa';

const TerraVerdeBrandStory = () => {
    const values = [
        { icon: FaLeaf, title: 'Sustainable', description: 'Every product designed with the planet in mind', color: 'from-amber-400 to-orange-500' },
        { icon: FaHeart, title: 'Ethical', description: 'Fair wages and safe conditions for all workers', color: 'from-orange-400 to-red-400' },
        { icon: FaGlobeAmericas, title: 'Transparent', description: 'Full supply chain visibility from farm to closet', color: 'from-amber-500 to-yellow-500' },
        { icon: FaHandHoldingHeart, title: 'Community', description: 'Supporting artisan communities worldwide', color: 'from-orange-500 to-amber-500' }
    ];

    return (
        <section id="story" className="py-24 bg-gradient-to-b from-amber-50/50 to-[#FFFBF5] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/10">
                            <img
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop"
                                alt="Sustainable craftsmanship"
                                className="w-full h-[450px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                        </div>
                        
                        {/* Floating Quote Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-amber-100 max-w-xs"
                        >
                            <FaQuoteLeft className="w-8 h-8 text-amber-400 mb-3" />
                            <p className="text-stone-600 text-sm italic leading-relaxed">
                                "Fashion should never cost the earth. We create beauty that empowers communities."
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <img src="https://i.pravatar.cc/40?img=32" className="w-10 h-10 rounded-full" alt="Founder" />
                                <div>
                                    <p className="font-bold text-stone-800 text-sm">James Rodriguez</p>
                                    <p className="text-xs text-stone-500">Founder</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Stat */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-4 -left-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 shadow-xl text-white"
                        >
                            <p className="text-3xl font-black">8+</p>
                            <p className="text-xs opacity-90">Years of Impact</p>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full text-xs font-semibold text-amber-700 mb-4">
                                Our Story
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-black text-stone-800 mb-4">
                                Fashion That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Gives Back</span>
                            </h2>
                            <p className="text-stone-600 leading-relaxed">
                                Born from a simple belief that style shouldn't cost the earth. Terra Verde 
                                partners with artisan communities across the globe to create beautiful, 
                                sustainable fashion that empowers makers and respects our planet.
                            </p>
                        </div>

                        {/* Values Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-amber-100 hover:border-amber-200 hover:shadow-lg transition-all"
                                >
                                    <div className={`w-10 h-10 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                        <value.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-stone-800 font-bold text-sm">{value.title}</h4>
                                        <p className="text-stone-500 text-xs leading-relaxed">{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TerraVerdeBrandStory;
