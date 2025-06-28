import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductViewer3D from '../components/ProductViewer3D';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error('Product not found');
      navigate('/');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        toast.error('Maximum stock limit reached!');
        return;
      }
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart!');
  };

  const handleDeleteProduct = (product) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updated = products.filter(p => p.id !== product.id);
    localStorage.setItem('products', JSON.stringify(updated));
    // تحديث الحالة في الريأكت إذا لزم الأمر
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product 3D Viewer */}
        <div className="relative">
          <div className="w-full h-96 relative">
            <ProductViewer3D color={selectedColor && selectedColor.colorCode ? selectedColor.colorCode : null} modelUrl={product.modelUrl} />
            {/* ألوان المنتج */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-2 mt-4">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-600' : 'border-gray-300'} flex items-center justify-center focus:outline-none`}
                    style={{ backgroundColor: color.colorCode }}
                    title={color.colorName}
                  >
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                ({product.reviews.length} reviews)
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>

          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {lang === 'ar' ? `${product.price.toFixed(2)} ج.م` : `EGP ${product.price.toFixed(2)}`}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="text-gray-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg ${product.stock === 0
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Details
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Category:</span> {product.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Stock:</span> {product.stock} units
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 