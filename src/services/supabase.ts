import { createClient } from '@supabase/supabase-js';
import { Transaction, TransactionFilters, Category } from '../types/financial';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const TransactionService = {
  async getTransactions(filters?: TransactionFilters) {
    let query = supabase
      .from('transacoes')
      .select(`
        *,
        categoria_trasacoes (
          id,
          descricao
        )
      `);

    if (filters?.startDate) {
      query = query.gte('data', filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte('data', filters.endDate);
    }
    if (filters?.categoria_id) {
      query = query.eq('categoria_id', filters.categoria_id);
    }
    if (filters?.tipo) {
      query = query.eq('tipo', filters.tipo);
    }
    if (filters?.mes) {
      query = query.eq('mes', filters.mes);
    }

    const { data, error } = await query.order('data', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('categoria_trasacoes')
      .select('*')
      .order('descricao');

    if (error) throw error;
    return data as Category[];
  },

  async getTransactionSummary(mes?: string) {
    const { data: transactions, error } = await supabase
      .from('transacoes')
      .select(`
        *,
        categoria_trasacoes (
          id,
          descricao
        )
      `)
      .eq(mes ? 'mes' : 'mes', mes || new Date().toISOString().slice(0, 7));

    if (error) throw error;

    const summary = transactions.reduce((acc, curr) => {
      if (curr.tipo === 'entrada') {
        acc.totalEntradas += Number(curr.valor);
      } else {
        acc.totalSaidas += Number(curr.valor);
      }
      return acc;
    }, { totalEntradas: 0, totalSaidas: 0 });

    return {
      ...summary,
      saldo: summary.totalEntradas - summary.totalSaidas,
    };
  },

  async getCategoriasByUsuario(email: string) {
    const { data, error } = await supabase
      .from('vw_categorias_usuario')
      .select('*')
      .eq('email', email);

    if (error) throw error;
    return data;
  }
}; 