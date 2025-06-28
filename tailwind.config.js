/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#3b82f6',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#f59e42',
          dark: '#d97706',
          light: '#fbbf24',
        },
        background: {
          DEFAULT: '#f8fafc',
          dark: '#0f172a',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',
        },
        text: {
          DEFAULT: '#1e293b',
          dark: '#f1f5f9',
        },
        accent: {
          DEFAULT: '#e11d48',
          dark: '#f43f5e',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        'primary-gradient-hover': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'accent-gradient': 'linear-gradient(135deg, #e11d48 0%, #f43f5e 100%)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 