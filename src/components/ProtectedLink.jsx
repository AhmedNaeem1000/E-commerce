import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const ProtectedLink = ({ to, children, className, onClick, ...props }) => {
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
    <Link
      to={to}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ProtectedLink; 