import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLang } from '../context/LangContext';

const NotFound = () => {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary dark:text-primary-dark">
            404
          </h1>
          <div className="w-24 h-1 bg-primary/20 dark:bg-primary-dark/20 mx-auto my-4"></div>
          <h2 className="text-2xl font-semibold text-text dark:text-text-dark mb-4">
            {t('pageNotFound')}
          </h2>
          <p className="text-text/60 dark:text-text-dark/60 mb-8">
            {t('notFoundDescription')}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            {t('backToHome')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-surface dark:bg-surface-dark text-text dark:text-text-dark rounded-lg hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('goBack')}
          </button>
        </div>

        <div className="mt-12">
          <p className="text-sm text-text/40 dark:text-text-dark/40">
            {t('needHelp')}
            <Link
              to="/contact"
              className="text-primary dark:text-primary-dark hover:underline"
            >
              {t('contactSupport')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
