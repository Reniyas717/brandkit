import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKitStore } from '../store/kitStore';
import { useKit } from '../hooks/useKit';
import { useBrand } from '../hooks/useBrand';
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
import { Button } from '../components/ui/button';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash, FaArrowRight, FaTimes } from 'react-icons/fa';

const KitBuilder = () => {
    const navigate = useNavigate();
    const { brand } = useBrand('ecolux-essentials');
    const { items, getTotalPrice, getItemCount, isLoading } = useKitStore();
    const { addProduct, updateQuantity, removeProduct } = useKit();
    const [showPanel, setShowPanel] = useState(false);

    const products = [
        { id: 1, name: 'Organic Tote Bag', price: 49.99, description: 'Handwoven hemp tote with reinforced straps', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80' },
        { id: 2, name: 'Bamboo Utensil Set', price: 24.99, description: 'Complete set with carrying case', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80' },
        { id: 3, name: 'Recycled Notebook', price: 18.99, description: '100% post-consumer recycled paper', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80' },
        { id: 4, name: 'Cotton T-Shirt', price: 39.99, description: 'Organic cotton with natural dyes', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
        { id: 5, name: 'Reusable Water Bottle', price: 34.99, description: 'Stainless steel, BPA-free', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80' },
        { id: 6, name: 'Hemp Backpack', price: 89.99, description: 'Durable hemp canvas with laptop sleeve', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
    ];

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
                <div className="container mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900">Build Your Kit</h1>
                            <p className="text-gray-600 mt-1">Select products for your subscription</p>
                        </div>
                        <Button
                            onClick={() => setShowPanel(!showPanel)}
                            className="relative"
                        >
                            <FaShoppingCart className="mr-2" />
                            Kit ({getItemCount()})
                            {getItemCount() > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                                    {getItemCount()}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, idx) => {
                        const quantity = getItemQuantity(product.id);
                        const isInKit = quantity > 0;

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <CardContainer className="inter-var w-full h-full" containerClassName="py-0">
                                    <CardBody className="bg-white relative group/card border-black/[0.05] w-full h-full rounded-[2rem] p-6 border hover:border-emerald-500/20 transition-all duration-300 hover:shadow-xl flex flex-col">
                                        <CardItem translateZ="30" className="w-full aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-50 relative">
                                            <img
                                                src={product.image}
                                                className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                                                alt={product.name}
                                            />
                                            {isInKit && (
                                                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                    In Kit ({quantity})
                                                </div>
                                            )}
                                        </CardItem>

                                        <div className="flex-grow">
                                            <CardItem
                                                translateZ="40"
                                                className="text-lg font-bold text-gray-900 mb-2"
                                            >
                                                {product.name}
                                            </CardItem>
                                            <CardItem
                                                as="p"
                                                translateZ="30"
                                                className="text-gray-600 text-sm mb-4 line-clamp-2"
                                            >
                                                {product.description}
                                            </CardItem>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-3">
                                                <CardItem
                                                    translateZ="20"
                                                    className="text-2xl font-black text-emerald-600"
                                                >
                                                    ${product.price}
                                                </CardItem>
                                                <span className="text-xs text-gray-500">per delivery</span>
                                            </div>

                                            <CardItem translateZ="40">
                                                <Button
                                                    onClick={() => handleAddToKit(product)}
                                                    className="w-full bg-gray-900 hover:bg-emerald-600 transition-colors"
                                                    disabled={isLoading}
                                                >
                                                    <FaPlus className="mr-2" />
                                                    {isInKit ? 'Add More' : 'Add to Kit'}
                                                </Button>
                                            </CardItem>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Kit Panel */}
            <AnimatePresence>
                {showPanel && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPanel(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                        >
                            {/* Panel Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900">Your Kit</h2>
                                        <p className="text-sm text-gray-600 mt-1">{getItemCount()} items</p>
                                    </div>
                                    <button
                                        onClick={() => setShowPanel(false)}
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            {/* Panel Content */}
                            <div className="flex-grow overflow-y-auto p-6">
                                {items.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FaShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">Your kit is empty</p>
                                        <p className="text-sm text-gray-400 mt-1">Add products to get started</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => {
                                            const product = products.find(p => p.id === item.product_id);
                                            if (!product) return null;

                                            return (
                                                <motion.div
                                                    key={item.product_id}
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="bg-gray-50 rounded-2xl p-4"
                                                >
                                                    <div className="flex gap-4">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-20 h-20 rounded-xl object-cover"
                                                        />
                                                        <div className="flex-grow">
                                                            <h3 className="font-bold text-gray-900">{product.name}</h3>
                                                            <p className="text-sm text-emerald-600 font-bold mt-1">
                                                                ${product.price}
                                                            </p>

                                                            <div className="flex items-center gap-2 mt-3">
                                                                <button
                                                                    onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"
                                                                    disabled={isLoading}
                                                                >
                                                                    <FaMinus className="w-3 h-3" />
                                                                </button>
                                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"
                                                                    disabled={isLoading}
                                                                >
                                                                    <FaPlus className="w-3 h-3" />
                                                                </button>
                                                                <button
                                                                    onClick={() => removeProduct(item.product_id)}
                                                                    className="ml-auto w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                                                                    disabled={isLoading}
                                                                >
                                                                    <FaTrash className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Panel Footer */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-gray-100 bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600">Total per delivery</span>
                                        <span className="text-3xl font-black text-gray-900">
                                            ${getTotalPrice().toFixed(2)}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() => navigate('/review')}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                                        size="lg"
                                    >
                                        Review Kit <FaArrowRight className="ml-2" />
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KitBuilder;
