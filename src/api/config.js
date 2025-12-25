/**
 * API Configuration
 * Central configuration for API endpoints and settings
 * 
 * SECURITY NOTE:
 * - API keys should NEVER be hardcoded in this file
 * - Use environment variables (.env) for sensitive values
 * - The .env file is in .gitignore and won't be committed
 * - Copy .env.example to .env and add your actual keys
 */

// ===========================================
// Environment Variables (from .env file)
// ===========================================

// Base URL - defaults to mock API if not specified
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// API timeout
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

// Feature flags
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';
export const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';

// ===========================================
// API Keys (loaded from environment)
// ===========================================
// These would be used if connecting to real external services
// NEVER hardcode actual keys here!

export const API_KEYS = {
    // Example: booking service key
    BOOKING_API_KEY: import.meta.env.VITE_BOOKING_API_KEY || null,

    // Example: Google Maps key for location feature
    GOOGLE_MAPS_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || null,

    // Example: Payment gateway key
    STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || null,

    // OpenWeatherMap API key for weather tips feature
    OPENWEATHER_API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || null,
};

// ===========================================
// API Endpoints
// ===========================================

export const ENDPOINTS = {
    // Services
    SERVICES: '/services',
    SERVICE_BY_ID: (id) => `/services/${id}`,

    // Staff
    STAFF: '/staff',
    STAFF_BY_ID: (id) => `/staff/${id}`,

    // Appointments
    APPOINTMENTS: '/appointments',
    APPOINTMENT_BY_ID: (id) => `/appointments/${id}`
};

// ===========================================
// API Settings
// ===========================================

export const API_CONFIG = {
    // Timeout in milliseconds
    TIMEOUT: API_TIMEOUT,

    // Default headers
    HEADERS: {
        'Content-Type': 'application/json',
        // Authorization header would be added dynamically if API_KEY exists
        // 'Authorization': `Bearer ${API_KEYS.BOOKING_API_KEY}`
    },

    // Retry configuration
    RETRY_COUNT: 3,
    RETRY_DELAY: 1000
};

// ===========================================
// Mock API Delays (for development)
// ===========================================

export const MOCK_DELAYS = {
    SHORT: 300,
    MEDIUM: 500,
    LONG: 600
};

// ===========================================
// Helper to check if API key is configured
// ===========================================

export const isApiKeyConfigured = (keyName) => {
    return API_KEYS[keyName] !== null && API_KEYS[keyName] !== undefined;
};

// Log warning in development if using mock API
if (DEBUG_MODE) {
    console.log('[API Config] Using Mock API:', USE_MOCK_API);
    console.log('[API Config] Base URL:', API_BASE_URL);
}
