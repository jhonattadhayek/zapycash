import { FinancialGoal, GoalProgress, Transaction } from '../types/financial';
import { supabase } from './supabase';

export const GoalsService = {
  async getGoals(filters?: { status?: string; categoria_id?: number }) {
    let query = supabase
      .from('metas_financeiras')
      .select(`
        *,
        categoria_trasacoes (
          id,
          descricao
        )
      `);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.categoria_id) {
      query = query.eq('categoria_id', filters.categoria_id);
    }

    const { data, error } = await query.order('data_fim', { ascending: true });
    
    if (error) throw error;
    return data as FinancialGoal[];
  },

  calculateProgress(goal: FinancialGoal): GoalProgress {
    const now = new Date();
    const endDate = new Date(goal.data_fim);
    const startDate = new Date(goal.data_inicio);
    
    // Calcula dias restantes
    const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    
    // Calcula progresso
    const percentageComplete = Math.min(100, (goal.valor_atual / goal.valor_meta) * 100);
    
    // Calcula economia mensal necessária
    const totalMonths = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    const monthlyTargetSaving = (goal.valor_meta - goal.valor_atual) / totalMonths;
    
    // Calcula economia mensal atual (média dos últimos 3 meses)
    const monthsSinceStart = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    const currentMonthlySaving = goal.valor_atual / monthsSinceStart;
    
    // Verifica se está no caminho certo
    const isOnTrack = currentMonthlySaving >= monthlyTargetSaving;
    
    return {
      percentageComplete,
      daysRemaining,
      isOnTrack,
      monthlyTargetSaving,
      currentMonthlySaving
    };
  },

  async getRelatedTransactions(goalId: number): Promise<Transaction[]> {
    const goal = await supabase
      .from('metas_financeiras')
      .select('categoria_id')
      .eq('id', goalId)
      .single();

    if (!goal.data) return [];

    const { data: transactions, error } = await supabase
      .from('transacoes')
      .select('*')
      .eq('categoria_id', goal.data.categoria_id)
      .eq('tipo', 'entrada')
      .order('data', { ascending: false });

    if (error) throw error;
    return transactions;
  },

  getStatusColor(status: FinancialGoal['status']): string {
    switch (status) {
      case 'em_andamento':
        return 'info';
      case 'concluida':
        return 'income';
      case 'atrasada':
        return 'expenses';
      default:
        return 'warning';
    }
  },

  formatStatus(status: FinancialGoal['status']): string {
    switch (status) {
      case 'em_andamento':
        return 'Em andamento';
      case 'concluida':
        return 'Concluída';
      case 'atrasada':
        return 'Atrasada';
      default:
        return 'Desconhecido';
    }
  }
}; 