import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-[#1E1E1E] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-[#00FF94]">ZapyCash</h1>
          <span className="text-gray-400">|</span>
          <p className="text-gray-400">{user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}