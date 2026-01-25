import { useState, useEffect } from 'react';
import { brandService } from '../services';

export const useBrand = (identifier) => {
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setLoading(true);
                const response = await brandService.getBrandWithDetails(identifier);
                setBrand(response.data.brand);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (identifier) {
            fetchBrand();
        }
    }, [identifier]);

    return { brand, loading, error };
};
