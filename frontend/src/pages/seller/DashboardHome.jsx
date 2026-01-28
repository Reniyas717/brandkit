import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { brandService } from '../../services';
import { FiTrendingUp, FiUsers, FiBox, FiDollarSign } from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, trend, loading }) => {
    const { theme } = useTheme();
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-emerald-100 text-emerald-600`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend !== undefined && (
                    <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
                {loading ? '...' : value}
            </p>
        </motion.div>
    );
};

const DashboardHome = () => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await brandService.getAnalytics({ days: 30 });
                const data = response?.data?.analytics || response?.analytics || response;
                // API returns { overview: {...}, recentOrders: [...], ... }
                setAnalytics({
                    totalRevenue: data?.overview?.totalRevenue || 0,
                    totalOrders: data?.overview?.totalOrders || 0,
                    totalCustomers: data?.overview?.totalCustomers || 0,
                    totalProducts: data?.overview?.totalProducts || 0,
                    revenueTrend: data?.overview?.revenueTrend,
                    ordersTrend: data?.overview?.ordersTrend,
                    customersTrend: data?.overview?.customersTrend,
                    recentOrders: data?.recentOrders || []
                });
            } catch (error) {
                console.error('Error fetching analytics:', error);
                // Set default values on error
                setAnalytics({
                    totalRevenue: 0,
                    totalOrders: 0,
                    totalCustomers: 0,
                    totalProducts: 0,
                    revenueTrend: 0,
                    ordersTrend: 0,
                    customersTrend: 0,
                    recentOrders: []
                });
            } finally {
                setLoading(false);
            }
        };
        
        if (token) {
            fetchAnalytics();
        }
    }, [token]);

    const formatCurrency = (amount) => {
        const num = parseFloat(amount) || 0;
        if (num >= 100000) {
            return `₹${(num / 100000).toFixed(1)}L`;
        } else if (num >= 1000) {
            return `₹${(num / 1000).toFixed(1)}K`;
        }
        return `₹${num.toFixed(0)}`;
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome back! Here is what is happening with your brand today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={FiDollarSign} 
                    label="Total Revenue" 
                    value={formatCurrency(analytics?.totalRevenue || 0)} 
                    trend={analytics?.revenueTrend} 
                    loading={loading}
                />
                <StatCard 
                    icon={FiBox} 
                    label="Total Orders" 
                    value={analytics?.totalOrders || 0} 
                    trend={analytics?.ordersTrend}
                    loading={loading}
                />
                <StatCard 
                    icon={FiUsers} 
                    label="Customers" 
                    value={analytics?.totalCustomers || 0} 
                    trend={analytics?.customersTrend}
                    loading={loading}
                />
                <StatCard 
                    icon={FiTrendingUp} 
                    label="Products" 
                    value={analytics?.totalProducts || 0} 
                    loading={loading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                        {analytics?.recentOrders && analytics.recentOrders.length > 0 ? (
                            analytics.recentOrders.map((order, i) => (
                                <div key={order.id || i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-bold">
                                            #{order.id}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Subscription Kit</p>
                                            <p className="text-xs text-gray-500">{order.confirmed_at ? new Date(order.confirmed_at).toLocaleDateString() : 'Recently'}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-900">₹{parseFloat(order.total || 0).toFixed(0)}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">No orders yet</p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-left">
                            <p className="font-bold text-emerald-700">Add Product</p>
                            <p className="text-xs text-gray-600 mt-1">Create a new listing</p>
                        </button>
                        <button className="p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-left">
                            <p className="font-bold text-emerald-700">Edit Brand</p>
                            <p className="text-xs text-gray-600 mt-1">Update brand story</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
