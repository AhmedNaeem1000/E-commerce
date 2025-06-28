import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Search as SearchIcon,
  Shield,
  Globe,
  HelpCircle,
  Check
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import ProtectedLink from './ProtectedLink';
import useAuthStore from '../hooks/useAuth';
import Logo from './ui/Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [cartAdded, setCartAdded] = useState(false);

  useEffect(() => {
    const loginStatus = !!(localStorage.getItem('authToken') && user);
    setIsLoggedIn(loginStatus);
    if (loginStatus) {
      setUserName(user.name || user.email?.split('@')[0] || t('profile'));
    }
  }, [t]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleCartAdd = () => {
      setCartAdded(true);
      setTimeout(() => setCartAdded(false), 2000);
    };
    window.addEventListener('cart-item-added', handleCartAdd);
    return () => window.removeEventListener('cart-item-added', handleCartAdd);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLangToggle = (newLang) => {
    setLang(newLang);
    setLanguageDropdownOpen(false);
  };

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Language Options
  const languageOptions = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'ar',
      name: 'العربية',
      flag: '🇸🇦'
    }
  ];

  const currentLanguage = languageOptions.find(option => option.code === lang) || languageOptions[0];

  // Nav Links - moved inside component to update with language changes
  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products' },
    { name: t('wishlist'), href: '/wishlist' }
  ];

  // Language Dropdown Component
  const LanguageDropdown = () => (
    <div className="relative" ref={languageDropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setLanguageDropdownOpen(!languageDropdownOpen);
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-gradient hover:bg-primary-gradient-hover text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
        title={t('chooseLanguage')}
      >
        <div className="relative">
          <Globe className="h-5 w-5 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
        </div>
        <span className="text-sm font-semibold">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${languageDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {languageDropdownOpen && (
        <div
          className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-sm"
          style={{ pointerEvents: 'auto' }}
        >
          {languageOptions.map((option) => (
            <button
              key={option.code}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLangToggle(option.code);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-700 dark:hover:to-gray-600 ${lang === option.code
                ? 'bg-primary-gradient text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <span className="text-xl">{option.flag}</span>
              <span className="font-semibold">{option.name}</span>
              {lang === option.code && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="hover:scale-105 transition-all duration-300">
            <Logo variant="navbar" showText={false} />
          </Link>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('products') + '...'}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:ring-secondary-500/20 dark:focus:border-secondary-500 transition-all duration-300 backdrop-blur-sm"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </form>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-all duration-300 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-lg transform hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ProtectedLink
              to="/cart"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-green to-accent-green-dark hover:from-accent-green-dark hover:to-accent-green text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartAdded && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full z-20 animate-fade-in-out border-2 border-white shadow"></span>
                )}
              </span>
              <span className="text-sm font-medium">{t('cart')}</span>
            </ProtectedLink>

            {/* Language Dropdown */}
            <LanguageDropdown />

            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-primary-600" />}
            </button>
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl bg-primary-gradient hover:bg-primary-gradient-hover text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-400/20"
                  title="User Menu"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">{userName}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-sm">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl mx-2 transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span className="font-semibold">{t('profile')}</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl mx-2 transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span className="font-semibold">{t('settings')}</span>
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center gap-3 px-4 py-3 text-blue-600 dark:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl mx-2 transition-all duration-200 hover:text-blue-700 dark:hover:text-blue-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="font-semibold">{t('support')}</span>
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-accent-red dark:text-accent-red hover:bg-gradient-to-r hover:from-accent-red/10 hover:to-accent-red/5 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl mx-2 transition-all duration-200 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-semibold">{t('logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-xl text-sm font-semibold bg-primary-gradient hover:bg-primary-gradient-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/cart"
              className="p-2 rounded-xl bg-gradient-to-r from-accent-green to-accent-green-dark hover:from-accent-green-dark hover:to-accent-green text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartAdded && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full z-20 animate-fade-in-out border-2 border-white shadow"></span>
                )}
              </span>
            </Link>

            {/* Mobile Language Dropdown */}
            <LanguageDropdown />

            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-primary-600" />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 rounded-2xl shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 p-6 flex flex-col gap-3">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('products') + '...'}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:ring-secondary-500/20 dark:focus:border-secondary-500 transition-all duration-300 backdrop-blur-sm"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </form>
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-all duration-300 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-lg transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-all duration-300 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-lg transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  {t('profile')}
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-all duration-300 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-lg transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  {t('settings')}
                </Link>
                <Link
                  to="/help"
                  className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-all duration-300 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-lg transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                  {t('support')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-accent-red dark:text-accent-red hover:bg-gradient-to-r hover:from-accent-red/10 hover:to-accent-red/5 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl transition-all duration-300 w-full text-left font-semibold transform hover:scale-105"
                >
                  <LogOut className="h-5 w-5" /> {t('logout')}
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 w-full text-center transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-primary-gradient hover:bg-primary-gradient-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full text-center transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
