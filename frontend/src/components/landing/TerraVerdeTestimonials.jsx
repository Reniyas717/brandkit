import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { GiRose, GiTreeBranch, GiEarthAmerica } from 'react-icons/gi';

const TerraVerdeTestimonials = () => {
    const testimonials = [
        {
            name: 'Maria Santos',
            role: 'Yoga Instructor & Wellness Coach',
            location: 'California, USA',
            rating: 5,
            text: 'Terra Verde products have transformed my daily routine. The natural cotton feels like a gentle hug from Mother Earth. My skin has never been happier, and I love knowing that every purchase supports sustainable farming communities.',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&q=80',
            icon: GiRose,
            bgColor: 'from-pink-100 to-rose-100',
            accentColor: 'text-pink-600'
        },
        {
            name: 'James Thompson',
            role: 'Environmental Activist',
            location: 'London, UK',
            rating: 5,
            text: 'Finally, a brand that walks the talk! The bamboo fiber products are incredibly durable and the natural dyes create the most beautiful, earthy colors. It\'s amazing how soft and comfortable sustainable materials can be.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
            icon: GiTreeBranch,
            bgColor: 'from-green-100 to-emerald-100',
            accentColor: 'text-green-600'
        },
        {
            name: 'Aisha Patel',
            role: 'Sustainable Living Blogger',
            location: 'Mumbai, India',
            rating: 5,
            text: 'The artisan craftsmanship is phenomenal! You can feel the love and care in every stitch. My hemp canvas bags have lasted years and still look brand new. This is what ethical fashion should be.',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
            icon: GiEarthAmerica,
            bgColor: 'from-amber-100 to-yellow-100',
            accentColor: 'text-amber-600'
        },
        {
            name: 'Carlos Rodriguez',
            role: 'Organic Farmer',
            location: 'Costa Rica',
            rating: 5,
            text: 'As someone who works with the earth every day, I appreciate products made with respect for nature. Terra Verde supports farmers like me while creating beautiful products that honor our planet\'s gifts.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
            icon: GiRose,
            bgColor: 'from-teal-100 to-cyan-100',
            accentColor: 'text-teal-600'
        }
    ];

    const stats = [
        { number: '98%', label: 'Customer Satisfaction', icon: FaHeart },
        { number: '15K+', label: 'Happy Earth Lovers', icon: GiEarthAmerica },
        { number: '4.9', label: 'Average Rating', icon: FaStar },
        { number: '100%', label: 'Natural Materials', icon: GiRose }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-3 h-3 bg-amber-400 rounded-full animate-bounce" />
            <div className="absolute top-40 right-20 w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-40 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                        Voices from Our Community
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-amber-800 to-orange-600 bg-clip-text text-transparent">
                        Stories of Earth Love
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of earth-conscious individuals who have made the switch to natural, sustainable living.
                        Their stories inspire us to keep growing our positive impact on the planet.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-8 mb-16"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`bg-gradient-to-br ${testimonial.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                        >
                            {/* Background Icon */}
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                <testimonial.icon className="w-20 h-20" />
                            </div>

                            {/* Quote Icon */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className={`w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg ${testimonial.accentColor}`}>
                                    <FaQuoteLeft className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Text */}
                            <blockquote className="text-gray-800 leading-relaxed mb-6 text-lg italic font-medium">
                                "{testimonial.text}"
                            </blockquote>

                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-white/50">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="font-black text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600 font-medium">{testimonial.role}</div>
                                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-amber-500 via-orange-600 to-yellow-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-black text-white mb-4">Community Impact</h3>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                Together, we're creating a movement of conscious consumers who choose earth-friendly alternatives.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        delay: index * 0.1,
                                        type: 'spring',
                                        bounce: 0.4
                                    }}
                                    className="text-center group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:bg-white/30 transition-all duration-300"
                                    >
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.number}</div>
                                    <div className="text-white/90 font-bold text-sm uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <h3 className="text-3xl font-black text-gray-900 mb-6">Ready to Join Our Earth-Loving Community?</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Experience the difference of products made with love for you and the planet. 
                        Your journey to sustainable living starts with a single choice.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-3"
                    >
                        <span>Start Your Natural Journey</span>
                        <GiRose className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default TerraVerdeTestimonials;