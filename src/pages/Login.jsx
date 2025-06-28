import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import useAuthStore from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const { t, lang } = useLang();
  const { colorTheme } = useTheme();
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/products', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error(lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(lang === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login({
        email: formData.email,
        password: formData.password
      });
      // توجيه حسب الدور
      const user = res?.user || JSON.parse(localStorage.getItem('user') || 'null');
      if (user && user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/products', { replace: true });
      }
    } catch (error) {
      // Error is already handled by the auth store
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {lang === 'ar' ? 'جاري التحقق من حالة تسجيل الدخول...' : 'Checking authentication status...'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-100 dark:border-gray-700 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-primary-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <span className="text-white text-2xl font-bold">E</span>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {lang === 'ar'
                ? 'مرحباً بعودتك! سجل دخولك للوصول لحسابك'
                : 'Welcome back! Sign in to access your account'
              }
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                  placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="block w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                  placeholder={lang === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-gradient hover:bg-primary-gradient-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {lang === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                </div>
              ) : (
                lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'
              )}
            </motion.button>

            {/* Demo Credentials */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {lang === 'ar' ? 'بيانات تجريبية:' : 'Demo credentials:'}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                <p>{lang === 'ar' ? 'المدير: admin@ecmorece.com / admin123' : 'Admin: admin@ecmorece.com / admin123'}</p>
                <p>{lang === 'ar' ? 'المستخدم: user@ecmorece.com/ user123' : 'User: user@ecmorece.com / user123'}</p>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                {lang === 'ar' ? 'إنشاء حساب جديد' : 'Create new account'}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 