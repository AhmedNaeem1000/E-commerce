import React, { useState } from 'react';
import { Tag, Check, X, AlertCircle } from 'lucide-react';
import { validatePromoCode, calculateDiscount } from '../data/promotions';
import { useLang } from '../context/LangContext';

const PromoCodeInput = ({ subtotal, onApplyPromo, appliedPromo, onRemovePromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const { lang, t } = useLang();

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setValidationResult({ valid: false, message: 'يرجى إدخال كود الخصم' });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const result = validatePromoCode(promoCode, subtotal);

      if (result.valid) {
        const discount = calculateDiscount(result.promotion, subtotal);
        onApplyPromo({
          code: result.promotion.code,
          discount,
          promotion: result.promotion
        });
        setPromoCode('');
        setValidationResult({ valid: true, message: 'تم تطبيق الكوبون بنجاح!' });
      } else {
        setValidationResult(result);
      }
    } catch (error) {
      setValidationResult({ valid: false, message: 'حدث خطأ في التحقق من الكوبون' });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemovePromo = () => {
    onRemovePromo();
    setValidationResult(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyPromo();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
        <Tag className="h-5 w-5 mr-2 text-blue-500" />
        {t('promoCode')}
      </h3>

      {appliedPromo ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="text-green-800 dark:text-green-200 font-medium">
                  {appliedPromo.code}
                </p>
                <p className="text-green-600 dark:text-green-300 text-sm">
                  خصم: {appliedPromo.discount} ج.م
                </p>
              </div>
            </div>
            <button
              onClick={handleRemovePromo}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              title="إزالة الكوبون"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="أدخل كود الخصم"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isValidating}
            />
            <button
              onClick={handleApplyPromo}
              disabled={isValidating || !promoCode.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isValidating ? 'جاري التحقق...' : 'تطبيق'}
            </button>
          </div>

          {validationResult && (
            <div className={`flex items-center p-3 rounded-lg ${validationResult.valid
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
              {validationResult.valid ? (
                <Check className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className={`text-sm ${validationResult.valid
                ? 'text-green-800 dark:text-green-200'
                : 'text-red-800 dark:text-red-200'
                }`}>
                {validationResult.message}
              </span>
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>• أدخل كود الخصم واضغط تطبيق</p>
            <p>• يمكن استخدام كوبون واحد فقط لكل طلب</p>
            <p>• بعض الكوبونات تتطلب حد أدنى للطلب</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput; 