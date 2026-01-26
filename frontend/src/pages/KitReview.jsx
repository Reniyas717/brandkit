import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useKitStore } from '../store/kitStore';
import { useKit } from '../hooks/useKit';
import { useProducts } from '../hooks/useProducts';
import { kitService } from '../services';
import { Button } from '../components/ui/button';
import Breadcrumbs from '../components/Breadcrumbs';
import {
    FaCheck, FaArrowLeft, FaBox, FaTruck, FaCalendar, FaEdit,
    FaLeaf, FaRecycle, FaWater, FaTree, FaStar
} from 'react-icons/fa';

// Impact Metric Card
const ImpactMetric = ({ icon: Icon, value, label, color }) => (
    <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg`}
    >
        <Icon className="w-8 h-8 mb-3 opacity-80" />
        <div className="text-3xl font-black mb-1">{value}</div>
        <div className="text-sm opacity-90">{label}</div>
    </motion.div>
);

// Frequency Card
const FrequencyCard = ({ freq, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${isSelected
            ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 scale-105 shadow-lg'
            : 'border-gray-200 hover:border-gray-300 bg-white hover:scale-102'
            }`}
    >
        {isSelected && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg"
            >
                <FaCheck className="w-4 h-4" />
            </motion.div>
        )}
        <FaCalendar className={`w-8 h-8 mb-3 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`} />
        <div className="font-black text-lg text-gray-900">{freq.label}</div>
        <div className="text-sm text-gray-600 mt-1">Every {freq.interval_in_days} days</div>
        {isSelected && (
            <div className="mt-3 text-xs text-emerald-600 font-bold">
                ✓ Selected
            </div>
        )}
    </button>
);

