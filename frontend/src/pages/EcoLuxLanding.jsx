import React from 'react';
import { useBrand } from '../hooks/useBrand';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import HeroSection from '../components/landing/HeroSection';
import BrandStorySection from '../components/landing/BrandStorySection';
import OurMaterialsSection from '../components/landing/OurMaterialsSection';
import CuratedCollectionsSection from '../components/landing/CuratedCollectionsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import TransparencySection from '../components/landing/TransparencySection';

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
        <div className="bg-white">
            <Navbar />
            <Breadcrumbs items={[
                { label: 'Brands', href: '/#brands' },
                { label: 'EcoLux Essentials' }
            ]} />
            <HeroSection brand={brand} />
            <OurMaterialsSection />
            <CuratedCollectionsSection products={products} brand={brand} />
            <BrandStorySection brand={brand} />
            <TestimonialsSection />
            <TransparencySection />
            <Footer />
        </div>
    );
};

export default EcoLuxLanding;