import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { FiLogOut, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled 
                ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-neutral-100' 
                : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
                            <FaLeaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-neutral-900">
                            Brand<span className="text-emerald-600">Kit</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { name: 'Explore', path: '/explore' },
                            { name: 'Brands', path: '/brands' },
                            { name: 'Impact', path: '/impact' },
                            { name: 'About', path: '/about' },
                        ].map((item) => (
                            <Link 
                                key={item.name}
                                to={item.path}
                                className="text-sm font-medium text-neutral-600 hover:text-emerald-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100">
                                    <FiUser className="w-4 h-4 text-neutral-500" />
                                    <span className="text-sm text-neutral-700 font-medium">
                                        {user?.name?.split(' ')[0]}
                                    </span>
                                </div>
                                
                                {(user?.role === 'seller' || user?.role === 'admin') && (
                                    <Link 
                                        to="/seller" 
                                        className="px-4 py-2 text-sm font-medium rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                
                                <Link
                                    to="/builder"
                                    className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                                >
                                    Build Kit
                                </Link>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="p-2 rounded-full text-neutral-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    title="Sign out"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link 
                                    to="/login" 
                                    className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6" />
                            ) : (
                                <FiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-neutral-100 bg-white">
                        <div className="space-y-1">
                            {[
                                { name: 'Explore', path: '/explore' },
                                { name: 'Brands', path: '/brands' },
                                { name: 'Impact', path: '/impact' },
                                { name: 'About', path: '/about' },
                            ].map((item) => (
                                <Link 
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/builder"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-lg text-center"
                                    >
                                        Build Kit
                                    </Link>
                                    {(user?.role === 'seller' || user?.role === 'admin') && (
                                        <Link 
                                            to="/seller"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full px-4 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg text-center"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <button 
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="block w-full px-4 py-3 text-red-500 text-sm font-medium rounded-lg text-center hover:bg-red-50"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full px-4 py-3 text-neutral-700 text-sm font-medium rounded-lg text-center hover:bg-neutral-100"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-lg text-center"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
