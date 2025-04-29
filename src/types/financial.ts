export interface Transaction {
  id: number;
  created_at: string;
  data: string;
  valor: number;
  descricao: string;
  recebedor?: string;
  pagador?: string;
  mes: string;
  categoria_id: number;
  tipo: 'entrada' | 'saida';
  usuario_id: number;
}

export interface Category {
  id: number;
  created_at: string;
  descricao: string;
  usuario_id: number;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  categoria_id?: number;
  tipo?: 'entrada' | 'saida';
  mes?: string;
}

export interface TransactionSummary {
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
  transacoesPorCategoria: {
    categoria_id: number;
    descricao: string;
    total: number;
  }[];
}

export interface FinancialGoal {
  id: number;
  created_at: string;
  descricao: string;
  valor_meta: number;
  valor_atual: number;
  data_inicio: string;
  data_fim: string;
  categoria_id: number;
  usuario_id: number;
  status: 'em_andamento' | 'concluida' | 'atrasada';
}

export interface GoalProgress {
  percentageComplete: number;
  daysRemaining: number;
  isOnTrack: boolean;
  monthlyTargetSaving: number;
  currentMonthlySaving: number;
}

export interface GoalFilters {
  status?: FinancialGoal['status'];
  categoria_id?: number;
  startDate?: string;
  endDate?: string;
} 