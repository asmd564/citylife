import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
});

const login = (tokenData) => {
  setToken(tokenData);
  localStorage.setItem('token', tokenData);
};

const logout = () => {
  setToken(null);
  localStorage.removeItem('token');
};

useEffect(() => {
  window.addEventListener('beforeunload', () => {
      if (token) {
          localStorage.setItem('token', token);
      }
  });

  return () => {
      window.removeEventListener('beforeunload', () => {
          if (token) {
              localStorage.setItem('token', token);
          }
      });
  };
}, [token]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
