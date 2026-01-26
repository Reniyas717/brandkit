import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKitStore } from '../store/kitStore';
import { useKit } from '../hooks/useKit';
import { kitService } from '../services';
import { Button } from '../components/ui/button';
import Breadcrumbs from '../components/Breadcrumbs';
import { FaCheck, FaArrowLeft, FaBox, FaTruck, FaCalendar, FaEdit } from 'react-icons/fa';

const KitReview = () => {
    const navigate = useNavigate();
    const { items, deliveryFrequency, getTotalPrice, getItemCount, clearKit } = useKitStore();
    const { setFrequency, confirmKit } = useKit();
    const [frequencies, setFrequencies] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState(deliveryFrequency);
    const [isConfirming, setIsConfirming] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const products = [
        { id: 1, name: 'Organic Tote Bag', price: 49.99, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80' },
        { id: 2, name: 'Bamboo Utensil Set', price: 24.99, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80' },
        { id: 3, name: 'Recycled Notebook', price: 18.99, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80' },
        { id: 4, name: 'Cotton T-Shirt', price: 39.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
        { id: 5, name: 'Reusable Water Bottle', price: 34.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80' },
        { id: 6, name: 'Hemp Backpack', price: 89.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
    ];

    useEffect(() => {
        const loadFrequencies = async () => {
            try {
                const response = await kitService.getDeliveryFrequencies();
                setFrequencies(response.data.frequencies);
                if (!selectedFrequency && response.data.frequencies.length > 0) {
                    setSelectedFrequency(response.data.frequencies[0].id);
                }
            } catch (error) {
                console.error('Failed to load frequencies:', error);
            }
        };
        loadFrequencies();
    }, [selectedFrequency]);

    const handleConfirm = async () => {
        if (!selectedFrequency) {
            alert('Please select a delivery frequency');
            return;
        }

        setIsConfirming(true);
        try {
            await setFrequency(selectedFrequency);
            const success = await confirmKit();
            if (success) {
                setShowSuccess(true);
                setTimeout(() => {
                    clearKit();
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            console.error('Failed to confirm kit:', error);
        } finally {
            setIsConfirming(false);
        }
    };

    if (items.length === 0 && !showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <FaBox className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Your Kit is Empty</h2>
                    <p className="text-gray-600 mb-8">Add some products to get started</p>
                    <Button onClick={() => navigate('/builder')}>
                        Start Building
                    </Button>
                </div>
            </div>
        );
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <FaCheck className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-black text-gray-900 mb-2">Kit Confirmed!</h2>
                    <p className="text-xl text-gray-600">Your subscription is all set up</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header with Breadcrumbs */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-8 py-4">
                    <Breadcrumbs />
                </div>
                <div className="container mx-auto px-8 py-6">
                    <button
                        onClick={() => navigate('/builder')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Builder
                    </button>
                    <h1 className="text-4xl font-black text-gray-900">Review Your Kit</h1>
                    <p className="text-gray-600 mt-1">Confirm your subscription details</p>
                </div>
            </div>

            <div className="container mx-auto px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Kit Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-gray-900">Your Items</h2>
                                <button
                                    onClick={() => navigate('/builder')}
                                    className="flex items-center text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                                >
                                    <FaEdit className="mr-2" />
                                    Edit
                                </button>
                            </div>

                            <div className="space-y-4">
                                {items.map((item) => {
                                    const product = products.find(p => p.id === item.product_id);
                                    if (!product) return null;

                                    return (
                                        <motion.div
                                            key={item.product_id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-20 h-20 rounded-xl object-cover"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-gray-900">{product.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black text-emerald-600">
                                                    ${(product.price * item.quantity).toFixed(2)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ${product.price} each
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Delivery Frequency */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <FaTruck className="w-6 h-6 text-emerald-600" />
                                <h2 className="text-2xl font-black text-gray-900">Delivery Frequency</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {frequencies.map((freq) => (
                                    <button
                                        key={freq.id}
                                        onClick={() => setSelectedFrequency(freq.id)}
                                        className={`p-6 rounded-2xl border-2 transition-all ${selectedFrequency === freq.id
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <FaCalendar className={`w-6 h-6 mb-3 ${selectedFrequency === freq.id ? 'text-emerald-600' : 'text-gray-400'
                                            }`} />
                                        <div className="font-bold text-gray-900">{freq.label}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Every {freq.interval_in_days} days
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white sticky top-8 shadow-2xl">
                            <h2 className="text-2xl font-black mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                    <span className="text-emerald-100">Items ({getItemCount()})</span>
                                    <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                    <span className="text-emerald-100">Shipping</span>
                                    <span className="font-bold">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-2xl font-black">
                                    <span>Total</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-emerald-100">
                                    Per delivery • Cancel anytime
                                </p>
                            </div>

                            <Button
                                onClick={handleConfirm}
                                disabled={isConfirming || !selectedFrequency}
                                className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-bold text-lg py-6"
                                size="lg"
                            >
                                {isConfirming ? (
                                    'Confirming...'
                                ) : (
                                    <>
                                        <FaCheck className="mr-2" />
                                        Confirm Subscription
                                    </>
                                )}
                            </Button>

                            <div className="mt-6 space-y-2 text-sm text-emerald-100">
                                <div className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Free shipping on all deliveries</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Modify or pause anytime</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>100% satisfaction guaranteed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KitReview;
