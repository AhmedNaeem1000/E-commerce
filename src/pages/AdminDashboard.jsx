import React, { useState, useEffect } from 'react';
import { Plus, Search, Grid, List, RotateCcw, RefreshCw, Settings, Tag } from 'lucide-react';
import useProductData from '../hooks/useProductData';
import { useShippingSettings } from '../hooks/useShipping';
import AddEditProductModal from '../components/AddEditProductModal';
import ProductTable from '../components/ProductTable';
import ProductCard from '../components/ProductCard';
import DashboardStats from '../components/DashboardStats';
import RecentOrdersTable from '../components/RecentOrdersTable';
import AdminNavbar from '../components/AdminNavbar';
import PromotionsManager from '../components/PromotionsManager';
import { useLang } from '../context/LangContext';

const AdminDashboard = () => {
  const { products, isLoading, error, addProduct, updateProduct, deleteProduct, resetToDefaults, getStats } = useProductData();
  const { shippingSettings, updateSetting, saveSettings } = useShippingSettings();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, products, promotions, reports
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    categoryBreakdown: []
  });

  const { lang, t } = useLang();

  // Update stats whenever products change
  useEffect(() => {
    setStats(getStats());
  }, [products]);

  const handleAddProduct = (productData) => {
    addProduct(productData);
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (productData) => {
    updateProduct(productData);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      deleteProduct(product.id);
    }
  };

  const handleClearStorage = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleResetProducts = () => {
    if (window.confirm('Are you sure you want to reset all products to defaults?')) {
      resetToDefaults();
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(product => product.category))];

  // دالة ترجمة التصنيفات
  const translateCategory = (category) => {
    const map = {
      Phones: lang === 'ar' ? 'هواتف' : 'Phones',
      Laptops: lang === 'ar' ? 'لابتوبات' : 'Laptops',
      Headphones: lang === 'ar' ? 'سماعات' : 'Headphones',
      Accessories: lang === 'ar' ? 'اكسسوارات' : 'Accessories',
      // أضف المزيد حسب الحاجة
    };
    return map[category] || category;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500 dark:text-red-400">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('adminDashboard')}
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleClearStorage}
              className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 text-sm font-medium rounded-md text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              title={t('clearAll')}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              {t('clearAll')}
            </button>
            <button
              onClick={handleResetProducts}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title={t('resetProducts')}
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              {t('resetProducts')}
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('addProduct')}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              {t('dashboard')}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'products'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              {t('products')}
            </button>
            <button
              onClick={() => setActiveTab('promotions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'promotions'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              <Tag className="h-4 w-4 inline mr-1" />
              العروض والكوبونات
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'shipping'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              <Settings className="h-4 w-4 inline mr-1" />
              إعدادات الشحن
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'reports'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              {t('reports')}
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats */}
            <DashboardStats stats={stats} />

            {/* Recent Orders */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('recentOrders')}
              </h2>
              <RecentOrdersTable />
            </div>
          </>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <>
            {/* Search and Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder={t('searchProducts')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  <option value="">{t('allCategories')}</option>
                  <option value="electronics">{t('electronics')}</option>
                  <option value="clothing">{t('clothing')}</option>
                  <option value="books">{t('books')}</option>
                  <option value="home">{t('home')}</option>
                </select>
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={() => {
                      setSelectedProduct(product);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={() => handleDeleteProduct(product)}
                    isAdmin={true}
                  />
                ))}
              </div>
            ) : (
              <ProductTable
                products={filteredProducts}
                onEdit={(product) => {
                  setSelectedProduct(product);
                  setIsEditModalOpen(true);
                }}
                onDelete={handleDeleteProduct}
              />
            )}
          </>
        )}

        {/* Promotions Tab */}
        {activeTab === 'promotions' && (
          <PromotionsManager />
        )}

        {/* Shipping Settings Tab */}
        {activeTab === 'shipping' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              إعدادات الشحن العامة
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* إعدادات الشحن الأساسية */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  إعدادات الشحن الأساسية
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الحد الأدنى للطلب المجاني (ج.م)
                  </label>
                  <input
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) => updateSetting('freeShippingThreshold', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    تكلفة الشحن الافتراضية (ج.م)
                  </label>
                  <input
                    type="number"
                    value={shippingSettings.defaultShippingCost}
                    onChange={(e) => updateSetting('defaultShippingCost', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    وقت التوصيل الافتراضي
                  </label>
                  <input
                    type="text"
                    value={shippingSettings.defaultDeliveryTime}
                    onChange={(e) => updateSetting('defaultDeliveryTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="3-5 أيام عمل"
                  />
                </div>
              </div>

              {/* إعدادات الخريطة */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  إعدادات الخريطة
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    نصف قطر التوصيل (كم)
                  </label>
                  <input
                    type="number"
                    value={shippingSettings.deliveryRadius}
                    onChange={(e) => updateSetting('deliveryRadius', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    تكلفة الشحن لكل كم إضافي (ج.م)
                  </label>
                  <input
                    type="number"
                    value={shippingSettings.costPerKm}
                    onChange={(e) => updateSetting('costPerKm', parseFloat(e.target.value))}
                    step="0.5"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    وقت التوصيل لكل 10 كم إضافي
                  </label>
                  <input
                    type="text"
                    value={shippingSettings.timePer10Km}
                    onChange={(e) => updateSetting('timePer10Km', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="+1 يوم"
                  />
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                ملاحظة مهمة:
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                هذه الإعدادات تستخدم كقيم افتراضية لحساب تكلفة الشحن بناءً على المسافة من الخريطة.
                يمكن تخصيص التكلفة لكل منطقة محددة من خلال نظام الخريطة التفاعلي.
              </p>
            </div>

            {/* أزرار الحفظ */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  const defaultSettings = {
                    freeShippingThreshold: 500,
                    defaultShippingCost: 50,
                    defaultDeliveryTime: '3-5 أيام عمل',
                    deliveryRadius: 50,
                    costPerKm: 2,
                    timePer10Km: '+1 يوم'
                  };
                  saveSettings(defaultSettings);
                  alert('تم إعادة تعيين إعدادات الشحن');
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                إعادة تعيين
              </button>
              <button
                onClick={() => {
                  saveSettings(shippingSettings);
                  alert('تم حفظ إعدادات الشحن بنجاح');
                }}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                حفظ الإعدادات
              </button>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {t('salesReports')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">{t('totalSales')}</h3>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">ج.م {stats.totalValue}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 dark:text-green-400">{t('totalProducts')}</h3>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.totalProducts}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">{t('lowStock')}</h3>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{stats.lowStockItems}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">الطلبات اليوم</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">12</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('categoryBreakdown')}</h3>
              <div className="space-y-2">
                {stats.categoryBreakdown.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <AddEditProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddProduct}
          mode="add"
        />

        <AddEditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditProduct}
          mode="edit"
          product={selectedProduct}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;