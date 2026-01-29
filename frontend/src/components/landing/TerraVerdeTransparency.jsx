import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLeaf, FaUsers, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TerraVerdeTransparency = () => {
    const supplyChain = [
        { step: '01', title: 'Organic Farms', location: 'India & Peru', description: 'Partnering with certified organic farms that use regenerative practices.', icon: FaLeaf, color: 'from-amber-400 to-orange-500' },
        { step: '02', title: 'Artisan Workshops', location: 'Fair Trade Certified', description: 'Skilled artisans craft each piece with fair wages and safe conditions.', icon: FaUsers, color: 'from-orange-400 to-red-400' },
        { step: '03', title: 'Eco Processing', location: 'Low-Impact Facilities', description: 'Natural dyes and water-saving techniques minimize environmental impact.', icon: FaShieldAlt, color: 'from-amber-500 to-yellow-500' },
        { step: '04', title: 'Carbon-Neutral Shipping', location: 'Global Delivery', description: 'Offsetting 100% of shipping emissions through verified programs.', icon: FaMapMarkerAlt, color: 'from-orange-500 to-amber-500' }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-amber-50/30 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 bg-amber-100 rounded-full text-xs font-semibold text-amber-700 mb-3">
                        Transparency
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-black text-stone-800 mb-4">
                        From Farm to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Your Closet</span>
                    </h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        Complete visibility into our ethical supply chain
                    </p>
                </motion.div>

                {/* Supply Chain Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {supplyChain.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative bg-white rounded-3xl p-6 border border-amber-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300"
                        >
                            <span className="absolute top-4 right-4 text-5xl font-black text-amber-100">
                                {item.step}
                            </span>
                            <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                                <item.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-stone-800 mb-1">{item.title}</h3>
                            <p className="text-sm text-amber-600 font-medium mb-3">{item.location}</p>
                            <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        to="/about"
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl border border-stone-200 transition-all"
                    >
                        Learn More About Our Process
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TerraVerdeTransparency;
