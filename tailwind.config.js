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
        paper: '#fff9f7',
        blush: { DEFAULT: '#f6d5db', soft: '#fcebee' },
        mauve: { DEFAULT: '#8a5f73', deep: '#6f4a5d', light: '#ecdbe2', soft: '#f8eff2' },
        rose: { DEFAULT: '#b5566f', deep: '#9a4259' },
        thread: '#dcb48c',
      },
    },
  },
  plugins: [],
}
