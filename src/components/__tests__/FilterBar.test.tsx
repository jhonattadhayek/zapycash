import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';
import { FilterState } from '../../types';

const mockFilters: FilterState = {
  month: '',
  year: '',
  category: ''
};

const mockCategories = ['Alimentação', 'Transporte', 'Lazer'];

describe('FilterBar', () => {
  it('should render all filter options', () => {
    const handleFilterChange = jest.fn();

    render(
      <FilterBar
        availableCategories={mockCategories}
        filters={mockFilters}
        onFilterChange={handleFilterChange}
      />
    );

    expect(screen.getByText('Todas as Categorias')).toBeInTheDocument();
    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('should call onFilterChange when filters are updated', () => {
    const handleFilterChange = jest.fn();

    render(
      <FilterBar
        availableCategories={mockCategories}
        filters={mockFilters}
        onFilterChange={handleFilterChange}
      />
    );

    const categorySelect = screen.getByLabelText('Categoria:');
    fireEvent.change(categorySelect, { target: { value: 'Alimentação' } });

    expect(handleFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      category: 'Alimentação'
    });
  });
}); 