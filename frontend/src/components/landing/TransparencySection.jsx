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

                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { icon: FaSeedling, title: "Sourcing", desc: "We partner directly with organic farms to ensure regenerative practices.", step: "01" },
                        { icon: FaWater, title: "Production", desc: "Zero-waste manufacturing powered by 100% renewable energy.", step: "02" },
                        { icon: FaRecycle, title: "Lifecycle", desc: "Designed for longevity and fully recyclable at end of life.", step: "03" }
                    ].map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -top-10 -left-10 text-[120px] font-black text-emerald-900/5 select-none transition-transform group-hover:scale-110 duration-500">
                                {item.step}
                            </div>
                            <div className="relative bg-white p-10 rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                                    <item.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
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
