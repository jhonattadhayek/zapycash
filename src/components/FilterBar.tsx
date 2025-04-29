import React from 'react';
import Filters from './Filters';
import { FilterState } from '../types';

interface FilterBarProps {
  availableCategories: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  availableCategories,
  filters,
  onFilterChange
}) => {
  return (
    <div className="bg-card rounded-lg p-4 mb-6">
      <Filters
        categories={availableCategories}
        selectedFilters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}; 