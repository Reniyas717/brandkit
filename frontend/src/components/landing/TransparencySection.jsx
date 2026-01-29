import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaWater, FaRecycle, FaTruck, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TransparencySection = () => {
    const supplyChain = [
        {
            step: '01',
            title: 'Sourcing',
            location: 'Organic Farms',
            description: 'We partner directly with organic farms to ensure regenerative practices.',
            icon: FaLeaf,
            color: 'from-emerald-500 to-teal-500'
        },
        {
            step: '02',
            title: 'Production',
            location: 'Zero-Waste Facilities',
            description: 'Zero-waste manufacturing powered by 100% renewable energy.',
            icon: FaWater,
            color: 'from-teal-500 to-cyan-500'
        },
        {
            step: '03',
            title: 'Lifecycle',
            location: 'Circular Design',
            description: 'Designed for longevity and fully recyclable at end of life.',
            icon: FaRecycle,
            color: 'from-cyan-500 to-emerald-500'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm font-semibold text-emerald-400 mb-4">
                        TRANSPARENCY
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                        From <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Nature to You</span>
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        Every step of our process is designed to minimize footprint and maximize positive impact.
                    </p>
                </motion.div>

                {/* Supply Chain Steps */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {supplyChain.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 group"
                        >
                            <span className="absolute top-6 right-6 text-6xl font-black text-slate-700/30 group-hover:text-emerald-500/10 transition-colors">
                                {item.step}
                            </span>
                            
                            <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20`}>
                                <item.icon className="w-8 h-8 text-white" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-emerald-400 font-medium mb-3">{item.location}</p>
                            <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
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
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-emerald-400 font-semibold rounded-xl border border-slate-600/50 hover:border-emerald-500/50 transition-all"
                    >
                        Learn More About Our Process
                        <FaShieldAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TransparencySection;
