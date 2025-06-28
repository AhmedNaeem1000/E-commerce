import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem('colorTheme');
    return saved || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);

    // Remove all theme classes
    document.documentElement.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-pink');

    // Add current theme class
    if (colorTheme !== 'blue') {
      document.documentElement.classList.add(`theme-${colorTheme}`);
    }
  }, [colorTheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeColorTheme = (theme) => {
    setColorTheme(theme);
  };

  const availableThemes = [
    { id: 'blue', name: 'أزرق', color: '#3b82f6', gradient: 'from-blue-500 to-purple-600' },
    { id: 'purple', name: 'بنفسجي', color: '#8b5cf6', gradient: 'from-purple-500 to-pink-600' },
    { id: 'green', name: 'أخضر', color: '#10b981', gradient: 'from-green-500 to-cyan-600' },
    { id: 'orange', name: 'برتقالي', color: '#f59e0b', gradient: 'from-orange-500 to-red-600' },
    { id: 'pink', name: 'وردي', color: '#ec4899', gradient: 'from-pink-500 to-purple-600' }
  ];

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      colorTheme,
      changeColorTheme,
      availableThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 