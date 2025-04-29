export const colors = {
  primary: {
    DEFAULT: '#00FF94',
    dark: '#00E676',
    light: '#7AFFBB',
  },
  secondary: '#7000FF',
  background: {
    DEFAULT: '#121212',
    card: '#1E1E1E',
    cardHover: '#2A2A2A',
  },
  status: {
    income: '#00E676',
    expenses: '#FF5252',
    warning: '#FFD600',
    info: '#2196F3',
  },
  border: 'rgba(255, 255, 255, 0.1)',
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
} as const;

export const typography = {
  fontFamily: {
    primary: ['Poppins', 'sans-serif'].join(', '),
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const gradients = {
  primary: 'linear-gradient(90deg, #00FF94 0%, #7000FF 100%)',
} as const;

export const animations = {
  transition: {
    fast: '150ms ease-in-out',
    base: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideIn: {
      from: { transform: 'translateY(20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
  },
} as const; 