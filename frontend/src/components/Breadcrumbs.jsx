import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Breadcrumbs = () => {
    const location = useLocation();

    const pathMap = {
        '/': 'Home',
        '/builder': 'Build Your Kit',
        '/review': 'Review & Confirm',
        '/products': 'Products'
    };

    const paths = location.pathname.split('/').filter(Boolean);

    const breadcrumbs = [
        { name: 'Home', path: '/' },
        ...paths.map((path, index) => ({
            name: pathMap[`/${path}`] || path,
            path: `/${paths.slice(0, index + 1).join('/')}`
        }))
    ];

    return (
        <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
                <motion.div
                    key={crumb.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                >
                    {index === 0 ? (
                        <Link
                            to={crumb.path}
                            className="flex items-center gap-1 text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                            <FaHome className="w-4 h-4" />
                            <span>{crumb.name}</span>
                        </Link>
                    ) : (
                        <>
                            <FaChevronRight className="w-3 h-3 text-gray-400" />
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-gray-900 font-bold">{crumb.name}</span>
                            ) : (
                                <Link
                                    to={crumb.path}
                                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                                >
                                    {crumb.name}
                                </Link>
                            )}
                        </>
                    )}
                </motion.div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
