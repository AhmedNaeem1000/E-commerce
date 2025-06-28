import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useLang();
  const { colorTheme } = useTheme();

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const isLoggedIn = !!(localStorage.getItem('authToken') && user);

      if (!isLoggedIn) {
        setIsAuthenticated(false);
        toast.error(t('pleaseLoginToAccess'));
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [t]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 