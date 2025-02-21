import React, { useState } from 'react';
import { Camera, Search, Loader2, FileIcon } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductCapture } from '../components/staff/ProductCapture';
import type { Product } from '../types/product';

const mockProducts = [
  {
    id: '1',
    name: 'Organic Banana',
    price: 0.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
    stock: 150,
    nutrition: {
      calories: 105,
      protein: 1.3,
      carbs: 27,
      fat: 0.3
    },
    brand: 'Organic Farms',
    brandDetails: {
      id: '1',
      name: 'Organic Farms',
      description: 'Organic Farms is committed to providing the highest quality organic produce. Our bananas are grown using sustainable farming practices, ensuring both environmental responsibility and superior taste.',
      foundedYear: 1995,
      country: 'Costa Rica'
    },
    category: 'Fresh Produce',
    reviews: [
      { id: '1', rating: 5, comment: 'Great quality!', userName: 'John D.', date: '2024-03-10' }
    ],
    description: 'Fresh organic bananas from sustainable farms'
  },
  {
    id: '2',
    name: 'Greek Yogurt',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    stock: 75,
    nutrition: {
      calories: 120,
      protein: 15.0,
      carbs: 9.0,
      fat: 2.5
    },
    brand: 'DairyPure',
    brandDetails: {
      id: '2',
      name: 'DairyPure',
      description: 'DairyPure specializes in authentic Greek-style dairy products made from the finest ingredients and traditional methods.',
      foundedYear: 1988,
      country: 'Greece'
    },
    category: 'Dairy',
    reviews: [
      { id: '2', rating: 4, comment: 'Creamy texture!', userName: 'Maria S.', date: '2024-03-15' },
      { id: '3', rating: 5, comment: 'Best Greek yogurt!', userName: 'Alex P.', date: '2024-03-12' }
    ],
    description: 'Authentic Greek yogurt made with traditional methods'
  },
  {
    id: '3',
    name: 'Quinoa Mix',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
    stock: 45,
    nutrition: {
      calories: 180,
      protein: 8.0,
      carbs: 32.0,
      fat: 3.0
    },
    brand: 'GrainWise',
    brandDetails: {
      id: '3',
      name: 'GrainWise',
      description: 'GrainWise sources the finest ancient grains from sustainable farmers worldwide, bringing nutritious alternatives to your table.',
      foundedYear: 2010,
      country: 'Peru'
    },
    category: 'Grains',
    reviews: [
      { id: '4', rating: 5, comment: 'Perfect for meal prep!', userName: 'Sarah K.', date: '2024-03-08' }
    ],
    description: 'Premium quinoa blend with ancient grains'
  },
  {
    id: '4',
    name: 'Wild Salmon Fillet',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6',
    stock: 25,
    nutrition: {
      calories: 208,
      protein: 22.0,
      carbs: 0.0,
      fat: 13.0
    },
    brand: 'OceanFresh',
    brandDetails: {
      id: '4',
      name: 'OceanFresh',
      description: 'OceanFresh provides sustainably caught seafood from the pristine waters of Alaska.',
      foundedYear: 2005,
      country: 'USA'
    },
    category: 'Seafood',
    reviews: [
      { id: '5', rating: 5, comment: 'Restaurant quality!', userName: 'Mike R.', date: '2024-03-14' },
      { id: '6', rating: 4, comment: 'Very fresh taste', userName: 'Lisa M.', date: '2024-03-11' }
    ],
    description: 'Wild-caught Alaskan salmon, rich in omega-3'
  },
  {
    id: '5',
    name: 'Organic Avocado',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
    stock: 100,
    nutrition: {
      calories: 160,
      protein: 2.0,
      carbs: 8.5,
      fat: 14.7
    },
    brand: 'Fresh Fields',
    brandDetails: {
      id: '5',
      name: 'Fresh Fields',
      description: 'Fresh Fields works directly with organic farmers in Mexico to bring you the freshest avocados year-round.',
      foundedYear: 2000,
      country: 'Mexico'
    },
    category: 'Fresh Produce',
    reviews: [
      { id: '7', rating: 4, comment: 'Always perfectly ripe!', userName: 'Tom B.', date: '2024-03-13' }
    ],
    description: 'Creamy organic avocados from Mexico'
  },
  {
    id: '6',
    name: 'Almond Butter',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d',
    stock: 60,
    nutrition: {
      calories: 190,
      protein: 7.0,
      carbs: 6.0,
      fat: 16.0
    },
    brand: 'NutriNut',
    brandDetails: {
      id: '6',
      name: 'NutriNut',
      description: 'NutriNut crafts small-batch nut butters using traditional stone-grinding methods for the perfect texture.',
      foundedYear: 2015,
      country: 'USA'
    },
    category: 'Spreads',
    reviews: [
      { id: '8', rating: 5, comment: 'So smooth and creamy!', userName: 'Emma W.', date: '2024-03-09' },
      { id: '9', rating: 5, comment: 'Best almond butter ever', userName: 'David L.', date: '2024-03-07' }
    ],
    description: 'Stone-ground organic almond butter'
  },
  {
    id: '7',
    name: 'Matcha Green Tea',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97',
    stock: 30,
    nutrition: {
      calories: 5,
      protein: 1.0,
      carbs: 0.0,
      fat: 0.0
    },
    brand: 'TeaHarmony',
    brandDetails: {
      id: '7',
      name: 'TeaHarmony',
      description: 'TeaHarmony sources premium matcha directly from traditional tea farms in Uji, Japan.',
      foundedYear: 2012,
      country: 'Japan'
    },
    category: 'Beverages',
    reviews: [
      { id: '10', rating: 5, comment: 'Exceptional quality!', userName: 'Jenny H.', date: '2024-03-12' }
    ],
    description: 'Premium ceremonial grade matcha green tea'
  }
];

