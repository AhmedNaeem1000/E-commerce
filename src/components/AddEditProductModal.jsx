import React, { useEffect, useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

const AddEditProductModal = ({ isOpen, onClose, onSubmit, product }) => {
  const { colorTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Phones',
    stock: '',
    images: [],
    discount: '0'
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        images: product.images || [],
        discount: (product.discount || 0).toString()
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Phones',
        stock: '',
        images: [],
        discount: '0'
      });
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, e.target.result]
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('يرجى اختيار ملف صورة صالح');
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, e.target.result]
          }));
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('يرجى اختيار ملف صورة صالح');
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category || !formData.images.length) {
      toast.error('جميع الحقول مطلوبة');
      return;
    }

    // التحقق من صحة الخصم فقط
    const discount = parseFloat(formData.discount);

    if (discount < 0 || discount > 100) {
      toast.error('الخصم يجب أن يكون بين 0 و 100');
      return;
    }

    const updatedProduct = {
      ...product,
      ...formData,
      id: product?.id || Date.now(),
      updatedAt: new Date().toISOString()
    };

    if (product) {
      updateProduct(updatedProduct);
    } else {
      addProduct(updatedProduct);
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Phones',
      stock: '',
      images: [],
      discount: '0'
    });
  };

  const updateProduct = (updatedProduct) => {
    try {
      console.log('updateProduct:', updatedProduct);
      if (!updatedProduct.id || !updatedProduct.name || !updatedProduct.price || !updatedProduct.modelUrl) {
        throw new Error('Missing required fields');
      }
      // ...
    } catch (err) {
      toast.error(err.message || 'فشل في تعديل المنتج');
      throw err;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* اسم المنتج */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              اسم المنتج *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="أدخل اسم المنتج"
              required
            />
          </div>

          {/* وصف المنتج */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              وصف المنتج *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="أدخل وصف المنتج"
              required
            />
          </div>

          {/* السعر والمخزون */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                السعر *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                المخزون *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* الفئة والخصم */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الفئة *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="Phones">هواتف</option>
                <option value="Laptops">حواسيب محمولة</option>
                <option value="Tablets">أجهزة لوحية</option>
                <option value="Accessories">ملحقات</option>
                <option value="Watches">ساعات</option>
                <option value="Headphones">سماعات</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الخصم (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* صور المنتج */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              صور المنتج *
            </label>
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {formData.images.length > 0 ? (
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="mx-auto max-h-48 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))}
                        className="text-red-500 hover:text-red-700 text-sm ml-2"
                      >
                        إزالة الصورة
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-primary hover:text-primary-dark font-medium">
                        اختر صورة
                      </span>
                      {' '}أو اسحب وأفلت
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      multiple
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF حتى 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              {product ? 'تحديث المنتج' : 'إضافة المنتج'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProductModal; 