
import React from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b" role="banner">
      <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img 
              src="/placeholder.svg" 
              alt="E-ComForAll Logo" 
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">E-ComForAll</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              tabIndex={0}
            >
              الرئيسية / Home
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              tabIndex={0}
            >
              المنتجات / Products
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              tabIndex={0}
            >
              من نحن / About
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
              aria-label="User account / حساب المستخدم"
              tabIndex={0}
            >
              <User size={24} />
            </button>
            <button 
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
              aria-label="Shopping cart (0 items) / سلة التسوق (0 عناصر)"
              tabIndex={0}
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
