import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { brandService } from '../../services';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiSave, FiImage } from 'react-icons/fi';

const ProductManager = () => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const categories = ['All', 'Bags', 'Kitchen', 'Stationery', 'Apparel', 'Drinkware'];

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Bags',
        price: '',
        image_url: '',
        is_available: true
    });

    // Fetch products
    useEffect(() => {
        fetchProducts();
    }, [token]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await brandService.getMyProducts();
            const productsData = response?.data?.products || response?.products || [];
            setProducts(Array.isArray(productsData) ? productsData : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description || '',
                category: product.category,
                price: product.price.toString(),
                image_url: product.image_url || '',
                is_available: product.is_available
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                category: 'Bags',
                price: '',
                image_url: '',
                is_available: true
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            category: 'Bags',
            price: '',
            image_url: '',
            is_available: true
        });
    };

    const handleSave = async () => {
        if (!formData.name || !formData.price) {
            alert('Please fill in required fields');
            return;
        }

        setSaving(true);
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingProduct) {
                // Update existing product
                await brandService.updateProduct(editingProduct.id, productData);
                setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
            } else {
                // Create new product
                const response = await brandService.createProduct(productData);
                const newProduct = response?.data?.product || response?.product || { id: Date.now(), ...productData };
                setProducts([newProduct, ...products]);
            }
            handleCloseModal();
            // Refetch to get the latest data
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product: ' + (error.message || 'Unknown error'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await brandService.deleteProduct(productId);
            setProducts(products.filter(p => p.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
        setDeleteConfirm(null);
    };

    const handleToggleAvailability = async (product) => {
        const updatedProduct = { ...product, is_available: !product.is_available };
        try {
            await brandService.updateProduct(product.id, { is_available: !product.is_available });
            setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Filter products
    const filteredProducts = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                    <p className="text-gray-500">Manage your product catalog ({products.length} products)</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <FiPlus className="mr-2" />
                    Add Product
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${!product.is_available ? 'opacity-60' : ''}`}
                    >
                        <div className="relative aspect-square bg-gray-100">
                            <img
                                src={product.image_url || 'https://placehold.co/400x400/png?text=Product'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {!product.is_available && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                                        Unavailable
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                                <span className="font-bold text-emerald-600">₹{product.price}</span>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleToggleAvailability(product)}
                                    className={`text-xs px-3 py-1 rounded-full ${
                                        product.is_available 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {product.is_available ? 'Available' : 'Unavailable'}
                                </button>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleOpenModal(product)}
                                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                    >
                                        <FiEdit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setDeleteConfirm(product.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                    <FiImage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900">No products found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="fixed inset-0 bg-black z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h3>
                                    <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Enter product name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="Describe your product"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                                            >
                                                {categories.filter(c => c !== 'All').map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <input
                                            type="url"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {formData.image_url && (
                                            <img src={formData.image_url} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg" />
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="is_available"
                                            checked={formData.is_available}
                                            onChange={(e) => setFormData({...formData, is_available: e.target.checked})}
                                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                        />
                                        <label htmlFor="is_available" className="ml-2 text-sm text-gray-700">
                                            Available for purchase
                                        </label>
                                    </div>
                                </div>
                                <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                                    <button
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        {saving ? (
                                            <span className="animate-spin mr-2">⏳</span>
                                        ) : (
                                            <FiSave className="mr-2" />
                                        )}
                                        {editingProduct ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeleteConfirm(null)}
                            className="fixed inset-0 bg-black z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FiTrash2 className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
                                <p className="text-gray-500 mb-6">This action cannot be undone.</p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-6 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deleteConfirm)}
                                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductManager;
