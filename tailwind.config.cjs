/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['**/*.vue', 'index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e0f2fe',
          200: '#bbdefb',
          300: '#90caf9',
          400: '#64b5f6',
          500: '#2196f3',
          600: '#1976d2',
          700: '#1565c0',
          800: '#0d47a1',
          900: '#01579b',
        },
        secondary: {
          100: '#f5f5f5',
          200: '#e0e0e0',
          300: '#bdbdbd',
          400: '#9e9e9e',
          500: '#757575',
          600: '#616161',
          700: '#424242',
          800: '#212121',
          900: '#000000',
        },
      },
    },
  },
  plugins: [],
};
