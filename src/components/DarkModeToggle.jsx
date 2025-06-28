import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title="Toggle Theme"
    >
      {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-primary-600" />}
    </button>
  );
};

export default DarkModeToggle; 