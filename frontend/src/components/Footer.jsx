import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
    const footerLinks = {
        product: [
            { label: 'Features', href: '/features' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Kit Builder', href: '/builder' },
        ],
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'Our Mission', href: '/mission' },
            { label: 'Impact Report', href: '/impact' },
            { label: 'Careers', href: '/careers' },
        ],
        resources: [
            { label: 'Blog', href: '/blog' },
            { label: 'Help Center', href: '/help' },
            { label: 'Brand Partners', href: '/partners' },
            { label: 'Sustainability', href: '/sustainability' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
        ],
    };

    return (
        <footer className="bg-neutral-900 text-white">
            {/* Newsletter Section */}
            <div className="border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div className="max-w-md">
                            <h3 className="text-2xl font-bold mb-2">Stay in the loop</h3>
                            <p className="text-neutral-400">
                                Get updates on new brands, sustainability tips, and exclusive offers.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-80">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                />
                            </div>
                            <button className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Logo and description */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                <FaLeaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">
                                Brand<span className="text-emerald-400">Kit</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 text-sm mb-6 max-w-xs leading-relaxed">
                            Curate your sustainable lifestyle with verified ethical brands. 
                            Every purchase makes a positive impact on our planet.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {[
                                { Icon: FaTwitter, href: '#', label: 'Twitter' },
                                { Icon: FaInstagram, href: '#', label: 'Instagram' },
                                { Icon: FaFacebook, href: '#', label: 'Facebook' },
                                { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.href}
                                            className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                                        >
                                            {link.label}
                                            <FiArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-neutral-500">
                            © {new Date().getFullYear()} BrandKit. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Carbon Neutral
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>B Corp Certified</span>
                            <span className="hidden sm:inline">•</span>
                            <span>1% for the Planet</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
