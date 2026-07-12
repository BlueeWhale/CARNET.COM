import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [searchCarName, setSearchCarName] = useState('');
  const [budgetRange, setBudgetRange] = useState(350000);

  return (
    <FilterContext.Provider value={{
      selectedBrand, setSelectedBrand,
      searchCarName, setSearchCarName,
      budgetRange, setBudgetRange
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useCarFilters = () => {
  const context = useContext(FilterContext);
  // Fail-safe protection interceptor
  if (!context) {
    return {
      selectedBrand: 'ALL', setSelectedBrand: () => {},
      searchCarName: '', setSearchCarName: () => {},
      budgetRange: 350000, setBudgetRange: () => {}
    };
  }
  return context;
};