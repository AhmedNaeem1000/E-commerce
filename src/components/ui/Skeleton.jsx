import React from 'react';

// Skeleton for product cards
export const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3 w-1/2"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);

// Skeleton for product lists
export const ProductListSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

// Skeleton for text lines
export const TextSkeleton = ({ lines = 1, className = '' }) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className={`h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
      ></div>
    ))}
  </div>
);

// Skeleton for buttons
export const ButtonSkeleton = ({ width = 'w-24', height = 'h-10' }) => (
  <div className={`${width} ${height} bg-gray-300 dark:bg-gray-600 rounded animate-pulse`}></div>
);

// Skeleton for form inputs
export const InputSkeleton = ({ width = 'w-full', height = 'h-10' }) => (
  <div className={`${width} ${height} bg-gray-300 dark:bg-gray-600 rounded animate-pulse`}></div>
);

// Skeleton for tables
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        ))}
      </div>
    </div>
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="px-6 py-4">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Skeleton for profile cards
export const ProfileCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  </div>
);

// Skeleton for cart items
export const CartItemSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse">
    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
    <div className="flex-1">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
    </div>
    <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
); 