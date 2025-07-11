import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token from localStorage if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized: Invalid or missing token');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Generic
  get: (url: string, config?: AxiosRequestConfig) => apiClient.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) => apiClient.post(url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) => apiClient.put(url, data, config),
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => apiClient.patch(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => apiClient.delete(url, config),

  // Auth
  // getProtectedData: () => apiClient.get(API_CONFIG.ENDPOINTS.PROTECTED),
  // getPublicData: () => apiClient.get(API_CONFIG.ENDPOINTS.PUBLIC),
  getUserProfile: () => apiClient.get(API_CONFIG.ENDPOINTS.PROFILE),
  updateUserProfile: (data: any) => apiClient.put(API_CONFIG.ENDPOINTS.PROFILE, data),
  // getUserStats: () => apiClient.get(API_CONFIG.ENDPOINTS.STATS),

  // Products & categories
  getCategories: () => apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES),
  getSubcategories: () => apiClient.get(API_CONFIG.ENDPOINTS.SUBCATEGORIES),
  getProducts: (params?: any) => apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS, { params }),
  getProduct: (id: string) => apiClient.get(`${API_CONFIG.ENDPOINTS.PRODUCTS}${id}/`),

  // email
  sendEmail: (data: { subject: string; message: string; name: string,email:string, phone:string }) =>
    apiClient.post(API_CONFIG.ENDPOINTS.SEND_EMAIL, data),
  // Cart
  getCart: () => apiClient.get(API_CONFIG.ENDPOINTS.CART),
  addToCart: (data: any) => apiClient.post(API_CONFIG.ENDPOINTS.CART_ITEMS, data),
  updateCartItem: (itemId: string, data: { quantity: number }) =>
    apiClient.patch(`${API_CONFIG.ENDPOINTS.CART_ITEMS}${itemId}/`, data),
  deleteCartItem: (itemId: string) =>
    apiClient.delete(`${API_CONFIG.ENDPOINTS.CART_ITEMS}${itemId}/`),

  // Orders
  getOrders: () => apiClient.get(API_CONFIG.ENDPOINTS.ORDERS),
  createOrder: () => apiClient.post(API_CONFIG.ENDPOINTS.ORDERS),
  getOrder: (id: string) => apiClient.get(`${API_CONFIG.ENDPOINTS.ORDERS}${id}/`),
  
  // Role
  getRole: () => apiClient.get(API_CONFIG.ENDPOINTS.ROLE),
  

  // Notifications
  getNotifications: () => apiClient.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS),
  createNotification: (data:any) => apiClient.post(API_CONFIG.ENDPOINTS.NOTIFICATIONS,data),
  editNotification: (id: string, data: any) => apiClient.put(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}${id}/`, data),
  deleteNotification: (id: string) => apiClient.delete(`${API_CONFIG.ENDPOINTS.NOTIFICATIONS}${id}/`),

  // Reviews
  getReviews: (productId?: string) => {
    const params = productId ? { product_id: productId } : {};
    return apiClient.get(API_CONFIG.ENDPOINTS.REVIEWS, { params });
  },
  createReview: (data: { jewelry_item: string; rating: number; comment: string }) =>
    apiClient.post(API_CONFIG.ENDPOINTS.REVIEWS, data),
};


// Helper: Set token manually
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Helper: Clear token
export const clearAuthToken = () => {
  localStorage.removeItem('auth_token');
  delete apiClient.defaults.headers.common['Authorization'];
};

export default apiService;
