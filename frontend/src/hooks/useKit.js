import { useState, useEffect, useCallback, useRef } from 'react';
import { kitService } from '../services';
import { useKitStore } from '../store/kitStore';

export const useKit = () => {
    const { 
        kitId, 
        items,
        setKit, 
        addItem, 
        updateItemQuantity: updateLocalQuantity,
        removeItem: removeLocalItem,
        setLoading, 
        setError,
        setDeliveryFrequency: setLocalFrequency,
        clearKit
    } = useKitStore();
    const [initialized, setInitialized] = useState(false);
    const isReinitializing = useRef(false);

    // Function to create a new kit (either local or from API)
    const createNewKit = useCallback(async () => {
        if (isReinitializing.current) return;
        isReinitializing.current = true;
        
        try {
            setLoading(true);
            const response = await kitService.initializeKit();
            if (response.data?.kit) {
                setKit(response.data.kit);
            } else if (response.kit) {
                setKit(response.kit);
            } else {
                // Create local kit if API doesn't return expected format
                setKit({ id: `local-${Date.now()}`, items: [], total_price: 0 });
            }
        } catch (err) {
            console.error('Failed to initialize kit:', err);
            // Create a local kit if API fails
            setKit({ id: `local-${Date.now()}`, items: [], total_price: 0 });
        } finally {
            setLoading(false);
            isReinitializing.current = false;
        }
    }, [setKit, setLoading]);

    // Handle 404 errors by reinitializing the kit
    const handleKitNotFound = useCallback(async () => {
        console.log('Kit not found, clearing and reinitializing...');
        clearKit();
        await createNewKit();
    }, [clearKit, createNewKit]);

    // Initialize kit on mount
    useEffect(() => {
        const initializeKit = async () => {
            if (!kitId && !initialized) {
                await createNewKit();
                setInitialized(true);
            } else if (kitId && !kitId.toString().startsWith('local-') && !initialized) {
                // Verify existing kit is still valid
                try {
                    setLoading(true);
                    const response = await kitService.getKitSummary(kitId);
                    if (response.data?.kit) {
                        setKit(response.data.kit);
                    } else if (response.kit) {
                        setKit(response.kit);
                    }
                    setInitialized(true);
                } catch (err) {
                    // Kit no longer exists or is not a draft
                    if (err.response?.status === 404) {
                        await handleKitNotFound();
                    }
                    setInitialized(true);
                } finally {
                    setLoading(false);
                }
            } else {
                setInitialized(true);
            }
        };

        initializeKit();
    }, [kitId, initialized, setKit, setLoading, createNewKit, handleKitNotFound]);

    // Add product - local first, then sync to backend
    const addProduct = useCallback(async (productId, quantity = 1, product = null) => {
        // Immediately add to local state for instant UI feedback
        const localItem = {
            product_id: productId,
            quantity,
            price_at_addition: product?.price || 0,
            price: product?.price || 0,
            name: product?.name || '',
            image_url: product?.image_url || product?.image || '',
            brand_name: product?.brand_name || '',
            brand_id: product?.brand_id || null,
        };
        addItem(localItem);

        // Try to sync with backend
        if (kitId && !kitId.toString().startsWith('local-')) {
            try {
                await kitService.addProductToKit(kitId, productId, quantity);
                const response = await kitService.getKitSummary(kitId);
                if (response.data?.kit) {
                    setKit(response.data.kit);
                } else if (response.kit) {
                    setKit(response.kit);
                }
            } catch (err) {
                console.error('Failed to sync add to backend:', err);
                // If kit not found, reinitialize but keep local item
                if (err.response?.status === 404) {
                    handleKitNotFound();
                }
                // Keep local state - don't remove the item
            }
        }
    }, [kitId, addItem, setKit, handleKitNotFound]);

    // Update quantity - local first, then sync
    const updateQuantity = useCallback(async (productId, quantity) => {
        // Immediately update local state
        updateLocalQuantity(productId, quantity);

        // Try to sync with backend
        if (kitId && !kitId.toString().startsWith('local-')) {
            try {
                await kitService.updateItemQuantity(kitId, productId, quantity);
                const response = await kitService.getKitSummary(kitId);
                if (response.data?.kit) {
                    setKit(response.data.kit);
                } else if (response.kit) {
                    setKit(response.kit);
                }
            } catch (err) {
                console.error('Failed to sync quantity update:', err);
                if (err.response?.status === 404) {
                    handleKitNotFound();
                }
            }
        }
    }, [kitId, updateLocalQuantity, setKit, handleKitNotFound]);

    // Remove product - local first, then sync
    const removeProduct = useCallback(async (productId) => {
        // Immediately remove from local state
        removeLocalItem(productId);

        // Try to sync with backend
        if (kitId && !kitId.toString().startsWith('local-')) {
            try {
                await kitService.removeItem(kitId, productId);
                const response = await kitService.getKitSummary(kitId);
                if (response.data?.kit) {
                    setKit(response.data.kit);
                } else if (response.kit) {
                    setKit(response.kit);
                }
            } catch (err) {
                console.error('Failed to sync remove:', err);
                if (err.response?.status === 404) {
                    handleKitNotFound();
                }
            }
        }
    }, [kitId, removeLocalItem, setKit, handleKitNotFound]);

    // Set delivery frequency - local only, synced during confirm
    const setFrequency = useCallback(async (frequencyId) => {
        setLocalFrequency(frequencyId);
        // Don't sync to backend here - will be done during confirm
    }, [setLocalFrequency]);

    // Sync local items to a backend kit
    const syncItemsToBackend = useCallback(async (newKitId) => {
        for (const item of items) {
            try {
                await kitService.addProductToKit(newKitId, item.product_id, item.quantity);
            } catch (err) {
                console.error('Failed to sync item:', item.product_id, err);
            }
        }
    }, [items]);

    // Confirm kit - creates new backend kit if needed and syncs items
    const confirmKit = useCallback(async () => {
        const localItems = items;
        const frequency = useKitStore.getState().deliveryFrequency;
        
        if (localItems.length === 0) {
            setError('Your kit is empty');
            return false;
        }

        try {
            setLoading(true);
            
            let activeKitId = kitId;
            
            // Check if we have a valid backend kit
            if (!activeKitId || activeKitId.toString().startsWith('local-')) {
                // Initialize a new kit on the backend
                const initResponse = await kitService.initializeKit();
                // Backend returns kit directly: { id, user_id, status, ... }
                activeKitId = initResponse?.id || initResponse?.data?.kit?.id || initResponse?.kit?.id;
                
                if (!activeKitId) {
                    throw new Error('Failed to create kit on server');
                }
            } else {
                // Verify existing kit is still valid
                try {
                    await kitService.getKitSummary(activeKitId);
                } catch (err) {
                    if (err.response?.status === 404 || err.message?.includes('404')) {
                        // Kit doesn't exist, create a new one
                        const initResponse = await kitService.initializeKit();
                        activeKitId = initResponse?.id || initResponse?.data?.kit?.id || initResponse?.kit?.id;
                        
                        if (!activeKitId) {
                            throw new Error('Failed to create kit on server');
                        }
                    } else {
                        throw err;
                    }
                }
            }

            // Sync all local items to the backend kit
            for (const item of localItems) {
                const productId = item.product_id || item.id;
                try {
                    await kitService.addProductToKit(activeKitId, productId, item.quantity);
                } catch (err) {
                    console.error('Failed to add item:', productId, err);
                    // Continue with other items
                }
            }

            // Set delivery frequency
            if (frequency) {
                await kitService.setDeliveryFrequency(activeKitId, frequency);
            }

            // Confirm the kit
            await kitService.confirmKit(activeKitId);
            
            // Clear local state after successful confirmation
            clearKit();
            
            return true;
        } catch (err) {
            console.error('Failed to confirm kit:', err);
            setError(err.message || 'Failed to confirm kit');
            return false;
        } finally {
            setLoading(false);
        }
    }, [kitId, items, setKit, setLoading, setError, clearKit]);

    return {
        addProduct,
        updateQuantity,
        removeProduct,
        setFrequency,
        confirmKit,
        kitId,
        items,
    };
};
