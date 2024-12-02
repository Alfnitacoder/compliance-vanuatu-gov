/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          100: '#d1fae5',
          800: '#065f46',
        },
        yellow: {
          100: '#fef9c3',
          800: '#854d0e',
        },
        blue: {
          100: '#dbeafe',
          800: '#1e40af',
        },
        green: {
          100: '#dcfce7',
          800: '#166534',
        },
        red: {
          100: '#fee2e2',
          800: '#991b1b',
        },
      },
    },
  },
  safelist: [
    'bg-emerald-100',
    'text-emerald-800',
    'bg-yellow-100',
    'text-yellow-800',
    'bg-blue-100',
    'text-blue-800',
    'bg-green-100',
    'text-green-800',
    'bg-red-100',
    'text-red-800',
  ],
  plugins: [],
};