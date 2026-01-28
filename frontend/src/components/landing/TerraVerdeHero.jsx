import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaMountain, FaWater, FaArrowRight } from 'react-icons/fa';
import { GiEarthAmerica, GiTreeBranch, GiRose } from 'react-icons/gi';

const TerraVerdeHero = ({ brand }) => {
    const floatingElements = [
        { Icon: FaSeedling, delay: 0, position: 'top-20 left-10' },
        { Icon: FaLeaf, delay: 0.5, position: 'top-40 right-20' },
        { Icon: GiRose, delay: 1, position: 'bottom-40 left-20' },
        { Icon: GiTreeBranch, delay: 1.5, position: 'bottom-20 right-10' },
    ];

    return (
        <section className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden flex items-center">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(217, 119, 6, 0.1) 0%, transparent 50%),
                        linear-gradient(45deg, transparent 40%, rgba(251, 191, 36, 0.08) 50%, transparent 60%)
                    `
                }} />
                {/* Earth texture overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            {/* Floating Elements */}
            {floatingElements.map(({ Icon, delay, position }, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: [0.4, 0.7, 0.4], 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                        duration: 4, 
                        delay: delay, 
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className={`absolute ${position} w-8 h-8 text-amber-600`}
                >
                    <Icon className="w-full h-full" />
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-lg"
                    >
                        <GiEarthAmerica className="w-5 h-5" />
                        Rooted in Nature
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-6xl lg:text-7xl font-black mb-6"
                    >
                        <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                            EARTH
                        </span>
                        <span className="block text-gray-900">
                            CONSCIOUS
                        </span>
                        <span className="block bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent italic">
                            Living
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed max-w-2xl"
                    >
                        Connect with nature through artisan-crafted products that honor the earth. 
                        <span className="font-bold text-amber-700"> Every choice nurtures both you and our planet.</span>
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="grid grid-cols-3 gap-6 mb-10"
                    >
                        {[
                            { number: '100%', label: 'Natural Materials' },
                            { number: '50+', label: 'Artisan Partners' },
                            { number: '0', label: 'Chemical Additives' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl lg:text-4xl font-black text-amber-600 mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <span>Explore Natural Collection</span>
                            <FaArrowRight className="w-5 h-5" />
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="border-2 border-amber-600 text-amber-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <FaMountain className="w-5 h-5" />
                            <span>Our Earth Story</span>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Right Content - Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative"
                >
                    {/* Main Product Image */}
                    <div className="relative">
                        <motion.div
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 1, -1, 0]
                            }}
                            transition={{ 
                                duration: 6, 
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="relative z-10"
                        >
                            <div className="aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                                    alt="Natural Terra Verde Products"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Orbiting Elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            {[
                                { Icon: FaWater, angle: 0, color: 'text-blue-500' },
                                { Icon: FaLeaf, angle: 90, color: 'text-green-500' },
                                { Icon: FaMountain, angle: 180, color: 'text-gray-600' },
                                { Icon: FaSeedling, angle: 270, color: 'text-amber-500' }
                            ].map(({ Icon, angle, color }, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute w-16 h-16 flex items-center justify-center"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transformOrigin: '0 0',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-200px) rotate(-${angle}deg)`
                                    }}
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className={`w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg ${color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Background Decorative Circle */}
                        <div className="absolute inset-0 -z-10">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200/30 via-orange-200/20 to-yellow-200/30 blur-3xl transform scale-110" />
                        </div>
                    </div>

                    {/* Additional Product Cards */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-amber-100"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&q=80"
                                    alt="Handcrafted Soap"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-sm text-gray-800">Handcrafted Soaps</div>
                                <div className="text-xs text-amber-600">Made with love</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7 }}
                        className="absolute -top-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-orange-100"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&q=80"
                                    alt="Natural Oils"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-sm text-gray-800">Essential Oils</div>
                                <div className="text-xs text-orange-600">Pure & organic</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1200,60 L1200,120 L0,120 Z" 
                          className="fill-white"></path>
                </svg>
            </div>
        </section>
    );
};

export default TerraVerdeHero;