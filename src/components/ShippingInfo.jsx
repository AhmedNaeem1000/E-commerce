import React from 'react';
import { useLang } from '../context/LangContext';
import { freeShippingThreshold } from '../data/shippingZones';

const ShippingInfo = ({ productPrice = 0 }) => {
  const { lang } = useLang();
  const remainingForFree = freeShippingThreshold - productPrice;
  const isEligibleForFreeShipping = productPrice >= freeShippingThreshold;

  return (
    <div className="border-t border-primary-500/10 pt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {lang === 'ar' ? 'معلومات الشحن' : 'Shipping Information'}
      </h3>

      <div className="space-y-3">
        {/* Free Shipping Threshold */}
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
            {lang === 'ar' ? `للطلبات فوق ${freeShippingThreshold} جنيه` : `Orders over ${freeShippingThreshold} EGP`}
          </span>
        </div>

        {/* Current Order Status */}
        {!isEligibleForFreeShipping && remainingForFree > 0 && (
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
                ? `${remainingForFree.toFixed(2)} جنيه متبقي`
                : `${remainingForFree.toFixed(2)} EGP remaining`
              }
            </span>
          </div>
        )}

        {isEligibleForFreeShipping && (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                {lang === 'ar' ? 'مؤهل للشحن المجاني!' : 'Eligible for free shipping!'}
              </span>
            </div>
          </div>
        )}

        {/* Shipping Zones Info */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {lang === 'ar' ? 'مناطق الشحن المتاحة:' : 'Available Shipping Zones:'}
            </span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>{lang === 'ar' ? 'القاهرة' : 'Cairo'}</span>
              <span>{lang === 'ar' ? '25 جنيه' : '25 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === 'ar' ? 'الجيزة' : 'Giza'}</span>
              <span>{lang === 'ar' ? '30 جنيه' : '30 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === 'ar' ? 'الإسكندرية' : 'Alexandria'}</span>
              <span>{lang === 'ar' ? '35 جنيه' : '35 EGP'}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {lang === 'ar' ? 'وغيرها من المناطق...' : 'And other regions...'}
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {lang === 'ar' ? 'وقت التوصيل: 1-7 أيام عمل' : 'Delivery Time: 1-7 business days'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo; 