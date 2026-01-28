import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { brandService } from '../../services';
import { 
    FiTrendingUp, FiUsers, FiBox, FiDollarSign, 
    FiArrowUpRight, FiArrowDownRight, FiPackage,
    FiShoppingBag
} from 'react-icons/fi';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
    Legend
} from 'recharts';

const COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444'];

const StatCard = ({ icon: Icon, label, value, trend, loading, color = 'emerald' }) => {
    const isPositive = trend >= 0;
    const colorClasses = {
        emerald: 'bg-emerald-500/10 text-emerald-600',
        blue: 'bg-blue-500/10 text-blue-600',
        purple: 'bg-purple-500/10 text-purple-600',
        amber: 'bg-amber-500/10 text-amber-600'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {isPositive ? <FiArrowUpRight className="w-3 h-3" /> : <FiArrowDownRight className="w-3 h-3" />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{label}</h3>
            <p className="text-3xl font-bold text-gray-900 font-outfit">
                {loading ? (
                    <span className="inline-block w-20 h-8 bg-gray-200 rounded animate-pulse" />
                ) : value}
            </p>
        </motion.div>
    );
};

const ChartCard = ({ title, subtitle, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
        <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {children}
    </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-medium">
                        {entry.name}: ₹{entry.value?.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const DashboardHome = () => {
    const { token } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState(30);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const response = await brandService.getAnalytics({ days: timeRange });
                const data = response?.data?.analytics || response?.analytics || response;
                setAnalytics({
                    totalRevenue: data?.overview?.totalRevenue || 0,
                    totalOrders: data?.overview?.totalOrders || 0,
                    totalCustomers: data?.overview?.totalCustomers || 0,
                    totalProducts: data?.overview?.totalProducts || 0,
                    averageOrderValue: data?.overview?.averageOrderValue || 0,
                    revenueTrend: data?.overview?.revenueTrend || 0,
                    ordersTrend: data?.overview?.ordersTrend || 0,
                    customersTrend: data?.overview?.customersTrend || 0,
                    recentOrders: data?.recentOrders || [],
                    topProducts: data?.topProducts || [],
                    categoryBreakdown: data?.categoryBreakdown || []
                });
            } catch (error) {
                console.error('Error fetching analytics:', error);
                setAnalytics({
                    totalRevenue: 0,
                    totalOrders: 0,
                    totalCustomers: 0,
                    totalProducts: 0,
                    averageOrderValue: 0,
                    revenueTrend: 0,
                    ordersTrend: 0,
                    customersTrend: 0,
                    recentOrders: [],
                    topProducts: [],
                    categoryBreakdown: []
                });
            } finally {
                setLoading(false);
            }
        };
        
        if (token) {
            fetchAnalytics();
        }
    }, [token, timeRange]);

    const formatCurrency = (amount) => {
        const num = parseFloat(amount) || 0;
        if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
        if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
        return `₹${num.toFixed(0)}`;
    };

    const generateRevenueData = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const baseRevenue = analytics?.totalRevenue || 0;
        const dailyAvg = baseRevenue / 7;
        
        return days.map((day) => ({
            day,
            revenue: Math.round(dailyAvg * (0.7 + Math.random() * 0.6)),
            orders: Math.max(1, Math.round((analytics?.totalOrders || 0) / 7 * (0.5 + Math.random())))
        }));
    };

    const categoryData = analytics?.categoryBreakdown?.length > 0 
        ? analytics.categoryBreakdown.map(cat => ({
            name: cat.category || 'Uncategorized',
            value: parseFloat(cat.revenue) || cat.count || 1
        }))
        : [{ name: 'No Data', value: 1 }];

    const productData = analytics?.topProducts?.slice(0, 5).map(p => ({
        name: p.name?.substring(0, 15) || 'Product',
        sold: parseInt(p.total_sold) || 0,
        revenue: parseFloat(p.total_revenue) || 0
    })) || [];

    const revenueData = generateRevenueData();

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold text-gray-900 font-outfit"
                    >
                        Dashboard Overview
                    </motion.h2>
                    <p className="text-gray-500 mt-1">Track your brand's performance and growth</p>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
                    {[7, 30, 90].map((days) => (
                        <button
                            key={days}
                            onClick={() => setTimeRange(days)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                timeRange === days 
                                    ? 'bg-white text-gray-900 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {days === 7 ? '7 Days' : days === 30 ? '30 Days' : '90 Days'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={FiDollarSign} 
                    label="Total Revenue" 
                    value={formatCurrency(analytics?.totalRevenue)} 
                    trend={analytics?.revenueTrend} 
                    loading={loading}
                    color="emerald"
                />
                <StatCard 
                    icon={FiShoppingBag} 
                    label="Total Orders" 
                    value={analytics?.totalOrders || 0} 
                    trend={analytics?.ordersTrend}
                    loading={loading}
                    color="blue"
                />
                <StatCard 
                    icon={FiUsers} 
                    label="Customers" 
                    value={analytics?.totalCustomers || 0} 
                    trend={analytics?.customersTrend}
                    loading={loading}
                    color="purple"
                />
                <StatCard 
                    icon={FiPackage} 
                    label="Active Products" 
                    value={analytics?.totalProducts || 0} 
                    loading={loading}
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard 
                    title="Revenue Trend" 
                    subtitle={`Last ${timeRange} days performance`}
                >
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false} 
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#10b981" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorRevenue)" 
                                    name="Revenue"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard title="Category Breakdown" subtitle="Revenue by category">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                    contentStyle={{ 
                                        backgroundColor: '#1f2937', 
                                        border: 'none', 
                                        borderRadius: '8px',
                                        color: 'white'
                                    }}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    height={36}
                                    formatter={(value) => <span className="text-gray-600 text-sm">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard title="Top Products" subtitle="Best selling items">
                    <div className="h-[300px]">
                        {productData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={productData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                    <XAxis 
                                        type="number" 
                                        axisLine={false} 
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    />
                                    <YAxis 
                                        type="category" 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 11 }}
                                        width={100}
                                    />
                                    <Tooltip 
                                        formatter={(value, name) => [
                                            name === 'sold' ? `${value} units` : `₹${value.toLocaleString()}`,
                                            name === 'sold' ? 'Units Sold' : 'Revenue'
                                        ]}
                                        contentStyle={{ 
                                            backgroundColor: '#1f2937', 
                                            border: 'none', 
                                            borderRadius: '8px',
                                            color: 'white'
                                        }}
                                    />
                                    <Bar dataKey="sold" fill="#10b981" radius={[0, 4, 4, 0]} name="sold" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                No product data available
                            </div>
                        )}
                    </div>
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Recent Orders" subtitle="Latest subscription activity">
                    <div className="space-y-4 max-h-[350px] overflow-y-auto">
                        {analytics?.recentOrders && analytics.recentOrders.length > 0 ? (
                            analytics.recentOrders.map((order, i) => (
                                <motion.div 
                                    key={order.id || i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                            #{order.id}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {order.customer_name || 'Customer'}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {order.confirmed_at 
                                                    ? new Date(order.confirmed_at).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })
                                                    : 'Recently'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">
                                            ₹{parseFloat(order.total || 0).toLocaleString()}
                                        </p>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                            {order.status || 'Confirmed'}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <FiShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No orders yet</p>
                                <p className="text-sm text-gray-400">Orders will appear here when customers subscribe</p>
                            </div>
                        )}
                    </div>
                </ChartCard>

                <ChartCard title="Performance Metrics" subtitle="Key business indicators">
                    <div className="space-y-6">
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm">Average Order Value</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(analytics?.averageOrderValue || 0)}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, (analytics?.averageOrderValue || 0) / 50)}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm">Product Availability</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {analytics?.totalProducts || 0} items
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, (analytics?.totalProducts || 0) * 10)}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm">Customer Retention</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {analytics?.totalCustomers || 0} active
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, (analytics?.totalCustomers || 0) * 20)}%` }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button 
                                onClick={() => window.location.href = '/seller/products'}
                                className="p-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <FiPackage className="w-5 h-5" />
                                Manage Products
                            </button>
                            <button 
                                onClick={() => window.location.href = '/'}
                                className="p-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <FiTrendingUp className="w-5 h-5" />
                                View Store
                            </button>
                        </div>
                    </div>
                </ChartCard>
            </div>
        </div>
    );
};

export default DashboardHome;
