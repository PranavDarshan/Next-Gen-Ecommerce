import type { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartItemUpdate {
  id: string;
  quantity: number;
}