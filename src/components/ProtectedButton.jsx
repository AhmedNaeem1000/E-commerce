import React from 'react';
import { toast } from 'react-hot-toast';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const ProtectedButton = ({ children, onClick, className, ...props }) => {
  const { t } = useLang();
  const { colorTheme } = useTheme();

  const handleClick = (e) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(localStorage.getItem('authToken') && user);

    if (!isLoggedIn) {
      e.preventDefault();
      toast.error(t('pleaseLoginToAccess'));
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ProtectedButton; 