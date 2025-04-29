import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00FF94]" />
        <p className="text-gray-400">Carregando...</p>
      </div>
    </div>
  );
} 