import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok && data.user) {
        const { password, ...publicData } = data.user;
        setUser(publicData);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const register = async (nickname, email) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, email })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setLoading(false);
        return { success: false, error: data.message };
      }

      setLoading(false);
      return { success: true, message: data.message };
      
    } catch (err) {
      setLoading(false);
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const checkStatus = async (email) => {
    try {
      const res = await fetch(`${API_URL}/auth/status/${encodeURIComponent(email)}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, error: 'Connection error' };
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setLoading(false);
        return { success: false, error: data.message };
      }

      localStorage.setItem('token', data.token);
      const { password: _password, ...publicData } = data.user;
      setUser(publicData);
      setLoading(false);
      return { success: true };
      
    } catch (err) {
      setLoading(false);
      return { success: false, error: 'Connection error. Please check if server is running.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      login, 
      logout, 
      register,
      checkStatus,
      isAdmin,
      isAuthenticated,
      checkAuth
    }}>
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