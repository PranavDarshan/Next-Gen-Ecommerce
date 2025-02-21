import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { NewProductForm } from '../../components/staff/NewProductForm';
import { RestockForm } from '../../components/staff/RestockForm';
import type { Product } from '../../types/product';

export function InventoryPage() {
  const [showNewProduct, setShowNewProduct] = useState(false);

  const handleRestock = (product: Product, quantity: number) => {
    console.log(`Restocking ${quantity} units of ${product.name}`);
    // Handle the restock operation
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
          Inventory Management
        </h1>
        <button
          onClick={() => setShowNewProduct(true)}
          className="button-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {showNewProduct ? (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-200">Add New Product</h2>
            <button
              onClick={() => setShowNewProduct(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
          </div>
          <NewProductForm />
        </div>
      ) : (
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">Restock Product</h2>
          <RestockForm onRestock={handleRestock} />
        </div>
      )}
    </div>
  );
}