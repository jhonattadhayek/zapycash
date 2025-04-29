import React, { useEffect, useState } from 'react';
import { Transaction, TransactionFilters, Category } from '../../types/financial';
import { TransactionService } from '../../services/supabase';
import { formatCurrency } from '../../utils/format';

export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [transactionsData, categoriesData] = await Promise.all([
        TransactionService.getTransactions(filters),
        TransactionService.getCategories()
      ]);
      setTransactions(transactionsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return <div className="flex justify-center p-4">Carregando...</div>;
  }

  return (
    <div className="p-4">
      {/* Filtros */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange({ categoria_id: Number(e.target.value) || undefined })}
          value={filters.categoria_id || ''}
        >
          <option value="">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.descricao}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange({ tipo: e.target.value as 'entrada' | 'saida' | undefined })}
          value={filters.tipo || ''}
        >
          <option value="">Todos os tipos</option>
          <option value="entrada">Entradas</option>
          <option value="saida">Saídas</option>
        </select>

        <input
          type="month"
          className="p-2 border rounded"
          onChange={(e) => handleFilterChange({ mes: e.target.value })}
          value={filters.mes || ''}
        />
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(transaction.data).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {transaction.descricao}
                </td>
                <td className="px-6 py-4">
                  {categories.find(cat => cat.id === transaction.categoria_id)?.descricao}
                </td>
                <td className="px-6 py-4">
                  <span className={transaction.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(transaction.valor)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.tipo === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 