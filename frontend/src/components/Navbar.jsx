import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when scrolling up, hide when scrolling down
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                            <FaLeaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-black text-gray-900">EcoLux</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#materials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            Materials
                        </a>
                        <a href="#products" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            Products
                        </a>
                        <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            About
                        </a>
                        <Link
                            to="/builder"
                            className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Build Your Kit
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
