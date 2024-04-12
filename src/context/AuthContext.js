'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    // Check if localStorage is available before accessing it
    if (typeof localStorage !== 'undefined') {
      const storedIsAuth = localStorage.getItem('isAuth');
      return storedIsAuth ? JSON.parse(storedIsAuth) : false;
    } else {
      return false; // Fallback if localStorage is not available
    }
  });

  useEffect(() => {
    // Save the value of isAuth to local storage whenever it changes
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isAuth', JSON.stringify(isAuth));
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
