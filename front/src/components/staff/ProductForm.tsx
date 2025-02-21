import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

interface ProductFormProps {
  mode: 'restock' | 'new';
  onCancel: () => void;
}

export function ProductForm({ mode, onCancel }: ProductFormProps) {
  const [quantity, setQuantity] = useState('');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    nutrition: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'restock') {
      console.log('Restocking:', { quantity });
    } else {
      console.log('Adding new product:', { ...productData, quantity });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Quantity to {mode === 'restock' ? 'Add' : 'Stock'}
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          min="1"
        />
      </div>

      {mode === 'new' && (
        <>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              step="0.01"
              min="0"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Nutritional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(productData.nutrition).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="number"
                    id={key}
                    value={value}
                    onChange={(e) => setProductData({
                      ...productData,
                      nutrition: { ...productData.nutrition, [key]: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    step="0.1"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <X size={20} />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Save size={20} />
          {mode === 'restock' ? 'Update Stock' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}