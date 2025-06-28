import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const ThankYou = () => {
  const { t } = useLang();
  const [order, setOrder] = useState(null);
  const [orderIndex, setOrderIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // جلب آخر طلب من سجل الطلبات
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length === 0) {
      navigate('/');
      return;
    }
    setOrder(orders[orders.length - 1]);
    setOrderIndex(orders.length); // رقم الطلب (تسلسلي)
  }, [navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center py-12 px-4">
      <div className="max-w-xl mx-auto px-4 py-16 text-center rounded-2xl shadow-2xl bg-white dark:bg-gray-800 backdrop-blur-md border border-primary-500/10">
        <div className="mb-8">
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
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">شكرًا لطلبك!</h1>
        <p className="text-lg text-gray-700/80 dark:text-gray-300/80 mb-4">تم استلام طلبك بنجاح.</p>
        <div className="mb-6 text-left">
          <div className="font-semibold mb-2">رقم الطلب: <span className="text-primary">#{orderIndex}</span></div>
          <div className="mb-2">الاسم: {order.fullName}</div>
          <div className="mb-2">العنوان: {order.address}</div>
          <div className="mb-2">رقم الهاتف: {order.phone}</div>
          <div className="mb-2">طريقة الدفع: {order.paymentMethod === 'card' ? 'بطاقة بنكية' : order.paymentMethod === 'paypal' ? 'PayPal' : order.paymentMethod === 'apple' ? 'Apple Pay' : 'عند الاستلام'}</div>
          <div className="mb-2">تاريخ الطلب: {new Date(order.date).toLocaleString('ar-EG')}</div>
        </div>
        <div className="mb-6">
          <div className="font-semibold mb-2">ملخص المنتجات:</div>
          <ul className="text-sm text-gray-800 dark:text-gray-200 mb-2">
            {order.cart && order.cart.map((item, idx) => (
              <li key={item.id || idx} className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-1">
                <span>{item.name} × {item.quantity}</span>
                <span>{`ج.م ${(item.price * item.quantity).toFixed(2)}`}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold mt-2">المجموع: {order.cart ? `ج.م ${order.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}` : ''}</div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200"
          >
            العودة للرئيسية
          </Link>
          <Link
            to="/my-orders"
            className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200"
          >
            عرض طلباتي
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 