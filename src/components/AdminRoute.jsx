import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const AdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useLang();
  const { colorTheme } = useTheme();

  useEffect(() => {
    // Check if user is logged in and is admin
    const checkAdminStatus = () => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const isLoggedIn = !!(localStorage.getItem('authToken') && user);
      const isAdminUser = user?.role === 'admin';

      if (!isLoggedIn) {
        setIsAdmin(false);
        toast.error(t('pleaseLoginToAccess'));
      } else if (!isAdminUser) {
        setIsAdmin(false);
        toast.error(t('adminAccessRequired'));
      } else {
        setIsAdmin(true);
      }
      setIsLoading(false);
    };

    checkAdminStatus();
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

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute; 