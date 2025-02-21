import React from 'react';
import { Package } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl w-full border border-gray-700 scrollbar-none">
      <div className="relative flex items-start p-6">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400/10 rounded-lg" />
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-32 h-32 rounded-lg object-cover relative z-10 shadow-lg" 
          />
        </div>
        <div className="ml-6 flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white tracking-tight">{product.name}</h2>
            <p className="text-emerald-400 text-3xl font-bold">
            ₹ {product.price.toFixed(2)}
            </p>
          </div>
          <div className="text-emerald-400/80 text-sm mt-3 inline-flex items-center bg-emerald-400/10 px-3 py-1 rounded-full">
            <Package className="h-4 w-4 mr-2" />
            {product.stock} in stock
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6 py-4 border-t border-gray-700/50">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-800/40 transition-colors">
          <h3 className="text-emerald-400 font-semibold mb-3 text-lg">Nutrition Facts</h3>
          <div className="space-y-2">
            {[
              { label: 'Calories', value: product.nutrition.calories },
              { label: 'Protein', value: `${product.nutrition.protein}g` },
              { label: 'Carbs', value: `${product.nutrition.carbs}g` },
              { label: 'Fat', value: `${product.nutrition.fat}g` }
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-800/40 transition-colors">
          <h3 className="text-emerald-400 font-semibold mb-3 text-lg">Product Details</h3>
          <div className="space-y-2">
            {[
              { label: 'Origin', value: product.origin || 'Local Farm Fresh' },
              { label: 'Category', value: product.category || 'Fresh Produce' },
              { label: 'Storage', value: 'Room Temperature' },
              { label: 'Brand', value: product.brand }
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-700/50">
        <h3 className="text-emerald-400 font-semibold mb-3 text-lg">Brand Description</h3>
        <p className="text-gray-300 leading-relaxed">
          {product.brandDetails?.description || 'No brand description available.'}
        </p>
      </div>
    </div>
  );
}