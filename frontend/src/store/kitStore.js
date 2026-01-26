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
                items: kit.items || [],
                deliveryFrequency: kit.delivery_frequency,
                totalPrice: kit.total_price || 0,
            }),

            addItem: (item) => set((state) => ({
                items: [...state.items.filter(i => i.product_id !== item.product_id), item],
            })),

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

            // Computed
            getItemCount: (products = []) => {
                const state = get();
                const hasProducts = products && Array.isArray(products) && products.length > 0;

                return state.items.reduce((sum, item) => {
                    if (hasProducts) {
                        const isValid = products.some(p => p.id === item.product_id);
                        if (!isValid) return sum;
                    }
                    return sum + item.quantity;
                }, 0);
            },

            getTotalPrice: (products = []) => {
                const state = get();
                const hasProducts = products && Array.isArray(products) && products.length > 0;

                return state.items.reduce((sum, item) => {
                    if (hasProducts) {
                        const product = products.find(p => p.id === item.product_id);
                        if (!product) return sum; // Skip items not in the current catalog (hidden in UI)
                        return sum + (product.price * item.quantity);
                    }
                    // Fallback to stored price if products not provided or empty
                    return sum + ((item.price_at_addition || 0) * item.quantity);
                }, 0);
            },
        }),
        {
            name: 'kit-storage',
            partialPersist: (state) => ({
                kitId: state.kitId,
                items: state.items,
                deliveryFrequency: state.deliveryFrequency,
            }),
        }
    )
);
