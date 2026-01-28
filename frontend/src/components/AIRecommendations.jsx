import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaSpinner, FaPlus } from 'react-icons/fa';
import { aiRecommendationService } from '../services/aiRecommendationService';

const AIRecommendations = ({ products, onAddProduct, currentItems }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [impactMessage, setImpactMessage] = useState('');

    useEffect(() => {
        if (products && products.length > 0) {
            loadRecommendations();
        }
    }, [products]);

    useEffect(() => {
        if (currentItems.length > 0) {
            loadImpactMessage();
        }
    }, [currentItems]);

    const loadRecommendations = async () => {
        if (!products || products.length === 0) return;
        
        setLoading(true);
        try {
            // Pass actual products to the service
            const result = await aiRecommendationService.getKitRecommendations({
                lifestyle: 'sustainable living',
                budget: 'moderate',
                priorities: 'reducing plastic waste'
            }, products);

            if (result.success && result.recommendations && result.recommendations.length > 0) {
                // Recommendations are now actual product IDs from our database
                const recommendedProducts = result.recommendations
                    .map(id => products.find(p => p.id === id))
                    .filter(Boolean)
                    .slice(0, 3);

                setRecommendations(recommendedProducts);
            } else {
                // Fallback: show first 3 products as recommendations
                setRecommendations(products.slice(0, 3));
            }
        } catch (error) {
            console.error('Failed to load recommendations:', error);
            // Fallback: show first 3 products
            setRecommendations(products.slice(0, 3));
        } finally {
            setLoading(false);
        }
    };

    const loadImpactMessage = async () => {
        const message = await aiRecommendationService.getImpactMessage(currentItems);
        setImpactMessage(message);
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center justify-center gap-3">
                    <FaSpinner className="w-5 h-5 text-emerald-600 animate-spin" />
                    <span className="text-emerald-700 font-medium">AI is analyzing your preferences...</span>
                </div>
            </div>
        );
    }

    if (recommendations.length === 0) return null;

    return (
        <div className="mb-8">
            {/* AI Recommendations Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 rounded-3xl p-6 border border-emerald-200 shadow-lg"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <FaRobot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-gray-900">AI Recommended for You</h3>
                        <p className="text-xs text-emerald-600">Personalized eco-friendly picks</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {recommendations.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow group"
                        >
                            <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100">
                                <img
                                    src={product.image_url || product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/400x400/10b981/ffffff?text=Eco+Product';
                                    }}
                                />
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-1">{product.name}</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-emerald-600 font-black text-sm">₹{product.price}</span>
                                <button
                                    onClick={() => onAddProduct(product)}
                                    className="w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center transition-colors"
                                >
                                    <FaPlus className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Impact Message */}
            {impactMessage && currentItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100"
                >
                    <p className="text-sm text-emerald-800 font-medium italic">
                        💡 {impactMessage}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default AIRecommendations;
