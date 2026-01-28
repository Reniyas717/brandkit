import React from 'react';
import { useBrand } from '../hooks/useBrand';
import { useProducts } from '../hooks/useProducts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import TerraVerdeHero from '../components/landing/TerraVerdeHero';
import TerraVerdeMaterials from '../components/landing/TerraVerdeMaterials';
import CuratedCollectionsSection from '../components/landing/CuratedCollectionsSection';
import TerraVerdeBrandStory from '../components/landing/TerraVerdeBrandStory';
import TerraVerdeTestimonials from '../components/landing/TerraVerdeTestimonials';
import TransparencySection from '../components/landing/TransparencySection';

const TerraVerdeLanding = () => {
    const { brand, loading: brandLoading } = useBrand('terra-verde');
    const { products, loading: productsLoading } = useProducts({ brand: 'terra-verde' });

    if (brandLoading || productsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl font-bold text-amber-600">Crafting your natural experience...</p>
                    <p className="text-sm text-gray-500 mt-2">Loading Terra Verde</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <Navbar />
            <Breadcrumbs items={[
                { label: 'Brands', href: '/#brands' },
                { label: 'Terra Verde' }
            ]} />
            <TerraVerdeHero brand={brand} />
            <TerraVerdeMaterials />
            <CuratedCollectionsSection products={products} brand={brand} />
            <TerraVerdeBrandStory />
            <TerraVerdeTestimonials />
            <TransparencySection />
            <Footer />
        </div>
    );
};

export default TerraVerdeLanding;