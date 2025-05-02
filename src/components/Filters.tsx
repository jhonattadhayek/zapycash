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
    <div
      className="w-full flex flex-col md:flex-row md:items-center md:gap-6 gap-4 mb-4 bg-[#181818] rounded-xl p-4 shadow-sm border border-[#232323]"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
        <label htmlFor="month" className="text-base font-medium text-gray-200 md:mb-0 mb-1">
          Mês:
        </label>
        <select
          id="month"
          value={selectedFilters.month}
          onChange={(e) => handleFilterChange('month', e.target.value)}
          className="bg-[#232323] border border-[#333] rounded-lg py-2 px-4 text-base text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-colors shadow-sm hover:border-primary/60"
        >
          <option value="">Todos os Meses</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
        <label htmlFor="year" className="text-base font-medium text-gray-200 md:mb-0 mb-1">
          Ano:
        </label>
        <select
          id="year"
          value={selectedFilters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="bg-[#232323] border border-[#333] rounded-lg py-2 px-4 text-base text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-colors shadow-sm hover:border-primary/60"
        >
          <option value="">Todos os Anos</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full md:w-auto">
        <label htmlFor="category" className="text-base font-medium text-gray-200 md:mb-0 mb-1">
          Categoria:
        </label>
        <select
          id="category"
          value={selectedFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-[#232323] border border-[#333] rounded-lg py-2 px-4 text-base text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-colors shadow-sm hover:border-primary/60"
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
        className="flex items-center gap-2 py-2 px-4 rounded-lg bg-[#232323] text-base text-gray-300 hover:bg-primary/20 hover:text-primary border border-[#333] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 ml-0 md:ml-auto mt-2 md:mt-0"
        aria-label="Limpar Filtros"
      >
        <FilterX size={16} />
        Limpar Filtros
      </button>
    </div>
  );
};

export default Filters;