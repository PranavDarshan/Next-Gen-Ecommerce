import React, { useState } from 'react';
import { ProductCapture } from './ProductCapture';
import { Loader2, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../types/product';

interface Toast {
  message: string;
  type: 'success' | 'error';
}

interface RestockFormProps {
  onRestock: (product: Product, quantity: number) => void;
}

export function RestockForm({ onRestock }: RestockFormProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Hide after 3 seconds
  };

  const handleProductCapture = async (image: string) => {
    await processImage(image);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUrl = reader.result as string;
        await processImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (image: string) => {
    try {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append('file', dataURLtoFile(image, 'product.jpg'));

      const response = await fetch('http://localhost:8080/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to scan product');
      }

      const detectedProduct = await response.json();
      const productWithImage = { ...detectedProduct, image };
      setProduct(productWithImage);

    } catch (error) {
      console.error('Failed to detect product:', error);
      showToast('Failed to detect product', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const updateStock = async (productName: string, newStock: number) => {
    try {
      const response = await fetch('http://localhost:8080/api/update-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
          stock: newStock,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to update stock:', error);
      throw error;
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (!mimeMatch) {
      throw new Error('Invalid data URL format');
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product && quantity > 0) {
      try {
        setIsProcessing(true);
        const newStock = product.stock + quantity;
        const updatedProduct = await updateStock(product.productName, newStock);

        const finalProduct = { ...product, stock: newStock };
        onRestock(finalProduct, quantity);
        
        showToast(`Successfully restocked ${quantity} ${product.productName}`, 'success');
        setProduct(null);
        setQuantity(1);
      } catch (error) {
        console.error('Failed to process restock:', error);
        showToast('Failed to update stock', 'error');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="space-y-6 relative">
    {/* Toast Notification */}
    {toast && (
      <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-md shadow-lg transition-all duration-500 ${
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}>
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
        {toast.message}
      </div>
    )}
  
    {isProcessing ? (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-green-400" />
        <span className="ml-2 text-green-400">Processing product...</span>
      </div>
    ) : !product ? (
      <div>
        {/* Centering the buttons and making them properly formatted */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`button w-full md:w-auto ${!useFileUpload ? 'button-primary' : 'button-secondary'}`}
            onClick={() => setUseFileUpload(false)}
          >
            Use Webcam
          </button>
          <button
            className={`button w-full md:w-auto ${useFileUpload ? 'button-primary' : 'button-secondary'}`}
            onClick={() => setUseFileUpload(true)}
          >
            Upload File
          </button>
        </div>
  
        {useFileUpload ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-input"
          />
        ) : (
          <div className="flex justify-center">
            <ProductCapture onCapture={handleProductCapture} buttonText="Scan Product to Restock" />
          </div>
        )}
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4 card p-4">
          <img src={product.image} alt={product.name} className="w-24 h-24 rounded-md object-cover" />
          <div>
            <h3 className="font-medium text-green-400">{product.name}</h3>
            <p className="text-green-400">Current stock: {product.stock}</p>
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1 text-green-400">Quantity to Add</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
            className="input text-gray-200"
            min="1"
            required
          />
        </div>
  
        <div className="flex space-x-3">
          <button type="submit" className="flex-1 button-primary">
            Confirm Restock
          </button>
          <button
            type="button"
            onClick={() => {
              setProduct(null);
              setQuantity(1);
            }}
            className="button-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    )}
  </div>
  
  );
}