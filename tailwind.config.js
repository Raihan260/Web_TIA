/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#2f2a2d',
        paper: '#faf6ee',
        cream: { DEFAULT: '#faf6ee', light: '#fffdf8', deep: '#f1e8d8' },
        blush: { DEFAULT: '#f9d6e6', soft: '#fdf0f6' },
        mauve: { DEFAULT: '#d02c7e', deep: '#b01f68', light: '#f9d6e6', soft: '#fdf0f6' },
        rose: { DEFAULT: '#d02c7e', deep: '#b01f68', light: '#f6a8cb' },
        thread: '#dcb48c',
      },
    },
  },
  plugins: [],
}
