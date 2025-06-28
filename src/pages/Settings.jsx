import React, { useState, useEffect } from 'react';
import { Bell, Lock, Globe, Sun, Moon, Palette, Check } from 'lucide-react';
import Navbar from '../components/navbar';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const { lang, setLang, t } = useLang();
  const { isDarkMode, toggleTheme, colorTheme, changeColorTheme, availableThemes } = useTheme();
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const tabs = [
    { id: 'notifications', name: t('notifications'), icon: '🔔' },
    { id: 'preferences', name: t('preferences'), icon: '⚙️' }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${t('notification')} ${t(key)} ${notifications[key] ? t('disabled') : t('enabled')}`);
  };

  const handleColorThemeChange = (theme) => {
    changeColorTheme(theme);
    toast.success(`تم تغيير اللون إلى ${availableThemes.find(t => t.id === theme)?.name}`);
  };

  const currentTheme = availableThemes.find(theme => theme.id === colorTheme) || availableThemes[0];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {t('settings')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-primary-500/5'
                          }`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {t('notificationPreferences')}
                    </h2>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {t('receive')} {key.charAt(0).toUpperCase() + key.slice(1)} {t('notifications_about')}
                            </h3>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handleNotificationChange(key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {t('preferencesTitle')}
                    </h2>

                    {/* Dark Mode Toggle */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {t('darkMode')}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('switchTheme')}
                          </p>
                        </div>
                        <button
                          onClick={toggleTheme}
                          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-primary-500/10"
                        >
                          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Language Toggle */}
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {t('language')}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('chooseLanguage')}
                          </p>
                        </div>
                        <button
                          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-primary-500/10 border border-primary-500/20"
                          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                        >
                          {lang === 'ar' ? '🇸🇦' : '🇺🇸'}
                        </button>
                      </div>

                      {/* Color Theme Selector */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                            {t('colorTheme')}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {t('chooseColorTheme')}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          {availableThemes.map((theme) => (
                            <button
                              key={theme.id}
                              onClick={() => handleColorThemeChange(theme.id)}
                              className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${colorTheme === theme.id
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300'
                                }`}
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                                  style={{ backgroundColor: theme.color }}
                                />
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {theme.name}
                                </span>
                                {colorTheme === theme.id && (
                                  <div className="absolute top-2 right-2">
                                    <Check className="w-4 h-4 text-primary-500" />
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
