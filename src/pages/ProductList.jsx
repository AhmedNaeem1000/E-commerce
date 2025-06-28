import React, { useState, useEffect, useMemo } from 'react';
import useProductData from '../hooks/useProductData';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Star,
  ShoppingBag,
  Heart
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/navbar';
import { toast } from 'react-hot-toast';
import { useCart } from '../hooks/useCart.jsx';
import useWishlistStore from '../hooks/useWishlist.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const STORAGE_KEY = 'products';

const ProductList = () => {
  const { products, isLoading, error, initializeProducts } = useProductData();
  const { t, lang } = useLang();
  const { colorTheme } = useTheme();
  const { addToCart } = useCart();
  const addToWishlist = useWishlistStore(state => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist);
  const wishlistItems = useWishlistStore(state => state.items) || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  // تهيئة البيانات عند تحميل الصفحة
  useEffect(() => {
    if (!isLoading && (!products || products.length === 0)) {
      console.log('Initializing products in ProductList...');
      initializeProducts();
    }
  }, [isLoading, products, initializeProducts]);

  // إضافة useEffect إضافي لضمان التهيئة
  useEffect(() => {
    // تأخير قصير لضمان تحميل البيانات
    const timer = setTimeout(() => {
      if (!isLoading && (!products || products.length === 0)) {
        console.log('Delayed initialization of products...');
        initializeProducts();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading, products, initializeProducts]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === '' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = selectedRating === 0 || product.rating >= selectedRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort products based on selected sort option
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, selectedRating, sortBy]);

  // Get unique categories for filter
  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    const saveProducts = () => {
      try {
        if (!Array.isArray(products)) {
          throw new Error('Products must be an array');
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      } catch (err) {
        console.error('Error saving products:', err);
        toast.error(err.message || 'Failed to save products');
      }
    };

    if (!isLoading) {
      saveProducts();
    }
  }, [products, isLoading]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(lang === 'ar' ? 'تم إضافة المنتج إلى السلة' : 'Product added to cart');
  };

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('name');
    setPriceRange([0, 1000000]);
    setSelectedRating(0);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating
          ? 'fill-yellow-400 text-yellow-400'
          : 'text-gray-300 dark:text-gray-600'
          }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background dark:bg-background-dark py-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background dark:bg-background-dark py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {lang === 'ar' ? 'إعادة المحاولة' : 'Retry'}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background dark:bg-background-dark py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {lang === 'ar' ? 'منتجاتنا' : 'Our Products'}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {lang === 'ar'
                ? 'اكتشف تشكيلة واسعة من المنتجات عالية الجودة'
                : 'Discover a wide range of high-quality products'
              }
            </p>
          </motion.div>

          {/* Search and Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'البحث في المنتجات...' : 'Search products...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">{lang === 'ar' ? 'جميع الفئات' : 'All Categories'}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">{lang === 'ar' ? 'الاسم' : 'Name'}</option>
                <option value="price-asc">{lang === 'ar' ? 'السعر: من الأقل' : 'Price: Low to High'}</option>
                <option value="price-desc">{lang === 'ar' ? 'السعر: من الأعلى' : 'Price: High to Low'}</option>
                <option value="rating">{lang === 'ar' ? 'التقييم' : 'Rating'}</option>
                <option value="newest">{lang === 'ar' ? 'الأحدث' : 'Newest'}</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-3 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-3 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Advanced Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {lang === 'ar' ? 'فلاتر متقدمة' : 'Advanced Filters'}
              </button>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {lang === 'ar' ? 'نطاق السعر' : 'Price Range'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000000])}
                          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {lang === 'ar' ? 'التقييم الأدنى' : 'Minimum Rating'}
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                            className={`p-1 rounded ${selectedRating >= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          >
                            <Star className={`w-6 h-6 ${selectedRating >= rating ? 'fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        {lang === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {lang === 'ar'
                ? `تم العثور على ${filteredProducts.length} منتج`
                : `Found ${filteredProducts.length} products`
              }
            </p>
          </div>

          {/* Products Grid/List */}
          {!isLoading && filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {lang === 'ar' ? 'لا توجد منتجات' : 'No products found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {lang === 'ar'
                  ? products.length === 0
                    ? 'جاري تحميل المنتجات...'
                    : 'جرب تغيير معايير البحث أو الفلاتر'
                  : products.length === 0
                    ? 'Loading products...'
                    : 'Try adjusting your search criteria or filters'
                }
              </p>
              {products.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {lang === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
                }`}
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 ${viewMode === 'list' ? 'flex' : ''
                      }`}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onWishlistToggle={handleWishlistToggle}
                      isInWishlist={wishlistItems.some(item => item.id === product.id)}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
