import React from 'react';
import { Transaction } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd 'de' MMMM", { locale: ptBR });
  };

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`w-2 h-2 rounded-full ${
                transaction.tipo === 'receita' ? 'bg-[#00FF94]' : 'bg-red-500'
              }`}
            />
            <div>
              <p className="font-medium text-gray-200">
                {transaction.descricao}
              </p>
              <p className="text-sm text-gray-400">
                {transaction.categoria?.descricao || 'Sem categoria'} • {formatDate(transaction.data)}
              </p>
            </div>
          </div>
          <p
            className={`font-semibold ${
              transaction.tipo === 'receita' ? 'text-[#00FF94]' : 'text-red-500'
            }`}
          >
            {transaction.tipo === 'receita' ? '+' : '-'} {formatValue(transaction.valor)}
          </p>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Nenhuma transação encontrada
        </div>
      )}
    </div>
  );
} 