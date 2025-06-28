import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import Tilt from 'react-parallax-tilt';
import { toast as toastifyToast } from 'react-toastify';
import { getProductOffer, calculateProductDiscount } from '../data/promotions';

const ProductCard = React.memo(({
  product,
  onAddToCart = () => { },
  onWishlistToggle = () => { },
  isInWishlist = false,
  viewMode = 'grid'
}) => {
  const [imageError, setImageError] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const { colorTheme } = useTheme();

  // Get product offer
  const productOffer = getProductOffer(product.id);
  const offerDiscount = calculateProductDiscount(product, productOffer);
  const finalPrice = product.price - offerDiscount;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
    window.dispatchEvent(new Event('cart-item-added'));
    toastifyToast.success('تمت إضافة المنتج إلى السلة بنجاح!');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const originalPrice = product.discount > 0 ? (product.price / (1 - product.discount / 100)).toFixed(2) : null;

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

  // List View
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="flex">
          {/* Product Image */}
          <div className="w-48 h-48 flex-shrink-0 relative">
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.25}
              glareColor="#fff"
              glarePosition="all"
              scale={1.02}
              transitionSpeed={250}
              className="w-full h-full"
            >
              {product.images?.[0] || product.image && !imageError ? (
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={handleImageError}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-700">
                  <span className="text-gray-400 dark:text-gray-600">
                    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                      <rect width="64" height="64" rx="16" fill="#e5e7eb" />
                      <path d="M32 16L48 24V40L32 48L16 40V24L32 16Z" stroke="#6366f1" strokeWidth="2.5" />
                      <path d="M32 48V32" stroke="#6366f1" strokeWidth="2.5" />
                      <path d="M32 32L48 24" stroke="#6366f1" strokeWidth="2.5" />
                      <path d="M32 32L16 24" stroke="#6366f1" strokeWidth="2.5" />
                    </svg>
                  </span>
                </div>
              )}
            </Tilt>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-200 ${isInWishlist
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
                  }`}
              />
            </button>

            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-lg">
                {product.discount}% {lang === 'ar' ? 'خصم' : 'OFF'}
              </div>
            )}

            {/* Product Offer Badge */}
            {productOffer && !product.discount && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-lg animate-pulse">
                {productOffer.discount}% خصم
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                    {product.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {renderStars(product.rating || 0)}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({product.rating || 0}/5)
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                <span className={`text-sm font-medium ${product.stock > 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
                  }`}>
                  {product.stock > 0
                    ? `${lang === 'ar' ? 'متوفر' : 'In Stock'} (${product.stock})`
                    : lang === 'ar' ? 'نفذ المخزون' : 'Out of Stock'
                  }
                </span>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div>
                {productOffer ? (
                  <>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {lang === 'ar' ? `${finalPrice.toFixed(2)} ج.م` : `EGP ${finalPrice.toFixed(2)}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      {lang === 'ar' ? `${product.price} ج.م` : `EGP ${product.price}`}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                      خصم {productOffer.discount}%
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {lang === 'ar' ? `${product.price} ج.م` : `EGP ${product.price}`}
                    </p>
                    {originalPrice && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {lang === 'ar' ? `${originalPrice} ج.م` : `EGP ${originalPrice}`}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/product/${product.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                </Link>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                    }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {showAddedMessage
                    ? (lang === 'ar' ? 'تم الإضافة!' : 'Added!')
                    : (lang === 'ar' ? 'أضف للسلة' : 'Add to Cart')
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      <Link
        to={`/product/${product.id}`}
        className="block"
      >
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${isInWishlist
              ? 'fill-red-500 text-red-500'
              : 'text-gray-600 dark:text-gray-400 group-hover:text-red-500'
              }`}
          />
        </button>

        {/* Discount badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-lg">
            {product.discount}% {lang === 'ar' ? 'خصم' : 'OFF'}
          </div>
        )}

        {/* Product Offer Badge */}
        {productOffer && !product.discount && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-lg animate-pulse">
            {productOffer.discount}% خصم
          </div>
        )}

        {/* Product Image */}
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.25}
          glareColor="#fff"
          glarePosition="all"
          scale={1.04}
          transitionSpeed={250}
          className="w-full h-64"
        >
          {product.images?.[0] || product.image && !imageError ? (
            <img
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="w-full bg-white  h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-700">
              <span className="text-gray-400 dark:text-gray-600">
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                  <rect width="64" height="64" rx="16" fill="#e5e7eb" />
                  <path d="M32 16L48 24V40L32 48L16 40V24L32 16Z" stroke="#6366f1" strokeWidth="2.5" />
                  <path d="M32 48V32" stroke="#6366f1" strokeWidth="2.5" />
                  <path d="M32 32L48 24" stroke="#6366f1" strokeWidth="2.5" />
                  <path d="M32 32L16 24" stroke="#6366f1" strokeWidth="2.5" />
                </svg>
              </span>
            </div>
          )}
        </Tilt>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              {renderStars(product.rating || 0)}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.rating || 0}/5)
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
              {product.category}
            </span>
            <span className={`text-xs font-medium ${product.stock > 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
              }`}>
              {product.stock > 0
                ? `${lang === 'ar' ? 'متوفر' : 'In Stock'}`
                : lang === 'ar' ? 'نفذ المخزون' : 'Out of Stock'
              }
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {productOffer ? (
                <>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    {lang === 'ar' ? `${finalPrice.toFixed(2)} ج.م` : `EGP ${finalPrice.toFixed(2)}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {lang === 'ar' ? `${product.price} ج.م` : `EGP ${product.price}`}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                    خصم {productOffer.discount}%
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {lang === 'ar' ? `${product.price} ج.م` : `EGP ${product.price}`}
                  </p>
                  {originalPrice && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      {lang === 'ar' ? `${originalPrice} ج.م` : `EGP ${originalPrice}`}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full rounded-lg ${product.stock === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
            } px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
        >
          <ShoppingCart className="w-4 h-4" />
          {showAddedMessage
            ? (lang === 'ar' ? 'تم الإضافة!' : 'Added!')
            : (lang === 'ar' ? 'أضف للسلة' : 'Add to Cart')
          }
        </button>
      </div>
    </motion.div>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number,
    discount: PropTypes.number,
    category: PropTypes.string,
    stock: PropTypes.number,
    createdAt: PropTypes.string
  }).isRequired,
  onAddToCart: PropTypes.func,
  onWishlistToggle: PropTypes.func,
  isInWishlist: PropTypes.bool,
  viewMode: PropTypes.oneOf(['grid', 'list'])
};

export default ProductCard;

