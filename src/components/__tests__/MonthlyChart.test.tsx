import React from 'react';
import { render, screen } from '@testing-library/react';
import { MonthlyChart } from '../MonthlyChart';
import { MonthlyData } from '../../types';

const mockData: MonthlyData[] = [
  {
    month: 'Janeiro',
    receitas: 5000,
    despesas: 3000
  },
  {
    month: 'Fevereiro',
    receitas: 6000,
    despesas: 3500
  }
];

describe('MonthlyChart', () => {
  it('should render chart title', () => {
    render(<MonthlyChart data={mockData} />);
    expect(screen.getByText('Evolução Mensal')).toBeInTheDocument();
  });

  it('should render LineChart with correct data', () => {
    const { container } = render(<MonthlyChart data={mockData} />);
    
    // Verifica se o SVG foi renderizado
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Verifica se os meses estão presentes
    mockData.forEach(item => {
      expect(screen.getByText(item.month.split(' ')[0])).toBeInTheDocument();
    });

    // Verifica se a legenda está presente
    expect(screen.getByText('Receitas')).toBeInTheDocument();
    expect(screen.getByText('Despesas')).toBeInTheDocument();
  });
}); 