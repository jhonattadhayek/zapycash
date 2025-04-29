import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';

interface CardProps {
  title: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
}

export function Card({ title, value, trend }: CardProps) {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpCircle className="w-6 h-6 text-[#00FF94]" />;
      case 'down':
        return <ArrowDownCircle className="w-6 h-6 text-red-500" />;
      default:
        return <MinusCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-[#00FF94]';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        {getTrendIcon()}
      </div>
      <p className={`text-2xl font-bold ${getTrendColor()}`}>
        {formatValue(value)}
      </p>
    </div>
  );
} 