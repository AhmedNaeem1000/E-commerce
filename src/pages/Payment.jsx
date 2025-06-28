import React, { useState } from 'react';
import { CreditCard, Lock, Shield, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const navigate = useNavigate();
  const { colorTheme } = useTheme();

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission
  };

  const handleConfirmOrder = () => {
    // تحقق من اختيار طريقة الدفع
    if (!paymentMethod) {
      toast.error('يرجى اختيار طريقة الدفع');
      return;
    }
    // إذا كانت بطاقة، تحقق من إدخال البيانات
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast.error('يرجى إدخال بيانات البطاقة كاملة');
        return;
      }
    }
    // اجلب بيانات الشحن من localStorage
    const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo') || '{}');
    if (!checkoutInfo.fullName) {
      toast.error('بيانات الشحن غير مكتملة');
      navigate('/checkout');
      return;
    }
    // حفظ الطلب (يمكنك هنا إرسال البيانات للباك اند مستقبلاً)
    const order = {
      ...checkoutInfo,
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : undefined,
      date: new Date().toISOString(),
      cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    };
    // حفظ الطلب في localStorage (سجل الطلبات)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    // تفريغ السلة
    localStorage.removeItem('cart');
    // حذف بيانات الشحن المؤقتة
    localStorage.removeItem('checkoutInfo');
    // رسالة نجاح
    toast.success('تم تأكيد الطلب بنجاح!');
    // الانتقال لصفحة الشكر
    setTimeout(() => {
      navigate('/thank-you');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-4">
              Payment
            </h1>
            <p className="text-text/60 dark:text-text-dark/60">
              Complete your purchase securely
            </p>
          </div>

          <div className="bg-surface dark:bg-surface-dark rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text dark:text-text-dark">
                Payment Method
              </h2>
              <div className="flex items-center text-primary-600 dark:text-primary-400">
                <Lock className="w-5 h-5 mr-2" />
                <span className="text-sm">Secure Payment</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-colors duration-200 ${paymentMethod === 'card'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-primary/20 text-text/60 dark:text-text-dark/60 hover:bg-primary/5'
                  }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-colors duration-200 ${paymentMethod === 'paypal'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-primary/20 text-text/60 dark:text-text-dark/60 hover:bg-primary/5'
                  }`}
              >
                <img
                  src="/paypal-logo.png"
                  alt="PayPal"
                  className="h-5 w-auto"
                />
                <span>PayPal</span>
              </button>
              <button
                onClick={() => setPaymentMethod('apple')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-colors duration-200 ${paymentMethod === 'apple'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-primary/20 text-text/60 dark:text-text-dark/60 hover:bg-primary/5'
                  }`}
              >
                <img
                  src="/apple-pay-logo.png"
                  alt="Apple Pay"
                  className="h-5 w-auto"
                />
                <span>Apple Pay</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-text/80 dark:text-text-dark/80 mb-2"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 rounded-lg bg-background dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary text-text dark:text-text-dark"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cardName"
                    className="block text-sm font-medium text-text/80 dark:text-text-dark/80 mb-2"
                  >
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg bg-background dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary text-text dark:text-text-dark"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-text/80 dark:text-text-dark/80 mb-2"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded-lg bg-background dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary text-text dark:text-text-dark"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-text/80 dark:text-text-dark/80 mb-2"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      className="w-full px-4 py-2 rounded-lg bg-background dark:bg-background-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary text-text dark:text-text-dark"
                    />
                  </div>
                </div>
              </form>
            )}

            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <p className="text-text/60 dark:text-text-dark/60 mb-4">
                  You will be redirected to PayPal to complete your payment
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-primary-gradient hover:bg-primary-gradient-hover text-white rounded-lg transition-all duration-300 transform hover:scale-105">
                  Continue with PayPal
                </button>
              </div>
            )}

            {paymentMethod === 'apple' && (
              <div className="text-center py-8">
                <p className="text-text/60 dark:text-text-dark/60 mb-4">
                  Complete your purchase with Apple Pay
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200">
                  Pay with Apple Pay
                </button>
              </div>
            )}
          </div>

          <div className="bg-surface dark:bg-surface-dark rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-text dark:text-text-dark mb-2">
                  Secure Payment
                </h3>
                <p className="text-sm text-text/60 dark:text-text-dark/60">
                  Your payment information is encrypted and secure. We never store
                  your full card details.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-accent-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-text dark:text-text-dark mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-text/60 dark:text-text-dark/60">
                  If you encounter any issues during payment, please contact our
                  support team.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-primary-gradient hover:bg-primary-gradient-hover text-white py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              تأكيد الطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
