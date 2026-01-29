import React from 'react';
import { Link } from 'react-router-dom';
import { useBrand } from '../hooks/useBrand';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import BrandStorySection from '../components/landing/BrandStorySection';
import OurMaterialsSection from '../components/landing/OurMaterialsSection';
import CuratedCollectionsSection from '../components/landing/CuratedCollectionsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import TransparencySection from '../components/landing/TransparencySection';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const EcoLuxLanding = () => {
    const { brand, loading: brandLoading } = useBrand('ecolux-essentials');
    const { products, loading: productsLoading } = useProducts({ brand: 'ecolux-essentials' });

    if (brandLoading || productsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl font-bold text-emerald-600">Crafting your sustainable experience...</p>
                    <p className="text-sm text-gray-500 mt-2">Loading EcoLux Essentials</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            
            {/* Breadcrumbs - Below Navbar with proper spacing */}
            <div className="bg-white border-b border-gray-100 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors">
                            <FaHome className="w-3.5 h-3.5" />
                            <span>Home</span>
                        </Link>
                        <FaChevronRight className="w-3 h-3 text-gray-300" />
                        <Link to="/#brands" className="text-gray-500 hover:text-emerald-600 transition-colors">
                            Brands
                        </Link>
                        <FaChevronRight className="w-3 h-3 text-gray-300" />
                        <span className="text-emerald-600 font-medium">EcoLux Essentials</span>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <main>
                <HeroSection brand={brand} />
                <OurMaterialsSection />
                <CuratedCollectionsSection products={products} brand={brand} />
                <BrandStorySection brand={brand} />
                <TestimonialsSection />
                <TransparencySection />
            </main>
            
            <Footer />
        </div>
    );
};

export default EcoLuxLanding;