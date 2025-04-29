import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-text-secondary">Nenhuma transação encontrada com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-text-secondary font-medium">Data</th>
            <th className="text-left py-3 px-4 text-text-secondary font-medium">Categoria</th>
            <th className="text-left py-3 px-4 text-text-secondary font-medium">Descrição</th>
            <th className="text-right py-3 px-4 text-text-secondary font-medium">Valor</th>
            <th className="text-center py-3 px-4 text-text-secondary font-medium">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr 
              key={transaction.id} 
              className="border-b border-border hover:bg-card-bg-light transition-colors"
            >
              <td className="py-3 px-4 text-sm">{formatDate(transaction.date)}</td>
              <td className="py-3 px-4 text-sm">{transaction.category}</td>
              <td className="py-3 px-4 text-sm">{transaction.description}</td>
              <td className={`py-3 px-4 text-sm text-right font-medium ${
                transaction.type === 'income' ? 'text-income' : 'text-expenses'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR')}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex justify-center">
                  {transaction.type === 'income' ? (
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-income/10">
                      <ArrowUpRight size={16} className="text-income" />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-expenses/10">
                      <ArrowDownRight size={16} className="text-expenses" />
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;