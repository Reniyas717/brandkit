import React from 'react';
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

const BrandExperience = () => {
    const { brand, loading: brandLoading } = useBrand('ecolux-essentials');
    const { products, loading: productsLoading } = useProducts();

    if (brandLoading || productsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-emerald-50/30">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl font-bold text-gray-600">Loading your eco experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <Navbar />
            <HeroSection brand={brand} />
            {/* <BrandStorySection /> */}
            <OurMaterialsSection />
            <CuratedCollectionsSection products={products} />
            <TestimonialsSection />
            <TransparencySection />
            <Footer />
        </div>
    );
};

export default BrandExperience;
