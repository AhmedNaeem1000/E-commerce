import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { useShipping, useShippingSettings } from '../hooks/useShipping';
import { ShoppingCart } from 'lucide-react';
import Navbar from '../components/navbar';
import PromoCodeInput from '../components/PromoCodeInput';
import { useLang } from '../context/LangContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [appliedPromo, setAppliedPromo] = useState(null);
  const { shippingSettings } = useShippingSettings();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const {
    selectedZone,
    shippingCost,
    zoneInfo,
    isFreeShipping,
    getTotalWithShipping,
    getRemainingForFreeShipping,
    freeShippingThreshold
  } = useShipping(subtotal);

  const handleApplyPromo = (promoData) => {
    setAppliedPromo(promoData);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const getTotalWithPromo = () => {
    const totalWithShipping = getTotalWithShipping();
    const promoDiscount = appliedPromo ? appliedPromo.discount : 0;
    return Math.max(0, totalWithShipping - promoDiscount);
  };

  const handleCheckout = () => {
    navigate('/checkout'); // توجيه المستخدم إلى صفحة الدفع
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background dark:bg-background-dark py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-8">
            {t('cart')}
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-text/40 dark:text-text-dark/40 mb-4" />
              <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-2">
                {t('cartEmpty')}
              </h2>
              <p className="text-text/60 dark:text-text-dark/60 mb-6">
                {t('cartEmptyDescription')}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {t('startShopping')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-lg overflow-hidden">
                  <div className="divide-y divide-primary/10">
                    {cart.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-24 h-24">
                            <img
                              src={item.images?.[0] || item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-text dark:text-text-dark">
                                {item.name}
                              </h3>
                              <p className="text-lg font-medium text-text dark:text-text-dark">
                                {lang === 'ar' ? `${(item.price * item.quantity).toFixed(2)} ج.م` : `EGP ${(item.price * item.quantity).toFixed(2)}`}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-text/60 dark:text-text-dark/60">
                              {item.category}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center border border-primary/20 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-text dark:text-text-dark hover:bg-primary/10"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-text dark:text-text-dark">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-text dark:text-text-dark hover:bg-primary/10"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-accent hover:text-accent-dark"
                              >
                                {t('remove')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="mt-6">
                  <PromoCodeInput
                    subtotal={subtotal}
                    onApplyPromo={handleApplyPromo}
                    appliedPromo={appliedPromo}
                    onRemovePromo={handleRemovePromo}
                  />
                </div>

                {/* Shipping Information */}
                <div className="mt-6 bg-surface dark:bg-surface-dark rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-medium text-text dark:text-text-dark mb-4">
                    {lang === 'ar' ? 'معلومات الشحن' : 'Shipping Information'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                          {lang === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
                        </span>
                      </div>
                      <span className="text-sm text-green-700 dark:text-green-300">
                        {lang === 'ar' ? `للطلبات فوق ${shippingSettings.freeShippingThreshold} جنيه` : `Orders over ${shippingSettings.freeShippingThreshold} EGP`}
                      </span>
                    </div>

                    {subtotal < shippingSettings.freeShippingThreshold && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            {lang === 'ar' ? 'أضف المزيد للحصول على شحن مجاني' : 'Add more for free shipping'}
                          </span>
                        </div>
                        <span className="text-sm text-blue-700 dark:text-blue-300">
                          {lang === 'ar'
                            ? `${(shippingSettings.freeShippingThreshold - subtotal).toFixed(2)} جنيه متبقي`
                            : `${(shippingSettings.freeShippingThreshold - subtotal).toFixed(2)} EGP remaining`
                          }
                        </span>
                      </div>
                    )}

                    <div className="text-sm text-text/60 dark:text-text-dark/60">
                      {lang === 'ar'
                        ? `وقت التوصيل الافتراضي: ${shippingSettings.defaultDeliveryTime}`
                        : `Default delivery time: ${shippingSettings.defaultDeliveryTime}`
                      }
                    </div>

                    <div className="text-sm text-text/60 dark:text-text-dark/60">
                      {lang === 'ar'
                        ? 'سيتم تحديد تكلفة الشحن الدقيقة بناءً على المسافة من الخريطة'
                        : 'Exact shipping cost will be calculated based on distance from map'
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-lg p-6">
                  <h2 className="text-lg font-medium text-text dark:text-text-dark mb-4">
                    {t('orderSummary')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-text/80 dark:text-text-dark/80">
                      <span>{t('subtotal')}</span>
                      <span>{lang === 'ar' ? `${subtotal.toFixed(2)} ج.م` : `EGP ${subtotal.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-text/80 dark:text-text-dark/80">
                      <span>{t('shipping')}</span>
                      <span className={isFreeShipping ? 'text-green-600 dark:text-green-400' : ''}>
                        {isFreeShipping
                          ? (lang === 'ar' ? 'مجاني' : 'Free')
                          : (lang === 'ar' ? `ج.م ${shippingCost.toFixed(2)}` : `EGP ${shippingCost.toFixed(2)}`)
                        }
                      </span>
                    </div>

                    {/* Promo Discount */}
                    {appliedPromo && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>خصم الكوبون ({appliedPromo.code})</span>
                        <span>-{lang === 'ar' ? `${appliedPromo.discount.toFixed(2)} ج.م` : `EGP ${appliedPromo.discount.toFixed(2)}`}</span>
                      </div>
                    )}

                    {!isFreeShipping && getRemainingForFreeShipping() > 0 && (
                      <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                        {lang === 'ar'
                          ? `أضف ج.م ${getRemainingForFreeShipping().toFixed(2)} للحصول على شحن مجاني`
                          : `Add EGP ${getRemainingForFreeShipping().toFixed(2)} for free shipping`
                        }
                      </div>
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-lg font-semibold text-text dark:text-text-dark">
                        <span>{t('total')}</span>
                        <span>{lang === 'ar' ? `${getTotalWithPromo().toFixed(2)} ج.م` : `EGP ${getTotalWithPromo().toFixed(2)}`}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors duration-200"
                    onClick={handleCheckout}
                  >
                    {t('proceedToCheckout')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage; 