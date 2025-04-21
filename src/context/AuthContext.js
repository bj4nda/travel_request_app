// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchCurrentUser()
                .then(userData => {
                    setUser(userData);
                    setIsAuthenticated(true);
                    setIsAdmin(userData.is_staff || false);
                })
                .catch(error => {
                    console.error('Authentication error:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (userData, token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.is_staff || false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};