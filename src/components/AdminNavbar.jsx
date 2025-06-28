import React from 'react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const AdminNavbar = () => {
  const { lang, setLang, t } = useLang();
  const { isDarkMode } = useTheme();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm mb-8 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl shadow-lg">A</span>
          <span className="font-extrabold text-xl text-gray-900 dark:text-white">{t('adminDashboard')}</span>
        </div>
        {/* Center: Admin Info */}
        <div className="flex items-center gap-4">
          <User className="w-6 h-6 text-blue-500" />
          <span className="font-medium text-gray-700 dark:text-gray-200">{user.name || t('admin')}</span>
        </div>
        {/* Right: Controls */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold transition"
            title={t('chooseLanguage')}
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
          {/* Settings */}
          <Link to="/settings" title={t('settings')} className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar; 