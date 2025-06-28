import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useProductData from '../hooks/useProductData';
import Navbar from '../components/navbar';
import { useLang } from '../context/LangContext';
import useWishlistStore from '../hooks/useWishlist.js';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { products } = useProductData();
  const { t, lang } = useLang();
  const wishlistItems = useWishlistStore(state => state.items) || [];
  const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist);

  const getFullProductDetails = (item) => {
    return products.find(p => p.id === item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-12 px-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-white/60" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 drop-shadow-lg">{t('wishlistEmpty')}</h3>
              <p className="mt-1 text-sm text-white/60">
                {t('startAdding')}
              </p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-full text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t('browseProducts')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-white mb-8 drop-shadow-lg">{t('wishlist')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => {
              const product = getFullProductDetails(item) || item;
              return (
                <ProductCard
                  key={item.id}
                  product={product}
                  onAddToCart={() => { }}
                  onWishlistToggle={() => removeFromWishlist(item.id)}
                  isInWishlist={true}
                  viewMode="grid"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
