import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Configuração Supabase:', {
  url: supabaseUrl,
  hasAnonKey: !!supabaseAnonKey
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce'
  }
});

// Tipos para os dados que vamos buscar
export type Transacao = Database['public']['Tables']['transacoes']['Row'];
export type Categoria = Database['public']['Tables']['categoria_trasacoes']['Row'];
export type MetaFinanceira = Database['public']['Tables']['metas_financeiras']['Row'];
export type Usuario = Database['public']['Tables']['usuarios']['Row'];

// Serviço para buscar dados do usuário
export const DashboardService = {
  // Buscar usuário por email
  async getUsuarioByEmail(email: string): Promise<{ usuario: Usuario | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return { usuario: null, error: 'Usuário não encontrado' };
      }
      
      return { usuario: data, error: null };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return { usuario: null, error: 'Erro ao buscar usuário' };
    }
  },

  // Buscar transações do usuário
  async getTransacoes(email: string) {
    try {
      // Primeiro busca o usuário
      const { usuario } = await this.getUsuarioByEmail(email);
      if (!usuario) return [];

      const { data, error } = await supabase
        .from('transacoes')
        .select(`
          *,
          categoria:categoria_id(
            descricao
          )
        `)
        .eq('usuario_id', usuario.id)
        .order('data', { ascending: false });
      
      if (error) {
        console.error('Erro ao buscar transações:', error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      return [];
    }
  },

  // Buscar categorias do usuário
  async getCategorias(email: string) {
    try {
      // Primeiro busca o usuário
      const { usuario } = await this.getUsuarioByEmail(email);
      if (!usuario) return [];

      const { data, error } = await supabase
        .from('categoria_trasacoes')
        .select('*')
        .eq('usuario_id', usuario.id);
      
      if (error) {
        console.error('Erro ao buscar categorias:', error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  },

  // Buscar metas financeiras do usuário
  async getMetasFinanceiras(email: string) {
    try {
      // Primeiro busca o usuário
      const { usuario } = await this.getUsuarioByEmail(email);
      if (!usuario) return [];

      const { data, error } = await supabase
        .from('metas_financeiras')
        .select(`
          *,
          categoria:categoria_id(
            descricao
          )
        `)
        .eq('usuario_id', usuario.id);
      
      if (error) {
        console.error('Erro ao buscar metas:', error);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar metas:', error);
      return [];
    }
  },

  // Calcular resumo financeiro
  async getResumoFinanceiro(email: string) {
    try {
      // Primeiro busca o usuário
      const { usuario } = await this.getUsuarioByEmail(email);
      if (!usuario) {
        return {
          totalReceitas: 0,
          totalDespesas: 0,
          saldoTotal: 0
        };
      }

      const { data: transacoes, error } = await supabase
        .from('transacoes')
        .select('*')
        .eq('usuario_id', usuario.id);
      
      if (error) {
        console.error('Erro ao buscar resumo:', error);
        return {
          totalReceitas: 0,
          totalDespesas: 0,
          saldoTotal: 0
        };
      }

      const resumo = transacoes.reduce((acc, transacao) => {
        if (transacao.tipo === 'receita') {
          acc.totalReceitas += transacao.valor;
        } else {
          acc.totalDespesas += transacao.valor;
        }
        return acc;
      }, {
        totalReceitas: 0,
        totalDespesas: 0
      });

      return {
        ...resumo,
        saldoTotal: resumo.totalReceitas - resumo.totalDespesas
      };
    } catch (error) {
      console.error('Erro ao buscar resumo:', error);
      return {
        totalReceitas: 0,
        totalDespesas: 0,
        saldoTotal: 0
      };
    }
  }
}; 