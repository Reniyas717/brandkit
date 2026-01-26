import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center">
                                <FaLeaf className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-base font-black">EcoLux Essentials</span>
                        </div>
                        <p className="text-gray-400 text-xs max-w-md mb-2">
                            Sustainable products for a better tomorrow.
                        </p>
                        <div className="flex gap-2">
                            <a href="#" className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaTwitter className="w-3 h-3" />
                            </a>
                            <a href="#" className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaInstagram className="w-3 h-3" />
                            </a>
                            <a href="#" className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaFacebook className="w-3 h-3" />
                            </a>
                            <a href="#" className="w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-colors">
                                <FaLinkedin className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-sm mb-2">Quick Links</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">Our Materials</a></li>
                            <li><a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">Products</a></li>
                            <li><Link to="/builder" className="text-gray-400 text-xs hover:text-white transition-colors">Build Kit</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-sm mb-2">Support</h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">Shipping</a></li>
                            <li><a href="#" className="text-gray-400 text-xs hover:text-white transition-colors">Returns</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-3 pt-3 text-center text-gray-400 text-xs">
                    <p>&copy; 2026 EcoLux Essentials. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
