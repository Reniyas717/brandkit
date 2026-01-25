import apiClient from './api';

export const brandService = {
    // Get all brands
    getAllBrands: async () => {
        return apiClient.get('/brands');
    },

    // Get brand by ID or slug
    getBrand: async (identifier) => {
        return apiClient.get(`/brands/${identifier}`);
    },

    // Get brand with full details (products + sustainability)
    getBrandWithDetails: async (identifier) => {
        return apiClient.get(`/brands/${identifier}/details`);
    },

    // Get brand products
    getBrandProducts: async (identifier) => {
        return apiClient.get(`/brands/${identifier}/products`);
    },

    // Get brand sustainability tags
    getBrandSustainability: async (identifier) => {
        return apiClient.get(`/brands/${identifier}/sustainability`);
    },
};

export const productService = {
    // Get all products with optional filters
    getAllProducts: async (filters = {}) => {
        return apiClient.get('/products', filters);
    },

    // Get product by ID
    getProduct: async (id) => {
        return apiClient.get(`/products/${id}`);
    },

    // Get product with metadata
    getProductWithMetadata: async (id) => {
        return apiClient.get(`/products/${id}/details`);
    },
};

export const kitService = {
    // Initialize or get draft kit
    initializeKit: async (userId) => {
        return apiClient.post('/kits/initialize', { userId });
    },

    // Get delivery frequencies
    getDeliveryFrequencies: async () => {
        return apiClient.get('/kits/frequencies');
    },

    // Get kit summary
    getKitSummary: async (kitId) => {
        return apiClient.get(`/kits/${kitId}`);
    },

    // Add product to kit
    addProductToKit: async (kitId, productId, quantity = 1) => {
        return apiClient.post(`/kits/${kitId}/items`, { productId, quantity });
    },

    // Update item quantity
    updateItemQuantity: async (kitId, productId, quantity) => {
        return apiClient.patch(`/kits/${kitId}/items/${productId}`, { quantity });
    },

    // Remove item from kit
    removeItem: async (kitId, productId) => {
        return apiClient.delete(`/kits/${kitId}/items/${productId}`);
    },

    // Set delivery frequency
    setDeliveryFrequency: async (kitId, frequencyId) => {
        return apiClient.patch(`/kits/${kitId}/frequency`, { frequencyId });
    },

    // Confirm kit
    confirmKit: async (kitId) => {
        return apiClient.post(`/kits/${kitId}/confirm`);
    },
};
