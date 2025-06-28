import React, { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

const RecentOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const { lang, t } = useLang();

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // ترتيب تنازلي حسب التاريخ وأخذ آخر 5 فقط
    const sorted = allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(sorted.slice(0, 5));
  }, [lang]);

  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 text-center text-gray-500 dark:text-gray-400">
        {t('noOrdersYet')}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('recentOrders')}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{t('orderNumber')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{t('date')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{t('total')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2 whitespace-nowrap">{order.id || idx + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.date ? new Date(order.date).toLocaleDateString() : '-'}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.total ? `${order.total} ج.م` : '-'}</td>
                <td className="px-4 py-2 whitespace-nowrap">{order.status || t('new')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable; 