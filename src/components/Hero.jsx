import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Star, Users, ShoppingBag } from 'lucide-react';
import ProductViewer3D from './ProductViewer3D';

const Hero = () => {
  const { t, lang } = useLang();
  const { colorTheme } = useTheme();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleExploreFeatures = () => {
    // Scroll to Why Choose Us section
    const whyChooseUs = document.getElementById('why-choose-us');
    if (whyChooseUs) {
      whyChooseUs.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center justify-center px-4 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Enhanced Logo */}
            <motion.div
              className="mb-6 flex justify-center lg:justify-start w-full"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.25)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span
                  className="text-white text-2xl font-bold"
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 }
                  }}
                >
                  E
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg"
            >
              <Star className="w-4 h-4 fill-current" />
              {lang === 'ar' ? 'أفضل متجر إلكتروني 2025' : '#1 E-commerce Platform 2025'}
            </motion.div>

            {/* Enhanced Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {lang === 'ar' ? (
                <>
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    تسوق بذكاء
                  </span>
                  <br />
                  <span>عيش بفخامة</span>
                </>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Shop Smart
                  </span>
                  <br />
                  <span>Live Luxury</span>
                </>
              )}
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {lang === 'ar'
                ? 'اكتشف تشكيلة حصرية من المنتجات عالية الجودة مع ضمان الجودة والتوصيل السريع'
                : 'Discover an exclusive collection of high-quality products with quality guarantee and fast delivery'
              }
            </motion.p>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {lang === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {lang === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                {lang === 'ar' ? 'دعم 24/7' : '24/7 Support'}
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShopNow}
                className="relative bg-primary-gradient hover:bg-primary-gradient-hover text-white font-semibold py-4 px-8 rounded-full overflow-hidden shadow-xl mx-auto lg:mx-0 backdrop-blur-md border border-primary-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                {lang === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExploreFeatures}
                className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold py-4 px-8 rounded-full border border-primary-500/20 mx-auto lg:mx-0 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                {lang === 'ar' ? 'استكشف المميزات' : 'Explore Features'}
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{lang === 'ar' ? '50,000+' : '50,000+'} {lang === 'ar' ? 'عميل سعيد' : 'Happy Customers'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.9/5 {lang === 'ar' ? 'تقييم' : 'Rating'}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced 3D Product Preview */}
          <motion.div
            className="relative hidden lg:block h-[600px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProductViewer3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
