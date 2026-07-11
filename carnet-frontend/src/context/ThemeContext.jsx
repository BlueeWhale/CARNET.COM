import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // LocalStorage matrix configuration mapping tracker
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('carnet_theme') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#071426';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f8fafc'; // Premium Clean Minimal Slate Light Ground
    }
    localStorage.setItem('carnet_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);