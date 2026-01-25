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
            getItemCount: () => {
                const state = get();
                return state.items.reduce((sum, item) => sum + item.quantity, 0);
            },

            getTotalPrice: () => {
                const state = get();
                return state.items.reduce((sum, item) => sum + (item.price_at_addition * item.quantity), 0);
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
