import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductData from '../hooks/useProductData';
import { ShoppingCart, Heart, Star, ArrowLeft, Check, Share2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/navbar';
import { useLang } from '../context/LangContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Tilt from 'react-parallax-tilt';
import ShippingInfo from '../components/ShippingInfo';
import { Helmet } from 'react-helmet-async';
import useWishlistStore from '../hooks/useWishlist.js';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, isLoading, error } = useProductData();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { t, lang } = useLang();
  const [userRating, setUserRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const product = products.find(p => p.id === parseInt(id));
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlistStore();
  const isFavorite = wishlistItems.some(item => item.id === (product?.id));

  useEffect(() => {
    if (!product) return;
    const stored = localStorage.getItem('productRatings');
    if (stored) {
      const ratingsObj = JSON.parse(stored);
      setAllRatings(ratingsObj[product.id] || []);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const prev = (ratingsObj[product.id] || []).find(r => r.user === user.email);
      if (prev) setUserRating(prev.value);
    }
  }, [product && product.id]);

  const toggleWishlist = () => {
    if (!product) return;
    if (isFavorite) {
      removeFromWishlist(product.id);
      toast('Removed from wishlist 💔', { icon: '💔' });
    } else {
      addToWishlist(product);
      toast('Added to wishlist ❤️', { icon: '❤️' });
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        toast.error('Maximum stock limit reached!');
        return;
      }
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart!');

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const purchased = JSON.parse(localStorage.getItem('purchasedProducts') || '{}');
    const userPurchases = purchased[user.email] || [];
    const newPurchases = [...new Set([...userPurchases, ...cart.map(p => p.id)])];
    purchased[user.email] = newPurchases;
    localStorage.setItem('purchasedProducts', JSON.stringify(purchased));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const originalPrice = product?.discount > 0 ? (product.price / (1 - product.discount / 100)).toFixed(2) : null;

  const avgRating = allRatings.length > 0 ? (allRatings.reduce((a, b) => a + b.value, 0) / allRatings.length).toFixed(1) : 0;
  const reviewsCount = allRatings.length;

  const handleSubmitRating = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) return toast.error(t('pleaseLoginToRate'));
    const stored = localStorage.getItem('productRatings');
    const ratingsObj = stored ? JSON.parse(stored) : {};
    const ratings = ratingsObj[product.id] || [];
    const existing = ratings.find(r => r.user === user.email);
    let newRatings;
    if (existing) {
      newRatings = ratings.map(r => r.user === user.email ? { ...r, value: userRating } : r);
    } else {
      newRatings = [...ratings, { user: user.email, value: userRating }];
    }
    ratingsObj[product.id] = newRatings;
    localStorage.setItem('productRatings', JSON.stringify(ratingsObj));
    setAllRatings(newRatings);
    toast.success(t('ratingSubmitted'));
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user.email;
  const purchased = JSON.parse(localStorage.getItem('purchasedProducts') || '{}');
  const userPurchases = purchased[user.email] || [];
  const canRate = isLoggedIn && product?.id && userPurchases.includes(product.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div className="text-center py-12 text-accent">Product not found</div>;

  return (
    <>
      <Helmet>
        <title>{product?.name ? `${product.name} | متجر إلكتروني` : 'تفاصيل المنتج'}</title>
        <meta name="description" content={product?.description || 'تفاصيل المنتج في متجر إلكتروني.'} />
      </Helmet>
      <div className="min-h-screen bg-background dark:bg-background-dark py-8">
        <Navbar />
        <div className="w-full px-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center aspect-auto w-full">
                  {!imageError && product.images && product.images.length > 0 ? (
                    <Tilt glareEnable={true} glareMaxOpacity={0.18} scale={1.03} className="w-full">
                      <Zoom>
                        <img
                          src={product.images[mainImageIndex]}
                          alt={product.name}
                          className="w-full h-auto max-h-[400px] object-contain cursor-zoom-in rounded-xl shadow-2xl border border-primary-500/10 bg-white dark:bg-gray-900"
                          style={{ display: 'block', margin: '0 auto' }}
                          onError={handleImageError}
                        />
                      </Zoom>
                    </Tilt>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="text-gray-400 dark:text-gray-500">Image not available</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images && product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 ${mainImageIndex === idx ? 'border-primary' : 'border-transparent'}`}
                      onClick={() => setMainImageIndex(idx)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {product.name}
                  </h1>
                  {/* تقييم المنتج: نجوم + متوسط + عدد المراجعات */}
                  <div className="flex items-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-5 h-5 ${i <= Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill={i <= Math.round(avgRating) ? '#facc15' : 'none'} />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {avgRating} ({reviewsCount} {t('reviews')})
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {lang === 'ar' ? `${product.price.toFixed(2)} ج.م` : `EGP ${product.price.toFixed(2)}`}
                    </div>
                    {originalPrice && (
                      <div className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {lang === 'ar' ? `${originalPrice} ج.م` : `EGP ${originalPrice}`}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700/80 dark:text-gray-300/80">
                    {product.stock > 0 ? (
                      <span className="text-primary">
                        {t('inStock')} ({product.stock} {t('available')})
                      </span>
                    ) : (
                      <span className="text-accent">
                        {t('outOfStock')}
                      </span>
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700/80 dark:text-gray-300/80">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-primary-500/20 rounded-lg">
                      <button className="px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-primary-500/10">
                        -
                      </button>
                      <span className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        {quantity}
                      </span>
                      <button className="px-4 py-2 text-gray-900 dark:text-gray-100 hover:bg-primary-500/10">
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className={`flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors duration-200 ${product.stock === 0 ? 'cursor-not-allowed' : ''}`}
                    >
                      {t('addToCart')}
                    </button>
                  </div>
                </div>

                {/* Product Features */}
                <div className="border-t border-primary-500/10 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {t('productFeatures')}
                  </h3>
                  <ul className="space-y-2">
                    {product.features?.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700/80 dark:text-gray-300/80"
                      >
                        <Check className="h-5 w-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Information */}
                <ShippingInfo productPrice={product.price} />

                {/* تقييم المنتج (نافذة منبثقة) */}
                <div className="mb-6">
                  {!isLoggedIn ? (
                    <div className="mb-4 text-sm text-accent font-medium">
                      {t('pleaseLoginToRate')}
                    </div>
                  ) : canRate ? (
                    <>
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition mb-2"
                        onClick={() => setShowRatingModal(true)}
                      >
                        {t('rateProduct')}
                      </button>
                      {showRatingModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl w-full max-w-xs relative animate-fadeIn">
                            <button
                              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                              onClick={() => setShowRatingModal(false)}
                            >
                              &times;
                            </button>
                            <h3 className="text-lg font-semibold mb-4 text-center">{t('yourRating')}</h3>
                            <div className="flex items-center justify-center gap-2 mb-4">
                              {[1, 2, 3, 4, 5].map(i => (
                                <button key={i} type="button" onClick={() => setUserRating(i)}>
                                  <Star className={`w-8 h-8 ${i <= userRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill={i <= userRating ? '#facc15' : 'none'} />
                                </button>
                              ))}
                            </div>
                            <button
                              className="w-full px-4 py-2 bg-primary text-white rounded-lg"
                              onClick={() => { handleSubmitRating(); setShowRatingModal(false); }}
                              disabled={userRating === 0}
                            >
                              {t('submitReview')}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="mb-4 text-sm text-accent font-medium">
                      {t('rateAfterPurchase')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
