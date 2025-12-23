// Centralized API configuration
// Using 127.0.0.1 to avoid localhost IPv6 resolution issues
export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const endpoints = {
    deals: `${API_BASE_URL}/deals`,
    contacts: `${API_BASE_URL}/contacts`,
    lawyers: `${API_BASE_URL}/lawyers`,
};
