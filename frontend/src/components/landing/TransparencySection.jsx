import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaWater, FaRecycle } from 'react-icons/fa';

const TransparencySection = () => {
    return (
        <section className="relative py-24 overflow-hidden bg-white">
            <div className="absolute inset-0 bg-emerald-50/50 -skew-y-3 transform origin-top-left scale-110" />
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Transparency</span>
                    <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6">From Nature to You</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Every step of our process is designed to minimize footprint and maximize positive impact.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: FaSeedling, title: "Sourcing", desc: "We partner directly with organic farms to ensure regenerative practices.", step: "01" },
                        { icon: FaWater, title: "Production", desc: "Zero-waste manufacturing powered by 100% renewable energy.", step: "02" },
                        { icon: FaRecycle, title: "Lifecycle", desc: "Designed for longevity and fully recyclable at end of life.", step: "03" }
                    ].map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -top-6 -left-6 text-[80px] font-black text-emerald-900/5 select-none transition-transform group-hover:scale-110 duration-500">
                                {item.step}
                            </div>
                            <div className="relative bg-white p-8 rounded-[1.5rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                                    <item.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TransparencySection;
