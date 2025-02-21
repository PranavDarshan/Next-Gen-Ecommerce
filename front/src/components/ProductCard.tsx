import React, { useState } from 'react';
import { Star, Info, Package, ShoppingCart } from 'lucide-react';
import type { Product } from '../types/product';
import { cn } from '../lib/utils';
import { Modal } from './ui/Modal';
import { ProductDetails } from './ProductDetails';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const averageRating = product.reviews?.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length || 0;

  const formatNutrition = (value: number) => value.toFixed(1);

  const getStockDisplay = (stock: number) => {
    if (stock <= 0) return 'Out of stock';
    return stock === 1 ? '1 in stock' : `${stock} in stock`;
  };

  const getStockStatusClass = (stock: number) => 
    stock > 0 ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400";

  return (
    <>
      <div 
        className="group relative cursor-pointer rounded-xl bg-gray-900/50 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetails(true)}
      >
        <div className="transform transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-emerald-500/10">
          {/* Image container */}
          <div className="relative overflow-hidden rounded-t-xl">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            {/* Hover overlay */}
            <div 
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent",
                "transform transition-all duration-300 ease-in-out",
                isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
            >
              <div className="flex h-full flex-col justify-end p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Product Details</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {[
                      { label: 'Brand', value: product.brand },
                      { label: 'Category', value: product.category },
                    ].map(({ label, value }) => (
                      <li key={label} className="flex items-center space-x-2">
                        <span className="w-20 text-gray-400">{label}:</span>
                        <span className="text-gray-200">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Content container */}
          <div className="space-y-4 p-4">
            {/* Title and rating */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                {product.name}
              </h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-emerald-400" />
                <span className="ml-1 text-emerald-400">{averageRating.toFixed(1)}</span>
                <span className="ml-2 text-gray-400">({product.reviews?.length || 0} reviews)</span>
              </div>
            </div>
            
            {/* Price and stock */}
            <div className="flex items-end justify-between">
              <div className="relative">
                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-green-200 bg-clip-text">
                ₹ {product.price.toFixed(2)}
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-green-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              <span className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors duration-300",
                getStockStatusClass(product.stock)
              )}>
                {getStockDisplay(product.stock)}
              </span>
            </div>

            {/* Nutrition info */}
            <div className="transform rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 group-hover:border-emerald-500/20 group-hover:bg-white/10">
              <h4 className="mb-3 flex items-center font-medium text-gray-300">
                <Info className="mr-2 h-4 w-4 text-emerald-400" />
                Nutrition Facts
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Calories', value: product.nutrition.calories },
                  { label: 'Protein', value: `${product.nutrition.protein}g` },
                  { label: 'Carbs', value: `${product.nutrition.carbs}g` },
                  { label: 'Fat', value: `${product.nutrition.fat}g` }
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-gray-400">{label}:</span>
                    <span className="text-gray-200">{formatNutrition(parseFloat(value))}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <ProductDetails product={product} />
      </Modal>
    </>
  );
}