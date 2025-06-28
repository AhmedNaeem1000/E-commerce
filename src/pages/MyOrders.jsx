import React, { useState, useEffect } from 'react';
import { Package, ChevronRight } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.reverse()); // الأحدث أولاً
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 dark:text-green-400';
      case 'processing':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'shipped':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-text/60 dark:text-text-dark/60';
    }
  };

  // فلترة حسب التاب
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  }).filter(order => {
    if (!searchQuery) return true;
    return (
      (order.fullName && order.fullName.includes(searchQuery)) ||
      (order.address && order.address.includes(searchQuery)) ||
      (order.phone && order.phone.includes(searchQuery))
    );
  });

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-4 md:mb-0">
            طلباتي
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في الطلبات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 w-full sm:w-64 rounded-lg bg-surface dark:bg-surface-dark border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary text-text dark:text-text-dark"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {['all', 'processing', 'shipped', 'delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-surface dark:bg-surface-dark text-text/60 dark:text-text-dark/60 hover:bg-primary/5'
                }`}
            >
              {tab === 'all' ? 'الكل' : tab === 'processing' ? 'قيد المعالجة' : tab === 'shipped' ? 'تم الشحن' : 'تم التوصيل'}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, idx) => (
            <div
              key={order.orderIndex || idx}
              className="bg-surface dark:bg-surface-dark rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text dark:text-text-dark">
                      طلب رقم #{order.orderIndex || idx + 1}
                    </h3>
                    <p className="text-sm text-text/60 dark:text-text-dark/60">
                      بتاريخ {order.date ? new Date(order.date).toLocaleDateString('ar-EG') : '-'}
                    </p>
                    <p className="text-sm text-text/60 dark:text-text-dark/60">
                      {order.cart ? order.cart.length : 0} منتج
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {lang === 'ar' ? `ج.م ${order.cart ? order.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2) : '0.00'}` : `EGP ${order.cart ? order.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2) : '0.00'}`}
                  </p>
                  <span
                    className={`text-sm font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status === 'delivered' ? 'تم التوصيل' : order.status === 'shipped' ? 'تم الشحن' : order.status === 'processing' ? 'قيد المعالجة' : 'جديد'}
                  </span>
                  <span className="text-sm text-text/60 dark:text-text-dark/60">
                    {order.phone}
                  </span>
                </div>

                {/* تفاصيل الطلب (اختياري) */}
                {/* <button className="inline-flex items-center text-primary hover:text-primary-dark">
                  تفاصيل
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button> */}
              </div>
              {/* ملخص المنتجات */}
              {order.cart && order.cart.length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {order.cart.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-text/80 dark:text-text-dark/80 border-b border-dashed border-border-color dark:border-border-color-dark pb-1">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{`ج.م ${(item.price * item.quantity).toFixed(2)}`}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-text/40 dark:text-text-dark/40 mb-4" />
            <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-2">
              لا توجد طلبات بعد
            </h2>
            <p className="text-text/60 dark:text-text-dark/60 mb-6">
              لم تقم بأي طلب حتى الآن.
            </p>
            <a href="/" className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200">
              تسوق الآن
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
