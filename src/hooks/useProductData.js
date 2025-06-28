import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'products';
const SYNC_EVENT = 'products-sync';

// بيانات افتراضية دائمة
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: 'أحدث هواتف آبل مع كاميرا متطورة وشريحة A17 Pro',
    price: 3999,
    originalPrice: 4499,
    discount: 11,
    category: 'Phones',
    rating: 4.8,
    reviews: 124,
    stock: 25,
    images: [
      '/img/13e09c5b-32b4-4e76-8bd0-93be5a1c9b7d.avif',
      '/img/1dfc6cf0-d146-475d-b26d-902d7db79c5e.avif',
      '/img/3558255e-34ef-40eb-a886-c94f630bc42c.avif'
    ],
    features: ['كاميرا 48MP', 'شريحة A17 Pro', 'شاشة 6.1 بوصة', 'بطارية 24 ساعة'],
    specifications: {
      'الشاشة': '6.1 بوصة OLED',
      'المعالج': 'A17 Pro',
      'الكاميرا': '48MP + 12MP + 12MP',
      'البطارية': '3650mAh'
    },
    createdAt: '2024-01-15T10:00:00.000Z',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    description: 'لابتوب احترافي مع شريحة M3 Pro وأداء استثنائي',
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    category: 'Laptops',
    rating: 4.9,
    reviews: 89,
    stock: 15,
    images: [
      '/img/42e61dba-7a45-4c48-93c6-081a26548a2e.avif',
      '/img/446bef85-5247-4c16-8e59-ede36b0a5f43.avif',
      '/img/5f53f2eb-40c8-41cb-8814-2af9e7a8e785.avif'
    ],
    features: ['شريحة M3 Pro', 'شاشة 14 بوصة Liquid Retina XDR', '16GB RAM', '512GB SSD'],
    specifications: {
      'الشاشة': '14 بوصة Liquid Retina XDR',
      'المعالج': 'M3 Pro',
      'الذاكرة': '16GB Unified Memory',
      'التخزين': '512GB SSD'
    },
    createdAt: '2024-01-10T14:30:00.000Z',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    description: 'سماعات لاسلكية مع إلغاء ضوضاء نشط وجودة صوت استثنائية',
    price: 899,
    originalPrice: 999,
    discount: 10,
    category: 'Headphones',
    rating: 4.7,
    reviews: 156,
    stock: 50,
    images: [
      '/img/65a5713a-6701-426c-af8e-8dbf7224ba78.avif',
      '/img/85ccde59-935e-45de-ab17-8adff68c7502.avif',
      '/img/99c8cb11-27d5-4cce-862c-fd6033617a6d.avif'
    ],
    features: ['إلغاء ضوضاء نشط', 'وضع الشفافية', 'مقاومة للماء والعرق', 'شحن لاسلكي'],
    specifications: {
      'نوع الاتصال': 'Bluetooth 5.0',
      'مدة البطارية': '6 ساعات',
      'المقاومة': 'IPX4',
      'الشحن': 'MagSafe'
    },
    createdAt: '2024-01-20T09:15:00.000Z',
    isFeatured: true,
    isBestSeller: false
  },
  {
    id: 4,
    name: 'iPad Air 5',
    description: 'تابلت متعدد الاستخدامات مع شريحة M1 وشاشة 10.9 بوصة',
    price: 2499,
    originalPrice: 2699,
    discount: 7,
    category: 'Tablets',
    rating: 4.6,
    reviews: 78,
    stock: 30,
    images: [
      '/img/ad20b85d-3b0e-44d0-808a-8a4ab316b57c.avif',
      '/img/b664a881-7f67-4d03-954d-ac523bf5ed29.avif',
      '/img/b6a70e6d-ae2b-4f69-a8e2-5cea1fc7e6b1.avif'
    ],
    features: ['شريحة M1', 'شاشة 10.9 بوصة Liquid Retina', 'دعم Apple Pencil', 'كاميرا 12MP'],
    specifications: {
      'الشاشة': '10.9 بوصة Liquid Retina',
      'المعالج': 'M1',
      'الكاميرا': '12MP Ultra Wide',
      'البطارية': '10 ساعات'
    },
    createdAt: '2024-01-12T11:45:00.000Z',
    isFeatured: false,
    isBestSeller: true
  },
  {
    id: 5,
    name: 'Apple Watch Series 9',
    description: 'ساعة ذكية متطورة مع تتبع صحي متقدم وشاشة Always-On',
    price: 1499,
    originalPrice: 1699,
    discount: 12,
    category: 'Watches',
    rating: 4.8,
    reviews: 203,
    stock: 40,
    images: [
      '/img/cfddb558-301a-4a8b-aa7b-508dce80347e.avif',
      '/img/d741b0c1-6dc9-4916-95bd-e2e60d47c22d.avif',
      '/img/ef69096d-6756-4192-b55d-99bec24a55fb.avif'
    ],
    features: ['تتبع القلب والأكسجين', 'ECG', 'شاشة Always-On', 'مقاومة للماء'],
    specifications: {
      'الشاشة': 'Always-On Retina',
      'المعالج': 'S9 SiP',
      'البطارية': '18 ساعة',
      'المقاومة': 'WR50'
    },
    createdAt: '2024-01-18T16:20:00.000Z',
    isFeatured: true,
    isBestSeller: false
  },
  {
    id: 6,
    name: 'Samsung Galaxy S24 Ultra',
    description: 'هاتف أندرويد الأكثر تطوراً مع قلم S Pen وكاميرا 200MP',
    price: 4499,
    originalPrice: 4999,
    discount: 10,
    category: 'Phones',
    rating: 4.7,
    reviews: 95,
    stock: 20,
    images: [
      '/img/f5ed25ec-abe9-4b88-8a40-355b1c68a204.avif',
      '/img/13e09c5b-32b4-4e76-8bd0-93be5a1c9b7d.avif',
      '/img/1dfc6cf0-d146-475d-b26d-902d7db79c5e.avif'
    ],
    features: ['كاميرا 200MP', 'قلم S Pen', 'شاشة 6.8 بوصة', 'بطارية 5000mAh'],
    specifications: {
      'الشاشة': '6.8 بوصة Dynamic AMOLED 2X',
      'المعالج': 'Snapdragon 8 Gen 3',
      'الكاميرا': '200MP + 12MP + 50MP + 10MP',
      'البطارية': '5000mAh'
    },
    createdAt: '2024-01-25T13:10:00.000Z',
    isFeatured: false,
    isBestSeller: true
  }
];

