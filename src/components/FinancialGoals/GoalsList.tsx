import React, { useEffect, useState } from 'react';
import { FinancialGoal, GoalProgress, Category } from '../../types/financial';
import { GoalsService } from '../../services/goals';
import { TransactionService } from '../../services/supabase';
import { formatCurrency } from '../../utils/format';
import { CircularProgress } from './CircularProgress';
import { GoalDetails } from './GoalDetails';
import { Tooltip } from '../common/Tooltip';
import { useGoalNotifications } from '../../hooks/useGoalNotifications';
import { Toaster } from 'react-hot-toast';

export const GoalsList: React.FC = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [selectedGoal, setSelectedGoal] = useState<FinancialGoal | null>(null);
  const [loading, setLoading] = useState(true);

  // Ativa as notificações
  useGoalNotifications(goals);

  useEffect(() => {
    loadData();
  }, [selectedStatus, selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [goalsData, categoriesData] = await Promise.all([
        GoalsService.getGoals({
          status: selectedStatus || undefined,
          categoria_id: selectedCategory
        }),
        TransactionService.getCategories()
      ]);
      setGoals(goalsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderGoalCard = (goal: FinancialGoal) => {
    const progress = GoalsService.calculateProgress(goal);
    const category = categories.find(cat => cat.id === goal.categoria_id);
    const statusColor = GoalsService.getStatusColor(goal.status);

    return (
      <div 
        key={goal.id} 
        className="card p-6 space-y-4 cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => setSelectedGoal(goal)}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{goal.descricao}</h3>
            <p className="text-text-secondary text-sm">{category?.descricao}</p>
          </div>
          <Tooltip
            content={`Status: ${GoalsService.formatStatus(goal.status)}`}
            position="left"
          >
            <span className={`badge badge-${statusColor}`}>
              {GoalsService.formatStatus(goal.status)}
            </span>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <Tooltip
                content={`${progress.percentageComplete.toFixed(1)}% concluído`}
                position="top"
              >
                <span className="text-text-secondary">Progresso</span>
              </Tooltip>
              <span>{progress.percentageComplete.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className={`h-full bg-${statusColor} transition-all duration-300`}
                style={{ width: `${progress.percentageComplete}%` }}
              />
            </div>
          </div>
          <div className="ml-6">
            <Tooltip
              content={`Faltam ${progress.daysRemaining} dias para o prazo`}
              position="right"
            >
              <div>
                <CircularProgress
                  percentage={progress.percentageComplete}
                  color={statusColor}
                  size={60}
                />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Tooltip
            content="Valor total que você deseja alcançar"
            position="bottom"
          >
            <div>
              <p className="text-text-secondary">Meta</p>
              <p className="font-semibold">{formatCurrency(goal.valor_meta)}</p>
            </div>
          </Tooltip>
          <Tooltip
            content="Valor atual acumulado"
            position="bottom"
          >
            <div>
              <p className="text-text-secondary">Atual</p>
              <p className="font-semibold">{formatCurrency(goal.valor_atual)}</p>
            </div>
          </Tooltip>
        </div>

        {!progress.isOnTrack && (
          <Tooltip
            content="Clique para ver mais detalhes sobre como alcançar sua meta"
            position="bottom"
          >
            <div className="mt-4 p-3 bg-expenses/10 rounded-lg">
              <p className="text-expenses text-sm">
                Você precisa aumentar sua economia mensal em {formatCurrency(progress.monthlyTargetSaving - progress.currentMonthlySaving)} para atingir sua meta no prazo.
              </p>
            </div>
          </Tooltip>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center p-4">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Tooltip content="Filtrar metas por status" position="bottom">
          <select
            className="input"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
            <option value="atrasada">Atrasada</option>
          </select>
        </Tooltip>

        <Tooltip content="Filtrar metas por categoria" position="bottom">
          <select
            className="input"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(Number(e.target.value) || undefined)}
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.descricao}
              </option>
            ))}
          </select>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(renderGoalCard)}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          Nenhuma meta financeira encontrada.
        </div>
      )}

      {selectedGoal && (
        <GoalDetails
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
        />
      )}

      <Toaster />
    </div>
  );
}; 