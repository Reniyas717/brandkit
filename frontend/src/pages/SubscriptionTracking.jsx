import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPackage, FiCalendar, FiTruck, FiClock, FiChevronDown,
    FiChevronUp, FiEdit2, FiPause, FiPlay, FiX, FiCheck,
    FiHome, FiShoppingBag, FiDroplet, FiWind
} from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';
import { kitService } from '../services';

// Helper function to safely format price
const formatPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    return numPrice.toFixed(2);
};

// Helper function to safely format number
const formatNumber = (num) => {
    const parsed = parseFloat(num) || 0;
    return parsed.toFixed(1);
};

const SubscriptionTracking = () => {
    const { user } = useAuth();
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('active');

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const data = await kitService.getMySubscriptions();
            setSubscriptions(data || []);
        } catch (err) {
            console.error('Error fetching subscriptions:', err);
            setError('Failed to load subscriptions');
        } finally {
            setLoading(false);
        }
    };

    const activeSubscriptions = subscriptions.filter(s => s.status === 'confirmed' || s.status === 'active');
    const historySubscriptions = subscriptions.filter(s => s.status === 'completed' || s.status === 'cancelled');

    // Calculate stats from subscriptions
    const stats = {
        activeKits: activeSubscriptions.length,
        totalDeliveries: subscriptions.reduce((acc, s) => acc + (parseInt(s.delivery_count) || 0), 0),
        plasticsSaved: subscriptions.reduce((acc, s) => {
            const items = s.items || [];
            return acc + items.reduce((sum, item) => sum + ((parseInt(item.quantity) || 0) * 0.5), 0);
        }, 0),
        co2Reduced: subscriptions.reduce((acc, s) => {
            const items = s.items || [];
            return acc + items.reduce((sum, item) => sum + ((parseInt(item.quantity) || 0) * 0.2), 0);
        }, 0)
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl font-medium text-gray-600">Loading your subscriptions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                            <FiHome className="w-5 h-5" />
                            <span className="font-medium">Home</span>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">My Subscriptions</h1>
                        <Link to="/builder" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                            <FiShoppingBag className="w-5 h-5" />
                            <span className="font-medium">Build Kit</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <FiPackage className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{stats.activeKits}</p>
                        <p className="text-sm text-gray-500">Active Kits</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FiTruck className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{stats.totalDeliveries}</p>
                        <p className="text-sm text-gray-500">Total Deliveries</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                <RiLeafLine  className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.plasticsSaved)} kg</p>
                        <p className="text-sm text-gray-500">Plastics Saved</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                <FiWind className="w-5 h-5 text-teal-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{formatNumber(stats.co2Reduced)} kg</p>
                        <p className="text-sm text-gray-500">CO₂ Reduced</p>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            activeTab === 'active'
                                ? 'bg-emerald-500 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-emerald-50'
                        }`}
                    >
                        Active ({activeSubscriptions.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            activeTab === 'history'
                                ? 'bg-emerald-500 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-emerald-50'
                        }`}
                    >
                        History ({historySubscriptions.length})
                    </button>
                </div>

                {/* Subscriptions List */}
                <AnimatePresence mode="wait">
                    {activeTab === 'active' ? (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-4"
                        >
                            {activeSubscriptions.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-emerald-100">
                                    <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Subscriptions</h3>
                                    <p className="text-gray-500 mb-6">Start building your eco-friendly kit today!</p>
                                    <Link
                                        to="/builder"
                                        className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors"
                                    >
                                        <FiShoppingBag className="w-5 h-5" />
                                        Build Your First Kit
                                    </Link>
                                </div>
                            ) : (
                                activeSubscriptions.map((subscription) => (
                                    <SubscriptionCard key={subscription.id} subscription={subscription} />
                                ))
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            {historySubscriptions.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-emerald-100">
                                    <FiClock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Subscription History</h3>
                                    <p className="text-gray-500">Your completed and cancelled subscriptions will appear here.</p>
                                </div>
                            ) : (
                                historySubscriptions.map((subscription) => (
                                    <SubscriptionCard key={subscription.id} subscription={subscription} isHistory />
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

// Subscription Card Component
const SubscriptionCard = ({ subscription, isHistory = false }) => {
    const [expanded, setExpanded] = useState(false);

    const items = subscription.items || [];
    const totalPrice = parseFloat(subscription.total_price) || items.reduce((sum, item) => {
        return sum + ((parseFloat(item.price_at_addition) || parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1));
    }, 0);

    // Calculate next delivery date
    const getNextDeliveryDate = () => {
        if (!subscription.delivery_frequency) return 'Not scheduled';
        const days = subscription.delivery_frequency.days || 30;
        const lastDelivery = subscription.last_delivery_date ? new Date(subscription.last_delivery_date) : new Date(subscription.confirmed_at || subscription.created_at);
        const nextDelivery = new Date(lastDelivery);
        nextDelivery.setDate(nextDelivery.getDate() + days);
        return nextDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Calculate days until next delivery
    const getDaysUntilDelivery = () => {
        if (!subscription.delivery_frequency) return null;
        const days = subscription.delivery_frequency.days || 30;
        const lastDelivery = subscription.last_delivery_date ? new Date(subscription.last_delivery_date) : new Date(subscription.confirmed_at || subscription.created_at);
        const nextDelivery = new Date(lastDelivery);
        nextDelivery.setDate(nextDelivery.getDate() + days);
        const today = new Date();
        const diffTime = nextDelivery - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const daysUntil = getDaysUntilDelivery();

    return (
        <motion.div
            layout
            className={`bg-white rounded-2xl shadow-lg border overflow-hidden ${
                isHistory ? 'border-gray-200 opacity-75' : 'border-emerald-100'
            }`}
        >
            {/* Header */}
            <div
                className="p-6 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isHistory ? 'bg-gray-100' : 'bg-emerald-100'
                        }`}>
                            <FiPackage className={`w-6 h-6 ${isHistory ? 'text-gray-500' : 'text-emerald-600'}`} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">
                                Eco Kit #{subscription.id}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {items.length} items • ₹{formatPrice(totalPrice)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {!isHistory && daysUntil !== null && (
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Next Delivery</p>
                                <p className="font-bold text-emerald-600">
                                    {daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
                                </p>
                            </div>
                        )}

                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            subscription.status === 'confirmed' || subscription.status === 'active'
                                ? 'bg-emerald-100 text-emerald-700'
                                : subscription.status === 'completed'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'
                        }`}>
                            {subscription.status?.charAt(0).toUpperCase() + subscription.status?.slice(1)}
                        </div>

                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FiChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100"
                    >
                        <div className="p-6">
                            {/* Delivery Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Frequency</p>
                                    <p className="font-medium text-gray-800">
                                        {subscription.delivery_frequency?.name || 'Monthly'}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Next Delivery</p>
                                    <p className="font-medium text-gray-800">{getNextDeliveryDate()}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Deliveries</p>
                                    <p className="font-medium text-gray-800">{subscription.delivery_count || 0}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Total Spent</p>
                                    <p className="font-medium text-gray-800">
                                        ₹{formatPrice(totalPrice * (subscription.delivery_count || 1))}
                                    </p>
                                </div>
                            </div>

                            {/* Items */}
                            <h4 className="font-bold text-gray-800 mb-4">Kit Items</h4>
                            <div className="space-y-3 mb-6">
                                {items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                                        <img
                                            src={item.image_url || item.image || '/placeholder-product.png'}
                                            alt={item.name || item.product_name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-product.png';
                                            }}
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{item.name || item.product_name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                                        </div>
                                        <p className="font-bold text-gray-800">
                                            ₹{formatPrice((parseFloat(item.price_at_addition) || parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1))}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Environmental Impact */}
                            <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                                <h4 className="font-bold text-emerald-800 mb-3">Environmental Impact</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <FiDroplet className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                                        <p className="text-lg font-bold text-gray-800">
                                            {formatNumber(items.reduce((sum, item) => sum + ((parseInt(item.quantity) || 1) * 2), 0))}L
                                        </p>
                                        <p className="text-xs text-gray-500">Water Saved</p>
                                    </div>
                                    <div className="text-center">
                                        <RiLeafLine  className="w-6 h-6 text-green-500 mx-auto mb-1" />
                                        <p className="text-lg font-bold text-gray-800">
                                            {formatNumber(items.reduce((sum, item) => sum + ((parseInt(item.quantity) || 1) * 0.5), 0))}kg
                                        </p>
                                        <p className="text-xs text-gray-500">Plastic Avoided</p>
                                    </div>
                                    <div className="text-center">
                                        <FiWind className="w-6 h-6 text-teal-500 mx-auto mb-1" />
                                        <p className="text-lg font-bold text-gray-800">
                                            {formatNumber(items.reduce((sum, item) => sum + ((parseInt(item.quantity) || 1) * 0.2), 0))}kg
                                        </p>
                                        <p className="text-xs text-gray-500">CO₂ Reduced</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {!isHistory && (
                                <div className="flex gap-3">
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                                        <FiEdit2 className="w-4 h-4" />
                                        Modify Kit
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-amber-100 text-amber-700 px-4 py-3 rounded-xl font-medium hover:bg-amber-200 transition-colors">
                                        <FiPause className="w-4 h-4" />
                                        Pause
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-3 rounded-xl font-medium hover:bg-red-200 transition-colors">
                                        <FiX className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SubscriptionTracking;
