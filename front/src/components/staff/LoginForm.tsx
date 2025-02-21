import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State to store error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error before making the request
  
    try {
      // Send POST request to authenticate the user
      const response = await fetch('http://localhost:8080/api/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // Handle error if response is not OK
        const errorMessage = await response.text(); // Extract error message from response body
        setError(errorMessage); // Update state with the error message
        throw new Error('Login failed');
      }
  
      const userData = await response.json(); // Assuming the response contains user data like token or email
      console.log(userData)
      // Store the storeId from the user data in localStorage
      if (userData.store && userData.store.storeId) {
        localStorage.setItem('storeId', userData.store.storeId); // Store only the storeId
        localStorage.setItem('storeName', userData.store.storeName);
        localStorage.setItem('storeEmail', userData.store.email);
        localStorage.setItem('storeLoc', userData.store.location);
        localStorage.setItem('BillingStaff', userData.email);
        localStorage.setItem('BillingStaffName', userData.staffName);
        localStorage.setItem('BillingStaffId', userData.staffId);
      }
  
      // Proceed with the onLogin callback if login is successful
      await onLogin(email, password);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto">
      <form onSubmit={handleSubmit} className="card p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Staff Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-400">
            {error === "Invalid email or password" ? "Incorrect email/password" : error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-white" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10 text-white"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10 text-white"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="button-primary w-full text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
