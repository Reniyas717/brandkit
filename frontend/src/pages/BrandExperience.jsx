import React from 'react';
import { useBrand } from '../hooks/useBrand';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import OurMaterialsSection from '../components/landing/OurMaterialsSection';
import CuratedCollectionsSection from '../components/landing/CuratedCollectionsSection';
import TransparencySection from '../components/landing/TransparencySection';

const BrandExperience = () => {
    const { brand, loading } = useBrand('ecolux-essentials');

    const products = [
        { name: 'Organic Tote Bag', price: '49.99', description: 'Handwoven hemp tote with reinforced straps', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80' },
        { name: 'Bamboo Utensil Set', price: '24.99', description: 'Complete set with carrying case', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80' },
        { name: 'Recycled Notebook', price: '18.99', description: '100% post-consumer recycled paper', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80' },
        { name: 'Cotton T-Shirt', price: '39.99', description: 'Organic cotton, ethically made', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
        { name: 'Reusable Water Bottle', price: '29.99', description: 'Stainless steel, keeps drinks cold for 24h', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80' },
        { name: 'Sustainable Backpack', price: '89.99', description: 'Recycled materials, laptop compartment', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <Navbar />
            <HeroSection brand={brand} />
            <OurMaterialsSection />
            <CuratedCollectionsSection products={products} />
            <TransparencySection />
            <Footer />
        </div>
    );
};

export default BrandExperience;
