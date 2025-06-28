import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Navbar from '../components/navbar';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const navigate = useNavigate();
  const { colorTheme } = useTheme();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on mount and when cart is updated
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedItems = cartItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );

      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      toast.success('Cart updated!');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeItem = (itemId) => {
    try {
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary-gradient hover:bg-primary-gradient-hover text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ج.م {item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Minus size={20} className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="w-8 text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Plus size={20} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      ج.م {(item.price * item.quantity).toFixed(2)}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-accent-red transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ج.م {calculateSubtotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-lg font-medium text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>ج.م {calculateSubtotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary-gradient hover:bg-primary-gradient-hover text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/products"
                    className="block text-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
