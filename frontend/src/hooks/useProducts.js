import { useState, useEffect } from 'react';
import { productService } from '../services';

export const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productService.getAllProducts(filters);
                setProducts(response.data.products);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [JSON.stringify(filters)]);

    return { products, loading, error };
};
