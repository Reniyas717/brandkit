import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiShoppingCart, FiSearch, FiFilter, FiX, FiPlus,
    FiMinus, FiCheck, FiArrowRight, FiPackage, 
} from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import { useKit } from '../hooks/useKit';
import { useProducts } from '../hooks/useProducts';

const KitBuilder = () => {
    const { slug } = useParams(); // Get brand slug from URL
    const navigate = useNavigate();
    const { items, addProduct, updateQuantity, removeItem, loading: kitLoading } = useKit();
    
    // Fetch products filtered by brand slug
    const { products = [], loading: productsLoading } = useProducts({ brand: slug });
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedMaterial, setSelectedMaterial] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    // Get unique categories from products
    const categories = useMemo(() => {
        if (!Array.isArray(products)) return ['All'];
        return ['All', ...new Set(products.flatMap(p => p.category ? [p.category] : []))];
    }, [products]);

    // Get unique materials from products
    const materials = useMemo(() => {
        if (!Array.isArray(products)) return ['All'];
        return ['All', ...new Set(products.flatMap(p => p.materials ? p.materials.split(',').map(m => m.trim()) : []))];
    }, [products]);

    // Filter products based on search and filters
    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        
        return products.filter(product => {
            const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesMaterial = selectedMaterial === 'All' || 
                                  product.materials?.toLowerCase().includes(selectedMaterial.toLowerCase());
            
            return matchesSearch && matchesCategory && matchesMaterial;
        });
    }, [products, searchTerm, selectedCategory, selectedMaterial]);

    // Calculate cart totals
    const cartTotal = items.reduce((sum, item) => {
        const price = parseFloat(item.price_at_addition || item.price || 0);
        return sum + (price * item.quantity);
    }, 0);
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleAddToCart = (product) => {
        // Pass productId, quantity, and full product data for price/name/image
        addProduct(product.id, 1, product);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(itemId);
        } else {
            updateQuantity(itemId, newQuantity);
        }
    };

    const handleCheckout = () => {
        navigate('/review');
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setSelectedMaterial('All');
    };

    if (productsLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl font-medium text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                        >
                            <FiArrowRight className="w-5 h-5 rotate-180" />
                            <span className="font-medium">Back</span>
                        </button>
                        
                        <div className="text-center">
                            <h1 className="text-xl font-bold text-gray-800">Build Your Kit</h1>
                            <p className="text-sm text-gray-500">Shopping from: {slug?.replace('-', ' ')}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Kit Progress</p>
                                <p className="font-bold text-emerald-600">{cartCount}/5 items</p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={cartCount === 0}
                                className="relative bg-emerald-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiShoppingCart className="w-5 h-5 inline mr-2" />
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Filters */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <FiFilter className="w-5 h-5" />
                                    Filters
                                </h2>
                                {(searchTerm || selectedCategory !== 'All' || selectedMaterial !== 'All') && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                    >
                                        <FiX className="w-4 h-4" />
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search Products
                                </label>
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <FiPackage className="w-4 h-4" />
                                    Categories
                                </label>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                                selectedCategory === category
                                                    ? 'bg-emerald-100 text-emerald-700 font-medium'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Materials */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <RiLeafLine className="w-4 h-4" />
                                    Materials
                                </label>
                                <div className="space-y-2">
                                    {materials.map(material => (
                                        <button
                                            key={material}
                                            onClick={() => setSelectedMaterial(material)}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                                selectedMaterial === material
                                                    ? 'bg-emerald-100 text-emerald-700 font-medium'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {material}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Products Grid */}
                    <div className="lg:col-span-3">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-12 text-center">
                                <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => {
                                    const cartItem = items.find(item => item.product_id === product.id);
                                    const inCart = !!cartItem;
                                    const quantity = cartItem?.quantity || 0;

                                    return (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden group hover:shadow-xl transition-shadow"
                                        >
                                            {/* Product Image */}
                                            <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
                                                <img
                                                    src={product.image_url || '/placeholder-product.png'}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder-product.png';
                                                    }}
                                                />
                                                {/* Brand Badge */}
                                                {product.brand_name && (
                                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                                        {product.brand_name}
                                                    </div>
                                                )}
                                                {product.sustainability_score && (
                                                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                        <RiLeafLine className="w-3 h-3" />
                                                        {product.sustainability_score}/100
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <div className="mb-3">
                                                    <h3 className="font-bold text-gray-800 text-lg mb-1">{product.name}</h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                                </div>

                                                {product.materials && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {product.materials.split(',').slice(0, 2).map((material, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium"
                                                            >
                                                                {material.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <p className="text-2xl font-bold text-emerald-600">
                                                        ₹{product.price}
                                                    </p>

                                                    {inCart ? (
                                                        <div className="flex items-center gap-2 bg-emerald-50 rounded-xl p-1">
                                                            <button
                                                                onClick={() => handleQuantityChange(product.id, quantity - 1)}
                                                                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                                                            >
                                                                <FiMinus className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-emerald-700">
                                                                {quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => handleQuantityChange(product.id, quantity + 1)}
                                                                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                                                            >
                                                                <FiPlus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAddToCart(product)}
                                                            className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2"
                                                        >
                                                            <FiPlus className="w-4 h-4" />
                                                            Add
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Floating Cart Summary */}
            {cartCount > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-emerald-100 p-6 max-w-sm z-50"
                >
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FiShoppingCart className="w-5 h-5 text-emerald-600" />
                        Your Kit ({cartCount} items)
                    </h3>
                    
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {items.map(item => (
                            <div key={item.product_id || item.id} className="flex items-center justify-between text-sm gap-3">
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-gray-800 font-medium truncate">{item.name}</span>
                                    {item.brand_name && (
                                        <span className="text-xs text-gray-500">from {item.brand_name}</span>
                                    )}
                                </div>
                                
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-1 bg-emerald-50 rounded-lg p-1">
                                    <button
                                        onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                                        className="w-6 h-6 bg-white rounded flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                                    >
                                        <FiMinus className="w-3 h-3" />
                                    </button>
                                    <span className="w-6 text-center font-bold text-emerald-700 text-xs">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                                        className="w-6 h-6 bg-white rounded flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors"
                                    >
                                        <FiPlus className="w-3 h-3" />
                                    </button>
                                </div>
                                
                                <span className="font-medium text-emerald-600 whitespace-nowrap">₹{((item.price || item.price_at_addition || 0) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                        <div className="flex items-center justify-between text-lg font-bold">
                            <span className="text-gray-800">Total</span>
                            <span className="text-emerald-600">₹{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full bg-emerald-500 text-white py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                    >
                        Proceed to Review
                        <FiArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default KitBuilder;
