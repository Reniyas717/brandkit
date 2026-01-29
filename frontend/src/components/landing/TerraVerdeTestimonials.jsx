import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
    {
        name: 'Maria Santos',
        role: 'Yoga Instructor',
        location: 'California',
        text: 'Terra Verde has completely transformed how I think about fashion. The quality is unmatched, and knowing my clothes are ethically made brings me peace.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        rating: 5
    },
    {
        name: 'James Thompson',
        role: 'Environmental Activist',
        location: 'London',
        text: 'Finally, a brand that walks the talk. The transparency in their supply chain is refreshing, and the products are genuinely beautiful.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 5
    },
    {
        name: 'Aisha Patel',
        role: 'Sustainable Living Blogger',
        location: 'Mumbai',
        text: 'The artisan craftsmanship is phenomenal. You can feel the love and care in every stitch. My hemp bags have lasted years.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 5
    }
];

const TerraVerdeTestimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-20 bg-gradient-to-b from-[#FFFBF5] to-amber-50/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-3 py-1 bg-amber-100 rounded-full text-xs font-semibold text-amber-700 mb-3">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-stone-800">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Customers Say</span>
                    </h2>
                </motion.div>

                {/* Testimonial Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-amber-900/5 border border-amber-100"
                >
                    <FaQuoteLeft className="absolute top-6 left-6 w-12 h-12 text-amber-200" />
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center relative z-10"
                        >
                            <img
                                src={testimonials[activeIndex].image}
                                alt={testimonials[activeIndex].name}
                                className="w-20 h-20 rounded-full border-4 border-amber-100 object-cover mx-auto mb-6 shadow-lg"
                            />
                            <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto">
                                "{testimonials[activeIndex].text}"
                            </p>
                            <div className="flex items-center justify-center gap-1 mb-4">
                                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                    <FaStar key={i} className="w-5 h-5 text-amber-400" />
                                ))}
                            </div>
                            <p className="font-bold text-stone-800">{testimonials[activeIndex].name}</p>
                            <p className="text-sm text-stone-500">
                                {testimonials[activeIndex].role} • {testimonials[activeIndex].location}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-center gap-3 mt-8">
                        <button
                            onClick={prevTestimonial}
                            className="p-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        idx === activeIndex ? 'w-6 bg-amber-500' : 'bg-amber-200'
                                    }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={nextTestimonial}
                            className="p-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TerraVerdeTestimonials;
