// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://backend-svqg.onrender.com',
  ENDPOINTS: {
    // Auth endpoints
    // PROTECTED: '/protected/',
    // PUBLIC: '/public/',
    PROFILE: '/profile/',
    // STATS: '/stats/',
    
    // Jewelry store endpoints
    CATEGORIES: '/categories/',
    SUBCATEGORIES: '/subcategories/',
    PRODUCTS: '/products/',
    CART: '/cart/',
    CART_ITEMS: '/cart-items/',
    ORDERS: '/orders/',
    REVIEWS: '/reviews/',
    
    // Admin endpoints
    ADMIN_ORDERS: '/admin/orders/',
    CHECK_IP_ROLE: '/check-ip-role/',
    DEBUG_IP: '/debug-ip/',
    CHECK_IP_FRONTEND: '/check-ip-frontend/',
    ROLE: '/role/',
    NOTIFICATIONS: '/notices/',

    // Email endpoint
    SEND_EMAIL: '/send-email/',
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG;