const KitReview = () => {
    const navigate = useNavigate();
    const { items, deliveryFrequency, getTotalPrice, getItemCount, clearKit } = useKitStore();
    const { setFrequency, confirmKit } = useKit();
    const { products } = useProducts();
    const [frequencies, setFrequencies] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState(deliveryFrequency);
    const [isConfirming, setIsConfirming] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Calculate environmental impact
    // AI-Powered Environmental Impact Calculation based on category analysis
    const calculateImpact = () => {
        let metrics = { plastic: 0, carbon: 0, water: 0, trees: 0 };

        items.forEach(item => {
            const product = products.find(p => p.id === item.product_id);
            if (!product) return;

            const qty = item.quantity;

            // Category-specific impact factors (simulating AI analysis)
            switch (product.category) {
                case 'Bags': // High plastic replacement
                    metrics.plastic += 50 * qty;
                    metrics.carbon += 1.5 * qty;
                    metrics.water += 200 * qty;
                    break;
                case 'Drinkware': // Very high plastic bottle replacement
                    metrics.plastic += 150 * qty;
                    metrics.carbon += 3.0 * qty;
                    metrics.water += 100 * qty;
                    break;
                case 'Apparel': // High water and carbon impact
                    metrics.carbon += 4.5 * qty;
                    metrics.water += 500 * qty;
                    metrics.trees += 0.2 * qty;
                    break;
                case 'Kitchen': // Moderate all-round
                    metrics.plastic += 30 * qty;
                    metrics.carbon += 1.0 * qty;
                    metrics.water += 50 * qty;
                    break;
                default: // Baseline
                    metrics.plastic += 10 * qty;
                    metrics.carbon += 0.5 * qty;
                    metrics.water += 20 * qty;
            }
            // Bonus for high sustainability score
            if ((product.sustainability_score || 0) > 90) {
                metrics.trees += 0.1 * qty;
            }
        });

        return {
            plastic: metrics.plastic.toFixed(0),
            carbon: metrics.carbon.toFixed(1),
            water: metrics.water.toFixed(0),
            trees: Math.max(1, metrics.trees).toFixed(1) // Always plant at least 1 tree
        };
    };

    const impact = calculateImpact();

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
                // Fallback frequencies
                setFrequencies([
                    { id: 1, label: 'Weekly', interval_in_days: 7 },
                    { id: 2, label: 'Bi-Weekly', interval_in_days: 14 },
                    { id: 3, label: 'Monthly', interval_in_days: 30 },
                    { id: 4, label: 'Quarterly', interval_in_days: 90 }
                ]);
                if (!selectedFrequency) setSelectedFrequency(1);
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <FaBox className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-gray-900 mb-2">Your Kit is Empty</h2>
                    <p className="text-gray-600 mb-8">Add some eco-friendly products to get started</p>
                    <Button onClick={() => navigate('/builder')} size="lg">
                        Start Building
                    </Button>
                </motion.div>
            </div>
        );
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                        <FaCheck className="w-16 h-16 text-white" />
                    </motion.div>
                    <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
                        Kit Confirmed!
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">Your sustainable journey begins now</p>
                    <div className="flex items-center justify-center gap-2 text-emerald-600">
                        <FaLeaf className="animate-bounce" />
                        <span className="text-sm font-medium">Making the world greener, one kit at a time</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-8 py-4">
                    <Breadcrumbs />
                </div>
                <div className="container mx-auto px-8 py-8">
                    <button
                        onClick={() => navigate('/builder')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors group"
                    >
                        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Builder
                    </button>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black bg-gradient-to-r from-gray-900 via-emerald-800 to-emerald-600 bg-clip-text text-transparent"
                    >
                        Review Your Eco Kit
                    </motion.h1>
                    <p className="text-gray-600 mt-2 text-lg">Finalize your subscription and see your environmental impact</p>
                </div>
            </div>

            <div className="container mx-auto px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Kit Items & Frequency */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Environmental Impact Dashboard */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                                    <FaLeaf className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900">Your Environmental Impact</h2>
                                    <p className="text-sm text-gray-600">Per month with this kit</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <ImpactMetric
                                    icon={FaRecycle}
                                    value={impact.plastic}
                                    label="Plastic Bottles Saved"
                                    color="from-blue-500 to-cyan-600"
                                />
                                <ImpactMetric
                                    icon={FaLeaf}
                                    value={`${impact.carbon}kg`}
                                    label="CO₂ Reduced"
                                    color="from-green-500 to-emerald-600"
                                />
                                <ImpactMetric
                                    icon={FaWater}
                                    value={`${impact.water}L`}
                                    label="Water Saved"
                                    color="from-cyan-500 to-blue-600"
                                />
                                <ImpactMetric
                                    icon={FaTree}
                                    value={impact.trees}
                                    label="Trees Planted"
                                    color="from-emerald-500 to-green-600"
                                />
                            </div>
                        </motion.div>

                        {/* Kit Items */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-gray-900">Your Items</h2>
                                <button
                                    onClick={() => navigate('/builder')}
                                    className="flex items-center text-emerald-600 hover:text-emerald-700 font-bold transition-colors group"
                                >
                                    <FaEdit className="mr-2 group-hover:rotate-12 transition-transform" />
                                    Edit Kit
                                </button>
                            </div>

                            <div className="space-y-4">
                                {items.map((item, idx) => {
                                    const product = products.find(p => p.id === item.product_id);
                                    if (!product) return null;

                                    return (
                                        <motion.div
                                            key={item.product_id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-2xl border border-gray-100"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-24 h-24 rounded-xl object-cover shadow-md"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                                                {product.sustainability_score && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <FaStar className="w-3 h-3 text-emerald-600" />
                                                        <span className="text-xs text-emerald-600 font-bold">
                                                            {product.sustainability_score}% Eco Score
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-emerald-600">
                                                    ₹{(product.price * item.quantity).toFixed(2)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ₹{product.price} each
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Delivery Frequency */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <FaTruck className="w-6 h-6 text-emerald-600" />
                                <h2 className="text-2xl font-black text-gray-900">Delivery Frequency</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {frequencies.map((freq) => (
                                    <FrequencyCard
                                        key={freq.id}
                                        freq={freq}
                                        isSelected={selectedFrequency === freq.id}
                                        onClick={() => setSelectedFrequency(freq.id)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 rounded-3xl p-8 text-white sticky top-8 shadow-2xl"
                        >
                            <h2 className="text-2xl font-black mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                    <span className="text-emerald-100">Items ({getItemCount(products)})</span>
                                    <span className="font-bold text-lg">₹{getTotalPrice(products).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                    <span className="text-emerald-100">Shipping</span>
                                    <span className="font-bold text-lg">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-2xl font-black">
                                    <span>Total</span>
                                    <span>₹{getTotalPrice(products).toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-emerald-100">
                                    Per delivery • Cancel anytime
                                </p>
                            </div>

                            <Button
                                onClick={handleConfirm}
                                disabled={isConfirming || !selectedFrequency}
                                className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-bold text-lg py-6 shadow-xl"
                                size="lg"
                            >
                                {isConfirming ? (
                                    <span className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Confirming...
                                    </span>
                                ) : (
                                    <>
                                        <FaCheck className="mr-2" />
                                        Confirm Subscription
                                    </>
                                )}
                            </Button>

                            <div className="mt-6 space-y-3 text-sm text-emerald-100">
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
                                <div className="flex items-start gap-2">
                                    <FaCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Track your environmental impact</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KitReview;
