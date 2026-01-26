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
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
                }`}
        >
            <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full shadow-lg shadow-black/5 px-6 py-3 flex items-center gap-8">
                {/* Logo - Minimal */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                        <FaLeaf className="w-4 h-4 text-white" />
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="#materials" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
                        Materials
                    </a>
                    <a href="#products" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
                        Products
                    </a>
                    <a href="#about" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
                        About
                    </a>
                </div>

                {/* CTA */}
                <Link
                    to="/builder"
                    className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-full font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                >
                    Build Kit
                </Link>

                {/* Mobile Menu Button - Visible only on mobile */}
                <button className="md:hidden text-gray-600 hover:text-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
