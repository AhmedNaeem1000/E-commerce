import React from 'react';
import { Tag, ArrowRight, Clock, Percent } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { promotions } from '../data/promotions';

const PromoBanner = () => {
  const { lang, t } = useLang();

  // Get active promotions
  const activePromotions = promotions.filter(promo => promo.isActive);

  if (activePromotions.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Tag className="w-8 h-8 mr-2" />
            {lang === 'ar' ? 'عروض خاصة' : 'Special Offers'}
          </h2>
          <p className="text-lg opacity-90">
            {lang === 'ar' ? 'استفد من كوبونات الخصم الحصرية' : 'Take advantage of exclusive discount codes'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePromotions.slice(0, 3).map((promo) => (
            <div key={promo.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Percent className="w-6 h-6 mr-2" />
                  <span className="text-2xl font-bold">{promo.discount}%</span>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-sm font-mono font-bold">{promo.code}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {lang === 'ar' ? promo.description : promo.descriptionEn}
              </h3>

              <div className="flex items-center justify-between text-sm opacity-80">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {lang === 'ar' ? 'صالح حتى' : 'Valid until'} {new Date(promo.validTo).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">
                    {lang === 'ar' ? 'الحد الأدنى' : 'Min'}: {promo.minAmount} ج.م
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {lang === 'ar' ? 'المستخدم' : 'Used'}: {promo.usedCount}/{promo.usageLimit}
                  </span>
                  <div className="w-16 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(promo.usedCount / promo.usageLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            {lang === 'ar' ? 'شاهد جميع العروض' : 'View All Offers'}
            <ArrowRight className="w-5 h-5 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
