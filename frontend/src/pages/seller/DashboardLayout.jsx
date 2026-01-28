import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiHome, FiPackage, FiSettings, FiLogOut, FiMenu, FiBarChart2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLink = ({ to, icon: Icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    const { theme } = useTheme(); // Use theme for active state colors

    return (
        <Link
            to={to}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? `bg-emerald-100 text-emerald-700`
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
            <span className="font-medium">{children}</span>
        </Link>
    );
};

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="text-2xl font-bold text-emerald-600">BrandKit<span className="text-gray-400">Seller</span></Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarLink to="/seller" icon={FiHome}>Overview</SidebarLink>
                    <SidebarLink to="/seller/products" icon={FiPackage}>Products</SidebarLink>
                    <SidebarLink to="/seller/analytics" icon={FiBarChart2}>Analytics</SidebarLink>
                    <SidebarLink to="/seller/settings" icon={FiSettings}>Brand Settings</SidebarLink>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-4 px-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0) || 'S'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                        <FiLogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-emerald-600">BrandKit</Link>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                        <FiMenu className="w-6 h-6" />
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
                        >
                            <nav className="p-4 space-y-2">
                                <SidebarLink to="/seller" icon={FiHome}>Overview</SidebarLink>
                                <SidebarLink to="/seller/products" icon={FiPackage}>Products</SidebarLink>
                                <SidebarLink to="/seller/analytics" icon={FiBarChart2}>Analytics</SidebarLink>
                                <SidebarLink to="/seller/settings" icon={FiSettings}>Brand Settings</SidebarLink>
                                <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 rounded-lg">
                                    <FiLogOut className="w-5 h-5" />
                                    <span>Sign Out</span>
                                </button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
