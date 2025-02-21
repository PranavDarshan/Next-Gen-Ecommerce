import React, { useState, useCallback } from 'react';
import { ProductCapture } from './ProductCapture';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { CartItemQuantity } from './CartItemQuantity';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Bill from "./Bill"; // Import Bill component
import autoTable from "jspdf-autotable";

const createTransaction = async (request: TransactionRequest): Promise<Transaction> => {
    console.log('Transaction Request:', request);
    const response = await fetch('http://localhost:8080/api/billing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Transaction failed: ${response.statusText}`);
    }

    return response.json();
  };

  const updateProductStock = async (productName: string, newStock: number): Promise<Product> => {
    const response = await fetch('http://localhost:8080/api/update-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: productName,
        stock: newStock
      } as StockUpdateRequest),
    });

    if (!response.ok) {
      throw new Error(`Stock update failed: ${response.statusText}`);
    }

    return response.json();
  };



interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  id1?: string;
}

interface CartItemUpdate {
  id: string;
  quantity: number;
}

interface TransactionRequest {
  productId: string;
  customerId: string;
  storeId: string;
  quantity: number;
  unitPrice: number;
}

export function BillingForm() {
  const [customerId, setCustomerId] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<Record<string, string>>({});
  const [showBill, setShowBill] = useState(false);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock: number;
    id1?: string;
  }

