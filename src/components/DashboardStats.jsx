import React, { useEffect, useState } from 'react';
import { ShoppingBag, User } from 'lucide-react';
import { useLang } from '../context/LangContext';

const DashboardStats = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(1); // فقط مستخدم واحد حالياً
  const { lang, t } = useLang();

  useEffect(() => {
    // جلب عدد الطلبات من localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrdersCount(orders.length);
    // إذا أضفت نظام مستخدمين مستقبلاً، عدل هنا
    setUsersCount(1);
  }, [lang]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
        <ShoppingBag className="w-10 h-10 text-blue-500 mr-4" />
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t('totalOrders')}</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ordersCount}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
        <User className="w-10 h-10 text-green-500 mr-4" />
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t('totalUsers')}</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{usersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats; 