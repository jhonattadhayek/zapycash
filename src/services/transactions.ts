import { supabase } from '../lib/supabase';

export interface Transaction {
  id: string;
  description: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  category_id: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface TransactionFilters {
  month?: string;
  category_id?: string;
  type?: 'INCOME' | 'EXPENSE';
}

export const getTransactions = async (filters: TransactionFilters = {}): Promise<Transaction[]> => {
  let query = supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.month) {
    const startDate = new Date(filters.month);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    query = query
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());
  }

  if (filters.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Erro ao buscar transações');
  }

  return data || [];
};

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    throw new Error('Erro ao buscar categorias');
  }

  return data || [];
}; 