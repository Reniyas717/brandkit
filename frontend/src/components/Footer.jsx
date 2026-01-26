import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                                <FaLeaf className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-black">EcoLux Essentials</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-md mb-4">
                            Sustainable products for a better tomorrow. Every purchase makes a difference.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaTwitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaFacebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaLinkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-base mb-3">Quick Links</h3>
                        <ul className="space-y-1.5">
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Our Materials</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Products</a></li>
                            <li><Link to="/builder" className="text-gray-400 text-sm hover:text-white transition-colors">Build Kit</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-base mb-3">Support</h3>
                        <ul className="space-y-1.5">
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Shipping</a></li>
                            <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Returns</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-6 pt-5 text-center text-gray-400 text-sm">
                    <p>&copy; 2026 EcoLux Essentials. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
