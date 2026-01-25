import { useState, useEffect } from 'react';
import { kitService } from '../services';
import { useKitStore } from '../store/kitStore';

export const useKit = () => {
    const { kitId, setKit, setLoading, setError } = useKitStore();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initializeKit = async () => {
            if (!kitId && !initialized) {
                try {
                    setLoading(true);
                    const response = await kitService.initializeKit();
                    setKit(response.data.kit);
                    setInitialized(true);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        initializeKit();
    }, [kitId, initialized, setKit, setLoading, setError]);

    const addProduct = async (productId, quantity = 1) => {
        try {
            setLoading(true);
            await kitService.addProductToKit(kitId, productId, quantity);
            const response = await kitService.getKitSummary(kitId);
            setKit(response.data.kit);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            setLoading(true);
            await kitService.updateItemQuantity(kitId, productId, quantity);
            const response = await kitService.getKitSummary(kitId);
            setKit(response.data.kit);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeProduct = async (productId) => {
        try {
            setLoading(true);
            await kitService.removeItem(kitId, productId);
            const response = await kitService.getKitSummary(kitId);
            setKit(response.data.kit);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const setFrequency = async (frequencyId) => {
        try {
            setLoading(true);
            await kitService.setDeliveryFrequency(kitId, frequencyId);
            const response = await kitService.getKitSummary(kitId);
            setKit(response.data.kit);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const confirmKit = async () => {
        try {
            setLoading(true);
            await kitService.confirmKit(kitId);
            const response = await kitService.getKitSummary(kitId);
            setKit(response.data.kit);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        addProduct,
        updateQuantity,
        removeProduct,
        setFrequency,
        confirmKit,
    };
};
