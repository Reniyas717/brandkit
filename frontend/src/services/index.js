import api from './api';

// Brand services
export const brandService = {
    getAll: async () => {
        const response = await api.get('/brands');
        return response?.data?.brands || response?.brands || [];
    },
    getAllBrands: async () => {
        const response = await api.get('/brands');
        return response?.data?.brands || response?.brands || [];
    },
    getBySlug: async (slug) => {
        const response = await api.get(`/brands/${slug}`);
        return response?.data?.brand || response?.brand || response;
    },
    getProducts: async (brandId) => {
        const response = await api.get(`/brands/${brandId}/products`);
        return response?.data?.products || response?.products || [];
    },
    getMyProducts: () => api.get('/brands/me/products'),
    createProduct: (data) => api.post('/brands/me/products', data),
    updateProduct: (id, data) => api.put(`/brands/me/products/${id}`, data),
    deleteProduct: (id) => api.delete(`/brands/me/products/${id}`),
    getAnalytics: (params) => api.get('/brands/me/analytics', { params }),
};

// Product services
export const productService = {
    getAll: async (params) => {
        // If brand slug is provided, get products via brand endpoint
        if (params?.brand) {
            const response = await api.get(`/brands/${params.brand}/products`);
            return response?.data?.products || response?.products || [];
        }
        const response = await api.get('/products', { params });
        return response?.data?.products || response?.products || [];
    },
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response?.data?.product || response?.product || response;
    },
    getByBrand: async (brandSlug) => {
        const response = await api.get(`/brands/${brandSlug}/products`);
        return response?.data?.products || response?.products || [];
    },
};

// Kit services
export const kitService = {
    getAll: () => api.get('/kits'),
    getById: (id) => api.get(`/kits/${id}`),
    create: () => api.post('/kits', {}),
    initializeKit: () => api.post('/kits', {}),
    getKitSummary: (id) => api.get(`/kits/${id}`),
    addItem: (kitId, productId, quantity = 1) => 
        api.post(`/kits/${kitId}/items`, { product_id: productId, quantity }),
    addProductToKit: (kitId, productId, quantity = 1) => 
        api.post(`/kits/${kitId}/items`, { product_id: productId, quantity }),
    removeItem: (kitId, itemId) => api.delete(`/kits/${kitId}/items/${itemId}`),
    updateItemQuantity: (kitId, itemId, quantity) => 
        api.patch(`/kits/${kitId}/items/${itemId}`, { quantity }),
    setDeliveryFrequency: (kitId, frequencyId) => 
        api.patch(`/kits/${kitId}/frequency`, { frequency_id: frequencyId }),
    confirmKit: (kitId) => api.post(`/kits/${kitId}/confirm`),
    getMySubscriptions: () => api.get('/kits/my-subscriptions'),
};

// Auth services
export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (data) => api.post('/auth/register', data),
    getProfile: () => api.get('/auth/profile'),
};

// Delivery frequency services
export const frequencyService = {
    getAll: async () => {
        const response = await api.get('/frequencies');
        return response?.data?.frequencies || response?.frequencies || response || [];
    },
};
