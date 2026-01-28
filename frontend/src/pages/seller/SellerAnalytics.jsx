import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import {
    FiTrendingUp, FiUsers, FiBox, FiDollarSign, FiShoppingCart,
    FiCalendar, FiPieChart, FiBarChart2, FiArrowUp, FiArrowDown
} from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, trend, color = 'emerald' }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-${color}-100 text-${color}-600`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend !== undefined && (
                <span className={`text-sm font-medium flex items-center gap-1 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend >= 0 ? <FiArrowUp /> : <FiArrowDown />}
                    {Math.abs(trend)}%
                </span>
            )}
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{label}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </motion.div>
);

const OrderRow = ({ order }) => (
    <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">#{order.id}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{order.customer_name}</div>
            <div className="text-xs text-gray-500">{order.customer_email}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{order.items_count} items</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">₹{order.total_price}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                order.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
            }`}>
                {order.status}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {new Date(order.created_at).toLocaleDateString()}
        </td>
    </tr>
);

const TopProduct = ({ product, rank }) => (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
            rank === 1 ? 'bg-yellow-400 text-white' :
            rank === 2 ? 'bg-gray-400 text-white' :
            rank === 3 ? 'bg-amber-600 text-white' :
            'bg-gray-200 text-gray-600'
        } font-bold text-sm`}>
            {rank}
        </div>
        <img
            src={product.image_url || 'https://placehold.co/100x100/png?text=Product'}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
            <p className="text-sm text-gray-500">{product.total_sold} sold</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-emerald-600">₹{product.total_revenue}</p>
        </div>
    </div>
);

const SellerAnalytics = () => {
    const { theme } = useTheme();
    const { token, user } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState('30'); // days

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/brands/me/analytics?days=${dateRange}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setAnalytics(response.data.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching analytics:', err);
                // Use mock data for demo
                setAnalytics({
                    overview: {
                        totalRevenue: 124500,
                        totalOrders: 45,
                        totalCustomers: 38,
                        averageOrderValue: 2767,
                        revenueTrend: 12,
                        ordersTrend: 8,
                        customersTrend: 24
                    },
                    recentOrders: [
                        { id: 1001, customer_name: 'Amit Sharma', customer_email: 'amit@example.com', items_count: 3, total_price: 4999, status: 'confirmed', created_at: new Date().toISOString() },
                        { id: 1002, customer_name: 'Priya Patel', customer_email: 'priya@example.com', items_count: 2, total_price: 2599, status: 'confirmed', created_at: new Date(Date.now() - 86400000).toISOString() },
                        { id: 1003, customer_name: 'Raj Kumar', customer_email: 'raj@example.com', items_count: 5, total_price: 7899, status: 'draft', created_at: new Date(Date.now() - 172800000).toISOString() },
                        { id: 1004, customer_name: 'Neha Singh', customer_email: 'neha@example.com', items_count: 1, total_price: 1299, status: 'confirmed', created_at: new Date(Date.now() - 259200000).toISOString() },
                        { id: 1005, customer_name: 'Vikram Mehta', customer_email: 'vikram@example.com', items_count: 4, total_price: 5499, status: 'confirmed', created_at: new Date(Date.now() - 345600000).toISOString() },
                    ],
                    topProducts: [
                        { id: 1, name: 'Organic Hemp Tote', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=100', total_sold: 45, total_revenue: 112455 },
                        { id: 2, name: 'Bamboo Utensil Set', image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=100', total_sold: 38, total_revenue: 49362 },
                        { id: 3, name: 'Steel Lunch Box', image_url: 'https://images.unsplash.com/photo-1621303837174-8234675fde72?q=80&w=100', total_sold: 32, total_revenue: 57568 },
                        { id: 4, name: 'Recycled Notebook', image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=100', total_sold: 28, total_revenue: 16772 },
                        { id: 5, name: 'Organic Cotton Tee', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=100', total_sold: 25, total_revenue: 32475 },
                    ],
                    categoryBreakdown: [
                        { category: 'Bags', percentage: 35, revenue: 43575 },
                        { category: 'Kitchen', percentage: 25, revenue: 31125 },
                        { category: 'Drinkware', percentage: 20, revenue: 24900 },
                        { category: 'Apparel', percentage: 12, revenue: 14940 },
                        { category: 'Stationery', percentage: 8, revenue: 9960 },
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [token, dateRange]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                    <p className="text-gray-500">Track your brand's performance</p>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                        <option value="365">Last year</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={FiDollarSign}
                    label="Total Revenue"
                    value={`₹${analytics?.overview?.totalRevenue?.toLocaleString() || 0}`}
                    trend={analytics?.overview?.revenueTrend}
                    color="emerald"
                />
                <StatCard
                    icon={FiShoppingCart}
                    label="Total Orders"
                    value={analytics?.overview?.totalOrders || 0}
                    trend={analytics?.overview?.ordersTrend}
                    color="blue"
                />
                <StatCard
                    icon={FiUsers}
                    label="Customers"
                    value={analytics?.overview?.totalCustomers || 0}
                    trend={analytics?.overview?.customersTrend}
                    color="purple"
                />
                <StatCard
                    icon={FiBarChart2}
                    label="Avg. Order Value"
                    value={`₹${analytics?.overview?.averageOrderValue?.toLocaleString() || 0}`}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FiShoppingCart className="text-emerald-600" />
                            Recent Orders
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {analytics?.recentOrders?.map((order) => (
                                    <OrderRow key={order.id} order={order} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FiTrendingUp className="text-emerald-600" />
                            Top Products
                        </h3>
                    </div>
                    <div className="p-4 space-y-3">
                        {analytics?.topProducts?.map((product, index) => (
                            <TopProduct key={product.id} product={product} rank={index + 1} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <FiPieChart className="text-emerald-600" />
                        Sales by Category
                    </h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {analytics?.categoryBreakdown?.map((cat, index) => (
                            <div key={cat.category} className="text-center">
                                <div className="relative w-24 h-24 mx-auto mb-3">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            fill="none"
                                            stroke="#e5e7eb"
                                            strokeWidth="8"
                                        />
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            fill="none"
                                            stroke={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][index]}
                                            strokeWidth="8"
                                            strokeDasharray={`${cat.percentage * 2.51} 251`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-lg font-bold text-gray-900">{cat.percentage}%</span>
                                    </div>
                                </div>
                                <h4 className="font-medium text-gray-900">{cat.category}</h4>
                                <p className="text-sm text-gray-500">₹{cat.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAnalytics;
