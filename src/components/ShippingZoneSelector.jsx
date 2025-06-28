import React from 'react';
import { useLang } from '../context/LangContext';
import { getAllShippingZones } from '../data/shippingZones';

const ShippingZoneSelector = ({ selectedZone, onZoneChange, subtotal = 0, freeShippingThreshold = 1000 }) => {
  const { lang } = useLang();
  const zones = getAllShippingZones();

  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFree = freeShippingThreshold - subtotal;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {lang === 'ar' ? 'منطقة الشحن' : 'Shipping Zone'}
        </h3>
        {!isFreeShipping && remainingForFree > 0 && (
          <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
            {lang === 'ar'
              ? `أضف ${remainingForFree.toFixed(2)} جنيه للحصول على شحن مجاني`
              : `Add ${remainingForFree.toFixed(2)} EGP for free shipping`
            }
          </div>
        )}
        {isFreeShipping && (
          <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
            {lang === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {zones.map((zone) => {
          const isSelected = selectedZone === zone.id;
          const cost = isFreeShipping ? 0 : zone.cost;

          return (
            <div
              key={zone.id}
              onClick={() => onZoneChange(zone.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${isSelected
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50'
                }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {lang === 'ar' ? zone.name : zone.nameEn}
                  </h4>
                  {isSelected && (
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {zone.deliveryTime}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {lang === 'ar' ? 'سعر الشحن:' : 'Shipping Cost:'}
                  </span>
                  <span className={`text-sm font-bold ${cost === 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-900 dark:text-white'
                    }`}>
                    {cost === 0
                      ? (lang === 'ar' ? 'مجاني' : 'Free')
                      : `${cost.toFixed(2)} ${lang === 'ar' ? 'جنيه' : 'EGP'}`
                    }
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedZone && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {lang === 'ar' ? 'المنطقة المختارة:' : 'Selected Zone:'}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {lang === 'ar'
                ? zones.find(z => z.id === selectedZone)?.name
                : zones.find(z => z.id === selectedZone)?.nameEn
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingZoneSelector; 