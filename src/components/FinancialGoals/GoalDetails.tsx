import React, { useEffect, useState } from 'react';
import { FinancialGoal, Transaction } from '../../types/financial';
import { GoalsService } from '../../services/goals';
import { formatCurrency } from '../../utils/format';
import { CircularProgress } from './CircularProgress';
import { Tooltip } from '../common/Tooltip';

interface GoalDetailsProps {
  goal: FinancialGoal;
  onClose: () => void;
}

export const GoalDetails: React.FC<GoalDetailsProps> = ({ goal, onClose }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [goal.id]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await GoalsService.getRelatedTransactions(goal.id);
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  const progress = GoalsService.calculateProgress(goal);
  const statusColor = GoalsService.getStatusColor(goal.status);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background-card border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Detalhes da Meta</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-semibold">{goal.descricao}</h3>
              <Tooltip content="Período da meta" position="bottom">
                <p className="text-text-secondary">
                  {new Date(goal.data_inicio).toLocaleDateString()} até {new Date(goal.data_fim).toLocaleDateString()}
                </p>
              </Tooltip>
            </div>
            <Tooltip
              content={`Status atual: ${GoalsService.formatStatus(goal.status)}`}
              position="left"
            >
              <span className={`badge badge-${statusColor}`}>
                {GoalsService.formatStatus(goal.status)}
              </span>
            </Tooltip>
          </div>

          {/* Progresso */}
          <div className="flex items-center gap-8">
            <Tooltip
              content={`${progress.percentageComplete.toFixed(1)}% da meta alcançada`}
              position="top"
            >
              <div>
                <CircularProgress
                  percentage={progress.percentageComplete}
                  color={statusColor}
                  size={120}
                />
              </div>
            </Tooltip>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-text-secondary">Progresso</span>
                  <span>{progress.percentageComplete.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${statusColor} transition-all duration-300`}
                    style={{ width: `${progress.percentageComplete}%` }}
                  />
                </div>
              </div>
              
              {!progress.isOnTrack && (
                <Tooltip
                  content="Sugestão de ajuste para alcançar a meta no prazo"
                  position="bottom"
                >
                  <div className="p-3 bg-expenses/10 rounded-lg">
                    <p className="text-expenses text-sm">
                      Você precisa aumentar sua economia mensal em {formatCurrency(progress.monthlyTargetSaving - progress.currentMonthlySaving)} para atingir sua meta no prazo.
                    </p>
                  </div>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tooltip content="Valor total que você deseja alcançar" position="top">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-text-secondary text-sm">Meta</p>
                <p className="text-lg font-semibold">{formatCurrency(goal.valor_meta)}</p>
              </div>
            </Tooltip>
            <Tooltip content="Valor atual acumulado" position="top">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-text-secondary text-sm">Acumulado</p>
                <p className="text-lg font-semibold">{formatCurrency(goal.valor_atual)}</p>
              </div>
            </Tooltip>
            <Tooltip content="Valor mensal necessário para atingir a meta" position="top">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-text-secondary text-sm">Economia Mensal</p>
                <p className="text-lg font-semibold">{formatCurrency(progress.monthlyTargetSaving)}</p>
              </div>
            </Tooltip>
            <Tooltip content="Dias restantes até o prazo final" position="top">
              <div className="p-4 bg-background rounded-lg">
                <p className="text-text-secondary text-sm">Dias Restantes</p>
                <p className="text-lg font-semibold">{progress.daysRemaining}</p>
              </div>
            </Tooltip>
          </div>

          {/* Transações Relacionadas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Transações Relacionadas</h4>
            {loading ? (
              <div className="text-center py-4">Carregando transações...</div>
            ) : transactions.length > 0 ? (
              <div className="space-y-2">
                {transactions.map(transaction => (
                  <Tooltip
                    key={transaction.id}
                    content={`Transação realizada em ${new Date(transaction.data).toLocaleDateString()}`}
                    position="left"
                  >
                    <div
                      className="flex items-center justify-between p-3 bg-background rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{transaction.descricao}</p>
                        <p className="text-sm text-text-secondary">
                          {new Date(transaction.data).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-income font-medium">
                        {formatCurrency(transaction.valor)}
                      </span>
                    </div>
                  </Tooltip>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-text-secondary">
                Nenhuma transação encontrada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 