export function CustomerPortal() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedProducts, setScannedProducts] = useState<Product[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const scanProduct = async (file: File) => {
    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);

      const response = await fetch('http://localhost:8080/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const productData = await response.json();
      
      const nutritionInfo = JSON.parse(productData.nutritionalInformation);
      
      const product: Product = {
        id: productData.productId.toString(),
        name: productData.productName,
        price: productData.price,
        image: URL.createObjectURL(file),
        stock: productData.stock,
        category: productData.category,
        nutrition: {
          calories: parseFloat(nutritionInfo.calories),
          protein: parseFloat(nutritionInfo.protein),
          carbs: parseFloat(nutritionInfo.carbohydrates),
          fat: parseFloat(nutritionInfo.fat)
        },
        brand: productData.brand.brandName,
        brandDetails: {
          id: productData.brand.brandId.toString(),
          name: productData.brand.brandName,
          description: productData.brand.brandDescription || 'No brand description available',
          foundedYear: productData.brand.brandFoundationYear,
          country: productData.brand.brandCountry
        },
        reviews: [],
        description: productData.description || ''
      };

      setScannedProducts(prevProducts => [...prevProducts, product]);
    } catch (error) {
      console.error('Error scanning product:', error);
    } finally {
      setIsProcessing(false);
      setIsCapturing(false);
    }
  };

  const handleCapture = async (imageDataUrl: string) => {
    try {
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
      await scanProduct(file);
    } catch (error) {
      console.error('Error processing captured image:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      try {
        setIsProcessing(true);
        await scanProduct(file);
      } catch (error) {
        console.error('Failed to detect product:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const displayedProducts = [
    ...scannedProducts,
    ...mockProducts.filter(p => !scannedProducts.some(sp => sp.id === p.id))
  ];

  return (
    <div className="space-y-8">
  {/* Header */}
  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
    Customer Portal
  </h1>

  {/* Search Bar & Buttons Container */}
  <div className="flex items-center justify-between">
    {/* Search Bar */}
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input pl-10 w-full"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>

    {/* Buttons */}
    <div className="flex space-x-4 ml-4">
      <button
        onClick={() => setIsCapturing(!isCapturing)}
        className="button-primary flex items-center space-x-2"
      >
        <Camera className="h-5 w-5" />
        <span>Scan Product</span>
      </button>
      <label
        htmlFor="file-upload"
        className="button-primary flex items-center space-x-2 cursor-pointer"
      >
        <FileIcon className="h-5 w-5" />
        <span>Upload Image</span>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  </div>

  {/* Conditional rendering for processing/capturing */}
  {isProcessing ? (
    <div className="card p-4">
      <div className="flex items-center justify-center text-gray-200">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Processing product...</span>
      </div>
    </div>
  ) : (
    isCapturing && (
      <div className="card p-4">
        <ProductCapture onCapture={handleCapture} />
      </div>
    )
  )}

  {/* Products Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {displayedProducts.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

  );
}

