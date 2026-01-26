import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHeart, FaGlobeAmericas, FaUsers, FaAward, FaRecycle } from 'react-icons/fa';

const BrandStorySection = () => {
    const values = [
        {
            icon: FaLeaf,
            title: 'Sustainability First',
            description: 'Every product is carefully selected for minimal environmental impact and maximum positive change.',
            color: 'from-emerald-500 to-green-600'
        },
        {
            icon: FaHeart,
            title: 'Ethical Production',
            description: 'We partner only with brands that treat their workers fairly and maintain transparent supply chains.',
            color: 'from-pink-500 to-rose-600'
        },
        {
            icon: FaGlobeAmericas,
            title: 'Global Impact',
            description: 'Our mission extends beyond products—we actively support environmental initiatives worldwide.',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: FaUsers,
            title: 'Community Driven',
            description: 'Built by eco-conscious individuals, for eco-conscious individuals. Together we make a difference.',
            color: 'from-purple-500 to-indigo-600'
        }
    ];

    const stats = [
        { value: '50K+', label: 'Happy Customers', icon: FaUsers },
        { value: '1M+', label: 'Plastic Bottles Saved', icon: FaRecycle },
        { value: '500+', label: 'Eco Products', icon: FaLeaf },
        { value: '100%', label: 'Carbon Neutral', icon: FaGlobeAmericas }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-white via-emerald-50/30 to-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
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
                    <span className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                        Our Story
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                        Building a Sustainable Future
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We believe that small changes in our daily choices can create massive positive impact on our planet.
                        That's why we've curated the finest eco-friendly products to make sustainable living effortless and accessible.
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
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                                alt="Founder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-emerald-500 to-green-600 text-white p-8 rounded-2xl shadow-xl max-w-xs">
                            <div className="text-4xl font-black mb-2">2019</div>
                            <div className="text-sm opacity-90">Founded with a mission to make sustainability mainstream</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl font-black text-gray-900 mb-6">
                            From Passion to Purpose
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                It started with a simple realization: the products we use every day have a profound impact on our planet.
                                As a marine biologist witnessing firsthand the devastating effects of plastic pollution, I knew something had to change.
                            </p>
                            <p>
                                EcoLux Essentials was born from the belief that sustainability shouldn't be a luxury—it should be the standard.
                                We've spent years building relationships with ethical manufacturers, testing products, and creating a platform
                                that makes it easy for everyone to make eco-conscious choices.
                            </p>
                            <p className="font-bold text-emerald-700">
                                "Every purchase is a vote for the kind of world we want to live in."
                            </p>
                            <div className="pt-4">
                                <div className="font-bold text-gray-900">Sarah Chen</div>
                                <div className="text-sm text-gray-500">Founder & CEO</div>
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
                        Our Core Values
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
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="text-xl font-black text-gray-900 mb-3">{value.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Impact Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 rounded-3xl p-12 shadow-2xl"
                >
                    <h3 className="text-4xl font-black text-white text-center mb-4">
                        Our Impact Together
                    </h3>
                    <p className="text-emerald-100 text-center mb-12 max-w-2xl mx-auto">
                        Every kit makes a difference. Here's what we've achieved together as a community.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: 'spring' }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-emerald-100 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <FaAward className="w-8 h-8 text-emerald-600" />
                        <h3 className="text-3xl font-black text-gray-900">Our Mission</h3>
                    </div>
                    <p className="text-2xl text-gray-700 leading-relaxed font-medium">
                        To empower <span className="text-emerald-600 font-black">1 million people</span> to adopt sustainable lifestyles
                        by 2030, making eco-friendly choices the easiest and most rewarding option for everyone.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default BrandStorySection;