// Helper function to get products from localStorage
const getProductsFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate that it's an array
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn('Invalid products data in localStorage, resetting to empty array');
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
    } else {
      // Initialize with empty array if localStorage is empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
};

// Helper function to save products to localStorage
const saveProductsToStorage = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    // Dispatch custom event for real-time sync
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: products }));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
    throw error;
  }
};

const useProductData = create(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,

      // تهيئة البيانات الافتراضية
      initializeProducts: () => {
        const { products } = get();
        if (products.length === 0) {
          set({ products: DEFAULT_PRODUCTS });
        }
      },

      // إضافة منتج جديد
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          rating: 0,
          reviews: 0,
          isFeatured: false,
          isBestSeller: false
        };
        set(state => ({ products: [...state.products, newProduct] }));
      },

      // تحديث منتج
      updateProduct: (updatedProduct) => {
        set(state => ({
          products: state.products.map(product =>
            product.id === updatedProduct.id ? { ...product, ...updatedProduct, updatedAt: new Date().toISOString() } : product
          )
        }));
      },

      // حذف منتج
      deleteProduct: (productId) => {
        set(state => ({
          products: state.products.filter(product => product.id !== productId)
        }));
      },

      // إعادة تعيين للبيانات الافتراضية
      resetToDefaults: () => {
        set({ products: DEFAULT_PRODUCTS });
      },

      // الحصول على الإحصائيات
      getStats: () => {
        const { products } = get();
        const totalProducts = products.length;
        const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
        const lowStockItems = products.filter(product => product.stock < 10).length;

        const categoryBreakdown = products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        return {
          totalProducts,
          totalValue,
          lowStockItems,
          categoryBreakdown
        };
      }
    }),
    {
      name: 'products-storage',
      partialize: (state) => ({ products: state.products })
    }
  )
);

export default useProductData; 