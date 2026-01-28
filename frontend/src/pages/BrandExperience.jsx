import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
    FiArrowLeft, FiArrowRight, FiShoppingBag, FiHeart, FiStar, 
     FiShield, FiTruck, FiAward, FiHome, FiLogOut
} from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri'; // <-- Correct import

const BrandExperience = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/brands/${slug}/details`
                );

                if (response.data.status === 'success') {
                    setBrand(response.data.data.brand);
                }
            } catch (err) {
                console.error("Error fetching brand:", err);
                setError('Brand not found');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBrandDetails();
        }
    }, [slug]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Get unique categories from products
    const categories = brand?.products 
        ? ['All', ...new Set(brand.products.map(p => p.category).filter(Boolean))]
        : ['All'];

    // Filter products by category
    const filteredProducts = brand?.products?.filter(
        p => activeCategory === 'All' || p.category === activeCategory
    ) || [];

    // Brand-specific theming
    const getBrandColors = () => {
        if (slug?.includes('ecolux')) {
            return {
                primary: 'emerald',
                gradient: 'from-emerald-600 to-teal-600',
                light: 'emerald-50',
                accent: 'emerald-500'
            };
        } else if (slug?.includes('terra')) {
            return {
                primary: 'amber',
                gradient: 'from-amber-600 to-orange-600',
                light: 'amber-50',
                accent: 'amber-500'
            };
        }
        return {
            primary: 'emerald',
            gradient: 'from-emerald-600 to-teal-600',
            light: 'emerald-50',
            accent: 'emerald-500'
        };
    };

    const colors = getBrandColors();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className={`w-16 h-16 border-4 border-${colors.primary}-200 rounded-full animate-spin border-t-${colors.primary}-600 mx-auto mb-4`}></div>
                    <p className="text-gray-500">Loading brand experience...</p>
                </div>
            </div>
        );
    }

    if (error || !brand) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiShield className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
                    <p className="text-gray-600 mb-8">We couldn't find the brand you're looking for.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => navigate('/')}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FiHome className="w-5 h-5" />
                            </button>
                            <div className="h-6 w-px bg-gray-200" />
                            <div className="flex items-center gap-3">
                                {brand.logo_url && (
                                    <img src={brand.logo_url} alt={brand.name} className="h-8 w-8 rounded-lg object-contain" />
                                )}
                                <span className="text-lg font-bold text-gray-900">{brand.name}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {isAuthenticated && (
                                <>
                                    <span className="hidden sm:block text-sm text-gray-500">
                                        {user?.name}
                                    </span>
                                    <Link
                                        to={`/brand/${slug}/builder`}
                                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r ${colors.gradient} rounded-full hover:opacity-90 transition-all shadow-lg`}
                                    >
                                        <FiShoppingBag className="w-4 h-4" />
                                        <span className="hidden sm:inline">Shop Now</span>
                                    </Link>
                                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <FiLogOut className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {brand.banner_url ? (
                        <img 
                            src={brand.banner_url} 
                            alt={brand.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${colors.gradient}`} />
                    )}
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {brand.logo_url && (
                            <motion.img 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                src={brand.logo_url} 
                                alt={brand.name} 
                                className="h-20 w-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm p-2 shadow-2xl"
                            />
                        )}
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
                        >
                            {brand.name}
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            {brand.description || 'Premium sustainable products crafted with care.'}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link
                                to={`/brand/${slug}/builder`}
                                className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r ${colors.gradient} rounded-2xl hover:opacity-90 transition-all shadow-xl hover:-translate-y-1`}
                            >
                                <FiShoppingBag className="w-5 h-5" />
                                Start Shopping
                            </Link>
                            <a
                                href="#products"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all border border-white/30"
                            >
                                View Collection
                                <FiArrowRight className="w-5 h-5" />
                            </a>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-12 flex flex-wrap justify-center gap-6 text-white/80"
                        >
                            {[
                                { icon: RiLeafLine  , label: 'Eco-Friendly' },
                                { icon: FiShield, label: 'Verified Brand' },
                                { icon: FiTruck, label: 'Fast Shipping' },
                                { icon: FiAward, label: 'Premium Quality' }
                            ].map((badge, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <badge.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{badge.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <a href="#story" className="flex flex-col items-center text-white/50 hover:text-white/80 transition-colors">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <FiArrowRight className="w-6 h-6 rotate-90" />
                        </motion.div>
                    </a>
                </motion.div>
            </section>

            {/* Story Section */}
            {brand.story && (
                <section id="story" className={`py-24 bg-${colors.light}`}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${colors.primary}-100 text-${colors.primary}-700 text-sm font-semibold mb-6`}>
                                <FiHeart className="w-4 h-4" />
                                Our Story
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                                About {brand.name}
                            </h2>
                            <div className="prose prose-lg prose-gray mx-auto text-gray-600 leading-relaxed">
                                {brand.story.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-6">{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Products Section */}
            {brand.products && brand.products.length > 0 && (
                <section id="products" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${colors.primary}-100 text-${colors.primary}-700 text-sm font-semibold mb-4`}>
                                <FiStar className="w-4 h-4" />
                                Our Collection
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Featured Products
                            </h2>
                            <p className="mt-4 text-xl text-gray-600">
                                Discover our curated selection of sustainable products
                            </p>
                        </motion.div>

                        {/* Category Filter */}
                        {categories.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-wrap justify-center gap-3 mb-12"
                            >
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                            activeCategory === cat
                                                ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg`
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.slice(0, 8).map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group cursor-pointer"
                                    onClick={() => navigate(`/brand/${slug}/builder`)}
                                >
                                    <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                                        {product.image_url ? (
                                            <img 
                                                src={product.image_url} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                                <FiShoppingBag className="w-12 h-12 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className={`w-full py-3 bg-gradient-to-r ${colors.gradient} text-white font-semibold rounded-xl shadow-lg`}>
                                                Add to Kit
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={`text-xs font-medium text-${colors.primary}-600 uppercase tracking-wider mb-1`}>
                                            {product.category || 'General'}
                                        </p>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 font-semibold mt-1">₹{product.price}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* View All Button */}
                        {brand.products.length > 8 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-center mt-12"
                            >
                                <Link
                                    to={`/brand/${slug}/builder`}
                                    className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${colors.gradient} text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-xl`}
                                >
                                    View All Products ({brand.products.length})
                                    <FiArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className={`py-24 bg-gradient-to-r ${colors.gradient}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Build Your Kit?
                        </h2>
                        <p className="text-xl text-white/80 mb-10">
                            Mix and match your favorite products from {brand.name} and create your perfect sustainable kit.
                        </p>
                        <Link
                            to={`/brand/${slug}/builder`}
                            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1"
                        >
                            <FiShoppingBag className="w-5 h-5" />
                            Start Building
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            {brand.logo_url && (
                                <img src={brand.logo_url} alt={brand.name} className="h-10 w-10 rounded-lg bg-white/10 p-1" />
                            )}
                            <span className="text-xl font-bold">{brand.name}</span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            Powered by <Link to="/" className="text-white hover:text-emerald-400 transition-colors">BrandKit</Link>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} {brand.name}. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BrandExperience;
