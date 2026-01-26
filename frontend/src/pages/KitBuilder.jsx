import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKitStore } from '../store/kitStore';
import { useKit } from '../hooks/useKit';
import { useProducts } from '../hooks/useProducts';
import { Button } from '../components/ui/button';
import Breadcrumbs from '../components/Breadcrumbs';
import AIRecommendations from '../components/AIRecommendations';
import {
    FaShoppingCart, FaPlus, FaMinus, FaTrash, FaFilter, FaRedo, FaLeaf, FaTimes, FaArrowRight,FaSearch
} from 'react-icons/fa';

const KitBuilder = () => {
    const navigate = useNavigate();
    const { items, getTotalPrice, getItemCount, isLoading } = useKitStore();
    const { addProduct, updateQuantity, removeProduct } = useKit();
    const { products, loading: productsLoading } = useProducts();
    const [showPanel, setShowPanel] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedMaterial, setSelectedMaterial] = useState('All');

    const categories = ['All', 'Bags', 'Kitchen', 'Stationery', 'Apparel', 'Drinkware'];

    // Extract unique materials from products + 'All'
    const materials = useMemo(() => {
        const allMaterials = products.flatMap(p => p.materials || []);
        return ['All', ...new Set(allMaterials)].sort();
    }, [products]);

    const handleAddToKit = async (product) => {
        const existingItem = items.find(item => item.product_id === product.id);
        if (existingItem) {
            await updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            await addProduct(product.id, 1);
        }
        setShowPanel(true);
    };

    const getItemQuantity = (productId) => {
        const item = items.find(i => i.product_id === productId);
        return item ? item.quantity : 0;
    };

    // Advanced Filtering Logic
    const filteredProducts = products.filter(p => {
        const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchMaterial = selectedMaterial === 'All' || (p.materials && p.materials.includes(selectedMaterial));
        return matchCategory && matchMaterial;
    });

    const progress = Math.min((getItemCount() / 5) * 100, 100);

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Professional Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <Breadcrumbs />
                            <h1 className="text-2xl font-bold text-gray-900 mt-2">Build Your Kit</h1>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Progress Indicator */}
                            <div className="hidden md:block w-48">
                                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                                    <span>Kit Progress</span>
                                    <span>{getItemCount()}/5 Items</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-emerald-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={() => setShowPanel(!showPanel)}
                                className="relative bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                            >
                                <FaShoppingCart className="mr-2" />
                                Cart
                                {getItemCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                                        {getItemCount()}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* AI Section - Emerald Theme */}
                {!productsLoading && products.length > 0 && (
                    <div className="mb-12">
                        <AIRecommendations
                            products={products}
                            onAddProduct={handleAddToKit}
                            currentItems={items}
                        />
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-64 flex-shrink-0 space-y-8">
                        {/* Categories */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaFilter className="text-emerald-600" /> Categories
                            </h3>
                            <div className="space-y-1">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === category
                                                ? 'bg-emerald-50 text-emerald-700 font-bold translate-x-1'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Materials Filter */}
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaLeaf className="text-emerald-600" /> Materials
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {materials.slice(0, 10).map(material => (
                                    <button
                                        key={material}
                                        onClick={() => setSelectedMaterial(material)}
                                        className={`px-3 py-1 rounded-full text-xs border transition-all ${selectedMaterial === material
                                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-200 hover:text-emerald-600'
                                            }`}
                                    >
                                        {material}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {productsLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-4 text-gray-500 font-medium">Loading eco-friendly products...</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <FaSearch className="text-gray-300 w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">No products found</h3>
                                <p className="text-gray-500 mt-1 mb-6">Try adjusting your filters to find what you're looking for.</p>
                                <Button
                                    variant="outline"
                                    onClick={() => { setSelectedCategory('All'); setSelectedMaterial('All'); }}
                                    className="flex items-center gap-2"
                                >
                                    <FaRedo className="w-3 h-3" /> Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        layout
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
                                    >
                                        {/* Image Area */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/600x400/png?text=Eco+Product';
                                                }}
                                            />

                                            {/* Overlay Actions */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                                                <Button
                                                    onClick={() => handleAddToKit(product)}
                                                    className="bg-white text-emerald-900 hover:bg-emerald-500 hover:text-white font-bold rounded-full px-6 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                                >
                                                    <FaPlus className="mr-2" /> Quick Add
                                                </Button>
                                            </div>

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                {product.sustainability_score >= 90 && (
                                                    <div className="bg-emerald-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                                                        <FaLeaf /> Top Rated
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1 min-w-0 pr-2">
                                                    <h3 className="font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">{product.category}</p>
                                                </div>
                                                <span className="font-black text-lg text-emerald-700 whitespace-nowrap">
                                                    ₹{product.price}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                                                {product.description}
                                            </p>

                                            <Button
                                                variant="outline"
                                                onClick={() => handleAddToKit(product)}
                                                className="w-full border-gray-200 hover:border-emerald-500 hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors"
                                            >
                                                Add to Kit
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cart Slide-over Panel */}
            <AnimatePresence>
                {showPanel && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPanel(false)}
                            className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <FaShoppingCart className="text-emerald-600" /> Your Kit
                                </h2>
                                <button
                                    onClick={() => setShowPanel(false)}
                                    className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
                                >
                                    <FaTimes className="text-gray-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                {items.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FaShoppingCart className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 font-medium">Your kit is empty</p>
                                        <Button
                                            variant="outline"
                                            className="mt-4"
                                            onClick={() => setShowPanel(false)}
                                        >
                                            Start Browsing
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => {
                                            const product = products.find(p => p.id === item.product_id);
                                            if (!product) return null;
                                            return (
                                                <div key={item.product_id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-emerald-200 transition-colors">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-16 h-16 rounded-lg object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://placehold.co/100x100/png?text=Product';
                                                        }}
                                                    />
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="font-bold text-gray-900 line-clamp-1">{product.name}</h4>
                                                            <button
                                                                onClick={() => removeProduct(item.product_id)}
                                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                            >
                                                                <FaTrash className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <p className="text-sm text-emerald-600 font-bold">₹{product.price}</p>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                                                className="w-6 h-6 rounded bg-white border flex items-center justify-center hover:border-emerald-500 transition-colors"
                                                            >
                                                                <FaMinus className="w-2 h-2" />
                                                            </button>
                                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                                className="w-6 h-6 rounded bg-white border flex items-center justify-center hover:border-emerald-500 transition-colors"
                                                            >
                                                                <FaPlus className="w-2 h-2" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600 font-medium">Total</span>
                                    <span className="text-2xl font-black text-emerald-600">₹{getTotalPrice().toFixed(2)}</span>
                                </div>
                                <Button
                                    onClick={() => navigate('/review')}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg py-6 text-lg font-bold"
                                    disabled={items.length === 0}
                                >
                                    Proceed to Review <FaArrowRight className="ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KitBuilder;
