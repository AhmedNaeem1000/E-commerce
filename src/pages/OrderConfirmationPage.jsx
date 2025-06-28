import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';

const OrderConfirmationPage = () => {
  const { lang } = useLang();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // استرجاع بيانات الطلب من localStorage
    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    }
  }, []);

  const generateOrderNumber = () => {
    return '#' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center rounded-2xl shadow-2xl bg-surface dark:bg-surface-dark backdrop-blur-md border border-primary/10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-text dark:text-text-dark mb-4 drop-shadow-lg"
        >
          {lang === 'ar' ? 'تم تأكيد الطلب!' : 'Order Confirmed!'}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-text/80 dark:text-text-dark/80 mb-8"
        >
          {lang === 'ar'
            ? 'شكراً لك على الشراء. تم استلام طلبك وجاري معالجته.'
            : 'Thank you for your purchase. Your order has been received and is being processed.'
          }
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-surface/70 dark:bg-surface-dark/10 rounded-xl p-6 mb-8 shadow-lg backdrop-blur-md border border-primary/10"
        >
          <h2 className="text-2xl font-semibold text-text dark:text-text-dark mb-4 drop-shadow-lg">
            {lang === 'ar' ? 'تفاصيل الطلب' : 'Order Details'}
          </h2>
          <div className="space-y-2 text-text/80 dark:text-text-dark/80 text-left">
            <p>
              {lang === 'ar' ? 'رقم الطلب:' : 'Order Number:'} {generateOrderNumber()}
            </p>
            <p>
              {lang === 'ar' ? 'التاريخ:' : 'Date:'} {new Date().toLocaleDateString()}
            </p>
            <p>
              {lang === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'} {lang === 'ar' ? 'بطاقة ائتمان' : 'Credit Card'}
            </p>
            {orderData && (
              <>
                <p>
                  {lang === 'ar' ? 'الاسم:' : 'Name:'} {orderData.firstName} {orderData.lastName}
                </p>
                <p>
                  {lang === 'ar' ? 'البريد الإلكتروني:' : 'Email:'} {orderData.email}
                </p>
                <p>
                  {lang === 'ar' ? 'العنوان:' : 'Address:'} {orderData.address}, {orderData.city}
                </p>
                {orderData.zoneInfo && (
                  <>
                    <p>
                      {lang === 'ar' ? 'منطقة الشحن:' : 'Shipping Zone:'} {lang === 'ar' ? orderData.zoneInfo.name : orderData.zoneInfo.nameEn}
                    </p>
                    <p>
                      {lang === 'ar' ? 'وقت التوصيل:' : 'Delivery Time:'} {orderData.zoneInfo.deliveryTime}
                    </p>
                  </>
                )}
                <p>
                  {lang === 'ar' ? 'الشحن:' : 'Shipping:'} {orderData.shippingCost === 0
                    ? (lang === 'ar' ? 'مجاني' : 'Free')
                    : (lang === 'ar' ? `ج.م ${orderData.shippingCost.toFixed(2)}` : `EGP ${orderData.shippingCost.toFixed(2)}`)
                  }
                </p>
                <p>
                  {lang === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'} {lang === 'ar' ? `ج.م ${orderData.subtotal.toFixed(2)}` : `EGP ${orderData.subtotal.toFixed(2)}`}
                </p>
                <p className="font-semibold">
                  {lang === 'ar' ? 'الإجمالي:' : 'Total:'} {lang === 'ar' ? `ج.م ${orderData.total.toFixed(2)}` : `EGP ${orderData.total.toFixed(2)}`}
                </p>
              </>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200"
          >
            {lang === 'ar' ? 'مواصلة التسوق' : 'Continue Shopping'}
          </Link>
          <p className="text-text/60 dark:text-text-dark/60">
            {lang === 'ar'
              ? 'تم إرسال رسالة تأكيد إلى بريدك الإلكتروني.'
              : 'A confirmation email has been sent to your email address.'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 