const generateBillPDF = (customerId: string, cartItems: CartItem[], gstRate = 18) => {
  const doc = new jsPDF();

  // Base64-encoded logo (Replace with actual Base64 string)
  const shopLogo = "data:image/png;base64,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"; // Add full Base64 string here

  // Define ₹ symbol using Unicode
  const rupeeSymbol = "Rs."; // ₹
  const shopname = localStorage.getItem('storeName') as string;
  const shopadress = localStorage.getItem('storeLoc') as string;
  const shopemail = localStorage.getItem('storeEmail') as string;
  // Add Logo (Top Left)
  if (shopLogo) {
    doc.addImage(shopLogo, "PNG", 15, 10, 30, 30); // Position at top-left
  }

  // Shop Name, Address & Email
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(shopname, 105, 20, { align: "center" });
  const em = shopname.trim().toLowerCase().replace(/\s+/g, "") + "@gmail.com";
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(shopadress, 105, 28, { align: "center" });
  doc.text(em , 105, 36, { align: "center" });

  // Tax Bill Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Tax Bill", 105, 45, { align: "center" });

  // Black Line
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(15, 50, 195, 50);

  // Customer Details
  doc.setFontSize(12);
  doc.text(`Customer ID: ${customerId}`, 15, 58);
  doc.text(`Date: ${new Date().toLocaleString()}`, 150, 58);

  // Table
  autoTable(doc, {
    startY: 65,
    head: [["Product", "Quantity", "Price", "Stock", "GST %", "GST Amount", "Total Price"]],
    body: cartItems.map((item) => [
      item.name,
      item.quantity,
      `${rupeeSymbol} ${item.price.toFixed(2)}`, // ₹ symbol added
      item.stock,
      `${gstRate}%`,
      `${rupeeSymbol} ${(item.price * gstRate / 100).toFixed(2)}`,
      `${rupeeSymbol} ${(item.price + (item.price * gstRate / 100)).toFixed(2)}`
    ]),
    theme: "grid",
    headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
  });

  // Fix `lastAutoTable`
  const finalY = (doc as any).lastAutoTable?.finalY || 100;

  // Total Calculation
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalGST = (subtotal * gstRate) / 100;
  const grandTotal = subtotal + totalGST;

  // Right-aligned total calculations
  doc.setFontSize(12);
  doc.text("Subtotal:", 120, finalY + 10);
  doc.text(`${rupeeSymbol} ${subtotal.toFixed(2)}`, 190, finalY + 10, { align: "right" });

  doc.text(`Total GST (${gstRate}%):`, 120, finalY + 20);
  doc.text(`${rupeeSymbol} ${totalGST.toFixed(2)}`, 190, finalY + 20, { align: "right" });
  doc.line(15, finalY + 23, 195, finalY + 23);

  doc.setFontSize(14);
  doc.setFont("bold");
  doc.text("Grand Total:", 120, finalY + 30);
  doc.text(`${rupeeSymbol} ${grandTotal.toFixed(2)}`, 190, finalY + 30, { align: "right" });

  // Footer Line
  doc.line(15, finalY + 35, 195, finalY + 35);

  // Footer
  doc.text("Tax Bill", 105, finalY + 45, { align: "center" });
  doc.text("Thank you for shopping with us!", 105, finalY + 55, { align: "center" });

  // Save PDF
  doc.save(`Bill_${customerId}.pdf`);
};


  // Function to fetch image from MongoDB Atlas
  const fetchProductImage = useCallback(async (id1: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/product-image/${id1}`);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const data = await response.json();
      return data.image;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }, []);

  const scanProduct = async (imageData: string): Promise<any> => {
    try {
      const base64Response = await fetch(imageData);
      const blob = await base64Response.blob();

      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');

      const response = await fetch('http://localhost:8080/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Scan failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API call failed: ${error.message}`);
      }
      throw error;
    }
  };

  const handleProductCapture = async (image: string) => {
    setError(null);
    try {
      setIsProcessing(true);
      const product = await scanProduct(image);
      const existingItem = cart.find(item => item.id === product.productId);

      if (existingItem) {
        if (existingItem.quantity + 1 > existingItem.stock) {
          throw new Error(`Cannot add more ${existingItem.name}. Only ${existingItem.stock} in stock.`);
        }
        handleQuantityUpdate({ id: product.productId, quantity: existingItem.quantity + 1 });
      } else {
        // Try to fetch image from MongoDB if id1 exists
        let productImage = image;
        if (product.productId) {
          const mongoImage = await fetchProductImage(product.productId);
          if (mongoImage) {
            productImage = mongoImage;
            setProductImages(prev => ({
              ...prev,
              [product.id1]: mongoImage
            }));
          }
        }

        setCart(prev => [...prev, {
          id: product.productId || Date.now().toString(),
          name: product.productName || 'Unknown Product',
          price: product.price || 0,
          quantity: 1,
          stock: product.stock || 0,
          image: productImage,
          id1: product.id1
        }]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to scan product');
    } finally {
      setIsProcessing(false);
      setIsScanning(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = reader.result as string;
        await handleProductCapture(image);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuantityUpdate = ({ id, quantity }: CartItemUpdate) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        if (quantity > item.stock) {
          setError(`Cannot set quantity to ${quantity}. Only ${item.stock} available.`);
          return item;
        }
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const handleCheckout = async () => {
    if (!customerId.trim()) {
      setError('Please enter a customer ID');
      return;
    }

    const storeId = localStorage.getItem('storeId');
    if (!storeId) {
      setError('Store ID is missing. Please log in again.');
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      const transactions = await Promise.all(
        cart.map(item => {
          const request: TransactionRequest = {
            productId: item.id,
            customerId,
            storeId,
            quantity: item.quantity,
            unitPrice: item.price
          };
          return createTransaction(request);
        })
      );

      await Promise.all(
        cart.map(async (item) => {
          const newStock = item.stock - item.quantity;
          if (newStock < 0) {
            throw new Error(`Insufficient stock for ${item.name}`);
          }
          await updateProductStock(item.name, newStock);
        })
      );

      setCart([]);
      alert('Checkout successful!');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Checkout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const getItemImage = (item: CartItem) => {
    if (item.id1 && productImages[item.id1]) {
      return productImages[item.id1];
    }
    return item.image;
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Customer ID</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Enter customer ID"
          required
        />
      </div>

      {isProcessing || isUploading ? (
        <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">
            {isProcessing ? 'Processing checkout...' : 'Uploading image...'}
          </span>
        </div>
      ) : isScanning ? (
        <div className="bg-gray-800 p-4 rounded-lg">
          <ProductCapture onCapture={handleProductCapture} buttonText="Scan Product" />
          <p className="text-center text-gray-400 mt-4">
            Or upload an image from your computer
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="mt-2 w-full text-sm text-gray-500"
          />
        </div>
      ) : (
        <button
          onClick={() => setIsScanning(true)}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
        >
          Scan or Upload Product
        </button>
      )}

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
        </h3>
        
        {cart.length === 0 ? (
          <p className="text-gray-400">No items in cart</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={getItemImage(item)}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-product.png';
                        target.onerror = null;
                      }}
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-400">
                      ₹ {item.price.toFixed(2)} × {item.quantity} =   ₹ {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400">
                        In stock: {item.stock}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CartItemQuantity
                      id={item.id}
                      quantity={item.quantity}
                      onUpdate={handleQuantityUpdate}
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 px-3 py-1 rounded-md hover:bg-red-400/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-lg font-medium">₹ {total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing || cart.length === 0}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md font-medium"
              >
                {isProcessing ? 'Processing...' : 'Checkout'}
              </button>
            </div>
            <div className="mt-4 flex gap-4">
        <button
          onClick={() => setShowBill(true)}
          className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          View Bill
        </button>


        
        <button onClick={() => generateBillPDF(customerId, cart)} 
          className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Generate Bill
        </button>

      </div>

      {showBill && (
        <Bill
          customerId={customerId}
          cart={cart}
          totalAmount={totalAmount}
          onClose={() => setShowBill(false)}
        />
      )}
            
          </>
        )}
      </div>
    </div>
  );
}