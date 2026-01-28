import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { brandService } from '../services';
import { 
    FiArrowRight, FiShield, FiTrendingUp, FiGlobe, 
    FiHeart, FiStar, FiLogOut, FiSettings, FiShoppingBag,
     FiDroplet, FiBox, FiUsers
} from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri'; // <-- Correct import


const PlatformHome = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredBrand, setHoveredBrand] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brandsData = await brandService.getAllBrands();
                // brandService.getAllBrands now returns array directly
                setBrands(Array.isArray(brandsData) ? brandsData : []);
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const impactStats = [
        { icon: RiLeafLine  , label: 'Trees Planted', value: '10,000+', color: 'emerald' },
        { icon: FiDroplet, label: 'Plastic Reduced', value: '5 Tons', color: 'blue' },
        { icon: FiUsers, label: 'Happy Customers', value: '25k+', color: 'purple' },
        { icon: FiShield, label: 'Ethical Brands', value: '50+', color: 'amber' }
    ];

    const features = [
        { 
            icon: FiBox, 
            title: 'Curated Kits', 
            description: 'Build your perfect sustainable kit from multiple brands' 
        },
        { 
            icon: FiShield, 
            title: 'Verified Brands', 
            description: 'Every brand is vetted for quality and sustainability' 
        },
        { 
            icon: FiGlobe, 
            title: 'Carbon Neutral', 
            description: '100% carbon offset on all deliveries' 
        },
        { 
            icon: FiHeart, 
            title: 'Impact Driven', 
            description: 'Your purchase plants trees and supports communities' 
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="text-2xl font-bold text-gray-900">
                            Brand<span className="text-emerald-500">Kit</span>
                        </Link>
                        
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">About</a>
                            <a href="#brands" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">Brands</a>
                            <a href="#impact" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">Impact</a>
                        </div>

                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    <span className="hidden sm:block text-sm text-gray-500">
                                        Hi, <span className="font-semibold text-gray-900">{user?.name?.split(' ')[0]}</span>
                                    </span>
                                    <Link to="/subscriptions" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                                        <FiBox className="w-4 h-4" />
                                        <span className="hidden sm:inline">My Kits</span>
                                    </Link>
                                    {user?.role === 'seller' || user?.role === 'admin' ? (
                                        <Link to="/seller" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                                            <FiSettings className="w-4 h-4" />
                                            <span className="hidden sm:inline">Dashboard</span>
                                        </Link>
                                    ) : (
                                        <Link to="/builder" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                                            <FiShoppingBag className="w-4 h-4" />
                                            <span className="hidden sm:inline">Build Kit</span>
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                                        <FiLogOut className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/25">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                                <RiLeafLine   className="w-4 h-4" />
                                Sustainable Living Made Simple
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight"
                        >
                            Discover Brands That
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">
                                Care About Tomorrow
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Shop from verified sustainable brands and build your personalized eco-kit. Every purchase makes a positive impact.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            {isAuthenticated ? (
                                <>
                                    <a href="#brands" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-1">
                                        Explore Brands
                                        <FiArrowRight className="w-5 h-5" />
                                    </a>
                                    {user?.role === 'customer' && (
                                        <Link to="/builder" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-emerald-700 bg-white rounded-2xl hover:bg-gray-50 transition-all border-2 border-emerald-200 hover:-translate-y-1">
                                            <FiShoppingBag className="w-5 h-5" />
                                            Build Your Kit
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-1">
                                        Start Shopping
                                        <FiArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-2xl hover:bg-gray-50 transition-all border-2 border-gray-200 hover:-translate-y-1">
                                        I Have an Account
                                    </Link>
                                </>
                            )}
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
                        >
                            {[
                                { value: '50+', label: 'Brands' },
                                { value: '10k+', label: 'Products' },
                                { value: '25k+', label: 'Customers' }
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <a href="#brands" className="flex flex-col items-center text-gray-400 hover:text-emerald-500 transition-colors">
                        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <FiArrowRight className="w-5 h-5 rotate-90" />
                        </motion.div>
                    </a>
                </motion.div>
            </section>

            {/* Featured Brands Section */}
            <section id="brands" className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4"
                        >
                            <FiStar className="w-4 h-4" />
                            Our Partner Brands
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-gray-900"
                        >
                            Shop from Trusted Brands
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            {isAuthenticated 
                                ? "Click on a brand to explore their collection and start building your kit."
                                : "Login to explore our curated collection of sustainable brands."
                            }
                        </motion.p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {brands.map((brand, idx) => (
                                <motion.div
                                    key={brand.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    onHoverStart={() => setHoveredBrand(brand.id)}
                                    onHoverEnd={() => setHoveredBrand(null)}
                                    className="group relative"
                                >
                                    {isAuthenticated ? (
                                        <Link to={`/brand/${brand.slug}`} className="block">
                                            <BrandCard brand={brand} isHovered={hoveredBrand === brand.id} />
                                        </Link>
                                    ) : (
                                        <Link to="/login" className="block">
                                            <BrandCard brand={brand} isHovered={hoveredBrand === brand.id} locked />
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!isAuthenticated && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <p className="text-gray-500 mb-4">Create an account to explore all brands and products</p>
                            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-full transition-colors">
                                Sign up for free <FiArrowRight />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section id="about" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                                <FiBox className="w-4 h-4" />
                                Why BrandKit
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Build Your Perfect
                                <span className="text-emerald-600"> Sustainable Kit</span>
                            </h2>
                            <p className="mt-6 text-lg text-gray-600">
                                Mix and match products from multiple brands to create your personalized eco-kit. 
                                Every product is verified for sustainability and quality.
                            </p>
                            
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-4"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{feature.title}</h3>
                                            <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" 
                                    alt="Sustainable Products" 
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <RiLeafLine   className="w-5 h-5 text-emerald-400" />
                                        <span className="text-emerald-400 font-semibold">Eco-Friendly</span>
                                    </div>
                                    <p className="text-2xl font-bold">Products that make a difference</p>
                                </div>
                            </div>
                            
                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <FiTrendingUp className="w-7 h-7 text-emerald-600" />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900">98%</div>
                                        <div className="text-gray-500 text-sm">Customer Satisfaction</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-24 bg-emerald-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')]" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white"
                        >
                            Our Collective Impact
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-xl text-emerald-200 max-w-2xl mx-auto"
                        >
                            Together with our community, we're making a real difference for the planet.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {impactStats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-emerald-400" />
                                </div>
                                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-emerald-200 text-sm uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!isAuthenticated && (
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Ready to Make a Difference?
                            </h2>
                            <p className="text-xl text-gray-600 mb-10">
                                Join thousands of conscious consumers who are shopping sustainably.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30">
                                    Create Free Account
                                    <FiArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all">
                                    Sign In
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-2xl font-bold text-gray-900">Brand<span className="text-emerald-500">Kit</span></h2>
                            <p className="text-gray-500 text-sm mt-1">Sustainable shopping, simplified.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
                            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
                            <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
                            <Link to="/login" className="hover:text-emerald-600 transition-colors">Sellers</Link>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
                        © 2024 BrandKit. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Brand Card Component
const BrandCard = ({ brand, isHovered, locked }) => (
    <div className={`relative bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 ${isHovered ? 'shadow-2xl scale-[1.02]' : ''}`}>
        {/* Banner Image */}
        <div className="relative h-56 overflow-hidden">
            <img 
                src={brand.banner_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'} 
                alt={brand.name} 
                className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Verified Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                <FiShield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-gray-800">Verified</span>
            </div>

            {/* Logo */}
            <div className="absolute bottom-4 left-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center">
                    <img 
                        src={brand.logo_url || 'https://via.placeholder.com/100'} 
                        alt={`${brand.name} logo`} 
                        className="w-full h-full object-contain rounded-xl"
                    />
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{brand.name}</h3>
            <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {brand.description || 'Discover premium sustainable products crafted with care.'}
            </p>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600">
                    <RiLeafLine   className="w-4 h-4" />
                    <span className="text-sm font-medium">Eco-Friendly</span>
                </div>
                <div className={`flex items-center gap-2 font-semibold transition-colors ${isHovered ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {locked ? (
                        <>
                            <span className="text-sm">Login to View</span>
                            <FiArrowRight className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            <span className="text-sm">Explore</span>
                            <FiArrowRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                        </>
                    )}
                </div>
            </div>
        </div>

        {/* Lock Overlay for non-authenticated users */}
        {locked && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiShoppingBag className="w-8 h-8 text-emerald-600" />
                    </div>
                    <p className="text-gray-900 font-semibold">Login to explore</p>
                    <p className="text-gray-500 text-sm">Create a free account to shop</p>
                </div>
            </div>
        )}
    </div>
);

export default PlatformHome;
