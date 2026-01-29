import React from 'react';
import { Link } from 'react-router-dom';
import { useBrand } from '../hooks/useBrand';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TerraVerdeHero from '../components/landing/TerraVerdeHero';
import TerraVerdeMaterials from '../components/landing/TerraVerdeMaterials';
import TerraVerdeCollections from '../components/landing/TerraVerdeCollections';
import TerraVerdeBrandStory from '../components/landing/TerraVerdeBrandStory';
import TerraVerdeTestimonials from '../components/landing/TerraVerdeTestimonials';
import TerraVerdeTransparency from '../components/landing/TerraVerdeTransparency';
import { FaHome, FaChevronRight, FaLeaf } from 'react-icons/fa';

const TerraVerdeLanding = () => {
    const { brand, loading: brandLoading } = useBrand('terra-verde');
    const { products, loading: productsLoading } = useProducts({ brand: 'terra-verde' });

    if (brandLoading || productsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl font-bold text-amber-700">Crafting your natural experience...</p>
                    <p className="text-sm text-amber-600/70 mt-2">Loading Terra Verde</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFBF5]">
            {/* Light Navbar with Amber accent */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFBF5]/95 backdrop-blur-md border-b border-amber-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <FaLeaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-stone-800">Terra <span className="text-amber-600">Verde</span></span>
                        </Link>

                        {/* Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#collections" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                                Collections
                            </a>
                            <a href="#story" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                                Our Story
                            </a>
                            <a href="#materials" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                                Materials
                            </a>
                            <Link 
                                to="/builder"
                                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/25 text-sm"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Breadcrumbs - Below Navbar */}
            <div className="fixed top-16 left-0 right-0 z-40 bg-amber-50/80 backdrop-blur-sm border-b border-amber-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="flex items-center gap-1.5 text-stone-500 hover:text-amber-600 transition-colors">
                            <FaHome className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>
                        <FaChevronRight className="w-3 h-3 text-stone-300" />
                        <Link to="/#brands" className="text-stone-500 hover:text-amber-600 transition-colors">
                            Brands
                        </Link>
                        <FaChevronRight className="w-3 h-3 text-stone-300" />
                        <span className="text-amber-600 font-semibold">Terra Verde</span>
                    </div>
                </div>
            </div>

            {/* Main Content - Add padding for fixed navbar and breadcrumbs */}
            <main className="pt-28">
                <TerraVerdeHero brand={brand} />
                <TerraVerdeMaterials />
                <TerraVerdeCollections products={products} brand={brand} />
                <TerraVerdeBrandStory />
                <TerraVerdeTestimonials />
                <TerraVerdeTransparency />
            </main>

            {/* Light Footer for Terra Verde */}
            <footer className="bg-stone-50 border-t border-stone-200 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                    <FaLeaf className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-stone-800">Terra Verde</span>
                            </div>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                Sustainable fashion crafted with love for the earth and its people.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-stone-800 font-semibold mb-4">Shop</h4>
                            <ul className="space-y-2">
                                <li><Link to="/builder" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">All Products</Link></li>
                                <li><Link to="#" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">New Arrivals</Link></li>
                                <li><Link to="#" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">Best Sellers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-stone-800 font-semibold mb-4">About</h4>
                            <ul className="space-y-2">
                                <li><a href="#story" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">Our Story</a></li>
                                <li><Link to="#" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">Sustainability</Link></li>
                                <li><Link to="#" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">Certifications</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-stone-800 font-semibold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><Link to="#" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">Contact Us</Link></li>
                                <li><Link to="#" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">FAQs</Link></li>
                                <li><Link to="#" className="text-stone-500 hover:text-amber-600 text-sm transition-colors">Shipping</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-stone-200 text-center">
                        <p className="text-stone-400 text-sm">© 2026 Terra Verde. All rights reserved. Made with 🌿 for the planet.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TerraVerdeLanding;