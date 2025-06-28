import React from 'react';
import { useState, useEffect } from 'react';
import useProductData from '../hooks/useProductData';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart.jsx';
import { useTheme } from '../context/ThemeContext';
import useWishlistStore from '../hooks/useWishlist.js';

const ProductList = ({ limit, category, className = '' }) => {
  const { products, isLoading, error } = useProductData();
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    let filteredProducts = [...products];

    // Apply category filter if provided
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category === category
      );
    }

    // Apply limit if provided
    if (limit) {
      filteredProducts = filteredProducts.slice(0, limit);
    }

    setDisplayProducts(filteredProducts);
  }, [products, category, limit]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(limit || 4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-8">
        {error}
      </div>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        No products found
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {displayProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList; 