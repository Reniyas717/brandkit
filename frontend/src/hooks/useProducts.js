import { useState, useEffect } from 'react';
import { productService } from '../services';

export const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]); // Already correct - empty array default
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [JSON.stringify(filters)]); // Fix: stringify filters to prevent infinite loop

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productService.getAll(filters);
            setProducts(Array.isArray(data) ? data : []); // Ensure it's always an array
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message || 'Failed to fetch products');
            setProducts([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        error,
        refetch: fetchProducts
    };
};
