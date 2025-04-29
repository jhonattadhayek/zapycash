import '@testing-library/jest-dom';

// Mock para o ResizeObserver que é usado em alguns componentes
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}; 