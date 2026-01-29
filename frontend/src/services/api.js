const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

class ApiClient {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    getAuthToken() {
        // First try direct token (used by AuthContext)
        const directToken = localStorage.getItem('token');
        if (directToken) {
            return directToken;
        }
        
        // Fallback to auth object
        const authData = localStorage.getItem('auth');
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                return parsed.token;
            } catch {
                return null;
            }
        }
        return null;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getAuthToken();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                const error = new Error(data.message || 'API request failed');
                error.response = { status: response.status, data };
                throw error;
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint, options = {}) {
        // Support both { params: {...} } and direct params object
        const params = options.params || options;
        const filteredParams = {};
        
        // Filter out non-serializable params and flatten
        if (params && typeof params === 'object') {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'params') {
                    filteredParams[key] = value;
                }
            });
        }
        
        const queryString = Object.keys(filteredParams).length > 0 
            ? new URLSearchParams(filteredParams).toString() 
            : '';
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    // POST request
    async post(endpoint, body = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    // PATCH request
    async patch(endpoint, body = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

export default new ApiClient();
