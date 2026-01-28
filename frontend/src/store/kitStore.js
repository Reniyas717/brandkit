import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useKitStore = create(
    persist(
        (set, get) => ({
            // State
            kitId: null,
            items: [],
            deliveryFrequency: null,
            totalPrice: 0,
            isLoading: false,
            error: null,

            // Actions
            setKit: (kit) => set({
                kitId: kit.id,
                items: (kit.items || []).map(item => ({
                    ...item,
                    price_at_addition: item.price_at_addition || item.price || 0,
                })),
                deliveryFrequency: kit.delivery_frequency,
                totalPrice: kit.total_price || 0,
            }),

            addItem: (item) => set((state) => {
                // Check if item already exists
                const existingIndex = state.items.findIndex(i => i.product_id === item.product_id);
                if (existingIndex >= 0) {
                    // Update quantity of existing item
                    const newItems = [...state.items];
                    newItems[existingIndex] = {
                        ...newItems[existingIndex],
                        quantity: newItems[existingIndex].quantity + (item.quantity || 1),
                    };
                    return { items: newItems };
                }
                // Add new item with all product details
                return {
                    items: [...state.items, {
                        ...item,
                        price_at_addition: item.price_at_addition || item.price || 0,
                        price: item.price || item.price_at_addition || 0,
                        brand_name: item.brand_name || '',
                        brand_id: item.brand_id || null,
                    }],
                };
            }),

            updateItemQuantity: (productId, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.product_id === productId ? { ...item, quantity } : item
                ),
            })),

            removeItem: (productId) => set((state) => ({
                items: state.items.filter(item => item.product_id !== productId),
            })),

            setDeliveryFrequency: (frequency) => set({ deliveryFrequency: frequency }),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),

            clearKit: () => set({
                kitId: null,
                items: [],
                deliveryFrequency: null,
                totalPrice: 0,
                error: null,
            }),

            // Computed - Cross-brand friendly
            getItemCount: (products = []) => {
                const state = get();
                // For cross-brand support, always count all items
                return state.items.reduce((sum, item) => sum + item.quantity, 0);
            },

            getTotalPrice: (products = []) => {
                const state = get();
                const hasProducts = products && Array.isArray(products) && products.length > 0;

                return state.items.reduce((sum, item) => {
                    // Try to find product in current catalog first
                    if (hasProducts) {
                        const product = products.find(p => p.id === item.product_id);
                        if (product) {
                            return sum + (product.price * item.quantity);
                        }
                    }
                    // Fallback to stored price - always include for cross-brand support
                    return sum + ((item.price_at_addition || 0) * item.quantity);
                }, 0);
            },
        }),
        {
            name: 'kit-storage',
            partialize: (state) => ({
                kitId: state.kitId,
                items: state.items,
                deliveryFrequency: state.deliveryFrequency,
            }),
        }
    )
);
