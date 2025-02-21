import React, { useState, useEffect } from 'react';
import { Camera, Search, Loader2, FileIcon, LogOut } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductCapture } from '../components/staff/ProductCapture';
import type { Product } from '../types/product';

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }
      const data = await response.json();
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card p-6 w-96 space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input w-full" required />
          <button type="submit" className="button-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
}

export function CustomerPortal() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setAuthToken(token);
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return authToken ? (
    <AuthenticatedCustomerPortal authToken={authToken} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

function AuthenticatedCustomerPortal({ authToken, onLogout }: { authToken: string; onLogout: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedProducts, setScannedProducts] = useState<Product[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const scanProduct = async (file: File) => {
    try {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      const response = await fetch('http://localhost:8080/api/scan', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to fetch product data');
      const productData = await response.json();
      setScannedProducts([...scannedProducts, productData]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Portal</h1>
        <button onClick={onLogout} className="button-secondary flex items-center space-x-2">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
      <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scannedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
