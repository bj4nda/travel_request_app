// src/services/authService.js
import api from './api';

export const login = async (username, password) => {
    try {
        const response = await api.post('/token/', {
            username,
            password,
        });

        const { access, refresh } = response.data;

        // Get user data
        const userResponse = await api.get('/current-user/', {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });

        return {
            user: userResponse.data,
            token: access,
            refreshToken: refresh,
        };
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/register/', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCurrentUser = async () => {
    try {
        const response = await api.get('/current-user/');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch all travel requests
export const getTravelRequests = async () => {
    const response = await api.get('/travel-requests/');
    return response.data;
};

export const getTravelRequestById = async (id) => {
    try {
        const response = await api.get(`/travel-requests/${id}/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createTravelRequest = async (travelRequestData) => {
    try {
        const response = await api.post('/travel-requests/', travelRequestData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update travel request status
export const updateTravelRequestStatus = async (id, status) => {
    const response = await api.patch(`/travel-requests/${id}/update-status/`, { status });
    return response.data;
};