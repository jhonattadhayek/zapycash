import React from 'react';
import LineChart from './LineChart';
import { MonthlyData } from '../types';

interface MonthlyChartProps {
  data: MonthlyData[];
}

export const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    month: item.month,
    income: item.receitas,
    expense: item.despesas
  }));

  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Evolução Mensal</h3>
      <LineChart data={chartData} />
    </div>
  );
}; 