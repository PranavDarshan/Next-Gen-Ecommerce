import React, { useState } from 'react';
import { MultiPhotoCapture } from './MultiPhotoCapture';
import { CreditCard } from 'lucide-react';

export function OrderProcessor() {
  const [customerId, setCustomerId] = useState('');
  const [orderPhotos, setOrderPhotos] = useState<string[]>([]);

  const handleTransaction = () => {
    if (!customerId || orderPhotos.length === 0) {
      alert('Please provide customer ID and product photos');
      return;
    }
    // Process transaction
    console.log('Processing transaction:', { customerId, orderPhotos });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Process Order</h2>
      
      <div className="mb-6">
        <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-2">
          Customer ID
        </label>
        <input
          type="text"
          id="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter customer ID"
        />
      </div>

      <MultiPhotoCapture
        required={1}
        onPhotosComplete={setOrderPhotos}
        title="Capture Product Photo"
      />

      <button
        onClick={handleTransaction}
        disabled={!customerId || orderPhotos.length === 0}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300"
      >
        <CreditCard size={20} />
        Process Transaction
      </button>
    </div>
  );
}