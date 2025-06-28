import React from 'react';
import useProductData from '../hooks/useProductData';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart.jsx';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { TrendingUp, Star } from 'lucide-react';
import useWishlistStore from '../hooks/useWishlist.js';

const BestSellers = () => {
  const { products, isLoading, error } = useProductData();
  const { addToCart } = useCart();
  const { colorTheme } = useTheme();
  const { t, lang } = useLang();

  // Filter best sellers (for demo, we'll show first 4 products with highest ratings)
  const bestSellers = products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 dark:from-orange-900/20 dark:to-red-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {lang === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {lang === 'ar'
                ? 'اكتشف المنتجات الأكثر طلباً من عملائنا المميزين'
                : 'Discover the most popular products from our valued customers'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl shadow-xl bg-white/70 dark:bg-white/10 border border-white/10 dark:border-white/10 h-80 flex flex-col justify-end p-6 backdrop-blur-md">
                <div className="bg-gray-200/30 dark:bg-gray-700/30 rounded-lg h-2/3 mb-4" />
                <div className="h-4 bg-gray-200/30 dark:bg-gray-700/30 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200/30 dark:bg-gray-700/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 dark:from-orange-900/20 dark:to-red-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {lang === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}
              </h2>
            </div>
          </div>
          <div className="text-center text-red-500">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 dark:from-orange-900/20 dark:to-red-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {lang === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}
              </h2>
            </div>
          </div>
          <div className="text-center text-gray-400">
            {lang === 'ar' ? 'لا توجد منتجات متاحة حالياً' : 'No products available yet'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 dark:from-orange-900/20 dark:to-red-900/20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {lang === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {lang === 'ar'
              ? 'اكتشف المنتجات الأكثر طلباً من عملائنا المميزين'
              : 'Discover the most popular products from our valued customers'
            }
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {/* Best Seller Badge */}
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {lang === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller'}
              </div>

              <ProductCard product={product} onAddToCart={addToCart} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {lang === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers; 