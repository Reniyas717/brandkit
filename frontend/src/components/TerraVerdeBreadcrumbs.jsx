import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { GiTreeBranch } from 'react-icons/gi';
import { motion } from 'framer-motion';

const TerraVerdeBreadcrumbs = ({ items = [] }) => {
    const location = useLocation();

    // Default path mapping for auto-detection
    const pathMap = {
        '/': 'Home',
        '/brand/terra-verde': 'Terra Verde',
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
        ...location.pathname.split('/').filter(Boolean).map((path, index, arr) => {
            const fullPath = `/${arr.slice(0, index + 1).join('/')}`;
            return {
                name: pathMap[fullPath] || path,
                path: fullPath
            };
        })
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 mt-24 z-30 shadow-sm sticky top-20"
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
                                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-200 font-medium hover:bg-green-500/10 px-2 py-1 rounded-lg"
                                >
                                    <FaHome className="w-4 h-4" />
                                    <span>{crumb.name}</span>
                                </Link>
                            ) : (
                                <>
                                    <FaChevronRight className="w-3 h-3 text-gray-600" />
                                    {crumb.path ? (
                                        <Link
                                            to={crumb.path}
                                            className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-medium hover:bg-green-500/10 px-2 py-1 rounded-lg capitalize"
                                        >
                                            {crumb.name}
                                        </Link>
                                    ) : (
                                        <span className="text-green-400 font-semibold px-2 py-1 capitalize flex items-center gap-2">
                                            <GiTreeBranch className="w-4 h-4" />
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

export default TerraVerdeBreadcrumbs;