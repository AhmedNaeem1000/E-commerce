const STORAGE_KEY = 'products';
const SYNC_EVENT = 'products-sync';

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

// جلب جميع المنتجات
export async function fetchProducts() {
  return getProductsFromStorage();
}

// جلب منتج واحد
export async function fetchProductById(id) {
  const products = getProductsFromStorage();
  return products.find(p => p.id === Number(id));
}

// إضافة منتج جديد
export async function addProduct(product) {
  const products = getProductsFromStorage();
  const newProduct = {
    ...product,
    id: Date.now(),
    price: Number(product.price),
    stock: Number(product.stock),
    discount: Number(product.discount || 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updatedProducts = [...products, newProduct];
  saveProductsToStorage(updatedProducts);
  return newProduct;
}

// تعديل منتج
export async function updateProduct(id, updatedData) {
  const products = getProductsFromStorage();
  const idx = products.findIndex(p => p.id === Number(id));

  if (idx !== -1) {
    const updatedProduct = {
      ...products[idx],
      ...updatedData,
      price: Number(updatedData.price),
      stock: Number(updatedData.stock),
      discount: Number(updatedData.discount || 0),
      updatedAt: new Date().toISOString()
    };

    products[idx] = updatedProduct;
    saveProductsToStorage(products);
    return updatedProduct;
  }

  throw new Error('Product not found');
}

// حذف منتج
export async function deleteProduct(id) {
  const products = getProductsFromStorage();
  const idx = products.findIndex(p => p.id === Number(id));

  if (idx !== -1) {
    products.splice(idx, 1);
    saveProductsToStorage(products);
    return true;
  }

  throw new Error('Product not found');
}

// إعادة تعيين المنتجات إلى مصفوفة فارغة
export async function resetProducts() {
  saveProductsToStorage([]);
  return [];
} 