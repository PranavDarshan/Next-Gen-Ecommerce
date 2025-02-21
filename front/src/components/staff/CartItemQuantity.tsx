import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { CartItemUpdate } from '../../types/cart';

interface CartItemQuantityProps {
  id: string;
  quantity: number;
  onUpdate: (update: CartItemUpdate) => void;
}

export function CartItemQuantity({ id, quantity, onUpdate }: CartItemQuantityProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onUpdate({ id, quantity: Math.max(1, quantity - 1) })}
        className="p-1 hover:bg-white/5 rounded text-green-400"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-green-400">{quantity}</span>
      <button
        onClick={() => onUpdate({ id, quantity: quantity + 1 })}
        className="p-1 hover:bg-white/5 rounded text-green-400"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}