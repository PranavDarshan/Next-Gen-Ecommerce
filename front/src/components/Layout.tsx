import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Store, Users, Camera, Search } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Store className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-200 bg-clip-text text-transparent">
                SmartRetail
              </span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/customer" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-700">
                <Camera className="h-5 w-5" />
                <span>Customer</span>
              </Link>
              <Link to="/staff" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-700">
                <Users className="h-5 w-5" />
                <span>Staff</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}