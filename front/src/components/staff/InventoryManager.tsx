import React, { useState } from 'react';
import { MultiPhotoCapture } from './MultiPhotoCapture';
import { ProductForm } from './ProductForm';
import { Plus, RefreshCw } from 'lucide-react';

export function InventoryManager() {
  const [mode, setMode] = useState<'restock' | 'new' | null>(null);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {!mode ? (
        <div className="space-y-4">
          <button
            onClick={() => setMode('restock')}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <RefreshCw size={16} />
            Restock Existing Product
          </button>
          <button
            onClick={() => setMode('new')}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            Add New Product
          </button>
        </div>
      ) : mode === 'restock' ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Restock Product</h2>
          <MultiPhotoCapture
            required={1}
            onPhotosComplete={(photos) => {
              // Handle restock photos
              console.log('Restock photos:', photos);
            }}
          />
          <ProductForm mode="restock" onCancel={() => setMode(null)} />
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <MultiPhotoCapture
            required={3}
            onPhotosComplete={(photos) => {
              // Handle new product photos
              console.log('New product photos:', photos);
            }}
          />
          <ProductForm mode="new" onCancel={() => setMode(null)} />
        </div>
      )}
    </div>
  );
}