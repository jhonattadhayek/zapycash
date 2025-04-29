/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FF94',
          dark: '#00E676',
          light: '#7AFFBB',
        },
        secondary: '#7000FF',
        background: {
          DEFAULT: '#121212',
          card: '#1E1E1E',
          'card-hover': '#2A2A2A',
        },
        income: '#00E676',
        expenses: '#FF5252',
        warning: '#FFD600',
        info: '#2196F3',
        border: 'rgba(255, 255, 255, 0.1)',
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
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
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      gridTemplateColumns: {
        'auto-fill-cards': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};