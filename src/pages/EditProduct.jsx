import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    images: [],
    category: 'Phones',
    discount: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load product data on component mount
  useEffect(() => {
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const product = products.find(p => p.id === parseInt(id));

      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          images: product.images,
          category: product.category,
          discount: product.discount.toString()
        });
      } else {
        toast.error('Product not found');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product');
      navigate('/admin');
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return false;
    }
    if (!formData.images.length) {
      toast.error('At least one image URL is required');
      return false;
    }
    if (formData.discount < 0 || formData.discount > 100) {
      toast.error('Discount must be between 0 and 100');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Get existing products
      const products = JSON.parse(localStorage.getItem('products') || '[]');

      // Find product index
      const productIndex = products.findIndex(p => p.id === parseInt(id));

      if (productIndex === -1) {
        toast.error('Product not found');
        return;
      }

      // Create updated product
      const updatedProduct = {
        ...products[productIndex],
        name: formData.name,
        price: parseFloat(formData.price),
        images: formData.images,
        category: formData.category,
        discount: parseFloat(formData.discount)
      };

      // Update products array
      products[productIndex] = updatedProduct;

      // Save to localStorage
      localStorage.setItem('products', JSON.stringify(products));

      // Show success message
      toast.success('Product updated successfully');

      // Redirect after delay
      setTimeout(() => {
        navigate('/admin');
      }, 1500);

    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin')}
          className="mb-6 inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Edit Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product title"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
              />
            </div>

            {/* Images */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Images (one per line)
              </label>
              <textarea
                id="images"
                name="images"
                value={formData.images.join('\n')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  images: e.target.value.split('\n').map(url => url.trim())
                }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image URLs"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Phones">Phones</option>
                <option value="Laptops">Laptops</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Discount */}
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter discount percentage"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct; 