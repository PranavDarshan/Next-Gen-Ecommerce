import React, { useState } from 'react';
import { CircleDollarSign, BarChart3 } from 'lucide-react';
import { LoginForm } from '../components/staff/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { InventoryPage } from './staff/InventoryPage';
import { BillingPage } from './staff/BillingPage';

export function StaffPortal() {
  const { session, login, loading } = useAuth();
  const [loginError, setLoginError] = useState<string>();
  const [activePage, setActivePage] = useState<'inventory' | 'billing'>('inventory');

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error) {
      setLoginError('Invalid credentials');
    }
  };

  if (loading) {
    return <div className="text-gray-200">Loading...</div>;
  }

  if (!session) {
    return <LoginForm onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-4">
        <button
          onClick={() => setActivePage('inventory')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activePage === 'inventory' 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-white/5 hover:bg-white/10 text-emerald-400 hover:text-emerald-300'
          }`}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Inventory</span>
        </button>
        <button
          onClick={() => setActivePage('billing')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            activePage === 'billing' 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-white/5 hover:bg-white/10 text-emerald-400 hover:text-emerald-300'
          }`}
        >
          <CircleDollarSign className="h-5 w-5" />
          <span>Billing</span>
        </button>
      </div>

      {activePage === 'inventory' ? <InventoryPage /> : <BillingPage />}
    </div>
  );
}