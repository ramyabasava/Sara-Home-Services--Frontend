import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user info is stored in localStorage on initial load
    const storedUser = localStorage.getItem('serviceOnWheelUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    // Store user in both state and localStorage
    localStorage.setItem('serviceOnWheelUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Remove user from state and localStorage
    localStorage.removeItem('serviceOnWheelUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};