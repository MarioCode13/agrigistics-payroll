/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#617B9E',
          600: '#0284c7',
          700: '#176982',
          800: '#075985',
          900: '#0c4a6e',
          DEFAULT: '#176982',
        },
        gray: {
          200: '#E6E6E6',
          500: '#333333',
        },
        secondary: {
          DEFAULT: '#333333',
        },
        text: {
          black: '#000000',
          dark: '#333333',
          gray: '#666666',
        },
        navHover: {
          bg: '#DFE5EC',
          icon: '#617B9E',
        },
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '14px',
        lg: '16px',
        xl: '22px',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};
