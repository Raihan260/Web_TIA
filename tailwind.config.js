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
        display: ['"Bricolage Grotesque"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#3a2f36',
        paper: '#fbf4e8',
        cream: { DEFAULT: '#fbf4e8', light: '#fffaf2', deep: '#f3e6d0' },
        blush: { DEFAULT: '#f8d3dc', soft: '#fdeef1' },
        mauve: { DEFAULT: '#c0527a', deep: '#a3406a', light: '#f6dbe3', soft: '#fbeff2' },
        rose: { DEFAULT: '#c0527a', deep: '#a3406a' },
        thread: '#dcb48c',
      },
    },
  },
  plugins: [],
}
