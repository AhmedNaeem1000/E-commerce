import React from 'react';
import { useParams } from 'react-router-dom';
import useProductData from '../hooks/useProductData';
import ProductViewer3D from '../components/ProductViewer3D';
import Navbar from '../components/navbar';

const ProductPage = () => {
  const { id } = useParams();
  const { products } = useProductData();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-white/80">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-purple-900 py-12 px-0">
        <div className="w-full py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Viewer */}
            <div className="h-[600px]">
              <ProductViewer3D />
            </div>
            {/* Product Info */}
            <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-purple-900/70 backdrop-blur-md border border-white/10 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">{product.name}</h1>
              <p className="text-2xl text-blue-300 mb-6 font-bold">
                {lang === 'ar' ? `${product.price} ج.م` : `EGP ${product.price}`}
              </p>
              <p className="text-white/80 mb-8">{product.description}</p>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Features</h2>
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-center text-white/80">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-8 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage; 