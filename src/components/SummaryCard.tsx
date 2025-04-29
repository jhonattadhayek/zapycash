import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'income':
        return <ArrowUpRight size={20} className="text-income" />;
      case 'expense':
        return <ArrowDownRight size={20} className="text-expenses" />;
      default:
        return null;
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case 'income':
        return 'text-income';
      case 'expense':
        return 'text-expenses';
      case 'balance':
        return amount >= 0 ? 'text-income' : 'text-expenses';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-secondary font-medium">{title}</h3>
        {getIcon()}
      </div>
      <div className={`text-2xl md:text-3xl font-bold ${getAmountColor()}`}>
        R$ {Math.abs(amount).toLocaleString('pt-BR')}
      </div>
    </div>
  );
};

export default SummaryCard;