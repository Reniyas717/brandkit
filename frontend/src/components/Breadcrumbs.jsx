import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Breadcrumbs = ({ items = [] }) => {
    const location = useLocation();

    // Default path mapping for auto-detection
    const pathMap = {
        '/': 'Home',
        '/builder': 'Build Your Kit',
        '/review': 'Review & Confirm',
        '/products': 'Products'
    };

    // Use provided items or auto-detect from location
    const breadcrumbItems = items.length > 0 ? [
        { name: 'Home', path: '/' },
        ...items.map(item => ({
            name: item.label,
            path: item.href || null
        }))
    ] : [
        { name: 'Home', path: '/' },
        ...location.pathname.split('/').filter(Boolean).map((path, index, arr) => ({
            name: pathMap[`/${path}`] || path,
            path: `/${arr.slice(0, index + 1).join('/')}`
        }))
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md border-b border-gray-100 mt-20 z-30 shadow-sm"
        >
            <div className="container mx-auto px-6 py-4">
                <nav className="flex items-center space-x-2 text-sm">
                    {breadcrumbItems.map((crumb, index) => (
                        <motion.div
                            key={crumb.path || index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2"
                        >
                            {index === 0 ? (
                                <Link
                                    to={crumb.path}
                                    className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium hover:bg-emerald-50 px-2 py-1 rounded-lg"
                                >
                                    <FaHome className="w-4 h-4" />
                                    <span>{crumb.name}</span>
                                </Link>
                            ) : (
                                <>
                                    <FaChevronRight className="w-3 h-3 text-gray-400" />
                                    {crumb.path && index !== breadcrumbItems.length - 1 ? (
                                        <Link
                                            to={crumb.path}
                                            className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium hover:bg-emerald-50 px-2 py-1 rounded-lg"
                                        >
                                            {crumb.name}
                                        </Link>
                                    ) : (
                                        <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-xs">
                                            {crumb.name}
                                        </span>
                                    )}
                                </>
                            )}
                        </motion.div>
                    ))}
                </nav>
            </div>
        </motion.div>
    );
};

export default Breadcrumbs;
