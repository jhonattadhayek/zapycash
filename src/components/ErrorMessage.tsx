import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <div className="text-center">
          <p className="text-red-500 font-medium">Erro</p>
          <p className="text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
} 