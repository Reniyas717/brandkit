import React from 'react';
import { AnimatedTestimonials } from "../ui/animated-testimonials";

const TestimonialsSection = () => {
    const testimonials = [
        {
            quote: "Switching to EcoLux has been life-changing. The quality is outstanding and I love knowing every purchase helps the planet. My monthly kit is perfectly curated!",
            name: "Emma Rodriguez",
            designation: "Sustainability Advocate",
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        },
        {
            quote: "The subscription model makes sustainable living so easy. No more hunting for eco-friendly products - everything I need arrives on schedule. Highly recommend!",
            name: "Michael Chen",
            designation: "Environmental Consultant",
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        },
        {
            quote: "I've tried many eco brands, but EcoLux stands out. The impact dashboard showing my environmental contribution is incredibly motivating. Love this platform!",
            name: "Sarah Thompson",
            designation: "Eco-Conscious Parent",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
        },
        {
            quote: "The product quality exceeded my expectations. Everything is beautifully packaged, plastic-free, and actually works better than conventional alternatives.",
            name: "David Kim",
            designation: "Zero-Waste Blogger",
            src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        },
        {
            quote: "Building my custom kit was fun and easy. The AI recommendations were spot-on! I've saved so much plastic and my carbon footprint has dropped significantly.",
            name: "Lisa Martinez",
            designation: "Green Living Enthusiast",
            src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        },
    ];

    return (
        <section className="py-20 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto mb-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500 mb-4">
                        What Our Community Says
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Real stories from real eco-warriors
                    </p>
                </div>
                <div className="h-[40vh] flex items-center justify-center">
                    <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
