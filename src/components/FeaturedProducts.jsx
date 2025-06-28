import React from 'react';
import ProductCard from './ProductCard';
import useProductData from '../hooks/useProductData';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart.jsx';
import { useTheme } from '../context/ThemeContext';
import useWishlistStore from '../hooks/useWishlist.js';

const FeaturedProducts = () => {
  const { products, isLoading, error } = useProductData();
  const { addToCart } = useCart();
  const { colorTheme } = useTheme();
  const addToWishlist = useWishlistStore(state => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist);
  const wishlistItems = useWishlistStore(state => state.items) || [];

  if (isLoading) {
    return (
      <section id="featured-products" className="py-16 px-4 relative z-10 ">
        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 text-center mb-8 drop-shadow-lg">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      <section id="featured-products" className="py-16 px-4 relative z-10 ">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-3xl font-bold dark:text-white text-gray-900 text-center mb-8 drop-shadow-lg">
            Featured Products
          </h2>
          <div className="text-center text-accent-red">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="featured-products" className="py-16 px-4 relative z-10 ">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 drop-shadow-lg">
            Featured Products
          </h2>
          <div className="text-center text-gray-400">
            No products available yet
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-products" className="py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto relative">
        <motion.h2
          className="text-3xl font-bold text-center dark:text-white  text-gray-900  mb-8 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Featured Product
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onWishlistToggle={() => {
                  const isInWishlist = wishlistItems.some(item => item.id === product.id);
                  if (isInWishlist) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                isInWishlist={wishlistItems.some(item => item.id === product.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
