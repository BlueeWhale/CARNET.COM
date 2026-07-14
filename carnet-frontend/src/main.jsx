import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import { RentalProvider } from './context/RentalContext';
import './index.css'
import App from './App.jsx'

// Redux ke bina pure architecture stable configuration
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FilterProvider>
        <RentalProvider> {/* Bound with Core State */}
          <App />
        </RentalProvider>
      </FilterProvider>
    </ThemeProvider>
  </StrictMode>,
);