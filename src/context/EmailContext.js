'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

const EmailContext = createContext();

export const useEmail = () => useContext(EmailContext);

export const EmailProvider = ({ children }) => {
  const [conEmail, setConEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('conEmail');
    if (storedEmail) {
      setConEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conEmail', conEmail);
  }, [conEmail]);

  return (
    <EmailContext.Provider value={{ conEmail, setConEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
