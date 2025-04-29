import React from 'react';
import { FilterX } from 'lucide-react';
import { FilterState } from '../types';

interface FiltersProps {
  selectedFilters: FilterState;
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedFilters,
  categories,
  onFilterChange,
}) => {
  const months = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString());

  const handleFilterChange = (name: keyof FilterState, value: string) => {
    onFilterChange({
      ...selectedFilters,
      [name]: value
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      month: '',
      year: '',
      category: ''
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <label htmlFor="month" className="text-sm text-text-secondary">
          Mês:
        </label>
        <select
          id="month"
          value={selectedFilters.month}
          onChange={(e) => handleFilterChange('month', e.target.value)}
          className="bg-card-bg-light border border-border rounded-md py-1.5 px-3 text-sm outline-none focus:border-primary transition-colors"
        >
          <option value="">Todos os Meses</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="year" className="text-sm text-text-secondary">
          Ano:
        </label>
        <select
          id="year"
          value={selectedFilters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="bg-card-bg-light border border-border rounded-md py-1.5 px-3 text-sm outline-none focus:border-primary transition-colors"
        >
          <option value="">Todos os Anos</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="category" className="text-sm text-text-secondary">
          Categoria:
        </label>
        <select
          id="category"
          value={selectedFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-card-bg-light border border-border rounded-md py-1.5 px-3 text-sm outline-none focus:border-primary transition-colors"
        >
          <option value="">Todas as Categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleResetFilters}
        className="ml-auto flex items-center gap-1.5 py-1.5 px-3 rounded-md bg-card-bg-light text-sm text-text-secondary hover:bg-primary/10 hover:text-primary transition-colors"
      >
        <FilterX size={14} />
        Limpar Filtros
      </button>
    </div>
  );
};

export default Filters;