import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '../utils/storage';
import { authApi } from '../api/auth.api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedToken = await storage.getToken();
      if (storedToken) {
        setToken(storedToken);
        // Verify token by fetching user data
        const response = await authApi.getMe();
        if (response.success) {
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          // Token invalid, clear storage
          await logout();
        }
      }
    } catch (error) {
      console.log('Auth check failed:', error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      if (response.success) {
        const { token: newToken, user: userData } = response.data;
        await storage.setToken(newToken);
        await storage.setUserData(userData);
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message || 'שגיאה בהתחברות' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      if (response.success) {
        const { token: newToken, user: newUser } = response.data;
        await storage.setToken(newToken);
        await storage.setUserData(newUser);
        setToken(newToken);
        setUser(newUser);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message || 'שגיאה בהרשמה' };
    }
  };

  const logout = async () => {
    await storage.clearAll();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    storage.setUserData({ ...user, ...userData });
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;