import React from 'react';
import { ShoppingCart, Heart, Package, Search, User, AlertCircle } from 'lucide-react';

const EmptyState = ({
  type = 'default',
  title,
  description,
  icon: Icon,
  action,
  className = ''
}) => {
  const defaultStates = {
    cart: {
      icon: ShoppingCart,
      title: 'Your cart is empty',
      description: 'Looks like you haven\'t added any items to your cart yet. Start shopping to discover amazing products!'
    },
    wishlist: {
      icon: Heart,
      title: 'Your wishlist is empty',
      description: 'Start adding some products to your wishlist! Browse our collection and save your favorites.'
    },
    orders: {
      icon: Package,
      title: 'No orders yet',
      description: 'You haven\'t placed any orders yet. Start shopping to see your order history here.'
    },
    search: {
      icon: Search,
      title: 'No results found',
      description: 'We couldn\'t find any products matching your search. Try different keywords or browse our categories.'
    },
    profile: {
      icon: User,
      title: 'Profile not found',
      description: 'Unable to load your profile information. Please try refreshing the page.'
    },
    error: {
      icon: AlertCircle,
      title: 'Something went wrong',
      description: 'We encountered an error while loading this page. Please try again later.'
    }
  };

  const state = defaultStates[type] || defaultStates.default;
  const IconComponent = Icon || state.icon;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500">
        <IconComponent size={64} />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title || state.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {description || state.description}
      </p>

      {action && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action}
        </div>
      )}
    </div>
  );
};

// Specific empty state components
export const EmptyCart = ({ action }) => (
  <EmptyState
    type="cart"
    action={action}
  />
);

export const EmptyWishlist = ({ action }) => (
  <EmptyState
    type="wishlist"
    action={action}
  />
);

export const EmptyOrders = ({ action }) => (
  <EmptyState
    type="orders"
    action={action}
  />
);

export const EmptySearch = ({ action }) => (
  <EmptyState
    type="search"
    action={action}
  />
);

export const EmptyProfile = ({ action }) => (
  <EmptyState
    type="profile"
    action={action}
  />
);

export const ErrorState = ({ title, description, action }) => (
  <EmptyState
    type="error"
    title={title}
    description={description}
    action={action}
  />
);

export default EmptyState; 