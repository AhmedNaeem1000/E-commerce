import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Percent, Tag } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { promotions as initialPromotions } from '../data/promotions';

const PromotionsManager = () => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newPromotion, setNewPromotion] = useState({
    code: '',
    discount: 0,
    type: 'percentage',
    minAmount: 0,
    maxDiscount: 0,
    validFrom: '',
    validTo: '',
    usageLimit: 0,
    isActive: true,
    description: '',
    descriptionEn: ''
  });
  const { lang, t } = useLang();

  useEffect(() => {
    const savedPromotions = localStorage.getItem('promotions');
    if (savedPromotions) {
      setPromotions(JSON.parse(savedPromotions));
    }
  }, []);

  const savePromotions = (newPromotions) => {
    setPromotions(newPromotions);
    localStorage.setItem('promotions', JSON.stringify(newPromotions));
  };

  const handleAdd = () => {
    if (!newPromotion.code || !newPromotion.description) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const promotion = {
      ...newPromotion,
      id: Date.now(),
      usedCount: 0
    };

    const updatedPromotions = [...promotions, promotion];
    savePromotions(updatedPromotions);

    setNewPromotion({
      code: '',
      discount: 0,
      type: 'percentage',
      minAmount: 0,
      maxDiscount: 0,
      validFrom: '',
      validTo: '',
      usageLimit: 0,
      isActive: true,
      description: '',
      descriptionEn: ''
    });
    setIsAdding(false);
  };

  const handleEdit = (promotion) => {
    setEditingId(promotion.id);
    setNewPromotion(promotion);
  };

  const handleSave = () => {
    const updatedPromotions = promotions.map(p =>
      p.id === editingId ? { ...newPromotion, id: editingId } : p
    );
    savePromotions(updatedPromotions);
    setEditingId(null);
    setNewPromotion({
      code: '',
      discount: 0,
      type: 'percentage',
      minAmount: 0,
      maxDiscount: 0,
      validFrom: '',
      validTo: '',
      usageLimit: 0,
      isActive: true,
      description: '',
      descriptionEn: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      const updatedPromotions = promotions.filter(p => p.id !== id);
      savePromotions(updatedPromotions);
    }
  };

  const toggleActive = (id) => {
    const updatedPromotions = promotions.map(p =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    savePromotions(updatedPromotions);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          إدارة العروض والكوبونات
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          إضافة عرض جديد
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                كود الخصم
              </label>
              <input
                type="text"
                value={newPromotion.code}
                onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="مثال: WELCOME10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                نوع الخصم
              </label>
              <select
                value={newPromotion.type}
                onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="percentage">نسبة مئوية</option>
                <option value="fixed">مبلغ ثابت</option>
                <option value="shipping">شحن مجاني</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                قيمة الخصم
              </label>
              <input
                type="number"
                value={newPromotion.discount}
                onChange={(e) => setNewPromotion({ ...newPromotion, discount: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder={newPromotion.type === 'percentage' ? '10' : '50'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الحد الأدنى للطلب
              </label>
              <input
                type="number"
                value={newPromotion.minAmount}
                onChange={(e) => setNewPromotion({ ...newPromotion, minAmount: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="100"
              />
            </div>

            {newPromotion.type === 'percentage' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الحد الأقصى للخصم
                </label>
                <input
                  type="number"
                  value={newPromotion.maxDiscount}
                  onChange={(e) => setNewPromotion({ ...newPromotion, maxDiscount: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="50"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                حد الاستخدام
              </label>
              <input
                type="number"
                value={newPromotion.usageLimit}
                onChange={(e) => setNewPromotion({ ...newPromotion, usageLimit: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                صالح من
              </label>
              <input
                type="date"
                value={newPromotion.validFrom}
                onChange={(e) => setNewPromotion({ ...newPromotion, validFrom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                صالح حتى
              </label>
              <input
                type="date"
                value={newPromotion.validTo}
                onChange={(e) => setNewPromotion({ ...newPromotion, validTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الوصف (عربي)
              </label>
              <input
                type="text"
                value={newPromotion.description}
                onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="وصف العرض بالعربية"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الوصف (English)
              </label>
              <input
                type="text"
                value={newPromotion.descriptionEn}
                onChange={(e) => setNewPromotion({ ...newPromotion, descriptionEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Offer description in English"
              />
            </div>

            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                checked={newPromotion.isActive}
                onChange={(e) => setNewPromotion({ ...newPromotion, isActive: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                نشط
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setNewPromotion({
                  code: '',
                  discount: 0,
                  type: 'percentage',
                  minAmount: 0,
                  maxDiscount: 0,
                  validFrom: '',
                  validTo: '',
                  usageLimit: 0,
                  isActive: true,
                  description: '',
                  descriptionEn: ''
                });
              }}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4 inline mr-1" />
              إلغاء
            </button>
            <button
              onClick={editingId ? handleSave : handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="h-4 w-4 inline mr-1" />
              {editingId ? 'حفظ' : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      {/* Promotions List */}
      <div className="space-y-4">
        {promotions.map((promotion) => (
          <div key={promotion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-5 w-5 text-blue-500" />
                  <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                    {promotion.code}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${promotion.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                    {promotion.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {lang === 'ar' ? promotion.description : promotion.descriptionEn}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">الخصم: </span>
                    <span className="font-medium">
                      {promotion.type === 'percentage' && `${promotion.discount}%`}
                      {promotion.type === 'fixed' && `${promotion.discount} ج.م`}
                      {promotion.type === 'shipping' && 'شحن مجاني'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">الحد الأدنى: </span>
                    <span className="font-medium">{promotion.minAmount} ج.م</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">المستخدم: </span>
                    <span className="font-medium">{promotion.usedCount}/{promotion.usageLimit}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">صالح حتى: </span>
                    <span className="font-medium">{new Date(promotion.validTo).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleActive(promotion.id)}
                  className={`p-2 rounded-lg ${promotion.isActive
                    ? 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                    : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                    }`}
                  title={promotion.isActive ? 'إيقاف' : 'تفعيل'}
                >
                  {promotion.isActive ? '⏸️' : '▶️'}
                </button>
                <button
                  onClick={() => handleEdit(promotion)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  title="تعديل"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(promotion.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  title="حذف"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsManager; 